import '../styles/contacto.css'

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="22,4 12,13 2,4"/>
  </svg>
)

function Contacto() {
  return (
    <main className="contacto">
      <h1 className="contacto-titulo">CONTACTO</h1>
      <div className="contacto-separador">
        <span>🍔</span>
      </div>
      <p className="contacto-intro">
        ¿Querés sumar tu hamburguesería, compartir una promo o trabajar con nosotros?
      </p>
      <p className="contacto-intro">
        Escribinos. Siempre estamos buscando nuevos lugares, descuentos y experiencias<br />
        para sumar a <strong className="contacto-highlight">la comunidad.</strong>
      </p>
      <p className="contacto-sub">Estos son nuestros medios de contacto:</p>

      <div className="contacto-cards">
        <a href="https://www.instagram.com/dondeloencuentro_tuc" target="_blank" rel="noopener noreferrer" className="contacto-card">
          <div className="contacto-card-icono">
            <IconInstagram />
          </div>
          <div className="contacto-card-info">
            <span className="contacto-card-label">INSTAGRAM</span>
            <span className="contacto-card-valor">@dondeloencuentro_tuc</span>
            <span className="contacto-card-desc">Hacé clic para ir a nuestro perfil ↗</span>
          </div>
        </a>

        <a href="mailto:dondeloencuentro.contacto@gmail.com" className="contacto-card">
          <div className="contacto-card-icono">
            <IconMail />
          </div>
          <div className="contacto-card-info">
            <span className="contacto-card-label">GMAIL</span>
            <span className="contacto-card-valor">dondeloencuentro.contacto@gmail.com</span>
            <span className="contacto-card-desc">Escribinos por cualquier consulta ↗</span>
          </div>
        </a>
      </div>
    </main>
  )
}

export default Contacto