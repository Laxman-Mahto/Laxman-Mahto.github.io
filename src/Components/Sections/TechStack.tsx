import React from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { firstRowTechnologies, secondRowTechnologies } from "../../data/techStackData";

const TechStack: React.FC = () => {
  return (
    <motion.section
      className="w-full max-w-4xl mx-auto pt-8 sm:pt-12"
      aria-labelledby="tech-stack-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h2
          id="tech-stack-heading"
          className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 font-inter pt-2"
        >
          Tools that I have used
        </h2>

        <div className="">
          <Marquee
            speed={20}
            gradient={false}
            pauseOnHover
            className="pt-3 sm:pt-4 pb-2"
          >
            <ul className="flex items-center" role="list">
              {firstRowTechnologies.map((tech, index) => (
                <li
                  key={`row1-${index}`}
                  role="listitem"
                  className="mr-1.5 sm:mr-2 flex w-max items-center gap-1.5 sm:gap-2 rounded-full 
                           border border-gray-200 dark:border-neutral-800 
                           bg-gray-50 dark:bg-neutral-900 
                           px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-[15px] 
                           text-gray-800 dark:text-neutral-50 shadow-sm"
                >
                  <span className="text-base sm:text-lg">{tech.icon}</span>
                  <span className="whitespace-nowrap">{tech.name}</span>
                </li>
              ))}
            </ul>
          </Marquee>

          <Marquee
            speed={20}
            gradient={false}
            direction="right"
            pauseOnHover
            className="py-4"
          >
            <ul className="flex items-center" role="list">
              {secondRowTechnologies.map((tech, index) => (
                <li
                  key={`row2-${index}`}
                  role="listitem"
                  className="mr-1.5 sm:mr-2 flex w-max items-center gap-1.5 sm:gap-2 rounded-full 
                           border border-gray-200 dark:border-neutral-800 
                           bg-gray-50 dark:bg-neutral-900 
                           px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-[15px] 
                           text-gray-800 dark:text-neutral-50 shadow-sm"
                >
                  <span className="text-base sm:text-lg">{tech.icon}</span>
                  <span className="whitespace-nowrap">{tech.name}</span>
                </li>
              ))}
            </ul>
          </Marquee>
        </div>
      </div>
    </motion.section>
  );
};

export default TechStack;
