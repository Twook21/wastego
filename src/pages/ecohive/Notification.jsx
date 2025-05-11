import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThemeContext from '../../context/ThemeContext'

function Notification() {
  const { darkMode } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState('notifications')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'ecocentral',
      title: 'Pengambilan Selesai',
      message: 'Pengambilan sampah plastik seberat 2.5kg telah selesai. Terima kasih atas kontribusi Anda!',
      date: '11 Mei 2025',
      time: '09:45',
      read: false
    },
    {
      id: 2,
      type: 'ecobuddy',
      title: 'Pengambil Dalam Perjalanan',
      message: 'EcoBuddy Anda, Ahmad, sedang dalam perjalanan ke lokasi Anda. Estimasi tiba: 15 menit.',
      date: '10 Mei 2025',
      time: '14:30',
      read: true
    },
    {
      id: 3,
      type: 'ecocentral',
      title: 'Poin Daur Ulang Bertambah!',
      message: 'Selamat! Anda mendapatkan 125 poin dari aktivitas daur ulang terakhir. Klaim reward Anda sekarang!',
      date: '8 Mei 2025',
      time: '16:20',
      read: true
    },
    {
      id: 4,
      type: 'ecobuddy',
      title: 'Konfirmasi Jadwal Pengambilan',
      message: 'EcoBuddy Ratna mengkonfirmasi jadwal pengambilan sampah elektronik pada 15 Mei 2025, pukul 10:00.',
      date: '7 Mei 2025',
      time: '11:05',
      read: true
    },
    {
      id: 5,
      type: 'ecocentral',
      title: 'Promo Spesial!',
      message: 'Dapatkan bonus 50 poin untuk setiap pengambilan sampah elektronik minggu ini. Jadwalkan sekarang!',
      date: '5 Mei 2025',
      time: '08:15',
      read: true
    }
  ])
  
  const [conversations, setConversations] = useState([
    {
      id: 1,
      ecobuddy: {
        name: 'Ahmad Riyadi',
        avatar: '/api/placeholder/40/40',
        status: 'online'
      },
      lastMessage: 'Saya akan tiba sekitar 15 menit lagi',
      time: '09:45',
      date: '11 Mei 2025',
      unread: 2
    },
    {
      id: 2,
      ecobuddy: {
        name: 'Ratna Dewi',
        avatar: '/api/placeholder/40/40',
        status: 'offline'
      },
      lastMessage: 'Apakah Rabu depan jam 10 pagi bisa untuk pengambilan sampah elektronik?',
      time: '16:30',
      date: '10 Mei 2025',
      unread: 0
    },
    {
      id: 3,
      ecobuddy: {
        name: 'Budi Santoso',
        avatar: '/api/placeholder/40/40',
        status: 'away'
      },
      lastMessage: 'Terima kasih atas kerjasamanya hari ini!',
      time: '14:20',
      date: '8 Mei 2025',
      unread: 0
    }
  ])
  
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ecobuddy',
      message: 'Halo! Saya Ahmad dari EcoBuddy yang akan mengambil sampah di lokasi Anda hari ini.',
      time: '09:30',
      date: '11 Mei 2025'
    },
    {
      id: 2,
      sender: 'user',
      message: 'Halo Ahmad, baik saya akan siapkan sampahnya. Kira-kira jam berapa sampai?',
      time: '09:35',
      date: '11 Mei 2025'
    },
    {
      id: 3,
      sender: 'ecobuddy',
      message: 'Saya sedang dalam perjalanan. Estimasi tiba sekitar 15 menit lagi.',
      time: '09:40',
      date: '11 Mei 2025'
    },
    {
      id: 4,
      sender: 'ecobuddy',
      message: 'Saya akan tiba sekitar 15 menit lagi',
      time: '09:45',
      date: '11 Mei 2025'
    }
  ])

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [activeTab, selectedConversation]);

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const slideFromLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const slideFromRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const slideFromBottom = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleSelectConversation = (id) => {
    setSelectedConversation(id)
    // Mark conversation as read
    setConversations(
      conversations.map(conversation => 
        conversation.id === id ? { ...conversation, unread: 0 } : conversation
      )
    )
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.trim() === '') return
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    
    setMessages([...messages, newMessage])
    setMessage('')
  }

  const getConversationById = (id) => {
    return conversations.find(conversation => conversation.id === id)
  }

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.read).length
  }

  const getTotalUnreadMessagesCount = () => {
    return conversations.reduce((total, conversation) => total + conversation.unread, 0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <motion.h2 
          className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4"
          variants={fadeIn}
        >
          Notifikasi & Komunikasi
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          variants={fadeIn}
        >
          Terima pemberitahuan penting dan komunikasikan dengan EcoBuddy untuk pengalaman daur ulang yang lebih baik.
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="mb-6 border-b border-gray-200 dark:border-gray-700"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`relative pb-4 px-1 ${
              activeTab === 'notifications'
                ? 'text-lime-500 border-b-2 border-lime-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300'
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i data-feather="bell" className="h-5 w-5 mr-2"></i>
              <span className="font-medium">Pemberitahuan</span>
              {getUnreadNotificationsCount() > 0 && (
                <span className="ml-2 bg-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getUnreadNotificationsCount()}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`relative pb-4 px-1 ${
              activeTab === 'messages'
                ? 'text-lime-500 border-b-2 border-lime-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-gray-300'
            } focus:outline-none transition-colors duration-200`}
          >
            <div className="flex items-center">
              <i data-feather="message-square" className="h-5 w-5 mr-2"></i>
              <span className="font-medium">Pesan</span>
              {getTotalUnreadMessagesCount() > 0 && (
                <span className="ml-2 bg-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalUnreadMessagesCount()}
                </span>
              )}
            </div>
          </button>
        </div>
      </motion.div>

      {/* Notifications Tab Content */}
      {activeTab === 'notifications' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerItems}
          className="space-y-4"
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={fadeIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 ${
                  notification.read 
                    ? 'border-gray-200 dark:border-gray-700' 
                    : notification.type === 'ecocentral'
                      ? 'border-lime-500'
                      : 'border-teal-500'
                } ${
                  !notification.read && 'bg-gray-50 dark:bg-gray-750'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    notification.type === 'ecocentral'
                      ? 'bg-lime-500 bg-opacity-20 dark:bg-lime-500 dark:bg-opacity-20'
                      : 'bg-teal-500 bg-opacity-20 dark:bg-teal-500 dark:bg-opacity-20'
                  }`}>
                    <i 
                      data-feather={notification.type === 'ecocentral' ? 'zap' : 'user'} 
                      className={`h-5 w-5 ${
                        notification.type === 'ecocentral' ? 'text-lime-500' : 'text-teal-500'
                      }`}
                    ></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-base font-medium text-teal-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        {notification.date}
                        {!notification.read && (
                          <span className="ml-2 h-2 w-2 bg-lime-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
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
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i data-feather="bell-off" className="h-8 w-8 text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Tidak ada pemberitahuan</h3>
              <p className="text-gray-500 dark:text-gray-400">Anda akan melihat pemberitahuan ketika ada pembaruan.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Messages Tab Content */}
      {activeTab === 'messages' && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          style={{ minHeight: '500px' }}
        >
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full ${selectedConversation ? 'hidden md:block md:w-1/3' : ''} border-r border-gray-200 dark:border-gray-700`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-teal-900 dark:text-white">Percakapan</h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
                    className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 ${
                      selectedConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handleSelectConversation(conversation.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img 
                            src={conversation.ecobuddy.avatar} 
                            alt={conversation.ecobuddy.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                            conversation.ecobuddy.status === 'online' ? 'bg-green-500' : 
                            conversation.ecobuddy.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`}></span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-teal-900 dark:text-white">{conversation.ecobuddy.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate w-48">{conversation.lastMessage}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</span>
                        {conversation.unread > 0 && (
                          <span className="mt-1 bg-lime-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Conversation Detail */}
            {selectedConversation ? (
              <div className="w-full md:w-2/3 flex flex-col">
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <button 
                      className="md:hidden mr-2 text-gray-500 dark:text-gray-400"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <i data-feather="arrow-left" className="h-5 w-5"></i>
                    </button>
                    <div className="relative">
                      <img 
                        src={getConversationById(selectedConversation)?.ecobuddy.avatar} 
                        alt={getConversationById(selectedConversation)?.ecobuddy.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                        getConversationById(selectedConversation)?.ecobuddy.status === 'online' ? 'bg-green-500' : 
                        getConversationById(selectedConversation)?.ecobuddy.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-teal-900 dark:text-white">
                        {getConversationById(selectedConversation)?.ecobuddy.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {getConversationById(selectedConversation)?.ecobuddy.status === 'online' ? 'Online' : 
                         getConversationById(selectedConversation)?.ecobuddy.status === 'away' ? 'Sedang sibuk' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white p-1">
                      <i data-feather="more-vertical" className="h-5 w-5"></i>
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '350px' }}>
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                          msg.sender === 'user' 
                            ? 'bg-lime-500 text-white rounded-br-none' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'user' 
                            ? 'text-lime-100' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white p-2">
                      <i data-feather="paperclip" className="h-5 w-5"></i>
                    </button>
                    <input
                      type="text"
                      placeholder="Ketik pesan..."
                      className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-lime-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-lime-500 text-white p-2 rounded-full focus:outline-none hover:bg-lime-600"
                    >
                      <i data-feather="send" className="h-5 w-5"></i>
                    </motion.button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full md:w-2/3 flex items-center justify-center">
                <div className="text-center py-12">
                  <div className="mx-auto h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <i data-feather="message-circle" className="h-8 w-8 text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Pilih percakapan</h3>
                  <p className="text-gray-500 dark:text-gray-400">Pilih EcoBuddy untuk memulai percakapan.</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Notification