import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase'
import '../../styles/admin/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [recuperando, setRecuperando] = useState(false)
  const [mensajeRecupero, setMensajeRecupero] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setCargando(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email o contraseña incorrectos')
    } else {
      navigate('/admin/dashboard')
    }
    setCargando(false)
  }

  const handleRecuperar = async () => {
    if (!email) {
      setError('Ingresá tu email primero')
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://dondeloencuentro.com.ar/admin/nueva-password'
    })
    if (error) {
      setError('Error al enviar el email')
    } else {
      setMensajeRecupero('Te enviamos un email para restablecer tu contraseña')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src="/logo-dondeloencuentro.png" alt="Donde Lo Encuentro" className="login-logo" />
        <h1>Panel Admin</h1>

        {error && <p className="login-error">{error}</p>}
        {mensajeRecupero && <p className="login-ok">{mensajeRecupero}</p>}

        <form onSubmit={handleLogin}>
          <div className="login-campo">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
            />
          </div>
          <div className="login-campo">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'INGRESAR'}
          </button>
        </form>

        <button className="login-recuperar" onClick={handleRecuperar}>
          Olvidé mi contraseña
        </button>
      </div>
    </div>
  )
}

export default Login