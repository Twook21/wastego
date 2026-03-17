import { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import 'remixicon/fonts/remixicon.css';
import ThemeContext from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.download"), path: "/download" },
  ];

  return (
    <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}>
      <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? "bg-white/90 dark:bg-[#010909]/90 backdrop-blur-xl" : "bg-transparent"}`}></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-16">
            <Link to="/" className="group">
              <img className="h-10 w-auto transition-all duration-500 group-hover:scale-105" src={Logo} alt="WasteGo" />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent ${location.pathname === link.path
                    ? "text-accent"
                    : "text-primary/50 dark:text-white/50"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
              <Link
                to="/login"
                className="text-xs font-black uppercase tracking-widest text-primary/50 dark:text-white/50 hover:text-accent transition-colors"
              >
                {t("nav.signIn")}
              </Link>
              <Link
                to="/contact"
                className="btn-glow py-3 px-8 text-xs uppercase tracking-widest"
              >
                {t("nav.joinUs")}
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <ThemeToggle />
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/5 dark:bg-white/5 text-primary dark:text-white focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                <i className={isMenuOpen ? "ri-close-line text-2xl" : "ri-menu-5-line text-2xl"}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full p-4 z-40"
          >
            <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-2xl font-black uppercase italic tracking-tighter p-4 rounded-2xl transition-all ${location.pathname === link.path
                      ? "text-accent translate-x-4"
                      : "text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-primary/5 dark:bg-white/5 my-2"></div>
                <Link
                  to="/login"
                  className="text-xl font-black uppercase tracking-widest p-4 text-primary/40 dark:text-white/40"
                >
                  Sign In
                </Link>
                <Link
                  to="/contact"
                  className="btn-glow w-full py-5 text-lg uppercase tracking-widest justify-center mt-4 shadow-2xl"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

