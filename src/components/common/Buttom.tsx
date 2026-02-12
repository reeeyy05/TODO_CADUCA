import type { ButtonHTMLAttributes } from "react";

// Extiende para aceptar todas las propiedades nativas de los
// botones (onclick, disabled, type, children...)
// ButtonHTMLAttributes ya incluye children y className
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// Le llega un único parámetro (objeto) llamado props (propiedades),
// que debe tener la misma estructura que la interfaz ButtonProps
// en lugar de escribir todo el rato props.variant, props.children...
// se desestructura para acceder directamente
export default function Button(
  { children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "font-medium px-4 py-2 rounded-lg transition ";
  const hoverStyles = "hover:cursor-pointer";
  const variants = {
    primary: "btn-primary",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  // {...props} pasa todas las propiedades restantes, sin esto no podríamos ni acceder al onclick
  return (
    <button
      className={`${baseStyles} ${hoverStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}