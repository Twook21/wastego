import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import ThemeContext from "../../context/ThemeContext"
import { Check, ChevronLeft, ChevronRight, Eye, Filter, Plus, Search, Trash2, ChevronDown } from 'lucide-react'

const deposits = [
  { id: 1, ecobuddy: 'John Doe', type: 'Plastik', weight: '25 kg', status: 'Pending', date: '11 Mei 2025' },
  { id: 2, ecobuddy: 'Jane Smith', type: 'Kertas', weight: '18 kg', status: 'Verified', date: '10 Mei 2025' },
  { id: 3, ecobuddy: 'Ahmad Rasyid', type: 'Kaca', weight: '12 kg', status: 'Verified', date: '9 Mei 2025' },
  { id: 4, ecobuddy: 'Siti Nurhayati', type: 'Elektronik', weight: '8 kg', status: 'Pending', date: '8 Mei 2025' },
]

const DepositManagement = () => {
  const { darkMode } = useContext(ThemeContext)
  const [expandedRow, setExpandedRow] = useState(null)

  // Toggle expanded row for mobile view
  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null)
    } else {
      setExpandedRow(id)
    }
  }

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

  // Get color for waste type
  const getTypeColor = (type) => {
    switch(type) {
      case 'Plastik': return 'bg-blue-500';
      case 'Kertas': return 'bg-yellow-500';
      case 'Kaca': return 'bg-purple-500';
      default: return 'bg-red-500';
    }
  }

  // Get status style
  const getStatusStyle = (status) => {
    return status === 'Verified'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  }

  return (
    <div className="mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 transition-colors duration-200">
      {/* Header Section */}
      <motion.div 
        className="mb-6"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1 
          className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-white mb-1"
          variants={fadeIn}
        >
          Manajemen Setoran
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan verifikasi setoran sampah dari EcoBuddies
        </motion.p>
      </motion.div>

      {/* Action Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari setoran..."
            className={`pl-10 pr-4 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500 text-sm`}
          />
        </div>

        {/* Filter & Add Button */}
        <div className="flex gap-2 w-full sm:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-3 py-2 sm:px-4 border rounded-lg text-sm ${
              darkMode 
                ? 'border-gray-600 text-white hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Filter</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 sm:px-4 bg-lime-500 text-white rounded-lg hover:bg-opacity-90 text-sm"
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Tambah</span>
            <span className="inline xs:hidden">+</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Table Section - Desktop View */}
      <motion.div 
        className="hidden md:block overflow-hidden rounded-xl shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
            <thead className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-600'}`}>
              <tr>
                {['ID', 'EcoBuddy', 'Jenis', 'Berat', 'Tanggal', 'Status', 'Aksi'].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium">
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm">#{deposit.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{deposit.ecobuddy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getTypeColor(deposit.type)}`}></span>
                      {deposit.type}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{deposit.weight}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs">{deposit.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(deposit.status)}`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {deposit.status === 'Pending' && (
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded text-lime-500 hover:bg-lime-100 dark:hover:bg-lime-900 dark:hover:bg-opacity-30"
                        >
                          <Check className="h-4 w-4" />
                        </motion.button>
                      )}
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-teal-900 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900 dark:hover:bg-opacity-30"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      {/* Card View - Mobile */}
      <motion.div
        className="md:hidden space-y-3" 
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {deposits.map(deposit => (
          <motion.div
            key={deposit.id}
            variants={fadeIn}
            className={`rounded-lg shadow-sm ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'} overflow-hidden`}
          >
            {/* Card Header */}
            <div 
              className={`p-3 flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer`}
              onClick={() => toggleRow(deposit.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">#{deposit.id}</span>
                <div>
                  <div className="font-medium text-sm">{deposit.ecobuddy}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{deposit.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(deposit.status)}`}>
                  {deposit.status}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 text-gray-500 transition-transform ${expandedRow === deposit.id ? 'transform rotate-180' : ''}`} 
                />
              </div>
            </div>
            
            {/* Card Details - Expanded */}
            {expandedRow === deposit.id && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Jenis</div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getTypeColor(deposit.type)}`}></span>
                      {deposit.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Berat</div>
                    <div className="font-medium">{deposit.weight}</div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  {deposit.status === 'Pending' && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      className="p-1 px-3 rounded text-xs bg-lime-500 text-white hover:bg-lime-600 flex items-center"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Verifikasi
                    </motion.button>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="p-1 px-3 rounded text-xs bg-teal-800 text-white hover:bg-teal-900 flex items-center"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Detail
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="p-1 px-3 rounded text-xs bg-red-500 text-white hover:bg-red-600 flex items-center"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Hapus
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-between items-center mt-4 sm:mt-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          1-4 dari 4 data
        </p>
        <div className="flex space-x-1">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-2 sm:px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-2 sm:px-3 py-1 rounded-md ${
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
            className={`px-2 sm:px-3 py-1 rounded-md ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default DepositManagement