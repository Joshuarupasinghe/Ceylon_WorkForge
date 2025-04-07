import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    // Initialize tsparticles instance
    await loadFull(main);
  };

  return (
    <Particles
      init={particlesInit}
      options={{
        particles: {
          number: { value: 80 },
          size: { value: 3 },
          move: { speed: 1 },
          line_linked: { enable: false },
          opacity: { value: 0.5 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;
