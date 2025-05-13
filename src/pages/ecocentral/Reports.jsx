import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  Cell, 
  AreaChart, 
  Area, 
  ComposedChart, 
  Scatter, 
  ScatterChart
} from 'recharts';


// Data dummy untuk rekap data sampah per EcoHive
const ecoHiveWasteData = [
  { name: 'EcoHive A', plastik: 1200, kertas: 850, logam: 340, kaca: 220, organik: 950 },
  { name: 'EcoHive B', plastik: 980, kertas: 760, logam: 280, kaca: 190, organik: 870 },
  { name: 'EcoHive C', plastik: 1450, kertas: 920, logam: 410, kaca: 280, organik: 1100 },
  { name: 'EcoHive D', plastik: 1050, kertas: 810, logam: 320, kaca: 230, organik: 920 },
  { name: 'EcoHive E', plastik: 880, kertas: 690, logam: 270, kaca: 180, organik: 830 },
];

// Data dummy untuk rekap data sampah per wilayah
const regionalWasteData = [
  { name: 'Jakarta Utara', total: 5600, pertumbuhan: 8 },
  { name: 'Jakarta Selatan', total: 7200, pertumbuhan: 12 },
  { name: 'Jakarta Timur', total: 6100, pertumbuhan: 9 },
  { name: 'Jakarta Barat', total: 5900, pertumbuhan: 7 },
  { name: 'Jakarta Pusat', total: 4800, pertumbuhan: 5 },
];

// Data dummy untuk rekap data sampah per jenis
const wasteTypeData = [
  { name: 'Plastik', value: 35, color: '#10B981', totalKg: 28750 },
  { name: 'Kertas', value: 25, color: '#3B82F6', totalKg: 20500 },
  { name: 'Logam', value: 15, color: '#6366F1', totalKg: 12300 },
  { name: 'Kaca', value: 10, color: '#EC4899', totalKg: 8200 },
  { name: 'Organik', value: 15, color: '#8B5CF6', totalKg: 12300 },
];

// Data dummy untuk performa bulanan
const monthlyPerformanceData = [
  { name: 'Jan', sampah: 8500, ecoBuddy: 850, partisipasi: 62 },
  { name: 'Feb', sampah: 7800, ecoBuddy: 865, partisipasi: 65 },
  { name: 'Mar', sampah: 9200, ecoBuddy: 890, partisipasi: 68 },
  { name: 'Apr', sampah: 10100, ecoBuddy: 925, partisipasi: 72 },
  { name: 'Mei', sampah: 11200, ecoBuddy: 960, partisipasi: 75 },
  { name: 'Jun', sampah: 12400, ecoBuddy: 1010, partisipasi: 78 },
  { name: 'Jul', sampah: 13100, ecoBuddy: 1070, partisipasi: 82 },
  { name: 'Agu', sampah: 14200, ecoBuddy: 1120, partisipasi: 85 },
  { name: 'Sep', sampah: 15300, ecoBuddy: 1180, partisipasi: 88 },
  { name: 'Okt', sampah: 16500, ecoBuddy: 1220, partisipasi: 90 },
  { name: 'Nov', sampah: 17600, ecoBuddy: 1235, partisipasi: 92 },
  { name: 'Des', sampah: 18200, ecoBuddy: 1240, partisipasi: 94 },
];

// Data dummy untuk performa tahunan
const yearlyPerformanceData = [
  { name: '2020', sampah: 65000, ecoBuddy: 550, partisipasi: 42 },
  { name: '2021', sampah: 82000, ecoBuddy: 720, partisipasi: 58 },
  { name: '2022', sampah: 98000, ecoBuddy: 920, partisipasi: 72 },
  { name: '2023', sampah: 112000, ecoBuddy: 1100, partisipasi: 85 },
  { name: '2024', sampah: 125780, ecoBuddy: 1240, partisipasi: 94 },
];

// Data dummy untuk tren kontribusi
const contributionTrendData = [
  { month: 'Jan', individu: 5500, komunitas: 3000, perusahaan: 2000 },
  { month: 'Feb', individu: 5200, komunitas: 2600, perusahaan: 2400 },
  { month: 'Mar', individu: 6100, komunitas: 3100, perusahaan: 2800 },
  { month: 'Apr', individu: 6500, komunitas: 3600, perusahaan: 3200 },
  { month: 'Mei', individu: 7100, komunitas: 4100, perusahaan: 3500 },
  { month: 'Jun', individu: 7800, komunitas: 4600, perusahaan: 3800 },
];

