export const validateField = (name: string, value: string): string => {
  switch (name) {
    case "username":
      // solo letras numeros y guiones bajos, entre 3 y 16 caracteres
      const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
      if (!value.trim()) return "El nombre de usuario es obligatorio";
      if (!usernameRegex.test(value)) return "Usuario no válido (3-16 caracteres, sin símbolos)";
      return "";

    case "password":
      /* al menos 8 caracteres una letra y un numero  */
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!value) return "La contraseña es obligatoria";
      if (!passwordRegex.test(value)) return "Mínimo 8 caracteres, incluyendo letras y números";
      return "";

    default:
      return "";
  }
};