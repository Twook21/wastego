import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  Upload,
  Edit,
  Save,
  X,
  ChevronRight,
  LogOut,
  Shield,
  Clock,
  Settings,
  Camera,
  Bell,
  CheckCircle,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

const ProfilePage = () => {
  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);
  
  // State untuk data profil
  const [profileData, setProfileData] = useState({
    name: "EcoStation Kebon Jeruk",
    email: "kebon.jeruk@ecohive.id",
    phone: "021-7654321",
    address: "Jl. Raya Kebon Jeruk No. 123, Jakarta Barat",
    joinDate: "15 Januari 2023",
    role: "EcoStation Administrator",
    operationalHours: "Senin-Sabtu, 08.00-17.00",
    avatar: null // URL avatar jika ada
  });

  // State untuk pengaturan notifikasi
  const [notificationSettings, setNotificationSettings] = useState({
    newDeposit: true,
    messages: true,
    pickupAlerts: true,
    systemUpdates: false
  });

  // Handle perubahan data profil
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Toggle pengaturan notifikasi
  const toggleNotification = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini akan ada kode untuk menyimpan data ke server
    setIsEditing(false);
  };

  // Handle file upload untuk avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Di dunia nyata, kita akan upload file ke server
      // dan mendapatkan URL-nya
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Variants animasi
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    },
    exit: { opacity: 0, y: 20 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.95 },
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-teal-900 dark:text-lime-500">
          Profil Saya
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola informasi profil dan pengaturan akun Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom kiri - Info profil */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="md:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-teal-900 dark:text-white flex items-center">
                <User className="mr-2" size={18} />
                Informasi Profil
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-full ${
                  isEditing 
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400"
                    : "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:bg-opacity-20 dark:text-teal-400"
                }`}
              >
                {isEditing ? <X size={18} /> : <Edit size={18} />}
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-teal-200 dark:bg-teal-700 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                    {profileData.avatar ? (
                      <img 
                        src={profileData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>EK</span>
                    )}
                  </div>
                  {isEditing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 right-0"
                    >
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-teal-600 dark:bg-lime-600 text-white p-2 rounded-full shadow-md"
                        >
                          <Camera size={16} />
                        </motion.div>
                      </label>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                    </motion.div>
                  )}
                </div>
                <div className="text-center sm:text-left">
  <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-1">
    {isEditing ? (
      <input
        type="text"
        name="name"
        value={profileData.name}
        onChange={handleInputChange}
        maxLength={30} // Batasan maksimal 50 karakter
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-lime-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
      />
    ) : (
      profileData.name
    )}
  </h3>
  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
    {profileData.role}
  </p>
  <div className="flex items-center justify-center sm:justify-start text-xs text-teal-600 dark:text-lime-500">
    <Calendar size={14} className="mr-1" />
    <span>Bergabung {profileData.joinDate}</span>
  </div>
</div>
              </div>
              <div className="space-y-4">
  <motion.div 
    variants={itemVariants}
    className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
  >
    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 sm:w-1/3">
      <Mail size={16} className="mr-2" />
      <span className="text-sm">Email</span>
    </div>
    <div className="sm:w-2/3">
      {isEditing ? (
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          maxLength={100} // Batas maksimal panjang karakter
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-lime-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
        />
      ) : (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {profileData.email}
        </span>
      )}
    </div>
  </motion.div>

  <motion.div 
    variants={itemVariants}
    className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
  >
    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 sm:w-1/3">
      <Phone size={16} className="mr-2" />
      <span className="text-sm">Telepon</span>
    </div>
    <div className="sm:w-2/3">
      {isEditing ? (
        <input
          type="tel"
          name="phone"
          value={profileData.phone}
          onChange={handleInputChange}
          pattern="[0-9]+" // Hanya angka
          maxLength={15} // Batas maksimal panjang karakter
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-lime-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
        />
      ) : (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {profileData.phone}
        </span>
      )}
    </div>
  </motion.div>

  <motion.div 
    variants={itemVariants}
    className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
  >
    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 sm:w-1/3">
      <MapPin size={16} className="mr-2" />
      <span className="text-sm">Alamat</span>
    </div>
    <div className="sm:w-2/3">
      {isEditing ? (
        <textarea
          name="address"
          value={profileData.address}
          onChange={handleInputChange}
          rows="2"
          maxLength={100} // Batas maksimal panjang karakter
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-lime-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full resize-none"
        />
      ) : (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {profileData.address}
        </span>
      )}
    </div>
  </motion.div>

  <motion.div 
    variants={itemVariants}
    className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
  >
    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 sm:w-1/3">
      <Clock size={16} className="mr-2" />
      <span className="text-sm">Jam Operasional</span>
    </div>
    <div className="sm:w-2/3">
      {isEditing ? (
        <input
          type="text"
          name="operationalHours"
          value={profileData.operationalHours}
          onChange={handleInputChange}
          maxLength={50} // Batas maksimal panjang karakter
          pattern="^[0-9:\s-]+$" // Hanya angka, titik dua, spasi, atau tanda hubung
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-lime-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full"
        />
      ) : (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {profileData.operationalHours}
        </span>
      )}
    </div>
  </motion.div>
</div>

              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-end space-x-3"
                >
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-teal-600 dark:bg-lime-600 text-white rounded-md hover:bg-teal-700 dark:hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-lime-500 transition-colors flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Simpan Perubahan
                  </motion.button>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Kolom kanan - Menu utama dan pengaturan */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Pengaturan notifikasi */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20 p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-teal-900 dark:text-white flex items-center">
                <Bell className="mr-2" size={18} />
                Notifikasi
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {/* Notifikasi setoran baru */}
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 dark:bg-opacity-20 text-green-600 dark:text-green-400 p-2 rounded-full mr-3">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Setoran Baru</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.newDeposit}
                    onChange={() => toggleNotification('newDeposit')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-lime-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-lime-600"></div>
                </label>
              </div>

              {/* Notifikasi pesan */}
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-600 dark:text-blue-400 p-2 rounded-full mr-3">
                    <MessageSquare size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Pesan Baru</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.messages}
                    onChange={() => toggleNotification('messages')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-lime-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-lime-600"></div>
                </label>
              </div>

              {/* Notifikasi penjemputan */}
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400 p-2 rounded-full mr-3">
                    <AlertTriangle size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Peringatan Penjemputan</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.pickupAlerts}
                    onChange={() => toggleNotification('pickupAlerts')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-lime-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-lime-600"></div>
                </label>
              </div>

              {/* Notifikasi sistem */}
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                <div className="flex items-center">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 p-2 rounded-full mr-3">
                    <Settings size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Pembaruan Sistem</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.systemUpdates}
                    onChange={() => toggleNotification('systemUpdates')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 dark:peer-focus:ring-lime-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600 dark:peer-checked:bg-lime-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Menu pengaturan lainnya */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-teal-50 dark:bg-teal-900 dark:bg-opacity-20 p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-teal-900 dark:text-white flex items-center">
                <Settings className="mr-2" size={18} />
                Pengaturan Lainnya
              </h2>
            </div>
            <div className="p-2">
              <motion.div 
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-3">
                    <Shield size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Keamanan & Privasi</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </motion.div>

              <motion.div 
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 text-yellow-600 dark:text-yellow-400 p-2 rounded-full mr-3">
                    <Upload size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Upgrade Akun</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </motion.div>

              <motion.div 
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                className="flex items-center justify-between p-3 rounded-md cursor-pointer dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-600 dark:text-red-400 p-2 rounded-full mr-3">
                    <Trash2 size={16} />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">Hapus Akun</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Tombol Logout */}
          <motion.div>
            <Link to="/" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-red-600 dark:text-red-400 font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-transform transition-colors duration-200 ease-in-out flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Keluar</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;