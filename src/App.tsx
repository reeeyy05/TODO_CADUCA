import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LandingPage from "@/pages/LandingPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginForm from "@/components/forms/LoginForm";
import ProfilePage from "@/pages/ProfilePage";
import AddProductPage from "@/pages/AddProductPage";
import ProductsPage from "@/pages/ProductsPage";
import { PublicRoute, PrivateRoute } from "@/components/routes/ProtectedRoutes";
import { useAuthStore } from "@/store/authStore";

function App() {
  const { initSession, loading } = useAuthStore();

  useEffect(() => {
    initSession();
  }, [initSession]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white">
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