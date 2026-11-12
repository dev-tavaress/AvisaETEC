import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para injetar o Token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@AvisaETEC:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de resposta para tratar expiração de sessão (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se receber 401 de rota protegida que não seja o próprio login
      const isLoginRoute = error.config.url.includes('/auth/login');
      if (!isLoginRoute) {
        localStorage.removeItem('@AvisaETEC:token');
        localStorage.removeItem('@AvisaETEC:user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
