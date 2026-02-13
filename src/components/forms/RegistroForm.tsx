import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";
import Button from "../ui/Button";
import Input from "./Input";
import { createUserRepository } from "../../database/repositories";
import type { RegisterData } from "../../interfaces/Perfil";

export default function RegistroForm() {
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
        const hasErrors = Object.values(newErrors).some(Boolean);
        if (!hasErrors) {
            setLoading(true);
            // Registro usando el repositorio
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
                setSubmitMessage("✅ Registro exitoso. Revisa tu correo para confirmar la cuenta.");
                setFormData({ nombre: "", email: "", username: "", password: "", password2: "" });
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-900">
            <div className="w-full max-w-md bg-neutral-100 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-neutral-800 tracking-wide">CREA TU CUENTA</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} onBlur={handleBlur} error={errors.nombre} placeholder="Introduzca su nombre completo" />
                    <Input label="Correo electrónico" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} placeholder="Introduzca su correo electrónico" />
                    <Input label="Nombre de usuario" name="username" type="text" value={formData.username} onChange={handleChange} onBlur={handleBlur} error={errors.username} placeholder="Introduzca su nombre de usuario" />
                    <Input label="Contraseña" name="password" type="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} error={errors.password} placeholder="Introduzca su contraseña" />
                    <Input label="Repita Contraseña" name="password2" type="password" value={formData.password2} onChange={handleChange} onBlur={handleBlur} error={errors.password2} placeholder="Repita su contraseña" />
                    {submitMessage && (
                        <div className={`text-center text-sm ${submitMessage.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{submitMessage}</div>
                    )}
                    <div className="flex gap-4 mt-6">
                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>{loading ? 'Registrando...' : 'Aceptar'}</Button>
                        <Button type="button" variant="secondary" className="w-full">Cancelar</Button>
                    </div>
                </form>
            </div>
            <footer className="mt-8 text-neutral-300 text-center text-xs">
                © 2026 Todo Caduca. Todos los derechos reservados.
            </footer>
        </div>
    );
}