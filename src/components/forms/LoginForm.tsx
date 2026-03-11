import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Check, X, ShieldCheck, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validateField } from '../../utils/regex';
import { createUserRepository } from '../../database/repositories';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../database/supabase/Client';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setPerfil } = useAuthStore();
  const userRepository = createUserRepository();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      setSubmitMessage(t('Login.messages.error_auth', { message: error.message }));
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
    const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail, {
      redirectTo: `${window.location.origin}/login`,
    });
    setRecoveryLoading(false);

    if (error) {
      setRecoveryMessage(t('Login.messages.recovery_error', { message: error.message }));
    } else {
      setRecoveryMessage(t('Login.messages.recovery_success'));
    }
  };

  return (
    /* SE HA AÑADIDO 'px-4' PARA EL PADDING LATERAL EN MÓVILES */
    <section className="flex-1 w-full flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-[#D9D9D9] w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center mx-4">
        <div className="bg-[#10B981] p-4 rounded-2xl mb-4 shadow-lg">
          <User size={48} color="white" />
        </div>

        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2 text-center">
          {showRecovery ? t('Login.recovery_title') : t('Login.title')}
        </h1>
        <p className="text-gray-600 mb-8 text-center font-medium">
          {showRecovery ? t('Login.recovery_subtitle') : t('Login.subtitle')}
        </p>

        {!showRecovery && (
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="flex flex-col">
              <label htmlFor="login-email" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Mail size={16} className="mr-2" /> {t('Login.email_label')}
              </label>
              <input
                id="login-email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                type="email"
                placeholder={t('Login.email_placeholder')}
                className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="login-password" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Lock size={16} className="mr-2" /> {t('Login.password_label')}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Login.password_placeholder')}
                  className="w-full p-4 rounded-xl border-none bg-white shadow-inner focus:ring-2 focus:ring-emerald-500 outline-none text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
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
                className="w-full bg-[#00D97E] hover:bg-[#00c270] text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Check size={20} className="mr-2" /> {loading ? t('Login.btn_loading') : t('Login.btn_accept')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full bg-white border-2 border-[#00D97E] text-gray-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
              >
                <X size={20} className="mr-2 text-gray-500" /> {t('Login.btn_cancel')}
              </button>
            </div>
          </form>
        )}

        {showRecovery && (
          <form onSubmit={handleRecovery} className="w-full space-y-6">
            <div className="flex flex-col">
              <label htmlFor="recovery-email" className="flex items-center text-gray-500 mb-2 ml-1 font-semibold text-sm">
                <Mail size={16} className="mr-2" /> {t('Login.email_label')}
              </label>
              <input
                id="recovery-email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                type="email"
                placeholder={t('Login.email_placeholder')}
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
                className="w-full bg-[#00D97E] hover:bg-[#00c270] text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                <Mail size={20} className="mr-2" /> {recoveryLoading ? t('Login.btn_recovery_loading') : t('Login.btn_recovery_send')}
              </button>
              <button
                type="button"
                onClick={() => { setShowRecovery(false); setRecoveryMessage(''); }}
                className="w-full bg-white border-2 border-[#00D97E] text-gray-700 font-bold py-4 rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
              >
                <X size={20} className="mr-2 text-gray-500" /> {t('Login.btn_back_login')}
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
            {t('Login.btn_forgot')}
          </button>
        )}
      </div>

      <div className="mt-8 flex items-center text-gray-500 text-sm">
        <ShieldCheck size={16} className="mr-2" />
        <span>{t('Login.security_note')}</span>
      </div>
    </section>
  );
};

export default Login;