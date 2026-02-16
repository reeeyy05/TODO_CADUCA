import React, { useState } from 'react'; 
import { User, Lock, Eye, EyeOff, Check, X } from 'lucide-react'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // Estados para los inputs (necesarios para que el login funcione de verdad)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función para el botón Aceptar
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    console.log("Intentando iniciar sesión con:", { username, password });
    alert(`Bienvenido, ${username}`);
  };

  // Función para el botón Cancelar
  const handleCancel = () => {
    setUsername('');
    setPassword('');
    console.log("Formulario limpiado");
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
      <div className="bg-[#D9D9D9] w-full max-w-md rounded-3xl shadow-lg p-8 flex flex-col items-center">
        
        <div className="bg-[#10B981] p-4 rounded-2xl mb-4">
          <User size={48} color="white" />
        </div>
 
        <h1 className="text-3xl font-bold text-black mb-2">Iniciar Sesión</h1>
        <p className="text-gray-600 mb-8 text-center">Ingresa tus credenciales</p>

        {/* 1. Añadimos el onSubmit al form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          
          <div className="flex flex-col">
            <label className="flex items-center text-gray-600 mb-2 ml-1">
              <User size={18} className="mr-2" /> Nombre de Usuario
            </label>
            <input    
              type="text" 
              value={username} // Vinculamos el estado
              onChange={(e) => setUsername(e.target.value)} // Capturamos el texto
              placeholder="Ingresa tu nombre de usuario"
              className="w-full p-4 rounded-2xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center text-gray-600 mb-2 ml-1">
              <Lock size={18} className="mr-2" /> Contraseña
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} // Vinculamos el estado
                onChange={(e) => setPassword(e.target.value)} // Capturamos el texto
                placeholder="Ingresa tu contraseña"
                className="w-full p-4 rounded-2xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <div 
                className="absolute right-4 top-4 text-gray-400 cursor-pointer select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {/* 2. Cambiamos type a "submit" */}
            <button 
              type="submit" 
              className="w-full bg-[#00D97E] hover:bg-[#00c270] text-white font-bold py-4 rounded-2xl flex items-center justify-center transition-colors shadow-md"
            >
              <Check size={20} className="mr-2" /> Aceptar
            </button>
            
            {/* 3. Añadimos el onClick al de cancelar */}
            <button 
              type="button" 
              onClick={handleCancel}
              className="w-full bg-white border-2 border-[#00D97E] text-gray-700 font-bold py-4 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <X size={20} className="mr-2 text-gray-500" /> Cancelar
            </button>
          </div>
        </form>

        <button className="mt-8 text-blue-600 hover:underline font-medium">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default Login;