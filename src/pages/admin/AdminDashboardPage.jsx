import { useState, useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { darkMode } = useContext(ThemeContext)
  
  // Demo data (replace with actual data from API)
  const stats = {
    totalUsers: 5842,
    activeCollectors: 312,
    totalCollections: 14587,
    wasteCollected: 8754, // in kg
  }
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <header className="bg-teal-700 dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard tabs */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`${
                  activeTab === 'overview'
                    ? 'border-lime-400 dark:border-lime-400-light text-teal-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`${
                  activeTab === 'users'
                    ? 'border-lime-400 dark:border-lime-400-light text-teal-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                onClick={() => setActiveTab('users')}
              >
                Pengguna
              </button>
              <button
                className={`${
                  activeTab === 'collectors'
                    ? 'border-lime-400 dark:border-lime-400-light text-teal-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                onClick={() => setActiveTab('collectors')}
              >
                Pengumpul
              </button>
              <button
                className={`${
                  activeTab === 'waste'
                    ? 'border-lime-400 dark:border-lime-400-light text-teal-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                onClick={() => setActiveTab('waste')}
              >
                Data Sampah
              </button>
              <button
                className={`${
                  activeTab === 'settings'
                    ? 'border-lime-400 dark:border-lime-400-light text-teal-700 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                onClick={() => setActiveTab('settings')}
              >
                Pengaturan
              </button>
            </nav>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 rounded-md p-3">
                    <svg className="h-6 w-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zm-8 8a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 00-2-2h-1.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-1.414 0l-1.414-1.414A1 1 0 009.586 14H5z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Pengguna</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-teal-700 dark:text-white">{stats.totalUsers.toLocaleString()}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 rounded-md p-3">
                    <svg className="h-6 w-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1v-3h-3.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H15V8h-1.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H16V5a1 1 0 00-1-1H3z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pengumpul Aktif</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-teal-700 dark:text-white">{stats.activeCollectors.toLocaleString()}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 rounded-md p-3">
                    <svg className="h-6 w-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5v2h5v8H4V6a2 2 0 012-2h5V2H6a2 2 0 00-2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Pengumpulan</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-teal-700 dark:text-white">{stats.totalCollections.toLocaleString()}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 rounded-md p-3">
                    <svg className="h-6 w-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2h12v4H4V3zm0 6v6h12V9H4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Sampah (kg)</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-teal-700 dark:text-white">{stats.wasteCollected.toLocaleString()}</div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab content would go here - simplified for this example */}
          <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition-colors">
            <h3 className="text-lg font-medium text-teal-700 dark:text-white mb-4">
              {activeTab === 'overview' && 'Ringkasan Aktivitas'}
              {activeTab === 'users' && 'Manajemen Pengguna'}
              {activeTab === 'collectors' && 'Manajemen Pengumpul'}
              {activeTab === 'waste' && 'Data Pengumpulan Sampah'}
              {activeTab === 'settings' && 'Pengaturan Aplikasi'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {activeTab === 'overview' && 'Ikhtisar aktivitas aplikasi dan statistik utama.'}
              {activeTab === 'users' && 'Kelola pengguna, lihat aktivitas, dan atur tingkat akses.'}
              {activeTab === 'collectors' && 'Kelola pengumpul sampah, rute, dan jadwal pengambilan.'}
              {activeTab === 'waste' && 'Analisis data pengumpulan sampah dan statistik daur ulang.'}
              {activeTab === 'settings' && 'Atur pengaturan aplikasi, notifikasi, dan integrasi.'}
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Konten tab ini akan diimplementasikan sesuai dengan kebutuhan aplikasi Anda.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboardPage