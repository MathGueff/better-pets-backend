import { useState, useEffect } from 'react'
import axios from 'axios'
import NatureBackground from './components/NatureBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import AnimalCard from './components/AnimalCard'
import AnimalForm from './components/AnimalForm'
import type { Animal, AnimalFormData } from './types'

// --- API Client ---
const api = axios.create({
  baseURL: 'http://localhost:3001'
})

function App() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null)
  const [formData, setFormData] = useState<AnimalFormData>({ name: '', age: 0, breed: '' })
  const [submitting, setSubmitting] = useState(false)

  // Fetch all animals
  const fetchAnimals = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/animals')
      setAnimals(data.data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Falha ao conectar com o serviço de preservação. Verifique o backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  const handleOpenModal = (animal?: Animal) => {
    if (animal) {
      setEditingAnimal(animal)
      setFormData({ name: animal.name, age: animal.age, breed: animal.breed || '' })
    } else {
      setEditingAnimal(null)
      setFormData({ name: '', age: 0, breed: '' })
    }
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Você tem certeza que deseja remover este espécime do catálogo?')) return
    try {
      await api.delete(`/animals/${id}`)
      setAnimals(animals.filter(a => a._id !== id))
    } catch (err) {
      console.error(err)
      alert('Ocorreu um erro ao tentar remover o animal.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editingAnimal) {
        const { data } = await api.patch(`/animals/${editingAnimal._id}`, formData)
        setAnimals(animals.map(a => a._id === editingAnimal._id ? data.data : a))
      } else {
        const { data } = await api.post('/animals', formData)
        setAnimals([...animals, data.data])
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error(err)
      alert('Erro ao processar as informações do animal.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-container">
      <NatureBackground />
      <Header />

      <main className="main-content">
        <div className="main-card">
          
          <div className="card-left">
            <Hero onAddClick={() => handleOpenModal()} />
          </div>

          <div className="card-right">
            <div className="list-header">
              <h2 className="list-title">Animais Registrados</h2>
              <span className="total-badge">
                Total: {animals.length}
              </span>
            </div>

            {error && (
              <div className="error-alert">
                <span style={{ fontSize: '24px' }}>🌿</span>
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Mapeando fauna...</p>
              </div>
            ) : animals.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🐾</div>
                <h3 className="empty-title">Nenhum espécime encontrado</h3>
                <p className="empty-text">O catálogo de preservação está vazio no momento.</p>
              </div>
            ) : (
              <div className="animals-grid">
                {animals.map((animal) => (
                  <AnimalCard 
                    key={animal._id} 
                    animal={animal} 
                    onEdit={handleOpenModal} 
                    onDelete={handleDelete} 
                  />
                ))}
              </div>
            )}
          </div>

          <div className="pink-dot"></div>
          <div className="glow-dot"></div>
        </div>
      </main>

      <AnimalForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        editingAnimal={editingAnimal}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
      />

      <footer className="app-footer">
        <p className="footer-text">TESTAÍ 2026 • Matheus Gueff </p>
      </footer>
    </div>
  )
}

export default App
