import { Bell, Package, DollarSign, ShieldCheck, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    const handleCTA = () => {
        navigate(isAuthenticated ? '/products' : '/register');
    };

    return (
        <div className="text-neutral-900 dark:text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Nunca más desperdicies<br />
                    <span className="text-green-600 dark:text-green-400">comida</span>
                </h1>
                <p className="text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                    Todo Caduca te ayuda a controlar las fechas de caducidad de tus alimentos,
                    recibir alertas antes de que expiren y reducir el desperdicio en tu hogar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleCTA}
                        className="px-8 py-3 bg-green-500 text-white rounded-full font-medium text-lg hover:bg-green-600 transition-colors"
                    >
                        {isAuthenticated ? 'Ir a mis productos' : 'Comenzar gratis'}
                    </button>
                    {!isAuthenticated && (
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-3 border border-green-500 text-green-600 dark:text-green-400 rounded-full font-medium text-lg hover:bg-green-500/10 transition-colors"
                        >
                            Ya tengo cuenta
                        </button>
                    )}
                </div>
            </section>

            {/* How it works Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-4">¿Cómo funciona?</h2>
                <p className="text-neutral-600 dark:text-gray-400 text-center mb-12">
                    Gestiona tu despensa de forma inteligente y ahorra dinero mientras cuidas el planeta
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700">
                        <div className="aspect-4/3 bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                            <Bell className="w-20 h-20 text-white/30" />
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Recibe alertas</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">
                                Visualiza qué alimentos están próximos a caducar para que puedas consumirlos a tiempo.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700">
                        <div className="aspect-4/3 bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                            <Package className="w-20 h-20 text-white/30" />
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Organiza tu despensa</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">
                                Mantén un inventario digital de todos tus alimentos, ordenados por categoría y fecha de caducidad.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700">
                        <div className="aspect-4/3 bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center">
                            <DollarSign className="w-20 h-20 text-white/30" />
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Ahorra dinero</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">
                                Deja de tirar comida y ahorra dinero al aprovechar mejor tus productos antes de que caduquen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-neutral-100 dark:bg-neutral-800/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                        <div className="flex flex-col items-center gap-3">
                            <ShieldCheck className="w-10 h-10 text-green-400" />
                            <h3 className="text-lg font-bold">Datos seguros</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">Tus datos están protegidos con encriptación y autenticación segura.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Package className="w-10 h-10 text-green-400" />
                            <h3 className="text-lg font-bold">9 categorías</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">Organiza tus productos en categorías: Frutas, Lácteos, Carnes y más.</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <Leaf className="w-10 h-10 text-green-400" />
                            <h3 className="text-lg font-bold">Cuida el planeta</h3>
                            <p className="text-neutral-600 dark:text-gray-400 text-sm">Reduce el desperdicio alimentario y contribuye a un mundo más sostenible.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Empieza a controlar tu despensa hoy
                </h2>
                <p className="text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                    Regístrate gratis y comienza a gestionar tus alimentos de manera inteligente.
                </p>
                <button
                    onClick={handleCTA}
                    className="px-8 py-3 bg-green-500 text-white rounded-full font-medium text-lg hover:bg-green-600 transition-colors"
                >
                    {isAuthenticated ? 'Ver mis productos' : 'Crear cuenta gratis'}
                </button>
            </section>
        </div>
    );
}