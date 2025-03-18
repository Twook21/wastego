import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import MobileAppScreenshot from '../assets/app-screenshot.png'

function HomePage() {
  const { darkMode } = useContext(ThemeContext)
  
  return (
    <div className="transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-teal-700 dark:bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kelola Sampah dengan Mudah dan Efisien
              </h1>
              <p className="text-xl mb-8">
                Sambungkan dengan pengumpul sampah terdekat dan pantau kontribusi lingkungan Anda secara real-time.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 dark:text-white bg-lime-400 dark:bg-lime-400-dark hover:bg-opacity-90">
                  Download Aplikasi
                </Link>
                <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10">
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src={MobileAppScreenshot} 
                alt="Waste Go Screenshot" 
                className="max-w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Fitur Unggulan</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Waste Go menyediakan berbagai fitur yang memudahkan Anda mengelola sampah dengan cara yang ramah lingkungan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a6.5 6.5 0 00-5.056 10.613L10 20l5.056-5.887A6.5 6.5 0 0010 3.5zm0 9.5a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Pengumpulan Terdekat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Temukan pengumpul sampah terdekat dan jadwalkan pengambilan dengan mudah.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path d="M10 5a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Pelacakan Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau pengambilan sampah Anda secara real-time dan dapatkan notifikasi otomatis.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-2h10v10H5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Statistik Daur Ulang</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lihat dampak positif Anda terhadap lingkungan melalui statistik dan grafik interaktif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lime-400 dark:bg-lime-400-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-teal-700 dark:text-white mb-4">Siap Bergabung?</h2>
          <p className="text-lg text-teal-700-dark dark:text-gray-200 max-w-3xl mx-auto mb-8">
            Download Waste Go sekarang dan mulai berkontribusi untuk lingkungan yang lebih bersih dan lestari.
          </p>
          <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-700 dark:bg-teal-700-light hover:bg-opacity-90">
            Download Sekarang
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage