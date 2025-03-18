import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { darkMode } = useContext(ThemeContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Demo login logic (replace with actual authentication)
    if (email === 'admin@wastego.com' && password === 'admin123') {
      navigate('/admin/dashboard')
    } else {
      setError('Email atau password salah')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-700 dark:text-white">
          Login ke Panel Admin
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 
                  dark:bg-gray-700 dark:text-white
                  focus:outline-none focus:ring-teal-700 focus:border-teal-700 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500
                  dark:bg-gray-700 dark:text-white
                  focus:outline-none focus:ring-teal-700 focus:border-teal-700 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 dark:bg-teal-700-light hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 dark:focus:ring-lime-400"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage