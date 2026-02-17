import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#08090A] dark:text-white transition-colors duration-300">
      {/* Skip to content link for accessibility */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-white 
                 focus:rounded-lg"
      >
        Skip to projects
      </a>

      <Navbar />
      <main
        id="main-content"
        className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 pb-24 sm:pb-28"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
