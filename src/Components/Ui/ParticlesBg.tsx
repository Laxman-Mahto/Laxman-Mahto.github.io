import React from "react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { useThemeStore } from "../../Store/useThemeStore";

const ParticlesBg: React.FC = () => {
  const { theme } = useThemeStore();
  const [particleColor, setParticleColor] = useState("#ffffff");

  useEffect(() => {
    loadSlim(tsParticles);
  }, []);

  useEffect(() => {
    // Update particle color based on theme
    setParticleColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "repulse" },
            resize: { enable: true },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: { enable: true },
            value: window.innerWidth < 768 ? 40 : 100,
          },
          opacity: {
            value: 0.2,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticlesBg;
