// Datos de demostración y fallback cuando no hay backend conectado (ej. Vercel)
export const mockUser = {
  id: 1,
  username: 'admin',
  full_name: 'Administrador General',
  role: 'admin'
};

export const mockCategories = [
  {
    "id": 1,
    "name": "Salchipapas",
    "description": "Variedad de salchipapas del menú",
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-19T18:52:59.000Z",
    "updated_at": "2026-07-19T18:52:59.000Z"
  },
  {
    "id": 2,
    "name": "Hamburguesas",
    "description": "Hamburguesas clásicas y especiales",
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-19T18:52:59.000Z",
    "updated_at": "2026-07-19T18:52:59.000Z"
  },
  {
    "id": 3,
    "name": "Especiales",
    "description": "Combos y platos especiales de la casa",
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-19T18:52:59.000Z",
    "updated_at": "2026-07-19T18:52:59.000Z"
  },
  {
    "id": 4,
    "name": "Sueltos",
    "description": "Productos vendidos por unidad o adicionales",
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-19T18:52:59.000Z",
    "updated_at": "2026-07-19T18:52:59.000Z"
  },
  {
    "id": 5,
    "name": "Refrescos",
    "description": "Bebidas y gaseosas",
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-19T18:53:37.000Z",
    "updated_at": "2026-07-19T18:53:37.000Z"
  },
  {
    "id": 6,
    "name": "Refrescos Calle ",
    "description": null,
    "icon": null,
    "status": "activo",
    "created_at": "2026-07-23T02:50:22.000Z",
    "updated_at": "2026-07-23T02:50:22.000Z"
  }
];

