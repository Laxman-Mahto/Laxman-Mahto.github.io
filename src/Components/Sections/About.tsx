//
import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <motion.section
      className="relative w-full max-w-5xl font-inter"
      aria-labelledby="about-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mt-4 sm:mt-6">
        <h2
          id="about-heading"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          About
        </h2>

        <div className="mt-2 space-y-3 text-xs text-gray-600 dark:text-[#A3A3A3] md:text-sm leading-relaxed">
          <p>
            Hello! I'm Laxman, a Second   Year Computer Science student from{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              UEM Jaipur
            </span>
            . I build full-stack applications using{" "}
            <span className="font-bold text-teal-600 dark:text-teal-300">
              Java
            </span>
            ,{" "}
            <span className="font-bold text-teal-600 dark:text-teal-300">
              React
            </span>
            , and{" "}
            <span className="font-bold text-teal-600 dark:text-teal-300">
              Node.js
            </span>
            , taking ideas from concept to finished product.
          </p>

          <div className="pt-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Beyond Code: Entrepreneurial Experience
            </h3>
            <p>
              While maintaining a{" "}
              <span className="font-bold text-teal-600 dark:text-teal-300">
                8.0+ CGPA
              </span>
              , I manage a night canteen operation serving{" "}
              <span className="font-bold text-teal-600 dark:text-teal-300">
                800+ students
              </span>{" "}
              and faculty with approx{" "}
              <span className="font-bold text-teal-600 dark:text-teal-300">
                ₹10L+ annual revenue
              </span>
              . This experience developed my skills in operations management, 
              vendor relationships, supply chain coordination, and customer service at scale.
            </p>
          </div>

          <p>
            I've built a strong network of{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              alumni and industry professionals
            </span>{" "}
            for continuous learning and mentorship. Balancing business operations 
            with academic excellence taught me{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              time management, quick decision-making, and working under pressure
            </span>
            —skills that translate directly to building scalable tech products.
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 tracking-wide">
        {/* Availability pill */}
        <button
          type="button"
          aria-label="Currently available for new opportunities"
          className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl 
                     border border-gray-200 dark:border-white/10 
                     bg-gray-50 dark:bg-white/5 
                     px-3 sm:px-4 py-2 text-xs sm:text-sm 
                     text-gray-700 dark:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-white/10 
                     transition-colors"
        >
          <span
            className="relative grid place-items-center h-4 w-4 flex-shrink-0"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-500/40 animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="whitespace-nowrap">
            Open to new opportunities and collaborations
          </span>
        </button>

        {/* Resume Download Button */}
        <a
          href="/Laxman(Resume)3.pdf"
          download="Laxman_Mahto_Resume.pdf"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl 
                     border border-gray-200 dark:border-white/10 
                     bg-gray-50 dark:bg-white/5 
                     px-3 sm:px-4 py-2 text-xs sm:text-sm 
                     text-gray-700 dark:text-gray-200 
                     hover:bg-gray-100 dark:hover:bg-white/10 
                     transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="whitespace-nowrap">Download Resume</span>
        </a>
      </div>
    </motion.section>
  );
};

export default About;
