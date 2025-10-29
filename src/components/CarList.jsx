export default function CarList({ cars, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr><th>Brand</th><th>Model</th><th></th></tr>
      </thead>
      <tbody>
        {cars.map(c => (
          <tr key={c.id}>
            <td>{c.brand}</td>
            <td>{c.model}</td>
            <td style={{ textAlign: 'right' }}>
              <button className="btn" style={{ background: '#ef4444' }} onClick={() => onDelete(c.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        {cars.length === 0 && (
          <tr><td colSpan="3" style={{ color: '#94a3b8' }}>No cars yet</td></tr>
        )}
      </tbody>
    </table>
  )
}