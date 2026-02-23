import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
}

interface Option {
    value: string;
    label: string;
}

export default function Select({ options, ...props }: SelectProps) {
    return (
        <select className="form-control" {...props}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}