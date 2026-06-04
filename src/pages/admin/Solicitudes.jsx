import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import '../../styles/admin/dashboard.css'

function Solicitudes() {
  const [pendientes, setPendientes] = useState([])
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { cargarDatos() }, [])

  const cargarDatos = async () => {
    const { data: todas } = await supabase
      .from('solicitudes')
      .select('*, planes(nombre, precio)')
      .order('created_at', { ascending: false })

    setPendientes(todas?.filter(s => s.estado === 'pendiente') || [])
    setHistorial(todas?.filter(s => s.estado !== 'pendiente') || [])
    setCargando(false)
  }

  const handleAccion = async (solicitud, accion) => {
    await supabase.from('solicitudes').update({ estado: accion }).eq('id', solicitud.id)

    if (accion === 'aprobado') {
      await supabase.from('hamburguserias').insert({
        nombre: solicitud.nombre,
        whatsapp: solicitud.whatsapp,
        zona: solicitud.zona,
        instagram: solicitud.instagram,
        imagen_url: solicitud.imagen_carrusel || '',
        plan_id: solicitud.plan_id,
        activo: true
      })
    }

    await supabase.from('notificaciones').insert({
      tipo: accion,
      mensaje: `${solicitud.nombre} fue ${accion === 'aprobado' ? 'aprobada ✓' : 'rechazada ✗'}`,
      solicitud_id: solicitud.id
    })

    cargarDatos()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <img src="/logo-dondeloencuentro.png" alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <button className="admin-nav-btn" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button className="admin-nav-btn active" onClick={() => navigate('/admin/solicitudes')}>
            Solicitudes
            {pendientes.length > 0 && <span className="admin-badge">{pendientes.length}</span>}
          </button>
          <button className="admin-nav-btn" onClick={() => navigate('/admin/planes')}>Planes y Precios</button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="admin-main">
        <h1 className="admin-titulo">Solicitudes</h1>

        {/* PENDIENTES */}
        <h2 className="admin-subtitulo">
          Pendientes {pendientes.length > 0 && <span className="admin-badge">{pendientes.length}</span>}
        </h2>

        {cargando ? <p style={{color:'#888'}}>Cargando...</p> : (
          <div className="admin-solicitudes">
            {pendientes.length === 0 && (
              <p style={{color:'#888', padding:'16px 0'}}>No hay solicitudes pendientes.</p>
            )}
            {pendientes.map(s => (
              <div key={s.id} className="admin-solicitud-card estado-pendiente">
                <div className="admin-sol-info">
                  <span className="admin-sol-nombre">{s.nombre}</span>
                  <span className="admin-sol-detalle">{s.zona} · Plan {s.planes?.nombre} · ${s.planes?.precio?.toLocaleString('es-AR')}</span>
                  <span className="admin-sol-detalle">WhatsApp: {s.whatsapp}</span>
                  {s.instagram && <span className="admin-sol-detalle">Instagram: {s.instagram}</span>}
                  <span className="admin-sol-fecha">{new Date(s.created_at).toLocaleDateString('es-AR')}</span>
                </div>

                {(s.imagen_carrusel || s.imagen_promo_1 || s.imagen_promo_2) && (
                  <div className="admin-sol-archivos">
                    {s.imagen_carrusel && (
                      <a href={s.imagen_carrusel} target="_blank" rel="noopener noreferrer" className="admin-sol-archivo">
                        Ver imagen carrusel ↗
                      </a>
                    )}
                    {s.imagen_promo_1 && (
                      <a href={s.imagen_promo_1} target="_blank" rel="noopener noreferrer" className="admin-sol-archivo">
                        Ver promo 1 ↗
                      </a>
                    )}
                    {s.imagen_promo_2 && (
                      <a href={s.imagen_promo_2} target="_blank" rel="noopener noreferrer" className="admin-sol-archivo">
                        Ver promo 2 ↗
                      </a>
                    )}
                  </div>
                )}

                <div className="admin-sol-acciones">
                  <button className="btn-aprobar" onClick={() => handleAccion(s, 'aprobado')}>✓ Aprobar</button>
                  <button className="btn-rechazar" onClick={() => handleAccion(s, 'rechazado')}>✗ Rechazar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HISTORIAL */}
        <h2 className="admin-subtitulo" style={{marginTop: '48px'}}>Historial</h2>
        <div className="admin-solicitudes">
          {historial.length === 0 && (
            <p style={{color:'#888', padding:'16px 0'}}>Sin historial todavía.</p>
          )}
          {historial.map(s => (
            <div key={s.id} className={`admin-solicitud-card estado-${s.estado}`}>
              <div className="admin-sol-info">
                <span className="admin-sol-nombre">{s.nombre}</span>
                <span className="admin-sol-detalle">{s.zona} · Plan {s.planes?.nombre}</span>
                <span className="admin-sol-fecha">{new Date(s.created_at).toLocaleDateString('es-AR')}</span>
              </div>
              <span className={`admin-sol-estado ${s.estado}`}>
                {s.estado === 'aprobado' ? '✓ Aprobado' : '✗ Rechazado'}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Solicitudes