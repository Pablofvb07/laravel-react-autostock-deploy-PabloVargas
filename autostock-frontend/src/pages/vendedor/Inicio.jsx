import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Inicio() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="vendedor-inicio">
      <header className="vendedor-inicio-header">
        <h1>👋 Hola, {user?.name}</h1>
        <p>¿Qué deseas hacer hoy?</p>
      </header>

      <section className="vendedor-opciones">
        <article
          className="vendedor-opcion-card"
          onClick={() => navigate('/vendedor/buscador')}
        >
          <span className="vendedor-opcion-icon">🔍</span>
          <h2>Buscar Batería</h2>
          <p>Encuentra la batería ideal para el vehículo del cliente con recomendaciones y descuentos</p>
        </article>

        <article
          className="vendedor-opcion-card"
          onClick={() => navigate('/vendedor/inventario')}
        >
          <span className="vendedor-opcion-icon">📋</span>
          <h2>Inventario</h2>
          <p>Ver todos los productos disponibles y registrar ventas directamente</p>
        </article>
      </section>
    </main>
  );
}

export default Inicio;