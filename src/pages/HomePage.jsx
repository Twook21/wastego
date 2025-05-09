import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import ThemeContext from '../context/ThemeContext'
import MobileAppScreenshot from '../assets/app-screenshot.png'

function HomePage() {
  const { darkMode } = useContext(ThemeContext)

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideFromLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const slideFromRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const slideFromBottom = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }

  return (
    <div className="transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-teal-900 dark:bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideFromLeft}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={fadeIn}
              >
                Kelola Sampah dengan Mudah dan Efisien
              </motion.h1>
              <motion.p 
                className="text-xl mb-8"
                variants={fadeIn}
              >
                Sambungkan dengan pengumpul sampah terdekat dan pantau kontribusi lingkungan Anda secara real-time.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                variants={staggerItems}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white dark:text-teal-900 bg-lime-500 dark:bg-lime-500-dark hover:bg-opacity-90">
                    Download Aplikasi
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-700 hover:bg-opacity-10">
                    Pelajari Lebih Lanjut
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              initial="hidden"
              animate="visible"
              variants={slideFromRight}
            >
              <motion.img 
                src={MobileAppScreenshot} 
                alt="WasteGo Screenshot" 
                className="max-w-full h-95 rounded-xl shadow-lg"
                animate={pulseAnimation}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideFromBottom}
          >
            <motion.h2 
              className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4"
              variants={fadeIn}
            >
              Fitur Unggulan
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              WasteGo menyediakan berbagai fitur yang memudahkan Anda mengelola sampah dengan cara yang ramah lingkungan.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerItems}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
              >
                <i data-feather="map-pin" className="text-black"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">Pengumpulan Terdekat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Temukan pengumpul sampah terdekat dan jadwalkan pengambilan dengan mudah.
              </p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
              >
                <i data-feather="compass" className="text-black"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">Pelacakan Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau pengambilan sampah Anda secara real-time dan dapatkan notifikasi otomatis.
              </p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
              >
                <i data-feather="repeat" className="text-black"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">Statistik Daur Ulang</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lihat dampak positif Anda terhadap lingkungan melalui statistik dan grafik interaktif.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lime-500 dark:bg-lime-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={slideFromBottom}
          >
            <motion.h2 
              className="text-3xl font-bold text-teal-900 dark:text-white mb-4"
              variants={fadeIn}
            >
              Siap Bergabung?
            </motion.h2>
            <motion.p 
              className="text-lg text-teal-900 dark:text-white max-w-3xl mx-auto mb-8"
              variants={fadeIn}
            >
              Download WasteGo sekarang dan mulai berkontribusi untuk lingkungan yang lebih bersih dan lestari.
            </motion.p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white dark:text-lime-500 bg-teal-900 dark:bg-teal-900 hover:bg-opacity-90">
                Download Sekarang
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage