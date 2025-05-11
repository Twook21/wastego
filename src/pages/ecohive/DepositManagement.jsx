import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import ThemeContext from "../../context/ThemeContext"

const deposits = [
  { id: 1, ecobuddy: 'John Doe', type: 'Plastik', weight: '25 kg', status: 'Pending', date: '11 Mei 2025' },
  { id: 2, ecobuddy: 'Jane Smith', type: 'Kertas', weight: '18 kg', status: 'Verified', date: '10 Mei 2025' },
  { id: 3, ecobuddy: 'Ahmad Rasyid', type: 'Kaca', weight: '12 kg', status: 'Verified', date: '9 Mei 2025' },
  { id: 4, ecobuddy: 'Siti Nurhayati', type: 'Elektronik', weight: '8 kg', status: 'Pending', date: '8 Mei 2025' },
]

const DepositManagement = () => {
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

  const slideFromBottom = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200">
      {/* Header Section */}
      <motion.div 
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1 
          className="text-3xl font-bold text-teal-900 dark:text-white mb-2"
          variants={fadeIn}
        >
          Manajemen Setoran
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan verifikasi setoran sampah dari EcoBuddies
        </motion.p>
      </motion.div>

      {/* Action Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i data-feather="search" className="h-5 w-5 text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Cari setoran..."
            className={`pl-10 pr-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500`}
          />
        </div>

        {/* Filter & Add Button */}
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-4 py-2 border rounded-lg ${
              darkMode 
                ? 'border-gray-600 text-white hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <i data-feather="filter" className="h-4 w-4 mr-2"></i>
            Filter
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-opacity-90"
          >
            <i data-feather="plus" className="h-4 w-4 mr-2"></i>
            Tambah Setoran
          </motion.button>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div 
        className="overflow-hidden rounded-xl shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
            <thead className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'}`}>
              <tr>
                {['ID', 'EcoBuddy', 'Jenis', 'Berat', 'Tanggal', 'Status', 'Aksi'].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody 
              className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}
              variants={staggerItems}
            >
              {deposits.map((deposit) => (
                <motion.tr
                  key={deposit.id}
                  variants={fadeIn}
                  whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
                  className="transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">#{deposit.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{deposit.ecobuddy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        deposit.type === 'Plastik' ? 'bg-blue-500' : 
                        deposit.type === 'Kertas' ? 'bg-yellow-500' : 
                        deposit.type === 'Kaca' ? 'bg-purple-500' : 'bg-red-500'
                      }`}></span>
                      {deposit.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{deposit.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{deposit.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deposit.status === 'Verified' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className={`p-1 rounded ${
                          deposit.status === 'Pending' 
                            ? 'text-lime-500 hover:bg-lime-100 dark:hover:bg-lime-900 dark:hover:bg-opacity-30' 
                            : 'text-gray-400'
                        }`}
                        disabled={deposit.status === 'Verified'}
                      >
                        <i data-feather="check-circle" className="h-5 w-5"></i>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-teal-900 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 dark:hover:bg-opacity-30"
                      >
                        <i data-feather="eye" className="h-5 w-5"></i>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                      >
                        <i data-feather="trash-2" className="h-5 w-5"></i>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-between items-center mt-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Menampilkan 1-4 dari 4 data
        </p>
        <div className="flex space-x-1">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled
          >
            <i data-feather="chevron-left" className="h-5 w-5"></i>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-teal-900 text-white' 
                : 'bg-teal-900 text-white'
            }`}
          >
            1
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled
          >
            <i data-feather="chevron-right" className="h-5 w-5"></i>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default DepositManagement