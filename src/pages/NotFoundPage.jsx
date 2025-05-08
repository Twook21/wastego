import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function NotFoundPage() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-teal-700 dark:text-lime-400">404</h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Pastikan URL yang dimasukkan sudah benar atau kembali ke beranda.
          </p>
        </div>
        
        <div className="mt-10">
          <Link 
            to="/" 
            className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
              darkMode 
                ? 'bg-lime-400 text-gray-900 hover:bg-lime-500' 
                : 'bg-teal-700 text-white hover:bg-teal-800'
            } transition-colors duration-200`}
          >
            Kembali ke Beranda
          </Link>
        </div>

        <div className="mt-12">
          <div className={`h-1 w-24 mx-auto ${darkMode ? 'bg-lime-400' : 'bg-teal-700'}`}></div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;