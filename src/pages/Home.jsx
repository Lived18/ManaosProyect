import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import BurgerCard from '../components/BurgerCard'
import '../styles/home.css'

function Home() {
  const [burgers, setBurgers] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarBurgers() {
      const { data, error } = await supabase
        .from('hamburguserias')
        .select('*')
        .eq('activo', true)

      if (error) {
        console.error('Error cargando hamburguserías:', error)
      } else {
        setBurgers(data)
      }

      setCargando(false)
    }

    cargarBurgers()
  }, [])

  if (cargando) {
    return (
      <main className="home-lista">
        <p style={{ color: '#fff', textAlign: 'center' }}>Cargando...</p>
      </main>
    )
  }

  return (
    <main className="home-lista">
      {burgers.map(burger => (
        <BurgerCard
          key={burger.id}
          nombre={burger.nombre}
          imagen={burger.imagen_url}
          whatsapp={burger.whatsapp}
        />
      ))}
    </main>
  )
}

export default Home