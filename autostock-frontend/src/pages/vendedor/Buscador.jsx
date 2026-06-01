import { useEffect, useState } from 'react';
import {
  getMarcas, getModelos, getAnios, getRecomendaciones, registrarVenta
} from '../../services/api';
import Swal from 'sweetalert2';

function Buscador() {
  const [marcas, setMarcas]               = useState([]);
  const [modelos, setModelos]             = useState([]);
  const [anios, setAnios]                 = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading]             = useState(false);

  const [seleccion, setSeleccion] = useState({
    marca_id: '', modelo_id: '', anio_vehiculo_id: '',
  });

  const [ventaModal, setVentaModal]               = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ventaForm, setVentaForm] = useState({
    cantidad: 1, cliente_nombre: '',
    tipo_cliente: 'consumidor_final', cliente_cedula: '',
  });
  const [ventaError, setVentaError] = useState('');

  useEffect(() => {
    getMarcas().then(res => setMarcas(res.data));
  }, []);

  const handleMarca = async (e) => {
    const marca_id = e.target.value;
    setSeleccion({ marca_id, modelo_id: '', anio_vehiculo_id: '' });
    setModelos([]);
    setAnios([]);
    setRecomendaciones([]);
    if (marca_id) {
      const res = await getModelos(marca_id);
      setModelos(res.data);
    }
  };

  const handleModelo = async (e) => {
    const modelo_id = e.target.value;
    setSeleccion({ ...seleccion, modelo_id, anio_vehiculo_id: '' });
    setAnios([]);
    setRecomendaciones([]);
    if (modelo_id) {
      const res = await getAnios(modelo_id);
      setAnios(res.data);
    }
  };

  const handleAnio = (e) => {
    setSeleccion({ ...seleccion, anio_vehiculo_id: e.target.value });
    setRecomendaciones([]);
  };

  const handleBuscar = async () => {
    if (!seleccion.anio_vehiculo_id) return;
    setLoading(true);
    try {
      const res = await getRecomendaciones(seleccion.anio_vehiculo_id);
      setRecomendaciones(res.data);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error al buscar recomendaciones' });
    } finally {
      setLoading(false);
    }
  };

  const handleVenderClick = (producto) => {
    setProductoSeleccionado(producto);
    setVentaForm({
      cantidad: 1, cliente_nombre: '',
      tipo_cliente: 'consumidor_final', cliente_cedula: '',
    });
    setVentaError('');
    setVentaModal(true);
  };

  const handleVenta = async (e) => {
    e.preventDefault();
    setVentaError('');
    try {
      await registrarVenta({
        product_id: productoSeleccionado.id,
        ...ventaForm,
      });
      setVentaModal(false);
      handleBuscar();
      Swal.fire({
        icon: 'success',
        title: '¡Venta registrada!',
        html: `
          <b>Producto:</b> ${productoSeleccionado.nombre}<br>
          <b>Total:</b> $${(productoSeleccionado.precio_final * ventaForm.cantidad).toFixed(2)}
          ${productoSeleccionado.descuento > 0 ? `<br><b>Descuento aplicado:</b> ${productoSeleccionado.descuento}%` : ''}
        `,
        confirmButtonColor: '#4f46e5',
      });
    } catch (err) {
      setVentaError(err.response?.data?.error || 'Error al registrar venta');
    }
  };

  const marcaSeleccionada  = marcas.find(m => m.id === parseInt(seleccion.marca_id));
  const modeloSeleccionado = modelos.find(m => m.id === parseInt(seleccion.modelo_id));
  const anioSeleccionado   = anios.find(a => a.id === parseInt(seleccion.anio_vehiculo_id));

  return (
    <section>
      <header className="page-header">
        <h2>🔍 Buscar Batería</h2>
        <p>Selecciona el vehículo para encontrar la batería compatible</p>
      </header>

      <article className="form-card">
        <h3>Selecciona el vehículo</h3>
        <section className="form-row">
          <select className="input" value={seleccion.marca_id} onChange={handleMarca}>
            <option value="">-- Marca --</option>
            {marcas.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>

          <select
            className="input"
            value={seleccion.modelo_id}
            onChange={handleModelo}
            disabled={!seleccion.marca_id}
          >
            <option value="">-- Modelo --</option>
            {modelos.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>

          <select
            className="input"
            value={seleccion.anio_vehiculo_id}
            onChange={handleAnio}
            disabled={!seleccion.modelo_id}
          >
            <option value="">-- Año --</option>
            {anios.map(a => (
              <option key={a.id} value={a.id}>{a.anio}</option>
            ))}
          </select>
        </section>

        <footer className="form-actions">
          <button
            className="button sm"
            onClick={handleBuscar}
            disabled={!seleccion.anio_vehiculo_id || loading}
          >
            {loading ? 'Buscando...' : '🔍 Buscar baterías'}
          </button>
        </footer>
      </article>

      {recomendaciones.length > 0 && (
        <section>
          <header className="page-header">
            <h2>🔋 Baterías recomendadas</h2>
            <p>
              Para {marcaSeleccionada?.nombre} {modeloSeleccionado?.nombre} {anioSeleccionado?.anio}
            </p>
          </header>

          {recomendaciones.map((p, index) => (
            <article
              key={p.id}
              className={`recomendacion-card ${index === 0 ? 'top' : ''}`}
            >
              <section className="rec-info">
                <h4>
                  {index === 0 && '🥇 '}
                  {index === 1 && '🥈 '}
                  {index === 2 && '🥉 '}
                  {p.nombre}
                </h4>
                <p>
                  Tipo: {p.battery_type?.nombre} —
                  Stock: {p.stock} unidades —
                  Calidad: {'⭐'.repeat(p.calidad_marca)} —
                  Score: {p.score}
                </p>
                {p.proveedor && <p>Proveedor: {p.proveedor.nombre}</p>}
              </section>

              <section className="rec-precio">
                {p.descuento > 0 && (
                  <>
                    <p className="precio-original">${parseFloat(p.precio_venta).toFixed(2)}</p>
                    <span className="descuento-badge">-{p.descuento}%</span>
                  </>
                )}
                <p className="precio-final">${parseFloat(p.precio_final).toFixed(2)}</p>
                <button
                  className="button sm"
                  onClick={() => handleVenderClick(p)}
                >
                  💰 Vender
                </button>
              </section>
            </article>
          ))}
        </section>
      )}

      {recomendaciones.length === 0 && seleccion.anio_vehiculo_id && !loading && (
        <p className="alert danger">
          No hay baterías disponibles para este vehículo.
        </p>
      )}

      {ventaModal && (
        <aside className="modal-overlay">
          <article className="modal">
            <h3>💰 Registrar Venta</h3>
            <p>
              <strong>{productoSeleccionado?.nombre}</strong> —
              ${parseFloat(productoSeleccionado?.precio_final).toFixed(2)}
              {productoSeleccionado?.descuento > 0 && ` (${productoSeleccionado.descuento}% desc.)`}
            </p>

            {ventaError && <p className="alert danger">{ventaError}</p>}

            <form onSubmit={handleVenta}>
              <input
                className="input"
                placeholder="Nombre del cliente"
                value={ventaForm.cliente_nombre}
                onChange={(e) => setVentaForm({ ...ventaForm, cliente_nombre: e.target.value })}
                required
              />

              <select
                className="input"
                value={ventaForm.tipo_cliente}
                onChange={(e) => setVentaForm({ ...ventaForm, tipo_cliente: e.target.value, cliente_cedula: '' })}
              >
                <option value="consumidor_final">Consumidor Final</option>
                <option value="cedula">Cédula</option>
                <option value="ruc">RUC</option>
              </select>

              {ventaForm.tipo_cliente !== 'consumidor_final' && (
                <input
                  className="input"
                  placeholder={ventaForm.tipo_cliente === 'cedula' ? 'Cédula (10 dígitos)' : 'RUC (13 dígitos)'}
                  value={ventaForm.cliente_cedula}
                  onChange={(e) => setVentaForm({ ...ventaForm, cliente_cedula: e.target.value })}
                  required
                />
              )}

              <input
                className="input"
                type="number"
                min="1"
                max={productoSeleccionado?.stock}
                placeholder="Cantidad"
                value={ventaForm.cantidad}
                onChange={(e) => setVentaForm({ ...ventaForm, cantidad: parseInt(e.target.value) })}
                required
              />

              <footer className="form-actions">
                <button
                  type="button"
                  className="button ghost sm"
                  onClick={() => setVentaModal(false)}
                >
                  Cancelar
                </button>
                <button className="button sm" type="submit">
                  Confirmar venta
                </button>
              </footer>
            </form>
          </article>
        </aside>
      )}
    </section>
  );
}

export default Buscador;