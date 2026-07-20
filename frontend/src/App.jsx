import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')

  const API_URL = 'http://localhost:8081/api/usuarios'

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setUsuarios(data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
    }
  }

  const crearUsuario = async (e) => {
    e.preventDefault()
    if (!nombre || !email) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      })
      if (response.ok) {
        setNombre('')
        setEmail('')
        fetchUsuarios()
      }
    } catch (error) {
      console.error('Error al crear usuario:', error)
    }
  }

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchUsuarios()
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Gestión de Usuarios</h1>
        <p>Spring Boot + React CRUD</p>
      </header>

      <div className="main-content">
        <div className="card form-card">
          <h2>Nuevo Usuario</h2>
          <form onSubmit={crearUsuario}>
            <div className="input-group">
              <label>Nombre</label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej. juan@correo.com"
              />
            </div>
            <button type="submit" className="btn-primary">Guardar Usuario</button>
          </form>
        </div>

        <div className="card list-card">
          <h2>Lista de Usuarios</h2>
          {usuarios.length === 0 ? (
            <div className="empty-state">No hay usuarios registrados.</div>
          ) : (
            <ul className="user-list">
              {usuarios.map(user => (
                <li key={user.id} className="user-item">
                  <div className="user-info">
                    <strong>{user.nombre}</strong>
                    <span>{user.email}</span>
                  </div>
                  <button onClick={() => eliminarUsuario(user.id)} className="btn-danger">
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
