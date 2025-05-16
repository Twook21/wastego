import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Menu,
  CheckCircle,
  MessageSquare,
  AlertTriangle,
  Settings,
  X,
  ChevronLeft,
  Check,
  Circle
} from "lucide-react";

const TopBar = ({ sidebarOpen, setSidebarOpen, currentSection }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

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

  // Event listener untuk menutup notifikasi ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close notification on desktop when clicking outside
      // On mobile, we'll only use the explicit close button
      if (
        window.innerWidth >= 768 && // Only apply for desktop/tablet (md breakpoint)
        notificationOpen && 
        notificationRef.current && 
        !notificationRef.current.contains(event.target) &&
        notificationButtonRef.current && 
        !notificationButtonRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    // Tambahkan event listener ketika notifikasi terbuka
    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener ketika component unmount atau notifikasi tertutup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen]);

  // Prevent background scrolling when notifications are open on mobile
  useEffect(() => {
    if (notificationOpen) {
      // Save the current body scroll position
      const scrollY = window.scrollY;
      // Add styles to lock the body
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Remove the styles and restore scroll position when notifications are closed
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [notificationOpen]);

  // Prevent notification panel from closing on touch events in mobile view
  const handleTouchStart = (e) => {
    // Prevent default behavior only on mobile
    if (window.innerWidth < 768) {
      e.stopPropagation();
    }
  };

  const handleTouchMove = (e) => {
    // Prevent default behavior only on mobile
    if (window.innerWidth < 768) {
      e.stopPropagation();
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Function to toggle read status of individual notification
  const toggleNotificationRead = (id) => {
    const updatedNotifications = notifications.map((notif) => 
      notif.id === id ? { ...notif, read: !notif.read } : notif
    );
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

  // For mobile full-screen notification panel
  const mobileSlideIn = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: '100%', transition: { duration: 0.2 } }
  };

  // Get section title
  const getSectionTitle = () => {
    switch(currentSection) {
      case "dashboard": return "Dashboard";
      case "setoran": return "Manajemen Setoran";
      case "ecobuddy": return "Data EcoBuddy";
      case "laporan": return "Laporan";
      case "pesan": return "Pesan";
      default: return "EcoHive";
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={slideFromTop}
      className="sticky top-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md z-20"
    >
      <div className="mx-auto flex items-center justify-between h-16 px-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(true)}
            className="p-2 lg:hidden rounded-md text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </motion.button>
          <motion.h2 
            variants={fadeIn}
            className="text-lg font-semibold text-teal-900 dark:text-lime-500 truncate max-w-[160px] sm:max-w-full"
          >
            {getSectionTitle()}
          </motion.h2>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative">
                          <motion.button
              ref={notificationButtonRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNotificationOpen(!notificationOpen);
              }}
              className="p-1 rounded-full text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-lime-500 text-xs text-white font-medium flex items-center justify-center shadow-md"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Notification Panel */}
            <AnimatePresence>
              {notificationOpen && (
                <>
                  {/* Overlay for mobile */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black z-40 md:hidden"
                    onClick={(e) => {
                      // Prevent closing when clicking overlay
                      e.stopPropagation();
                    }}
                  />
                  
                  {/* Mobile full-screen notification panel */}
                  <motion.div 
                    ref={notificationRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={mobileSlideIn}
                    className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white dark:bg-gray-800 shadow-xl z-50 md:hidden flex flex-col"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setNotificationOpen(false);
                          }}
                          className="p-1 rounded-full text-gray-500 hover:text-teal-900 dark:text-gray-400 dark:hover:text-lime-500"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <h3 className="text-lg font-medium text-teal-900 dark:text-white">
                          Notifikasi
                        </h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        className="text-sm text-teal-600 dark:text-lime-500 hover:underline"
                      >
                        Tandai dibaca
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {notifications.map((notification, index) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleNotificationRead(notification.id);
                              }}
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
                                {/* Read/Unread indicator (not interactive on mobile - whole area is clickable) */}
                                <div className={`ml-2 p-1 rounded-full ${
                                  notification.read
                                    ? "text-gray-400"
                                    : "text-lime-500"
                                }`}>
                                  {notification.read ? <Circle size={16} /> : <Check size={16} />}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          Tidak ada notifikasi
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-teal-50 dark:bg-teal-900 dark:bg-opacity-10">
                      <Link
                        to="/ecohive/notifications"
                        className="block w-full py-2 text-center text-sm font-medium text-teal-600 dark:text-lime-500 hover:text-teal-700 dark:hover:text-lime-400 transition-colors"
                      >
                        Lihat semua notifikasi
                      </Link>
                    </div>
                  </motion.div>
                  
                  {/* Desktop dropdown - hidden on mobile */}
                  <motion.div 
                    ref={notificationRef}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden hidden md:block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20">
                      <h3 className="text-lg font-medium text-teal-900 dark:text-white">
                        Notifikasi
                      </h3>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            markAllAsRead();
                          }}
                          className="text-sm text-teal-600 dark:text-lime-500 hover:underline"
                        >
                          Tandai semua dibaca
                        </motion.button>
                                                  <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setNotificationOpen(false);
                          }}
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
                              onClick={() => toggleNotificationRead(notification.id)}
                              className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                notification.read
                                  ? ""
                                  : "bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20"
                              } transition-colors cursor-pointer relative`}
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
                                {/* Read/Unread indicator (whole notification area is clickable) */}
                                <div className={`ml-2 p-1 rounded-full ${
                                  notification.read
                                    ? "text-gray-400"
                                    : "text-lime-500"
                                }`}>
                                  {notification.read ? <Circle size={16} /> : <Check size={16} />}
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
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile - Modified to be clickable and lead to profile page */}
          <Link 
            to="/ecohive/profile" 
            className="group"
          >
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer group-hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-8 h-8 rounded-full bg-teal-900 dark:bg-teal-700 flex items-center justify-center text-white shadow-md text-xs group-hover:bg-teal-700 dark:group-hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ES
              </motion.div>
              <span className="hidden sm:block text-sm font-medium text-teal-900 dark:text-gray-300 truncate max-w-[120px] md:max-w-none group-hover:text-teal-700 dark:group-hover:text-white transition-colors">
                EcoStation Kebon Jeruk
              </span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;