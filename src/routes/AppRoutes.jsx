import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Páginas públicas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Páginas privadas
import Dashboard from '../pages/Dashboard';
import Upload from '../pages/Upload';
import History from '../pages/History';

// Layout y protección
import ProtectedRoute from '../routing/ProtectedRoute';
import DashboardLayout from '../layout/DashboardLayout';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Pública: raíz redirige si ya hay sesión */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Home />}
      />

      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Privadas con layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Upload />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <History />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Wildcard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
