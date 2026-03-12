import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ThemeToggle } from "./ThemeToggle";
import { Package, ShieldCheck, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, perfil } = useAuthStore();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="h-20 px-4 sm:px-8 flex justify-between items-center border-b border-neutral-800 bg-neutral-900 w-full relative z-50">
            
            {/* 1. IZQUIERDA: LOGO Y TÍTULO (Siempre visibles) */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => navigate("/")}>
                <img
                    src="/logo.png"
                    alt="Logo Todo Caduca"
                    className="w-10 h-10 sm:w-20 sm:h-20 object-contain"
                />
                <span className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
                    Todo Caduca
                </span>
            </div>

            {/* 2. DERECHA: BOTONES DE AUTH + SELECTORES/HAMBURGUESA */}
            <div className="flex items-center gap-2 sm:gap-4">
                
                {/* BOTONES REGISTRO/LOGIN (Siempre visibles en Header) */}
                {!isAuthenticated && (
                    <div className="flex gap-1 sm:gap-2 shrink-0">
                        <button
                            className="bg-white text-neutral-950 px-2 sm:px-4 py-2 rounded-xl font-bold hover:bg-neutral-200 text-[10px] sm:text-sm transition-all"
                            onClick={() => navigate("/register")}
                        >
                            {t('header.register')}
                        </button>
                        <button 
                            className="bg-green-500 text-white px-2 sm:px-4 py-2 rounded-xl font-bold hover:bg-green-600 text-[10px] sm:text-sm transition-all"
                            onClick={() => navigate("/login")}
                        >
                            {t('header.login')}
                        </button>
                    </div>
                )}

                {/* SI ESTÁ LOGUEADO: Botón de perfil siempre visible */}
                {isAuthenticated && perfil && (
                    <button
                        className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-xl font-bold shrink-0"
                        onClick={() => navigate("/profile")}
                    >
                        <div className="w-6 h-6 rounded-full bg-green-800 flex items-center justify-center text-xs overflow-hidden">
                            {perfil.avatar_url ? (
                                <img src={perfil.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                (perfil.nombre_completo || 'U').charAt(0).toUpperCase()
                            )}
                        </div>
                        <span className="hidden sm:inline text-sm">{perfil.nombre_completo?.split(' ')[0]}</span>
                    </button>
                )}

                {/* SELECTORES DESKTOP: Se ocultan en móvil (menor a 640px) */}
                <div className="hidden sm:flex items-center gap-2 border-l border-neutral-700 pl-4">
                    <ThemeToggle /> 
                    <LanguageSwitcher />
                </div>

                {/* BOTÓN HAMBURGUESA: Solo visible en móvil (sm:hidden) */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="sm:hidden text-white p-2 focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 3. MENÚ HAMBURGUESA MÓVIL (Solo para Selectores y Links extra) */}
            <nav className={`
                ${isOpen ? "flex" : "hidden"} 
                sm:hidden flex-col absolute top-20 left-0 w-full 
                bg-neutral-900 border-b border-neutral-800 p-6 gap-6 items-center
            `}>
                {/* Aquí dentro solo van las cosas que queremos "esconder" en móvil */}
                {isAuthenticated && (
                    <div className="flex flex-col gap-4 items-center">
                        <button onClick={() => {navigate("/products"); setIsOpen(false)}} className="text-white font-medium">
                            {t('header.myProducts')}
                        </button>
                    </div>
                )}
                
                <div className="flex items-center gap-8 pt-4 border-t border-neutral-800 w-full justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-neutral-500 uppercase"></span>
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-neutral-500 uppercase"></span>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>
        </header>
    );
}