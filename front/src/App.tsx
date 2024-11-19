import './App.css'
import { VideosBody } from './components/VideosBody'

function App() {

  return (
    <div className="page-container">
      <header className="header">
        <div className="title-section">
          <h1>Ejemplo de despliegue</h1>
          <p className="subtitle">
            Ejemplo simple pero funcional de una aplicación web full stack usando <strong>React</strong>, 
             <strong>FastAPI</strong> y <strong>PostgreSQL</strong>
          </p>
          <p className="subtitle-description">
             Este ejemplo simplemente permite cargar un video de youtube y ver que videos cargaron el resto de los alumnos.
          </p>
        </div>
      </header>

      <VideosBody />

      <footer className="footer">
        <p>Introducción al Desarrollo de Software - Curso Camejo</p>
      </footer>
    </div>
  )
}

export default App
