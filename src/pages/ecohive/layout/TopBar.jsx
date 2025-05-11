import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "../../../context/ThemeContext";
import {
  Bell,
  Menu,
  CheckCircle,
  MessageSquare,
  AlertTriangle,
  Settings,
  X,
} from "lucide-react";

const TopBar = ({ sidebarOpen, setSidebarOpen, currentSection }) => {
  const { darkMode } = useContext(ThemeContext);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deposit",
      message: "Setoran baru dari Eko Suparjo diterima",
      time: "10 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      type: "message",
      message: "Pesan baru dari Lia Handayani",
      time: "30 menit yang lalu",
      read: false,
    },
    {
      id: 3,
      type: "alert",
      message: "Penjemputan di Perumahan Hijau tertunda",
      time: "1 jam yang lalu",
      read: true,
    },
    {
      id: 4,
      type: "system",
      message: "Sistem pembaruan berhasil diterapkan",
      time: "2 jam yang lalu",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Animation variants to match HomePage and Sidebar
  const slideFromTop = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideFromTop}
      className={`sticky top-0 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-md z-20`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </motion.button>
          <motion.h2 
            variants={fadeIn}
            className="ml-2 md:ml-0 text-xl font-semibold text-teal-900 dark:text-lime-500"
          >
            {currentSection === "dashboard" && "Dashboard"}
            {currentSection === "setoran" && "Manajemen Setoran"}
            {currentSection === "ecobuddy" && "Data EcoBuddy"}
            {currentSection === "laporan" && "Laporan"}
            {currentSection === "pesan" && "Pesan"}
            {!currentSection && "EcoHive Management System"}
          </motion.h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="p-1 rounded-full text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-lime-500 text-xs text-white font-medium flex items-center justify-center shadow-md"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Notification dropdown with animation */}
            <AnimatePresence>
              {notificationOpen && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20">
                    <h3 className="text-lg font-medium text-teal-900 dark:text-white">
                      Notifikasi
                    </h3>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={markAllAsRead}
                        className="text-sm text-teal-600 dark:text-lime-500 hover:underline"
                      >
                        Tandai semua dibaca
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNotificationOpen(false)}
                        className="p-1 text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500"
                      >
                        <X size={18} />
                      </motion.button>
                    </div>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <motion.div 
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                      >
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                              notification.read
                                ? ""
                                : "bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20"
                            } transition-colors cursor-pointer`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`rounded-full p-2 ${
                                  notification.type === "deposit"
                                    ? "bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-600 dark:text-green-400"
                                    : notification.type === "message"
                                    ? "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-600 dark:text-blue-400"
                                    : notification.type === "alert"
                                    ? "bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {notification.type === "deposit" && (
                                  <CheckCircle size={16} />
                                )}
                                {notification.type === "message" && (
                                  <MessageSquare size={16} />
                                )}
                                {notification.type === "alert" && (
                                  <AlertTriangle size={16} />
                                )}
                                {notification.type === "system" && (
                                  <Settings size={16} />
                                )}
                              </div>
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.message}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Tidak ada notifikasi
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-teal-50 dark:bg-teal-900 dark:bg-opacity-10">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/ecohive/notifications"
                        className="flex items-center justify-center p-2 text-sm font-medium text-teal-600 dark:text-lime-500 hover:text-teal-700 dark:hover:text-lime-400 transition-colors"
                      >
                        Lihat semua notifikasi
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-9 h-9 rounded-full bg-teal-900 dark:bg-teal-700 flex items-center justify-center text-white shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ES
            </motion.div>
            <span className="hidden md:block text-sm font-medium text-teal-900 dark:text-gray-300">
              EcoStation Kebon Jeruk
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;