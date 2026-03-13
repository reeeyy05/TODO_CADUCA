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
            
            {/* 1. LOGO Y TÍTULO (Siempre visibles a la izquierda) */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => navigate("/")}>
                <img
                    src="/logo.webp"
                    alt="Logo Todo Caduca"
                    className="w-12 h-12 sm:w-20 sm:h-20 object-contain"
                />
                <span className="text-lg sm:text-2xl font-bold text-white whitespace-nowrap">
                    Todo Caduca
                </span>
            </div>

            {/* 2. ÁREA DE ACCIÓN DERECHA */}
            <div className="flex items-center gap-2 sm:gap-4">
                
                {/* BOTONES DE AUTENTICACIÓN: Siempre visibles fuera del menú */}
                {!isAuthenticated ? (
                    <div className="flex gap-2">
                        <button
                            className="bg-white text-neutral-950 px-3 sm:px-4 py-2 rounded-xl font-bold hover:bg-neutral-200 text-xs sm:text-sm transition-all shrink-0"
                            onClick={() => navigate("/register")}
                        >
                            {t('header.register')}
                        </button>
                        <button 
                            className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-xl font-bold hover:bg-green-600 text-xs sm:text-sm transition-all shrink-0"
                            onClick={() => navigate("/login")}
                        >
                            {t('header.login')}
                        </button>
                    </div>
                ) : (
                    /* Botones cuando está logueado */
                    <div className="flex items-center gap-2">
                        {perfil?.rol === 'admin' && (
                            <button
                                className="hidden sm:flex items-center gap-2 bg-amber-600 text-white px-3 py-2 rounded-xl font-bold shrink-0 transition-all hover:bg-amber-700"
                                onClick={() => navigate("/admin")}
                            >
                                <ShieldCheck size={18} />
                                <span className="hidden md:inline text-sm">{t('header.admin')}</span>
                            </button>
                        )}
                        <button
                            className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-xl font-bold shrink-0 transition-all hover:bg-green-700"
                            onClick={() => navigate("/profile")}
                        >
                            <div className="w-6 h-6 rounded-full bg-green-800 flex items-center justify-center text-xs overflow-hidden">
                                {perfil?.avatar_url ? (
                                    <img src={perfil.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    (perfil?.nombre_completo || 'U').charAt(0).toUpperCase()
                                )}
                            </div>
                            <span className="hidden md:inline text-sm">{perfil?.nombre_completo?.split(' ')[0]}</span>
                        </button>
                    </div>
                )}

                {/* SELECTORES DESKTOP: Se ven a partir de 640px (sm) */}
                <div className="hidden sm:flex items-center gap-2 border-l border-neutral-700 pl-4">
                    <ThemeToggle /> 
                    <LanguageSwitcher />
                </div>

                {/* BOTÓN HAMBURGUESA: Solo visible en móviles (< 640px) */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="sm:hidden text-white p-2 focus:outline-none hover:bg-neutral-800 rounded-lg transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* 3. MENÚ DESPLEGABLE MÓVIL (Solo para selectores y links de usuario) */}
            <nav className={`
                ${isOpen ? "flex" : "hidden"} 
                sm:hidden flex-col absolute top-20 left-0 w-full 
                bg-neutral-900 border-b border-neutral-800 p-6 gap-6 items-center
                shadow-2xl animate-in slide-in-from-top-2
            `}>
                {/* Enlaces de navegación interna (solo si está logueado) */}
                {isAuthenticated && (
                    <div className="flex flex-col gap-4 items-center w-full border-b border-neutral-800 pb-4">
                        {perfil?.rol === 'admin' && (
                            <button 
                                onClick={() => {navigate("/admin"); setIsOpen(false)}} 
                                className="flex items-center gap-2 text-amber-400 font-medium"
                            >
                                <ShieldCheck size={20} /> {t('header.admin')}
                            </button>
                        )}
                        <button 
                            onClick={() => {navigate("/products"); setIsOpen(false)}} 
                            className="flex items-center gap-2 text-neutral-300 font-medium"
                        >
                            <Package size={20} /> {t('header.myProducts')}
                        </button>
                    </div>
                )}
                
                {/* Selectores de Idioma y Tema dentro del menú móvil */}
                <div className="flex items-center gap-10 justify-center w-full">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Tema</span>
                        <ThemeToggle />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Idioma</span>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>
        </header>
    );
}