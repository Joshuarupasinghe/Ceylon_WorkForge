import React, { useState, useEffect } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import CircularProgress from "../components/ CircularProgress";
import ProgressPercentage from "../components/ProgressPercentage";

/**
 * Main loading screen that orchestrates the background particles,
 * circular progress, and loading text.
 */
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  // Increment the progress every 30ms, reset to 0 after 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      {/* Particle Effect */}
      <ParticlesBackground />

      <div className="flex flex-col items-center relative z-10">
        {/* Circular Progress with numeric percentage on top */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <CircularProgress progress={progress} />
          <ProgressPercentage progress={progress} />
        </div>

        {/* Loading Text */}
        <div className="relative mt-6 text-xl font-semibold text-teal-300">
          <p className="animate-pulse">Ceylon Work Forge</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
