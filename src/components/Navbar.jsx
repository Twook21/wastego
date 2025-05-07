import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'
import ThemeContext from '../context/ThemeContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { darkMode } = useContext(ThemeContext)

  return (
    <nav className="bg-white dark:bg-gray-800 text-teal-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-60 w-60" src={Logo} alt="Logo Sampah" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 hover:text-lime-400 dark:hover:bg-gray-700 dark:text-white">
                  Beranda
                </Link>
                <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium  hover:bg-teal-700 hover:text-lime-400 dark:hover:bg-gray-700 dark:text-white">
                  Tentang
                </Link>
                <Link to="/download" className="px-3 py-2 rounded-md text-sm font-medium  hover:bg-teal-700 hover:text-lime-400 dark:hover:bg-gray-700 dark:text-white">
                  Download
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link to="/admin/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-lime-400 dark:text-white bg-teal-700 dark:bg-lime-600 hover:bg-opacity-90">
                Admin Login
              </Link>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-teal-600 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600 dark:hover:bg-gray-700">
              Beranda
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600 dark:hover:bg-gray-700">
              Tentang
            </Link>
            <Link to="/download" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-teal-600 dark:hover:bg-gray-700">
              Download
            </Link>
            <Link to="/admin/login" className="block px-3 py-2 rounded-md text-base font-medium text-teal-700 dark:text-white bg-lime-400 dark:bg-lime-600 hover:bg-opacity-90">
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar