{/* Por ahora he puesto datos fijos, más adelante se tendrá que cambiar */}
const Profile: React.FC = () => {
  const nombreUsuario: string = "Juan";
  const apellidosUsuario: string = "Pérez García";
  const correo: string = "juan.perez@ejemplo.com";

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

        <section className="profile-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              <svg fill="currentColor" viewBox="0 0 20 20">
                {/* SVG vacío*/}
              </svg>
            </div>
            <button className="edit-photo-btn" onClick={() => alert('Próximamente...')}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               </svg>
            </button>
          </div>

          <div className="info-section">
            <div className="input-grid">
              <div className="input-field">
                <label>Nombre</label>
                {/* Aquí usamos las variables de arriba */}
                <div className="data-box">{nombreUsuario}</div>
              </div>
              <div className="input-field">
                <label>Apellidos</label>
                <div className="data-box">{apellidosUsuario}</div>
              </div>
            </div>
            <div className="input-field">
              <label>Correo Electrónico</label>
              <div className="data-box">{correo}</div>
            </div>
            <div className="action-row">
          
              <button className="save-btn" onClick={() => console.log("Editando...")}>
                Editar Información
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