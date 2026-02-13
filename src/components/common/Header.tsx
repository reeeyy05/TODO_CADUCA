export default function Header() {
    return (
        <header className="bg-neutral-900 h-20 px-8 flex justify-between items-center border-b border-neutral-800">

            {/* Logo y titulo */}
            <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded text-white">
                    
                </div>
                <span className="text-2xl font-bold text-white">Todo Caduca</span>
            </div>

            {/* Botones de registro e inicio de sesión */}
            <div className="flex gap-4">
                <button className="bg-white text-neutral-950 px-4 py-2 rounded font-bold">
                    Registrarse
                </button>
                <button className="bg-green-400 text-white px-4 py-2 rounded font-bold">
                    Iniciar Sesión
                </button>
            </div>
        </header>
    );
}
































