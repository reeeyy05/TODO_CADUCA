import type { InputHTMLAttributes } from "react";

interface InputFieldProps  extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    error?: string;

}

export default function InputFieldClase({label, error, type, name, value, ...props } : InputFieldProps) {
    
        return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                className="block w-full border rounded p-2"
                {...props}
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    )
}