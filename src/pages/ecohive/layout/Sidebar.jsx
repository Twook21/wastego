import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../../assets/logo.png";
import {
  BarChart3,
  ClipboardList,
  Users,
  FileBarChart,
  MessageSquare,
  Settings,
  Home,
  X,
  Recycle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  currentSection,
  setMinimized,
}) => {
  const [minimized, setMinimizedLocal] = useState(false);

  const toggleMinimize = () => {
    const newMinimizedState = !minimized;
    setMinimizedLocal(newMinimizedState);
    // Also inform parent component
    if (setMinimized) {
      setMinimized(newMinimizedState);
    }
  };

  // Animation variants to match HomePage
  const slideFromLeft = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideFromLeft}
      className={`fixed inset-y-0 left-0 z-30 ${minimized ? "w-20" : "w-64"} 
      bg-teal-900 dark:bg-gray-800 text-white transform 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
      transition-all duration-300 ease-in-out shadow-lg flex flex-col`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-teal-800 dark:border-gray-700">
        <div className="flex items-center space-x-2 overflow-hidden">
          {!minimized && (
            <motion.div className="flex flex-col items-center">
              <img
                src={Logo}
                alt="EcoHive Logo"
                className="w-full h-6 object-contain"
              />
            </motion.div>
          )}
        </div>
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMinimize}
            className="hidden md:block p-1 mr-1 hover:bg-lime-500 hover:text-teal-900 rounded-md transition-colors"
          >
            {minimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-lime-500 hover:text-teal-900 rounded-md transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>

      <div className={`px-4 py-6 ${minimized ? "px-2" : "px-4"} flex-grow`}>
        {!minimized && (
          <motion.p
            variants={fadeIn}
            className="text-xs uppercase text-gray-300 mb-4 font-medium pl-3"
          >
            Menu Utama
          </motion.p>
        )}
        <motion.nav
          className="space-y-2"
          variants={staggerItems}
          initial="hidden"
          animate="visible"
        >
          <NavLinkItem
            to="/ecohive/dashboard"
            icon={<BarChart3 size={20} />}
            label="Dashboard"
            description="Lihat ringkasan data dan statistik"
            isActive={currentSection === "dashboard"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecohive/deposit-management"
            icon={<ClipboardList size={20} />}
            label="Manajemen Setoran"
            description="Kelola setoran sampah dari pengguna"
            isActive={currentSection === "setoran"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecohive/ecobuddy"
            icon={<Users size={20} />}
            label="Data EcoBuddy"
            description="Informasi pengguna dan mitra daur ulang"
            isActive={currentSection === "ecobuddy"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecohive/report"
            icon={<FileBarChart size={20} />}
            label="Laporan"
            description="Lihat dan unduh laporan kinerja"
            isActive={currentSection === "laporan"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecohive/notification"
            icon={<MessageSquare size={20} />}
            label="Pesan"
            description="Notifikasi dan komunikasi"
            isActive={currentSection === "pesan"}
            minimized={minimized}
          />
        </motion.nav>

        {!minimized && (
          <motion.p
            variants={fadeIn}
            className="text-xs uppercase text-gray-300 mt-8 mb-4 font-medium pl-3"
          >
            Lainnya
          </motion.p>
        )}
        <motion.nav
          className={`space-y-2 ${minimized ? "mt-8" : ""}`}
          variants={staggerItems}
          initial="hidden"
          animate="visible"
        >
          {/* <NavLinkItem 
            to="/ecohive/settings"
            icon={<Settings size={20} />}
            label="Pengaturan"
            description="Konfigurasi sistem dan preferensi"
            isActive={false}
            minimized={minimized}
          /> */}
          <NavLinkItem
            to="/"
            icon={<Home size={20} />}
            label="Halaman Utama"
            description="Kembali ke halaman utama WasteGo"
            isActive={false}
            minimized={minimized}
          />
        </motion.nav>
      </div>

      {/* Footer Section - Hidden when minimized */}
      {!minimized && (
        <motion.div
          variants={fadeIn}
          className="mt-auto border-t border-teal-800 dark:border-gray-700 p-4 flex justify-center"
        >
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-200 mb-2">
              EcoHive Panel
            </p>
            <div className="pt-2 border-t border-lime-500 text-xs text-center text-gray-400">
              <p>© {new Date().getFullYear()} WasteGo. Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

// Extracted NavLink component with tooltip
const NavLinkItem = ({ to, icon, label, description, isActive, minimized }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      variants={fadeIn}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <NavLink
        to={to}
        className={({ isActive: routerActive }) =>
          `flex items-center ${
            minimized ? "justify-center" : "px-3"
          } py-3 text-base font-medium rounded-md transition-all duration-200
          ${
            routerActive || isActive
              ? "bg-lime-500 text-teal-900 shadow-md"
              : "hover:bg-teal-800 dark:hover:bg-gray-700 hover:scale-105"
          }`
        }
      >
        <motion.div
          className={minimized ? "" : "mr-3"}
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          {icon}
        </motion.div>
        {!minimized && <span>{label}</span>}
      </NavLink>
      
      {/* Tooltip */}
      {showTooltip && (minimized || true) && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tooltipVariants}
          className={`absolute ${minimized ? "left-20" : "left-full"} top-0 ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md shadow-lg z-50 w-48`}
        >
          <div className="relative">
            <div className="absolute -left-2 top-3 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
            <p className="font-bold text-sm">{label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;