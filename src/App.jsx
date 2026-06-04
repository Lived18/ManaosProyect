import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import RutaAdmin from './components/RutaAdmin'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Solicitudes from './pages/admin/Solicitudes'
import Planes from './pages/admin/Planes'
import Hamburgueserias from './pages/Hamburgueserias'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<RutaAdmin><Dashboard /></RutaAdmin>} />
          <Route path="/admin/solicitudes" element={<RutaAdmin><Solicitudes /></RutaAdmin>} />
          <Route path="/admin/planes" element={<RutaAdmin><Planes /></RutaAdmin>} />
          <Route path="*" element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hamburgueserias" element={<Hamburgueserias />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
