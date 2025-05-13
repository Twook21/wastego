import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  
  useEffect(() => {
    if (window.feather) {
      window.feather.replace()
    }
  }, [showFilterMenu, showMobileSearch])

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  }

  const slideFromBottom = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const slideInFromRight = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }
  }

  const slideInFromTop = {
    hidden: { y: '-100%' },
    visible: { y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } }
  }

  const getLevelColor = (level) => {
    switch(level) {
      case 'Platinum': return 'from-cyan-400 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800';
      case 'Gold': return 'from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800';
      case 'Silver': return 'from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700';
      default: return 'from-amber-700 to-amber-900 dark:from-amber-800 dark:to-amber-950';
    }
  }

  const FilterMenu = () => (
    <motion.div
      className="fixed inset-0 z-40 bg-white/5 backdrop-blur-sm bg-opacity-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowFilterMenu(false)}
    >
      <motion.div 
        className="w-3/4 max-w-xs bg-white dark:bg-gray-900 h-full p-6 shadow-xl"
        initial="hidden"
        animate="visible"
        variants={slideInFromRight}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Filter</h3>
          <button 
            onClick={() => setShowFilterMenu(false)}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <i data-feather="x" className="h-5 w-5 text-gray-500 dark:text-gray-300"></i>
          </button>
        </div>
        
        <div className="space-y-5">
          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Level
            </label>
            <div className="space-y-2">
              {['Platinum', 'Gold', 'Silver', 'Bronze'].map(level => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${level}`}
                    className="h-4 w-4 text-lime-500 rounded focus:ring-lime-500"
                  />
                  <label 
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Activity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Aktivitas Terakhir
            </label>
            <div className="space-y-2">
              {['Hari ini', '7 hari terakhir', '30 hari terakhir'].map(period => (
                <div key={period} className="flex items-center">
                  <input
                    type="radio"
                    name="activity-period"
                    id={`period-${period}`}
                    className="h-4 w-4 text-lime-500 focus:ring-lime-500"
                  />
                  <label 
                    htmlFor={`period-${period}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {period}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Total Setoran Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Total Setoran
            </label>
            <input
              type="range"
              min="0"
              max="500"
              className="w-full h-2 rounded-lg appearance-none bg-lime-200 dark:bg-lime-900 cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
              <span>0 kg</span>
              <span>500 kg</span>
            </div>
          </div>
          
          <div className="pt-6 flex space-x-2">
            <button 
              className="flex-1 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center"
            >
              Reset
            </button>
            <button 
              className="flex-1 py-2 px-4 bg-lime-500 text-white rounded-lg text-center"
            >
              Terapkan
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const MobileSearchBar = () => (
    <motion.div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowMobileSearch(false)}
    >
      <motion.div 
        className="w-full bg-white dark:bg-gray-900 shadow-xl p-4"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i data-feather="search" className="h-5 w-5 text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Cari EcoBuddy..."
            autoFocus
            className="pl-10 pr-10 py-3 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button onClick={() => setShowMobileSearch(false)}>
              <i data-feather="x" className="h-5 w-5 text-gray-400"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 transition-colors duration-200">

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
          Manajemen EcoBuddy
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan pantau perkembangan EcoBuddy
        </motion.p>
      </motion.div>

      {/* Action Bar - Desktop View */}
      <motion.div 
        className="hidden sm:flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
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
            className="pl-10 pr-4 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Filter & Add Button */}
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setShowFilterMenu(true)}
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

      {/* Mobile Action Bar */}
      <motion.div 
        className="flex sm:hidden justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800"
          onClick={() => setShowMobileSearch(true)}
        >
          <i data-feather="search" className="h-5 w-5 text-gray-600 dark:text-gray-300"></i>
        </motion.button>
        
        <div className="flex gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800"
            onClick={() => setShowFilterMenu(true)}
          >
            <i data-feather="filter" className="h-5 w-5 text-gray-600 dark:text-gray-300"></i>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-lime-500 text-white"
          >
            <i data-feather="user-plus" className="h-5 w-5"></i>
          </motion.button>
        </div>
      </motion.div>

      {/* EcoBuddy Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {ecobuddies.map((eb) => (
          <motion.div
            key={eb.id}
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-800 touch-manipulation"
          >
            {/* Card Header with Gradient Badge */}
            <div className="relative h-16 sm:h-20 bg-gradient-to-r from-teal-500 to-lime-500">
              <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6 h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <img 
                  src={eb.imageUrl} 
                  alt={eb.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-3 sm:top-4 right-4">
                <span className={`text-xs font-bold py-1 px-2 sm:px-3 rounded-full bg-gradient-to-r ${getLevelColor(eb.level)} text-white`}>
                  {eb.level}
                </span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="pt-10 sm:pt-12 pb-5 sm:pb-6 px-4 sm:px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-teal-900 dark:text-white">{eb.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">EcoBuddy ID: #{eb.id}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 -m-1"
                >
                  <i data-feather="more-vertical" className="h-5 w-5"></i>
                </motion.button>
              </div>
              
              {/* Mini Chart */}
              <div className="mt-3 sm:mt-4 h-12 sm:h-16 flex items-end space-x-1">
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
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Setoran</p>
                  <p className="text-base sm:text-lg font-bold text-teal-900 dark:text-white">{eb.totalDeposit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Aktifitas Terakhir</p>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{eb.lastActivity}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 flex justify-between">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm text-teal-900 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
                >
                  <i data-feather="eye" className="h-4 w-4 mr-1"></i>
                  <span className="text-xs sm:text-sm">Lihat Detail</span>
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm text-lime-500 hover:text-lime-700"
                >
                  <i data-feather="message-circle" className="h-4 w-4 mr-1"></i>
                  <span className="text-xs sm:text-sm">Hubungi</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="flex justify-between items-center mt-6 sm:mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Menampilkan 1-6 dari 6 data
        </p>
        <div className="flex space-x-1">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled
          >
            <i data-feather="chevron-left" className="h-4 w-4 sm:h-5 sm:w-5"></i>
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-md bg-teal-900 text-white"
          >
            1
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled
          >
            <i data-feather="chevron-right" className="h-4 w-4 sm:h-5 sm:w-5"></i>
          </motion.button>
        </div>
      </motion.div>

      {/* Fixed Add Button for Mobile */}
      <div className="sm:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-lime-500 text-white shadow-lg flex items-center justify-center z-30"
        >
          <i data-feather="plus" className="h-6 w-6"></i>
        </motion.button>
      </div>

      {/* Mobile Filter Menu */}
      {showFilterMenu && <FilterMenu />}
      
      {/* Mobile Search Bar Overlay */}
      {showMobileSearch && <MobileSearchBar />}
    </div>
  )
}

export default EcoBuddyManagement