export const mockProducts = [
  {
    "id": 1,
    "name": "Salchipapa normal",
    "description": "salchicha con papas ",
    "image_url": "/uploads/products/product_1785195917954_275936.png",
    "category_id": 1,
    "price": 17,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:03.000Z",
    "updated_at": "2026-07-31T03:27:05.000Z"
  },
  {
    "id": 2,
    "name": "Salchipapa Entera",
    "description": "mas cantidad de salchicha y papa",
    "image_url": "/uploads/products/product_1785195813479_515897.png",
    "category_id": 1,
    "price": 21,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:29.000Z",
    "updated_at": "2026-07-31T03:27:05.000Z"
  },
  {
    "id": 3,
    "name": "Mixta",
    "description": "Hamburguesa con salchipapa",
    "image_url": "/uploads/products/product_1785193932655_630119.png",
    "category_id": 2,
    "price": 21,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:49.000Z",
    "updated_at": "2026-07-31T03:26:55.000Z"
  },
  {
    "id": 4,
    "name": "Hamburguesas Con Papas",
    "description": "Hamburguesa con papas fritas ",
    "image_url": "/uploads/products/product_1785193831837_859791.png",
    "category_id": 2,
    "price": 17,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:56:18.000Z",
    "updated_at": "2026-07-31T03:27:22.000Z"
  },
  {
    "id": 5,
    "name": "Hamburguesa suelta",
    "description": "Hamburguesa sin papas",
    "image_url": "/uploads/products/product_1785194141575_593068.png",
    "category_id": 4,
    "price": 10,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:56:44.000Z",
    "updated_at": "2026-07-31T03:27:10.000Z"
  },
  {
    "id": 6,
    "name": "hot dog ",
    "description": "simplementen un hot dog xd",
    "image_url": "/uploads/products/product_1785196154205_19575.png",
    "category_id": 4,
    "price": 10,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:57:10.000Z",
    "updated_at": "2026-07-31T03:27:14.000Z"
  },
  {
    "id": 7,
    "name": "hamburguesa doble suelta",
    "description": "hamburguesa con doble carne sin papas",
    "image_url": "/uploads/products/product_1785195598062_412340.png",
    "category_id": 4,
    "price": 17,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-19T18:57:30.000Z",
    "updated_at": "2026-07-28T03:39:58.000Z"
  },
  {
    "id": 8,
    "name": "Chupacabras",
    "description": "hamburguesa con doble carne con huevo o queso con salchicha y papas",
    "image_url": "/uploads/products/product_1785195675694_742383.png",
    "category_id": 3,
    "price": 28,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-19T18:58:03.000Z",
    "updated_at": "2026-07-28T03:41:15.000Z"
  },
  {
    "id": 9,
    "name": "Mini personal",
    "description": "mini refresco ",
    "image_url": "/uploads/products/product_1785201890230_297624.png",
    "category_id": 5,
    "price": 2.5,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:15:41.000Z",
    "updated_at": "2026-07-28T05:24:50.000Z"
  },
  {
    "id": 10,
    "name": "1 LITRO REFRESCO",
    "description": "REFRESCO DE 1 LITRO",
    "image_url": "/uploads/products/product_1784793981279_138816.jpg",
    "category_id": 5,
    "price": 9,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:16:08.000Z",
    "updated_at": "2026-07-23T12:06:21.000Z"
  },
  {
    "id": 11,
    "name": "Refresco Popular ",
    "description": "popular refresco",
    "image_url": "/uploads/products/product_1785202929007_576762.png",
    "category_id": 5,
    "price": 7,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:16:41.000Z",
    "updated_at": "2026-10-28T13:18:14.607Z"
  },
  {
    "id": 12,
    "name": "1 litro y medio ",
    "description": "refresco litro y medio",
    "image_url": "/uploads/products/product_1785202067330_896656.png",
    "category_id": 5,
    "price": 11,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:16:59.000Z",
    "updated_at": "2026-07-28T05:27:47.000Z"
  },
  {
    "id": 13,
    "name": "mixta doble ",
    "description": "misxta con doble carne ",
    "image_url": "/uploads/products/product_1785194605791_661081.png",
    "category_id": 2,
    "price": 26,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:30:13.000Z",
    "updated_at": "2026-07-28T03:23:25.000Z"
  },
  {
    "id": 14,
    "name": "hamburguesa con queso y papas ",
    "description": "",
    "image_url": "/uploads/products/product_1785195091762_740557.png",
    "category_id": 2,
    "price": 20,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:31:14.000Z",
    "updated_at": "2026-07-28T03:31:31.000Z"
  },
  {
    "id": 15,
    "name": "Hamburguesa con huevos y papas",
    "description": "Pan con carne y huevo y una porcion de papass ",
    "image_url": "/uploads/products/product_1785194455836_719514.png",
    "category_id": 2,
    "price": 20,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:33:18.000Z",
    "updated_at": "2026-07-28T03:20:55.000Z"
  },
  {
    "id": 16,
    "name": "mixta con queso ",
    "description": "Mixta con queso y salchipapa",
    "image_url": "/uploads/products/product_1785196648141_328711.png",
    "category_id": 2,
    "price": 24,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:33:32.000Z",
    "updated_at": "2026-07-28T03:57:28.000Z"
  },
  {
    "id": 17,
    "name": "Porcion de papas `",
    "description": "",
    "image_url": "/uploads/products/product_1785201614989_293036.png",
    "category_id": 4,
    "price": 12,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:35:16.000Z",
    "updated_at": "2026-07-28T05:20:15.000Z"
  },
  {
    "id": 18,
    "name": "Porcion de salchicha ",
    "description": "",
    "image_url": "/uploads/products/product_1785200872258_312972.png",
    "category_id": 4,
    "price": 12,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:35:26.000Z",
    "updated_at": "2026-07-28T05:07:52.000Z"
  },
  {
    "id": 19,
    "name": "Hamburguesa doble con queso o huevo  y papas ",
    "description": "",
    "image_url": "/uploads/products/product_1785194824957_273403.png",
    "category_id": 2,
    "price": 25,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:35:48.000Z",
    "updated_at": "2026-07-28T03:27:04.000Z"
  },
  {
    "id": 20,
    "name": "Hamburguesa doble con papas ",
    "description": "",
    "image_url": "/uploads/products/product_1785200357491_601755.png",
    "category_id": 2,
    "price": 22,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:36:27.000Z",
    "updated_at": "2026-07-28T04:59:17.000Z"
  },
  {
    "id": 21,
    "name": "Sandwich de huevo",
    "description": "",
    "image_url": "/uploads/products/product_1785196274308_595966.png",
    "category_id": 4,
    "price": 6,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T03:36:48.000Z",
    "updated_at": "2026-07-31T06:47:02.000Z"
  },
  {
    "id": 22,
    "name": "Hamburguesa suelta con huevo",
    "description": "Hamburguesa sin papas con huevo",
    "image_url": "/uploads/products/product_1785198966412_99452.png",
    "category_id": 4,
    "price": 13,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-20T05:09:35.000Z",
    "updated_at": "2026-07-28T04:36:06.000Z"
  },
  {
    "id": 23,
    "name": "Doña Mary",
    "description": " Es un especial de hamburguesa con pocas papas y salchicha y con huevo ",
    "image_url": null,
    "category_id": 3,
    "price": 17,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-22T03:55:59.000Z",
    "updated_at": "2026-07-22T03:55:59.000Z"
  },
  {
    "id": 24,
    "name": "Frutal Popular",
    "description": "frutal popular ",
    "image_url": "/uploads/products/product_1785202818611_660353.png",
    "category_id": 5,
    "price": 11,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-22T06:15:20.000Z",
    "updated_at": "2026-07-28T05:40:18.000Z"
  },
  {
    "id": 25,
    "name": "Frutal 1LT",
    "description": "Frutal de 1LT",
    "image_url": "/uploads/products/product_1785202918778_346612.png",
    "category_id": 5,
    "price": 14,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-22T06:55:26.000Z",
    "updated_at": "2026-07-28T05:41:58.000Z"
  },
  {
    "id": 26,
    "name": "1LT con botella",
    "description": "para cuando es para llevar cambio de botella ",
    "image_url": null,
    "category_id": 6,
    "price": 5.5,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-23T02:51:01.000Z",
    "updated_at": "2026-07-23T02:51:01.000Z"
  },
  {
    "id": 27,
    "name": "Mixta con huevo",
    "description": "",
    "image_url": "/uploads/products/product_1785199209775_837331.png",
    "category_id": 2,
    "price": 24,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-23T05:35:19.000Z",
    "updated_at": "2026-07-28T04:40:09.000Z"
  },
  {
    "id": 28,
    "name": "Hamburguesa Doble con queso Suelta",
    "description": "Hamburguesa con doble carne con queso sin papas",
    "image_url": "/uploads/products/product_1785195255434_780314.png",
    "category_id": 4,
    "price": 20,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-28T03:34:15.000Z",
    "updated_at": "2026-07-28T03:34:15.000Z"
  },
  {
    "id": 29,
    "name": "Hamburguesa doble con huevo suelta",
    "description": "Hambujrguesa con doble carne y huevo sin papas ",
    "image_url": "/uploads/products/product_1785195406698_33083.png",
    "category_id": 4,
    "price": 20,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-28T03:36:46.000Z",
    "updated_at": "2026-07-28T03:36:46.000Z"
  },
  {
    "id": 30,
    "name": "popular para la calle",
    "description": "es cuando es cambio de botella o no para comer aqui ",
    "image_url": "/uploads/products/product_1785283328207_923100.png",
    "category_id": 6,
    "price": 4.5,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-29T04:02:08.000Z",
    "updated_at": "2026-07-29T04:02:08.000Z"
  },
  {
    "id": 31,
    "name": "COCA 2.5LT",
    "description": null,
    "image_url": "/uploads/products/product_1785367228735_499641.jpg",
    "category_id": 5,
    "price": 14,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-30T03:20:28.000Z",
    "updated_at": "2026-07-30T03:20:28.000Z"
  },
  {
    "id": 32,
    "name": "COCA COLA 2.5LT",
    "description": "Refresco gaseoso sabor cola este precio es para llevar ",
    "image_url": "/uploads/products/product_1785375953682_642186.jpg",
    "category_id": 6,
    "price": 11,
    "is_top_selling": false,
    "status": "activo",
    "created_at": "2026-07-30T05:45:53.000Z",
    "updated_at": "2026-07-30T05:45:53.000Z"
  }
];

