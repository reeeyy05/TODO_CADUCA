import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeToggle } from "./ThemeToggle";
export default function Header() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Escucha si hay un usuario logueado

    return (
        <header className="bg-neutral-800 h-20 px-8 flex justify-between items-center border-b border-neutral-800">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="bg-green-600 p-2 rounded text-white">
                    ✅
                </div>
                <span className="text-2xl font-bold text-white">Todo Caduca</span>
            </div>

            <div className="flex gap-4 items-center">
                {user ? (
                    /* Si el usuario ya se registró/logueó */
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors"
                        onClick={() => navigate("/profile")}
                    >
                        Perfil de {user.username}
                    </button>
                ) : (
                    /* Si no hay sesión activa */
                    <>
                        <button
                            className="bg-white text-neutral-950 px-4 py-2 rounded font-bold hover:bg-neutral-200"
                            onClick={() => navigate("/register")}
                        >
                            Registrarse
                        </button>
                        <button className="bg-green-400 text-white px-4 py-2 rounded font-bold hover:bg-green-500"
                            onClick={() => navigate("/login")}
                        >
                        </button>
                    </>
                )}
                <ThemeToggle />
            </div>
        </header>
    );
}