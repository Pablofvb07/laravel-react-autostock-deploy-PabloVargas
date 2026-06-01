import { useEffect, useState } from 'react';
import {
  getProveedores, createProveedor, updateProveedor, deleteProveedor
} from '../../services/api';
import Swal from 'sweetalert2';

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [editando, setEditando]       = useState(null);
  const [error, setError]             = useState('');
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '', direccion: '',
  });

  const load = async () => {
    const res = await getProveedores();
    setProveedores(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editando) {
        await updateProveedor(editando.id, form);
      } else {
        await createProveedor(form);
      }
      setForm({ nombre: '', telefono: '', email: '', direccion: '' });
      setEditando(null);
      load();
      Swal.fire({
        icon: 'success',
        title: editando ? '¡Proveedor actualizado!' : '¡Proveedor creado!',
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
      nombre: p.nombre, telefono: p.telefono,
      email: p.email, direccion: p.direccion,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (p) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar proveedor?',
      text: `Se eliminará "${p.nombre}" permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      await deleteProveedor(p.id);
      load();
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false });
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setError('');
    setForm({ nombre: '', telefono: '', email: '', direccion: '' });
  };

  return (
    <section>
      <header className="page-header">
        <h2>🏭 Proveedores</h2>
        <p>Gestiona los proveedores de baterías</p>
      </header>

      {error && <p className="alert danger">{error}</p>}

      <article className="form-card">
        <h3>{editando ? 'Editar proveedor' : 'Nuevo proveedor'}</h3>
        <form onSubmit={handleSubmit}>
          <section className="form-row">
            <input
              className="input"
              name="nombre"
              placeholder="Nombre del proveedor"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              name="direccion"
              placeholder="Dirección"
              value={form.direccion}
              onChange={handleChange}
              required
            />
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
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.telefono}</td>
              <td>{p.email}</td>
              <td>{p.direccion}</td>
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

export default Proveedores;