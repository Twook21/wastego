import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Hexagon,
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
                alt="ecocentral Logo"
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
            className="hidden md:block p-1 mr-2 hover:bg-lime-500 hover:text-teal-900 rounded-md transition-colors"
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
            to="/ecocentral/dashboard"
            icon={<BarChart3 size={20} />}
            label="Dashboard"
            description="Lihat ringkasan data dan statistik"
            isActive={currentSection === "dashboard"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecocentral/management"
            icon={<ClipboardList size={20} />}
            label="Manajemen Setoran"
            description="Kelola setoran sampah dari pengguna"
            isActive={currentSection === "management"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecocentral/ecobuddy"
            icon={<Users size={20} />}
            label="Data EcoBuddy"
            description="Informasi pengguna dan mitra daur ulang"
            isActive={currentSection === "ecobuddy"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecocentral/ecohive"
            icon={<Hexagon size={20} />}
            label="EcoHive"
            description="Kelola pusat daur ulang EcoHive"
            isActive={currentSection === "ecohive"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecocentral/report"
            icon={<FileBarChart size={20} />}
            label="Laporan"
            description="Lihat dan unduh laporan kinerja"
            isActive={currentSection === "report"}
            minimized={minimized}
          />
          <NavLinkItem
            to="/ecocentral/notification"
            icon={<MessageSquare size={20} />}
            label="Pesan"
            description="Notifikasi dan komunikasi"
            isActive={currentSection === "notification"}
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
          <NavLinkItem
            to="/ecocentral/settings"
            icon={<Settings size={20} />}
            label="Pengaturan"
            description="Konfigurasi sistem dan preferensi"
            isActive={currentSection === "settings"}
            minimized={minimized}
          />
        </motion.nav>
      </div>

      {/* Footer */}
      <motion.div 
        variants={fadeIn}
        className={`px-4 py-3 border-t border-teal-800 dark:border-gray-700 ${minimized ? "text-center" : ""}`}
      >
        {minimized ? (
          <motion.div 
            className="text-xs font-medium text-gray-300 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="rotate-90 inline-block">EcoCentral</span>
          </motion.div>
        ) : (
          <motion.div 
            className="text-sm font-medium text-gray-300 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            EcoCentral Panel
          </motion.div>
        )}
      </motion.div>
    </motion.aside>
  );
};

// Enhanced NavLink component with responsive tooltip
const NavLinkItem = ({ to, icon, label, description, isActive, minimized }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  // Calculate tooltip position based on screen size
  const getTooltipPosition = () => {
    if (isMobile) {
      return minimized ? "left-14" : "left-full -ml-2";
    }
    return minimized ? "left-20" : "left-full";
  };

  return (
    <motion.div
      variants={fadeIn}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setTimeout(() => setShowTooltip(false), 1000)}
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

      {/* Responsive Tooltip */}
      {showTooltip && (minimized || true) && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tooltipVariants}
          className={`absolute ${getTooltipPosition()} top-0 ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-md shadow-lg z-50 ${isMobile ? 'max-w-[160px]' : 'w-48'}`}
          style={{
            maxWidth: isMobile ? '160px' : '12rem',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            overflow: 'hidden'
          }}
        >
          <div className="relative">
            <div className="absolute -left-2 top-3 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
            <p className={`font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>{label}</p>
            <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-600 dark:text-gray-300 mt-1`}>
              {description}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;