import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaAdmin({ children }) {
  const { usuario, cargando } = useAuth()

  if (cargando) return (
    <div style={{ color: '#fff', textAlign: 'center', padding: '4rem' }}>
      Cargando...
    </div>
  )

  if (!usuario) return <Navigate to="/admin/login" replace />

  return children
}

export default RutaAdmin