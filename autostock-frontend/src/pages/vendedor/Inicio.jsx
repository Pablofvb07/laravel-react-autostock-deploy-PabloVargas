import { useNavigate } from 'react-router-dom';
import { getProducts, registrarVenta } from '../../services/api';
import Swal from 'sweetalert2';
function Inicio() {
    const [products, setProducts]                     = useState([]);
    const [ventaModal, setVentaModal]                 = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [ventaForm, setVentaForm] = useState({
      cantidad: 1, cliente_nombre: '',
      tipo_cliente: 'consumidor_final', cliente_cedula: '',
    });
    const [ventaError, setVentaError] = useState('');
  
    const load = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
  
    useEffect(() => { load(); }, []);
  
    const calcularDescuento = (p) => {
      let descuento = 0;
      const diasEnBodega = Math.floor(
        (new Date() - new Date(p.fecha_ingreso)) / (1000 * 60 * 60 * 24)
      );
      if (diasEnBodega > 180) descuento += 25;
      else if (diasEnBodega > 90) descuento += 15;
  
      const margen = ((p.precio_venta - p.precio_costo) / p.precio_venta) * 100;
      if (margen > 40) descuento += 15;
  
      return Math.min(descuento, 30);
    };
  
    const handleVenderClick = (p) => {
      setProductoSeleccionado(p);
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
        load();
        Swal.fire({
          icon: 'success',
          title: '¡Venta registrada!',
          confirmButtonColor: '#4f46e5',
        });
      } catch (err) {
        setVentaError(err.response?.data?.error || 'Error al registrar venta');
      }
    };

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
         <article
          className="vendedor-dashboard"
          onClick={() => navigate('/vendedor/inventario')}
        >
          <h2>Productos mas vendidos y con Descuento</h2>
        </article>
         <table className="dashboard">
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descuento</th>
            <th>Acción</th>
            </tr>
          </thead>
           <tbody>
          {products.map(p => {
            const descuento = calcularDescuento(p);
            const precioFinal = p.precio_venta * (1 - descuento / 100);
            return (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>
                  <span className={`badge ${p.categoria?.es_bateria ? 'bateria' : 'accesorio'}`}>
                    {p.categoria?.nombre}
                  </span>
                </td>
                <td>
                  {descuento > 0 ? (
                    <>
                      <s style={{ color: '#94a3b8', fontSize: '12px' }}>${parseFloat(p.precio_venta).toFixed(2)}</s>
                      {' '}
                      <strong>${precioFinal.toFixed(2)}</strong>
                    </>
                  ) : (
                    <strong>${parseFloat(p.precio_venta).toFixed(2)}</strong>
                  )}
                </td>
                <td>{p.stock === 0 ? <span className="badge danger">Sin stock</span> : p.stock}</td>
                <td>
                  {descuento > 0
                    ? <span className="badge bateria">🏷️ -{descuento}%</span>
                    : <span style={{ color: '#94a3b8' }}>—</span>
                  }
                </td>
                <td>
                  <button
                    className={`button sm ${p.stock === 0 ? 'ghost' : ''}`}
                    onClick={() => handleVenderClick(p)}
                    disabled={p.stock === 0}
                  >
                    {p.stock === 0 ? 'Sin stock' : '💰 Vender'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
         </table>
    </main>
  );
}

export default Inicio;