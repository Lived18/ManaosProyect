import '../styles/nosotros.css'

function Nosotros() {
  return (
    <main>

      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Quiénes somos</span>
          <h1>Somos fanáticos<br />de encontrar<br />lugares.</h1>
          <div className="divider">
            <span className="divider-line"></span>
            <svg className="divider-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span className="divider-line"></span>
          </div>
          <p className="body-text">Dónde lo encuentro nace de algo simple: queríamos dejar de perder el tiempo buscando.</p>
          <p className="body-text">Queremos que, cuando necesites algo, vayas siempre al mismo lugar.</p>
          <p className="body-text">Sin vueltas: la lista, las direcciones y el botón directo para ir a donde necesitás.</p>
          <p className="highlight-text">Todo en un solo lugar.</p>
        </div>
      </section>

      <section className="para-que">
        <h2>¿Para qué es esta página?</h2>
        <div className="accent-line"></div>
        <div className="grid">
          <div className="grid-item">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
            <h3>Encontrá</h3>
            <p>Eso que necesitás. Por ejemplo, hamburgueserías.</p>
          </div>
          <div className="grid-divider-v"></div>
          <div className="grid-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <h3>Descubrí</h3>
            <p>Promos, combos y novedades actualizadas para que aproveches siempre.</p>
          </div>
          <div className="grid-divider-h"></div>
          <div className="grid-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <circle cx="9" cy="11" r="0.8" fill="currentColor"/>
              <circle cx="12" cy="11" r="0.8" fill="currentColor"/>
              <circle cx="15" cy="11" r="0.8" fill="currentColor"/>
            </svg>
            <h3>Compartí</h3>
            <p>Recomendá tus lugares favoritos y ayudanos a hacer crecer la comunidad.</p>
          </div>
          <div className="grid-divider-v"></div>
          <div className="grid-item">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3>Apoyá local</h3>
            <p>Damos visibilidad a las hamburgueserías locales y a su trabajo.</p>
          </div>
        </div>
      </section>

      <section className="por-que">
        <div className="por-que-card">
          <div className="burger-wrap">
            <svg className="burger-svg" viewBox="0 0 120 100" fill="none">
              <path d="M20 42 Q60 10 100 42" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <line x1="20" y1="42" x2="100" y2="42" stroke="white" strokeWidth="2.5"/>
              <ellipse cx="50" cy="28" rx="4" ry="2" stroke="white" strokeWidth="1.5" transform="rotate(-20 50 28)"/>
              <ellipse cx="70" cy="22" rx="4" ry="2" stroke="white" strokeWidth="1.5" transform="rotate(15 70 22)"/>
              <ellipse cx="35" cy="35" rx="3" ry="1.5" stroke="white" strokeWidth="1.5" transform="rotate(-10 35 35)"/>
              <path d="M18 50 Q30 44 42 50 Q54 56 66 50 Q78 44 102 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <rect x="18" y="54" width="84" height="10" rx="5" stroke="white" strokeWidth="2"/>
              <path d="M15 68 L105 68 L108 74 L12 74 Z" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M20 78 Q60 72 100 78" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <line x1="20" y1="78" x2="100" y2="78" stroke="white" strokeWidth="2"/>
              <path d="M20 82 L100 82 Q105 82 105 87 Q105 94 60 94 Q15 94 15 87 Q15 82 20 82 Z" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="por-que-text">
            <h2>¿Por qué lo hicimos?</h2>
            <div className="accent-line"></div>
            <p>Empezamos por hamburgueserías porque amamos las hamburguesas y creemos que en Tucumán hay un montón de lugares increíbles que merecen ser descubiertos.</p>
            <p>Queremos conectar a las personas con esos lugares, apoyar a los emprendedores locales y crear la guía más completa y confiable de las hamburguesas de nuestra ciudad.</p>
            <p className="highlight-text">Este proyecto recién empieza y lo construimos juntos, como comunidad.</p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Nosotros