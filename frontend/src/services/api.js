import axios from 'axios';
import {
  mockUser,
  mockCategories,
  mockProducts,
  mockTables,
  mockCashRegister,
  mockDashboard,
  mockSales,
  mockDailyReport,
  mockTopProductsReport,
  mockReservations,
  mockTodaySummary
} from './mockData';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.VITE_SOCKET_URL) {
    return `${import.meta.env.VITE_SOCKET_URL}/api`;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resuelve cualquier petición simulada cuando no hay backend (ej: Vercel)
const resolveMock = (url = '', method = 'get') => {
  const cleanUrl = url.toLowerCase();

  // Auth
  if (cleanUrl.includes('/auth/login')) {
    return { token: 'mock-tigre-pos-jwt-token', user: mockUser };
  }
  if (cleanUrl.includes('/auth/profile')) {
    return mockUser;
  }

  // Dashboard
  if (cleanUrl.includes('/dashboard')) {
    return mockDashboard;
  }

  // Products
  if (cleanUrl.includes('/products/top-selling')) {
    return mockProducts.filter((p) => p.is_top_selling);
  }
  if (cleanUrl.includes('/products/category/')) {
    const parts = cleanUrl.split('/category/');
    const catId = parseInt(parts[1], 10);
    return mockProducts.filter((p) => p.category_id === catId);
  }
  if (cleanUrl.includes('/products/active') || cleanUrl.endsWith('/products')) {
    return mockProducts;
  }
  if (cleanUrl.includes('/products/')) {
    const parts = cleanUrl.split('/products/');
    const id = parseInt(parts[1], 10);
    return mockProducts.find((p) => p.id === id) || mockProducts[0];
  }

  // Categories
  if (cleanUrl.includes('/categories')) {
    return mockCategories;
  }

  // Tables
  if (cleanUrl.includes('/tables/status-counts')) {
    return { libre: 3, ocupada: 2, pendiente_pago: 0, total: 5 };
  }
  if (cleanUrl.includes('/tables/') && !cleanUrl.endsWith('/tables')) {
    const parts = cleanUrl.split('/tables/');
    const id = parseInt(parts[1], 10);
    return mockTables.find((t) => t.id === id) || mockTables[0];
  }
  if (cleanUrl.includes('/tables')) {
    return mockTables;
  }

  // Cash register
  if (cleanUrl.includes('/cash-register/open')) {
    return mockCashRegister;
  }
  if (cleanUrl.includes('/cash-register/today')) {
    return mockTodaySummary;
  }
  if (cleanUrl.includes('/cash-register/') && (cleanUrl.includes('/sales-details') || cleanUrl.includes('/sales'))) {
    return mockSales;
  }
  if (cleanUrl.includes('/cash-register/') && (cleanUrl.includes('/summary') || cleanUrl.includes('/closing-summary'))) {
    return {
      opening_amount: 200,
      cash_sales: 450,
      qr_sales: 300,
      total_sales: 750,
      order_count: 12,
      expected_cash: 650,
      difference: 0
    };
  }
  if (cleanUrl.includes('/cash-register')) {
    return mockCashRegister;
  }

  // Sales
  if (cleanUrl.includes('/sales/mesa/') && cleanUrl.includes('/active')) {
    const parts = cleanUrl.split('/sales/mesa/');
    const mesaId = parseInt(parts[1], 10);
    if (mesaId === 2) {
      return {
        id: 102,
        mesa_id: 2,
        sale_type: 'en_mesa',
        status: 'abierta',
        total: 42,
        items: [
          { id: 1, product_id: 1, product_name: 'Salchipapa normal', quantity: 1, unit_price: 17, subtotal: 17, notes: '' },
          { id: 2, product_id: 2, product_name: 'Salchipapa Entera', quantity: 1, unit_price: 21, subtotal: 21, notes: 'Sin mostaza' },
          { id: 3, product_id: 5, product_name: 'Refresco', quantity: 1, unit_price: 4, subtotal: 4, notes: '' }
        ]
      };
    }
    return null;
  }
  if (cleanUrl.includes('/sales/reservations')) {
    return mockReservations;
  }
  if (cleanUrl.includes('/sales/today-stats')) {
    return { total_sales: 14, total_revenue: 820, cash_total: 490, qr_total: 330 };
  }
  if (cleanUrl.includes('/sales/takeaway') || cleanUrl.includes('/sales/mesa') || cleanUrl.includes('/sales')) {
    return {
      success: true,
      sale: { id: Date.now(), total: 42, sale_type: 'para_llevar' },
      message: 'Operación realizada con éxito'
    };
  }

  // Reports
  if (cleanUrl.includes('/reports/daily')) {
    return mockDailyReport;
  }
  if (cleanUrl.includes('/reports/top-products')) {
    return mockTopProductsReport;
  }
  if (cleanUrl.includes('/reports/period')) {
    return {
      summary: [
        { date: '2026-10-28', total_sales: 14, total_revenue: 820, cash_total: 490, qr_total: 330 },
        { date: '2026-10-27', total_sales: 11, total_revenue: 738.5, cash_total: 398.5, qr_total: 340 },
        { date: '2026-10-26', total_sales: 12, total_revenue: 760.5, cash_total: 532, qr_total: 228.5 },
        { date: '2026-10-25', total_sales: 13, total_revenue: 763.5, cash_total: 634.5, qr_total: 129 }
      ],
      totals: {
        total_sales: 50,
        total_revenue: 3082.5,
        cash_total: 2055,
        qr_total: 1027.5
      }
    };
  }

  // WhatsApp
  if (cleanUrl.includes('/whatsapp/status')) {
    return { status: 'connected', qr: null, user: { name: 'Tigre Burger' } };
  }
  if (cleanUrl.includes('/whatsapp/messages') || cleanUrl.includes('/whatsapp/groups')) {
    return [];
  }
  if (cleanUrl.includes('/whatsapp')) {
    return { success: true, status: 'connected' };
  }

  return { success: true };
};

// Interceptor de respuesta con detección de HTML (rewrites de Vercel) y errores de red
api.interceptors.response.use(
  (response) => {
    // Si Vercel reescribió la llamada a index.html (retorna string HTML con código 200)
    const isHtml =
      typeof response.data === 'string' &&
      (response.data.trim().startsWith('<!doctype html') ||
        response.data.trim().startsWith('<html') ||
        response.data.includes('<!DOCTYPE html>'));

    if (isHtml) {
      const url = response.config?.url || '';
      console.warn(`[API Fallback] URL '${url}' respondió HTML de Vercel. Activando mock.`);
      return {
        ...response,
        data: resolveMock(url, response.config?.method)
      };
    }

    return response;
  },
  (error) => {
    const url = error.config?.url || '';
    const isNetworkOr404 = !error.response || error.response?.status === 404 || error.response?.status >= 500;

    if (isNetworkOr404) {
      console.warn(`[API Fallback] URL '${url}' no disponible en backend. Activando mock.`);
      return Promise.resolve({
        data: resolveMock(url, error.config?.method),
        status: 200,
        statusText: 'OK (Mock)',
        headers: {},
        config: error.config
      });
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;

