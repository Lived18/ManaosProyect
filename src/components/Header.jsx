import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/header.css'

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const cerrar = () => setMenuAbierto(false)
  const esRuta = (ruta) => location.pathname === ruta

  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <button onClick={() => { navigate('/'); cerrar() }}>
            <img src="/logo-dondeloencuentro.png" alt="Donde Lo Encuentro" />
          </button>
        </div>
        <div className="header-right">
          <button
            className={`menu-btn ${menuAbierto ? 'open' : ''}`}
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="menu-overlay" onClick={cerrar}>
          <nav className="menu-dropdown" onClick={e => e.stopPropagation()}>
            <span className="menu-label">Categorías</span>
            {!esRuta('/') && <Link to="/" onClick={cerrar}>Inicio</Link>}
            {!esRuta('/hamburgueserias') && <Link to="/hamburgueserias" onClick={cerrar}>Hamburgueserías</Link>}
            {!esRuta('/promos') && <Link to="/promos" onClick={cerrar}>Promos</Link>}
            <span className="menu-label">Info</span>
            {!esRuta('/nosotros') && <Link to="/nosotros" onClick={cerrar}>Sobre Nosotros</Link>}
            {!esRuta('/contacto') && <Link to="/contacto" onClick={cerrar}>Contacto</Link>}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScQi7uQRVktxRlYtXYFfk8PAbUVUoTPVC_R9rKiSJU2g-0p_A/viewform" target="_blank" rel="noopener noreferrer" onClick={cerrar}>Contanos tu Opinión</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdVfvzEZTrDfLBePvFMaaIzUtBsdshWhvagwYHzDNZ9cpwaIw/viewform" target="_blank" rel="noopener noreferrer" onClick={cerrar}>Reportar Problema</a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header