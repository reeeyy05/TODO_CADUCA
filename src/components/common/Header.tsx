import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ThemeToggle } from "./ThemeToggle";
import { Package } from "lucide-react";

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, perfil } = useAuthStore();

    return (
        <header className="bg-white dark:bg-neutral-800 h-20 px-8 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="bg-green-600 p-2 rounded text-white">
                    
                </div>
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">Todo Caduca</span>
            </div>

            <div className="flex gap-4 items-center">
                {isAuthenticated && perfil ? (
                    <>
                        <button
                            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-2 rounded transition-colors"
                            onClick={() => navigate("/products")}
                        >
                            <Package size={18} />
                            <span className="hidden sm:inline">Mis Productos</span>
                        </button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors"
                            onClick={() => navigate("/profile")}
                        >
                            {perfil.nombre_completo || "Perfil"}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-neutral-200 dark:bg-white text-neutral-950 px-4 py-2 rounded font-bold hover:bg-neutral-300 dark:hover:bg-neutral-200"
                            onClick={() => navigate("/register")}
                        >
                            Registrarse
                        </button>
                        <button className="bg-green-400 text-white px-4 py-2 rounded font-bold hover:bg-green-500"
                            onClick={() => navigate("/login")}
                        >
                            Iniciar Sesión
                        </button>
                    </>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
}