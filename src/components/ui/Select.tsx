// Traemos los tipos para que el select funcione igual que uno normal de HTML.
import type { SelectHTMLAttributes } from "react";

// Aquí le decimos al select que puede recibir todas las cosas típicas, pero además un array de opciones.
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
}

// Cada opción es un objeto con el valor y el texto que se va a mostrar.
interface Option {
    value: string;
    label: string;
}

// El componente Select: le das las opciones y lo demás, y él se encarga de armar el menú.
export default function Select({options, ...props}: SelectProps) {
    // Aquí va el select, y dentro van todas las opciones que le mandes.
    return(
        <>
            {/* El select recibe todo lo que le quieras pasar, como onChange, value, etc. */}
            <select {...props}>
                {/* Por cada opción, se crea un <option> con su valor y su texto. */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {/* Aquí va el nombre que se ve en el menú. */}
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    )
}