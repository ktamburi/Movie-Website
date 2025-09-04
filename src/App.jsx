import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import NavBar from './components/NavBar'
import { MovieProvider } from './context/MovieContext'

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
