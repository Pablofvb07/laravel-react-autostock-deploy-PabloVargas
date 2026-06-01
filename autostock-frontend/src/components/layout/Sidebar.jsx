import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/api';
import Swal from 'sweetalert2';

function Sidebar({ links }) {
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
    <aside className="sidebar">
      <header className="sidebar-logo">🔋 AutoStock</header>
      <p className="sidebar-user">
        {user?.name} — <span className={`badge ${user?.role}`}>{user?.role}</span>
      </p>

      <nav>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <button onClick={handleLogout}>🚪 Cerrar sesión</button>
      </footer>
    </aside>
  );
}

export default Sidebar;