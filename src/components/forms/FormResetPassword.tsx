import React, { useState } from 'react';
import { Mail, Lock, Check, X, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUserRepository } from '../../database/repositories';
import { validateField } from '../../utils/regex';
import Input from './Input';

export default function FormResetPassword() {
    const navigate = useNavigate();
    const userRepository = createUserRepository();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const emailError = validateField("email", email);
        if (emailError) {
            setMessage(`❌ ${emailError}`);
            return;
        }

        setLoading(true);
        const { error } = await userRepository.resetPasswordForEmail(email);
        setLoading(false);

        if (error) {
            setMessage(`❌ ${error.message ?? "Error al enviar el correo."}`);
        } else {
            setMessage("✅ Se ha enviado un enlace a tu correo.");
            setTimeout(() => navigate("/login"), 2000);
        }
    };

    return (
        <section className="flex-1 w-full bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center py-12 px-4">
            
            <div className="bg-neutral-300 w-full max-w-md rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                
                {/* Icono decorativo */}
                <div className="bg-emerald-500 p-4 rounded-2xl mb-4 shadow-lg text-white">
                    <Lock size={40} />
                </div>

                <h2 className="text-3xl font-bold text-neutral-900 mb-2 text-center uppercase tracking-tight">
                    Restablecer
                </h2>
                <p className="text-gray-600 mb-8 text-center font-medium">
                    Ingresa tu correo para recuperar el acceso
                </p>

                <form onSubmit={handleReset} className="w-full space-y-5">
                    
                    <Input 
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                    />

                    <Input 
                        label="Nueva Contraseña"
                        name="password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nueva clave"
                        required
                    />

                    {message && (
                        <div className={`text-center text-sm p-3 rounded-xl font-semibold ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 mt-8">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Check size={20} /> {loading ? 'Enviando...' : 'ENVIAR ENLACE'}
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => navigate("/login")}
                            className="w-full bg-white border-2 border-emerald-500 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <X size={20} /> CANCELAR
                        </button>
                    </div>
                </form>

                <button 
                    onClick={() => navigate("/login")}
                    className="mt-8 flex items-center text-blue-600 hover:underline font-semibold gap-1"
                >
                    <ArrowLeft size={16} /> Volver al inicio de sesión
                </button>
            </div>

            <div className="mt-8 flex items-center text-gray-500 text-sm">
                <ShieldCheck size={16} className="mr-2" />
                <span>Conexión segura SSL verificada</span>
            </div>
        </section>
    );
}