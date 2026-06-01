import { useEffect, useState } from 'react';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getProveedores, getCategorias, getBatteryTypes
} from '../../services/api';
import Swal from 'sweetalert2';

function Productos() {
  const [products, setProducts]       = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias]   = useState([]);
  const [batteryTypes, setBatteryTypes] = useState([]);
  const [editando, setEditando]       = useState(null);
  const [error, setError]             = useState('');
  const [form, setForm] = useState({
    nombre: '', precio_costo: '', precio_venta: '',
    stock: '', categoria_id: '', calidad_marca: '3',
    fecha_ingreso: '', proveedor_id: '', battery_type_id: '',
  });

  const load = async () => {
    const [p, prov, cat, bt] = await Promise.all([
      getProducts(), getProveedores(), getCategorias(), getBatteryTypes()
    ]);
    setProducts(p.data);
    setProveedores(prov.data);
    setCategorias(cat.data);
    setBatteryTypes(bt.data);
  };

  useEffect(() => { load(); }, []);

  const categoriaSeleccionada = categorias.find(c => c.id === parseInt(form.categoria_id));
  const esBateria = categoriaSeleccionada?.es_bateria;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editando) {
        await updateProduct(editando.id, form);
      } else {
        await createProduct(form);
      }
      setForm({
        nombre: '', precio_costo: '', precio_venta: '',
        stock: '', categoria_id: '', calidad_marca: '3',
        fecha_ingreso: '', proveedor_id: '', battery_type_id: '',
      });
      setEditando(null);
      load();
      Swal.fire({
        icon: 'success',
        title: editando ? '¡Producto actualizado!' : '¡Producto creado!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  const handleEditar = (p) => {
    setEditando(p);
    setForm({
      nombre: p.nombre,
      precio_costo: p.precio_costo,
      precio_venta: p.precio_venta,
      stock: p.stock,
      categoria_id: p.categoria_id,
      calidad_marca: p.calidad_marca,
      fecha_ingreso: p.fecha_ingreso?.split('T')[0],
      proveedor_id: p.proveedor_id || '',
      battery_type_id: p.battery_type_id || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (p) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar producto?',
      text: `Se eliminará "${p.nombre}" permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      await deleteProduct(p.id);
      load();
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setError('');
    setForm({
      nombre: '', precio_costo: '', precio_venta: '',
      stock: '', categoria_id: '', calidad_marca: '3',
      fecha_ingreso: '', proveedor_id: '', battery_type_id: '',
    });
  };

  return (
    <section>
      <header className="page-header">
        <h2>📦 Productos</h2>
        <p>Gestiona el inventario de baterías y accesorios</p>
      </header>

      {error && <p className="alert danger">{error}</p>}

      <article className="form-card">
        <h3>{editando ? 'Editar producto' : 'Nuevo producto'}</h3>
        <form onSubmit={handleSubmit}>
          <section className="form-row">
            <input
              className="input"
              name="nombre"
              placeholder="Nombre del producto"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <select
              className="input"
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Categoría --</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>

            <input
              className="input"
              name="precio_costo"
              type="number"
              placeholder="Precio costo"
              value={form.precio_costo}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="precio_venta"
              type="number"
              placeholder="Precio venta"
              value={form.precio_venta}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="stock"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="fecha_ingreso"
              type="date"
              value={form.fecha_ingreso}
              onChange={handleChange}
              required
            />

            <select
              className="input"
              name="calidad_marca"
              value={form.calidad_marca}
              onChange={handleChange}
              required
            >
              <option value="1">⭐ Calidad 1</option>
              <option value="2">⭐⭐ Calidad 2</option>
              <option value="3">⭐⭐⭐ Calidad 3</option>
              <option value="4">⭐⭐⭐⭐ Calidad 4</option>
              <option value="5">⭐⭐⭐⭐⭐ Calidad 5</option>
            </select>

            {esBateria && (
              <>
                <select
                  className="input"
                  name="proveedor_id"
                  value={form.proveedor_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Proveedor --</option>
                  {proveedores.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>

                <select
                  className="input"
                  name="battery_type_id"
                  value={form.battery_type_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Tipo de batería --</option>
                  {batteryTypes.map(b => (
                    <option key={b.id} value={b.id}>{b.nombre}</option>
                  ))}
                </select>
              </>
            )}
          </section>

          <footer className="form-actions">
            <button className="button sm" type="submit">
              {editando ? 'Actualizar' : 'Crear'}
            </button>
            {editando && (
              <button
                className="button ghost sm"
                type="button"
                onClick={handleCancelar}
              >
                Cancelar
              </button>
            )}
          </footer>
        </form>
      </article>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio costo</th>
            <th>Precio venta</th>
            <th>Stock</th>
            <th>Calidad</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>
                <span className={`badge ${p.categoria?.es_bateria ? 'bateria' : 'accesorio'}`}>
                  {p.categoria?.nombre}
                </span>
              </td>
              <td>${p.precio_costo}</td>
              <td>${p.precio_venta}</td>
              <td>
                {p.stock === 0
                  ? <span className="badge danger">Sin stock</span>
                  : p.stock
                }
              </td>
              <td>{'⭐'.repeat(p.calidad_marca)}</td>
              <td>{p.proveedor?.nombre || '—'}</td>
              <td>
                <button className="button sm" onClick={() => handleEditar(p)}>✏️</button>
                {' '}
                <button className="button danger sm" onClick={() => handleEliminar(p)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Productos;