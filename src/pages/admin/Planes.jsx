import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import '../../styles/admin/dashboard.css'

function Planes() {
  const [planes, setPlanes] = useState([])
  const [guardando, setGuardando] = useState(null)
  const [mensajes, setMensajes] = useState({})
  const navigate = useNavigate()

  useEffect(() => { cargarPlanes() }, [])

  const cargarPlanes = async () => {
    const { data } = await supabase.from('planes').select('*').order('precio')
    setPlanes(data || [])
  }

  const handleCambio = (id, campo, valor) => {
    setPlanes(prev => prev.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  }

  const handleGuardar = async (plan) => {
    setGuardando(plan.id)
    const { error } = await supabase.from('planes').update({
      nombre: plan.nombre,
      precio: Number(plan.precio),
      descripcion: plan.descripcion,
      beneficios: plan.beneficios
    }).eq('id', plan.id)

    setMensajes(prev => ({ ...prev, [plan.id]: error ? 'Error al guardar' : '¡Guardado!' }))
    setTimeout(() => setMensajes(prev => ({ ...prev, [plan.id]: '' })), 2500)
    setGuardando(null)
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
          <button className="admin-nav-btn" onClick={() => navigate('/admin/solicitudes')}>Solicitudes</button>
          <button className="admin-nav-btn active" onClick={() => navigate('/admin/planes')}>Planes y Precios</button>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>

      <main className="admin-main">
        <h1 className="admin-titulo">Planes y Precios</h1>
        <p style={{color:'#888', marginBottom:'24px'}}>Editá los planes directamente. Los cambios se reflejan en la página pública.</p>
        <div className="admin-planes-editor">
          {planes.map(plan => (
            <div key={plan.id} className="admin-plan-editor">
              <div className="admin-campo">
                <label>Nombre del plan</label>
                <input value={plan.nombre} onChange={e => handleCambio(plan.id, 'nombre', e.target.value)} />
              </div>
              <div className="admin-campo">
                <label>Precio (ARS)</label>
                <input type="number" value={plan.precio} onChange={e => handleCambio(plan.id, 'precio', e.target.value)} />
              </div>
              <div className="admin-campo">
                <label>Descripción corta</label>
                <input value={plan.descripcion || ''} onChange={e => handleCambio(plan.id, 'descripcion', e.target.value)} />
              </div>
              <div className="admin-campo">
                <label>Beneficios</label>
                <textarea value={plan.beneficios || ''} onChange={e => handleCambio(plan.id, 'beneficios', e.target.value)} rows={3} />
              </div>
              <div className="admin-plan-footer">
                {mensajes[plan.id] && <span className="admin-ok">{mensajes[plan.id]}</span>}
                <button className="btn-guardar" onClick={() => handleGuardar(plan)} disabled={guardando === plan.id}>
                  {guardando === plan.id ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Planes