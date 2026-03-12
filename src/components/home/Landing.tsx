import { Bell, Package, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Antigravity from '../animaciones/Antigravity';

export default function LandingPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#2B2B2B] text-white relative">
            {/* Fondo animado */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Antigravity
                    count={250}
                    color="#00D9B1"
                    particleSize={1.5}
                    particleShape="sphere"
                    autoAnimate
                    waveSpeed={0.3}
                    waveAmplitude={0.8}
                    lerpSpeed={0.06}
                    magnetRadius={12}
                    ringRadius={8}
                    depthFactor={1.2}
                    pulseSpeed={2}
                    fieldStrength={8}
                />
            </div>

            {/* Contenido por encima de la animación */}
            <div className="relative z-10">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    {t('landing.hero.title')}<br />
                    <span className="text-[#00D9B1]">{t('landing.hero.highlight')}</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                    {t('landing.hero.description')}
                </p>
                <button onClick={() => navigate('/register')} className="px-8 py-3 bg-[#00D9B1] text-[#2B2B2B] rounded-full font-medium text-lg hover:bg-[#00C4A0] transition-colors">
                    {t('landing.hero.cta')}
                </button>
            </section>

            {/* How it works Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-4">{t('landing.howItWorks.title')}</h2>
                <p className="text-gray-400 text-center mb-12">
                    {t('landing.howItWorks.subtitle')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-4/3 bg-blue-500" />
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">{t('landing.howItWorks.cards.alerts.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('landing.howItWorks.cards.alerts.text')}</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-4/3 bg-purple-500" />
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">{t('landing.howItWorks.cards.inventory.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('landing.howItWorks.cards.inventory.text')}</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                        <div className="aspect-4/3 bg-green-500" />
                        <div className="p-6">
                            <div className="w-12 h-12 bg-[#00D9B1] rounded-xl flex items-center justify-center mb-4">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">{t('landing.howItWorks.cards.savings.title')}</h3>
                            <p className="text-gray-600 text-sm">{t('landing.howItWorks.cards.savings.text')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#00D9B1]/85 backdrop-blur-sm py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">50K+</div>
                            <div className="text-[#2B2B2B] font-medium">{t('landing.stats.users')}</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">2M+</div>
                            <div className="text-[#2B2B2B] font-medium">{t('landing.stats.products')}</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-2">30%</div>
                            <div className="text-[#2B2B2B] font-medium">{t('landing.stats.reduction')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.cta_final.title')}</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t('landing.cta_final.subtitle')}</p>
                <button onClick={() => navigate('/register')} className="px-8 py-3 bg-[#00D9B1] text-[#2B2B2B] rounded-full font-medium text-lg hover:bg-[#00C4A0] transition-colors">
                    {t('landing.cta_final.button')}
                </button>
            </section>
            </div>
        </div>
    );
}