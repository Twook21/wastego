import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const ecoHives = [
  {
    id: 1,
    nama: "EcoHive Taman Kota",
    lokasi: "Taman Kota Utama",
    kapasitas: "500 kg",
    terisi: "320 kg",
    status: "Aktif",
    performa: "85%",
    lastEmpty: "2 hari lalu",
  },
  {
    id: 2,
    nama: "EcoHive Pasar Minggu",
    lokasi: "Pasar Minggu Blok A",
    kapasitas: "350 kg",
    terisi: "275 kg",
    status: "Aktif",
    performa: "92%",
    lastEmpty: "3 hari lalu",
  },
  {
    id: 3,
    nama: "EcoHive Pusat Kota",
    lokasi: "Alun-Alun Pusat",
    kapasitas: "600 kg",
    terisi: "180 kg",
    status: "Maintenance",
    performa: "65%",
    lastEmpty: "7 hari lalu",
  },
  {
    id: 4,
    nama: "EcoHive Terminal Bus",
    lokasi: "Terminal Bus Utara",
    kapasitas: "450 kg",
    terisi: "410 kg",
    status: "Hampir Penuh",
    performa: "78%",
    lastEmpty: "5 hari lalu",
  },
];

const EcoHiveManagement = () => {
  const [selectedEcoHive, setSelectedEcoHive] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const detailRef = useRef(null);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [selectedEcoHive, isAddModalOpen, isEditModalOpen]);

  // Click outside handler for detail panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setSelectedEcoHive(null);
      }
    };

    // Add event listener if detail panel is open
    if (selectedEcoHive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedEcoHive]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Aktif":
        return "bg-lime-500";
      case "Maintenance":
        return "bg-amber-500";
      case "Hampir Penuh":
        return "bg-orange-500";
      case "Tidak Aktif":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEcoHives = ecoHives.filter((hive) => {
    const matchesStatus =
      filterStatus === "Semua" || hive.status === filterStatus;
    const matchesSearch =
      hive.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hive.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (hive) => {
    setSelectedEcoHive(hive);
  };

  const handleEditEcoHive = (hive) => {
    setSelectedEcoHive(hive);
    setIsEditModalOpen(true);
  };

  const closeDetailView = () => {
    setSelectedEcoHive(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 md:py-12 transition-colors duration-200 dark:bg-gray-900">
      {/* Header */}
      <motion.div
        className="mb-6 md:mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-teal-900 dark:text-white mb-2"
          variants={fadeIn}
        >
          Manajemen EcoHive
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan pantau seluruh EcoHive dalam satu platform
        </motion.p>
      </motion.div>

      {/* Filter and Search */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus("Semua")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === "Semua"
                ? "bg-teal-900 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilterStatus("Aktif")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === "Aktif"
                ? "bg-teal-900 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setFilterStatus("Hampir Penuh")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === "Hampir Penuh"
                ? "bg-teal-900 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Hampir Penuh
          </button>
          <button
            onClick={() => setFilterStatus("Maintenance")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filterStatus === "Maintenance"
                ? "bg-teal-900 text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Maintenance
          </button>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i data-feather="search" className="h-4 w-4 text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Cari EcoHive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-teal-900 text-white rounded-md font-medium text-sm"
          >
            <i data-feather="plus" className="h-4 w-4 mr-1"></i>
            <span className="hidden sm:inline">Tambah</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 relative">
        {/* EcoHive List */}
        <motion.div
          className={`transition-all duration-300 ${
            selectedEcoHive ? "w-full lg:w-1/2 xl:w-7/12" : "w-full"
          }`}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 overflow-hidden"
            variants={staggerItems}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell"
                    >
                      Lokasi
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell"
                    >
                      Terisi
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell"
                    >
                      Performa
                    </th>
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredEcoHives.length > 0 ? (
                    filteredEcoHives.map((ecoHive) => (
                      <motion.tr
                        key={ecoHive.id}
                        variants={fadeIn}
                        whileHover={{
                          backgroundColor: "rgba(236, 253, 245, 0.4)",
                          transition: { duration: 0.2 },
                        }}
                        className="cursor-pointer"
                        onClick={() => handleViewDetails(ecoHive)}
                      >
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-lime-500 bg-opacity-20">
                              <i
                                data-feather="box"
                                className="h-4 w-4 sm:h-5 sm:w-5 text-teal-900"
                              ></i>
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {ecoHive.nama}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {ecoHive.lokasi}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              ecoHive.status
                            )} text-white`}
                          >
                            {ecoHive.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {ecoHive.terisi} / {ecoHive.kapasitas}
                          </div>
                          <div className="w-16 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                            <div
                              className="bg-teal-900 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  (parseInt(ecoHive.terisi) /
                                    parseInt(ecoHive.kapasitas)) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {ecoHive.performa}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEcoHive(ecoHive);
                            }}
                            className="text-teal-900 dark:text-lime-500 hover:text-teal-700 dark:hover:text-lime-400 mr-3 sm:mr-4"
                          >
                            <i data-feather="edit-2" className="h-4 w-4"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete/deactivate functionality
                            }}
                            className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                          >
                            <i data-feather="trash-2" className="h-4 w-4"></i>
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        Tidak ada EcoHive yang ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* Detail View */}
        {selectedEcoHive && (
          <motion.div
            ref={detailRef}
            className="lg:w-1/2 xl:w-5/12 transition-all duration-300 sticky top-4 lg:absolute lg:top-0 lg:right-0 lg:h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <motion.div className="bg-white dark:bg-gray-800 rounded-lg ml-6 shadow-md p-4 md:p-6 h-full flex flex-col max-h-[calc(100vh-2rem)] relative">
              <style jsx>{`
                .hide-scrollbar {
                  -ms-overflow-style: none; /* IE and Edge */
                  scrollbar-width: none; /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none; /* Chrome, Safari and Opera */
                }
              `}</style>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg md:text-xl font-bold text-teal-900 dark:text-white">
                  Detail EcoHive
                </h2>
                <button
                  onClick={closeDetailView}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i
                    data-feather="x"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  ></i>
                </button>
              </div>

              {/* Scrollable Content Area - Hidden Scrollbar */}
              <div className="flex-1 overflow-y-auto pr-1 hide-scrollbar">
                <div className="flex items-center mb-6">
                  <div className="bg-lime-500 bg-opacity-20 p-3 md:p-4 rounded-full mr-3 md:mr-4 flex-shrink-0">
                    <i
                      data-feather="box"
                      className="h-6 w-6 md:h-8 md:w-8 text-teal-900"
                    ></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
                      {selectedEcoHive.nama}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                      {selectedEcoHive.lokasi}
                    </p>
                  </div>
                  <span
                    className={`ml-auto px-2 md:px-3 py-1 text-xs md:text-sm font-semibold rounded-full ${getStatusColor(
                      selectedEcoHive.status
                    )} text-white flex-shrink-0`}
                  >
                    {selectedEcoHive.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Kapasitas Total
                    </h4>
                    <p className="text-base md:text-xl font-bold text-teal-900 dark:text-white">
                      {selectedEcoHive.kapasitas}
                    </p>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Terisi
                    </h4>
                    <p className="text-base md:text-xl font-bold text-teal-900 dark:text-white">
                      {selectedEcoHive.terisi}
                    </p>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Performa
                    </h4>
                    <p className="text-base md:text-xl font-bold text-teal-900 dark:text-white">
                      {selectedEcoHive.performa}
                    </p>
                  </div>
                  <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Terakhir Dikosongkan
                    </h4>
                    <p className="text-base md:text-xl font-bold text-teal-900 dark:text-white">
                      {selectedEcoHive.lastEmpty}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
                      Kapasitas Terisi
                    </h4>
                    <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Math.round(
                        (parseInt(selectedEcoHive.terisi) /
                          parseInt(selectedEcoHive.kapasitas)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 md:h-4">
                    <div
                      className={`${
                        parseInt(selectedEcoHive.terisi) /
                          parseInt(selectedEcoHive.kapasitas) >
                        0.8
                          ? "bg-orange-500"
                          : parseInt(selectedEcoHive.terisi) /
                              parseInt(selectedEcoHive.kapasitas) >
                            0.6
                          ? "bg-amber-500"
                          : "bg-lime-500"
                      } h-3 md:h-4 rounded-full`}
                      style={{
                        width: `${
                          (parseInt(selectedEcoHive.terisi) /
                            parseInt(selectedEcoHive.kapasitas)) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mb-6">
                  <h4 className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lokasi EcoHive
                  </h4>
                  <div className="h-32 sm:h-40 md:h-52 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Peta Lokasi
                    </p>
                  </div>
                </div>
              </div>

              {/* Fixed Action Buttons at Bottom */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleEditEcoHive(selectedEcoHive)}
                    className="flex-1 flex justify-center items-center px-3 md:px-4 py-2 bg-teal-900 text-white rounded-md font-medium text-sm"
                  >
                    <i
                      data-feather="edit-2"
                      className="h-4 w-4 mr-1 md:mr-2"
                    ></i>
                    Edit EcoHive
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 flex justify-center items-center px-3 md:px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-md font-medium text-sm"
                  >
                    <i
                      data-feather="refresh-cw"
                      className="h-4 w-4 mr-1 md:mr-2"
                    ></i>
                    Reset Status
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex justify-center items-center px-3 md:px-4 py-2 bg-red-600 text-white rounded-md font-medium text-sm"
                >
                  <i data-feather="power" className="h-4 w-4 mr-1 md:mr-2"></i>
                  Nonaktifkan EcoHive
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      {/* Add EcoHive Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Tambah EcoHive Baru
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i
                    data-feather="x"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  ></i>
                </button>
              </div>

              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nama EcoHive
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    placeholder="Masukkan nama EcoHive"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    placeholder="Masukkan alamat lokasi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Kapasitas (kg)
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
                      <option value="Aktif">Aktif</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md font-medium"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="flex-1 px-4 py-2 bg-teal-900 text-white rounded-md font-medium"
                  >
                    Simpan
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit EcoHive Modal */}
      {isEditModalOpen && selectedEcoHive && (
        <div className="fixed inset-0 overflow-y-auto  bg-white/5 backdrop-blur-sm bg-opacity-50 bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Edit EcoHive
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <i
                    data-feather="x"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  ></i>
                </button>
              </div>

              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nama EcoHive
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    defaultValue={selectedEcoHive.nama}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    defaultValue={selectedEcoHive.lokasi}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Kapasitas (kg)
                    </label>
                    <input
                      type="text"
                      min={0}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      defaultValue={selectedEcoHive.kapasitas.split(" ")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                      defaultValue={selectedEcoHive.status}
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Hampir Penuh">Hampir Penuh</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sampah Terisi (kg)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-teal-900 focus:border-teal-900 bg-white dark:bg-gray-800 text-gray-700 dark:text-white"
                    defaultValue={selectedEcoHive.terisi.split(" ")[0]}
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md font-medium"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="flex-1 px-4 py-2 bg-teal-900 text-white rounded-md font-medium"
                  >
                    Simpan Perubahan
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* EcoHive Activity Stats */}
      <motion.div
        className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerItems}
      >
        {/* Chart 1 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 p-6"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">
            Distribusi Status
          </h3>
          <div className="h-60 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Grafik Distribusi Status
            </p>
          </div>
        </motion.div>

        {/* Chart 2 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 p-6"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">
            Volume Sampah Mingguan
          </h3>
          <div className="h-60 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Grafik Volume Sampah
            </p>
          </div>
        </motion.div>

        {/* Chart 3 */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 p-6"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold text-teal-900 dark:text-white mb-4">
            Performa EcoHive
          </h3>
          <div className="h-60 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Grafik Performa</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        className="mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideFromBottom}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg border-gray-300 p-6"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">
            Aktivitas Terbaru EcoHive
          </h3>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 rounded-full mr-4">
                <i
                  data-feather="refresh-cw"
                  className="text-teal-900 dark:text-teal-900 h-5 w-5"
                ></i>
              </div>
              <div>
                <p className="text-teal-900 dark:text-white font-medium">
                  EcoHive Taman Kota dikosongkan
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  320 kg sampah dikumpulkan
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                2 jam lalu
              </span>
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="bg-amber-500 bg-opacity-20 dark:bg-opacity-20 p-2 rounded-full mr-4">
                <i
                  data-feather="alert-triangle"
                  className="text-amber-700 dark:text-amber-700 h-5 w-5"
                ></i>
              </div>
              <div>
                <p className="text-teal-900 dark:text-white font-medium">
                  EcoHive Pusat Kota dalam mode maintenance
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Perbaikan sensor berat
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                1 hari lalu
              </span>
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 rounded-full mr-4">
                <i
                  data-feather="plus-circle"
                  className="text-teal-900 dark:text-teal-900 h-5 w-5"
                ></i>
              </div>
              <div>
                <p className="text-teal-900 dark:text-white font-medium">
                  EcoHive baru ditambahkan
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  EcoHive Terminal Bus
                </p>
              </div>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                3 hari lalu
              </span>
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-teal-900 text-sm font-medium rounded-md text-teal-900 dark:text-lime-500 hover:bg-teal-900 hover:text-white dark:hover:bg-lime-500 dark:hover:text-teal-900 transition-colors"
          >
            Lihat Semua Aktivitas
          </motion.button>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-8 bg-lime-500 rounded-lg p-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={slideFromBottom}
      >
        <motion.h2
          className="text-xl font-bold text-teal-900 dark:text-white mb-2"
          variants={fadeIn}
        >
          Tambahkan EcoHive Baru ke Jaringan
        </motion.h2>
        <motion.p
          className="text-teal-900 dark:text-white mb-4"
          variants={fadeIn}
        >
          Perluas jangkauan pengelolaan sampah dengan menambahkan EcoHive baru
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white dark:text-lime-500 bg-teal-900 dark:bg-teal-900 hover:bg-opacity-90"
        >
          <i data-feather="plus" className="h-5 w-5 mr-2"></i>
          Tambah EcoHive Baru
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EcoHiveManagement;
