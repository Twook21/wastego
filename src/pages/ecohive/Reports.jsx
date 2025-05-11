import { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import ThemeContext from '../../context/ThemeContext'

function Reports() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200">
      {/* Header Section */}
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
          Laporan Pengelolaan Sampah
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          variants={fadeIn}
        >
          Pantau dan analisis data pengelolaan sampah Anda untuk melihat dampak positif terhadap lingkungan.
        </motion.p>
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerItems}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          variants={slideFromLeft}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <motion.div 
              className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4"
              whileHover={{ rotate: 360, transition: { duration: 1 } }}
            >
              <i data-feather="pie-chart" className="text-black"></i>
            </motion.div>
            <h3 className="text-xl font-semibold text-teal-900 dark:text-white">Distribusi Jenis Sampah</h3>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Placeholder for chart */}
            <p className="text-gray-500 dark:text-gray-400">Grafik Distribusi Sampah</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
          variants={slideFromRight}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center mb-4">
            <motion.div 
              className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4"
              whileHover={{ rotate: 360, transition: { duration: 1 } }}
            >
              <i data-feather="trending-up" className="text-black"></i>
            </motion.div>
            <h3 className="text-xl font-semibold text-teal-900 dark:text-white">Trend Bulanan</h3>
          </div>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Placeholder for chart */}
            <p className="text-gray-500 dark:text-gray-400">Grafik Trend Bulanan</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Data Table Section */}
      <motion.div 
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4"
            whileHover={{ rotate: 360, transition: { duration: 1 } }}
          >
            <i data-feather="clipboard" className="text-black"></i>
          </motion.div>
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white">Rekapitulasi Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 rounded-l-lg">Tanggal</th>
                <th className="px-4 py-3">Jenis Sampah</th>
                <th className="px-4 py-3">Berat (kg)</th>
                <th className="px-4 py-3">Pengumpul</th>
                <th className="px-4 py-3 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3">10 Mei 2025</td>
                <td className="px-4 py-3">Plastik</td>
                <td className="px-4 py-3">2.5</td>
                <td className="px-4 py-3">Eco Recycle</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-xs rounded-full">Selesai</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3">8 Mei 2025</td>
                <td className="px-4 py-3">Kertas</td>
                <td className="px-4 py-3">1.8</td>
                <td className="px-4 py-3">Green Partners</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-xs rounded-full">Selesai</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-4 py-3">5 Mei 2025</td>
                <td className="px-4 py-3">Elektronik</td>
                <td className="px-4 py-3">3.2</td>
                <td className="px-4 py-3">E-Waste Solutions</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 text-xs rounded-full">Diproses</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mt-12 p-8 bg-teal-900 dark:bg-gray-800 rounded-xl text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h3 
          className="text-2xl font-bold mb-4 text-white"
          variants={fadeIn}
        >
          Tingkatkan Dampak Positif Anda
        </motion.h3>
        <motion.p 
          className="text-lg mb-6 text-gray-100 dark:text-gray-300 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Jadwalkan pengambilan sampah secara rutin dan kontribusi untuk lingkungan yang lebih bersih.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-900 dark:text-lime-500 bg-lime-500 dark:bg-teal-900 hover:bg-opacity-90"
        >
          Jadwalkan Pengambilan
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Reports