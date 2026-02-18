import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";

interface FormDataProps {
  username: string;
  password: string;
}

interface ErrorsProps {
  username: string;
  password: string;
}

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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || "" }));
  };

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

