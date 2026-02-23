import { useState, useMemo, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "@/utils/regex";
import Button from "@/components/ui/Button";
import Input from "./Input";
import { createUserRepository } from "@/database/repositories";
import type { RegisterData } from "@/interfaces/Perfil";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function RegistroForm() {
    const { setPerfil } = useAuthStore();
    const navigate = useNavigate();
    const userRepository = useMemo(() => createUserRepository(), []);
    
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = "";
        if (name === "password2") {
            error = value !== formData.password ? "Las contraseñas no coinciden" : "";
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
            password2: formData.password2 !== formData.password ? "Las contraseñas no coinciden" : ""
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
                setSubmitMessage(`❌ Error: ${error.message}`);
            } else if (data?.profile) {
                setPerfil(data.profile);
                setSubmitMessage("✅ Registro exitoso.");
                setTimeout(() => navigate("/profile"), 1000);
            } else {
                setSubmitMessage("✅ Revisa tu correo electrónico para confirmar tu cuenta.");
            }
        }
    };

    const handleEmailBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const error = validateField("email", e.target.value);
        setErrors((prev) => ({ ...prev, email: error }));
        if (error) return;

        const taken = await userRepository.isEmailTaken(e.target.value);
        if (taken) {
            setErrors((prev) => ({ ...prev, email: "Este correo electrónico ya está registrado" }));
        }
    };

    return (
        <section className="flex-1 w-full bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center py-8 px-4">
            <div className="bg-neutral-300 w-full max-w-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2 tracking-wide uppercase">
                    Crea tu cuenta
                </h2>
                <p className="text-gray-600 mb-8 text-center font-medium">
                    Regístrate para empezar a gestionar tus productos
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <Input label="Nombre completo" name="nombre" type="text" value={formData.nombre} onChange={handleChange} onBlur={handleBlur} error={errors.nombre} placeholder="Introduzca su nombre completo" autoComplete="name" />
                    <Input label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleEmailBlur} error={errors.email} placeholder="Introduzca su correo electrónico" autoComplete="email" />
                    <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} error={errors.password} placeholder="Mínimo 8 caracteres, letras y números" autoComplete="new-password" />
                    <Input label="Repita contraseña" name="password2" type="password" value={formData.password2} onChange={handleChange} onBlur={handleBlur} error={errors.password2} placeholder="Repita su contraseña" autoComplete="new-password" />
                    
                    {submitMessage && (
                        <div className={`text-center text-sm p-3 rounded-xl ${submitMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {submitMessage}
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <Button type="submit" variant="primary" className="w-full py-4 text-white font-bold bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md active:scale-95" disabled={loading}>
                            {loading ? 'Registrando...' : 'Aceptar'}
                        </Button>
                        <Button type="button" variant="secondary" className="w-full py-4 text-gray-700 font-bold bg-white border-2 border-emerald-500 rounded-xl hover:bg-gray-50 transition-all active:scale-95" onClick={() => navigate("/")}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>

            <div className="mt-8 flex items-center text-gray-500 text-sm">
                <ShieldCheck size={16} className="mr-2" />
                <span>Sus datos están protegidos y cifrados</span>
            </div>
        </section>
    );
}