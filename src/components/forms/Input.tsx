// Traemos los tipos para que el input funcione igual que uno normal de HTML.
import type { InputHTMLAttributes } from "react";

// Aquí le decimos al input que puede recibir todas las cosas típicas, pero además una etiqueta y un error.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

// El componente Input: le das la etiqueta, el error y lo demás, y él se encarga de armar el campo.
export default function Input({ label, error, type, name, value,  ...props }: InputProps) {

    // Aquí va el input, con su etiqueta y el mensaje de error si hay.
    return (
        <div className="mb-4">
            {/* La etiqueta del input, para que sepas qué escribir */}
            <label htmlFor={name} className="block mb-2 text-green-600 font-medium">
                {label}
            </label>
            {/* El input recibe todo lo que le quieras pasar, como type, value, onChange, etc. */}
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                className="block w-full bg-white text-green-600 border border-green-600 rounded-lg px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                {...props}
            />
            {/* Si hay error, se muestra el mensaje en rojo */}
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    )
}