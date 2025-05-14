import { useContext, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import { Link } from "react-router-dom";
import QRCode from "../assets/qr-placeholder.png"; // Placeholder, ganti dengan QR code asli
import { motion } from "framer-motion";

function DownloadPage() {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Menggulir ke atas saat komponen dirender
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <motion.section
        className="bg-teal-900 dark:bg-gray-800 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Download WasteGo
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Mulai perjalanan Anda menuju gaya hidup ramah lingkungan dengan
            mengunduh aplikasi kami
          </motion.p>
        </div>
      </motion.section>

      {/* Download Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-teal-900 dark:text-white mb-6">
                Unduh Sekarang
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                WasteGo tersedia di App Store dan Google Play. Unduh sekarang
                dan mulai berkontribusi untuk lingkungan yang lebih bersih.
              </p>

              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* App Store Button */}
                <motion.a
                  href="#"
                  className="flex items-center justify-center md:justify-start bg-black text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-gray-800 transition-colors"
                  variants={fadeInUp}
                  whileHover={buttonHover}
                >
                  <svg
                    className="w-8 h-8 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold font-sans -mt-1">
                      App Store
                    </div>
                  </div>
                </motion.a>

                {/* Google Play Button */}
                <motion.a
                  href="#"
                  className="flex items-center justify-center md:justify-start bg-black text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-gray-800 transition-colors"
                  variants={fadeInUp}
                  whileHover={buttonHover}
                >
                  <svg
                    className="w-8 h-8 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold font-sans -mt-1">
                      Google Play
                    </div>
                  </div>
                </motion.a>

                {/* Direct APK Download */}
                <motion.a
                  href="#"
                  className="flex items-center  justify-center md:justify-start bg-teal-900 dark:bg-lime-500 dark:text-teal-900 text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-teal-900-light dark:hover:opacity-90 transition-colors"
                  variants={fadeInUp}
                  whileHover={buttonHover}
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <div>
                    <div className="text-lg font-semibold">
                      Unduh APK Langsung
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300 text-center"
                whileHover={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4">
                  Scan untuk Download
                </h3>
                <motion.div
                  className="bg-white p-2 rounded-lg inline-block"
                  animate={pulseAnimation}
                >
                  <img
                    src={QRCode}
                    alt="QR Code untuk download WasteGo"
                    className="w-48 h-48 mx-auto"
                  />
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                  Scan QR code ini dengan kamera ponsel Anda untuk mengunduh
                  aplikasi
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">
              Kebutuhan Sistem
            </h2>
            <motion.div
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500-light mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white dark:bg-gray-700 p-6 rounded-lg border shadow-lg border-gray-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-lime-500 dark:text-lime-500-light"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z" />
                </svg>
                Android
              </h3>
              <motion.ul
                className="space-y-2 text-gray-600 dark:text-gray-300"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Android 6.0 (Marshmallow) atau lebih tinggi</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>RAM minimal 2GB</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Penyimpanan minimal 50MB</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Koneksi internet</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Akses lokasi GPS</span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-700 p-6 rounded-lg border shadow-lg border-gray-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-lime-500 dark:text-lime-500-light"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS
              </h3>
              <motion.ul
                className="space-y-2 text-gray-600 dark:text-gray-300"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>iOS 12.0 atau lebih tinggi</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Compatible dengan iPhone, iPad, dan iPod touch</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Penyimpanan minimal 100MB</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Koneksi internet</span>
                </motion.li>
                <motion.li className="flex items-start" variants={fadeInUp}>
                  <span className="mr-2 text-lime-500 dark:text-lime-500-light">
                    •
                  </span>
                  <span>Akses lokasi GPS</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">
              Fitur Aplikasi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              WasteGo menawarkan berbagai fitur untuk memudahkan Anda dalam
              pengelolaan sampah sehari-hari
            </p>
            <motion.div
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500-light mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="calendar" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Penjadwalan Mudah
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jadwalkan pengambilan sampah dengan beberapa klik. Pilih waktu
                yang nyaman dan pantau status pengambilan.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="compass" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Pelacakan Real-time
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lacak pengumpul sampah secara real-time dan dapatkan notifikasi
                saat mereka tiba di lokasi Anda.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="trash-2" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Klasifikasi Sampah
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pelajari cara memilah sampah dengan panduan visual dan informasi
                tentang jenis-jenis sampah.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="repeat" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Statistik Lingkungan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lihat dampak positif Anda terhadap lingkungan melalui statistik
                pengurangan emisi karbon dan sampah terdaur ulang.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="book-open" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Edukasi
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Akses artikel, tips, dan video tentang cara mengurangi sampah
                dan hidup lebih ramah lingkungan.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-lg border-gray-300"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-lime-500 dark:bg-lime-500-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <i data-feather="award" className="text-teal-900"></i>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-2">
                Sistem Reward
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dapatkan poin dan penghargaan untuk setiap sampah yang Anda daur
                ulang, tukarkan dengan hadiah menarik.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">
              Pertanyaan Umum
            </h2>
            <motion.div
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500-light mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white dark:bg-gray-700 rounded-lg border shadow-lg border-gray-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-900 dark:text-white">
                  Apakah aplikasi ini gratis?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ya, WasteGo dapat diunduh dan digunakan secara gratis. Kami
                  menyediakan layanan dasar pengumpulan sampah tanpa biaya,
                  namun beberapa layanan premium mungkin dikenakan biaya
                  tambahan.
                </p>
              </button>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-700 rounded-lg border shadow-lg border-gray-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-900 dark:text-white">
                  Di kota mana saja aplikasi ini tersedia?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Saat ini, WasteGo tersedia di Jakarta, Bandung, Surabaya,
                  Yogyakarta, dan beberapa kota besar lainnya di Indonesia. Kami
                  terus memperluas jangkauan kami ke lebih banyak daerah.
                </p>
              </button>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-700 rounded-lg border shadow-lg border-gray-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-900 dark:text-white">
                  Bagaimana cara kerja sistem poin?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Untuk setiap kg sampah yang Anda kumpulkan, Anda akan
                  mendapatkan poin sesuai dengan jenisnya. Sampah plastik,
                  logam, dan elektronik biasanya memberikan poin lebih banyak.
                  Poin dapat ditukarkan dengan voucher atau disumbangkan untuk
                  program penghijauan.
                </p>
              </button>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-700 rounded-lg border shadow-lg border-gray-300 overflow-hidden"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-900 dark:text-white">
                  Apakah saya bisa menjadi pengumpul sampah?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ya, kami selalu mencari mitra pengumpul sampah. Anda dapat
                  mendaftar sebagai mitra melalui aplikasi atau menghubungi tim
                  kami untuk informasi lebih lanjut tentang persyaratan dan
                  prosedur.
                </p>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:support@sampahapp.com"
              className="text-teal-900 dark:text-lime-500 hover:underline"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Masih punya pertanyaan? Hubungi kami
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-lime-500 dark:bg-lime-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-teal-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Siap Memulai?
          </motion.h2>
          <motion.p
            className="text-xl text-teal-900-dark dark:text-gray-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Download WasteGo sekarang dan jadilah bagian dari solusi pengelolaan
            sampah yang lebih baik untuk Indonesia.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-900 dark:bg-teal-900 dark:text-lime-500 hover:bg-opacity-90"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Download Sekarang
            </motion.a>
            <motion.div
              className="w-full sm:w-auto"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-teal-900 dark:border-white text-base font-medium rounded-md text-teal-900 dark:text-white hover:bg-white hover:text-teal-900"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DownloadPage;
