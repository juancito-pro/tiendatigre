-- =============================================================================
-- Tigre Burger POS - Schema para PostgreSQL (Solo DDL)
-- =============================================================================

SET client_encoding = 'UTF8';

-- Opcional: Crear la base de datos (ejecutar por separado si es necesario):
-- CREATE DATABASE tigre_burger_pos WITH ENCODING 'UTF8';
-- \c tigre_burger_pos;

-- =============================================================================
-- 1. ELIMINACIÓN DE TABLAS EXISTENTES (EN ORDEN DE DEPENDENCIAS)
-- =============================================================================
DROP TABLE IF EXISTS whatsapp_messages CASCADE;
DROP TABLE IF EXISTS detalle_ventas CASCADE;
DROP TABLE IF EXISTS venta_pagos CASCADE;
DROP TABLE IF EXISTS ventas CASCADE;
DROP TABLE IF EXISTS cajas CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS mesas CASCADE;
DROP TABLE IF EXISTS metodos_pago CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =============================================================================
-- 2. FUNCIÓN PARA ACTUALIZACIÓN AUTOMÁTICA DE updated_at
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 3. CREACIÓN DE TABLAS
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Tabla: roles
-- -----------------------------------------------------------------------------
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla: usuarios
-- -----------------------------------------------------------------------------
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuarios_role FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT
);
CREATE INDEX idx_usuarios_role ON usuarios (role_id);
CREATE INDEX idx_usuarios_status ON usuarios (status);

CREATE TRIGGER trg_usuarios_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Tabla: categorias
-- -----------------------------------------------------------------------------
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    icon VARCHAR(50) DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_categorias_status ON categorias (status);

CREATE TRIGGER trg_categorias_updated_at
BEFORE UPDATE ON categorias
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Tabla: productos
-- -----------------------------------------------------------------------------
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT DEFAULT NULL,
    image_url VARCHAR(500) DEFAULT NULL,
    category_id INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    is_top_selling BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_productos_category FOREIGN KEY (category_id) REFERENCES categorias (id) ON DELETE RESTRICT
);
CREATE INDEX idx_productos_category ON productos (category_id);
CREATE INDEX idx_productos_status ON productos (status);
CREATE INDEX idx_productos_price ON productos (price);

CREATE TRIGGER trg_productos_updated_at
BEFORE UPDATE ON productos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Tabla: mesas
-- -----------------------------------------------------------------------------
CREATE TABLE mesas (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL UNIQUE,
    status VARCHAR(20) DEFAULT 'libre' CHECK (status IN ('libre', 'ocupada', 'pendiente_pago')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_mesas_status ON mesas (status);

CREATE TRIGGER trg_mesas_updated_at
BEFORE UPDATE ON mesas
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Tabla: metodos_pago
-- -----------------------------------------------------------------------------
CREATE TABLE metodos_pago (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- Tabla: cajas
-- -----------------------------------------------------------------------------
CREATE TABLE cajas (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    opening_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    closing_amount NUMERIC(10,2) DEFAULT NULL,
    cash_sales NUMERIC(10,2) DEFAULT 0.00,
    qr_sales NUMERIC(10,2) DEFAULT 0.00,
    total_sales NUMERIC(10,2) DEFAULT 0.00,
    order_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'abierta' CHECK (status IN ('abierta', 'cerrada')),
    opened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_cajas_user FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE RESTRICT
);
CREATE INDEX idx_cajas_status ON cajas (status);
CREATE INDEX idx_cajas_user ON cajas (user_id);
CREATE INDEX idx_cajas_opened ON cajas (opened_at);

-- -----------------------------------------------------------------------------
-- Tabla: ventas
-- -----------------------------------------------------------------------------
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    caja_id INT DEFAULT NULL,
    mesa_id INT DEFAULT NULL,
    user_id INT NOT NULL,
    payment_method_id INT DEFAULT NULL,
    sale_type VARCHAR(20) NOT NULL CHECK (sale_type IN ('mesa', 'llevar')),
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'activa' CHECK (status IN ('activa', 'cerrada', 'cancelada', 'reservada', '')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ventas_caja FOREIGN KEY (caja_id) REFERENCES cajas (id) ON DELETE RESTRICT,
    CONSTRAINT fk_ventas_mesa FOREIGN KEY (mesa_id) REFERENCES mesas (id) ON DELETE SET NULL,
    CONSTRAINT fk_ventas_user FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE RESTRICT,
    CONSTRAINT fk_ventas_payment_method FOREIGN KEY (payment_method_id) REFERENCES metodos_pago (id) ON DELETE RESTRICT
);
CREATE INDEX idx_ventas_caja ON ventas (caja_id);
CREATE INDEX idx_ventas_mesa ON ventas (mesa_id);
CREATE INDEX idx_ventas_user ON ventas (user_id);
CREATE INDEX idx_ventas_payment_method ON ventas (payment_method_id);
CREATE INDEX idx_ventas_type ON ventas (sale_type);
CREATE INDEX idx_ventas_status ON ventas (status);
CREATE INDEX idx_ventas_created ON ventas (created_at);

CREATE TRIGGER trg_ventas_updated_at
BEFORE UPDATE ON ventas
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Tabla: detalle_ventas
-- -----------------------------------------------------------------------------
CREATE TABLE detalle_ventas (
    id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_detalle_sale FOREIGN KEY (sale_id) REFERENCES ventas (id) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_product FOREIGN KEY (product_id) REFERENCES productos (id) ON DELETE RESTRICT
);
CREATE INDEX idx_detalle_sale ON detalle_ventas (sale_id);
CREATE INDEX idx_detalle_product ON detalle_ventas (product_id);

-- -----------------------------------------------------------------------------
-- Tabla: venta_pagos
-- -----------------------------------------------------------------------------
CREATE TABLE venta_pagos (
    id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_venta_pagos_sale FOREIGN KEY (sale_id) REFERENCES ventas (id) ON DELETE CASCADE,
    CONSTRAINT fk_venta_pagos_payment_method FOREIGN KEY (payment_method_id) REFERENCES metodos_pago (id) ON DELETE RESTRICT
);
CREATE INDEX idx_venta_pagos_sale ON venta_pagos (sale_id);
CREATE INDEX idx_venta_pagos_payment_method ON venta_pagos (payment_method_id);

-- -----------------------------------------------------------------------------
-- Tabla: whatsapp_messages
-- -----------------------------------------------------------------------------
CREATE TABLE whatsapp_messages (
    id SERIAL PRIMARY KEY,
    remote_jid VARCHAR(100) DEFAULT NULL,
    message_id VARCHAR(100) DEFAULT NULL UNIQUE,
    sender_name VARCHAR(100) DEFAULT NULL,
    sender_phone VARCHAR(20) DEFAULT NULL,
    message_text TEXT DEFAULT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'audio', 'document', 'video')),
    media_url VARCHAR(500) DEFAULT NULL,
    is_order BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
