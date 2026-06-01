import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/auth/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Productos from './pages/admin/Productos';
import Proveedores from './pages/admin/Proveedores';
import Categorias from './pages/admin/Categorias';
import Ventas from './pages/admin/Ventas';
import Reportes from './pages/admin/Reportes';
import VendedorLayout from './pages/vendedor/VendedorLayout';
import Inicio from './pages/vendedor/Inicio';
import Buscador from './pages/vendedor/Buscador';
import Inventario from './pages/vendedor/Inventario';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        user
          ? <Navigate to={user.role === 'admin' ? '/admin/productos' : '/vendedor'} />
          : <Login />
      } />

      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/productos" />} />
        <Route path="productos"   element={<Productos />} />
        <Route path="proveedores" element={<Proveedores />} />
        <Route path="categorias"  element={<Categorias />} />
        <Route path="ventas"      element={<Ventas />} />
        <Route path="reportes"    element={<Reportes />} />
      </Route>

      <Route path="/vendedor" element={
        <ProtectedRoute requiredRole="vendedor">
          <VendedorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Inicio />} />
        <Route path="buscador"   element={<Buscador />} />
        <Route path="inventario" element={<Inventario />} />
      </Route>
    </Routes>
  );
}

export default App;