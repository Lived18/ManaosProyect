import '../styles/header.css'

function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <button onClick={() => window.location.href = '/'}>
            <img src="/logo-dondeloencuentro.png" alt="Donde Lo Encuentro" />
          </button>
        </div>
        <div className="header-right">
          <button className="menu-btn" onClick={() => alert('menú próximamente')}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header