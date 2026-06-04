import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import '../styles/hamburgueserias.css'


const ZONAS = ['Barrio Norte', 'Barrio Sur', 'Yerba Buena', 'Zona Oeste', 'Tafi Viejo', 'Lomas de Tafi']

function IconIG() {
  return <img src="/icons/icono_ig.png" alt="Instagram" style={{width:'80px', height:'80px'}} />
}

function IconWA() {
  return <img src="/icons/icono_whats.png" alt="WhatsApp" style={{width:'80px', height:'80px'}} />
}

function Hamburgueserias() {
  var navigate = useNavigate()
  var intervaloRef = useRef(null)
  var filtroRef = useRef(null)
  var [burgers, setBurgers] = useState([])
  var [carrusel, setCarrusel] = useState([])
  var [busqueda, setBusqueda] = useState('')
  var [filtroZonas, setFiltroZonas] = useState([])
  var [filtroTipo, setFiltroTipo] = useState([])
  var [filtroAbierto, setFiltroAbierto] = useState(false)
  var [indice, setIndice] = useState(0)

  useEffect(function() { cargarDatos() }, [])

  useEffect(function() {
    iniciarCarrusel()
    return function() { clearInterval(intervaloRef.current) }
  }, [carrusel])

  useEffect(function() {
    function handleClick(e) {
      if (filtroRef.current && !filtroRef.current.contains(e.target)) {
        setFiltroAbierto(false)
      }
    }
    document.addEventListener('click', handleClick)
    return function() { document.removeEventListener('click', handleClick) }
  }, [])

  async function cargarDatos() {
    var result = await supabase
      .from('hamburguserias')
      .select('*, planes(id, nombre)')
      .eq('activo', true)
      .order('nombre')
    var data = result.data || []
    setBurgers(data)
    setCarrusel(data.filter(function(b) {
      return b.imagen_url && b.planes && b.planes.id >= 2
    }))
  }

  function iniciarCarrusel() {
    clearInterval(intervaloRef.current)
    if (carrusel.length <= 1) return
    intervaloRef.current = setInterval(function() {
      setIndice(function(prev) { return (prev + 1) % carrusel.length })
    }, 5000)
  }

  function moverCarrusel(dir) {
    clearInterval(intervaloRef.current)
    setIndice(function(prev) {
      var nuevo = prev + dir
      if (nuevo < 0) return carrusel.length - 1
      if (nuevo >= carrusel.length) return 0
      return nuevo
    })
    setTimeout(function() { iniciarCarrusel() }, 3000)
  }

  function toggleFiltroZona(zona) {
    setFiltroZonas(function(prev) {
      if (prev.indexOf(zona) !== -1) return prev.filter(function(z) { return z !== zona })
      return prev.concat([zona])
    })
  }

  function toggleFiltroTipo(tipo) {
    setFiltroTipo(function(prev) {
      if (prev.indexOf(tipo) !== -1) return prev.filter(function(t) { return t !== tipo })
      return prev.concat([tipo])
    })
  }

  function limpiarFiltros() {
    setFiltroZonas([])
    setFiltroTipo([])
  }

  var totalFiltros = filtroZonas.length + filtroTipo.length

  var burgersFiltrados = burgers.filter(function(b) {
    var okBusqueda = b.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
    var okZona = filtroZonas.length === 0 || filtroZonas.indexOf(b.zona) !== -1
    var okTipo = filtroTipo.length === 0 || filtroTipo.indexOf(b.tipo_consumo) !== -1
    return okBusqueda && okZona && okTipo
  })

  return (
    <main className="hamb-main">

      <div className="hamb-banner">
        <img src="public/banner_hamburguesa.png" alt="Hamburguesas" />
      </div>

      {carrusel.length > 0 &&
        <div className="carrusel-container">
          <div className="carrusel-wrapper" style={{transform: 'translateX(-' + (indice * 100) + '%)'}}>
            {carrusel.map(function(b, i) {
              var enlace = b.enlace_carrusel ? b.enlace_carrusel : '/'
              return (
                <a key={i} className="carrusel-link" href={enlace} target="_blank" rel="noopener noreferrer">
                  <img className="carrusel-imagen" src={b.imagen_url} alt={b.nombre} />
                </a>
              )
            })}
          </div>
          {carrusel.length > 1 &&
            <div>
              <button className="carrusel-btn carrusel-prev" onClick={function() { moverCarrusel(-1) }}>
                {'<'}
              </button>
              <button className="carrusel-btn carrusel-next" onClick={function() { moverCarrusel(1) }}>
                {'>'}
              </button>
            </div>
          }
        </div>
      }

      <div className="hamb-contenido">

        <button className="btn-promos" onClick={function() { navigate('/promos') }}>
          VER PROMOS
        </button>

        <form className="buscador-form" onSubmit={function(e) { e.preventDefault() }}>
          <input
            type="text"
            placeholder="Buscar hamburgueserias..."
            value={busqueda}
            onChange={function(e) { setBusqueda(e.target.value) }}
          />
          <button type="submit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        <div className="filtro-category-header">
          <div className="categoria-header">
            <h2>DE AUTOR</h2>
          </div>
          <div className="filtro-wrapper" ref={filtroRef}>
            <button
              className={'filtro-btn' + (filtroAbierto || totalFiltros > 0 ? ' filtro-btn--active' : '')}
              onClick={function() { setFiltroAbierto(!filtroAbierto) }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
                <line x1="11" y1="18" x2="13" y2="18"></line>
              </svg>
              Filtrar
              {totalFiltros > 0 && <span className="filtro-badge">{totalFiltros}</span>}
            </button>

            {filtroAbierto &&
              <div className="filtro-dropdown filtro-dropdown--open">
                <p className="filtro-section-label">Zona</p>
                {ZONAS.map(function(zona) {
                  var seleccionada = filtroZonas.indexOf(zona) !== -1
                  return (
                    <div
                      key={zona}
                      className={'filtro-option' + (seleccionada ? ' filtro-option--selected' : '')}
                      onClick={function() { toggleFiltroZona(zona) }}
                    >
                      <span className="filtro-check">
                        <svg className="filtro-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      📍 {zona}
                    </div>
                  )
                })}
                <hr className="filtro-divider" />
                <p className="filtro-section-label">Tipo de consumo</p>
                <div
                  className={'filtro-option' + (filtroTipo.indexOf('local') !== -1 ? ' filtro-option--selected' : '')}
                  onClick={function() { toggleFiltroTipo('local') }}
                >
                  <span className="filtro-check">
                    <svg className="filtro-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  🏠 Consumo en local
                </div>
                <div
                  className={'filtro-option' + (filtroTipo.indexOf('delivery') !== -1 ? ' filtro-option--selected' : '')}
                  onClick={function() { toggleFiltroTipo('delivery') }}
                >
                  <span className="filtro-check">
                    <svg className="filtro-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  🛵 Solo Retiro / Delivery
                </div>
                {totalFiltros > 0 &&
                  <button className="filtro-clear" onClick={limpiarFiltros}>
                    Limpiar filtros
                  </button>
                }
              </div>
            }
          </div>
        </div>

        {totalFiltros > 0 &&
          <div className="filtro-pills">
            {filtroZonas.map(function(z) {
              return (
                <button key={z} className="filtro-pill" onClick={function() { toggleFiltroZona(z) }}>
                  {z} x
                </button>
              )
            })}
            {filtroTipo.map(function(t) {
              return (
                <button key={t} className="filtro-pill" onClick={function() { toggleFiltroTipo(t) }}>
                  {t === 'local' ? 'En local' : 'Delivery'} x
                </button>
              )
            })}
          </div>
        }

        <div className="locales-grid">
          {burgersFiltrados.length === 0 &&
            <p className="sin-resultados">Sin resultados con estos filtros</p>
          }
          {burgersFiltrados.map(function(b) {
            return (
              <div key={b.id} className="local">
                <div>
                  <h2>{b.nombre}</h2>
                  {b.direccion && <p>{b.direccion} / {b.zona}</p>}
                  <p>{b.tipo_consumo === 'delivery' ? 'Solo Retiro / Delivery' : 'Consumo en el local'}</p>
                </div>
                <div className="redes">
                  {b.instagram &&
                    <button onClick={function() { window.open(b.instagram, '_blank') }} title="Instagram">
                      <IconIG />
                    </button>
                  }
                  {b.whatsapp &&
                    <button onClick={function() { window.open('https://wa.me/' + b.whatsapp, '_blank') }} title="WhatsApp">
                      <IconWA />
                    </button>
                  }
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}

export default Hamburgueserias