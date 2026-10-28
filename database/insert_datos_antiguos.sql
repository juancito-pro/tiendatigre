-- =============================================================================
-- Tigre Burger POS - Plantilla SQL para insertar datos con fechas antiguas
-- Base de datos: PostgreSQL (tigre_burger_pos)
-- =============================================================================

-- 1. INSERTAR UNA CAJA CON FECHA ANTIGUA (Ejemplo: 15 de Septiembre 2026)
-- -----------------------------------------------------------------------------
INSERT INTO cajas (
    user_id,
    opening_amount,
    closing_amount,
    cash_sales,
    qr_sales,
    total_sales,
    order_count,
    status,
    opened_at,
    closed_at
) VALUES (
    1,                       -- user_id (1 = Admin)
    200.00,                  -- monto inicial
    650.00,                  -- monto cierre (fondo + ventas efectivo)
    450.00,                  -- ventas en efectivo
    210.00,                  -- ventas en QR
    660.00,                  -- total ventas
    3,                       -- cantidad de pedidos
    'cerrada',
    '2026-09-15 18:00:00',   -- fecha de apertura
    '2026-09-15 23:30:00'    -- fecha de cierre
);

-- Obtener el ID de la caja recién creada
-- (En psql o script puedes usar una variable o el último id: SELECT currval('cajas_id_seq');)

-- 2. INSERTAR VENTAS CON FECHA ANTIGUA VINCULADAS A LA CAJA
-- -----------------------------------------------------------------------------
-- Venta 1: En mesa
INSERT INTO ventas (
    caja_id, mesa_id, user_id, payment_method_id,
    sale_type, subtotal, total, status, created_at, updated_at
) VALUES (
    (SELECT MAX(id) FROM cajas),
    1,                       -- Mesa 1
    1,                       -- Admin
    1,                       -- 1 = Efectivo, 2 = QR
    'mesa',
    42.00,
    42.00,
    'cerrada',
    '2026-09-15 19:15:00',
    '2026-09-15 19:15:00'
);

-- Detalle de la Venta 1 (2 Hamburguesas de Bs. 21.00)
INSERT INTO detalle_ventas (sale_id, product_id, quantity, unit_price, subtotal, notes)
VALUES (
    (SELECT MAX(id) FROM ventas),
    3,                       -- ID producto (Mixta)
    2,
    21.00,
    42.00,
    'Bien cocida'
);

-- Pago de la Venta 1
INSERT INTO venta_pagos (sale_id, payment_method_id, amount, created_at)
VALUES (
    (SELECT MAX(id) FROM ventas),
    1,                       -- Efectivo
    42.00,
    '2026-09-15 19:15:00'
);

-- -----------------------------------------------------------------------------
-- Venta 2: Para llevar con QR
INSERT INTO ventas (
    caja_id, mesa_id, user_id, payment_method_id,
    sale_type, subtotal, total, status, created_at, updated_at
) VALUES (
    (SELECT MAX(id) FROM cajas),
    NULL,
    1,
    2,                       -- QR
    'llevar',
    38.00,
    38.00,
    'cerrada',
    '2026-09-15 20:30:00',
    '2026-09-15 20:30:00'
);

-- Detalle de la Venta 2
INSERT INTO detalle_ventas (sale_id, product_id, quantity, unit_price, subtotal)
VALUES (
    (SELECT MAX(id) FROM ventas),
    2,                       -- ID producto (Salchipapa Entera)
    1,
    21.00,
    21.00
);
INSERT INTO detalle_ventas (sale_id, product_id, quantity, unit_price, subtotal)
VALUES (
    (SELECT MAX(id) FROM ventas),
    4,                       -- ID producto (Hamburguesa con Papas)
    1,
    17.00,
    17.00
);

-- Pago de la Venta 2
INSERT INTO venta_pagos (sale_id, payment_method_id, amount, created_at)
VALUES (
    (SELECT MAX(id) FROM ventas),
    2,                       -- QR
    38.00,
    '2026-09-15 20:30:00'
);

-- =============================================================================
-- RECOMENDADO: Sincronizar secuencias luego de insertar manualmente
-- =============================================================================
SELECT setval('cajas_id_seq', (SELECT MAX(id) FROM cajas));
SELECT setval('ventas_id_seq', (SELECT MAX(id) FROM ventas));
SELECT setval('detalle_ventas_id_seq', (SELECT MAX(id) FROM detalle_ventas));
SELECT setval('venta_pagos_id_seq', (SELECT MAX(id) FROM venta_pagos));
