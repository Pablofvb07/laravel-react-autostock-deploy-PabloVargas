import { useEffect, useState } from 'react';
import {
  getCategorias, createCategoria, updateCategoria, deleteCategoria
} from '../../services/api';
import Swal from 'sweetalert2';

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando]     = useState(null);
  const [error, setError]           = useState('');
  const [form, setForm] = useState({
    nombre: '', es_bateria: false,
  });

  const load = async () => {
    const res = await getCategorias();
    setCategorias(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editando) {
        await updateCategoria(editando.id, form);
      } else {
        await createCategoria(form);
      }
      setForm({ nombre: '', es_bateria: false });
      setEditando(null);
      load();
      Swal.fire({
        icon: 'success',
        title: editando ? '¡Categoría actualizada!' : '¡Categoría creada!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  const handleEditar = (c) => {
    setEditando(c);
    setForm({ nombre: c.nombre, es_bateria: c.es_bateria });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (c) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar categoría?',
      text: `Se eliminará "${c.nombre}" permanentemente.`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      try {
        await deleteCategoria(c.id);
        load();
        Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1200, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: 'error', title: err.response?.data?.error || 'Error al eliminar' });
      }
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setError('');
    setForm({ nombre: '', es_bateria: false });
  };

  return (
    <section>
      <header className="page-header">
        <h2>🏷️ Categorías</h2>
        <p>Gestiona las categorías de productos</p>
      </header>

      {error && <p className="alert danger">{error}</p>}

      <article className="form-card">
        <h3>{editando ? 'Editar categoría' : 'Nueva categoría'}</h3>
        <form onSubmit={handleSubmit}>
          <section className="form-row">
            <input
              className="input"
              name="nombre"
              placeholder="Nombre de la categoría"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="es_bateria"
                checked={form.es_bateria}
                onChange={handleChange}
              />
              ¿Es categoría de batería?
            </label>
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
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id}>
              <td>{c.nombre}</td>
              <td>
                <span className={`badge ${c.es_bateria ? 'bateria' : 'accesorio'}`}>
                  {c.es_bateria ? 'Batería' : 'Accesorio'}
                </span>
              </td>
              <td>
                <button className="button sm" onClick={() => handleEditar(c)}>✏️</button>
                {' '}
                <button className="button danger sm" onClick={() => handleEliminar(c)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Categorias;