export const mockTables = [
  {
    "id": 1,
    "number": 1,
    "status": "libre",
    "created_at": "2026-07-19T18:20:20.000Z",
    "updated_at": "2026-07-31T03:38:44.000Z"
  },
  {
    "id": 2,
    "number": 2,
    "status": "libre",
    "created_at": "2026-07-19T18:20:20.000Z",
    "updated_at": "2026-07-30T06:53:16.000Z"
  },
  {
    "id": 3,
    "number": 3,
    "status": "libre",
    "created_at": "2026-07-19T18:20:20.000Z",
    "updated_at": "2026-07-31T06:10:28.000Z"
  },
  {
    "id": 4,
    "number": 4,
    "status": "libre",
    "created_at": "2026-07-19T18:20:20.000Z",
    "updated_at": "2026-10-28T13:39:27.478Z"
  },
  {
    "id": 5,
    "number": 5,
    "status": "libre",
    "created_at": "2026-07-19T18:20:20.000Z",
    "updated_at": "2026-10-28T13:38:40.383Z"
  }
];

export const mockCashRegister = {
  id: 1,
  user_id: 1,
  full_name: 'Administrador General',
  opening_amount: 200,
  cash_sales: 450,
  qr_sales: 300,
  total_sales: 750,
  order_count: 12,
  status: 'abierta',
  opened_at: new Date().toISOString()
};

