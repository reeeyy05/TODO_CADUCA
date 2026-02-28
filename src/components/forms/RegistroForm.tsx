import { useState, type ChangeEvent, type FocusEvent } from "react";
import { useTranslation } from "react-i18next";
import { validateField } from "../../utils/regex";
import Button from "../ui/Button";
import Input from "./Input";
import { createUserRepository } from "../../database/repositories";
import type { RegisterData } from "../../interfaces/Perfil";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { isEmailTaken } from "../../database/supabase/RPCs/isEmailTaken";

export default function RegistroForm() {
    const { t } = useTranslation();
    const { setPerfil } = useAuthStore();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        password2: ""
    });

    const [errors, setErrors] = useState({
        nombre: "",
        email: "",
        password: "",
        password2: ""
    });

    const userRepository = createUserRepository();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "password2") {
            error = value !== formData.password ? t('register.errors.passwords_not_match') : "";
        } else {
            error = validateField(name, value);
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const [submitMessage, setSubmitMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage("");
        const newErrors = {
            nombre: validateField("nombre", formData.nombre),
            email: validateField("email", formData.email),
            password: validateField("password", formData.password),
            password2: formData.password2 !== formData.password 
                ? t('register.errors.passwords_not_match') 
                : ""
        };
        setErrors(newErrors);
        
        if (!Object.values(newErrors).some(Boolean)) {
            setLoading(true);
            const registerData: RegisterData = {
                email: formData.email,
                password: formData.password,
                nombre_completo: formData.nombre,
            };
            
            const { data, error } = await userRepository.createUser(registerData);
            setLoading(false);

            if (error) {
                setSubmitMessage(t('register.messages.error', { message: error.message }));
            } else if (data?.profile) {
                setPerfil(data.profile);
                setSubmitMessage(t('register.messages.success'));
                setTimeout(() => navigate("/profile"), 1000);
            } else {
                setSubmitMessage(t('register.messages.check_email'));
            }
        }
    };

    const handleEmailBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const error = validateField("email", e.target.value);
        setErrors((prev) => ({ ...prev, email: error }));
        if (error) return;

        const taken = await isEmailTaken(e.target.value);
        if (taken) {
            setErrors((prev) => ({ 
                ...prev, 
                email: t('register.errors.email_taken') 
            }));
        }
    };

    return (
        <section className="flex-1 w-full bg-neutral-800 flex flex-col items-center justify-center py-8 px-4">
            <div className="bg-[#D9D9D9] w-full max-w-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 tracking-wide uppercase">
                    {t('register.title')}
                </h2>
                <p className="text-gray-600 mb-8 text-center font-medium">
                    {t('register.subtitle')}
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <Input 
                        label={t('register.form.full_name')}
                        name="nombre" 
                        type="text" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.nombre} 
                        placeholder={t('register.form.full_name_placeholder')}
                        autoComplete="name" 
                    />
                    
                    <Input 
                        label={t('register.form.email')}
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        onBlur={handleEmailBlur} 
                        error={errors.email} 
                        placeholder={t('register.form.email_placeholder')}
                        autoComplete="email" 
                    />
                    
                    <Input 
                        label={t('register.form.password')}
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.password} 
                        placeholder={t('register.form.password_placeholder')}
                        autoComplete="new-password" 
                    />
                    
                    <Input 
                        label={t('register.form.password_confirm')}
                        name="password2" 
                        type="password" 
                        value={formData.password2} 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        error={errors.password2} 
                        placeholder={t('register.form.password_confirm_placeholder')}
                        autoComplete="new-password" 
                    />
                    
                    {submitMessage && (
                        <div className={`text-center text-sm p-3 rounded-xl ${
                            submitMessage.startsWith('✅') 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                        }`}>
                            {submitMessage}
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="w-full py-4 text-white font-bold bg-[#00D97E] hover:bg-[#00c270] rounded-xl transition-all shadow-md active:scale-95" 
                            disabled={loading}
                        >
                            {loading ? t('register.buttons.submitting') : t('register.buttons.submit')}
                        </Button>
                        
                        <Button 
                            type="button" 
                            variant="secondary" 
                            className="w-full py-4 text-gray-700 font-bold bg-white border-2 border-[#00D97E] rounded-xl hover:bg-gray-50 transition-all active:scale-95" 
                            onClick={() => navigate("/")}
                        >
                            {t('register.buttons.cancel')}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="mt-8 flex items-center text-gray-500 text-sm">
                <ShieldCheck size={16} className="mr-2" />
                <span>{t('register.footer.data_protected')}</span>
            </div>
        </section>
    );
}