import { Facebook, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-neutral-800 text-white p-10">

            {/* Logo a la izquierda, iconos a la derecha */}
            <div className="flex justify-between items-center mb-10">

                {/* Logo y subtítulo */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-600 p-2 rounded"></div>
                        <span className="text-2xl font-semibold">Todo Caduca</span>
                    </div>
                    <p className="text-neutral-300">Gestiona tus alimentos, cuida el planeta</p>
                </div>

                {/* Iconos de redes sociales */}
                <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-blue-700 transition-colors rounded-full flex items-center justify-center text-white">
                        <Facebook size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-blue-700 transition-colors rounded-full flex items-center justify-center text-white">
                        <Github size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-900 hover:bg-blue-700 transition-colors rounded-full flex items-center justify-center text-white">
                        <Linkedin size={20} />
                    </a>
                </div>

            </div>

            <div className="text-center text-neutral-400 text-sm">
                © 2026 Todo Caduca. Todos los derechos reservados.
            </div>

        </footer>
    );
}