import { Bell, Package, DollarSign } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#2B2B2B] text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Nunca más desperdicies<br />
                    <span className="text-[#00D9B1]">comida</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Todo-Caduca te ayuda a controlar las fechas de caducidad de tus alimentos, recibir notificaciones antes de que tus productos expiren y reducir el desperdicio de comida en tu hogar.
                </p>
                <button className="px-8 py-3 bg-[#00D9B1] text-[#2B2B2B] rounded-full font-medium text-lg hover:bg-[#00C4A0] transition-colors">
                    Comenzar gratis
                </button>
            </section>

            {/* How it works Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-4">¿Cómo funciona?</h2>
                <p className="text-gray-400 text-center mb-12">
                    Gestiona tu alacena de forma inteligente y ahorra dinero mientras cuidas el planeta
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-600"></div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">Recibe alertas</h3>
                            <p className="text-gray-600 text-sm">
                                Te notificamos cuando tus alimentos están próximos a caducar para que puedas consumirlos a tiempo
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-[4/3] bg-gradient-to-br from-purple-400 to-purple-600"></div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">Organiza tu despensa</h3>
                            <p className="text-gray-600 text-sm">
                                Mantén un inventario digital de todos tus alimentos, ordenados por categoría y fecha de caducidad
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-[4/3] bg-gradient-to-br from-green-400 to-green-600"></div>
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">Ahorra dinero</h3>
                            <p className="text-gray-600 text-sm">
                                Deja de tirar comida y ahorra dinero al aprovechar mejor tus productos antes de que caduquen
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#00D9B1] py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">50K+</div>
                            <div className="text-[#2B2B2B] font-medium">Usuarios activos</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">2M+</div>
                            <div className="text-[#2B2B2B] font-medium">Productos registrados</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">30%</div>
                            <div className="text-[#2B2B2B] font-medium">Reducción de desperdicios</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Únete a la revolución contra el desperdicio
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    Descarga Todo-Caduca hoy y comienza a gestionar tus alimentos de manera inteligente
                </p>
                <button className="px-8 py-3 bg-[#00D9B1] text-[#2B2B2B] rounded-full font-medium text-lg hover:bg-[#00C4A0] transition-colors">
                    Empezar ahora - ¡Es gratis!
                </button>
            </section>
        </div>
    );
}