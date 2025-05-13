import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const EcoCentralLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed on mobile
  const [minimized, setMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle current section based on location
  useEffect(() => {
    const path = location.pathname;
    const section = path.split("/").pop() || "dashboard";
    setCurrentSection(section);
  }, [location]);

  // Handle window resize with better mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Only auto-close sidebar on mobile
      if (mobile) {
        setSidebarOpen(false);
      } else if (!minimized) {
        // On desktop, respect minimized state
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minimized]);

  // This function is passed to Sidebar to handle minimize toggle
  const handleMinimizeToggle = (isMinimized) => {
    setMinimized(isMinimized);
  };

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <div className="flex flex-1 h-full overflow-hidden relative">
        {/* Mobile Overlay - moved inside component render */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar with improved transitions */}
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          currentSection={currentSection}
          minimized={minimized}
          setMinimized={handleMinimizeToggle}
          isMobile={isMobile}
        />

        {/* Main Content Area - Adjusts width based on sidebar state */}
        <div 
          className={`
            flex-1 flex flex-col transition-all duration-300 w-full
            ${!isMobile && sidebarOpen 
              ? minimized 
                ? "md:ml-20" // When sidebar is minimized on desktop
                : "md:ml-64" // When sidebar is fully open on desktop
              : "" // When sidebar is closed or on mobile
            }
          `}
        >
          {/* TopBar */}
          <TopBar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            currentSection={currentSection}
            isMobile={isMobile}
          />

          {/* Main Content with better padding for mobile */}
          <main
            className="
              flex-1 overflow-y-auto overscroll-contain p-3 md:p-6
              bg-gray-50 dark:bg-gray-900
              transition-colors duration-200
            "
          >
            <div className="mx-auto max-w-7xl w-full h-full">
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
      </div>
    </div>
  );
};

export default EcoCentralLayout;