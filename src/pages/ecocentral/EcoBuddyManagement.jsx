import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ecobuddies = [
  {
    id: 1,
    name: "John Doe",
    totalDeposit: "245 kg",
    lastActivity: "2 jam lalu",
    level: "Gold",
    ecohive: "EcoHive Sektor A",
    status: "active",
    setoran: [12, 18, 25, 15, 20, 22],
    kontribusi: {
      plastik: 125,
      kertas: 80,
      logam: 40,
    },
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    totalDeposit: "180 kg",
    lastActivity: "5 jam lalu",
    level: "Silver",
    ecohive: "EcoHive Sektor B",
    status: "active",
    setoran: [8, 15, 10, 12, 14, 16],
    kontribusi: {
      plastik: 90,
      kertas: 65,
      logam: 25,
    },
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: 3,
    name: "Ahmad Rasyid",
    totalDeposit: "320 kg",
    lastActivity: "1 hari lalu",
    level: "Platinum",
    ecohive: "EcoHive Sektor A",
    status: "active",
    setoran: [22, 25, 18, 20, 24, 30],
    kontribusi: {
      plastik: 160,
      kertas: 95,
      logam: 65,
    },
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: 4,
    name: "Siti Nurhayati",
    totalDeposit: "165 kg",
    lastActivity: "3 jam lalu",
    level: "Silver",
    ecohive: "EcoHive Sektor C",
    status: "active",
    setoran: [10, 12, 15, 13, 14, 16],
    kontribusi: {
      plastik: 85,
      kertas: 60,
      logam: 20,
    },
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: 5,
    name: "Budi Santoso",
    totalDeposit: "90 kg",
    lastActivity: "1 hari lalu",
    level: "Bronze",
    ecohive: "EcoHive Sektor B",
    status: "inactive",
    setoran: [5, 8, 10, 7, 9, 12],
    kontribusi: {
      plastik: 45,
      kertas: 30,
      logam: 15,
    },
    imageUrl: "/api/placeholder/100/100",
  },
  {
    id: 6,
    name: "Dewi Lestari",
    totalDeposit: "210 kg",
    lastActivity: "6 jam lalu",
    level: "Gold",
    ecohive: "EcoHive Sektor C",
    status: "active",
    setoran: [15, 18, 20, 17, 19, 21],
    kontribusi: {
      plastik: 100,
      kertas: 85,
      logam: 25,
    },
    imageUrl: "/api/placeholder/100/100",
  },
];

const ecohives = [
  { id: 1, name: "EcoHive Sektor A", address: "Jl. Sudirman No. 123" },
  { id: 2, name: "EcoHive Sektor B", address: "Jl. Gatot Subroto No. 45" },
  { id: 3, name: "EcoHive Sektor C", address: "Jl. Diponegoro No. 67" },
  { id: 4, name: "EcoHive Sektor D", address: "Jl. Pahlawan No. 89" },
];

