import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Trash2,
  Bell,
  Palette,
  Globe,
  Edit2,
  Plus,
  Save,
  X,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  Menu,
} from "lucide-react";

const SystemSettingsPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("waste-categories");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for waste categories
  const [wasteCategories, setWasteCategories] = useState([
    { id: 1, name: "Plastik", color: "#10B981", icon: "🥤", isActive: true },
    { id: 2, name: "Kertas", color: "#6366F1", icon: "📄", isActive: true },
    { id: 3, name: "Logam", color: "#71717A", icon: "🥫", isActive: true },
    { id: 4, name: "Kaca", color: "#60A5FA", icon: "🍶", isActive: true },
    { id: 5, name: "Organik", color: "#F59E0B", icon: "🥬", isActive: true },
    {
      id: 6,
      name: "Elektronik",
      color: "#EC4899",
      icon: "📱",
      isActive: false,
    },
  ]);

  // State for editing category
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#10B981",
    icon: "♻️",
    isActive: true,
  });

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    newContributions: true,
    systemUpdates: true,
    achievements: true,
    marketplaceActivity: false,
    communityEvents: true,
    weeklyReports: true,
    maintenanceAlerts: true,
    partnerPromotions: false,
  });

  // State for app configuration
  const [appConfig, setAppConfig] = useState({
    theme: "auto",
    primaryColor: "#10B981",
    language: "id",
    dateFormat: "DD/MM/YYYY",
    showTutorials: true,
    enableAnimations: true,
    highContrastMode: false,
    compactMode: false,
  });

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0 },
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

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  // Handle editing category
  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
    setIsAddingCategory(false);
  };

  // Save edited category
  const saveCategory = () => {
    if (editingCategory) {
      setWasteCategories(
        wasteCategories.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
    }
  };

  // Add new category
  const addNewCategory = () => {
    if (newCategory.name.trim() === "") return;

    const newId = Math.max(...wasteCategories.map((cat) => cat.id)) + 1;
    setWasteCategories([
      ...wasteCategories,
      {
        id: newId,
        ...newCategory,
      },
    ]);

    setNewCategory({
      name: "",
      color: "#10B981",
      icon: "♻️",
      isActive: true,
    });
    setIsAddingCategory(false);
  };

  // Toggle category active status
  const toggleCategoryStatus = (id) => {
    setWasteCategories(
      wasteCategories.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <motion.div
      className="px-4 py-4 md:container md:mx-auto md:py-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center">
          <Settings className="h-6 w-6 md:h-8 md:w-8 text-teal-600 dark:text-teal-500 mr-2 md:mr-3" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Pengaturan Sistem
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="p-2 rounded-md text-gray-500 hover:text-teal-600 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 overflow-hidden">
        {/* Mobile Tabs Dropdown */}
        <div className="md:hidden border-b border-gray-200 dark:border-gray-700">
          <button
            className="w-full px-4 py-3 flex justify-between items-center text-left text-sm font-medium text-teal-600 dark:text-teal-500 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {activeTab === "waste-categories" && (
              <span className="flex items-center">
                <Trash2 className="h-4 w-4 mr-2" />
                Kategori Sampah
              </span>
            )}
            {activeTab === "notifications" && (
              <span className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifikasi Global
              </span>
            )}
            {activeTab === "app-config" && (
              <span className="flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Konfigurasi Aplikasi
              </span>
            )}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                mobileMenuOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {mobileMenuOpen && (
            <div className="border-t border-gray-200 dark:border-gray-700">
              <button
                className={`w-full px-4 py-3 text-left text-sm flex items-center ${
                  activeTab === "waste-categories"
                    ? "text-teal-600 dark:text-teal-500 bg-gray-50 dark:bg-gray-750"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => handleTabChange("waste-categories")}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Kategori Sampah
              </button>

              <button
                className={`w-full px-4 py-3 text-left text-sm flex items-center ${
                  activeTab === "notifications"
                    ? "text-teal-600 dark:text-teal-500 bg-gray-50 dark:bg-gray-750"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => handleTabChange("notifications")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifikasi Global
              </button>

              <button
                className={`w-full px-4 py-3 text-left text-sm flex items-center ${
                  activeTab === "app-config"
                    ? "text-teal-600 dark:text-teal-500 bg-gray-50 dark:bg-gray-750"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => handleTabChange("app-config")}
              >
                <Palette className="h-4 w-4 mr-2" />
                Konfigurasi Aplikasi
              </button>
            </div>
          )}
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === "waste-categories"
                ? "text-teal-600 dark:text-teal-500 border-b-2 border-teal-600 dark:border-teal-500"
                : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500"
            }`}
            onClick={() => setActiveTab("waste-categories")}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Kategori Sampah
          </button>

          <button
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === "notifications"
                ? "text-teal-600 dark:text-teal-500 border-b-2 border-teal-600 dark:border-teal-500"
                : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifikasi Global
          </button>

          <button
            className={`px-6 py-4 text-sm font-medium flex items-center ${
              activeTab === "app-config"
                ? "text-teal-600 dark:text-teal-500 border-b-2 border-teal-600 dark:border-teal-500"
                : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500"
            }`}
            onClick={() => setActiveTab("app-config")}
          >
            <Palette className="h-4 w-4 mr-2" />
            Konfigurasi Aplikasi
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Waste Categories Tab */}
          {activeTab === "waste-categories" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerItems}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
                <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-2 sm:mb-0">
                  Pengelolaan Kategori Sampah
                </h2>
                <button
                  onClick={() => {
                    setIsAddingCategory(true);
                    setEditingCategory(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Tambah Kategori
                </button>
              </div>

              {/* Add Category Form */}
              {isAddingCategory && (
                <motion.div
                  variants={fadeIn}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 md:p-4 mb-4 md:mb-6"
                >
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <h3 className="text-sm md:text-md font-medium text-gray-800 dark:text-white">
                      Tambah Kategori Baru
                    </h3>
                    <button
                      onClick={() => setIsAddingCategory(false)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nama Kategori
                      </label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Masukkan nama kategori"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Icon
                      </label>
                      <input
                        type="text"
                        value={newCategory.icon}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            icon: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Emoji atau ikon (contoh: ♻️)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Warna
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={newCategory.color}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              color: e.target.value,
                            })
                          }
                          className="w-10 h-10 rounded p-0 border-0 cursor-pointer mr-2"
                        />
                        <input
                          type="text"
                          value={newCategory.color}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              color: e.target.value,
                            })
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="#RRGGBB"
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-2">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={newCategory.isActive}
                            onChange={() =>
                              setNewCategory({
                                ...newCategory,
                                isActive: !newCategory.isActive,
                              })
                            }
                          />
                          <div
                            className={`block w-12 h-6 md:w-14 md:h-8 rounded-full ${
                              newCategory.isActive
                                ? "bg-teal-600"
                                : "bg-gray-400 dark:bg-gray-600"
                            }`}
                          ></div>
                          <div
                            className={`absolute left-1 top-1 bg-white w-4 h-4 md:w-6 md:h-6 rounded-full transition-transform ${
                              newCategory.isActive
                                ? "transform translate-x-6 md:translate-x-6"
                                : ""
                            }`}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          {newCategory.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsAddingCategory(false)}
                      className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Batal
                    </button>
                    <button
                      onClick={addNewCategory}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Category Table */}
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md mb-4 md:mb-6">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {wasteCategories.map((category) => (
                    <React.Fragment key={category.id}>
                      <motion.li
                        key={category.id}
                        variants={fadeIn}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                          !category.isActive ? "opacity-60" : ""
                        }`}
                      >
                        <div className="px-3 py-3 sm:px-4 sm:py-4 flex flex-col sm:flex-row sm:items-center">
                          <div className="flex items-center mb-2 sm:mb-0 sm:flex-1">
                            <span
                              className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-lg md:text-xl"
                              style={{ backgroundColor: category.color }}
                            >
                              {category.icon}
                            </span>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                {category.name}
                              </h3>
                              <div className="mt-1 flex items-center">
                                <span
                                  className="inline-block h-3 w-3 rounded-full mr-1"
                                  style={{ backgroundColor: category.color }}
                                ></span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {category.color}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                            <div
                              className={`mr-2 sm:mr-4 px-2 py-1 text-xs rounded-full ${
                                category.isActive
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                              }`}
                            >
                              {category.isActive ? "Aktif" : "Nonaktif"}
                            </div>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  toggleCategoryStatus(category.id)
                                }
                                className={`mr-2 p-1 rounded-full cursor-pointer ${
                                  category.isActive
                                    ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                                    : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                {category.isActive ? (
                                  <ToggleRight className="h-5 w-5" />
                                ) : (
                                  <ToggleLeft className="h-5 w-5" />
                                )}
                              </button>

                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-1 rounded-full text-gray-400 hover:text-teal-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                      {/* Edit Category Form */}
                      {editingCategory?.id === category.id && (
                        <motion.div
                          variants={fadeIn}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mt-2 md:p-4 mb-4 md:mb-6"
                        >
                          <div className="flex justify-between items-center mb-3 md:mb-4">
                            <h3 className="text-sm md:text-md font-medium text-gray-800 dark:text-white">
                              Edit Kategori
                            </h3>
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-3 md:gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Nama Kategori
                              </label>
                              <input
                                type="text"
                                value={editingCategory.name}
                                onChange={(e) =>
                                  setEditingCategory({
                                    ...editingCategory,
                                    name: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Icon
                              </label>
                              <input
                                type="text"
                                value={editingCategory.icon}
                                onChange={(e) =>
                                  setEditingCategory({
                                    ...editingCategory,
                                    icon: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Warna
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="color"
                                  value={editingCategory.color}
                                  onChange={(e) =>
                                    setEditingCategory({
                                      ...editingCategory,
                                      color: e.target.value,
                                    })
                                  }
                                  className="w-10 h-10 rounded p-0 border-0 cursor-pointer mr-2"
                                />
                                <input
                                  type="text"
                                  value={editingCategory.color}
                                  onChange={(e) =>
                                    setEditingCategory({
                                      ...editingCategory,
                                      color: e.target.value,
                                    })
                                  }
                                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                              </div>
                            </div>

                            <div className="flex items-center mt-2">
                              <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={editingCategory.isActive}
                                    onChange={() =>
                                      setEditingCategory({
                                        ...editingCategory,
                                        isActive: !editingCategory.isActive,
                                      })
                                    }
                                  />
                                  <div
                                    className={`block w-12 h-6 md:w-14 md:h-8 rounded-full ${
                                      editingCategory.isActive
                                        ? "bg-teal-600"
                                        : "bg-gray-400 dark:bg-gray-600"
                                    }`}
                                  ></div>
                                  <div
                                    className={`absolute left-1 top-1 bg-white w-4 h-4 md:w-6 md:h-6 rounded-full transition-transform ${
                                      editingCategory.isActive
                                        ? "transform translate-x-6 md:translate-x-6"
                                        : ""
                                    }`}
                                  ></div>
                                </div>
                                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                  {editingCategory.isActive
                                    ? "Aktif"
                                    : "Nonaktif"}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="mr-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              Batal
                            </button>
                            <button
                              onClick={saveCategory}
                              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Simpan
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="mt-4 md:mt-6 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-md p-3 md:p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs md:text-sm font-medium text-yellow-800 dark:text-yellow-400">
                      Informasi Penting
                    </h3>
                    <div className="mt-1 text-xs md:text-sm text-yellow-700 dark:text-yellow-300">
                      <p>
                        Menonaktifkan kategori akan menyembunyikannya dari
                        tampilan EcoBuddy, namun data historis tetap tersimpan.
                        Pertimbangkan dengan baik sebelum membuat perubahan pada
                        kategori yang sudah aktif.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerItems}
            >
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Pengaturan Notifikasi Global
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Konfigurasi notifikasi yang akan diterima oleh semua pengguna
                  platform. Pengaturan ini akan mengganti preferensi individual.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Notification Items */}
                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Kontribusi Baru
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi saat ada kontribusi baru dari EcoBuddy
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("newContributions")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.newContributions
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.newContributions ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Update Sistem
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi tentang pembaruan dan peningkatan sistem
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("systemUpdates")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.systemUpdates
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.systemUpdates ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Pencapaian
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi saat pengguna mencapai milestone atau badge
                          baru
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("achievements")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.achievements
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.achievements ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Aktivitas Marketplace
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi terkait transaksi dan aktivitas di
                          marketplace
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          toggleNotification("marketplaceActivity")
                        }
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.marketplaceActivity
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.marketplaceActivity ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Acara Komunitas
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi tentang acara dan kegiatan komunitas
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("communityEvents")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.communityEvents
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.communityEvents ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Laporan Mingguan
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Laporan statistik dan ringkasan aktivitas mingguan
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("weeklyReports")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.weeklyReports
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.weeklyReports ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Peringatan Pemeliharaan
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Notifikasi tentang jadwal pemeliharaan dan downtime
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("maintenanceAlerts")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.maintenanceAlerts
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.maintenanceAlerts ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Promosi Partner
                        </h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Promosi dan penawaran dari mitra EcoBuddy
                        </p>
                      </div>
                      <button
                        onClick={() => toggleNotification("partnerPromotions")}
                        className={`p-1 rounded-full cursor-pointer ${
                          notificationSettings.partnerPromotions
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {notificationSettings.partnerPromotions ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>
                </ul>
              </div>

              <div className="mt-6 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                      Tentang Notifikasi
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>
                        Pengaturan ini mempengaruhi seluruh sistem. Pengguna
                        masih dapat menyesuaikan preferensi notifikasi mereka
                        secara individual melalui menu pengaturan akun mereka.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* App Configuration Tab */}
          {activeTab === "app-config" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerItems}
            >
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Konfigurasi Aplikasi
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sesuaikan pengaturan tampilan dan fungsionalitas aplikasi
                  EcoBuddy
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md mb-6">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Tampilan
                  </h3>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Tema
                          </h4>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Pilih tema tampilan aplikasi
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <select
                            value={appConfig.theme}
                            onChange={(e) =>
                              setAppConfig({
                                ...appConfig,
                                theme: e.target.value,
                              })
                            }
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                          >
                            <option value="light">Terang</option>
                            <option value="dark">Gelap</option>
                            <option value="auto">Otomatis (Sistem)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Warna Utama
                          </h4>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Pilih warna aksen untuk aplikasi
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={appConfig.primaryColor}
                            onChange={(e) =>
                              setAppConfig({
                                ...appConfig,
                                primaryColor: e.target.value,
                              })
                            }
                            className="w-10 h-10 rounded p-0 border-0 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={appConfig.primaryColor}
                            onChange={(e) =>
                              setAppConfig({
                                ...appConfig,
                                primaryColor: e.target.value,
                              })
                            }
                            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Bahasa
                          </h4>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Pilih bahasa antarmuka aplikasi
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <select
                            value={appConfig.language}
                            onChange={(e) =>
                              setAppConfig({
                                ...appConfig,
                                language: e.target.value,
                              })
                            }
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                          >
                            <option value="id">Bahasa Indonesia</option>
                            <option value="en">English</option>
                            <option value="jv">Basa Jawa</option>
                            <option value="su">Basa Sunda</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Format Tanggal
                          </h4>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Pilih format tanggal yang digunakan
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <select
                            value={appConfig.dateFormat}
                            onChange={(e) =>
                              setAppConfig({
                                ...appConfig,
                                dateFormat: e.target.value,
                              })
                            }
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD MMMM YYYY">DD MMMM YYYY</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">
                    Aksesibilitas & Preferensi
                  </h3>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Tampilkan Tutorial
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Menampilkan petunjuk penggunaan untuk pengguna baru
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setAppConfig({
                            ...appConfig,
                            showTutorials: !appConfig.showTutorials,
                          })
                        }
                        className={`p-1 rounded-full cursor-pointer ${
                          appConfig.showTutorials
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {appConfig.showTutorials ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Aktifkan Animasi
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Mengaktifkan animasi dan transisi di antarmuka
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setAppConfig({
                            ...appConfig,
                            enableAnimations: !appConfig.enableAnimations,
                          })
                        }
                        className={`p-1 rounded-full cursor-pointer ${
                          appConfig.enableAnimations
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {appConfig.enableAnimations ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Mode Kontras Tinggi
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Meningkatkan kontras untuk aksesibilitas yang lebih
                          baik
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setAppConfig({
                            ...appConfig,
                            highContrastMode: !appConfig.highContrastMode,
                          })
                        }
                        className={`p-1 rounded-full cursor-pointer ${
                          appConfig.highContrastMode
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {appConfig.highContrastMode ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>

                  <motion.li variants={fadeIn}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Mode Kompak
                        </h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Menampilkan lebih banyak informasi dalam ruang yang
                          lebih kecil
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setAppConfig({
                            ...appConfig,
                            compactMode: !appConfig.compactMode,
                          })
                        }
                        className={`p-1 rounded-full cursor-pointer ${
                          appConfig.compactMode
                            ? "text-green-600 hover:bg-green-100 dark:text-green-500 dark:hover:bg-green-900 dark:hover:bg-opacity-30"
                            : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {appConfig.compactMode ? (
                          <ToggleRight className="h-6 w-6" />
                        ) : (
                          <ToggleLeft className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </motion.li>
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="cursor-pointer mr-3 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  Batalkan Perubahan
                </button>
                <button className=" cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  <Save className="h-4 w-4 mr-1" />
                  Simpan Pengaturan
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        EcoBuddy System Settings © 2025 • Admin Panel v3.2.1
      </div>
    </motion.div>
  );
};

export default SystemSettingsPage;
