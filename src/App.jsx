import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// route landing page
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DownloadPage from "./pages/DownloadPage";
import ContactPage from "./pages/ContactPage";
// route auth
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
// route EcoHive
import EcoHiveDashboard from "./pages/ecohive/Dashboard";
import EcoHiveDepositManagement from "./pages/ecohive/DepositManagement";
import EcoHiveBuddyManagement from "./pages/ecohive/EcoBuddyManagement";
import EcoHiveReportsManagement from "./pages/ecohive/Reports";
import EcoHiveNotification from "./pages/ecohive/Notification";
import EcoHiveProfile from "./pages/ecohive/ProfilePage";
// route EcoCentral
import EcoCentralDashboard from "./pages/ecocentral/Dashboard";
import EcoCentralManagement from "./pages/ecocentral/EcoCentralManagement";
import EcoCentralBuddyManagement from "./pages/ecocentral/EcoBuddyManagement";
import EcoCentralHiveManagement from "./pages/ecocentral/EcoHiveManagement";
import EcoCentralReportsManagement from "./pages/ecocentral/Reports";
import EcoCentralNotification from "./pages/ecocentral/EcoCentralNotification";
import EcoCentralProfile from "./pages/ecocentral/ProfilePage";
import EcoCentralSystemSettingsPage from "./pages/ecocentral/SystemSettingsPage";
// Import the updated EcoHiveLayout component directly
import EcoHiveLayout from "./pages/ecohive/layout/EcoHiveLayout";
// Import the updated EcoCEntralLayout component directly
import EcoCentralLayout from "./pages/ecocentral/layout/EcoCentralLayout";
// route navbar dan footer landing page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeContext from "./context/ThemeContext";
import ThemeToggle from './components/ThemeToggle';
import NotFoundPage from "./pages/NotFoundPage";

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

// Layout component for pages with regular layout (navbar + content + footer)
function RegularLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}

function AuthLayout({ children }) {
  return <main className="flex-grow">{children}</main>;
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router basename={import.meta.env.BASE_URL}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              {/* EcoHive Routes - Use Outlet pattern */}
              <Route path="/ecohive" element={<EcoHiveLayout />}>
                <Route path="dashboard" element={<EcoHiveDashboard />} />
                <Route path="profile" element={<EcoHiveProfile />} />
                <Route
                  path="deposit-management"
                  element={<EcoHiveDepositManagement />}
                />
                <Route path="ecobuddy" element={<EcoHiveBuddyManagement />} />
                <Route path="report" element={<EcoHiveReportsManagement />} />
                <Route path="notification" element={<EcoHiveNotification />} />
                {/* Add other EcoHive routes here */}
              </Route>
              <Route path="/ecocentral" element={<EcoCentralLayout />}>
                <Route path="dashboard" element={<EcoCentralDashboard />} />
                <Route path="profile" element={<EcoCentralProfile />} />
                <Route path="management" element={<EcoCentralManagement />} />
                <Route
                  path="ecobuddy"
                  element={<EcoCentralBuddyManagement />}
                />
                <Route path="ecohive" element={<EcoCentralHiveManagement />} />
                <Route
                  path="report"
                  element={<EcoCentralReportsManagement />}
                />
                <Route
                  path="notification"
                  element={<EcoCentralNotification />}
                />
                <Route
                  path="settings"
                  element={<EcoCentralSystemSettingsPage />}
                />
              </Route>

              {/* Auth routes without Navbar */}
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthLayout>
                    <RegisterPage />
                  </AuthLayout>
                }
              />

              {/* Regular routes with Navbar */}
              <Route
                path="/"
                element={
                  <RegularLayout>
                    <HomePage />
                  </RegularLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <RegularLayout>
                    <AboutPage />
                  </RegularLayout>
                }
              />
              <Route
                path="/download"
                element={
                  <RegularLayout>
                    <DownloadPage />
                  </RegularLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <RegularLayout>
                    <ContactPage />
                  </RegularLayout>
                }
              />
              <Route
                path="*"
                element={
                  <RegularLayout>
                    <NotFoundPage />
                  </RegularLayout>
                }
              />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
