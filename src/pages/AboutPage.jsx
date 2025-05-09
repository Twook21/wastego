import { useContext, useEffect, useState, useRef } from 'react'
import ThemeContext from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Theo from '/images/team/Theo.webp'
import Akmal from '/images/team/Akmal.webp'
import Alfi from '/images/team/Alfi.webp'
import Fahmi from '/images/team/Fahmi.webp'
import David from '/images/team/David.webp'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function AboutPage() {
  const { darkMode } = useContext(ThemeContext)
  
  // Animation variants - moved outside of TeamCarousel to make them available to the entire component
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

  const TeamCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(0);
    const carousel = useRef();
    
    const teamMembers = [
      {
        image: Theo,
        name: "Theodorus Yosia Raffael Gunawan",
        shortName: "Theodorus Yosia",
        role: "Mobile Developer",
        quote: "Together Creating Solutions, Turning Waste into Opportunities."
      },
      {
        image: Akmal,
        name: "Akmal Bintang Budiawan",
        shortName: "Akmal Bintang",
        role: "UI/UX Designer",
        quote: "Nature Needs Action, Not Just Words."
      },
      {
        image: Alfi,
        name: "Alfi Akmal Fariz",
        shortName: "Alfi Akmal",
        role: "Backend Developer",
        quote: "Transformasi Sampah, Ciptakan Masa Depan."
      },
      {
        image: Fahmi,
        name: "Fahmi Andika Setiono",
        shortName: "Fahmi Andika",
        role: "Product Owner",
        quote: "One Small Step, Big Impact."
      },
      {
        image: David,
        name: "David Ersa Pramudita",
        shortName: "David Ersa",
        role: "Frontend Developer",
        quote: "Trash is the trace of civilization."
      }
    ];
  
    // Number of cards to show based on screen size - Modified for 5 on desktop and 2 on mobile
    const getVisibleItems = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) return 2; // Show 2 on mobile
        if (window.innerWidth < 1024) return 3;
        return 5; // Show all 5 on desktop
      }
      return 2; // Default for SSR
    };
  
    const [visibleItems, setVisibleItems] = useState(2);
  
    useEffect(() => {
      const handleResize = () => {
        setVisibleItems(getVisibleItems());
      };
  
      handleResize(); // Initial call
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const nextSlide = () => {
      setCurrentIndex(prevIndex => 
        prevIndex + 1 >= teamMembers.length ? 0 : prevIndex + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentIndex(prevIndex => 
        prevIndex - 1 < 0 ? teamMembers.length - 1 : prevIndex - 1
      );
    };
  
    // Auto-advance carousel
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    // Get the team members to show based on current index with wrapping
    const getVisibleMembers = () => {
      const result = [];
      for (let i = 0; i < visibleItems; i++) {
        const index = (currentIndex + i) % teamMembers.length;
        result.push(teamMembers[index]);
      }
      return result;
    };

    return (
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden relative" ref={carousel}>
          <motion.div 
            className="flex w-full"
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div 
                key={currentIndex}
                className="flex gap-2 xs:gap-3 sm:gap-4 md:gap-6 w-full"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {getVisibleMembers().map((member, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    className={`bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden flex-1`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <img
                      src={member.image}
                      className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                       style={{ objectPosition: '50% 20%' }}
                      alt={member.name}
                    />
                    <div className="p-2 xs:p-3 sm:p-4">
                      <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-center text-teal-900 dark:text-white">
                        {visibleItems <= 2 ? member.shortName : member.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-lime-500 text-center dark:text-lime-500 mb-1 sm:mb-2">
                        {member.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm">
                        "{member.quote}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:translate-x-0 bg-white/70 dark:bg-gray-800/70 rounded-full p-1 sm:p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-teal-900 dark:text-lime-500" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-0 bg-white/70 dark:bg-gray-800/70 rounded-full p-1 sm:p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-teal-900 dark:text-lime-500" />
        </button>
        
        {/* Pagination Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-teal-900 dark:bg-lime-500 w-4' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <motion.section 
        className="bg-teal-900 dark:bg-gray-800 text-white py-16"
        initial="hidden"
        animate="visible"
        variants={headerAnimation}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <motion.h1 
            className="text-4xl font-bold mb-6"
            variants={fadeIn}
          >
            Tentang WasteGo
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
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">Visi & Misi Kami</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500 mx-auto"
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
              <h3 className="text-2xl font-semibold text-teal-900 dark:text-white mb-4">Visi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menjadi platform pengelolaan sampah terdepan yang menghubungkan masyarakat, pengumpul sampah, dan industri daur ulang untuk menciptakan ekosistem pengelolaan sampah yang efisien dan berkelanjutan.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md"
              variants={cardAnimation}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <h3 className="text-2xl font-semibold text-teal-900 dark:text-white mb-4">Misi</h3>
              <motion.ul 
                className="text-gray-600 dark:text-gray-300 space-y-2"
                variants={staggerItems}
              >
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-500"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Mengedukasi masyarakat tentang pentingnya pemilahan dan pengelolaan sampah</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-500"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Memfasilitasi pengumpulan sampah dengan teknologi yang mudah diakses</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-500"
                    whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                  >•</motion.span>
                  <span>Meningkatkan kesejahteraan pengumpul sampah melalui sistem yang adil</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={listItemAnimation}
                >
                  <motion.span 
                    className="mr-2 text-lime-500 dark:text-lime-500"
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
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">Cerita Kami</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500 mx-auto"
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
                WasteGo didirikan pada tahun 2025 oleh 5 orang mahasiswa <strong>Politeknik Elektronika Negri Surabaya (PENS)</strong> yang peduli dengan masalah pengelolaan sampah di Indonesia. Diawali dengan proyek kecil di kampus, kami melihat potensi teknologi untuk mengubah cara masyarakat berinteraksi dengan sampah mereka.
              </p>
              <p className="mt-4">
                Melalui riset mendalam dan kolaborasi dengan berbagai pihak, kami mengembangkan aplikasi yang tidak hanya memudahkan pengumpulan sampah, tetapi juga memberikan edukasi dan insentif bagi pengguna untuk berpartisipasi aktif dalam menjaga kebersihan lingkungan.
              </p>
              <p className="mt-4">
                Saat ini, WasteGo telah berkembang menjadi platform yang menghubungkan ribuan rumah tangga dengan pengumpul sampah terdekat, dan berkolaborasi dengan industri daur ulang untuk memaksimalkan nilai dari sampah yang dikumpulkan.
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
            <h2 className="text-3xl font-bold text-teal-900 dark:text-lime-500 mb-4">Cara Kerja</h2>
            <motion.div 
              className="h-1 w-20 bg-lime-500 dark:bg-lime-500 mx-auto"
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
                className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-900 dark:text-teal-900">1</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-3">Jadwalkan</h3>
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
                className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-900 dark:text-teal-900">2</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-3">Serahkan</h3>
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
                className="bg-lime-500 dark:bg-lime-500 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
              >
                <span className="text-2xl font-bold text-teal-900 dark:text-teal-900">3</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-teal-900 dark:text-white mb-3">Lihat Dampak</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau kontribusi Anda terhadap lingkungan melalui statistik pengurangan emisi karbon dan sampah yang terdaur ulang.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Tim - Mobile Responsive Version */}
      <motion.section 
        className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: 0.6, staggerChildren: 0.2 }
          }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 dark:text-lime-500 mb-3">Tim Kami</h2>
            <motion.div 
              className="h-1 w-16 sm:w-20 bg-lime-500 dark:bg-lime-500 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <TeamCarousel />
        </div>
      </motion.section>
      
      {/* CTA */}
      <motion.section 
        className="py-16 bg-teal-900 dark:bg-gray-900"
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
              <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-900 bg-lime-500 dark:bg-lime-500 dark:text-teal-900 hover:bg-opacity-90">
                Download Aplikasi
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeIn}
            >
              <a href="mailto:info@sampahapp.com" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 hover:bg-opacity-10">
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