import axios from 'axios';

const api = axios.create({
  // Mengambil URL dari .env, atau fallback ke localhost jika .env tidak terbaca
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Otomatis tempelkan token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;