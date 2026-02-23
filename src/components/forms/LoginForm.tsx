import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Check, X, ShieldCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { validateField } from '../../utils/regex';
import { createUserRepository } from '../../database/repositories';
import { useAuthStore } from '../../store/authStore';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setPerfil } = useAuthStore();
  const userRepository = createUserRepository();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Estado para recuperación de contraseña
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');

    const newErrors = {
      email: validateField('email', email),
      password: validateField('password', password),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    const { data, error } = await userRepository.login(email, password);
    setLoading(false);

    if (error) {
      setSubmitMessage(`❌ Credenciales incorrectas o error: ${error.message}`);
      return;
    }

    if (data?.profile) {
      setPerfil(data.profile);
      navigate('/profile');
    }
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryMessage('');

    const emailError = validateField('email', recoveryEmail);
    if (emailError) {
      setRecoveryMessage(`❌ ${emailError}`);
      return;
    }

    setRecoveryLoading(true);
    const { error } = await userRepository.resetPasswordForEmail(recoveryEmail);
    setRecoveryLoading(false);

    if (error) {
      setRecoveryMessage(`❌ ${error.message}`);
    } else {
      setRecoveryMessage('✅ Se ha enviado un correo de recuperación. Revisa tu bandeja de entrada.');
    }
  };

  return (
    <section className="flex-1 w-full bg-neutral-100 dark:bg-transparent flex flex-col items-center justify-center py-12">
      <div className="bg-neutral-300 w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center mx-4">
        <div className="bg-emerald-500 p-4 rounded-2xl mb-4 shadow-lg">
          <User size={48} color="white" />
        </div>

        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {showRecovery ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
        </h1>
        <p className="text-gray-600 mb-8 text-center font-medium">
          {showRecovery
            ? 'Introduce tu correo electrónico para recibir un enlace de recuperación'
            : 'Ingresa tus credenciales para acceder al sistema'}
        </p>

        {/* ───────── Formulario de Login ───────── */}
        {!showRecovery && (
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="flex flex-col">
              <label htmlFor="login-email" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Mail size={16} className="mr-2" /> Correo electrónico
              </label>
              <input
                id="login-email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                onBlur={() => setErrors((prev) => ({ ...prev, email: validateField('email', email) }))}
                type="email"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
                className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="login-password" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Lock size={16} className="mr-2" /> Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                  onBlur={() => setErrors((prev) => ({ ...prev, password: validateField('password', password) }))}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
            </div>

            {submitMessage && (
              <div className={`text-center text-sm p-3 rounded-xl ${submitMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Check size={20} className="mr-2" /> {loading ? 'Iniciando sesión...' : 'Aceptar'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-white border-2 border-emerald-500 text-gray-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
              >
                <X size={20} className="mr-2 text-gray-500" /> Cancelar
              </button>
            </div>
          </form>
        )}

        {/* ───────── Formulario de Recuperación ───────── */}
        {showRecovery && (
          <form onSubmit={handleRecovery} className="w-full space-y-6">
            <div className="flex flex-col">
              <label htmlFor="recovery-email" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Mail size={16} className="mr-2" /> Correo electrónico
              </label>
              <input
                id="recovery-email"
                name="recovery-email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                type="email"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
                className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
              />
            </div>

            {recoveryMessage && (
              <div className={`text-center text-sm p-3 rounded-xl ${recoveryMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {recoveryMessage}
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button
                type="submit"
                disabled={recoveryLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Mail size={20} className="mr-2" /> {recoveryLoading ? 'Enviando...' : 'Enviar correo de recuperación'}
              </button>
              <button
                type="button"
                onClick={() => { setShowRecovery(false); setRecoveryMessage(''); }}
                className="w-full bg-white border-2 border-emerald-500 text-gray-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
              >
                <X size={20} className="mr-2 text-gray-500" /> Volver al login
              </button>
            </div>
          </form>
        )}

        {!showRecovery && (
          <button
            type="button"
            onClick={() => setShowRecovery(true)}
            className="mt-8 text-blue-600 hover:underline font-semibold"
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </div>

      <div className="mt-8 flex items-center text-gray-500 text-sm">
        <ShieldCheck size={16} className="mr-2" />
        <span>Tus datos están protegidos con encriptación SSL</span>
      </div>
    </section>
  );
}