// Data untuk prediksi tren
const predictionTrendData = [
  { month: 'Jan', actual: 8500, predicted: 8700 },
  { month: 'Feb', actual: 7800, predicted: 8100 },
  { month: 'Mar', actual: 9200, predicted: 9000 },
  { month: 'Apr', actual: 10100, predicted: 9800 },
  { month: 'Mei', actual: 11200, predicted: 10900 },
  { month: 'Jun', actual: 12400, predicted: 12100 },
  { month: 'Jul', actual: null, predicted: 13400 },
  { month: 'Agu', actual: null, predicted: 14500 },
  { month: 'Sep', actual: null, predicted: 15800 },
];

// Data untuk pelacakan target
const targetTrackingData = [
  { kategori: 'Plastik', target: 30000, dicapai: 28750, persentase: 95.8 },
  { kategori: 'Kertas', target: 22000, dicapai: 20500, persentase: 93.2 },
  { kategori: 'Logam', target: 15000, dicapai: 12300, persentase: 82.0 },
  { kategori: 'Kaca', target: 10000, dicapai: 8200, persentase: 82.0 },
  { kategori: 'Organik', target: 15000, dicapai: 12300, persentase: 82.0 },
];

// Component for Reports and Analysis Page
const ReportsAnalysis = () => {
  const [activeTab, setActiveTab] = useState('sampah');
  const [timeFrame, setTimeFrame] = useState('bulanan');
  const [selectedWasteView, setSelectedWasteView] = useState('ecohive');
  const [selectedRegion, setSelectedRegion] = useState('semua');

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideFromBottom = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Helper function untuk menampilkan status target
  const getTargetStatus = (percentage) => {
    if (percentage >= 90) return { label: 'Sangat Baik', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    if (percentage >= 75) return { label: 'Baik', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    if (percentage >= 50) return { label: 'Cukup', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    return { label: 'Perlu Perhatian', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200 dark:bg-gray-900">
      {/* Header */}
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
          Laporan dan Analisis
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Rekap data komprehensif tentang pengumpulan sampah dan tren kontribusi EcoHive
        </motion.p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            className={`${
              activeTab === 'sampah'
                ? 'border-teal-600 text-teal-600 dark:text-teal-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('sampah')}
          >
            Rekap Data Sampah
          </button>
          <button
            className={`${
              activeTab === 'performa'
                ? 'border-teal-600 text-teal-600 dark:text-teal-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('performa')}
          >
            Grafik Performa
          </button>
          <button
            className={`${
              activeTab === 'tren'
                ? 'border-teal-600 text-teal-600 dark:text-teal-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('tren')}
          >
            Analisis Tren Kontribusi
          </button>
        </nav>
      </div>

      {/* Content for Rekap Data Sampah Tab */}
      {activeTab === 'sampah' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          {/* Filter Controls */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
            variants={fadeIn}
          >
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedWasteView === 'ecohive' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedWasteView('ecohive')}
              >
                Per EcoHive
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedWasteView === 'wilayah' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedWasteView('wilayah')}
              >
                Per Wilayah
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedWasteView === 'jenis' 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedWasteView('jenis')}
              >
                Per Jenis Sampah
              </button>
            </div>
            
            <div className="relative">
              <select
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="semua">Semua Wilayah</option>
                <option value="jakarta_utara">Jakarta Utara</option>
                <option value="jakarta_selatan">Jakarta Selatan</option>
                <option value="jakarta_timur">Jakarta Timur</option>
                <option value="jakarta_barat">Jakarta Barat</option>
                <option value="jakarta_pusat">Jakarta Pusat</option>
              </select>
            </div>
          </motion.div>

          {/* Per EcoHive View */}
          {selectedWasteView === 'ecohive' && (
            <motion.div variants={fadeIn}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Rekap Data Sampah per EcoHive</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={ecoHiveWasteData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          borderColor: '#374151',
                          color: '#F9FAFB'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="plastik" name="Plastik (kg)" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="kertas" name="Kertas (kg)" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="logam" name="Logam (kg)" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="kaca" name="Kaca (kg)" stackId="a" fill="#EC4899" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="organik" name="Organik (kg)" stackId="a" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">EcoHive</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plastik</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kertas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Logam</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kaca</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organik</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {ecoHiveWasteData.map((item) => (
                        <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-900 dark:text-white">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.plastik} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.kertas} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.logam} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.kaca} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.organik} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <span className="font-medium text-teal-600 dark:text-teal-400">
                              {item.plastik + item.kertas + item.logam + item.kaca + item.organik} kg
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Per Wilayah View */}
          {selectedWasteView === 'wilayah' && (
            <motion.div variants={fadeIn}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Rekap Data Sampah per Wilayah</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={regionalWasteData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#374151',
                            color: '#F9FAFB'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="total" name="Total Sampah (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={regionalWasteData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis yAxisId="left" stroke="#9CA3AF" />
                        <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#374151',
                            color: '#F9FAFB'
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="total" name="Total Sampah (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="pertumbuhan" name="Pertumbuhan (%)" stroke="#EC4899" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="mt-8 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wilayah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Sampah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pertumbuhan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jumlah EcoHive</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jumlah EcoBuddy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {regionalWasteData.map((item) => (
                        <tr key={item.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-900 dark:text-white">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.total} kg</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            <span className="text-green-600 dark:text-green-400">+{item.pertumbuhan}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{Math.round(item.total / 1800)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{Math.round(item.total / 58)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Per Jenis Sampah View */}
          {selectedWasteView === 'jenis' && (
            <motion.div variants={fadeIn}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Rekap Data per Jenis Sampah</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={wasteTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                            color: '#F9FAFB'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-teal-800 dark:text-teal-400 mb-4">Pencapaian Target per Jenis Sampah</h4>
                    {targetTrackingData.map((item) => (
                      <div key={item.kategori} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.kategori}</span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.persentase}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-teal-600 h-2.5 rounded-full"
                            style={{ width: `${item.persentase}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{item.dicapai} kg</span>
                          <span>Target: {item.target} kg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jenis Sampah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total (kg)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Persentase</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {targetTrackingData.map((item) => {
                        const status = getTargetStatus(item.persentase);
                        return (
                          <tr key={item.kategori} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-900 dark:text-white">{item.kategori}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.dicapai}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.persentase}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.target} kg</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                {status.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Content for Grafik Performa Tab */}
      {activeTab === 'performa' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          {/* Time Frame Filter */}
          <motion.div 
            className="flex justify-start mb-6"
            variants={fadeIn}
          >
            <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeFrame === 'bulanan' 
                    ? 'bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white'
                }`}
                onClick={() => setTimeFrame('bulanan')}
              >
                Bulanan
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeFrame === 'tahunan' 
                    ? 'bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white'
                }`}
                onClick={() => setTimeFrame('tahunan')}
              >
                Tahunan
              </button>
            </div>
          </motion.div>
          
          {/* Performance Chart */}
          <motion.div 
            className="grid grid-cols-1 gap-6 mb-8"
            variants={fadeIn}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">
                {timeFrame === 'bulanan' ? 'Performa Bulanan' : 'Performa Tahunan'}
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={timeFrame === 'bulanan' ? monthlyPerformanceData : yearlyPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      yAxisId="left" 
                      stroke="#9CA3AF"
                      label={{ 
                        value: 'Total Sampah (kg)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#9CA3AF' }
                      }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#9CA3AF"
                      label={{ 
                        value: 'EcoBuddy & Partisipasi', 
                        angle: 90, 
                        position: 'insideRight',
                        style: { textAnchor: 'middle', fill: '#9CA3AF' }
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="sampah" 
                      name="Total Sampah (kg)" 
                      fill="#10B981" 
                      stroke="#10B981"
                      fillOpacity={0.2}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="ecoBuddy" 
                      name="EcoBuddy Aktif" 
                      fill="#6366F1" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="partisipasi" 
                      name="Tingkat Partisipasi (%)" 
                      stroke="#EC4899" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
          
          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            variants={staggerItems}
          >
            {/* Growth Rate */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Pertumbuhan Pengumpulan Sampah</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeFrame === 'bulanan' ? monthlyPerformanceData : yearlyPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sampah" 
                      name="Total Sampah (kg)" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Performa EcoBuddy */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Korelasi EcoBuddy & Partisipasi</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="ecoBuddy" 
                      name="EcoBuddy" 
                      stroke="#9CA3AF"
                      label={{
                        value: 'Jumlah EcoBuddy',
                        position: 'insideBottomRight',
                        offset: -10,
                        style: { textAnchor: 'end', fill: '#9CA3AF' }
                      }}
                    />
                    <YAxis 
                      dataKey="partisipasi" 
                      name="Partisipasi" 
                      stroke="#9CA3AF"
                      label={{
                        value: 'Tingkat Partisipasi (%)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#9CA3AF' }
                      }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(value) => `EcoBuddy: ${value}`}
                    />
                    <Scatter 
                      name="EcoBuddy vs Partisipasi" 
                      data={timeFrame === 'bulanan' ? monthlyPerformanceData : yearlyPerformanceData} 
                      fill="#6366F1"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Prediksi Performa */}
          <motion.div
            className="mb-8"
            variants={fadeIn}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Prediksi vs Performa Aktual</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={predictionTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      name="Prediksi (kg)" 
                      fillOpacity={0.2}
                      fill="#EC4899" 
                      stroke="#EC4899"
                      strokeDasharray="5 5" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Aktual (kg)" 
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-teal-800 dark:text-teal-400 mb-2">Analisis Prediksi</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Berdasarkan tren saat ini, diproyeksikan pengumpulan sampah akan mencapai <span className="font-medium text-teal-600 dark:text-teal-500">158.000 kg</span> pada akhir tahun, 
                  melebihi target tahunan sebesar <span className="font-medium text-teal-600 dark:text-teal-500">150.000 kg</span>. 
                  Terdapat peningkatan signifikan sebesar <span className="font-medium text-teal-600 dark:text-teal-500">12%</span> dibandingkan performa tahun lalu.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Content for Analisis Tren Kontribusi Tab */}
      {activeTab === 'tren' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          {/* Tren Kontribusi Chart */}
          <motion.div 
            className="mb-8"
            variants={fadeIn}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Tren Kontribusi Berdasarkan Sumber</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={contributionTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    stackOffset="expand"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${Math.floor(value * 100)}%`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value} kg`, name]}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        borderColor: '#374151',
                        color: '#F9FAFB'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="individu" 
                      name="Individu" 
                      stackId="1"
                      stroke="#10B981" 
                      fill="#10B981" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="komunitas" 
                      name="Komunitas" 
                      stackId="1"
                      stroke="#6366F1" 
                      fill="#6366F1" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="perusahaan" 
                      name="Perusahaan" 
                      stackId="1"
                      stroke="#EC4899" 
                      fill="#EC4899" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">Kontribusi Individu</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    Meningkat <span className="font-medium text-green-600 dark:text-green-400">12%</span> dari bulan sebelumnya
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tren: </span>
                    <span className="ml-2 text-green-600 dark:text-green-400 flex items-center">
                      <i data-feather="trending-up" className="h-4 w-4 mr-1"></i> Meningkat
                    </span>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-800 dark:text-indigo-400 mb-2">Kontribusi Komunitas</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    Meningkat <span className="font-medium text-indigo-600 dark:text-indigo-400">15%</span> dari bulan sebelumnya
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tren: </span>
                    <span className="ml-2 text-indigo-600 dark:text-indigo-400 flex items-center">
                      <i data-feather="trending-up" className="h-4 w-4 mr-1"></i> Meningkat Pesat
                    </span>
                  </div>
                </div>
                
                <div className="bg-pink-50 dark:bg-pink-900 dark:bg-opacity-20 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-800 dark:text-pink-400 mb-2">Kontribusi Perusahaan</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    Meningkat <span className="font-medium text-pink-600 dark:text-pink-400">9%</span> dari bulan sebelumnya
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tren: </span>
                    <span className="ml-2 text-pink-600 dark:text-pink-400 flex items-center">
                      <i data-feather="trending-up" className="h-4 w-4 mr-1"></i> Meningkat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Analisis Detail Kontribusi */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            variants={staggerItems}
          >
            {/* Statistik Utama */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Statistik Kontribusi</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Rata-rata kontribusi per EcoBuddy</span>
                    <span className="font-medium text-teal-600 dark:text-teal-500">101.4 kg</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Target: 130 kg</span>
                    <span>78% tercapai</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Tingkat partisipasi EcoBuddy</span>
                    <span className="font-medium text-teal-600 dark:text-teal-500">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Target: 85%</span>
                    <span>110% tercapai</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Pertumbuhan EcoBuddy baru</span>
                    <span className="font-medium text-teal-600 dark:text-teal-500">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Target: 20%</span>
                    <span>75% tercapai</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Efisiensi EcoHive</span>
                    <span className="font-medium text-teal-600 dark:text-teal-500">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>Target: 92%</span>
                    <span>95% tercapai</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20 rounded-lg">
                <h4 className="font-medium text-teal-800 dark:text-teal-400 mb-2">Insight</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Tingkat partisipasi EcoBuddy telah melampaui target, namun rata-rata kontribusi per EcoBuddy masih perlu ditingkatkan.
                  Program edukasi dan insentif baru diperlukan untuk meningkatkan volume kontribusi.
                </p>
              </div>
            </motion.div>
            
            {/* Rekomendasi Tindakan */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-6">Rekomendasi Tindakan</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    1
                  </span>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Tingkatkan Program Edukasi</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Luncurkan kampanye edukasi baru tentang pemilahan sampah untuk meningkatkan kualitas sampah yang dikumpulkan.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                    2
                  </span>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Tambah Lokasi EcoHive</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Prioritaskan penambahan lokasi EcoHive di Jakarta Timur dan Jakarta Selatan sesuai data pertumbuhan.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 rounded-full">
                    3
                  </span>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Kemitraan Perusahaan</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Perluas kemitraan dengan perusahaan untuk meningkatkan kontribusi sampah dan dukungan finansial.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                    4
                  </span>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Program Insentif</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Tingkatkan program insentif untuk EcoBuddy aktif dengan reward yang lebih menarik dan bermanfaat.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <i data-feather="file-text" className="h-5 w-5 mr-2"></i>
                  Download Laporan Lengkap
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Dampak Lingkungan */}
           <motion.div 
            className="mb-8"
            variants={fadeIn}
          >
            <div className="bg-gradient-to-r from-teal-700 to-lime-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Dampak Lingkungan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
    <h4 className="text-2xl font-bold mb-2">1,250 ton</h4>
    <p className="text-sm">Total Sampah Plastik Terdaur Ulang</p>
    <div className="mt-2 text-xs">
      <span className="inline-flex items-center px-2 py-1 bg-green-500 bg-opacity-30 rounded-full">
        <i data-feather="arrow-up" className="h-3 w-3 mr-1"></i>
        22% dari tahun lalu
      </span>
    </div>
  </div>
  
  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
    <h4 className="text-2xl font-bold mb-2">875 ton</h4>
    <p className="text-sm">Pengurangan Emisi Karbon</p>
    <div className="mt-2 text-xs">
      <span className="inline-flex items-center px-2 py-1 bg-green-500 bg-opacity-30 rounded-full">
        <i data-feather="arrow-up" className="h-3 w-3 mr-1"></i>
        18% dari tahun lalu
      </span>
    </div>
  </div>
  
  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
    <h4 className="text-2xl font-bold mb-2">3,400</h4>
    <p className="text-sm">Pohon Terselamatkan</p>
    <div className="mt-2 text-xs">
      <span className="inline-flex items-center px-2 py-1 bg-green-500 bg-opacity-30 rounded-full">
        <i data-feather="arrow-up" className="h-3 w-3 mr-1"></i>
        26% dari tahun lalu
      </span>
    </div>
  </div>
</div>

<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <h4 className="font-medium mb-3">Dampak Terhadap Pengelolaan Sampah Kota</h4>
    <p className="text-sm opacity-90 mb-4">
      Program EcoHive telah berkontribusi mengurangi beban TPA hingga 15% dan memperpanjang usia penggunaan TPA setidaknya 5 tahun lebih lama.
    </p>
    
    <div className="flex items-center mt-2">
      <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5">
        <div className="bg-white h-1.5 rounded-full" style={{ width: '15%' }}></div>
      </div>
      <span className="ml-2 text-sm font-medium">15%</span>
    </div>
    <p className="text-xs mt-1 opacity-80">Persentase pengurangan sampah di TPA</p>
  </div>
  
  <div>
    <h4 className="font-medium mb-3">Dampak Sosial-Ekonomi</h4>
    <p className="text-sm opacity-90">
      Telah menciptakan lebih dari 250 lapangan kerja baru dalam industri daur ulang dan memberikan pendapatan tambahan bagi 1,500+ EcoBuddy aktif.
    </p>
    
    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center">
        <i data-feather="briefcase" className="h-4 w-4 mr-2"></i>
        <span>250+ lapangan kerja baru</span>
      </div>
      <div className="flex items-center">
        <i data-feather="users" className="h-4 w-4 mr-2"></i>
        <span>1,500+ EcoBuddy terbantu</span>
      </div>
    </div>
  </div>
</div>
           </div>
          </motion.div>
          
          {/* Achievement & Recognition */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            variants={staggerItems}
          >
            {/* Achievement */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Pencapaian Program</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                      <i data-feather="award" className="h-5 w-5 text-teal-600 dark:text-teal-400"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Program Daur Ulang Terbaik 2025</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Dianugerahi oleh Kementerian Lingkungan Hidup dan Kehutanan sebagai program daur ulang sampah terbaik.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <i data-feather="star" className="h-5 w-5 text-green-600 dark:text-green-400"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Top 10 Inovasi Lingkungan</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Terpilih sebagai salah satu dari 10 inovasi lingkungan terbaik oleh Indonesia Climate Change Forum.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <i data-feather="shield" className="h-5 w-5 text-blue-600 dark:text-blue-400"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Sertifikasi Karbon Biru</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Program EcoHive telah mendapatkan sertifikasi Karbon Biru yang menunjukkan kontribusi dalam mengurangi emisi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Media Coverage */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Liputan Media</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-teal-600 dark:border-teal-500 pl-4">
                  <p className="italic text-gray-600 dark:text-gray-300 text-sm">
                    "EcoHive telah membuktikan bahwa model bisnis berkelanjutan dapat memberikan dampak positif yang signifikan bagi lingkungan dan masyarakat."
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    - Kompas, April 2025
                  </p>
                </div>
                
                <div className="border-l-4 border-indigo-600 dark:border-indigo-500 pl-4">
                  <p className="italic text-gray-600 dark:text-gray-300 text-sm">
                    "Pendekatan inovatif EcoHive dalam pengelolaan sampah dapat menjadi model bagi kota-kota lain di Indonesia untuk mengatasi krisis sampah."
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    - National Geographic Indonesia, Maret 2025
                  </p>
                </div>
                
                <div className="border-l-4 border-green-600 dark:border-green-500 pl-4">
                  <p className="italic text-gray-600 dark:text-gray-300 text-sm">
                    "EcoHive tidak hanya menciptakan solusi lingkungan, tetapi juga memberdayakan ekonomi lokal melalui sistem insentif yang inovatif."
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    - The Jakarta Post, Mei 2025
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="grid grid-cols-4 gap-4">
                  <img src="/api/placeholder/80/30" alt="Media 1" className="grayscale hover:grayscale-0 transition-all" />
                  <img src="/api/placeholder/80/30" alt="Media 2" className="grayscale hover:grayscale-0 transition-all" />
                  <img src="/api/placeholder/80/30" alt="Media 3" className="grayscale hover:grayscale-0 transition-all" />
                  <img src="/api/placeholder/80/30" alt="Media 4" className="grayscale hover:grayscale-0 transition-all" />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Call To Action */}
          <motion.div
            className="mb-6"
            variants={fadeIn}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">Bergabunglah Dengan EcoHive</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Berkontribusilah dalam menciptakan Indonesia yang lebih bersih dan berkelanjutan. Jadilah bagian dari solusi untuk masalah sampah di Indonesia.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
                >
                  <i data-feather="user-plus" className="h-5 w-5 mr-2 text-white"></i>
                  Daftar Sebagai EcoBuddy
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200"
                >
                  <i data-feather="briefcase" className="h-5 w-5 mr-2"></i>
                  Kemitraan Perusahaan
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div> 
      )}

    </div> 
  );
};

export default ReportsAnalysis;