export const mockDashboard = {
  caja_abierta: true,
  caja_info: {
    id: 1,
    monto_inicial: 200,
    abierto_por: 'Administrador General',
    abierto_en: new Date().toISOString()
  },
  ventas_hoy: {
    total_ventas: 12,
    total_ingresos: 750,
    efectivo: 450,
    qr: 300,
    para_llevar: 5,
    en_mesa: 7
  },
  mesas: {
    total: 5,
    libres: 3,
    ocupadas: 2,
    pendientes_pago: 0
  },
  productos_mas_vendidos: [
  {
    "id": 1,
    "name": "Salchipapa normal",
    "description": "salchicha con papas ",
    "image_url": "/uploads/products/product_1785195917954_275936.png",
    "category_id": 1,
    "price": 17,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:03.000Z",
    "updated_at": "2026-07-31T03:27:05.000Z"
  },
  {
    "id": 2,
    "name": "Salchipapa Entera",
    "description": "mas cantidad de salchicha y papa",
    "image_url": "/uploads/products/product_1785195813479_515897.png",
    "category_id": 1,
    "price": 21,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:29.000Z",
    "updated_at": "2026-07-31T03:27:05.000Z"
  },
  {
    "id": 3,
    "name": "Mixta",
    "description": "Hamburguesa con salchipapa",
    "image_url": "/uploads/products/product_1785193932655_630119.png",
    "category_id": 2,
    "price": 21,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:55:49.000Z",
    "updated_at": "2026-07-31T03:26:55.000Z"
  },
  {
    "id": 4,
    "name": "Hamburguesas Con Papas",
    "description": "Hamburguesa con papas fritas ",
    "image_url": "/uploads/products/product_1785193831837_859791.png",
    "category_id": 2,
    "price": 17,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:56:18.000Z",
    "updated_at": "2026-07-31T03:27:22.000Z"
  },
  {
    "id": 5,
    "name": "Hamburguesa suelta",
    "description": "Hamburguesa sin papas",
    "image_url": "/uploads/products/product_1785194141575_593068.png",
    "category_id": 4,
    "price": 10,
    "is_top_selling": true,
    "status": "activo",
    "created_at": "2026-07-19T18:56:44.000Z",
    "updated_at": "2026-07-31T03:27:10.000Z"
  }
]
};