const EcoBuddyManagement = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedEcoBuddy, setSelectedEcoBuddy] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [filterEcohive, setFilterEcohive] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredEcoBuddies, setFilteredEcoBuddies] = useState(ecobuddies);
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [showFilterMenu, showMobileSearch, showDetailModal, showDeactivateModal]);

  useEffect(() => {
    // Filter the ecobuddies based on selected filters
    let filtered = [...ecobuddies];

    if (filterEcohive !== "all") {
      filtered = filtered.filter((eb) => eb.ecohive === filterEcohive);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((eb) => eb.status === filterStatus);
    }

    if (filterDeposit > 0) {
      filtered = filtered.filter(
        (eb) => parseInt(eb.totalDeposit) >= filterDeposit
      );
    }

    // Sort the filtered ecobuddies
    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "total-desc") {
      filtered.sort(
        (a, b) => parseInt(b.totalDeposit) - parseInt(a.totalDeposit)
      );
    } else if (sortOption === "total-asc") {
      filtered.sort(
        (a, b) => parseInt(a.totalDeposit) - parseInt(b.totalDeposit)
      );
    } else if (sortOption === "recent") {
      filtered.sort((a, b) => {
        if (a.lastActivity.includes("jam") && b.lastActivity.includes("jam")) {
          return parseInt(a.lastActivity) - parseInt(b.lastActivity);
        } else if (a.lastActivity.includes("jam")) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    setFilteredEcoBuddies(filtered);
  }, [filterEcohive, filterStatus, sortOption, filterDeposit]);

  // Get summary statistics
  const getTotalActiveEcoBuddies = () => {
    return ecobuddies.filter((eb) => eb.status === "active").length;
  };

  const getTotalInactiveEcoBuddies = () => {
    return ecobuddies.filter((eb) => eb.status === "inactive").length;
  };

  const getTotalDepositAllEcoBuddies = () => {
    return (
      ecobuddies.reduce((sum, eb) => sum + parseInt(eb.totalDeposit), 0) + " kg"
    );
  };

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
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

  const slideInFromRight = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
  };

  const slideInFromTop = {
    hidden: { y: "-100%" },
    visible: {
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Platinum":
        return "from-cyan-400 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800";
      case "Gold":
        return "from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800";
      case "Silver":
        return "from-gray-300 to-gray-500 dark:from-gray-500 dark:to-gray-700";
      default:
        return "from-amber-700 to-amber-900 dark:from-amber-800 dark:to-amber-950";
    }
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  const [filterDeposit, setFilterDeposit] = useState(0);

  const FilterMenu = () => (
    <motion.div
      className="fixed inset-0 z-40 bg-white/5 backdrop-blur-sm bg-opacity-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowFilterMenu(false)}
    >
      <motion.div
        className="w-3/4 max-w-xs bg-white dark:bg-gray-900 h-full p-6 shadow-xl overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={slideInFromRight}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Filter
          </h3>
          <button
            onClick={() => setShowFilterMenu(false)}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <i
              data-feather="x"
              className="h-5 w-5 text-gray-500 dark:text-gray-300"
            ></i>
          </button>
        </div>

        <div className="space-y-5">
          {/* EcoHive Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              EcoHive
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={filterEcohive}
              onChange={(e) => setFilterEcohive(e.target.value)}
            >
              <option value="all">Semua EcoHive</option>
              {ecohives.map((ecohive) => (
                <option key={ecohive.id} value={ecohive.name}>
                  {ecohive.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Level
            </label>
            <div className="space-y-2">
              {["Platinum", "Gold", "Silver", "Bronze"].map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${level}`}
                    className="h-4 w-4 text-lime-500 rounded focus:ring-lime-500"
                  />
                  <label
                    htmlFor={`level-${level}`}
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Aktivitas Terakhir
            </label>
            <div className="space-y-2">
              {["Hari ini", "7 hari terakhir", "30 hari terakhir"].map(
                (period) => (
                  <div key={period} className="flex items-center">
                    <input
                      type="radio"
                      name="activity-period"
                      id={`period-${period}`}
                      className="h-4 w-4 text-lime-500 focus:ring-lime-500"
                    />
                    <label
                      htmlFor={`period-${period}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {period}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Total Setoran Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Total Setoran (Minimal)
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="500"
                value={filterDeposit}
                onChange={(e) => setFilterDeposit(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-lime-200 dark:bg-lime-900 cursor-pointer"
              />
              <div
                className="absolute text-xs mt-1 text-gray-500 dark:text-gray-400"
                style={{
                  left: `${(filterDeposit / 500) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {filterDeposit} kg
              </div>
            </div>
            <div className="flex justify-between text-xs mt-4 text-gray-500 dark:text-gray-400">
              <span>0 kg</span>
              <span>500 kg</span>
            </div>
          </div>

          <div className="pt-6 flex space-x-2">
            <button
              className="flex-1 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center"
              onClick={() => {
                setFilterEcohive("all");
                setFilterStatus("all");
                setSortOption("name");
                setFilterDeposit(0); 
              }}
            >
              Reset
            </button>
            <button
              className="flex-1 py-2 px-4 bg-lime-500 text-white rounded-lg text-center"
              onClick={() => setShowFilterMenu(false)}
            >
              Terapkan
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const MobileSearchBar = () => (
    <motion.div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowMobileSearch(false)}
    >
      <motion.div
        className="w-full bg-white dark:bg-gray-900 shadow-xl p-4"
        initial="hidden"
        animate="visible"
        variants={slideInFromTop}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i data-feather="search" className="h-5 w-5 text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Cari EcoBuddy..."
            autoFocus
            className="pl-10 pr-10 py-3 border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button onClick={() => setShowMobileSearch(false)}>
              <i data-feather="x" className="h-5 w-5 text-gray-400"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const DetailModal = () => {
    if (!selectedEcoBuddy) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowDetailModal(false)}
      >
        <motion.div
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={scaleUp}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="relative h-32 bg-gradient-to-r from-teal-500 to-lime-500">
            <div className="absolute -bottom-12 left-6 h-24 w-24 rounded-xl overflow-hidden border-4 border-white dark:border-gray-900 shadow-md">
              <img
                src={selectedEcoBuddy.imageUrl}
                alt={selectedEcoBuddy.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <span
                className={`text-sm font-bold py-1 px-3 rounded-full bg-gradient-to-r ${getLevelColor(
                  selectedEcoBuddy.level
                )} text-white`}
              >
                {selectedEcoBuddy.level}
              </span>
              <span
                className={`text-sm font-medium py-1 px-3 rounded-full ${getStatusColor(
                  selectedEcoBuddy.status
                )}`}
              >
                {selectedEcoBuddy.status === "active" ? "Aktif" : "Tidak Aktif"}
              </span>
            </div>
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 left-4 rounded-full p-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <i data-feather="x" className="h-5 w-5"></i>
            </button>
          </div>

          {/* Modal Content */}
          <div className="pt-16 pb-6 px-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-teal-900 dark:text-white">
                  {selectedEcoBuddy.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ID: #{selectedEcoBuddy.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lokasi
                </p>
                <p className="text-sm font-medium text-teal-800 dark:text-teal-400">
                  {selectedEcoBuddy.ecohive}
                </p>
              </div>
            </div>

            {/* Stats and Charts */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Statistik Kontribusi
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Setoran
                      </p>
                      <p className="text-xl font-bold text-teal-900 dark:text-white">
                        {selectedEcoBuddy.totalDeposit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Aktivitas Terakhir
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedEcoBuddy.lastActivity}
                      </p>
                    </div>
                  </div>

                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Kontribusi berdasarkan Jenis
                  </h5>

                  {/* Contribution by Type */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Plastik
                        </span>
                        <span className="text-teal-700 dark:text-teal-400">
                          {selectedEcoBuddy.kontribusi.plastik} kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-teal-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (selectedEcoBuddy.kontribusi.plastik /
                                parseInt(selectedEcoBuddy.totalDeposit)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Kertas
                        </span>
                        <span className="text-teal-700 dark:text-teal-400">
                          {selectedEcoBuddy.kontribusi.kertas} kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-lime-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (selectedEcoBuddy.kontribusi.kertas /
                                parseInt(selectedEcoBuddy.totalDeposit)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          Logam
                        </span>
                        <span className="text-teal-700 dark:text-teal-400">
                          {selectedEcoBuddy.kontribusi.logam} kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (selectedEcoBuddy.kontribusi.logam /
                                parseInt(selectedEcoBuddy.totalDeposit)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Perkembangan Setoran
                </h4>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="h-40 flex items-end space-x-2">
                    {selectedEcoBuddy.setoran.map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(value / 30) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-lime-500 dark:bg-lime-600 rounded w-full"
                        ></motion.div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {`M-${6 - index}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                    6 bulan terakhir (dalam kg)
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center py-2 px-4 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <i data-feather="message-circle" className="h-4 w-4 mr-2"></i>
                <span>Hubungi</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center py-2 px-4 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
              >
                <i data-feather="file-text" className="h-4 w-4 mr-2"></i>
                <span>Lihat Histori Lengkap</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`flex items-center py-2 px-4 text-sm text-white ${
                  selectedEcoBuddy.status === "active"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                } rounded-lg`}
                onClick={() => {
                  setShowDetailModal(false);
                  setShowDeactivateModal(true);
                }}
              >
                <i
                  data-feather={
                    selectedEcoBuddy.status === "active"
                      ? "user-x"
                      : "user-check"
                  }
                  className="h-4 w-4 mr-2"
                ></i>
                <span>
                  {selectedEcoBuddy.status === "active"
                    ? "Nonaktifkan"
                    : "Aktifkan"}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const DeactivateModal = () => {
    if (!selectedEcoBuddy) return null;

    const isActivating = selectedEcoBuddy.status === "inactive";

    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowDeactivateModal(false)}
      >
        <motion.div
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={scaleUp}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div
                className={`rounded-full p-3 ${
                  isActivating
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                }`}
              >
                <i
                  data-feather={isActivating ? "user-check" : "user-x"}
                  className={`h-6 w-6 ${
                    isActivating
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                ></i>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              {isActivating ? "Aktifkan Akun" : "Nonaktifkan Akun"}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              {isActivating
                ? `Apakah Anda yakin ingin mengaktifkan kembali akun ${selectedEcoBuddy.name}?`
                : `Apakah Anda yakin ingin menonaktifkan akun ${selectedEcoBuddy.name}?`}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-center font-medium"
              >
                Batal
              </button>
              <button
                className={`flex-1 py-2 px-4 text-white ${
                  isActivating
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } rounded-lg text-center font-medium`}
              >
                {isActivating ? "Aktifkan" : "Nonaktifkan"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 transition-colors duration-200">
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
          Manajemen EcoBuddy
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Kelola dan pantau perkembangan EcoBuddy di seluruh area
        </motion.p>
      </motion.div>

      {/* Summary Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {/* Total EcoBuddy Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border-l-4 border-teal-500"
          variants={fadeIn}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total EcoBuddy Aktif
              </p>
              <p className="text-2xl font-bold text-teal-900 dark:text-white">
                {getTotalActiveEcoBuddies()}
              </p>
            </div>
            <div className="rounded-full p-2 bg-teal-100 dark:bg-teal-900">
              <i
                data-feather="users"
                className="h-5 w-5 text-teal-600 dark:text-teal-400"
              ></i>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-600 dark:text-green-400 font-medium">
              +2
            </span>{" "}
            dari bulan lalu
          </div>
        </motion.div>

        {/* Inactive EcoBuddy Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border-l-4 border-red-500"
          variants={fadeIn}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                EcoBuddy Tidak Aktif
              </p>
              <p className="text-2xl font-bold text-teal-900 dark:text-white">
                {getTotalInactiveEcoBuddies()}
              </p>
            </div>
            <div className="rounded-full p-2 bg-red-100 dark:bg-red-900">
              <i
                data-feather="user-x"
                className="h-5 w-5 text-red-600 dark:text-red-400"
              ></i>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-red-600 dark:text-red-400 font-medium">
              +1
            </span>{" "}
            dari bulan lalu
          </div>
        </motion.div>

        {/* Total Setoran Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border-l-4 border-lime-500"
          variants={fadeIn}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Setoran
              </p>
              <p className="text-2xl font-bold text-teal-900 dark:text-white">
                {getTotalDepositAllEcoBuddies()}
              </p>
            </div>
            <div className="rounded-full p-2 bg-lime-100 dark:bg-lime-900">
              <i
                data-feather="bar-chart-2"
                className="h-5 w-5 text-lime-600 dark:text-lime-400"
              ></i>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-600 dark:text-green-400 font-medium">
              +45 kg
            </span>{" "}
            dari bulan lalu
          </div>
        </motion.div>
      </motion.div>

      {/* Action Bar - Desktop View */}
      <motion.div
        className="hidden sm:flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i data-feather="search" className="h-5 w-5 text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Cari EcoBuddy..."
            className="pl-10 pr-4 py-2 border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-white">
          <span>Urutkan:</span>
          <select
            className="block w-full border border-gray-300 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option className="dark:text-white" value="name">
              Nama (A-Z)
            </option>
            <option className="dark:text-white" value="total-desc">
              Total Setoran (Tinggi-Rendah)
            </option>
            <option className="dark:text-white" value="total-asc">
              Total Setoran (Rendah-Tinggi)
            </option>
            <option className="dark:text-white" value="recent">
              Aktivitas Terbaru
            </option>
          </select>
        </div>

        {/* Filter & Add Button */}
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setShowFilterMenu(true)}
          >
            <i data-feather="filter" className="h-4 w-4 mr-2"></i>
            Filter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-opacity-90"
          >
            <i data-feather="user-plus" className="h-4 w-4 mr-2"></i>
            Tambah EcoBuddy
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Action Bar */}
      <motion.div
        className="flex sm:hidden justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800"
          onClick={() => setShowMobileSearch(true)}
        >
          <i
            data-feather="search"
            className="h-5 w-5 text-gray-600 dark:text-gray-300"
          ></i>
        </motion.button>

        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-800"
            onClick={() => setShowFilterMenu(true)}
          >
            <i
              data-feather="filter"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
            ></i>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-lime-500 text-white"
          >
            <i data-feather="user-plus" className="h-5 w-5"></i>
          </motion.button>
        </div>
      </motion.div>

      {/* EcoBuddy Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {filteredEcoBuddies.map((eb) => (
          <motion.div
            key={eb.id}
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            onClick={() => {
              setSelectedEcoBuddy(eb);
              setShowDetailModal(true);
            }}
            className="rounded-xl shadow-md overflow-hidden bg-white dark:bg-gray-800 touch-manipulation cursor-pointer"
          >
            {/* Card Header with Gradient Badge */}
            <div className="relative h-16 sm:h-20 bg-gradient-to-r from-teal-500 to-lime-500">
              <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6 h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
                <img
                  src={eb.imageUrl}
                  alt={eb.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-3 sm:top-4 right-4 flex space-x-2">
                <span
                  className={`text-xs font-bold py-1 px-2 sm:px-3 rounded-full bg-gradient-to-r ${getLevelColor(
                    eb.level
                  )} text-white`}
                >
                  {eb.level}
                </span>
                <span
                  className={`text-xs font-medium py-1 px-2 sm:px-3 rounded-full ${getStatusColor(
                    eb.status
                  )}`}
                >
                  {eb.status === "active" ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="pt-10 sm:pt-12 pb-5 sm:pb-6 px-4 sm:px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-teal-900 dark:text-white">
                    {eb.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {eb.ecohive}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 -m-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEcoBuddy(eb);
                    setShowDeactivateModal(true);
                  }}
                >
                  {eb.status === "active" ? (
                    <i
                      data-feather="user-x"
                      className="h-5 w-5 text-red-500"
                    ></i>
                  ) : (
                    <i
                      data-feather="user-check"
                      className="h-5 w-5 text-green-500"
                    ></i>
                  )}
                </motion.button>
              </div>

              {/* Mini Chart */}
              <div className="mt-3 sm:mt-4 h-12 sm:h-16 flex items-end space-x-1">
                {eb.setoran.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 30) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-lime-500 dark:bg-lime-600 rounded w-full"
                  ></motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Total Setoran
                  </p>
                  <p className="text-base sm:text-lg font-bold text-teal-900 dark:text-white">
                    {eb.totalDeposit}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Aktifitas Terakhir
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    {eb.lastActivity}
                  </p>
                </div>
              </div>

              {/* Contribution Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Kontribusi per Jenis
                  </span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="bg-teal-500"
                    style={{
                      width: `${
                        (eb.kontribusi.plastik / parseInt(eb.totalDeposit)) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-lime-500"
                    style={{
                      width: `${
                        (eb.kontribusi.kertas / parseInt(eb.totalDeposit)) * 100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="bg-yellow-500"
                    style={{
                      width: `${
                        (eb.kontribusi.logam / parseInt(eb.totalDeposit)) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Plastik
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Kertas
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Logam
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEcoBuddies.length === 0 && (
        <motion.div
          className="flex flex-col items-center justify-center py-12 px-4 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="rounded-full p-4 bg-gray-100 dark:bg-gray-800 mb-4">
            <i data-feather="users" className="h-8 w-8 text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak Ada EcoBuddy
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
            Tidak ada EcoBuddy yang sesuai dengan filter yang dipilih. Coba ubah
            filter atau tambahkan EcoBuddy baru.
          </p>
          <button className="flex items-center px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-opacity-90">
            <i data-feather="user-plus" className="h-4 w-4 mr-2"></i>
            Tambah EcoBuddy
          </button>
        </motion.div>
      )}

      {/* Pagination */}
      {filteredEcoBuddies.length > 0 && (
        <motion.div
          className="flex justify-between items-center mt-6 sm:mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Menampilkan 1-{filteredEcoBuddies.length} dari{" "}
            {filteredEcoBuddies.length} data
          </p>
          <div className="flex space-x-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              disabled
            >
              <i
                data-feather="chevron-left"
                className="h-4 w-4 sm:h-5 sm:w-5"
              ></i>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-md bg-teal-900 text-white"
            >
              1
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-2 sm:px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              disabled
            >
              <i
                data-feather="chevron-right"
                className="h-4 w-4 sm:h-5 sm:w-5"
              ></i>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Fixed Add Button for Mobile */}
      <div className="sm:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-lime-500 text-white shadow-lg flex items-center justify-center z-30"
        >
          <i data-feather="plus" className="h-6 w-6"></i>
        </motion.button>
      </div>

      {/* Mobile Filter Menu */}
      {showFilterMenu && <FilterMenu />}

      {/* Mobile Search Bar Overlay */}
      {showMobileSearch && <MobileSearchBar />}

      {/* Detail Modal */}
      {showDetailModal && <DetailModal />}

      {/* Deactivate Modal */}
      {showDeactivateModal && <DeactivateModal />}
    </div>
  );
};

export default EcoBuddyManagement;
