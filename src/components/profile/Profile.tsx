import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import "../../styles/profile.css";

const Profile: React.FC = () => {
  const { user } = useContext(UserContext); // Obtiene el usuario del registro
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.username) {
      setTempName(user.username);
    }
  }, [user?.username]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  const handlePasswordRecovery = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // Simulación de envío de correo (vía Supabase Auth)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage(`Se ha enviado un correo de recuperación a ${user?.username}`);
    } catch (err) {
      setError("Error al enviar el correo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName.trim().length < 3) {
      setError("Nombre inválido");
      return;
    }
    setIsLoading(true);
    try {
      // Aquí iría el .update() de Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage("Nombre actualizado correctamente");
      setIsEditing(false);
    } catch (err) {
      setError("Error al actualizar");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div className="profile-container"><div className="profile-main">Inicia sesión para ver tu perfil</div></div>;

  return (
    <div className="profile-container">
      <main className="profile-main">
        <div className="title-group">
          <h2>Mi Perfil</h2>
          <p>Gestiona tu información personal y preferencias de cuenta</p>
        </div>

        {successMessage && <div className="message-box success-message">{successMessage}</div>}
        {error && <div className="message-box error-message">{error}</div>}

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
                      disabled={isLoading}
                      autoFocus
                      placeholder="Introduce tu nombre"
                      style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '0.5rem' }}
                    />
                    <button 
                      className="save-small-btn" 
                      onClick={handleSaveName}
                      disabled={isLoading}
                      style={{ backgroundColor: 'var(--primary-green)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}
                    >
                      {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                    <button 
                      className="cancel-small-btn" 
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      style={{ backgroundColor: '#4b5563', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}
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
                {tempName || "Usuario"} es miembro desde el {user.registeredAt}
              </div>
            </div>

            <div className="action-row" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
    </div>
  );
};

export default Profile;