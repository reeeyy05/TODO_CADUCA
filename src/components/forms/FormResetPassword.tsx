import React, { useState } from 'react';
import { Mail, Lock, Check, X, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from './Input'; // Importamos tu componente de Input

export default function FormResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría tu lógica de Supabase para resetear
        console.log("Reseteando para:", email);
        setMessage("✅ Se ha enviado un enlace a tu correo.");
        
        // Redirigir al login tras un pequeño delay
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <section className="flex-1 w-full bg-[#262626] flex flex-col items-center justify-center py-12 px-4">
            
            <div className="bg-[#D9D9D9] w-full max-w-md rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                
                {/* Icono decorativo */}
                <div className="bg-[#10B981] p-4 rounded-2xl mb-4 shadow-lg text-white">
                    <Lock size={40} />
                </div>

                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 text-center uppercase tracking-tight">
                    Restablecer
                </h2>
                <p className="text-gray-600 mb-8 text-center font-medium">
                    Ingresa tus datos para recuperar el acceso
                </p>

                <form onSubmit={handleReset} className="w-full space-y-5">
                    
                    <div className="w-full text-left">
                        <label className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm uppercase">
                            <Mail size={16} className="mr-2" /> Correo Electrónico
                        </label>
                        <Input 
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required label={''}                        />
                    </div>

                    <div className="w-full text-left">
                        <label className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm uppercase">
                            <Lock size={16} className="mr-2" /> Nueva Contraseña
                        </label>
                        <Input 
                            name="password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nueva clave"
                            required label={''}                        />
                    </div>

                    {message && (
                        <div className="text-center text-sm p-3 rounded-xl bg-green-100 text-green-700 font-semibold">
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 mt-8">
                        <button 
                            type="submit" 
                            className="w-full bg-[#00D97E] hover:bg-[#00c270] text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Check size={20} /> ENVIAR ENLACE
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => navigate("/login")}
                            className="w-full bg-white border-2 border-[#00D97E] text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
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