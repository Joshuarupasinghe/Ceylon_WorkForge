import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle clicks outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown menu
  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-800 shadow-lg py-2' : 'bg-slate-900 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center mr-3 overflow-hidden transition-transform duration-300 hover:scale-110">
              {/* Sri Lanka map SVG */}
              <svg className="h-7 w-7 text-white" viewBox="0 0 100 100">
  
            <circle cx="50" cy="50" r="50" fill="currentColor" />
            
              <image href="/imges/iconelogo.png" x="10" y="10" width="80" height="80" clipPath="circle(50%)" />
              </svg>


            </div>
            <div className="flex flex-col">
              <span className="text-teal-400 font-bold text-xl tracking-wide transition-colors duration-300 hover:text-teal-300">CEYLON</span>
              <span className="text-gray-300 text-sm tracking-widest">WORKFORCE</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Explore Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="group text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200"
                onClick={() => toggleDropdown('explore')}
              >
                Explore
                <svg className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === 'explore' ? 'transform rotate-180' : ''
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Content */}
              {activeDropdown === 'explore' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 animate-fadeIn">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Freelancers</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Projects</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Categories</a>
                </div>
              )}
            </div>
            
            <a href="#" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Hire a Designer
            </a>
            
            <a href="#" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Find Jobs
            </a>
            
            <a href="#" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Blog
            </a>
          </div>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Sign up
            </a>
            <a 
              href="#" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Log in
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
            >
              <svg 
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          <a href="#" className="text-teal-400 block px-3 py-2 rounded-md text-base font-medium">
            Explore
          </a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Hire a Designer
          </a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Find Jobs
          </a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Blog
          </a>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-between px-3">
              <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center mb-2 transition-colors duration-200 hover:bg-gray-800">
                Sign up
              </a>
            </div>
            <div className="px-3">
              <a href="#" className="bg-teal-500 hover:bg-teal-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-center transition-all duration-200 hover:shadow-md">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// Add this CSS to your global styles or a Tailwind CSS plugin
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.2s ease-out forwards;
// }