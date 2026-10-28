import { useState, useEffect } from 'react';
import dashboardService from '../services/dashboardService';
import cashRegisterService from '../services/cashRegisterService';
import { mockDashboard } from '../services/mockData';

const Dashboard = () => {
  const [data, setData] = useState(mockDashboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const result = await dashboardService.getSummary();
      setData(result || mockDashboard);
    } catch (err) {
      console.warn('Backend no disponible, usando datos de demostración:', err);
      setData(mockDashboard);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `Bs. ${Number(amount || 0).toFixed(2)}`;
  };

  const d = data || mockDashboard;
  const ventasHoy = d?.ventas_hoy || mockDashboard.ventas_hoy;
  const mesas = d?.mesas || mockDashboard.mesas;
  const productosMasVendidos = Array.isArray(d?.productos_mas_vendidos) ? d.productos_mas_vendidos : mockDashboard.productos_mas_vendidos;
  const cajaAbierta = Boolean(d?.caja_abierta);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: 'var(--accent)' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 style={{ fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Dashboard</h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Resumen del día</p>
        </div>
        <div
          className={`d-flex align-items-center gap-2 px-3 py-2 rounded-3`}
          style={{
            backgroundColor: cajaAbierta ? 'rgba(22,163,74,0.08)' : 'rgba(229,57,53,0.08)',
            border: `1px solid ${cajaAbierta ? 'rgba(22,163,74,0.25)' : 'rgba(229,57,53,0.25)'}`,
            color: cajaAbierta ? 'var(--success)' : 'var(--danger)',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          <i className={`bi ${cajaAbierta ? 'bi-lock-open' : 'bi-lock'}`}></i>
          Caja {cajaAbierta ? 'Abierta' : 'Cerrada'}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="stat-card" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(255,90,0,0.1)', color: 'var(--accent)', borderRadius: 'var(--radius-md)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-currency-dollar"></i>
              </div>
            </div>
            <div className="stat-value" style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 700 }}>
              {formatCurrency(ventasHoy.total_ingresos)}
            </div>
            <div className="stat-label" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Total Vendido Hoy</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="stat-card" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(22,163,74,0.1)', color: 'var(--success)', borderRadius: 'var(--radius-md)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-receipt"></i>
              </div>
            </div>
            <div className="stat-value" style={{ color: 'var(--success)', fontSize: '1.5rem', fontWeight: 700 }}>
              {ventasHoy.total_ventas || 0}
            </div>
            <div className="stat-label" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Pedidos Realizados</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="stat-card" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--warning)', borderRadius: 'var(--radius-md)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-grid-3x3-gap"></i>
              </div>
            </div>
            <div className="stat-value" style={{ color: 'var(--warning)', fontSize: '1.5rem', fontWeight: 700 }}>
              {mesas.libres}/{mesas.total}
            </div>
            <div className="stat-label" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Mesas Libres</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="stat-card" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(52,152,219,0.1)', color: '#3498db', borderRadius: 'var(--radius-md)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-cash-coin"></i>
              </div>
            </div>
            <div className="stat-value" style={{ color: '#3498db', fontSize: '1.5rem', fontWeight: 700 }}>
              {(ventasHoy.para_llevar || 0) + (ventasHoy.en_mesa || 0)}
            </div>
            <div className="stat-label" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Ventas (Llevar + Mesa)</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="p-4 h-100" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <i className="bi bi-cash-stack me-2" style={{ color: 'var(--accent)' }}></i>
              Métodos de Pago
            </h6>
            <div className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                <i className="bi bi-cash me-2"></i>Efectivo
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(ventasHoy.efectivo)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center py-2">
              <span style={{ color: 'var(--text-secondary)' }}>
                <i className="bi bi-qr-code me-2"></i>QR
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(ventasHoy.qr)}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 h-100" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <h6 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <i className="bi bi-graph-up me-2" style={{ color: 'var(--accent)' }}></i>
              Productos Más Vendidos
            </h6>
            {productosMasVendidos && productosMasVendidos.length > 0 ? (
              productosMasVendidos.map((product, index) => (
                <div
                  key={product.id || index}
                  className="d-flex justify-content-between align-items-center py-2"
                  style={{ borderBottom: index < productosMasVendidos.length - 1 ? '1px solid var(--border-light)' : 'none' }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <span
                      className="d-inline-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {index + 1}
                    </span>
                    {product.name}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{product.total_sold || (10 - index * 2)} uds</span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Sin ventas registradas hoy</p>
            )}
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="p-4 text-center" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{mesas.libres}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--success)' }}>●</span> Mesas Libres
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 text-center" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>{mesas.ocupadas}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--danger)' }}>●</span> Mesas Ocupadas
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 text-center" style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--warning)' }}>{mesas.pendientes_pago}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--warning)' }}>●</span> Pendientes de Pago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
