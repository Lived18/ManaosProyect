import BurgerCard from '../components/BurgerCard'
import '../styles/home.css'

const burgers = [
  {
    id: 1,
    nombre: 'Burger House',
    imagen: '/imagenes/promociones 1.png',
    whatsapp: '5493816277158'
  },
  {
    id: 2,
    nombre: 'La Burger',
    imagen: '/imagenes/promociones 2.jpeg',
    whatsapp: '5493813359728'
  },
  {
    id: 3,
    nombre: 'Burger Bros',
    imagen: '/imagenes/promociones 3.jpeg',
    whatsapp: '5493813671917'
  },
]

function Home() {
  return (
    <main className="home-lista">
      {burgers.map(burger => (
        <BurgerCard
          key={burger.id}
          nombre={burger.nombre}
          imagen={burger.imagen}
          whatsapp={burger.whatsapp}
        />
      ))}
    </main>
  )
}

export default Home