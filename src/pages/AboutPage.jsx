import { useContext, useEffect } from 'react'
import ThemeContext from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function AboutPage() {
  const { darkMode } = useContext(ThemeContext)
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  }
  
  const headerAnimation = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  }
  
  const sectionAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      } 
    }
  }
  
  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }
  
  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const listItemAnimation = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  }
  
  const timelineAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7 }
    }
  }
  
  const teamAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  
  const teamMemberAnimation = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <motion.section 
        className="bg-teal-700 dark:bg-gray-800 text-white py-16"
        initial="hidden"
        animate="visible"
        variants={headerAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            variants={fadeIn}
          >
            Tentang Waste Go
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Inovasi teknologi dalam pengelolaan sampah untuk Indonesia yang lebih bersih dan berkelanjutan
          </motion.p>
        </div>
      </motion.section>
      
      {/* Visi & Misi */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Visi & Misi Kami</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-white mb-4">Visi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menjadi platform pengelolaan sampah terdepan yang menghubungkan masyarakat, pengumpul sampah, dan industri daur ulang untuk menciptakan ekosistem pengelolaan sampah yang efisien dan berkelanjutan.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-white mb-4">Misi</h3>
              <motion.ul 
                className="text-gray-600 dark:text-gray-300 space-y-2"
                variants={staggerItems}
              >
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-400"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Mengedukasi masyarakat tentang pentingnya pemilahan dan pengelolaan sampah</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-400"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Memfasilitasi pengumpulan sampah dengan teknologi yang mudah diakses</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-400"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Meningkatkan kesejahteraan pengumpul sampah melalui sistem yang adil</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-400"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Mendorong ekonomi sirkular melalui daur ulang dan pengolahan sampah</span>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Sejarah */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Cerita Kami</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
            variants={timelineAnimation}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <motion.div 
              className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p>
                Waste Go didirikan pada tahun 2023 oleh sekelompok mahasiswa yang prihatin dengan masalah pengelolaan sampah di Indonesia. Diawali dengan proyek kecil di kampus, kami melihat potensi teknologi untuk mengubah cara masyarakat berinteraksi dengan sampah mereka.
              </p>
              <p className="mt-4">
                Melalui riset mendalam dan kolaborasi dengan berbagai pihak, kami mengembangkan aplikasi yang tidak hanya memudahkan pengumpulan sampah, tetapi juga memberikan edukasi dan insentif bagi pengguna untuk berpartisipasi aktif dalam menjaga kebersihan lingkungan.
              </p>
              <p className="mt-4">
                Saat ini, Waste Go telah berkembang menjadi platform yang menghubungkan ribuan rumah tangga dengan pengumpul sampah terdekat, dan berkolaborasi dengan industri daur ulang untuk memaksimalkan nilai dari sampah yang dikumpulkan.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Cara Kerja */}
      <motion.section 
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Cara Kerja</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerItems}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">1</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Jadwalkan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jadwalkan pengambilan sampah melalui aplikasi. Pilih waktu yang nyaman dan kategori sampah yang akan diambil.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">2</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Serahkan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pengumpul sampah terdekat akan datang pada waktu yang ditentukan. Anda dapat melacak kedatangan mereka secara real-time.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">3</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Lihat Dampak</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau kontribusi Anda terhadap lingkungan melalui statistik pengurangan emisi karbon dan sampah yang terdaur ulang.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Tim */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Tim Kami</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
            variants={teamAnimation}
          >
            {/* Anggota Tim 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              variants={teamMemberAnimation}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="h-55 bg-gray-200 dark:bg-gray-600"
                whileHover={{ 
                  backgroundColor: ["#f3f4f6", "#dcfce7", "#f3f4f6"],
                  transition: { duration: 2, repeat: Infinity }
                }}
              ></motion.div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Theodorus Yosia Raffael Gunawan</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Mobile Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Together Creating Solutions, Turning Waste into Opportunities, for a Cleaner and More Sustainable Earth."
                </p>
              </div>
            </motion.div>
            
            {/* Anggota Tim 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              variants={teamMemberAnimation}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="h-55 bg-gray-200 dark:bg-gray-600"
                whileHover={{ 
                  backgroundColor: ["#f3f4f6", "#dcfce7", "#f3f4f6"],
                  transition: { duration: 2, repeat: Infinity }
                }}
              ></motion.div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Akmal Bintang Budiawan</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">UI/UX Designer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Nature Needs Action, Not Just Words."
                </p>
              </div>
            </motion.div>
            
            {/* Anggota Tim 3 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              variants={teamMemberAnimation}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="h-55 bg-gray-200 dark:bg-gray-600"
                whileHover={{ 
                  backgroundColor: ["#f3f4f6", "#dcfce7", "#f3f4f6"],
                  transition: { duration: 2, repeat: Infinity }
                }}
              ></motion.div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Alfi Akmal Fariz</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Backend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Transformasi Sampah, Ciptakan Masa Depan. Bersama, Kita Bangun Bumi yang Lebih Bersih."
                </p>
              </div>
            </motion.div>
            
            {/* Anggota Tim 4 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              variants={teamMemberAnimation}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="h-55 bg-gray-200 dark:bg-gray-600"
                whileHover={{ 
                  backgroundColor: ["#f3f4f6", "#dcfce7", "#f3f4f6"],
                  transition: { duration: 2, repeat: Infinity }
                }}
              ></motion.div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Fahmi Andika Setiono</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Product Owner</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "One Small Step, Big Impact. Together with WasteGo, Let's Build a Cleaner Earth."
                </p>
              </div>
            </motion.div>

            {/* Anggota Tim 5 */}
            <motion.div 
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              variants={teamMemberAnimation}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="h-55 bg-gray-200 dark:bg-gray-600"
                whileHover={{ 
                  backgroundColor: ["#f3f4f6", "#dcfce7", "#f3f4f6"],
                  transition: { duration: 2, repeat: Infinity }
                }}
              ></motion.div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">David Ersa Pramudita</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Frontend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Trash is the trace of civilization. Leave a wise mark, not one that pollutes."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* CTA */}
      <motion.section 
        className="py-16 bg-teal-700 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-6"
            variants={fadeIn}
          >
            Bergabunglah Dalam Misi Kami
          </motion.h2>
          <motion.p 
            className="text-xl text-white mb-8 max-w-3xl mx-auto"
            variants={fadeIn}
          >
            Bersama-sama, kita dapat menciptakan Indonesia yang lebih bersih dan berkelanjutan untuk generasi mendatang.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            variants={staggerItems}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeIn}
            >
              <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 dark:text-white bg-lime-400 dark:bg-lime-600 hover:bg-opacity-90">
                Download Aplikasi
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeIn}
            >
              <a href="mailto:info@sampahapp.com" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10">
                Hubungi Kami
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default AboutPage