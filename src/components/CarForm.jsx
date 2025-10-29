import { useState } from 'react'

export default function CarForm({ onCreate, loading }) {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await onCreate({ brand, model })
    setBrand('')
    setModel('')
  }

  return (
    <form onSubmit={submit} className="grid" style={{ alignItems: 'start' }}>
      <input className="input" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
      <input className="input" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} required />
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
        <button className="btn" type="submit" disabled={loading}>Add</button>
        {loading && <span className="badge">Guardando...</span>}
      </div>
    </form>
  )
}