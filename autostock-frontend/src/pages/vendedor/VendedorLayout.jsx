import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/api';
import Swal from 'sweetalert2';

function VendedorLayout() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '¿Cerrar sesión?',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try { await logoutUser(); } catch (e) {}
      logout();
      navigate('/');
    }
  };

  return (
    <section className="vendedor-layout">
      <nav className="vendedor-navbar">
        <NavLink to="/vendedor" className="vendedor-navbar-logo">
          🔋 AutoStock
        </NavLink>

        <section className="vendedor-navbar-links">
          <NavLink
            to="/vendedor"
            end
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            🏠 Inicio
          </NavLink>
          <NavLink
            to="/vendedor/buscador"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            🔍 Buscador
          </NavLink>
          <NavLink
            to="/vendedor/inventario"
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            📋 Inventario
          </NavLink>
        </section>

        <section className="vendedor-navbar-user">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>🚪 Salir</button>
        </section>
        <section className="vendedor_dashboard_anterior">
          <table className="vendedor_dashboard">

          </table>
          </section>
      </nav>

      <main className="vendedor-content">
        <Outlet />
      </main>
    </section>
  );
}

export default VendedorLayout;