import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";

// Definimos las interfaces para que TypeScript esté contento
interface FormDataProps {
  username: string;
  password: string;
}

interface ErrorsProps {
  username: string;
  password: string;
}

/**
 * Hook personalizado para gestionar la lógica de formularios.
 * Se exporta como función para ser usado en FormSignin.tsx
 */
export const useFormLogic = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsProps>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiamos el error mientras el usuario escribe
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || "" }));
  };

  // Retornamos todo lo que FormSignin.tsx necesita desestructurar
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    validateField,
  };
};

