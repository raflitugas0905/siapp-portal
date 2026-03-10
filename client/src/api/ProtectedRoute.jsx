import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Jika tidak ada token, paksa pindah ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, izinkan masuk ke halaman yang dituju
  return children;
};

export default ProtectedRoute;