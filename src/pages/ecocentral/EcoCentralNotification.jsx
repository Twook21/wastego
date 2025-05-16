import { useContext, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "../../context/ThemeContext";

function EcoCentralNotification() {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("notifications");

  // State untuk fitur tambahan chat
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);

  // Ref untuk komponen
  const messageInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const attachmentMenuRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "ecohive",
      title: "Pengambilan Baru",
      message:
        "EcoHive Budi telah mengambil sampah plastik seberat 2.5kg dari Jl. Kebon Jeruk. Mohon verifikasi poin.",
      date: "12 Mei 2025",
      time: "09:45",
      read: false,
      status: "pending",
    },
    {
      id: 2,
      type: "ecobuddy",
      title: "Keluhan Pengguna",
      message:
        "EcoBuddy Ratna melaporkan keterlambatan pengambilan oleh EcoHive Ahmad. Mohon tindaklanjut segera.",
      date: "11 Mei 2025",
      time: "14:30",
      read: false,
      status: "urgent",
    },
    {
      id: 3,
      type: "system",
      title: "Stok Droppoint Menipis",
      message:
        "Droppoint Kebon Jeruk akan penuh dalam 2 hari. Harap jadwalkan pengambilan oleh truk segera.",
      date: "10 Mei 2025",
      time: "16:20",
      read: true,
      status: "warning",
    },
    {
      id: 4,
      type: "ecohive",
      title: "Permintaan Verifikasi",
      message:
        "EcoHive Ratna mengkonfirmasi pengambilan 15kg sampah elektronik. Mohon verifikasi dokumentasi.",
      date: "9 Mei 2025",
      time: "11:05",
      read: true,
      status: "pending",
    },
    {
      id: 5,
      type: "system",
      title: "Target Bulanan",
      message:
        "Target daur ulang bulan Mei telah mencapai 78%. Potensi bonus untuk semua EcoHive.",
      date: "8 Mei 2025",
      time: "08:15",
      read: true,
      status: "info",
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      category: "ecohive",
      partner: {
        name: "Ahmad Riyadi",
        role: "EcoHive - Zona Utara",
        avatar: "/api/placeholder/40/40",
        status: "online",
      },
      lastMessage:
        "Saya sudah mencapai lokasi Kebon Jeruk, tapi alamat yang diberikan kurang jelas",
      time: "09:45",
      date: "12 Mei 2025",
      unread: 2,
      urgent: true,
    },
    {
      id: 2,
      category: "ecobuddy",
      partner: {
        name: "Ratna Dewi",
        role: "EcoBuddy - Premium",
        avatar: "/api/placeholder/40/40",
        status: "offline",
      },
      lastMessage:
        "Pengambilan sampah elektronik saya belum dijemput padahal jadwalnya hari ini",
      time: "16:30",
      date: "11 Mei 2025",
      unread: 3,
      urgent: true,
    },
    {
      id: 3,
      category: "ecohive",
      partner: {
        name: "Budi Santoso",
        role: "EcoHive - Zona Selatan",
        avatar: "/api/placeholder/40/40",
        status: "away",
      },
      lastMessage: "Droppoint di Tebet sudah hampir penuh, perlu truk tambahan",
      time: "14:20",
      date: "10 Mei 2025",
      unread: 0,
      urgent: false,
    },
    {
      id: 4,
      category: "ecobuddy",
      partner: {
        name: "Maya Sari",
        role: "EcoBuddy - Regular",
        avatar: "/api/placeholder/40/40",
        status: "online",
      },
      lastMessage: "Bagaimana cara tukar poin saya dengan voucher?",
      time: "11:05",
      date: "9 Mei 2025",
      unread: 0,
      urgent: false,
    },
    {
      id: 5,
      category: "droppoint",
      partner: {
        name: "Droppoint Kebon Jeruk",
        role: "Kapasitas: 85%",
        avatar: "/api/placeholder/40/40",
        status: "warning",
      },
      lastMessage:
        "Notifikasi otomatis: Kapasitas hampir penuh, perlu penjadwalan pickup",
      time: "08:15",
      date: "8 Mei 2025",
      unread: 0,
      urgent: true,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "partner",
      message:
        "Saya sudah mencapai lokasi Kebon Jeruk, tapi alamat yang diberikan kurang jelas. Bisa minta detail lainnya?",
      time: "09:30",
      date: "12 Mei 2025",
    },
    {
      id: 2,
      sender: "ecocentral",
      message:
        "Baik Ahmad, saya akan menghubungi EcoBuddy untuk konfirmasi. Mohon tunggu sebentar.",
      time: "09:35",
      date: "12 Mei 2025",
    },
    {
      id: 3,
      sender: "ecocentral",
      message:
        "Saya sudah mendapatkan info tambahan. Lokasi berada di blok B2, rumah cat kuning dengan pagar hitam. EcoBuddy sudah diberitahu Anda sedang dalam perjalanan.",
      time: "09:40",
      date: "12 Mei 2025",
    },
    {
      id: 4,
      sender: "partner",
      message: "Terima kasih infonya. Saya akan mencari alamat tersebut.",
      time: "09:45",
      date: "12 Mei 2025",
    },
  ]);

  // Analytics Data
  const [analytics, setAnalytics] = useState({
    totalPickups: {
      today: 28,
      week: 183,
      month: 752,
    },
    activeFeedback: {
      unresolved: 7,
      critical: 2,
    },
    droppoints: {
      total: 24,
      needingAttention: 3,
      almostFull: 2,
    },
    ecoHives: {
      active: 45,
      idle: 5,
      onLeave: 2,
    },
    topWaste: [
      { type: "Plastik", percentage: 45 },
      { type: "Kertas", percentage: 25 },
      { type: "Elektronik", percentage: 15 },
      { type: "Logam", percentage: 10 },
      { type: "Lainnya", percentage: 5 },
    ],
  });

  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [activeTab, selectedConversation, showAnalytics]);

  // Handle resize for better mobile responsiveness
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle reply message
  const handleReplyMessage = (messageId) => {
    const messageToReply = messages.find((msg) => msg.id === messageId);
    if (messageToReply) {
      setReplyingTo(messageToReply);
      messageInputRef.current?.focus();
    }
  };

  // Handle emoji click
  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Handle attachment click
  const handleAttachmentClick = (type) => {
    alert(`Memilih ${type}`);
    setShowAttachmentMenu(false);
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach((msg) => {
      const date = msg.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideFromLeft = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideFromRight = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const slideFromBottom = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const emojis = [
    "😊",
    "👍",
    "🙏",
    "❤️",
    "👌",
    "🔥",
    "✅",
    "🎉",
    "👏",
    "🤔",
    "😂",
    "🚀",
    "🌟",
    "📢",
    "♻️",
    "🌱",
    "🌍",
    "🌈",
    "👋",
    "🙌",
  ];

  const handleSelectConversation = (id) => {
    setSelectedConversation(id);
    // Mark conversation as read
    setConversations(
      conversations.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation
      )
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "ecocentral",
      message: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Auto-scroll to bottom on send
    setTimeout(() => {
      const chatContainer = document.getElementById("chat-messages");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const getConversationById = (id) => {
    return conversations.find((conversation) => conversation.id === id);
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };

  const getTotalUnreadMessagesCount = () => {
    return conversations.reduce(
      (total, conversation) => total + conversation.unread,
      0
    );
  };

  const getUrgentConversationsCount = () => {
    return conversations.filter((conversation) => conversation.urgent).length;
  };

  // Auto-scroll to bottom of messages on load
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation, messages.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        event.target.id !== "emoji-button"
      ) {
        setShowEmojiPicker(false);
      }

      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target) &&
        event.target.id !== "attachment-button"
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler for notification actions
  const handleNotificationAction = (id, action) => {
    alert(`Action ${action} taken on notification ${id}`);
    // In a real app, you would handle the action here
    markAsRead(id);
  };

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-12 transition-colors duration-200">
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-teal-900 dark:text-lime-500 mb-2"
            variants={fadeIn}
          >
            EcoCentral Dashboard
          </motion.h2>
          <motion.p
            className="text-sm md:text-base text-gray-600 dark:text-gray-300"
            variants={fadeIn}
          >
            Monitor dan kelola EcoHive dan EcoBuddy dari satu tempat.
          </motion.p>
        </div>

        <div className="flex space-x-2 md:space-x-4">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-3 py-2 md:px-4 md:py-2 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-lg flex items-center text-sm md:text-base"
          >
            <i
              data-feather="bar-chart-2"
              className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
            ></i>
            Analytics
          </button>
          <button className="px-3 py-2 md:px-4 md:py-2 bg-lime-500 text-white rounded-lg flex items-center text-sm md:text-base">
            <i
              data-feather="plus"
              className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
            ></i>
            Buat Tugas
          </button>
        </div>
      </motion.div>

      {/* Analytics Panel */}
      {showAnalytics && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideFromBottom}
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm p-4 md:p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-teal-900 dark:text-white">
              Analytics Overview
            </h3>
            <button
              onClick={() => setShowAnalytics(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i data-feather="x" className="h-5 w-5"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-teal-50 dark:bg-teal-900/30 p-2 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-500 dark:text-gray-400">
                  Pengambilan
                </h4>
                <span className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center">
                  <i
                    data-feather="truck"
                    className="h-4 w-4 text-teal-700 dark:text-teal-300"
                  ></i>
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-teal-900 dark:text-white mt-2">
                {analytics.totalPickups.today}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hari ini ({analytics.totalPickups.week} minggu ini)
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/30 p-2 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-500 dark:text-gray-400">
                  Keluhan
                </h4>
                <span className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                  <i
                    data-feather="alert-triangle"
                    className="h-4 w-4 text-red-700 dark:text-red-300"
                  ></i>
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-teal-900 dark:text-white mt-2">
                {analytics.activeFeedback.unresolved}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {analytics.activeFeedback.critical} perlu segera ditanggapi
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-500 dark:text-gray-400">
                  Droppoints
                </h4>
                <span className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center">
                  <i
                    data-feather="map-pin"
                    className="h-4 w-4 text-yellow-700 dark:text-yellow-300"
                  ></i>
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-teal-900 dark:text-white mt-2">
                {analytics.droppoints.needingAttention}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Perlu perhatian dari {analytics.droppoints.total} total
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-2 md:p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-500 dark:text-gray-400">
                  EcoHives
                </h4>
                <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <i
                    data-feather="users"
                    className="h-4 w-4 text-blue-700 dark:text-blue-300"
                  ></i>
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold text-teal-900 dark:text-white mt-2">
                {analytics.ecoHives.active}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Aktif ({analytics.ecoHives.idle} tidak aktif)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 md:p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Jenis Sampah Terkumpul
            </h4>
            <div className="flex items-center space-x-1">
              {analytics.topWaste.map((item, index) => (
                <div
                  key={index}
                  className="h-6 md:h-8 rounded-sm text-xs flex items-center justify-center text-white font-medium"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor:
                      index === 0
                        ? "#10b981"
                        : index === 1
                        ? "#3b82f6"
                        : index === 2
                        ? "#f59e0b"
                        : index === 3
                        ? "#ef4444"
                        : "#8b5cf6",
                  }}
                >
                  {item.percentage}%
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              {analytics.topWaste.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span
                    className="h-2 w-2 rounded-full mr-1"
                    style={{
                      backgroundColor:
                        index === 0
                          ? "#10b981"
                          : index === 1
                          ? "#3b82f6"
                          : index === 2
                          ? "#f59e0b"
                          : index === 3
                          ? "#ef4444"
                          : "#8b5cf6",
                    }}
                  ></span>
                  {item.type}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        className="mb-2 md:mb-6 border-b border-gray-200 dark:border-gray-700"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex space-x-2 md:space-x-6 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`relative whitespace-nowrap pb-2 md:pb-3 px-0.5 md:px-1 ${
              activeTab === "notifications"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="bell"
                className="h-3 w-3 md:h-5 md:w-5 mr-0.5 md:mr-2"
              ></i>
              <span className="text-xs md:text-base font-medium">Notif</span>
              {getUnreadNotificationsCount() > 0 && (
                <span className="ml-0.5 md:ml-2 bg-lime-500 text-white text-xs rounded-full w-3 h-3 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                  {getUnreadNotificationsCount()}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`relative whitespace-nowrap pb-2 md:pb-3 px-0.5 md:px-1 ${
              activeTab === "messages"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="message-square"
                className="h-3 w-3 md:h-5 md:w-5 mr-0.5 md:mr-2"
              ></i>
              <span className="text-xs md:text-base font-medium">Pesan</span>
              {getTotalUnreadMessagesCount() > 0 && (
                <span className="ml-0.5 md:ml-2 bg-lime-500 text-white text-xs rounded-full w-3 h-3 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
                  {getTotalUnreadMessagesCount()}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab("ecohives")}
            className={`relative whitespace-nowrap pb-2 md:pb-3 px-0.5 md:px-1 ${
              activeTab === "ecohives"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="truck"
                className="h-3 w-3 md:h-5 md:w-5 mr-0.5 md:mr-2"
              ></i>
              <span className="text-xs md:text-base font-medium">Hives</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("ecobuddies")}
            className={`relative whitespace-nowrap pb-2 md:pb-3 px-0.5 md:px-1 ${
              activeTab === "ecobuddies"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="users"
                className="h-3 w-3 md:h-5 md:w-5 mr-0.5 md:mr-2"
              ></i>
              <span className="text-xs md:text-base font-medium">Buddies</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("droppoints")}
            className={`relative whitespace-nowrap pb-2 md:pb-3 px-0.5 md:px-1 ${
              activeTab === "droppoints"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="map-pin"
                className="h-3 w-3 md:h-5 md:w-5 mr-0.5 md:mr-2"
              ></i>
              <span className="text-xs md:text-base font-medium">Drop</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Notifications Tab Content */}
      {activeTab === "notifications" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
          className="space-y-3 md:space-y-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 md:mb-4">
            <h3 className="text-base md:text-lg font-medium text-teal-900 dark:text-white mb-2 md:mb-0">
              Pemberitahuan & Alerts
            </h3>
            <div className="flex items-center w-full md:w-auto justify-between">
              <button className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white mr-2 md:mr-4 truncate">
                <span className="hidden md:inline">Tandai semua dibaca</span>
                <span className="md:hidden">Tandai semua dibaca</span>
              </button>
              <select className="text-xs md:text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-lime-500 text-gray-800 dark:text-white py-2 px-3 md:py-1 md:px-2">
                <option value="all">Semua</option>
                <option value="unread">Belum dibaca</option>
                <option value="urgent">Penting</option>
              </select>
            </div>
          </div>

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={fadeIn}
                whileTap={{ scale: 0.98 }}
                className={`p-2 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm border-l-4 ${
                  notification.read
                    ? "border-gray-200 dark:border-gray-700"
                    : notification.status === "urgent"
                    ? "border-red-500"
                    : notification.status === "warning"
                    ? "border-yellow-500"
                    : notification.type === "ecohive"
                    ? "border-blue-500"
                    : notification.type === "ecobuddy"
                    ? "border-teal-500"
                    : "border-lime-500"
                } ${!notification.read && "bg-gray-50 dark:bg-gray-750"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      notification.type === "ecohive"
                        ? "bg-blue-500 bg-opacity-20 dark:bg-blue-500 dark:bg-opacity-20"
                        : notification.type === "ecobuddy"
                        ? "bg-teal-500 bg-opacity-20 dark:bg-teal-500 dark:bg-opacity-20"
                        : "bg-lime-500 bg-opacity-20 dark:bg-lime-500 dark:bg-opacity-20"
                    }`}
                  >
                    <i
                      data-feather={
                        notification.type === "ecohive"
                          ? "truck"
                          : notification.type === "ecobuddy"
                          ? "user"
                          : "alert-circle"
                      }
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        notification.type === "ecohive"
                          ? "text-blue-500"
                          : notification.type === "ecobuddy"
                          ? "text-teal-500"
                          : "text-lime-500"
                      }`}
                    ></i>
                  </div>

                  <div className="ml-3 md:ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                        {notification.date} • {notification.time}
                      </div>
                    </div>

                    <div className="flex mt-2 justify-between items-center">
                      <div className="flex space-x-2">
                        {notification.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleNotificationAction(
                                  notification.id,
                                  "approve"
                                )
                              }
                              className="px-2 py-1 bg-lime-500 text-white text-xs rounded-md"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleNotificationAction(
                                  notification.id,
                                  "reject"
                                )
                              }
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs rounded-md"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {notification.status === "urgent" && (
                          <button
                            onClick={() =>
                              handleNotificationAction(
                                notification.id,
                                "review"
                              )
                            }
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded-md"
                          >
                            Review Segera
                          </button>
                        )}
                        {notification.status === "warning" && (
                          <button
                            onClick={() =>
                              handleNotificationAction(
                                notification.id,
                                "schedule"
                              )
                            }
                            className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-md"
                          >
                            Jadwalkan Pickup
                          </button>
                        )}
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-lime-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Tidak ada pemberitahuan baru
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Messages Tab Content */}
      {activeTab === "messages" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm overflow-hidden">
          <div className="flex h-[calc(100vh-160px)] md:h-[600px]">
            {/* Conversations List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideFromLeft}
              className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col ${
                selectedConversation && isMobile ? "hidden" : "block"
              }`}
            >
              <div className="p-2 md:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari percakapan..."
                    className="w-full py-2 pl-9 pr-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-0 focus:ring-2 focus:ring-lime-500"
                  />
                  <i
                    data-feather="search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400"
                  ></i>
                </div>
              </div>

              <div className="overflow-y-auto h-[calc(600px-61px)] flex-1">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    variants={fadeIn}
                    whileTap={{ scale: 0.98 }}
                    className={`p-2 md:p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                      selectedConversation === conversation.id
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conversation.partner.avatar}
                          alt={conversation.partner.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                            conversation.partner.status === "online"
                              ? "bg-green-500"
                              : conversation.partner.status === "away"
                              ? "bg-yellow-500"
                              : conversation.partner.status === "warning"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></span>
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                            {conversation.partner.name}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {conversation.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                          {conversation.partner.role}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[85%]">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <div className="flex-shrink-0">
                              <span
                                className={`inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-medium ${
                                  conversation.urgent
                                    ? "bg-red-500 text-white"
                                    : "bg-lime-500 text-white"
                                }`}
                              >
                                {conversation.unread}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Chat Area */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideFromRight}
              className={`w-full h-full md:w-2/3 flex flex-col ${
                !selectedConversation && isMobile
                  ? "hidden"
                  : "flex flex-col flex-1"
              }`}
              style={
                isMobile && selectedConversation
                  ? {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 50,
                    }
                  : {}
              }
            >
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 p-2 md:p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="mr-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full flex items-center justify-center"
                      title="Kembali"
                    >
                      <i data-feather="arrow-left" className="h-5 w-5"></i>
                    </button>
                    <div className="flex items-center flex-1">
                      <img
                        src={
                          getConversationById(selectedConversation)?.partner
                            .avatar
                        }
                        alt={
                          getConversationById(selectedConversation)?.partner
                            .name
                        }
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                          {
                            getConversationById(selectedConversation)?.partner
                              .name
                          }
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {
                            getConversationById(selectedConversation)?.partner
                              .role
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                        <i data-feather="phone" className="h-5 w-5"></i>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                        <i data-feather="more-vertical" className="h-5 w-5"></i>
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50 dark:bg-gray-900"
                    style={{
                      height: isMobile
                        ? "calc(100vh - 130px)"
                        : "calc(100vh - 180px)",
                    }}
                  >
                    {Object.entries(groupMessagesByDate()).map(
                      ([date, messages]) => (
                        <div key={date} className="text-center mb-6">
                          <span className="inline-block px-3 py-1 text-xs bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                            {date}
                          </span>
                          {messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${
                                msg.sender === "ecocentral"
                                  ? "justify-end"
                                  : "justify-start"
                              } my-2`}
                            >
                              <div
                                className={`max-w-[85%] md:max-w-[70%] rounded-lg p-3 text-left ${
                                  msg.sender === "ecocentral"
                                    ? "bg-lime-500 dark:bg-lime-500 text-white rounded-br-none"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                                } relative shadow-sm`}
                              >
                                {/* Reply Preview */}
                                {msg.repliedTo && (
                                  <div
                                    className={`mb-2 p-2 rounded-md ${
                                      msg.sender === "ecocentral"
                                        ? "bg-lime-700 dark:bg-lime-800"
                                        : "bg-gray-100 dark:bg-gray-700"
                                    }`}
                                  >
                                    <p className="text-xs line-clamp-2 italic border-l-2 pl-2 border-gray-400 dark:border-gray-500">
                                      {getMessageById(msg.repliedTo)?.message}
                                    </p>
                                  </div>
                                )}

                                <p className="text-sm">{msg.message}</p>
                                <div className="flex items-center justify-end mt-1 space-x-1">
                                  <span className="text-xs opacity-70">
                                    {msg.time}
                                  </span>
                                  {msg.sender === "ecocentral" && (
                                    <i
                                      data-feather="check"
                                      className="h-3 w-3 opacity-70"
                                    ></i>
                                  )}
                                </div>

                                {/* Reply Button */}
                                <button
                                  onClick={() => handleReplyMessage(msg.id)}
                                  className={`absolute bg-white dark:bg-gray-700 shadow-md rounded-full p-1 ${
                                    msg.sender === "ecocentral"
                                      ? "right-auto left-0 -translate-x-1/2"
                                      : "left-auto right-0 translate-x-1/2"
                                  } top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors`}
                                >
                                  <i
                                    data-feather="corner-up-left"
                                    className="h-4 w-4"
                                  ></i>
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )
                    )}
                  </div>

                  {/* Chat Input */}
                  {/* Reply Preview */}
                  {replyingTo && (
                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                            Membalas{" "}
                            {replyingTo.sender === "ecocentral"
                              ? "Anda"
                              : getConversationById(selectedConversation)
                                  ?.partner.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {replyingTo.message}
                          </p>
                        </div>
                        <button
                          onClick={cancelReply}
                          className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <i data-feather="x" className="h-4 w-4"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="p-2 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <form
                      onSubmit={sendMessage}
                      className="flex items-center gap-1 md:space-x-2"
                    >
                      {/* Attachment Menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setShowAttachmentMenu(!showAttachmentMenu)
                          }
                          className="text-gray-500 dark:text-gray-400 hover:text-lime-700 dark:hover:text-lime-500 p-2 rounded-full transition-colors"
                        >
                          <i data-feather="plus" className="h-5 w-5"></i>
                        </button>

                        <AnimatePresence>
                          {showAttachmentMenu && (
                            <motion.div
                              ref={attachmentMenuRef}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10"
                            >
                              {[
                                "document",
                                "camera",
                                "gallery",
                                "location",
                              ].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => handleAttachmentClick(type)}
                                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <i
                                    data-feather={
                                      type === "document"
                                        ? "file-text"
                                        : type === "camera"
                                        ? "camera"
                                        : type === "gallery"
                                        ? "image"
                                        : "map-pin"
                                    }
                                    className="h-4 w-4 mr-3"
                                  ></i>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Emoji Picker */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="text-gray-500 dark:text-gray-400 hover:text-lime-700 dark:hover:text-lime-500 p-2 rounded-full transition-colors"
                        >
                          <i data-feather="smile" className="h-5 w-5"></i>
                        </button>

                        <AnimatePresence>
                          {showEmojiPicker && (
                            <motion.div
                              ref={emojiPickerRef}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 grid grid-cols-6 gap-1 border border-gray-200 dark:border-gray-700 z-10"
                            >
                              {emojis.map((emoji) => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleEmojiClick(emoji)}
                                  className="text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-1 transition-colors"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <input
                        ref={messageInputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ketik pesan..."
                        className="flex-1 py-2 px-3 md:px-4 bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-500 text-xs md:text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />

                      <button
                        type="submit"
                        className="bg-lime-500 dark:bg-lime-500 text-white p-2 rounded-full hover:bg-lime-500 dark:hover:bg-lime-700 transition-colors"
                        disabled={!message.trim()}
                      >
                        <i data-feather="send" className="h-5 w-5"></i>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 inline-flex items-center justify-center mb-4">
                      <i
                        data-feather="message-square"
                        className="h-8 w-8 text-gray-500 dark:text-gray-400"
                      ></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Pesan EcoCentral
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Pilih percakapan untuk memulai
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {(activeTab === "ecohives" ||
        activeTab === "ecobuddies" ||
        activeTab === "droppoints") && (
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm p-6 text-center">
          <div className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
            <i
              data-feather={
                activeTab === "ecohives"
                  ? "truck"
                  : activeTab === "ecobuddies"
                  ? "users"
                  : "map-pin"
              }
              className="h-8 w-8 text-gray-500 dark:text-gray-400"
            ></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activeTab === "ecohives"
              ? "Kelola EcoHives"
              : activeTab === "ecobuddies"
              ? "Kelola EcoBuddies"
              : "Kelola Droppoints"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Fitur ini sedang dalam pengembangan
          </p>
          <button className="px-4 py-2 bg-lime-500 text-white rounded-lg">
            Hubungi Tim Pengembang
          </button>
        </div>
      )}
    </div>
  );
}

export default EcoCentralNotification;
