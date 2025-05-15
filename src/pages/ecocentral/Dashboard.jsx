import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy data untuk statistik global
const globalStats = [
  {
    title: "Total Sampah Terkumpul",
    value: "125,780 kg",
    change: "+8%",
    icon: "trash",
  },
  { title: "EcoHive Aktif", value: "32", change: "+3", icon: "home" },
  { title: "Total EcoBuddy", value: "1,240", change: "+15%", icon: "users" },
  {
    title: "Pengurangan CO₂",
    value: "24.6 ton",
    change: "+12%",
    icon: "cloud",
  },
];

// Dummy data untuk grafik performa bulanan
const monthlyPerformanceData = [
  { name: "Jan", sampah: 4000, ecoBuddyBaru: 24 },
  { name: "Feb", sampah: 3500, ecoBuddyBaru: 13 },
  { name: "Mar", sampah: 5000, ecoBuddyBaru: 22 },
  { name: "Apr", sampah: 4780, ecoBuddyBaru: 18 },
  { name: "Mei", sampah: 5890, ecoBuddyBaru: 26 },
  { name: "Jun", sampah: 6390, ecoBuddyBaru: 33 },
];

// Dummy data untuk distribusi jenis sampah
const wasteTypeData = [
  { name: "Plastik", value: 35, color: "#10B981" },
  { name: "Kertas", value: 25, color: "#3B82F6" },
  { name: "Logam", value: 15, color: "#6366F1" },
  { name: "Kaca", value: 10, color: "#EC4899" },
  { name: "Organik", value: 15, color: "#8B5CF6" },
];

