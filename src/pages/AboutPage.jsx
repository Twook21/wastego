import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { Link } from 'react-router-dom'

function AboutPage() {
  const { darkMode } = useContext(ThemeContext)
  
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <section className="bg-teal-700 dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Tentang Waste Go</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Inovasi teknologi dalam pengelolaan sampah untuk Indonesia yang lebih bersih dan berkelanjutan
          </p>
        </div>
      </section>
      
      {/* Visi & Misi */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Visi & Misi Kami</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-white mb-4">Visi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menjadi platform pengelolaan sampah terdepan yang menghubungkan masyarakat, pengumpul sampah, dan industri daur ulang untuk menciptakan ekosistem pengelolaan sampah yang efisien dan berkelanjutan.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-white mb-4">Misi</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-lime-500 dark:text-lime-400">•</span>
                  <span>Mengedukasi masyarakat tentang pentingnya pemilahan dan pengelolaan sampah</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-500 dark:text-lime-400">•</span>
                  <span>Memfasilitasi pengumpulan sampah dengan teknologi yang mudah diakses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-500 dark:text-lime-400">•</span>
                  <span>Meningkatkan kesejahteraan pengumpul sampah melalui sistem yang adil</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lime-500 dark:text-lime-400">•</span>
                  <span>Mendorong ekonomi sirkular melalui daur ulang dan pengolahan sampah</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sejarah */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Cerita Kami</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"></div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>
                Waste Go didirikan pada tahun 2023 oleh sekelompok mahasiswa yang prihatin dengan masalah pengelolaan sampah di Indonesia. Diawali dengan proyek kecil di kampus, kami melihat potensi teknologi untuk mengubah cara masyarakat berinteraksi dengan sampah mereka.
              </p>
              <p className="mt-4">
                Melalui riset mendalam dan kolaborasi dengan berbagai pihak, kami mengembangkan aplikasi yang tidak hanya memudahkan pengumpulan sampah, tetapi juga memberikan edukasi dan insentif bagi pengguna untuk berpartisipasi aktif dalam menjaga kebersihan lingkungan.
              </p>
              <p className="mt-4">
                Saat ini, Waste Go telah berkembang menjadi platform yang menghubungkan ribuan rumah tangga dengan pengumpul sampah terdekat, dan berkolaborasi dengan industri daur ulang untuk memaksimalkan nilai dari sampah yang dikumpulkan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cara Kerja */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Cara Kerja</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Jadwalkan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Jadwalkan pengambilan sampah melalui aplikasi. Pilih waktu yang nyaman dan kategori sampah yang akan diambil.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Serahkan</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pengumpul sampah terdekat akan datang pada waktu yang ditentukan. Anda dapat melacak kedatangan mereka secara real-time.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-lime-400 dark:bg-lime-600 bg-opacity-20 dark:bg-opacity-30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-teal-700 dark:text-lime-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 dark:text-white mb-3">Lihat Dampak</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau kontribusi Anda terhadap lingkungan melalui statistik pengurangan emisi karbon dan sampah yang terdaur ulang.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tim */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-700 dark:text-lime-400 mb-4">Tim Kami</h2>
            <div className="h-1 w-20 bg-lime-400 dark:bg-lime-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Anggota Tim 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="h-55 bg-gray-200 dark:bg-gray-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Theodorus Yosia Raffael Gunawan</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Mobile Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Together Creating Solutions, Turning Waste into Opportunities, for a Cleaner and More Sustainable Earth."
                </p>
              </div>
            </div>
            
            {/* Anggota Tim 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="h-55 bg-gray-200 dark:bg-gray-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Akmal Bintang Budiawan</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">UI/UX Designer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Nature Needs Action, Not Just Words."
                </p>
              </div>
            </div>
            
            {/* Anggota Tim 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="h-55 bg-gray-200 dark:bg-gray-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Alfi Akmal Fariz</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Backend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    “Transformasi Sampah, Ciptakan Masa Depan. Bersama, Kita Bangun Bumi yang Lebih Bersih.”
                </p>
              </div>
            </div>
            
            {/* Anggota Tim 4 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="h-55 bg-gray-200 dark:bg-gray-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">Fahmi Andika Setiono</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Product Owner</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    “One Small Step, Big Impact. Together with WasteGo, Let’s Build a Cleaner Earth.”
                </p>
              </div>
            </div>

            {/* Anggota Tim 5 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="h-55 bg-gray-200 dark:bg-gray-600"></div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-teal-700 dark:text-white">David Ersa Pramudita</h3>
                <p className="text-sm text-lime-600 text-center dark:text-lime-400 mb-2">Frontend Developer</p>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                    "Trash is the trace of civilization. Leave a wise mark, not one that pollutes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-teal-700 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Bergabunglah Dalam Misi Kami</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Bersama-sama, kita dapat menciptakan Indonesia yang lebih bersih dan berkelanjutan untuk generasi mendatang.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/download" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 dark:text-white bg-lime-400 dark:bg-lime-600 hover:bg-opacity-90">
              Download Aplikasi
            </Link>
            <a href="mailto:info@sampahapp.com" className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:bg-opacity-10">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage