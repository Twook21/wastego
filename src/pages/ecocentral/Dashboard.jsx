import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Dummy data untuk statistik global
const globalStats = [
  { title: 'Total Sampah', value: '125,780 kg', change: '+8%', icon: 'trash' },
  { title: 'EcoHive Aktif', value: '32', change: '+3', icon: 'home' },
  { title: 'Total EcoBuddy', value: '1,240', change: '+15%', icon: 'users' },
  { title: 'Pengurangan CO₂', value: '24.6 ton', change: '+12%', icon: 'cloud' },
]

// Dummy data untuk grafik performa bulanan
const monthlyPerformanceData = [
  { name: 'Jan', sampah: 4000, ecoBuddyBaru: 24 },
  { name: 'Feb', sampah: 3500, ecoBuddyBaru: 13 },
  { name: 'Mar', sampah: 5000, ecoBuddyBaru: 22 },
  { name: 'Apr', sampah: 4780, ecoBuddyBaru: 18 },
  { name: 'Mei', sampah: 5890, ecoBuddyBaru: 26 },
  { name: 'Jun', sampah: 6390, ecoBuddyBaru: 33 },
];

// Dummy data untuk distribusi jenis sampah
const wasteTypeData = [
  { name: 'Plastik', value: 35, color: '#10B981' },
  { name: 'Kertas', value: 25, color: '#3B82F6' },
  { name: 'Logam', value: 15, color: '#6366F1' },
  { name: 'Kaca', value: 10, color: '#EC4899' },
  { name: 'Organik', value: 15, color: '#8B5CF6' },
];

// Dummy data untuk performa EcoHive
const ecoHivePerformanceData = [
  { name: 'EcoHive A', sampah: 2400, ecoBuddy: 98, efisiensi: 85 },
  { name: 'EcoHive B', sampah: 1398, ecoBuddy: 72, efisiensi: 78 },
  { name: 'EcoHive C', sampah: 3200, ecoBuddy: 120, efisiensi: 92 },
  { name: 'EcoHive D', sampah: 2800, ecoBuddy: 89, efisiensi: 81 },
  { name: 'EcoHive E', sampah: 1908, ecoBuddy: 65, efisiensi: 76 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bulanan');
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isSmallMobile: false
  });
  
  useEffect(() => {
    // Check if window exists (for SSR)
    if (typeof window !== 'undefined') {
      // Initial check
      const checkScreenSize = () => {
        setScreenSize({
          isMobile: window.innerWidth < 768,
          isSmallMobile: window.innerWidth < 400
        });
      };
      
      checkScreenSize();

      // Add resize event listener
      window.addEventListener('resize', checkScreenSize);
      
      // Cleanup
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

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

  // Chart height adjustments based on screen size
  const getChartHeight = () => {
    if (screenSize.isSmallMobile) return 180;
    if (screenSize.isMobile) return 240;
    return 320;
  }

  return (
    <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-12 transition-colors duration-200 dark:bg-gray-900 overflow-hidden">
      {/* Dashboard Header */}
      <motion.div 
        className="mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1 
          className="text-xl sm:text-3xl font-bold text-teal-900 dark:text-white mb-1 sm:mb-2"
          variants={fadeIn}
        >
          Dashboard EcoHive
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Pantau kinerja sistem EcoHive & dampak lingkungan
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {globalStats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className="p-2 sm:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
<<<<<<< HEAD
                <h3 className="text-xs sm:text-lg font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <div className="mt-1 sm:mt-2 flex items-baseline">
                  <p className="text-lg sm:text-3xl font-bold text-teal-900 dark:text-white">{stat.value}</p>
                  <span className={`ml-1 sm:ml-2 text-xs font-medium ${
=======
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-bold text-teal-900 dark:text-white">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${
>>>>>>> 43e769c7dcec26304bc27352710686730091eac3
                    stat.change.startsWith('+') ? 'text-lime-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <motion.div 
                className={`${screenSize.isSmallMobile ? 'hidden' : 'flex'} bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 sm:p-3 rounded-full w-8 h-8 sm:w-12 sm:h-12 items-center justify-center`}
                whileHover={{ rotate: 360, transition: { duration: 1 } }}
              >
                <i data-feather={stat.icon} className="text-teal-900 dark:text-teal-900 w-4 h-4 sm:w-6 sm:h-6"></i>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Performa dan Analisis Section */}
      <motion.div 
        className="mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-6 gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-2xl font-bold text-teal-900 dark:text-white">Performa dan Analisis</h2>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto whitespace-nowrap">
            <button 
              className={`px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'bulanan' 
                  ? 'bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('bulanan')}
            >
              Bulanan
            </button>
            <button 
              className={`px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'triwulan' 
                  ? 'bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('triwulan')}
            >
              Triwulan
            </button>
            <button 
              className={`px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === 'tahunan' 
                  ? 'bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white'
              }`}
              onClick={() => setActiveTab('tahunan')}
            >
              Tahunan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {/* Performa Bulanan Chart */}
        <motion.div 
          className="p-3 sm:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-base sm:text-xl font-semibold text-teal-900 dark:text-white mb-2 sm:mb-4">Perkembangan Bulanan</h3>
          <div className={`h-${screenSize.isSmallMobile ? '40' : '60'} sm:h-80`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPerformanceData}
                margin={screenSize.isMobile ? { top: 5, right: 5, left: -15, bottom: 0 } : { top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  tick={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}} 
                  tickMargin={5}
                />
                <YAxis 
                  yAxisId="left" 
                  stroke="#9CA3AF" 
                  tick={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}} 
                  width={screenSize.isSmallMobile ? 25 : screenSize.isMobile ? 30 : 40} 
                  tickFormatter={value => screenSize.isSmallMobile ? value / 1000 + 'k' : value}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#9CA3AF" 
                  tick={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}} 
                  width={screenSize.isSmallMobile ? 25 : screenSize.isMobile ? 30 : 40} 
                  tickCount={5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    color: '#F9FAFB',
                    fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12,
                    padding: screenSize.isSmallMobile ? '2px 5px' : '5px 10px'
                  }} 
                  itemStyle={{
                    padding: screenSize.isSmallMobile ? '1px 0' : '2px 0'
                  }}
                />
                <Legend 
                  wrapperStyle={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}}
                  iconSize={screenSize.isSmallMobile ? 6 : 10}
                  iconType="circle"
                  layout={screenSize.isSmallMobile ? "horizontal" : "horizontal"}
                  verticalAlign="bottom"
                  align="center"
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sampah" 
                  name="Sampah (kg)" 
                  stroke="#10B981" 
                  activeDot={{ r: screenSize.isSmallMobile ? 3 : screenSize.isMobile ? 4 : 8 }} 
                  strokeWidth={screenSize.isSmallMobile ? 1 : screenSize.isMobile ? 1.5 : 2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="ecoBuddyBaru" 
                  name="EcoBuddy Baru" 
                  stroke="#8B5CF6" 
                  strokeWidth={screenSize.isSmallMobile ? 1 : screenSize.isMobile ? 1.5 : 2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribusi Sampah Chart */}
        <motion.div 
          className="p-3 sm:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-base sm:text-xl font-semibold text-teal-900 dark:text-white mb-2 sm:mb-4">Distribusi Jenis Sampah</h3>
          <div className={`h-${screenSize.isSmallMobile ? '40' : '60'} sm:h-80`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={screenSize.isSmallMobile ? 60 : screenSize.isMobile ? 80 : 120}
                  innerRadius={screenSize.isSmallMobile ? 30 : screenSize.isMobile ? 40 : 60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => screenSize.isSmallMobile ? null : `${(percent * 100).toFixed(0)}%`}
                  paddingAngle={2}
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Persentase']}
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    color: '#F9FAFB',
                    fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12,
                    padding: screenSize.isSmallMobile ? '2px 5px' : '5px 10px'
                  }}
                  itemStyle={{
                    color: "#F9FAFB", 
                    fontSize: "14px",
                    fontWeight: "bold", 
                  }} 
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  wrapperStyle={{
                    fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12,
                    paddingTop: screenSize.isSmallMobile ? 5 : 10
                  }}
                  iconSize={screenSize.isSmallMobile ? 6 : 10}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* EcoHive Performance */}
      <motion.div
        className="mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.div 
          className="p-3 sm:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-base sm:text-xl font-semibold text-teal-900 dark:text-white mb-2 sm:mb-4">Analisis Performa EcoHive</h3>
          <div className="overflow-x-auto">
            <div style={{ width: '100%', minWidth: screenSize.isMobile ? 500 : '100%', height: screenSize.isSmallMobile ? 200 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ecoHivePerformanceData}
                  margin={screenSize.isMobile ? { top: 5, right: 5, left: -15, bottom: 5 } : { top: 20, right: 30, left: 20, bottom: 5 }}
                  barSize={screenSize.isSmallMobile ? 10 : screenSize.isMobile ? 15 : 20}
                  barGap={screenSize.isSmallMobile ? 2 : 5}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    tick={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}}
                    tickMargin={5}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    tick={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}} 
                    width={screenSize.isSmallMobile ? 25 : screenSize.isMobile ? 30 : 40}
                    tickFormatter={value => screenSize.isSmallMobile ? (value > 999 ? value / 1000 + 'k' : value) : value}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      borderColor: '#374151',
                      color: '#F9FAFB',
                      fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12,
                      padding: screenSize.isSmallMobile ? '2px 5px' : '5px 10px'
                    }}
                    itemStyle={{
                      padding: screenSize.isSmallMobile ? '1px 0' : '2px 0'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{fontSize: screenSize.isSmallMobile ? 8 : screenSize.isMobile ? 10 : 12}}
                    iconSize={screenSize.isSmallMobile ? 6 : 10}
                    iconType="circle"
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                  <Bar dataKey="sampah" name="Sampah (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ecoBuddy" name="EcoBuddy" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="efisiensi" name="Efisiensi (%)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Top Performing EcoHive */}
      <motion.div 
        className="mb-4 sm:mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.div 
          className="p-3 sm:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <h3 className="text-base sm:text-xl font-semibold text-teal-900 dark:text-white">EcoHive Terbaik</h3>
            <button className="text-teal-900 dark:text-teal-500 hover:underline text-xs sm:text-sm flex items-center">
              Lihat Semua <i data-feather="chevron-right" className="h-3 w-3 sm:h-4 sm:w-4 ml-1"></i>
            </button>
          </div>
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-2xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">EcoHive</th>
                  <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-2xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sampah</th>
                  <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-2xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">EcoBuddy</th>
                  <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-2xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Efisiensi</th>
                  <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-2xs sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {ecoHivePerformanceData.sort((a, b) => b.efisiensi - a.efisiensi).slice(0, 3).map((ecoHive) => (
                  <motion.tr 
                    key={ecoHive.name}
                    whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                  >
                    <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-2xs sm:text-sm font-medium text-teal-900 dark:text-white">{ecoHive.name}</td>
                    <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-2xs sm:text-sm text-gray-500 dark:text-gray-400">{ecoHive.sampah} kg</td>
                    <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-2xs sm:text-sm text-gray-500 dark:text-gray-400">{ecoHive.ecoBuddy}</td>
                    <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-2xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{ecoHive.efisiensi}%</td>
                    <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                      <span className="px-1 py-0.5 sm:px-2 sm:py-1 inline-flex text-2xs sm:text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Aktif
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="mt-4 sm:mt-8 bg-gradient-to-r from-teal-700 to-lime-600 rounded-lg p-3 sm:p-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={slideFromBottom}
      >
        <motion.h2 
          className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2"
          variants={fadeIn}
        >
          Tingkatkan Dampak Positif
        </motion.h2>
        <motion.p 
          className="text-white text-xs sm:text-base mb-3 sm:mb-6 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Tambahkan EcoHive dan undang EcoBuddy baru untuk memperluas jangkauan lingkungan
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2 border border-transparent text-xs sm:text-base font-medium rounded-md text-teal-900 bg-white hover:bg-gray-50"
          >
            <i data-feather="plus-circle" className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2"></i>
            Tambah EcoHive
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
            className="inline-flex items-center justify-center px-3 py-1.5 sm:px-5 sm:py-2 border border-white text-xs sm:text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10"
=======
            className="inline-flex items-center justify-center px-5 py-2 border border-white text-base font-medium rounded-md text-white hover:bg-teal-900 hover:bg-opacity-10"
>>>>>>> 43e769c7dcec26304bc27352710686730091eac3
          >
            <i data-feather="users" className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2"></i>
            Undang EcoBuddy
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard