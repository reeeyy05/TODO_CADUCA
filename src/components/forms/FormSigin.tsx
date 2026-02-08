import { useState } from "react";
import useFormLogic from "./FormSimpl";
import Alert from "../common/Alert";

export default function FormSigin() {
  const { formData, errors, handleChange, handleBlur, setErrors, validateField } = useFormLogic();
  
  // Estado para manejar la visibilidad y el mensaje de la Alerta
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos ambos campos antes de decidir qué mostrar
    const userErr = validateField("username", formData.username);
    const passErr = validateField("password", formData.password);

    if (userErr || passErr) {
      // Si hay errores de regex, actualizamos los errores y mostramos alerta roja
      setErrors({ username: userErr, password: passErr });
      setAlert({ message: "Revisa los campos marcados en rojo", type: 'error' });
    } else {
      // Si todo está bien, mostramos alerta verde
      setAlert({ message: "¡Acceso concedido!", type: 'success' });
      console.log("Datos enviados:", formData);
    }
  };

  return (
    <section>
      {/* Componente Alert: Solo se renderiza si hay un mensaje */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

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

        <div>
          <button type="submit">Aceptar</button>
          <button type="button" onClick={() => setAlert(null)}>Cancelar</button>
        </div>
        
        <p>¿Olvidaste tu contraseña?</p>
      </form>
    </section>
  );
}