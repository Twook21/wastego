import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className="bg-teal-900 dark:bg-gray-800 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bagian Logo & Deskripsi */}
          <div className="text-left">
            <img src={logo} alt="Logo Waste Go" className="w-35 mb-4 ml-0" />
            <p className="text-sm mb-4">
              Aplikasi pengelolaan sampah yang inovatif untuk membantu
              mengurangi limbah dan menjaga lingkungan tetap bersih.
            </p>

            <div className="flex gap-4 mt-4 justify-start">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-600 hover:text-blue-800 text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-500 hover:text-pink-700 text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-400 hover:text-blue-600 text-xl" />
              </a>
            </div>
          </div>

          {/* Bagian Link Cepat */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  onClick={(e) => {
                    if (window.location.pathname === "/") {
                      e.preventDefault(); // Mencegah navigasi default
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas
                    }
                  }}
                  className="hover:text-lime-400 dark:hover:text-lime-300"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={(e) => {
                    if (window.location.pathname === "/about") {
                      e.preventDefault(); // Mencegah navigasi default
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas
                    }
                  }}
                  className="hover:text-lime-400 dark:hover:text-lime-300"
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  to="/download"
                  onClick={(e) => {
                    if (window.location.pathname === "/download") {
                      e.preventDefault(); // Mencegah navigasi default
                      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll ke atas
                    }
                  }}
                  className="hover:text-lime-400 dark:hover:text-lime-300"
                >
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Bagian Kontak */}
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: wastego.idn@gmail.com</li>
              <li>Telepon: +62 123 4567 890</li>
              <li>Alamat: Yogyakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        {/* Copyright tetap center aligned */}
        <div className="mt-8 pt-8 border-t border-lime-500 dark:border-lime-500 text-sm text-center">
          <p>© {new Date().getFullYear()} WasteGo. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
