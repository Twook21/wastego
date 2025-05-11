import { motion } from 'framer-motion'
import { useEffect } from 'react'

const stats = [
  { title: 'Setoran Hari Ini', value: '245 kg', change: '+12%', icon: 'trending-up' },
  { title: 'Setoran Mingguan', value: '1,560 kg', change: '-4%', icon: 'bar-chart-2' },
  { title: 'EcoBuddies Aktif', value: '84', change: '+5', icon: 'users' },
]

const Dashboard = () => {
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
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200 dark:bg-gray-900">
      {/* Dashboard Header */}
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
          Dashboard EcoBuddy
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Pantau kontribusi lingkungan Anda secara real-time
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeIn}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-3xl font-bold text-teal-900 dark:text-white">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-lime-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <motion.div 
                className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center"
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
              >
                <i data-feather={stat.icon} className="text-teal-900 dark:text-teal-900"></i>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        <motion.div 
          className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Statistik Setoran</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Grafik Setoran Bulanan</p>
          </div>
        </motion.div>

        <motion.div 
          className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Jenis Sampah</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Distribusi Jenis Sampah</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Activity Section */}
      <motion.div 
        className="mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <motion.div 
          className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ x: 10 }}
                className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700"
              >
                <div className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 rounded-full mr-4">
                  <i data-feather="package" className="text-teal-900 dark:text-teal-900 h-5 w-5"></i>
                </div>
                <div>
                  <p className="text-teal-900 dark:text-white font-medium">Setoran diterima</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plastik - 2.5 kg</p>
                </div>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">2 jam lalu</span>
              </motion.div>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-900 hover:bg-opacity-90"
          >
            Lihat Semua Aktivitas
          </motion.button>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mt-8 bg-lime-500 rounded-lg p-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={slideFromBottom}
      >
        <motion.h2 
          className="text-xl font-bold text-teal-900 dark:text-white mb-2"
          variants={fadeIn}
        >
          Jadwalkan Pengambilan
        </motion.h2>
        <motion.p 
          className="text-teal-900 dark:text-white mb-4"
          variants={fadeIn}
        >
          Segera jadwalkan pengambilan sampah Anda untuk berkontribusi lebih banyak
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white dark:text-lime-500 bg-teal-900 dark:bg-teal-900 hover:bg-opacity-90"
        >
          Jadwalkan Sekarang
        </motion.button>
      </motion.div>
    </div>
  )
}

export default Dashboard