import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import '../../styles/admin/dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalActivas: 0,
    pendientes: 0,
    ganancias: 0,
    porPlan: []
  })
  const [notificaciones, setNotificaciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const [{ data: hamburguserias }, { data: solicitudes }, { data: planes }, { data: notifs }] = await Promise.all([
      supabase.from('hamburguserias').select('*').eq('activo', true),
      supabase.from('solicitudes').select('*, planes(nombre, precio)').eq('estado', 'pendiente'),
      supabase.from('planes').select('*'),
      supabase.from('notificaciones').select('*').eq('leida', false).order('created_at', { ascending: false }).limit(5)
    ])

    const { data: pagadas } = await supabase
      .from('solicitudes')
      .select('*, planes(precio)')
      .eq('estado', 'aprobado')

    const ganancias = pagadas?.reduce((acc, s) => acc + (s.planes?.precio || 0), 0) || 0

    const porPlan = planes?.map(plan => ({
      ...plan,
      cantidad: hamburguserias?.filter(h => h.plan_id === plan.id).length || 0
    }))

    setStats({
      totalActivas: hamburguserias?.length || 0,
      pendientes: solicitudes?.length || 0,
      ganancias,
      porPlan: porPlan || []
    })
    setNotificaciones(notifs || [])
    setCargando(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (cargando) return <div className="admin-cargando">Cargando...</div>

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <img src="/logo-dondeloencuentro.png" alt="Logo" className="admin-logo" />
        <nav className="admin-nav">
          <button className="admin-nav-btn active" onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button className="admin-nav-btn" onClick={() => navigate('/admin/solicitudes')}>Solicitudes {stats.pendientes > 0 && <span className="admin-badge">{stats.pendientes}</span>}</button>
          <button className="admin-nav-btn" onClick={() => navigate('/admin/planes')}>Planes y Precios</button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="admin-main">
        <h1 className="admin-titulo">Dashboard</h1>

        <div className="admin-cards">
          <div className="admin-card">
            <span className="admin-card-label">Hamburgueserías activas</span>
            <span className="admin-card-valor">{stats.totalActivas}</span>
          </div>
          <div className="admin-card">
            <span className="admin-card-label">Solicitudes pendientes</span>
            <span className="admin-card-valor">{stats.pendientes}</span>
          </div>
          <div className="admin-card">
            <span className="admin-card-label">Ganancias estimadas</span>
            <span className="admin-card-valor">${stats.ganancias.toLocaleString('es-AR')}</span>
          </div>
        </div>

        <h2 className="admin-subtitulo">Distribución por plan</h2>
        <div className="admin-planes-grid">
          {stats.porPlan.map(plan => (
            <div key={plan.id} className="admin-plan-card">
              <span className="admin-plan-nombre">{plan.nombre}</span>
              <span className="admin-plan-cantidad">{plan.cantidad}</span>
              <span className="admin-plan-label">locales</span>
              <span className="admin-plan-precio">${plan.precio.toLocaleString('es-AR')}</span>
            </div>
          ))}
        </div>

        {notificaciones.length > 0 && (
          <>
            <h2 className="admin-subtitulo">Últimas notificaciones</h2>
            <div className="admin-notifs">
              {notificaciones.map(n => (
                <div key={n.id} className="admin-notif">
                  <span className="admin-notif-msg">{n.mensaje}</span>
                  <span className="admin-notif-fecha">{new Date(n.created_at).toLocaleDateString('es-AR')}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard