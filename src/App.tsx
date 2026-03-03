import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/forms/LoginForm';
import ProfilePage from './pages/ProfilePage';
import AddProductPage from "./pages/AddProductPage";
import ProductsPage from "./pages/ProductsPage";
import AdminPage from "./pages/AdminPage";
import { useAuthStore } from "./store/authStore";

/** Ruta que solo pueden ver usuarios NO autenticados */
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/products" replace /> : <>{children}</>;
}

/** Ruta que solo pueden ver usuarios autenticados */
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

/** Ruta exclusiva para administradores */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, perfil } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (perfil?.rol !== 'admin') return <Navigate to="/products" replace />;
  return <>{children}</>;
}

function App() {
  const { initSession, loading } = useAuthStore();

  useEffect(() => {
    initSession();
  }, [initSession]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Rutas públicas: solo visibles sin sesión */}
            <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />

            {/* Rutas privadas: solo visibles con sesión */}
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
            <Route path="/addProducts" element={<PrivateRoute><AddProductPage /></PrivateRoute>} />

            {/* Ruta exclusiva para administradores */}
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

            {/* Cualquier otra ruta redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;