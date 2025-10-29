const BASE = import.meta.env.VITE_API_BASE_URL;

export async function listCars() {
  const res = await fetch(`${BASE}/api/cars`);
  if (!res.ok) throw new Error('Error listando autos');
  return res.json();
}

export async function createCar(data) {
  const res = await fetch(`${BASE}/api/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error creando auto');
  return res.json();
}

export async function deleteCar(id) {
  const res = await fetch(`${BASE}/api/cars/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error eliminando auto');
}