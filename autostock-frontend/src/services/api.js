import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Agregar token automáticamente a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el token expira redirigir al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const loginUser    = (data) => api.post('/login', data);
export const registerUser = (data) => api.post('/register', data);
export const logoutUser   = ()     => api.post('/logout');
export const getMe        = ()     => api.get('/me');

// ─── Productos ────────────────────────────────────────────────────────────────
export const getProducts   = ()         => api.get('/products');
export const getProduct    = (id)       => api.get(`/products/${id}`);
export const createProduct = (data)     => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id)       => api.delete(`/products/${id}`);

// ─── Proveedores ──────────────────────────────────────────────────────────────
export const getProveedores  = ()         => api.get('/proveedores');
export const getProveedor    = (id)       => api.get(`/proveedores/${id}`);
export const createProveedor = (data)     => api.post('/proveedores', data);
export const updateProveedor = (id, data) => api.put(`/proveedores/${id}`, data);
export const deleteProveedor = (id)       => api.delete(`/proveedores/${id}`);

// ─── Categorías ───────────────────────────────────────────────────────────────
export const getCategorias   = ()         => api.get('/categorias');
export const createCategoria = (data)     => api.post('/categorias', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}`, data);
export const deleteCategoria = (id)       => api.delete(`/categorias/${id}`);

// ─── Ventas ───────────────────────────────────────────────────────────────────
export const getVentas      = ()     => api.get('/ventas');
export const registrarVenta = (data) => api.post('/ventas', data);

// ─── Catálogo ─────────────────────────────────────────────────────────────────
export const getMarcas          = ()          => api.get('/catalogo/marcas');
export const getModelos         = (marcaId)   => api.get(`/catalogo/modelos/${marcaId}`);
export const getAnios           = (modeloId)  => api.get(`/catalogo/anios/${modeloId}`);
export const getRecomendaciones = (anioId)    => api.get(`/catalogo/recomendar?anio_vehiculo_id=${anioId}`);
export const getBatteryTypes = () => api.get('/catalogo/battery-types');

// ─── Reportes ─────────────────────────────────────────────────────────────────
export const getReporteMargen = () => api.get('/reportes/margen');
export const getReporteBodega = () => api.get('/reportes/bodega');