import '../styles/burgercard.css'

function BurgerCard({ nombre, imagen, whatsapp }) {
  const handlePedir = () => {
    const mensaje = encodeURIComponent('Hola! Vengo de Donde Lo Encuentro, quiero hacer un pedido:')
    window.open(`https://wa.me/${whatsapp}?text=${mensaje}`, '_blank')
  }

  return (
    <div className="burger-card">
      <img src={imagen} alt={nombre} />
      <div className="burger-info">
        <h2>{nombre}</h2>
      </div>
      <div className="burger-action">
        <button onClick={handlePedir}>PEDIR AQUÍ</button>
      </div>
    </div>
  )
}

export default BurgerCard