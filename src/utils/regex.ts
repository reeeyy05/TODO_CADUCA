/**
 * Validaciones con regex para todos los campos del formulario.
 */
const REGEX = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,100}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
} as const;

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case "nombre":
      if (!value.trim()) return "El nombre es obligatorio";
      if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres";
      if (!REGEX.nombre.test(value))
        return "Solo se permiten letras y espacios (máx. 100 caracteres)";
      return "";

    case "email":
      if (!value.trim()) return "El correo electrónico es obligatorio";
      if (!REGEX.email.test(value)) return "El correo electrónico no es válido";
      return "";

    case "password":
      if (!value) return "La contraseña es obligatoria";
      if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres";
      if (!REGEX.password.test(value))
        return "Debe contener al menos una letra y un número";
      return "";

    default:
      return "";
  }
};