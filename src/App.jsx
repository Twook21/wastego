import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DownloadPage from './pages/DownloadPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ThemeContext from './context/ThemeContext'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  // Inisialisasi tema dari localStorage atau preferensi pengguna
  useEffect(() => {
    // Memeriksa localStorage
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      // Jika tidak ada di localStorage, periksa preferensi sistem
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      }
    }
  }, [])
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-900 transition-colors duration-200`}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App