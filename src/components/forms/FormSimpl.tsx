import { useState, type ChangeEvent, type FocusEvent } from "react";
import { validateField } from "../../utils/regex";
import Button from "../common/Buttom";
import InputFieldClase from "./InputField";

interface FormDataProps {
  name: string;
  password: string;
}

interface ErrorsProps {
  name: string;
  password: string;  
}

export default function SimpleForm() {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsProps>({
    name: "",
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
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      alert("Formulario válido ✅");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">

        {/* nombre */}
      <InputFieldClase
        label="Nombre"
        name="name"
        type="text"
        value={formData.name}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
      ></InputFieldClase>

        {/* contraseña */}
      <InputFieldClase
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}

      ></InputFieldClase>

      <Button type="submit">Enviar</Button>

    </form>
  );
}