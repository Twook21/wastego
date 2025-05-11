import { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ThemeContext from '../context/ThemeContext'

function ContactPage() {
  const { darkMode } = useContext(ThemeContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  })

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi submit form - in real app would connect to backend
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.'
      })
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1000)
  }

  // Animation variants - simplified for minimalist design
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="transition-colors duration-200">
      {/* Header Section - Simplified */}
      <section className="bg-white dark:bg-gray-900 text-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-4"
          >
            <h1 className="text-3xl font-bold text-teal-900 dark:text-white">
              Hubungi Kami
            </h1>
            <div className="w-16 h-1 bg-lime-500 mx-auto my-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Punya pertanyaan atau masukan? Kami siap membantu Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info - Simplified Layout */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form - Cleaner design */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideUp}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"
            >
              {formStatus.submitted && formStatus.success ? (
                <motion.div 
                  className="p-4 rounded-lg border-l-4 border-lime-500 bg-lime-50 dark:bg-lime-900 dark:bg-opacity-20 text-gray-800 dark:text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="font-medium mb-1">Terima Kasih!</h3>
                  <p>{formStatus.message}</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-medium text-teal-900 dark:text-white mb-6">Kirim Pesan</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nama
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subjek
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-lime-500 focus:border-lime-500"
                      ></textarea>
                    </div>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-lime-500 dark:bg-lime-500 text-teal-900 font-medium rounded-md hover:bg-lime-300 dark:hover:bg-lime-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                      >
                        Kirim Pesan
                      </button>
                    </motion.div>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Information - More minimal */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideUp}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-medium text-teal-900 dark:text-white mb-6">Informasi Kontak</h2>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="text-lime-500 dark:text-lime-500">
                    <i data-feather="map-pin" className="h-5 w-5"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Alamat</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yogyakarta, Indonesia<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-lime-500 dark:text-lime-500">
                    <i data-feather="phone" className="h-5 w-5"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Telepon</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      +62 21 1234 5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-lime-500 dark:text-lime-500">
                    <i data-feather="mail" className="h-5 w-5"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      wastego.idn@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-lime-500 dark:text-lime-500">
                    <i data-feather="clock" className="h-5 w-5"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Jam Operasional</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Senin - Jumat: 08:00 - 17:00<br />
                      Sabtu: 09:00 - 15:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media - Simplified */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Ikuti Kami</h3>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
                  >
                    <i data-feather="instagram" className="h-5 w-5"></i>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
                  >
                    <i data-feather="facebook" className="h-5 w-5"></i>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
                  >
                    <i data-feather="twitter" className="h-5 w-5"></i>
                  </a>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-lime-500 dark:text-gray-400 dark:hover:text-lime-500 transition-colors"
                  >
                    <i data-feather="linkedin" className="h-5 w-5"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Simplified */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-xl font-medium text-teal-900 dark:text-white mb-6 text-center">Temukan Kami</h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {/* Map Placeholder */}
              <div className="h-72 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <i data-feather="map" className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2"></i>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Peta Lokasi WasteGo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Minimalist approach */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-medium text-teal-900 dark:text-white">
              Pertanyaan Umum
            </h2>
            <div className="w-16 h-1 bg-lime-500 mx-auto my-4"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideUp}
            className="space-y-4"
          >
            {[
              {
                question: "Bagaimana cara kerja WasteGo?",
                answer: "WasteGo menghubungkan Anda dengan pengumpul sampah terdekat. Anda dapat menjadwalkan pengambilan sampah melalui aplikasi dan melacak progres pengambilan."
              },
              {
                question: "Wilayah mana saja yang sudah dilayani oleh WasteGo?",
                answer: "Saat ini, WasteGo melayani area Jabodetabek, Bandung, Surabaya, dan Denpasar. Kami terus memperluas jangkauan layanan kami."
              },
              {
                question: "Berapa biaya untuk menggunakan aplikasi WasteGo?",
                answer: "Aplikasi WasteGo dapat diunduh dan digunakan secara gratis. Untuk layanan pengambilan sampah tertentu, mungkin ada biaya yang diterapkan."
              },
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4"
              >
                <h3 className="text-base font-medium text-teal-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - More minimal */}
      <section className="py-10 bg-lime-500 dark:bg-lime-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="text-white"
          >
            <h2 className="text-xl font-medium mb-3">
              Bergabunglah dengan Komunitas WasteGo
            </h2>
            <p className="text-sm text-teal-900 dark:text-teal-900 mb-5">
              Jadilah bagian dari perubahan positif untuk lingkungan.
            </p>
            <a 
              href="#" 
              className="inline-block px-5 py-2 bg-teal-900 text-lime-500 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Download Aplikasi
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage