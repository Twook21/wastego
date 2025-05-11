import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import ThemeContext from "../../context/ThemeContext"

const ecobuddies = [
  { 
    id: 1, 
    name: 'John Doe', 
    totalDeposit: '245 kg', 
    lastActivity: '2 jam lalu',
    level: 'Gold',
    setoran: [12, 18, 25, 15, 20, 22],
    imageUrl: '/api/placeholder/100/100'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    totalDeposit: '180 kg', 
    lastActivity: '5 jam lalu',
    level: 'Silver',
    setoran: [8, 15, 10, 12, 14, 16],
    imageUrl: '/api/placeholder/100/100'
  },
  { 
    id: 3, 
    name: 'Ahmad Rasyid', 
    totalDeposit: '320 kg', 
    lastActivity: '1 hari lalu',
    level: 'Platinum',
    setoran: [22, 25, 18, 20, 24, 30],
    imageUrl: '/api/placeholder/100/100'
  },
  { 
    id: 4, 
    name: 'Siti Nurhayati', 
    totalDeposit: '165 kg', 
    lastActivity: '3 jam lalu',
    level: 'Silver',
    setoran: [10, 12, 15, 13, 14, 16],
    imageUrl: '/api/placeholder/100/100'
  },
  { 
    id: 5, 
    name: 'Budi Santoso', 
    totalDeposit: '90 kg', 
    lastActivity: '1 hari lalu',
    level: 'Bronze',
    setoran: [5, 8, 10, 7, 9, 12],
    imageUrl: '/api/placeholder/100/100'
  },
  { 
    id: 6, 
    name: 'Dewi Lestari', 
    totalDeposit: '210 kg', 
    lastActivity: '6 jam lalu',
    level: 'Gold',
    setoran: [15, 18, 20, 17, 19, 21],
    imageUrl: '/api/placeholder/100/100'
  }
]

const EcoBuddyManagement = () => {
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

  const getLevelColor = (level) => {
    switch(level) {
      case 'Platinum': return 'from-cyan-400 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800';
      case 'Gold': return 'from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800';
      case 'Silver': return 'from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700';
      default: return 'from-amber-700 to-amber-900 dark:from-amber-800 dark:to-amber-950';
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
          Manajemen EcoBuddy
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan pantau perkembangan EcoBuddy Anda
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
            placeholder="Cari EcoBuddy..."
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
            <i data-feather="user-plus" className="h-4 w-4 mr-2"></i>
            Tambah EcoBuddy
          </motion.button>
        </div>
      </motion.div>

      {/* EcoBuddy Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {ecobuddies.map((eb) => (
          <motion.div
            key={eb.id}
            variants={fadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            {/* Card Header with Gradient Badge */}
            <div className="relative h-20 bg-gradient-to-r from-teal-500 to-lime-500">
              <div className="absolute -bottom-10 left-6 h-20 w-20 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <img 
                  src={eb.imageUrl} 
                  alt={eb.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <span className={`text-xs font-bold py-1 px-3 rounded-full bg-gradient-to-r ${getLevelColor(eb.level)} text-white`}>
                  {eb.level}
                </span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="pt-12 pb-6 px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-teal-900 dark:text-white">{eb.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">EcoBuddy ID: #{eb.id}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <i data-feather="more-vertical" className="h-5 w-5"></i>
                </motion.button>
              </div>
              
              {/* Mini Chart */}
              <div className="mt-4 h-16 flex items-end space-x-1">
                {eb.setoran.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value/30) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-lime-500 dark:bg-lime-600 rounded w-full"
                  ></motion.div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Setoran</p>
                  <p className="text-lg font-bold text-teal-900 dark:text-white">{eb.totalDeposit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Aktifitas Terakhir</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{eb.lastActivity}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-between">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm text-teal-900 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <i data-feather="eye" className="h-4 w-4 mr-1"></i>
                  Lihat Detail
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm text-lime-500 hover:text-lime-700"
                >
                  <i data-feather="message-circle" className="h-4 w-4 mr-1"></i>
                  Hubungi
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-between items-center mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Menampilkan 1-6 dari 6 data
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

export default EcoBuddyManagement