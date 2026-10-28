const { Pool, types } = require('pg');
require('dotenv').config();

// Configuración de tipos en PostgreSQL:
// OID 1700 = NUMERIC / DECIMAL -> convertir a número flotante JS
types.setTypeParser(1700, val => (val === null ? null : parseFloat(val)));
// OID 20 = BIGINT / INT8 -> convertir a número entero JS
types.setTypeParser(20, val => (val === null ? null : parseInt(val, 10)));

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      user: process.env.DB_USER || 'postgres',
      password: String(process.env.DB_PASSWORD || '12345'),
      database: process.env.DB_NAME || 'tigre_burger_pos',
      ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST.includes('supabase')) ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };

const pgPool = new Pool(poolConfig);

/**
 * Transforma consultas estilo MySQL ('?', comillas dobles en valores, is_top_selling = 1)
 * a sintaxis nativa de PostgreSQL ($1, $2, RETURNING id, etc.)
 */
function transformQuery(sql, params = []) {
  let transformedParams = [];
  let paramIndex = 1;

  // Normalizar comillas dobles en valores de texto a comillas simples (ej. status = "abierta" o VALUES (..., "abierta"))
  let transformedSql = sql.replace(/"(abierta|cerrada|activo|inactivo|libre|ocupada|pendiente_pago|mesa|llevar|activa|cancelada|reservada|text|image|audio|document|video|Efectivo|QR)"/gi, "'$1'");
  transformedSql = transformedSql.replace(/=\s*"([^"]+)"/g, "='$1'");

  // Normalizar comparaciones booleanas (MySQL 1/0 a Postgres TRUE/FALSE)
  transformedSql = transformedSql.replace(/\bis_top_selling\s*=\s*1\b/gi, 'is_top_selling = TRUE');
  transformedSql = transformedSql.replace(/\bis_top_selling\s*=\s*0\b/gi, 'is_top_selling = FALSE');

  // Soporte para inserciones múltiples tipo MySQL: INSERT INTO ... VALUES ? con params = [[[...], [...]]]
  if (/VALUES\s*\?/i.test(transformedSql) && params && Array.isArray(params[0]) && Array.isArray(params[0][0])) {
    const matrix = params[0];
    const valuePlaceholders = [];
    for (const row of matrix) {
      const rowPlaceholders = [];
      for (const val of row) {
        rowPlaceholders.push(`$${paramIndex++}`);
        transformedParams.push(val);
      }
      valuePlaceholders.push(`(${rowPlaceholders.join(', ')})`);
    }
    transformedSql = transformedSql.replace(/VALUES\s*\?/i, `VALUES ${valuePlaceholders.join(', ')}`);
  } else if (params && params.length > 0) {
    // Reemplazar '?' por '$1', '$2', ... fuera de cadenas entrecomilladas
    let newSql = '';
    let inQuote = false;
    let quoteChar = '';
    let pIdx = 0;

    for (let i = 0; i < transformedSql.length; i++) {
      const ch = transformedSql[i];
      if (inQuote) {
        newSql += ch;
        if (ch === quoteChar) {
          if (i + 1 < transformedSql.length && transformedSql[i + 1] === quoteChar) {
            newSql += quoteChar;
            i++;
          } else {
            inQuote = false;
          }
        }
      } else {
        if (ch === "'" || ch === '"') {
          inQuote = true;
          quoteChar = ch;
          newSql += ch;
        } else if (ch === '?') {
          if (pIdx < params.length) {
            transformedParams.push(params[pIdx]);
            newSql += `$${paramIndex++}`;
            pIdx++;
          } else {
            newSql += ch;
          }
        } else {
          newSql += ch;
        }
      }
    }
    transformedSql = newSql;
  }

  // En inserciones sin cláusula RETURNING, añadir RETURNING id para obtener insertId
  const isInsert = /^\s*INSERT\s+INTO\b/i.test(transformedSql);
  if (isInsert && !/\bRETURNING\b/i.test(transformedSql)) {
    transformedSql += ' RETURNING id';
  }

  return { sql: transformedSql, params: transformedParams };
}

/**
 * Da formato al resultado de PostgreSQL para ser compatible con la interfaz de mysql2 ([rows, fields])
 */
function formatResult(sql, res) {
  const isInsert = /^\s*INSERT\s+INTO\b/i.test(sql);
  const isUpdateOrDelete = /^\s*(UPDATE|DELETE)\b/i.test(sql);

  if (isInsert) {
    const resultObj = {
      insertId: res.rows && res.rows[0] && res.rows[0].id !== undefined ? res.rows[0].id : 0,
      affectedRows: res.rowCount || 0,
      rows: res.rows
    };
    return [resultObj, res.fields];
  }

  if (isUpdateOrDelete) {
    const resultObj = {
      affectedRows: res.rowCount || 0,
      changedRows: res.rowCount || 0
    };
    return [resultObj, res.fields];
  }

  // SELECT u otras consultas
  const rows = res.rows || [];
  rows.affectedRows = res.rowCount || 0;
  return [rows, res.fields];
}

/**
 * Envoltorio del pool compatible con mysql2/promise
 */
const pool = {
  async query(sql, params) {
    const transformed = transformQuery(sql, params);
    const res = await pgPool.query(transformed.sql, transformed.params);
    return formatResult(sql, res);
  },

  async execute(sql, params) {
    return this.query(sql, params);
  },

  async getConnection() {
    const client = await pgPool.connect();

    const connectionWrapper = {
      async query(sql, params) {
        const transformed = transformQuery(sql, params);
        const res = await client.query(transformed.sql, transformed.params);
        return formatResult(sql, res);
      },

      async execute(sql, params) {
        return this.query(sql, params);
      },

      async beginTransaction() {
        await client.query('BEGIN');
      },

      async commit() {
        await client.query('COMMIT');
      },

      async rollback() {
        await client.query('ROLLBACK');
      },

      release() {
        client.release();
      }
    };

    return connectionWrapper;
  },

  end() {
    return pgPool.end();
  }
};

const testConnection = async () => {
  try {
    const isSupabase = (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')) || (process.env.DB_HOST && process.env.DB_HOST.includes('supabase'));
    const target = isSupabase ? 'Supabase Cloud (PostgreSQL)' : `PostgreSQL en puerto ${process.env.DB_PORT || 5433}`;
    console.log(`✅ Base de datos conectada con éxito - ${target}`);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    return false;
  }
};

module.exports = { pool, testConnection };
