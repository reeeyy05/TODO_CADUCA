import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="bg-neutral-800 h-20 px-8 flex justify-between items-center border-b border-neutral-800">
            {/* Logo y titulo */}
            <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded text-white">
                    ✅
                </div>
                <span className="text-2xl font-bold text-white">Todo Caduca</span>
            </div>
            {/* Botones de registro e inicio de sesión */}
            <div className="flex gap-4">
                <button
                    className="bg-white text-neutral-950 px-4 py-2 rounded font-bold"
                    onClick={() => navigate("/register")}
                >
                    Registrarse
                </button>
                <button 
                    className="bg-green-400 text-white px-4 py-2 rounded font-bold hover:bg-green-500 transition-colors"
                    onClick={() => navigate("/login")} // <--- Esto activará la ruta que creamos en App.tsx
                >
                    Iniciar Sesión
                </button>
            </div>
        </header>
    );
}
































