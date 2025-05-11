import { useState, useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [contentSubTab, setContentSubTab] = useState('blog')
  const { darkMode } = useContext(ThemeContext)
  
  // Demo data
  const stats = {
    totalUsers: 5842,
    activeCollectors: 312,
    totalCollections: 14587,
    wasteCollected: 8754,
    recycledMaterials: 5321,
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">Aktivitas Terbaru</h4>
              <ul className="space-y-4">
                {['Pengguna baru (Andi)', 'Pengumpulan di Jakarta Pusat', 'Event daur ulang dibuat'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">Grafik Statistik</h4>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Grafik akan ditampilkan di sini</span>
              </div>
            </div>
          </div>
        )
      case 'users':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-teal-900 dark:text-white">Daftar Pengguna</h4>
              <button className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition">
                + Tambah Pengguna
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[1,2,3].map(i => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">User {i}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">user{i}@example.com</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Pengguna</td>
                      <td className="px-6 py-4">
                        <button className="text-lime-500 hover:text-lime-600 mr-4">Edit</button>
                        <button className="text-red-500 hover:text-red-600">Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'recycle':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-teal-900 dark:text-white mb-6">Data Daur Ulang</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-lime-50 dark:bg-gray-700 p-6 rounded-lg">
                <h5 className="text-lime-600 dark:text-lime-400 font-semibold mb-2">Material Terdaur Ulang</h5>
                <p className="text-3xl font-bold text-teal-900 dark:text-white">{stats.recycledMaterials} kg</p>
              </div>
              <div className="bg-lime-50 dark:bg-gray-700 p-6 rounded-lg">
                <h5 className="text-lime-600 dark:text-lime-400 font-semibold mb-2">Pemrosesan Bulan Ini</h5>
                <p className="text-3xl font-bold text-teal-900 dark:text-white">84%</p>
              </div>
              <div className="bg-lime-50 dark:bg-gray-700 p-6 rounded-lg">
                <h5 className="text-lime-600 dark:text-lime-400 font-semibold mb-2">Limbah Tersisa</h5>
                <p className="text-3xl font-bold text-teal-900 dark:text-white">15%</p>
              </div>
            </div>
          </div>
        )
      case 'content':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-4">
                {['blog', 'artikel', 'event'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setContentSubTab(tab)}
                    className={`pb-4 px-1 ${
                      contentSubTab === tab 
                        ? 'border-b-2 border-lime-500 text-lime-600 dark:text-lime-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
            <div>
              {contentSubTab === 'blog' && (
                <div>
                  <h5 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">Manajemen Blog</h5>
                  {/* Blog content management */}
                </div>
              )}
              {contentSubTab === 'artikel' && (
                <div>
                  <h5 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">Manajemen Artikel</h5>
                  {/* Artikel content management */}
                </div>
              )}
              {contentSubTab === 'event' && (
                <div>
                  <h5 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">Manajemen Event</h5>
                  {/* Event management */}
                </div>
              )}
            </div>
          </div>
        )
      default:
        return <div>Konten sedang dikembangkan</div>
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className="bg-teal-900 dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Tabs Navigation */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6 overflow-x-auto">
              {['overview', 'users', 'collectors', 'waste', 'recycle', 'content', 'settings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab 
                        ? 'border-lime-500 text-teal-900 dark:text-white' 
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Pengguna Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-lime-100 dark:bg-lime-900 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-lime-600 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-8 8a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 00-2-2h-1.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 14H5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Pengguna</p>
                  <p className="text-2xl font-bold text-teal-900 dark:text-white">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            {/* Tambahkan stat card lainnya dengan pola yang sama */}
            
          </div>

          {/* Main Content */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboardPage