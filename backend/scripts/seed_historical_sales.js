/**
 * Script para generar datos históricos de ventas, cajas y detalles de venta
 * con fechas antiguas personalizadas para Tigre Burger POS (PostgreSQL).
 *
 * Uso:
 *   node scripts/seed_historical_sales.js
 *   node scripts/seed_historical_sales.js --days 30
 *   node scripts/seed_historical_sales.js --start 2026-08-01 --end 2026-10-25
 */

const { pool } = require('../config/database');

// Función auxiliar para obtener números aleatorios entre min y max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Parsear argumentos de línea de comandos
const args = process.argv.slice(2);
let startStr = null;
let endStr = null;
let daysBack = 30;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--start' && args[i + 1]) startStr = args[i + 1];
  if (args[i] === '--end' && args[i + 1]) endStr = args[i + 1];
  if (args[i] === '--days' && args[i + 1]) daysBack = parseInt(args[i + 1], 10);
}

const getDatesList = (start, end) => {
  const dates = [];
  let curr = new Date(start);
  while (curr <= end) {
    dates.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
};

async function seedHistoricalData() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🍔 Generador de Datos Históricos - Tigre Burger POS');
  console.log('═══════════════════════════════════════════════════════');

  try {
    // 1. Obtener productos activos
    const [products] = await pool.query("SELECT id, name, price FROM productos WHERE status = 'activo'");
    if (!products || products.length === 0) {
      console.error('❌ No se encontraron productos activos.');
      process.exit(1);
    }

    // 2. Obtener métodos de pago
    const [methods] = await pool.query('SELECT id, name FROM metodos_pago');
    const cashId = methods.find(m => m.name === 'Efectivo')?.id || 1;
    const qrId = methods.find(m => m.name === 'QR')?.id || 2;

    // 3. Obtener mesas
    const [tables] = await pool.query('SELECT id, number FROM mesas');
    const tableIds = tables.map(t => t.id);

    // 4. Determinar rango de fechas
    let startDate, endDate;
    if (startStr && endStr) {
      startDate = new Date(`${startStr}T00:00:00`);
      endDate = new Date(`${endStr}T23:59:59`);
    } else {
      endDate = new Date();
      endDate.setDate(endDate.getDate() - 1); // Hasta ayer
      startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - daysBack + 1);
    }

    const dates = getDatesList(startDate, endDate);
    console.log(`📅 Generando datos desde: ${startDate.toISOString().split('T')[0]} hasta: ${endDate.toISOString().split('T')[0]}`);
    console.log(`📊 Días a procesar: ${dates.length}`);

    let totalCajas = 0;
    let totalVentas = 0;
    let grandTotalRevenue = 0;

    for (const dateObj of dates) {
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      // Horario de caja: abre a las 18:00 y cierra a las 23:45
      const openedAt = `${dateStr} 18:00:00`;
      const closedAt = `${dateStr} 23:45:00`;
      const openingAmount = 200.00; // Fondo de caja

      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();

        // Crear la caja cerrada del día
        const [cajaRes] = await conn.query(
          `INSERT INTO cajas (user_id, opening_amount, status, opened_at, closed_at)
           VALUES (1, ?, 'cerrada', ?, ?)`,
          [openingAmount, openedAt, closedAt]
        );
        const cajaId = cajaRes.insertId;
        totalCajas++;

        // Generar entre 8 y 18 ventas por día
        const salesCount = randomInt(8, 18);
        let dayCashSales = 0;
        let dayQrSales = 0;
        let dayTotalSales = 0;

        for (let s = 0; s < salesCount; s++) {
          // Hora aleatoria entre 18:15 y 23:30
          const hour = randomInt(18, 23);
          const min = randomInt(0, 59);
          const sec = randomInt(0, 59);
          const saleTime = `${dateStr} ${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

          const isMesa = Math.random() > 0.45;
          const saleType = isMesa ? 'mesa' : 'llevar';
          const mesaId = isMesa && tableIds.length > 0 ? tableIds[randomInt(0, tableIds.length - 1)] : null;

          // Seleccionar 1 a 4 productos aleatorios
          const itemsCount = randomInt(1, 4);
          let saleSubtotal = 0;
          const saleItems = [];

          for (let it = 0; it < itemsCount; it++) {
            const prod = products[randomInt(0, products.length - 1)];
            const quantity = randomInt(1, 3);
            const unitPrice = parseFloat(prod.price);
            const subtotal = Math.round(unitPrice * quantity * 100) / 100;
            saleSubtotal += subtotal;

            saleItems.push({
              product_id: prod.id,
              quantity,
              unit_price: unitPrice,
              subtotal,
              notes: Math.random() > 0.8 ? 'Sin cebolla' : null
            });
          }

          saleSubtotal = Math.round(saleSubtotal * 100) / 100;
          const saleTotal = saleSubtotal;

          // Método de pago: 65% Efectivo, 35% QR
          const isCash = Math.random() < 0.65;
          const paymentMethodId = isCash ? cashId : qrId;

          // Insertar venta
          const [saleRes] = await conn.query(
            `INSERT INTO ventas (caja_id, mesa_id, user_id, payment_method_id, sale_type, subtotal, total, status, created_at, updated_at)
             VALUES (?, ?, 1, ?, ?, ?, ?, 'cerrada', ?, ?)`,
            [cajaId, mesaId, paymentMethodId, saleType, saleSubtotal, saleTotal, saleTime, saleTime]
          );
          const saleId = saleRes.insertId;
          totalVentas++;

          // Insertar detalles de la venta
          for (const item of saleItems) {
            await conn.query(
              `INSERT INTO detalle_ventas (sale_id, product_id, quantity, unit_price, subtotal, notes)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [saleId, item.product_id, item.quantity, item.unit_price, item.subtotal, item.notes]
            );
          }

          // Insertar pago
          await conn.query(
            `INSERT INTO venta_pagos (sale_id, payment_method_id, amount, created_at)
             VALUES (?, ?, ?, ?)`,
            [saleId, paymentMethodId, saleTotal, saleTime]
          );

          if (isCash) {
            dayCashSales += saleTotal;
          } else {
            dayQrSales += saleTotal;
          }
          dayTotalSales += saleTotal;
        }

        dayCashSales = Math.round(dayCashSales * 100) / 100;
        dayQrSales = Math.round(dayQrSales * 100) / 100;
        dayTotalSales = Math.round(dayTotalSales * 100) / 100;
        const closingAmount = Math.round((openingAmount + dayCashSales) * 100) / 100;

        // Actualizar caja con los totales calculados
        await conn.query(
          `UPDATE cajas SET
             cash_sales = ?,
             qr_sales = ?,
             total_sales = ?,
             order_count = ?,
             closing_amount = ?
           WHERE id = ?`,
          [dayCashSales, dayQrSales, dayTotalSales, salesCount, closingAmount, cajaId]
        );

        await conn.commit();
        grandTotalRevenue += dayTotalSales;
        console.log(`  ✓ ${dateStr}: Caja #${cajaId} creada con ${salesCount} ventas (Total: Bs. ${dayTotalSales.toFixed(2)})`);
      } catch (err) {
        await conn.rollback();
        console.error(`  ❌ Error en fecha ${dateStr}:`, err.message);
      } finally {
        conn.release();
      }
    }

    // Sincronizar secuencias en PostgreSQL
    await pool.query("SELECT setval('cajas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM cajas))");
    await pool.query("SELECT setval('ventas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM ventas))");
    await pool.query("SELECT setval('detalle_ventas_id_seq', (SELECT COALESCE(MAX(id), 1) FROM detalle_ventas))");
    await pool.query("SELECT setval('venta_pagos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM venta_pagos))");

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 Generación de datos completada con éxito');
    console.log(`📦 Cajas creadas:    ${totalCajas}`);
    console.log(`🧾 Ventas creadas:   ${totalVentas}`);
    console.log(`💰 Ingresos totales: Bs. ${grandTotalRevenue.toFixed(2)}`);
    console.log('═══════════════════════════════════════════════════════');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error general:', error);
    process.exit(1);
  }
}

seedHistoricalData();
