import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import "@/styles/profile.css";

const Profile: React.FC = () => {
  const { perfil, updateNombre, sendPasswordRecovery, logout } = useAuthStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            <div className="avatar-circle">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
          </div>

          <div className="info-section">
            <div className="input-grid">
              <div className="input-field">
                <label>Nombre</label>
                {isEditing ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      disabled={isLoading}
                      autoFocus
                      placeholder="Introduce tu nombre"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="save-btn"
                        onClick={handleSaveName}
                        disabled={isLoading}
                      >
                        {isLoading ? "Guardando..." : "Guardar"}
                      </button>
                      <button
                        className="save-btn cancel-btn"
                        onClick={() => { setIsEditing(false); setTempName(nombre); }}
                        disabled={isLoading}
                      >
                        Cancelar
                      </button>
                    </div>
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

            <div className="flex gap-4 mt-4 flex-wrap">
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
                className="bg-red-700 py-2 px-4 rounded-lg text-white font-medium hover:bg-red-800 transition"
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