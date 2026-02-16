// Traemos los tipos para que el input funcione igual que uno normal de HTML.
import type { InputHTMLAttributes } from "react";

// Aquí le decimos al input que puede recibir todas las cosas típicas, pero además una etiqueta y un error.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

// El componente Input: le das la etiqueta, el error y lo demás, y él se encarga de armar el campo.
export default function Input({ label, error, ...props }: InputProps) {

    // Aquí va el input, con su etiqueta y el mensaje de error si hay.
    return (
        <div className="mb-4">
            {/* La etiqueta del input, para que sepas qué escribir */}
            <label htmlFor={props.name} className="block mb-2 text-neutral-100 font-medium">
                {label}
            </label>
            {/* El input recibe todo lo que le quieras pasar, como type, value, onChange, etc. */}
            <input
                className="input"
                {...props}
            />
            {/* Si hay error, se muestra el mensaje en rojo */}
            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    )
}