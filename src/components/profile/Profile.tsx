import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext); // Asumiendo que el context tiene updateUser
  
  // Estados para manejar el formulario de edición de nombre
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sincronizar tempName con el username del usuario
  useEffect(() => {
    if (user?.username) {
      setTempName(user.username);
    }
  }, [user?.username]);

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  // Simulación de envío de correo de recuperación (Especificación de contraseña)
  const handlePasswordRecovery = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // TODO: Descomentar cuando se integre Supabase
      // const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      // if (error) throw error;
      
      // Simulación temporal
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`Se ha enviado un correo de recuperación a tu dirección de email.`);
    } catch (err) {
      setError("Error al enviar el correo de recuperación. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Guardar el nuevo nombre
  const handleSaveName = async () => {
    // Validación básica
    if (!tempName.trim()) {
      setError("El nombre no puede estar vacío");
      return;
    }

    if (tempName.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }

    if (tempName.trim() === user?.username) {
      setError("El nuevo nombre es igual al actual");
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      // TODO: Descomentar cuando se integre Supabase
      // const { error } = await supabase
      //   .from('users')
      //   .update({ username: tempName.trim() })
      //   .eq('id', user.id);
      // if (error) throw error;

      // Simulación temporal
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el contexto (si tienes la función updateUser en el contexto)
      // updateUser?.({ ...user, username: tempName.trim() });
      
      setSuccessMessage("Nombre actualizado correctamente");
      setIsEditing(false);
      console.log("Nombre actualizado a:", tempName.trim());
    } catch (err) {
      setError("Error al actualizar el nombre. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setTempName(user?.username || "");
    setIsEditing(false);
    setError(null);
  };

  // Manejar Enter key en el input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Si el context aún no carga el usuario
  if (!user) return <div className="profile-container">Cargando...</div>;

  const fechaRegistro: string = user.registeredAt || "03/02/2026";

  return (
    <div className="profile-container">
      {/* HEADER */}
      <header className="profile-header">
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1>Todo Caduca</h1>
        </div>
        <nav className="nav-links">
          <a href="#">Mis Productos</a>
          <a href="#" className="active">Perfil</a>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="profile-main">
        <div className="title-group">
          <h2>Mi Perfil</h2>
          <p>Gestiona tu información personal y preferencias de cuenta</p>
        </div>

        {/* Mensajes de éxito/error */}
        {successMessage && (
          <div className="message-box success-message">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="message-box error-message">
            {error}
          </div>
        )}

        <section className="profile-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>

          <div className="info-section">
            <div className="input-grid">
              <div className="input-field">
                <label>Nombre de usuario</label>
                {isEditing ? (
                  <div className="edit-form">
                    <input 
                      type="text" 
                      className="data-input"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isLoading}
                      autoFocus
                      placeholder="Introduce tu nombre"
                    />
                    <button 
                      className="save-small-btn" 
                      onClick={handleSaveName}
                      disabled={isLoading}
                    >
                      {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                    <button 
                      className="cancel-small-btn" 
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="data-box">{tempName || "Usuario"}</div>
                )}
              </div>
            </div>

            <div className="input-field">
              <label>Información de membresía</label>
              <div className="data-box">
                {/* ESPECIFICACIÓN: "Pepito es miembro desde el 02/02/2026" */}
                {tempName || "Usuario"} es miembro desde el {fechaRegistro}
              </div>
            </div>

            <div className="action-row">
              {!isEditing && (
                <button 
                  className="save-btn" 
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                >
                  Editar Nombre
                </button>
              )}
              <button 
                className="save-btn" 
                onClick={handlePasswordRecovery}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Recuperar Contraseña"}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="profile-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-section">
              <div className="logo-icon small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Todo Caduca</h3>
            </div>
            <p>Gestiona inteligentemente las fechas de caducidad de tus productos para reducir el desperdicio alimentario y ahorrar dinero.</p>
          </div>
          
          <div className="footer-links-container">
            <div className="link-column">
              <h4>Funciones</h4>
              <ul>
                <li>Gestión de Inventario</li>
                <li>Alertas de Caducidad</li>
                <li>Estadísticas</li>
                <li>Recetas Sugeridas</li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Soporte</h4>
              <ul>
                <li>Centro de Ayuda</li>
                <li>Contacto</li>
                <li>Política de Privacidad</li>
                <li>Términos de Uso</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Todo Caduca. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Profile;
