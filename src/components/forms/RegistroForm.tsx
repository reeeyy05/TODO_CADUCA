import { useState, useContext, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";
import Button from "../ui/Button";
import Input from "./Input";
import { createUserRepository } from "../../database/repositories";
import type { RegisterData } from "../../interfaces/Perfil";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react"; // Importamos para mantener la estética

export default function RegistroForm() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        username: "",
        password: "",
        password2: ""
    });

    const [errors, setErrors] = useState({
        nombre: "",
        email: "",
        username: "",
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
            nombre: formData.nombre.length < 3 ? "El nombre debe tener al menos 3 caracteres" : "",
            email: validateField("email", formData.email),
            username: validateField("username", formData.username),
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
            
            const { error } = await userRepository.createUser(registerData);
            setLoading(false);

            if (error) {
                setSubmitMessage(`❌ Error: ${error.message}`);
            } else {
                setUser({
                    username: formData.username,
                    email: formData.email,
                    registeredAt: new Date().toLocaleDateString('es-ES')
                });
                
                setSubmitMessage("✅ Registro exitoso.");
                setTimeout(() => navigate("/profile"), 1000);
            }
        }
    };

    return (
        /* 1. Usamos flex-1 y el fondo oscuro igual que en el login para que ocupe todo el hueco */
        <section className="flex-1 w-full bg-[#1b1b1b] flex flex-col items-center justify-center py-12 px-4">
            
            {/* 2. Cambiamos bg-neutral-700 por el gris claro del login y aumentamos max-w-lg */}
            <div className="bg-[#D9D9D9] w-full max-w-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center">
                
                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2 tracking-wide uppercase">
                    Crea tu cuenta
                </h2>
                <p className="text-gray-600 mb-8 text-center font-medium">
                    Regístrate para empezar a gestionar tus productos
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    {/* Los componentes Input deben tener bg-white dentro de su propia definición */}
                    <Input label="Nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} onBlur={handleBlur} error={errors.nombre} placeholder="Introduzca su nombre completo" />
                    <Input label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} placeholder="Introduzca su correo electrónico" />
                    <Input label="Nombre de usuario" name="username" type="text" value={formData.username} onChange={handleChange} onBlur={handleBlur} error={errors.username} placeholder="Introduzca su nombre de usuario" />
                    <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} error={errors.password} placeholder="Introduzca su contraseña" />
                    <Input label="Repita Contraseña" name="password2" type="password" value={formData.password2} onChange={handleChange} onBlur={handleBlur} error={errors.password2} placeholder="Repita su contraseña" />
                    
                    {submitMessage && (
                        <div className={`text-center text-sm p-3 rounded-xl ${submitMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {submitMessage}
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        <Button type="submit" variant="primary" className="w-full py-4 text-white font-bold bg-[#00D97E] hover:bg-[#00c270] rounded-xl transition-all shadow-md active:scale-95" disabled={loading}>
                            {loading ? 'Registrando...' : 'Aceptar'}
                        </Button>
                        <Button type="button" variant="secondary" className="w-full py-4 text-gray-700 font-bold bg-white border-2 border-[#00D97E] rounded-xl hover:bg-gray-50 transition-all active:scale-95" onClick={() => navigate("/")}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>

            {/* Mantener estética de seguridad */}
            <div className="mt-8 flex items-center text-gray-500 text-sm">
                <ShieldCheck size={16} className="mr-2" />
                <span>Sus datos están protegidos y cifrados</span>
            </div>
        </section>
    );
}