import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";

const Profile: React.FC = () => {
  const { perfil, updateNombre, sendPasswordRecovery, logout, uploadAvatar } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (perfil?.nombre_completo) {
      setTempName(perfil.nombre_completo);
    }
  }, [perfil?.nombre_completo]);

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
    const result = await sendPasswordRecovery();
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMessage(`Se ha enviado un correo de recuperación a ${perfil?.email}`);
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return;
    }
    setIsLoading(true);
    const result = await updateNombre(tempName.trim());
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMessage("Nombre actualizado correctamente");
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo y tamaño (max 2MB)
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen no puede superar los 2MB');
      return;
    }

    // Preview local inmediato
    setAvatarPreview(URL.createObjectURL(file));

    setIsLoading(true);
    const result = await uploadAvatar(file);
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
      setAvatarPreview(null);
    } else {
      setSuccessMessage('Avatar actualizado correctamente');
    }
  };

  // Formateamos la fecha de registro
  const fechaRegistro = perfil?.fecha_registro
    ? new Date(perfil.fecha_registro).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  const nombre = perfil?.nombre_completo || "Usuario";

  if (!perfil) {
    return (
      <div className="profile-container">
        <div className="profile-main">Inicia sesión para ver tu perfil</div>
      </div>
    );
  }

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
            <div 
              className="avatar-circle" 
              onClick={handleAvatarClick} 
              title="Haz clic para cambiar tu avatar"
            >
              {(avatarPreview || perfil?.avatar_url) ? (
                <img 
                  src={avatarPreview || perfil!.avatar_url!} 
                  alt="Avatar" 
                  className="avatar-img" 
                />
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              )}
              <div className="avatar-overlay">Cambiar</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-file-input"
              aria-label="Subir avatar"
            />
            {perfil?.rol && (
              <span className={`role-badge role-badge--${perfil.rol}`}>
                {perfil.rol}
              </span>
            )}
          </div>

          <div className="info-section">
            <div className="input-grid">
              <div className="input-field">
                <label>Nombre</label>
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
                      onClick={() => { setIsEditing(false); setTempName(nombre); }}
                      disabled={isLoading}
                      style={{ backgroundColor: '#4b5563', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginTop: '0.5rem', cursor: 'pointer' }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="data-box">{nombre}</div>
                )}
              </div>
            </div>

            <div className="input-field">
              <label>Información de membresía</label>
              <div className="data-box">
                {nombre} es miembro desde el {fechaRegistro}
              </div>
            </div>

            <div className="action-row" style={{ color: 'white', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
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
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-700 py-2 rounded-lg text-white font-medium hover:bg-red-800 transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;