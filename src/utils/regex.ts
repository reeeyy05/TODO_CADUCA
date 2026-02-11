   export const validateField = (name: string, value: string) => {// Función para validar cada campo
    switch (name) {
      case "name":
        if (!value.trim()) return "El nombre es obligatorio";
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value))
          return "Solo se permiten letras y espacios";
        return "";
      case "age":
        if (!value) return "La edad es obligatoria";
        if (Number(value) <= 0) return "Debe ser mayor que 0";
        return "";
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email no válido";
        return "";
      case "username":
        if (!value.trim()) return "El nombre de usuario es obligatorio";
        if (value.length < 3) return "Mínimo 3 caracteres";
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return "Solo se permiten letras, números y guiones bajos";
        return "";
      case "password":
        if (value.length < 6) return "Mínimo 6 caracteres";
        return "";
      default:
        return "";
    }
  };