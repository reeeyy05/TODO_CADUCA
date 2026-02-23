import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

/** Ruta que solo pueden ver usuarios NO autenticados */
export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/products" replace /> : <>{children}</>;
}

/** Ruta que solo pueden ver usuarios autenticados */
export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
