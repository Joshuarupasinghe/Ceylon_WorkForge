import React, { useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      {/* Particle Effect */}
      <Particles
        init={loadFull}
        options={{
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { speed: 1 },
            line_linked: { enable: false },
            opacity: { value: 0.5 }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } }
          }
        }}
        className="absolute inset-0 z-0"
      />
      
      <div className="flex flex-col items-center relative z-10">
        {/* Circular Progress */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg
            className="w-64 h-64 drop-shadow-lg"
            viewBox="0 0 250 250"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Circle */}
            <circle
              cx="125"
              cy="125"
              r={radius}
              fill="none"
              stroke="#1f2937"
              strokeWidth="12"
              opacity="0.3"
            />

            {/* Progress Circle */}
            <circle
              cx="125"
              cy="125"
              r={radius}
              fill="none"
              stroke="#5DDFD6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 125 125)"
              className="transition-all duration-300 ease-out"
            />
            
            {/* Logo or Image */}
            <image
              href="/public/vite.svg"
              x="50"
              y="50"
              height="150"
              width="150"
              className="animate-pulse"
            />
          </svg>
          
          {/* Progress Text */}
          <div className="absolute text-lg font-bold text-white drop-shadow-md">
            {progress}%
          </div>
        </div>

        {/* Loading Text */}
        <div className="relative mt-6 text-xl font-semibold text-teal-300 flex items-center">
          {/* <p className="animate-pulse">Loading</p> */}
          {/* Animated Dots */}
          <div className="relative mt-6 text-xl font-semibold text-teal-300 flex items-center">
          <p className="animate-pulse">Ceylon Work Forge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
