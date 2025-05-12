import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Reports() {
  const [activeTab, setActiveTab] = useState("charts");

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [activeTab]);

  // Animation variants with reduced durations for mobile
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
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
        staggerChildren: 0.15,
      },
    },
  };

  // Sample data for reports
  const reportsData = [
    {
      date: "10 Mei 2025",
      type: "Plastik",
      weight: "2.5",
      collector: "Eco Recycle",
      status: "Selesai",
      statusColor: "green",
    },
    {
      date: "8 Mei 2025",
      type: "Kertas",
      weight: "1.8",
      collector: "Green Partners",
      status: "Selesai",
      statusColor: "green",
    },
    {
      date: "5 Mei 2025",
      type: "Elektronik",
      weight: "3.2",
      collector: "E-Waste Solutions",
      status: "Diproses",
      statusColor: "yellow",
    },
  ];

  // Mobile tab switcher component
  const TabSwitcher = () => (
    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6 shadow-inner">
      <button
        onClick={() => setActiveTab("charts")}
        className={`flex-1 py-2 px-3 text-sm rounded-md flex items-center justify-center ${
          activeTab === "charts"
            ? "bg-white dark:bg-gray-800 text-teal-900 dark:text-lime-500 shadow-sm"
            : "text-gray-700 dark:text-gray-300"
        } transition-all duration-200`}
      >
        <i data-feather="pie-chart" className="h-4 w-4 mr-1 sm:mr-2"></i>
        <span>Grafik</span>
      </button>
      <button
        onClick={() => setActiveTab("data")}
        className={`flex-1 py-2 px-3 text-sm rounded-md flex items-center justify-center ${
          activeTab === "data"
            ? "bg-white dark:bg-gray-800 text-teal-900 dark:text-lime-500 shadow-sm"
            : "text-gray-700 dark:text-gray-300"
        } transition-all duration-200`}
      >
        <i data-feather="clipboard" className="h-4 w-4 mr-1 sm:mr-2"></i>
        <span>Data</span>
      </button>
    </div>
  );

  // Mobile optimized chart card
  const ChartCard = ({ icon, title, children }) => (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md mb-6"
      variants={slideFromBottom}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center mb-3 sm:mb-4">
        <motion.div
          className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4"
          whileHover={{ rotate: 360, transition: { duration: 1 } }}
        >
          <i data-feather={icon} className="text-black h-5 w-5"></i>
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-teal-900 dark:text-white">
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );

  // Mobile optimized card for table row
  const DataRow = ({ data, isLast }) => (
    <div
      className={`p-4 ${
        !isLast && "border-b dark:border-gray-700"
      } hover:bg-gray-50 dark:hover:bg-gray-750`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm text-teal-900 dark:text-white">
          {data.type}
        </span>
        <span
          className={`px-2 py-1 bg-${data.statusColor}-100 text-${data.statusColor}-800 dark:bg-${data.statusColor}-800 dark:text-${data.statusColor}-100 text-xs rounded-full`}
        >
          {data.status}
        </span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>Berat:</span>
        <span className="font-medium">{data.weight} kg</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
        <span>Pengumpul:</span>
        <span>{data.collector}</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Tanggal:</span>
        <span>{data.date}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 transition-colors duration-200">
      {/* Header Section */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-lime-500 mb-3 sm:mb-4"
          variants={fadeIn}
        >
          Laporan Pengelolaan Sampah
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          variants={fadeIn}
        >
          Pantau dan analisis pengelolaan sampah untuk dampak positif
          lingkungan.
        </motion.p>
      </motion.div>

      {/* Mobile Tab Switcher - Only visible on mobile */}
      <div className="block md:hidden">
        <TabSwitcher />
      </div>

      {/* Charts Section - Hidden on mobile when data tab is active */}
      <motion.div
        className={`${
          activeTab === "data" ? "hidden md:grid" : "grid"
        } grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerItems}
      >
        <ChartCard icon="pie-chart" title="Distribusi Jenis Sampah">
          <div className="h-48 sm:h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Placeholder for chart */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Grafik Distribusi Sampah
            </p>
          </div>
        </ChartCard>

        <ChartCard icon="trending-up" title="Trend Bulanan">
          <div className="h-48 sm:h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            {/* Placeholder for chart */}
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Grafik Trend Bulanan
            </p>
          </div>
        </ChartCard>
      </motion.div>

      {/* Data Table Section - Hidden on mobile when charts tab is active */}
      <motion.div
        className={`${
          activeTab === "charts" ? "hidden md:block" : "block"
        } bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideFromBottom}
      >
        <div className="flex items-center p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700">
          <motion.div
            className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-20 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mr-3 sm:mr-4"
            whileHover={{ rotate: 360, transition: { duration: 1 } }}
          >
            <i data-feather="clipboard" className="text-black h-5 w-5"></i>
          </motion.div>
          <h3 className="text-lg sm:text-xl font-semibold text-teal-900 dark:text-white">
            Rekapitulasi Data
          </h3>
        </div>

        {/* Mobile Card View for Data */}
        <div className="block md:hidden">
          {reportsData.map((item, index) => (
            <DataRow
              key={index}
              data={item}
              isLast={index === reportsData.length - 1}
            />
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-gray-900 dark:text-gray-300 rounded-l-lg">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-gray-900 dark:text-gray-300">
                  Jenis Sampah
                </th>
                <th className="px-4 py-3 text-gray-900 dark:text-gray-300">
                  Berat (kg)
                </th>
                <th className="px-4 py-3 text-gray-900 dark:text-gray-300">
                  Pengumpul
                </th>
                <th className="px-4 py-3 text-gray-900 dark:text-gray-300 rounded-r-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reportsData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300"
                >
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.weight}</td>
                  <td className="px-4 py-3">{item.collector}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 bg-${item.statusColor}-100 text-${item.statusColor}-800 dark:bg-${item.statusColor}-700 dark:text-${item.statusColor}-200 text-xs rounded-full`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-8 sm:mt-12 p-6 sm:p-8 bg-teal-900 dark:bg-gray-800 rounded-xl text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <motion.h3
          className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white"
          variants={fadeIn}
        >
          Tingkatkan Dampak Positif
        </motion.h3>
        <motion.p
          className="text-base sm:text-lg mb-5 sm:mb-6 text-gray-100 dark:text-gray-300 max-w-2xl mx-auto"
          variants={fadeIn}
        >
          Jadwalkan pengambilan sampah secara rutin untuk lingkungan yang lebih
          bersih.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-900 dark:text-lime-500 bg-lime-500 dark:bg-teal-900 hover:bg-opacity-90"
        >
          Jadwalkan Pengambilan
        </motion.button>
      </motion.div>

      {/* Mobile Fixed Action Button */}
      <div className="block md:hidden">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-lime-500 text-teal-900 shadow-lg flex items-center justify-center z-30"
        >
          <i data-feather="calendar" className="h-6 w-6"></i>
        </motion.button>
      </div>
    </div>
  );
}

export default Reports;
