import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ThemeToggle } from "./ThemeToggle";
import { Package, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, perfil } = useAuthStore();
    const { t } = useTranslation();

    return (
        <header className="h-20 px-4 md:px-8 flex justify-between items-center border-b border-neutral-800 bg-neutral-900">
            {/*Se encogen las cosas para el responsive */}
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer shrink-0" onClick={() => navigate("/")}>
                <div className="bg-green-600 p-1.5 md:p-2 rounded text-white">
                    <Package size={20} className="md:w-6 md:h-6" />
                </div>
                {/* Ocultamos el texto en moviles muy pequeños (menores a 400px) */}
                <span className="hidden min-[400px]:inline text-lg md:text-2xl font-bold text-white whitespace-nowrap">
                    Todo Caduca
                </span>
            </div>

            {/* Gap reducido en movil */}
            <div className="flex gap-2 md:gap-4 items-center">
                {isAuthenticated && perfil ? (
                    <>
                        {perfil.rol === 'admin' && (
                            <button
                                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 px-2 md:px-3 py-2 rounded transition-colors"
                                onClick={() => navigate("/admin")}
                            >
                                <ShieldCheck size={18} />
                                <span className="hidden lg:inline">{t('header.admin')}</span>
                            </button>
                        )}
                        <button
                            className="flex items-center gap-2 text-neutral-300 hover:text-white px-2 md:px-3 py-2 rounded transition-colors"
                            onClick={() => navigate("/products")}
                        >
                            <Package size={18} />
                            <span className="hidden lg:inline">{t('header.myProducts')}</span>
                        </button>

                        <button
                            className="flex items-center gap-2 bg-green-600 text-white px-3 md:px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors shrink-0"
                            onClick={() => navigate("/profile")}
                        >
                            {perfil.avatar_url ? (
                                <img
                                    src={perfil.avatar_url}
                                    alt="Avatar"
                                    className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover"
                                />
                            ) : (
                                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-800 flex items-center justify-center text-xs md:text-sm">
                                    {(perfil.nombre_completo || 'U').charAt(0).toUpperCase()}
                                </span>
                            )}
                            <span className="hidden sm:inline text-sm md:text-base">
                                {perfil.nombre_completo?.split(' ')[0] || t('header.profile')}
                            </span>
                        </button>
                    </>
                ) : (
                    <div className="flex gap-1 md:gap-2 items-center">
                        <button
                            className="bg-white text-neutral-950 px-2 md:px-4 py-2 rounded text-[10px] min-[400px]:text-xs md:text-sm font-bold hover:bg-neutral-200"
                            onClick={() => navigate("/register")}
                        >
                            {t('header.register')}
                        </button>
                        <button
                            className="bg-green-500 text-white px-2 md:px-4 py-2 rounded text-[10px] min-[400px]:text-xs md:text-sm font-bold hover:bg-green-600"
                            onClick={() => navigate("/login")}
                        >
                            {t('header.login')}
                        </button>
                    </div>
                )}

                {/* Contenedor para los selectores con iconos pequeños */}
                <div className="flex items-center gap-1 border-l border-neutral-700 ml-1 pl-1 md:ml-2 md:pl-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </header>
    );
}