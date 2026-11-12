import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/LoginPage';
import FeedPage from '../pages/FeedPage';
import CalendarPage from '../pages/CalendarPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Routes>
      {/* Rota Pública de Autenticação */}
      <Route
        path="/login"
        element={
          !isLoading && isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />

      {/* Rotas Protegidas na SPA */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FeedPage />} />
        <Route path="mural" element={<Navigate to="/" replace />} />
        <Route path="calendario" element={<CalendarPage />} />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
