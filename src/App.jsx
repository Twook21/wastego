import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DownloadPage from './pages/DownloadPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeContext from './context/ThemeContext';
import NotFoundPage from './pages/NotFoundPage';

function ErrorFallback({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-gray-800">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Terjadi Kesalahan!
        </h2>
        <pre className="text-sm text-red-500 dark:text-red-300 whitespace-pre-wrap">
          {error.message}
        </pre>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Muat Ulang Halaman
        </button>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router basename={import.meta.env.BASE_URL}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className={`flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200`}>
            <Navbar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/download" element={<DownloadPage />} />
                
                {/* Admin routes tanpa proteksi */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;