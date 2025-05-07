import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

function Footer() {
  const { darkMode } = useContext(ThemeContext)
  
  return (
    <footer className="bg-teal-700 dark:bg-gray-800 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Waste Go</h3>
            <p className="text-sm">
              Aplikasi pengelolaan sampah yang inovatif untuk membantu mengurangi limbah dan menjaga lingkungan tetap bersih.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-lime-400 dark:hover:text-lime-300">Beranda</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-lime-400 dark:hover:text-lime-300">Tentang</Link>
              </li>
              <li>
                <Link to="/download" className="hover:text-lime-400 dark:hover:text-lime-300">Download</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: wastego.idn@gmail.com</li>
              <li>Telepon: +62 123 4567 890</li>
              <li>Alamat: Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-600 text-sm text-center">
          <p>© {new Date().getFullYear()} Waste Go. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer