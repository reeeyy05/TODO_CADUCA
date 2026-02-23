import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export default function InputFieldClase({ label, error, type, name, value, ...props }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                className="form-control"
                {...props}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}