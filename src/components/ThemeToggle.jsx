import { useContext } from 'react';
import { motion } from 'framer-motion';
import ThemeContext from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="relative w-16 h-9 rounded-full p-1 flex items-center cursor-pointer transition-all duration-500 border outline-none"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a, #1e293b)'
          : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        borderColor: darkMode
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.06)',
      }}
      aria-label="Toggle Theme"
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        <i className={`ri-sun-fill text-[10px] transition-opacity duration-300 ${darkMode ? 'opacity-40 text-yellow-400' : 'opacity-0'}`}></i>
        <i className={`ri-moon-clear-fill text-[10px] transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-40 text-surface-500'}`}></i>
      </span>

      {/* Sliding knob */}
      <motion.div
        layout
        animate={{ x: darkMode ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="relative w-7 h-7 rounded-full flex items-center justify-center z-10"
        style={{
          background: darkMode ? '#b5ff00' : '#022c2e',
          boxShadow: darkMode
            ? '0 2px 12px rgba(181, 255, 0, 0.35)'
            : '0 2px 12px rgba(2, 44, 46, 0.25)',
        }}
      >
        <motion.span
          key={darkMode ? 'dark' : 'light'}
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center justify-center"
        >
          {darkMode ? (
            <i className="ri-moon-clear-fill text-sm text-primary"></i>
          ) : (
            <i className="ri-sun-fill text-sm text-white"></i>
          )}
        </motion.span>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;