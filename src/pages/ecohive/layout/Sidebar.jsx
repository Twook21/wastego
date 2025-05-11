import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { motion } from "framer-motion";
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

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentSection, setMinimized }) => {
  const { darkMode } = useContext(ThemeContext);
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
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideFromLeft}
      className={`fixed inset-y-0 left-0 z-30 ${minimized ? "w-20" : "w-64"} 
      ${darkMode ? "bg-gray-800" : "bg-teal-900"} text-white transform 
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
      transition-all duration-300 ease-in-out shadow-lg`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-teal-800 dark:border-gray-700">
        <div className="flex items-center space-x-2 overflow-hidden">
          <motion.div 
            className="flex-shrink-0 w-10 h-10 bg-lime-500 dark:bg-lime-500 rounded-md flex items-center justify-center"
            whileHover={{ rotate: 360, transition: { duration: 1 } }}
          >
            <Recycle size={22} className="text-teal-900 dark:text-teal-900" />
          </motion.div>
          {!minimized && (
            <motion.h1 
              variants={fadeIn}
              className="text-xl font-bold whitespace-nowrap"
            >
              EcoHive
            </motion.h1>
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

      <div className={`px-4 py-6 ${minimized ? "px-2" : "px-4"}`}>
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
            isActive={currentSection === "dashboard"}
            minimized={minimized}
          />
          <NavLinkItem 
            to="/ecohive/deposit-management"
            icon={<ClipboardList size={20} />}
            label="Manajemen Setoran"
            isActive={currentSection === "setoran"}
            minimized={minimized}
          />
          <NavLinkItem 
            to="/ecohive/ecobuddy"
            icon={<Users size={20} />}
            label="Data EcoBuddy"
            isActive={currentSection === "ecobuddy"}
            minimized={minimized}
          />
          <NavLinkItem 
            to="/ecohive/report"
            icon={<FileBarChart size={20} />}
            label="Laporan"
            isActive={currentSection === "laporan"}
            minimized={minimized}
          />
          <NavLinkItem 
            to="/ecohive/notification"
            icon={<MessageSquare size={20} />}
            label="Pesan"
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
          <NavLinkItem 
            to="/ecohive/settings"
            icon={<Settings size={20} />}
            label="Pengaturan"
            isActive={false}
            minimized={minimized}
          />
          <NavLinkItem 
            to="/"
            icon={<Home size={20} />}
            label="Halaman Utama"
            isActive={false}
            minimized={minimized}
          />
        </motion.nav>
      </div>
    </motion.aside>
  );
};

// Extracted NavLink component with animation
const NavLinkItem = ({ to, icon, label, isActive, minimized }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div variants={fadeIn}>
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
        title={label}
      >
        <motion.div 
          className={minimized ? "" : "mr-3"}
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          {icon}
        </motion.div>
        {!minimized && <span>{label}</span>}
      </NavLink>
    </motion.div>
  );
};

export default Sidebar;