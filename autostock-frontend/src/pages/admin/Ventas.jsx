import { useEffect, useState } from 'react';
import { getVentas } from '../../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    getVentas().then(res => setVentas(res.data));
  }, []);

  const total = ventas.reduce((acc, v) => acc + parseFloat(v.total), 0);

  return (
    <section>
      <header className="page-header">
        <h2>💰 Historial de Ventas</h2>
        <p>Registro de todas las ventas realizadas</p>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <p className="stat-label">Total ventas</p>
          <p className="stat-value">{ventas.length}</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Ingresos totales</p>
          <p className="stat-value">${total.toFixed(2)}</p>
        </article>
      </section>

      <table className="tabla">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Cédula/RUC</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{new Date(v.created_at).toLocaleDateString('es-EC')}</td>
              <td>{v.product?.nombre}</td>
              <td>{v.user?.name}</td>
              <td>{v.cliente_nombre}</td>
              <td>
                <span className={`badge ${v.tipo_cliente === 'consumidor_final' ? 'accesorio' : 'bateria'}`}>
                  {v.tipo_cliente === 'consumidor_final' ? 'Consumidor final' : v.tipo_cliente.toUpperCase()}
                </span>
              </td>
              <td>{v.cliente_cedula || '—'}</td>
              <td>{v.cantidad}</td>
              <td>${v.precio_unitario}</td>
              <td>{v.descuento_aplicado > 0 ? `${v.descuento_aplicado}%` : '—'}</td>
              <td><strong>${v.total}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Ventas;