import React, { useState } from "react";

const Navbar = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-700 shadow-md border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img 
          src="imges/Logo1.png" 
          alt="Logo" 
          className="h-16 w-60 transition-transform duration-300 transform hover:scale-110" 
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-teal-500  font-medium relative">
        <div className="relative">
          <button 
            onClick={() => setExploreOpen(!exploreOpen)} 
            className="hover:text-teal-600 transition duration-300"
          >
            Explore ▾ <br />
          </button>
          <div 
            className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md p-3 border border-gray-200 z-10 transition-all duration-300 transform ${exploreOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
          >
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">Popular</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">New and Noteworthy</a>
            <hr className="my-2" />
            {["Product Design", "Web Design", "Animation", "Branding", "Illustration", "Mobile", "Typography", "Print"].map((item) => (
              <a key={item} href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">{item}</a>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setHireOpen(!hireOpen)} 
            className="hover:text-teal-600 transition duration-300"
          >
            Hire a Designer ▾
          </button>
          <div 
            className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md p-3 border border-gray-200 z-10 transition-all duration-300 transform ${hireOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}
          >
            {["Browse Designers", "Submit a Project Brief", "Post a Job", "Hiring on Dribbble"].map((item) => (
              <a key={item} href="#" className="block px-4 py-2 hover:bg-gray-100 rounded-md">{item}</a>
            ))}
          </div>
        </div>
        
        <a href="#" className="hover:text-teal-600 transition duration-300">Find Jobs</a>
        <a href="#" className="hover:text-teal-600 transition duration-300">Blog</a>
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4 " >
        <a href="#" className="text- hover:text-teal-600 ">Sign up</a>
        <a
          href="#"
          className="px-5 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-500 transition duration-300 shadow-md transform hover:scale-105"
        >
          Log in
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
