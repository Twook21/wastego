import { useContext, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "../../context/ThemeContext";

function Notification() {
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "ecocentral",
      title: "Pengambilan Selesai",
      message:
        "Pengambilan sampah plastik seberat 2.5kg telah selesai. Terima kasih atas kontribusi Anda!",
      date: "11 Mei 2025",
      time: "09:45",
      read: false,
    },
    {
      id: 2,
      type: "ecobuddy",
      title: "Pengambil Dalam Perjalanan",
      message:
        "EcoBuddy Anda, Ahmad, sedang dalam perjalanan ke lokasi Anda. Estimasi tiba: 15 menit.",
      date: "10 Mei 2025",
      time: "14:30",
      read: true,
    },
    {
      id: 3,
      type: "ecocentral",
      title: "Poin Daur Ulang Bertambah!",
      message:
        "Selamat! Anda mendapatkan 125 poin dari aktivitas daur ulang terakhir. Klaim reward Anda sekarang!",
      date: "8 Mei 2025",
      time: "16:20",
      read: true,
    },
    {
      id: 4,
      type: "ecobuddy",
      title: "Konfirmasi Jadwal Pengambilan",
      message:
        "EcoBuddy Ratna mengkonfirmasi jadwal pengambilan sampah elektronik pada 15 Mei 2025, pukul 10:00.",
      date: "7 Mei 2025",
      time: "11:05",
      read: true,
    },
    {
      id: 5,
      type: "ecocentral",
      title: "Promo Spesial!",
      message:
        "Dapatkan bonus 50 poin untuk setiap pengambilan sampah elektronik minggu ini. Jadwalkan sekarang!",
      date: "5 Mei 2025",
      time: "08:15",
      read: true,
    },
  ]);

  const [conversations, setConversations] = useState([
    {
      id: 1,
      ecobuddy: {
        name: "Ahmad Riyadi",
        avatar: "/api/placeholder/40/40",
        status: "online",
      },
      lastMessage: "Saya akan tiba sekitar 15 menit lagi",
      time: "09:45",
      date: "11 Mei 2025",
      unread: 2,
    },
    {
      id: 2,
      ecobuddy: {
        name: "Ratna Dewi",
        avatar: "/api/placeholder/40/40",
        status: "offline",
      },
      lastMessage:
        "Apakah Rabu depan jam 10 pagi bisa untuk pengambilan sampah elektronik?",
      time: "16:30",
      date: "10 Mei 2025",
      unread: 0,
    },
    {
      id: 3,
      ecobuddy: {
        name: "Budi Santoso",
        avatar: "/api/placeholder/40/40",
        status: "away",
      },
      lastMessage: "Terima kasih atas kerjasamanya hari ini!",
      time: "14:20",
      date: "8 Mei 2025",
      unread: 0,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ecobuddy",
      message:
        "Halo! Saya Ahmad dari EcoBuddy yang akan mengambil sampah di lokasi Anda hari ini.",
      time: "09:30",
      date: "11 Mei 2025",
    },
    {
      id: 2,
      sender: "user",
      message:
        "Halo Ahmad, baik saya akan siapkan sampahnya. Kira-kira jam berapa sampai?",
      time: "09:35",
      date: "11 Mei 2025",
    },
    {
      id: 3,
      sender: "ecobuddy",
      message:
        "Saya sedang dalam perjalanan. Estimasi tiba sekitar 15 menit lagi.",
      time: "09:40",
      date: "11 Mei 2025",
    },
    {
      id: 4,
      sender: "ecobuddy",
      message: "Saya akan tiba sekitar 15 menit lagi",
      time: "09:45",
      date: "11 Mei 2025",
    },
  ]);

  // Ref for the message input
  const messageInputRef = useRef(null);

  // Ref for chat container
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [activeTab, selectedConversation]);

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

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const slideFromLeft = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const slideFromRight = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  const slideFromBottom = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
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

  const mobileSlide = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3 } },
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleSelectConversation = (id) => {
    setSelectedConversation(id);
    // Mark conversation as read
    setConversations(
      conversations.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: 0 } : conversation
      )
    );

    // Focus on the message input after a small delay to ensure DOM is updated
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 300);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      sender: "user",
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

    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        sender: "ecobuddy",
        message:
          "Baik, terima kasih atas informasinya. Ada hal lain yang bisa saya bantu?",
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

      setMessages((prev) => [...prev, responseMessage]);
    }, 2000);
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

  // Function to group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach((msg) => {
      if (!groups[msg.date]) {
        groups[msg.date] = [];
      }
      groups[msg.date].push(msg);
    });
    return groups;
  };

  // Auto-scroll to bottom of messages on load and when new messages come in
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedConversation, messages.length]);

  return (
    <div className="w-full mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-12 transition-colors duration-200">
      {/* Header Section - Smaller padding on mobile */}
      <motion.div
        className="text-center mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-teal-900 dark:text-lime-500 mb-2 md:mb-4"
          variants={fadeIn}
        >
          Notifikasi & Komunikasi
        </motion.h2>
        <motion.p
          className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          variants={fadeIn}
        >
          Terima pemberitahuan penting dan komunikasikan dengan EcoBuddy untuk
          pengalaman daur ulang yang lebih baik.
        </motion.p>
      </motion.div>

      {/* Tabs - Centered on mobile */}
      <motion.div
        className="mb-4 md:mb-6 border-b border-gray-200 dark:border-gray-700"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex justify-center md:justify-start space-x-4 md:space-x-6">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`relative pb-3 px-1 ${
              activeTab === "notifications"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="bell"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
              ></i>
              <span className="text-sm md:text-base font-medium">
                Pemberitahuan
              </span>
              {getUnreadNotificationsCount() > 0 && (
                <span className="ml-1 md:ml-2 bg-lime-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {getUnreadNotificationsCount()}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`relative pb-3 px-1 ${
              activeTab === "messages"
                ? "text-lime-500 border-b-2 border-lime-500"
                : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300"
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i
                data-feather="message-square"
                className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
              ></i>
              <span className="text-sm md:text-base font-medium">Pesan</span>
              {getTotalUnreadMessagesCount() > 0 && (
                <span className="ml-1 md:ml-2 bg-lime-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {getTotalUnreadMessagesCount()}
                </span>
              )}
            </div>
          </button>
        </div>
      </motion.div>

      {/* Notifications Tab Content - Better spacing on mobile */}
      {activeTab === "notifications" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
          className="space-y-3 md:space-y-4"
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={fadeIn}
                whileTap={{ scale: 0.98 }}
                className={`p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm border-l-4 ${
                  notification.read
                    ? "border-gray-200 dark:border-gray-700"
                    : notification.type === "ecocentral"
                    ? "border-lime-500"
                    : "border-teal-500"
                } ${!notification.read && "bg-gray-50 dark:bg-gray-750"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${
                      notification.type === "ecocentral"
                        ? "bg-lime-500 bg-opacity-20 dark:bg-lime-500 dark:bg-opacity-20"
                        : "bg-teal-500 bg-opacity-20 dark:bg-teal-500 dark:bg-opacity-20"
                    }`}
                  >
                    <i
                      data-feather={
                        notification.type === "ecocentral" ? "zap" : "user"
                      }
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        notification.type === "ecocentral"
                          ? "text-lime-500"
                          : "text-teal-500"
                      }`}
                    ></i>
                  </div>
                  <div className="ml-3 md:ml-4 flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <h4 className="text-sm md:text-base font-medium text-teal-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1 md:mt-0">
                        {notification.date}
                        {!notification.read && (
                          <span className="ml-2 h-2 w-2 bg-lime-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <button className="text-xs text-lime-500 hover:text-lime-600 dark:hover:text-lime-400 focus:outline-none">
                          Tandai dibaca
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="mx-auto h-12 w-12 md:h-16 md:w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <i
                  data-feather="bell-off"
                  className="h-6 w-6 md:h-8 md:w-8 text-gray-400"
                ></i>
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-1">
                Tidak ada pemberitahuan
              </h3>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Anda akan melihat pemberitahuan ketika ada pembaruan.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Messages Tab Content - Completely redesigned for WhatsApp-like experience */}
      {activeTab === "messages" && (
        <div className="relative h-full">
          {/* Main container - Using AnimatePresence for smooth mobile transitions */}
          <AnimatePresence>
            {/* Conversation List - Hidden on mobile when chat is open */}
            {!selectedConversation || !isMobile ? (
              <motion.div
                key="conversation-list"
                initial="hidden"
                animate="visible"
                variants={
                  isMobile && selectedConversation ? slideFromLeft : fadeIn
                }
                className={`bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm overflow-hidden ${
                  selectedConversation && !isMobile
                    ? "hidden md:block md:w-1/3 md:absolute md:left-0 md:top-0 md:bottom-0 md:z-10"
                    : "w-full"
                }`}
                style={{
                  height: isMobile
                    ? "auto"
                    : selectedConversation
                    ? "600px"
                    : "auto",
                  minHeight: "400px",
                }}
              >
                <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-medium text-teal-900 dark:text-white">
                    Percakapan
                  </h3>
                  <button className="text-gray-500 dark:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i data-feather="search" className="h-5 w-5"></i>
                  </button>
                </div>
                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: "calc(100vh - 250px)" }}
                >
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      className={`p-3 md:p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                        selectedConversation === conversation.id
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      } rounded-lg mx-2 my-2 shadow-sm`} 
                      onClick={() => handleSelectConversation(conversation.id)}// Tambahkan rounded dan shadow
                    >
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conversation.ecobuddy.avatar}
                            className="h-10 w-10 rounded-full object-cover" // Ukuran lebih kecil untuk mobile
                          />
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-800" />
                        </div>

                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium text-teal-900 dark:text-white">
                              {conversation.ecobuddy.name}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {conversation.time}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="bg-lime-500 text-white text-xs rounded-full px-2 py-1">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* Chat Detail View - WhatsApp-like UI with full-screen on mobile */}
            {selectedConversation && (
              <motion.div
                key="chat-detail"
                initial={isMobile ? "hidden" : "visible"}
                animate="visible"
                exit={isMobile ? "exit" : ""}
                variants={isMobile ? mobileSlide : fadeIn}
                className={`bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm overflow-hidden flex flex-col ${
                  isMobile ? "fixed inset-0 z-50" : "md:ml-1/3 md:flex-1"
                }`}
                style={{
                  height: isMobile ? "100vh" : "600px",
                  marginLeft: isMobile ? 0 : "",
                  width: isMobile
                    ? "100%"
                    : !isMobile
                    ? "calc(100% - 33.333%)"
                    : "100%",
                  left: isMobile ? 0 : !isMobile ? "33.333%" : 0,
                  right: 0,
                  top: isMobile ? 0 : "auto",
                  position: isMobile ? "fixed" : "absolute",
                }}
              >
                {/* WhatsApp-like Header */}
                <div className="p-2 md:p-3 bg-teal-800 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 flex items-center">
                  <button
                    className="mr-2 text-white p-2 rounded-full hover:bg-teal-700 dark:hover:bg-gray-700"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <i data-feather="arrow-left" className="h-5 w-5"></i>
                  </button>

                  <div className="flex items-center flex-1 min-w-0">
                    <div className="relative">
                      <img
                        src={
                          getConversationById(selectedConversation)?.ecobuddy
                            .avatar
                        }
                        alt={
                          getConversationById(selectedConversation)?.ecobuddy
                            .name
                        }
                        className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
                      />
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          getConversationById(selectedConversation)?.ecobuddy
                            .status === "online"
                            ? "bg-green-500"
                            : getConversationById(selectedConversation)
                                ?.ecobuddy.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                    </div>

                    <div className="ml-3 truncate">
                      <p className="text-sm font-medium text-white truncate">
                        {
                          getConversationById(selectedConversation)?.ecobuddy
                            .name
                        }
                      </p>
                      <p className="text-xs text-gray-200 dark:text-gray-400">
                        {getConversationById(selectedConversation)?.ecobuddy
                          .status === "online"
                          ? "Online"
                          : getConversationById(selectedConversation)?.ecobuddy
                              .status === "away"
                          ? "Sedang sibuk"
                          : "Terakhir dilihat hari ini"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button className="text-white p-2 rounded-full hover:bg-teal-700 dark:hover:bg-gray-700">
                      <i data-feather="more-vertical" className="h-5 w-5"></i>
                    </button>
                  </div>
                </div>

                {/* WhatsApp-like Chat Background */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4"
                  style={{
                    backgroundImage: darkMode
                      ? "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='%23222E35'/%3E%3Cpath opacity='.04' d='M0 0h40v40H0z' fill='%235A5A5A'/%3E%3Cpath opacity='.04' d='M40 40h40v40H40z' fill='%235A5A5A'/%3E%3C/svg%3E\")"
                      : "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='%23E5DDD5'/%3E%3Cpath opacity='.04' d='M0 0h40v40H0z' fill='%235A5A5A'/%3E%3Cpath opacity='.04' d='M40 40h40v40H40z' fill='%235A5A5A'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                    overscrollBehavior: "contain",
                    maxHeight: isMobile
                      ? "calc(100vh - 120px)"
                      : "calc(600px - 120px)",
                  }}
                >
                  {/* Date separators and messages */}
                  {Object.entries(groupMessagesByDate()).map(
                    ([date, dateMessages]) => (
                      <div key={date} className="space-y-2">
                        <div className="flex justify-center">
                          <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
                            {date}
                          </div>
                        </div>

                        {dateMessages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${
                              msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] p-2 md:p-3 rounded-lg ${
                                msg.sender === "user"
                                  ? "bg-lime-100 dark:bg-lime-900 rounded-tr-none"
                                  : "bg-white dark:bg-gray-700 rounded-tl-none"
                              }`}
                            >
                              <p
                                className={`text-sm ${
                                  msg.sender === "user"
                                    ? "text-gray-800 dark:text-gray-100"
                                    : "text-gray-800 dark:text-gray-100"
                                }`}
                              >
                                {msg.message}
                              </p>
                              <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {msg.time}
                                {msg.sender === "user" && (
                                  <i
                                    data-feather="check-check"
                                    className="h-3 w-3 inline-block ml-1 text-lime-500"
                                  ></i>
                                )}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Message Input */}
                <div className="p-2 md:p-3 bg-white dark:bg-gray-850 border-t border-gray-200 dark:border-gray-700">
                  <form
                    onSubmit={sendMessage}
                    className="flex items-center space-x-2"
                  >
                    <button
                      type="button"
                      className="p-2 text-gray-500 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <i data-feather="paperclip" className="h-5 w-5"></i>
                    </button>
                    <div className="flex-1 relative">
                      <input
                        ref={messageInputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ketik pesan"
                        className="w-full rounded-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                      >
                        <i data-feather="smile" className="h-5 w-5"></i>
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="p-2 bg-lime-500 text-white rounded-full hover:bg-lime-600 focus:outline-none"
                    >
                      <i data-feather="send" className="h-5 w-5"></i>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State (when no conversation is selected and not on mobile) */}
          {!selectedConversation && !isMobile && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="hidden md:flex flex-col items-center justify-center w-2/3 absolute right-0 top-0 bottom-0 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm"
              style={{ height: "600px" }}
            >
              <div className="h-20 w-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i
                  data-feather="message-circle"
                  className="h-10 w-10 text-teal-500"
                ></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Pilih percakapan
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                Pilih EcoBuddy untuk mulai berkomunikasi tentang pengambilan
                sampah atau jadwal daur ulang Anda.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
