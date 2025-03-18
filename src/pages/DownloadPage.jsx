import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import QRCode from '../assets/qr-placeholder.png' // Placeholder, ganti dengan QR code asli

function DownloadPage() {
  const { darkMode } = useContext(ThemeContext)
  
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <section className="bg-teal-700 dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Download Waste Go</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Mulai perjalanan Anda menuju gaya hidup ramah lingkungan dengan mengunduh aplikasi kami
          </p>
        </div>
      </section>
      
      {/* Download Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-teal-700 dark:text-white mb-6">Unduh Sekarang</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Waste Go tersedia di App Store dan Google Play. Unduh sekarang dan mulai berkontribusi untuk lingkungan yang lebih bersih.
              </p>
              
              <div className="space-y-4">
                {/* App Store Button */}
                <a href="#" className="flex items-center justify-center md:justify-start bg-black text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-gray-800 transition-colors">
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold font-sans -mt-1">App Store</div>
                  </div>
                </a>
                
                {/* Google Play Button */}
                <a href="#" className="flex items-center justify-center md:justify-start bg-black text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-gray-800 transition-colors">
                  <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold font-sans -mt-1">Google Play</div>
                  </div>
                </a>
                
                {/* Direct APK Download */}
                <a href="#" className="flex items-center justify-center md:justify-start bg-teal-700 text-white rounded-lg px-4 py-2 w-full md:w-64 hover:bg-teal-700-light dark:hover:opacity-90 transition-colors">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div>
                    <div className="text-lg font-semibold">Unduh APK Langsung</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-4">Scan untuk Download</h3>
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img 
                    src={QRCode} 
                    alt="QR Code untuk download Waste Go" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
                  Scan QR code ini dengan kamera ponsel Anda untuk mengunduh aplikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* System Requirements */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Kebutuhan Sistem</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-400-light mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lime-400 dark:text-lime-400-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z" />
                </svg>
                Android
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Android 6.0 (Marshmallow) atau lebih tinggi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>RAM minimal 2GB</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Penyimpanan minimal 50MB</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Koneksi internet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Akses lokasi GPS</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-lime-400 dark:text-lime-400-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>iOS 12.0 atau lebih tinggi</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Compatible dengan iPhone, iPad, dan iPod touch</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Penyimpanan minimal 100MB</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Koneksi internet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-400 dark:text-lime-400-light">•</span>
                  <span>Akses lokasi GPS</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Fitur Aplikasi</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Waste Go menawarkan berbagai fitur untuk memudahkan Anda dalam pengelolaan sampah sehari-hari
            </p>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-400-light mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Penjadwalan Mudah</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jadwalkan pengambilan sampah dengan beberapa klik. Pilih waktu yang nyaman dan pantau status pengambilan.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a6.5 6.5 0 00-5.056 10.613L10 20l5.056-5.887A6.5 6.5 0 0010 3.5zm0 9.5a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Pelacakan Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lacak pengumpul sampah secara real-time dan dapatkan notifikasi saat mereka tiba di lokasi Anda.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Klasifikasi Sampah</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pelajari cara memilah sampah dengan panduan visual dan informasi tentang jenis-jenis sampah.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Statistik Lingkungan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Lihat dampak positif Anda terhadap lingkungan melalui statistik pengurangan emisi karbon dan sampah terdaur ulang.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Edukasi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Akses artikel, tips, dan video tentang cara mengurangi sampah dan hidup lebih ramah lingkungan.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="bg-lime-400 dark:bg-lime-400-dark bg-opacity-20 dark:bg-opacity-30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-700 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-2">Sistem Reward</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dapatkan poin dan penghargaan untuk setiap sampah yang Anda daur ulang, tukarkan dengan hadiah menarik.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Pertanyaan Umum</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-400-light mx-auto"></div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-white">Apakah aplikasi ini gratis?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ya, Waste Go dapat diunduh dan digunakan secara gratis. Kami menyediakan layanan dasar pengumpulan sampah tanpa biaya, namun beberapa layanan premium mungkin dikenakan biaya tambahan.
                </p>
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-white">Di kota mana saja aplikasi ini tersedia?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Saat ini, Waste Go tersedia di Jakarta, Bandung, Surabaya, Yogyakarta, dan beberapa kota besar lainnya di Indonesia. Kami terus memperluas jangkauan kami ke lebih banyak daerah.
                </p>
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-white">Bagaimana cara kerja sistem poin?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Untuk setiap kg sampah yang Anda kumpulkan, Anda akan mendapatkan poin sesuai dengan jenisnya. Sampah plastik, logam, dan elektronik biasanya memberikan poin lebih banyak. Poin dapat ditukarkan dengan voucher atau disumbangkan untuk program penghijauan.
                </p>
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <button className="w-full text-left p-6">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-white">Apakah saya bisa menjadi pengumpul sampah?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ya, kami selalu mencari mitra pengumpul sampah. Anda dapat mendaftar sebagai mitra melalui aplikasi atau menghubungi tim kami untuk informasi lebih lanjut tentang persyaratan dan prosedur.
                </p>
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="mailto:support@sampahapp.com" className="text-teal-700 dark:text-lime-400 hover:underline">
              Masih punya pertanyaan? Hubungi kami
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-lime-400 dark:bg-lime-400-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-teal-700 dark:text-white mb-6">Siap Memulai?</h2>
          <p className="text-xl text-teal-700-dark dark:text-gray-200 mb-8 max-w-3xl mx-auto">
            Download Waste Go sekarang dan jadilah bagian dari solusi pengelolaan sampah yang lebih baik untuk Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-700 dark:bg-teal-700-light hover:bg-opacity-90">
              Download Sekarang
            </a>
            <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-teal-700 dark:border-white text-base font-medium rounded-md text-teal-700 dark:text-white hover:bg-white hover:bg-opacity-10">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DownloadPage