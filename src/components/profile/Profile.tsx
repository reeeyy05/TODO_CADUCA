import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import "../../styles/profile.css";

const Profile: React.FC = () => {
  const { perfil, updateNombre, sendPasswordRecovery, logout, uploadAvatar } = useAuthStore();
  const { t } = useTranslation();
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
      setSuccessMessage(t("Profile.recovery_success", { email: perfil?.email }));
    }
  };

  const handleSaveName = async () => {
    if (!tempName.trim() || tempName.trim().length < 3) {
      setError(t("register.errors.invalid_name"));
      return;
    }
    setIsLoading(true);
    const result = await updateNombre(tempName.trim());
    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccessMessage(t("Profile.name_updated", "Nombre actualizado correctamente"));
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
      setError(t('Profile.avatar_only_image', 'Solo se permiten archivos de imagen'));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError(t('Profile.avatar_max_size', 'La imagen no puede superar los 2MB'));
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
      setSuccessMessage(t('Profile.avatar_updated', 'Avatar actualizado correctamente'));
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

  const nombre = perfil?.nombre_completo || t("Profile.default_name", "Usuario");

  if (!perfil) {
    return (
      <div className="profile-container">
        <div className="profile-main">{t("Profile.login_to_see", "Inicia sesión para ver tu perfil")}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <main className="profile-main">
        <div className="info-header" style={{ marginBottom: '2rem' }}>
          <h2>{t("Profile.title", "Mi Perfil")}</h2>
          <p>{t("Profile.subtitle", "Gestiona tu información personal y preferencias de cuenta")}</p>
        </div>

        {successMessage && <div className="message success">{successMessage}</div>}
        {error && <div className="message error">{error}</div>}

        <section className="profile-card">
          <div className="avatar-section">
            <div
              className="avatar-circle"
              onClick={handleAvatarClick}
              title={t("Profile.avatar_change_title", "Haz clic para cambiar tu avatar")}
            >
              {(avatarPreview || perfil?.avatar_url) ? (
                <img
                  src={avatarPreview || perfil!.avatar_url!}
                  alt={t("Profile.avatar_alt", "Avatar")}
                  className="avatar-img"
                />
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '50%', color: 'var(--profile-muted)' }}>
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              )}
              <div className="avatar-overlay">{t("Profile.avatar_change", "Cambiar")}</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="avatar-file-input"
              aria-label={t("Profile.avatar_upload_aria", "Subir avatar")}
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
                <label>{t("register.form.full_name", "Nombre")}</label>
                {isEditing ? (
                  <div className="edit-form" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      disabled={isLoading}
                      autoFocus
                      placeholder={t("register.form.full_name_placeholder", "Introduce tu nombre")}
                      style={{ flex: '1', minWidth: '150px' }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveName}
                      disabled={isLoading}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      {isLoading ? t("Profile.saving", "Guardando...") : t("actions.save", "Guardar")}
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => { setIsEditing(false); setTempName(nombre); }}
                      disabled={isLoading}
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      {t("actions.cancel", "Cancelar")}
                    </button>
                  </div>
                ) : (
                  <div className="data-box">{nombre}</div>
                )}
              </div>
            </div>

            <div className="input-field">
              <label>{t("Profile.membership_info_label", "Información de membresía")}</label>
              <div className="data-box">
                {t("Profile.membership_info", "{{name}} es miembro desde el {{date}}", { name: nombre, date: fechaRegistro })}
              </div>
            </div>

            {/* Aquí estaba el error de style={{ color: 'white' }} - ¡Arreglado! */}
            <div className="actions-group">
              {!isEditing && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(true)}
                  disabled={isLoading}
                >
                  {t("Profile.edit_name", "Editar Nombre")}
                </button>
              )}
              <button
                className="btn btn-secondary"
                onClick={handlePasswordRecovery}
                disabled={isLoading}
              >
                {isLoading ? t("Profile.sending", "Enviando...") : t("Profile.recover_password", "Recuperar Contraseña")}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="btn"
                style={{ backgroundColor: '#b91c1c', color: 'white', border: 'none' }}
              >
                {t("Profile.logout", "Cerrar Sesión")}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;