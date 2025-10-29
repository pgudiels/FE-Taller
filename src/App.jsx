import { useEffect, useState } from 'react'
import { listCars, createCar, deleteCar } from './api/client'
import CarForm from './components/CarForm'
import CarList from './components/CarList'

export default function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setError('')
      const data = await listCars()
      setCars(data)
    } catch (e) {
      setError(e.message || 'Error')
    }
  }

  const onCreate = async (data) => {
    try {
      setLoading(true)
      await createCar(data)
      await load()
    } catch (e) {
      alert(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async (id) => {
    try {
      await deleteCar(id)
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      alert(e.message || 'Error')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 className="h1">FE-Taller</h1>
          <p className="p">UI simple para consumir el BE y usar en Jenkins/Sonar/Postman/carga</p>
        </div>
        <span className="badge">API: {import.meta.env.VITE_API_BASE_URL}</span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Agregar auto</h3>
        <CarForm onCreate={onCreate} loading={loading} />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Listado</h3>
        {error && <div className="badge" style={{ background: '#b91c1c' }}>Error: {error}</div>}
        <CarList cars={cars} onDelete={onDelete} />
      </div>
    </div>
  )
}