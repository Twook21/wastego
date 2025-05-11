import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeContext from "../../../context/ThemeContext";
import { useContext } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const EcoHiveLayout = () => {
  const { darkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on desktop
  const [minimized, setMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const location = useLocation();

  // Handle current section based on location
  useEffect(() => {
    const path = location.pathname;
    const section = path.split("/").pop() || "dashboard";
    setCurrentSection(section);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This function is passed to Sidebar to handle minimize toggle
  const handleMinimizeToggle = (isMinimized) => {
    setMinimized(isMinimized);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} min-h-screen flex flex-col`}>
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          currentSection={currentSection}
          minimized={minimized}
          setMinimized={handleMinimizeToggle}
        />

        {/* Main Content Area - Adjusts width based on sidebar state */}
        <div 
          className={`
            flex-1 flex flex-col transition-all duration-300
            ${sidebarOpen 
              ? minimized 
                ? "md:ml-20" // When sidebar is minimized
                : "md:ml-64" // When sidebar is fully open
              : "" // When sidebar is closed
            }
          `}
        >
          {/* TopBar */}
          <TopBar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            currentSection={currentSection} 
          />

          {/* Main Content */}
          <main
            className={`
              flex-1 overflow-y-auto overscroll-contain p-4 md:p-6
              ${darkMode ? "bg-gray-900" : "bg-gray-50"}
              transition-colors duration-200
            `}
          >
            <div className="mx-auto max-w-7xl h-full">
              <motion.div
                key={location.pathname} // Animate on route change
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EcoHiveLayout;