export const mockSales = [
  {
    id: 101,
    code: 'V-001',
    sale_type: 'para_llevar',
    total: 38,
    payment_method: 'Efectivo',
    mesa_id: null,
    mesa_numero: null,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'completada'
  },
  {
    id: 102,
    code: 'V-002',
    sale_type: 'en_mesa',
    total: 42,
    payment_method: 'QR',
    mesa_id: 2,
    mesa_numero: 2,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'completada'
  },
  {
    id: 103,
    code: 'V-003',
    sale_type: 'para_llevar',
    total: 21,
    payment_method: 'Efectivo',
    mesa_id: null,
    mesa_numero: null,
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
    status: 'completada'
  },
  {
    id: 104,
    code: 'V-004',
    sale_type: 'en_mesa',
    total: 64,
    payment_method: 'Efectivo',
    mesa_id: 1,
    mesa_numero: 1,
    created_at: new Date(Date.now() - 1800000).toISOString(),
    status: 'completada'
  },
  {
    id: 105,
    code: 'V-005',
    sale_type: 'para_llevar',
    total: 17,
    payment_method: 'QR',
    mesa_id: null,
    mesa_numero: null,
    created_at: new Date(Date.now() - 600000).toISOString(),
    status: 'completada'
  }
];

export const mockDailyReport = {
  stats: {
    total_sales: 14,
    total_revenue: 820,
    takeaway_count: 6,
    mesa_count: 8,
    cash_total: 490,
    qr_total: 330
  },
  sales: [
    { id: 1, code: 'V-001', time: '12:30', sale_type: 'para_llevar', total: 38, payment_method: 'Efectivo', mesa_numero: null, items_summary: '2x Salchipapa normal' },
    { id: 2, code: 'V-002', time: '13:10', sale_type: 'en_mesa', total: 42, payment_method: 'QR', mesa_numero: 2, items_summary: '1x Hamburguesa Doble, 1x Coca Cola' },
    { id: 3, code: 'V-003', time: '13:45', sale_type: 'para_llevar', total: 21, payment_method: 'Efectivo', mesa_numero: null, items_summary: '1x Salchipapa Entera' },
    { id: 4, code: 'V-004', time: '14:20', sale_type: 'en_mesa', total: 64, payment_method: 'Efectivo', mesa_numero: 1, items_summary: '2x Mixta, 2x Jugo' },
    { id: 5, code: 'V-005', time: '15:00', sale_type: 'para_llevar', total: 17, payment_method: 'QR', mesa_numero: null, items_summary: '1x Salchipapa normal' }
  ]
};

export const mockTopProductsReport = [
  { id: 1, name: 'Salchipapa normal', category_name: 'Salchipapas', total_quantity: 24, total_revenue: 408 },
  { id: 2, name: 'Salchipapa Entera', category_name: 'Salchipapas', total_quantity: 18, total_revenue: 378 },
  { id: 3, name: 'Mixta', category_name: 'Hamburguesas', total_quantity: 15, total_revenue: 315 },
  { id: 4, name: 'Hamburguesas Con Papas', category_name: 'Hamburguesas', total_quantity: 12, total_revenue: 204 },
  { id: 5, name: 'Hamburguesa suelta', category_name: 'Sueltos', total_quantity: 10, total_revenue: 100 }
];

export const mockReservations = [
  {
    id: 201,
    customer_name: 'Carlos Mendoza',
    phone: '71234567',
    notes: 'Reserva para las 14:00 - 2 Salchipapas',
    total: 38,
    status: 'pendiente',
    created_at: new Date().toISOString(),
    items: [
      { id: 1, product_id: 1, product_name: 'Salchipapa normal', quantity: 2, unit_price: 17, subtotal: 34 }
    ]
  }
];

export const mockTodaySummary = {
  total_ventas: 14,
  total_ingresos: 820,
  efectivo: 490,
  qr: 330,
  para_llevar: 6,
  en_mesa: 8,
  caja_abierta: true
};

