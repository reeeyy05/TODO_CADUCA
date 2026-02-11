import type { ButtonHTMLAttributes } from "react";

// Este botón acepta todo lo típico de un botón, pero además puedes elegir el color con "variant".
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// Aquí llegan las props, y desestructuramos para que sea más fácil usar todo.
export default function Button(
  { children, variant = "primary", className = "", ...props }: ButtonProps) {
  // Unas clases base para que el botón se vea bonito.
  const baseStyles = "font-medium px-4 py-2 rounded-lg transition";
  // Para que el cursor cambie al pasar por encima.
  const hoverStyles = "hover:cursor-pointer";
  // Los estilos según el color que elijas.
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700", // Verde, como el de 'Iniciar Sesión'
    secondary: "bg-white text-green-600 border border-green-600 hover:bg-green-50", // Blanco con borde verde, como 'Registrarse'
  };

  // Aquí se arma el botón, y se pasan todas las props para que funcione como cualquier botón.
  return (
    <button
      className={`${baseStyles} ${hoverStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}