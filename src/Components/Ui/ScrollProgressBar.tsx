import React, { useEffect, useState, useCallback, useRef } from "react";

const ScrollProgressBar: React.FC = () => {
  const [scrollScale, setScrollScale] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Only update if change is significant (optimization)
    if (Math.abs(progress - lastScrollRef.current) > 0.001) {
      setScrollScale(progress);
      lastScrollRef.current = progress;
    }

    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth 60fps updates
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollProgress]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div
        className="h-1 bg-teal-400 transition-transform duration-100 ease-linear origin-center"
        style={{ transform: `scaleX(${scrollScale})` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
