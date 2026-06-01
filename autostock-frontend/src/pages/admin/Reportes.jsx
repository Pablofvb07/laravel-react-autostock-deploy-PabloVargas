import { useEffect, useState } from 'react';
import { getReporteMargen, getReporteBodega } from '../../services/api';

function Reportes() {
  const [margen, setMargen]   = useState([]);
  const [bodega, setBodega]   = useState([]);
  const [tab, setTab]         = useState('margen');

  useEffect(() => {
    getReporteMargen().then(res => setMargen(res.data));
    getReporteBodega().then(res => setBodega(res.data));
  }, []);

  return (
    <section>
      <header className="page-header">
        <h2>📊 Reportes</h2>
        <p>Análisis de margen de ganancia y tiempo en bodega</p>
      </header>

      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <button
          className={`button sm ${tab === 'margen' ? '' : 'ghost'}`}
          onClick={() => setTab('margen')}
        >
          💹 Margen de ganancia
        </button>
        <button
          className={`button sm ${tab === 'bodega' ? '' : 'ghost'}`}
          onClick={() => setTab('bodega')}
        >
          📦 Tiempo en bodega
        </button>
      </nav>

      {tab === 'margen' && (
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Precio costo</th>
              <th>Precio venta</th>
              <th>Margen ($)</th>
              <th>Margen (%)</th>
            </tr>
          </thead>
          <tbody>
            {margen.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.proveedor?.nombre || '—'}</td>
                <td>${p.precio_costo}</td>
                <td>${p.precio_venta}</td>
                <td>${p.margen}</td>
                <td>
                  <span className={`badge ${p.porcentaje_margen > 40 ? 'bateria' : 'accesorio'}`}>
                    {p.porcentaje_margen}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'bodega' && (
        <table className="tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Stock</th>
              <th>Fecha ingreso</th>
              <th>Días en bodega</th>
              <th>Descuento aplicable</th>
            </tr>
          </thead>
          <tbody>
            {bodega.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.proveedor?.nombre || '—'}</td>
                <td>{p.stock}</td>
                <td>{new Date(p.fecha_ingreso).toLocaleDateString('es-EC')}</td>
                <td>
                  <span className={`badge ${p.dias_en_bodega > 180 ? 'bateria' : p.dias_en_bodega > 90 ? 'admin' : 'accesorio'}`}>
                    {Math.floor(p.dias_en_bodega)} días
                  </span>
                </td>
                <td>
                  {p.dias_en_bodega > 180 ? '25%' : p.dias_en_bodega > 90 ? '15%' : 'Sin descuento'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Reportes;