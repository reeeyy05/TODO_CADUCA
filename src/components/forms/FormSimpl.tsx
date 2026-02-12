import { useState, type ChangeEvent, type FocusEvent } from "react";

export default function useFormLogic() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        if (!value.trim()) return "El nombre de usuario es obligatorio";
        return "";
      case "password":
        if (value.length < 6) return "Mínimo 6 caracteres";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return { formData, errors, handleChange, handleBlur, setErrors, validateField };
}