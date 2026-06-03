import { useNavigate } from 'react-router-dom'
import '../styles/home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <main className="home-hero">
      <div className="hero-contenido">
        <button className="hero-img-btn" onClick={() => navigate('/hamburgueserias')}>
          <img src="/icons/iconohambur.png" alt="Ver Hamburgueserías" />
        </button>
        <p className="hero-texto">VER HAMBURGUESERÍAS</p>
        <div className="hero-redes">
          <button className="btn-red" onClick={() => window.open('https://www.instagram.com/dondeloencuentro_tuc')}>
            <img src="/icons/instagram.png" alt="Instagram" />
          </button>
          <button className="btn-red" onClick={() => window.open('https://www.tiktok.com/@dondeloencuentro')}>
            <img src="/icons/tiktok.png" alt="TikTok" />
          </button>
        </div>
      </div>
    </main>
  )
}

export default Home