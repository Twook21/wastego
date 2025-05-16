import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  ChevronDown,
  BarChart3,
  ArrowUpDown,
  FileText,
} from "lucide-react";

// Sample data for EcoCentral management
const deposits = [
  {
    id: 1,
    ecohive: "EcoHive Menteng",
    ecobuddy: "John Doe",
    type: "Plastik",
    weight: "25 kg",
    status: "Tertunda",
    date: "11 Mei 2025",
    payment: "Rp 125.000",
  },
  {
    id: 2,
    ecohive: "EcoHive Kemang",
    ecobuddy: "Jane Smith",
    type: "Kertas",
    weight: "18 kg",
    status: "Diverifikasi",
    date: "10 Mei 2025",
    payment: "Rp 90.000",
  },
  {
    id: 3,
    ecohive: "EcoHive Sudirman",
    ecobuddy: "Ahmad Rasyid",
    type: "Kaca",
    weight: "12 kg",
    status: "Diproses",
    date: "9 Mei 2025",
    payment: "Rp 72.000",
  },
  {
    id: 4,
    ecohive: "EcoHive Gading",
    ecobuddy: "Siti Nurhayati",
    type: "Elektronik",
    weight: "8 kg",
    status: "Diverifikasi",
    date: "8 Mei 2025",
    payment: "Rp 200.000",
  },
];

// Add summary statistics
const summaryStats = [
  {
    title: "Total Setoran",
    value: "63 kg",
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Total EcoHive Aktif",
    value: "4",
    change: "+1",
    changeType: "positive",
  },
  {
    title: "Total EcoBuddy",
    value: "42",
    change: "+5",
    changeType: "positive",
  },
  {
    title: "Setoran Tertunda",
    value: "8",
    change: "-2",
    changeType: "positive",
  },
];

const EcoCentralManagement = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Toggle expanded row for mobile view
  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideFromBottom = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
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

  // Get color for waste type
  const getTypeColor = (type) => {
    switch (type) {
      case "Plastik":
        return "bg-blue-500";
      case "Kertas":
        return "bg-yellow-500";
      case "Kaca":
        return "bg-purple-500";
      default:
        return "bg-red-500";
    }
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Diverifikasi":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Tertunda":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Diproses":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 transition-colors duration-200 dark:bg-gray-900">
      {/* Header Section */}
      <motion.div
        className="mb-6"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-white mb-1"
          variants={fadeIn}
        >
          EcoCentral Dashboard
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Manajemen pusat untuk EcoHive dan EcoBuddy
        </motion.p>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {summaryStats.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <h3 className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full flex items-center ${
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {["all", "pending", "verified", "processing"].map((tab) => {
          const tabLabels = {
            all: "Semua Setoran",
            pending: "Tertunda",
            verified: "Diverifikasi",
            processing: "Diproses",
          };

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded-full ${
                activeTab === tab
                  ? "bg-teal-900 text-white dark:bg-teal-700"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {tabLabels[tab]}
            </button>
          );
        })}
      </motion.div>

      {/* Action Bar */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari setoran, EcoHive, atau EcoBuddy..."
            className="pl-10 pr-4 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 sm:px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden xs:inline">Filter</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 sm:px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden xs:inline">Laporan</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 sm:px-4 bg-teal-700 text-white rounded-lg hover:bg-opacity-90 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Tambah</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Table Section - Desktop View */}
      <motion.div
        className="hidden md:block overflow-hidden rounded-xl border shadow-lg border-gray-300"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  EcoHive
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  EcoBuddy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Jenis
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Berat
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Pembayaran
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium">
                  Aksi
                </th>
              </tr>
            </thead>
            <motion.tbody
              className="divide-y divide-gray-200 dark:divide-gray-700"
              variants={staggerItems}
            >
              {deposits.map((deposit) => (
                <motion.tr
                  key={deposit.id}
                  variants={fadeIn}
                  whileHover={{
                    backgroundColor: "rgba(243, 244, 246, 0.5)",
                    dark: "rgba(55, 65, 81, 0.5)",
                  }}
                  className="transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    #{deposit.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {deposit.ecohive}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {deposit.ecobuddy}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${getTypeColor(
                          deposit.type
                        )}`}
                      ></span>
                      {deposit.type}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {deposit.weight}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {deposit.payment}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs">
                    {deposit.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        deposit.status
                      )}`}
                    >
                      {deposit.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {deposit.status === "Tertunda" && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 rounded text-teal-600 hover:bg-teal-100 dark:hover:bg-teal-900 dark:hover:bg-opacity-30"
                        >
                          <Check className="h-4 w-4" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 dark:hover:bg-opacity-30"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FileText className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 rounded text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:bg-opacity-30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      {/* Card View - Mobile */}
      <motion.div
        className="md:hidden space-y-3"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {deposits.map((deposit) => (
          <motion.div
            key={deposit.id}
            variants={fadeIn}
            className="rounded-lg shadow-lg border border-gray-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 overflow-hidden"
          >
            {/* Card Header */}
            <div
              className="p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-700 cursor-pointer"
              onClick={() => toggleRow(deposit.id)}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">#{deposit.id}</span>
                <div>
                  <div className="font-medium text-sm">{deposit.ecohive}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {deposit.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    deposit.status
                  )}`}
                >
                  {deposit.status}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    expandedRow === deposit.id ? "transform rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Card Details - Expanded */}
            {expandedRow === deposit.id && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      EcoBuddy
                    </div>
                    <div className="font-medium">{deposit.ecobuddy}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Jenis
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${getTypeColor(
                          deposit.type
                        )}`}
                      ></span>
                      {deposit.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Berat
                    </div>
                    <div className="font-medium">{deposit.weight}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Pembayaran
                    </div>
                    <div className="font-medium">{deposit.payment}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  {deposit.status === "Tertunda" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 min-w-[80px] p-2 rounded bg-teal-600 text-white hover:bg-teal-700 flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Verifikasi
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[80px] p-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[80px] p-2 rounded bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Laporan
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 min-w-[80px] p-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div
        className="flex justify-between items-center mt-4 sm:mt-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          1-4 dari 4 data
        </p>
        <div className="flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 sm:px-3 py-1 rounded-md bg-teal-700 text-white"
          >
            1
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            disabled
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EcoCentralManagement;
