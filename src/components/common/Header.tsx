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
        <header className="h-20 px-8 flex justify-between items-center border-b border-neutral-800">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <img
                    src="/logo.png"
                    alt="Logo Todo Caduca"
                    className="w-20 h-20 object-contain"
                />
                <span className="text-2xl font-bold text-white">Todo Caduca</span>
            </div>

            <div className="flex gap-4 items-center">
                {isAuthenticated && perfil ? (
                    <>
                        {perfil.rol === 'admin' && (
                            <button
                                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 px-3 py-2 rounded transition-colors"
                                onClick={() => navigate("/admin")}
                            >
                                <ShieldCheck size={18} />
                                <span className="hidden sm:inline">{t('header.admin')}</span>
                            </button>
                        )}
                        <button
                            className="flex items-center gap-2 text-neutral-300 hover:text-white px-3 py-2 rounded transition-colors"
                            onClick={() => navigate("/products")}
                        >
                            <Package size={18} />
                            <span className="hidden sm:inline">{t('header.myProducts')}</span>
                        </button>
                        <button
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition-colors"
                            onClick={() => navigate("/profile")}
                        >
                            {perfil.avatar_url ? (
                                <img
                                    src={perfil.avatar_url}
                                    alt="Avatar"
                                    className="w-7 h-7 rounded-full object-cover"
                                />
                            ) : (
                                <span className="w-7 h-7 rounded-full bg-green-800 flex items-center justify-center text-sm">
                                    {(perfil.nombre_completo || 'U').charAt(0).toUpperCase()}
                                </span>
                            )}
                            <span className="hidden sm:inline">
                                {perfil.nombre_completo || t('header.profile')}
                            </span>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-white text-neutral-950 px-4 py-2 rounded font-bold hover:bg-neutral-200"
                            onClick={() => navigate("/register")}
                        >
                            {t('header.register')}
                        </button>
                        <button
                            className="bg-green-400 text-white px-4 py-2 rounded font-bold hover:bg-green-500"
                            onClick={() => navigate("/login")}
                        >
                            {t('header.login')}
                        </button>
                    </>
                )}
                <ThemeToggle />
                <LanguageSwitcher />
            </div>
        </header>
    );
}