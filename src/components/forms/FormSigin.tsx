import React, { useContext } from 'react';
import { User, Lock, Eye, Check, X, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFormLogic } from './FormSimpl';
import { UserContext } from '../../context/UserContext';
import { Link } from "react-router-dom";

const Login = () => {
  const { formData, handleChange, handleBlur } = useFormLogic();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = user?.registeredAt || new Date().toLocaleDateString();
    setUser({
      username: formData.username, 
      registeredAt: today,
      email: ''
    });
    navigate('/products'); 
  };

  return (

    <section className="flex-1 w-full flex flex-col items-center justify-center py-12">
      
      {/* TARJETA CENTRAL */}
      <div className="bg-[#D9D9D9] w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center mx-4">
        
        <div className="bg-[#10B981] p-4 rounded-2xl mb-4 shadow-lg">
          <User size={48} color="white" />
        </div>

        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">Iniciar Sesión</h1>
        <p className="text-gray-600 mb-8 text-center font-medium">
          Ingresa tus credenciales para acceder al sistema
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="flex flex-col">
            <label className="flex items-center text-gray-600 mb-2 ml-1 font-semibold text-sm">
              <User size={16} className="mr-2" /> Nombre de Usuario
            </label>
            <input   
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text" 
              placeholder="Ingresa tu nombre de usuario"
              className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
              <Lock size={16} className="mr-2" /> Contraseña
            </label>
            <div className="relative">
              <input 
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type="password" 
                placeholder="Ingresa tu contraseña"
                className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
              />
              <Eye className="absolute right-4 top-4 text-gray-400 cursor-pointer" size={20} />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button type="submit" className="w-full bg-[#00D97E] hover:bg-[#00c270] text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all">
              <Check size={20} className="mr-2" /> Aceptar
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="w-full bg-white border-2 border-[#00D97E] text-gray-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            >
              <X size={20} className="mr-2 text-gray-500" /> Cancelar
            </button>
          </div>
        </form>

       <Link 
  to="/reset-password" 
  className="mt-8 text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
>
  ¿Olvidaste tu contraseña?
</Link>
      </div>

      {/* FOOTER SSL SOBRE EL FONDO NEGRO */}
      <div className="mt-8 flex items-center text-gray-500 text-sm">
        <ShieldCheck size={16} className="mr-2" />
        <span>Tus datos están protegidos con encriptación SSL</span>
      </div>
    </section>
  );
};

export default Login;