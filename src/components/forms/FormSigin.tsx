import useFormLogic from "./FormSimpl";

export default function FormSigin() {
  const { formData, errors, handleChange, handleBlur, setErrors, validateField } = useFormLogic();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validamos todo antes de enviar
    const newErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
    };
    
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      alert("Formulario válido ✅. Intentando iniciar sesión...");
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      
      <div>
        <label>Nombre de Usuario</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Aceptar</button>
      <button type="button">Cancelar</button>
      
      <p>¿Olvidaste tu contraseña?</p>
    </form>
  );
}