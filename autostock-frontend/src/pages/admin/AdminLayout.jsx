import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';

const links = [
  { to: '/admin/productos',   icon: '📦', label: 'Productos' },
  { to: '/admin/proveedores', icon: '🏭', label: 'Proveedores' },
  { to: '/admin/categorias',  icon: '🏷️', label: 'Categorías' },
  { to: '/admin/ventas',      icon: '💰', label: 'Ventas' },
  { to: '/admin/reportes',    icon: '📊', label: 'Reportes' },
];

function AdminLayout() {
  return (
    <section className="layout">
      <Sidebar links={links} />
      <main className="main-content">
        <Outlet />
      </main>
    </section>
  );
}

export default AdminLayout;