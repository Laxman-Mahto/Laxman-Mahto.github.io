import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

import ParticlesBg from "../Ui/ParticlesBg";
import { CLOCK_UPDATE_INTERVAL } from "../../utils/constants";

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full flex items-end font-['Convergence'] min-h-[25vh] md:min-h-[30vh] pb-2"
      aria-label="Introduction section"
    >
      <ParticlesBg />
      {/* Top-left fixed badge: IN time (live) */}
      <TopLeftIST />

      {/* Top-right badge: Location - absolute on mobile, fixed on desktop */}
      <div
        className="absolute md:fixed top-2 -right-2 md:right-2 z-40 flex items-center gap-2 px-3 py-1.5 
                text-xs sm:text-sm font-figtree text-gray-700 dark:text-gray-200 
                backdrop-blur-sm rounded-md shadow-sm bg-white/80 dark:bg-transparent"
        aria-label="Location: New Delhi, India"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <line x1="2" x2="5" y1="12" y2="12" />
          <line x1="19" x2="22" y1="12" y2="12" />
          <line x1="12" x2="12" y1="2" y2="5" />
          <line x1="12" x2="12" y1="19" y2="22" />
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>Jaipur, India</span>
      </div>

      {/* Mobile Layout */}
      <motion.div
        className="md:hidden w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Heading + Typewriter on left, Logo on right (centered between texts) */}
        <div className="flex flex-row items-center justify-between gap-5">
          <div className="flex-1 space-y-2">
            <div className="text-[26px] sm:text-3xl font-bold leading-none font-inter text-gray-900 dark:text-white">
              Hi, I'm Laxman👋
            </div>
            <div className="font-[Poppins]">
              <h1 className="text-base sm:text-lg text-gray-700 dark:text-[#DBE6F0]">
                <div className="flex flex-row items-center justify-start gap-1 sm:gap-2">
                  <span className="text-gray-500 dark:text-[#8A8A8A]">
                    I am a
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    <Typewriter
                      words={[
                        "Coder.",
                        "Developer.",
                        "Full Stack Developer.",
                        "Front End Developer.",
                      ]}
                      loop={0}
                      cursor
                      cursorStyle="|"
                      typeSpeed={80}
                      deleteSpeed={50}
                      delaySpeed={1500}
                    />
                  </span>
                </div>
              </h1>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden">
              <img
                src="/laxman-photo.jpg"
                alt="Laxman Pfp"
                className="w-full h-full object-cover rounded-full"
                width="136"
                height="136"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Layout - Original */}
      <div className="hidden md:flex flex-row items-start justify-between w-full gap-4">
        {/* Left side - Text content */}
        <div className="w-1/2 space-y-4 lg:space-y-6">
          <div className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-inter whitespace-nowrap text-gray-900 dark:text-white">
            Hi, I'm Laxman👋
          </div>

          <div className="font-[Poppins]">
            <h1 className="text-xl lg:text-2xl xl:text-3xl text-gray-700 dark:text-[#DBE6F0] -translate-y-2">
              <div className="flex flex-row items-center justify-start gap-2 whitespace-nowrap">
                <span className="text-gray-500 dark:text-[#A3A3A3]">
                  I am a
                </span>
                <span className="text-gray-900 dark:text-white whitespace-nowrap">
                  <Typewriter
                    words={[
                      "Coder.",
                      "Developer.",
                      "Full Stack Developer.",
                      "Front End Developer.",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </div>
            </h1>
          </div>
        </div>

        {/* Right side - Logo */}
        <div className="w-1/2 flex justify-end">
          <div className="w-32 h-32 lg:w-34 lg:h-34 rounded-full overflow-hidden">
            <img
              src="/laxman-photo.jpg"
              alt="Laxman pfp"
              className="w-full h-full object-cover rounded-full"
              width="136"
              height="136"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Fixed top-left IST badge (outside content width)
const TopLeftIST: React.FC = () => {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });

    const update = () => {
      try {
        const parts = formatter.formatToParts(new Date());
        const h = parts.find((p) => p.type === "hour")?.value ?? "";
        const m = parts.find((p) => p.type === "minute")?.value ?? "";
        const s = parts.find((p) => p.type === "second")?.value ?? "";
        setTime(`${h}:${m}:${s}`);
      } catch {
        setTime("");
      }
    };
    update();
    const id = setInterval(update, CLOCK_UPDATE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute md:fixed top-2 -left-2 md:left-2 z-40 flex items-center gap-2 
                text-green-600 dark:text-green-500 font-mono text-sm sm:text-base 
                px-4 py-2"
    >
      <span className="text-gray-700 dark:text-gray-300 font-figtree font-medium tracking-normal">
        IN
      </span>
      <span>{time}</span>
    </div>
  );
};

export default Hero;