// Dummy data untuk performa EcoHive
const ecoHivePerformanceData = [
  { name: "EcoHive A", sampah: 2400, ecoBuddy: 98, efisiensi: 85 },
  { name: "EcoHive B", sampah: 1398, ecoBuddy: 72, efisiensi: 78 },
  { name: "EcoHive C", sampah: 3200, ecoBuddy: 120, efisiensi: 92 },
  { name: "EcoHive D", sampah: 2800, ecoBuddy: 89, efisiensi: 81 },
  { name: "EcoHive E", sampah: 1908, ecoBuddy: 65, efisiensi: 76 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bulanan");
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const featherIconsInitialized = useRef(false);

  useEffect(() => {
    // Check if mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Perbaikan: Memastikan feather icons diinisialisasi dan di-reinisialisasi saat komponen dirender
  useEffect(() => {
    // Pastikan feather tersedia di window dan hanya jalankan replace() saat diperlukan
    if (window.feather) {
      window.feather.replace();
      featherIconsInitialized.current = true;
    }
  }, [isMobile]); // Reinisialisasi ketika status mobile berubah

  // Perbaikan: Tambahkan useEffect untuk memastikan ikon dirender saat DOM berubah
  useEffect(() => {
    // Gunakan setTimeout untuk memastikan DOM telah dirender sepenuhnya
    const timer = setTimeout(() => {
      if (window.feather && featherIconsInitialized.current) {
        window.feather.replace();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab]); // Reinisialisasi ketika tab aktif berubah

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
        staggerChildren: 0.2,
      },
    },
  };

  const noOutlineStyle = {
    outline: "none",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  };

  // Remove focus from any element when the chart is touched
  const handleTouchStart = () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-200 dark:bg-gray-900">
      {/* Dashboard Header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.h1
          className="text-3xl font-bold text-teal-900 dark:text-white mb-2"
          variants={fadeIn}
        >
          Dashboard Utama EcoHive
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          variants={fadeIn}
        >
          Pantau kinerja seluruh sistem EcoHive dan dampak lingkungan Anda
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      {isMobile ? (
        <motion.div
          className="mb-8 -mx-4 px-4 overflow-x-auto"
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          <div
            className="inline-flex space-x-4 pb-4"
            style={{ minWidth: "max-content" }}
          >
            {globalStats.map((stat) => (
              <motion.div
                key={stat.title}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 w-64"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </h3>
                    <div className="mt-2 flex items-baseline">
                      <p className="text-2xl font-bold text-teal-900 dark:text-white">
                        {stat.value}
                      </p>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          stat.change.startsWith("+")
                            ? "text-lime-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  {/* Perbaikan: Tambahkan fallback untuk ikon jika feather tidak bekerja */}
                  <motion.div
                    className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center"
                    whileHover={{ rotate: 360, transition: { duration: 1 } }}
                  >
                    <i
                      data-feather={stat.icon}
                      className="text-teal-900 dark:text-teal-900"
                    ></i>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerItems}
        >
          {globalStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-bold text-teal-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        stat.change.startsWith("+")
                          ? "text-lime-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <motion.div
                  className="bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-3 rounded-full w-12 h-12 flex items-center justify-center"
                  whileHover={{ rotate: 360, transition: { duration: 1 } }}
                >
                  <i
                    data-feather={stat.icon}
                    className="text-teal-900 dark:text-teal-900"
                  ></i>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Performa dan Analisis Section */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-3" : "justify-between items-center"
          } mb-6`}
        >
          <h2 className="text-2xl font-bold text-teal-900 dark:text-white">
            Performa dan Analisis
          </h2>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "bulanan"
                  ? "bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("bulanan")}
            >
              Bulanan
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "triwulan"
                  ? "bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("triwulan")}
            >
              Triwulan
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "tahunan"
                  ? "bg-white dark:bg-gray-800 text-teal-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-teal-900 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("tahunan")}
            >
              Tahunan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerItems}
      >
        {/* Performa Bulanan Chart */}
        <motion.div
          className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">
            Perkembangan Bulanan
          </h3>
          <div className={`${isMobile ? "h-60" : "h-80"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyPerformanceData}
                margin={
                  isMobile
                    ? { top: 5, right: 10, left: 0, bottom: 5 }
                    : { top: 5, right: 30, left: 20, bottom: 5 }
                }
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sampah"
                  name="Sampah (kg)"
                  stroke="#10B981"
                  activeDot={{ r: isMobile ? 6 : 8 }}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ecoBuddyBaru"
                  name="EcoBuddy Baru"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribusi Sampah Chart */}
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
          style={noOutlineStyle}
          tabIndex="-1"
          onTouchStart={handleTouchStart}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">
            Distribusi Jenis Sampah
          </h3>
          <div className={`${isMobile ? "h-70" : "h-80"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={!isMobile}
                  outerRadius={isMobile ? 80 : 120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    isMobile
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  activeIndex={activeIndex}
                  activeShape={
                    activeIndex === null ? undefined : { stroke: "none" }
                  }
                  onClick={() => {}} // Empty handler to prevent default behavior
                  isAnimationActive={false} // Disable animation which might cause focus issues
                  style={{ outline: "none", stroke: "none" }}
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ outline: "none", stroke: "none" }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Persentase"]}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                  itemStyle={{
                    color: "#F9FAFB",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                />
                <Legend layout={isMobile ? "horizontal" : undefined} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* EcoHive Performance */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.div
          className="p-4 md:p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4 text-center">
            Analisis Performa EcoHive
          </h3>
          <div className={`w-full ${isMobile ? "overflow-x-auto" : ""}`}>
            <div
              style={{
                height: isMobile ? "280px" : "350px",
                minWidth: isMobile ? "100%" : "auto",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ecoHivePerformanceData}
                  margin={
                    isMobile
                      ? { top: 10, right: 10, left: 0, bottom: 60 }
                      : { top: 20, right: 30, left: 20, bottom: 5 }
                  }
                  barGap={isMobile ? 2 : 4}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 30}
                    tick={{ fill: "#9CA3AF", fontSize: isMobile ? 12 : 14 }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    width={isMobile ? 30 : 40}
                    tick={{ fill: "#9CA3AF", fontSize: isMobile ? 12 : 14 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderColor: "#374151",
                      color: "#F9FAFB",
                      fontSize: isMobile ? "12px" : "14px",
                      padding: isMobile ? "6px" : "10px",
                    }}
                  />
                  <Legend
                    verticalAlign={isMobile ? "bottom" : "top"}
                    height={36}
                    wrapperStyle={{ fontSize: isMobile ? "10px" : "12px" }}
                  />
                  <Bar
                    dataKey="sampah"
                    name="Sampah Terkumpul (kg)"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={isMobile ? 20 : 30}
                  />
                  <Bar
                    dataKey="ecoBuddy"
                    name="EcoBuddy Aktif"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={isMobile ? 20 : 30}
                  />
                  <Bar
                    dataKey="efisiensi"
                    name="Efisiensi (%)"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={isMobile ? 20 : 30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Top Performing EcoHive */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideFromBottom}
      >
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-teal-900 dark:text-white">
              EcoHive dengan Performa Terbaik
            </h3>
            <button className="text-teal-900 dark:text-teal-500 hover:underline text-sm flex items-center">
              Lihat Semua{" "}
              <i data-feather="chevron-right" className="h-4 w-4 ml-1"></i>
            </button>
          </div>

          {isMobile ? (
            <div className="space-y-3">
              {ecoHivePerformanceData
                .sort((a, b) => b.efisiensi - a.efisiensi)
                .slice(0, 3)
                .map((ecoHive) => (
                  <motion.div
                    key={ecoHive.name}
                    className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                    whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-teal-900 dark:text-white">
                        {ecoHive.name}
                      </span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Aktif
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Sampah
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {ecoHive.sampah} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          EcoBuddy
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {ecoHive.ecoBuddy}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Efisiensi
                        </p>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {ecoHive.efisiensi}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nama EcoHive
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Total Sampah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      EcoBuddy Aktif
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Efisiensi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {ecoHivePerformanceData
                    .sort((a, b) => b.efisiensi - a.efisiensi)
                    .slice(0, 3)
                    .map((ecoHive, index) => (
                      <motion.tr
                        key={ecoHive.name}
                        whileHover={{
                          backgroundColor: "rgba(16, 185, 129, 0.05)",
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-900 dark:text-white">
                          {ecoHive.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ecoHive.sampah} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ecoHive.ecoBuddy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ecoHive.efisiensi}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Aktif
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className={`mt-8 bg-gradient-to-r from-teal-700 to-lime-600 rounded-lg ${
          isMobile ? "p-5" : "p-8"
        } text-center`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={slideFromBottom}
      >
        <motion.h2
          className="text-2xl font-bold text-white mb-2"
          variants={fadeIn}
        >
          Tingkatkan Dampak Positif Lingkungan
        </motion.h2>
        <motion.p
          className="text-white mb-6 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Tambahkan lebih banyak EcoHive dan undang EcoBuddy baru untuk
          memperluas jangkauan dan dampak lingkungan
        </motion.p>
        <div
          className={`flex ${
            isMobile ? "flex-col" : "flex-row"
          } gap-4 justify-center`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-teal-900 bg-white hover:bg-gray-50"
          >
            <i data-feather="plus-circle" className="h-5 w-5 mr-2"></i>
            Tambah EcoHive
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-5 py-2 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-teal-900 hover:bg-opacity-10"
          >
            <i data-feather="users" className="h-5 w-5 mr-2"></i>
            Undang EcoBuddy
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
