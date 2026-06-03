import { Link } from 'react-router-dom'
import '../styles/footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <button onClick={() => window.open('https://www.instagram.com/dondeloencuentro_tuc')}>
          Instagram
        </button>
        <Link to="/contacto"><button>Contacto</button></Link>
        <Link to="/nosotros"><button>Sobre Nosotros</button></Link>
        <button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLScQi7uQRVktxRlYtXYFfk8PAbUVUoTPVC_R9rKiSJU2g-0p_A/viewform')}>
          Contanos tu Opinión
        </button>
      </div>
      <p className="footer-copy">Todos los derechos reservados ©</p>
    </footer>
  )
}

export default Footer