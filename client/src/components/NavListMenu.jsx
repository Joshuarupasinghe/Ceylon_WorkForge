import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api'; // Adjust path as needed

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      authService.getCurrentUser()
        .then(res => {
          const user = res.data.user;
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(err => {
          console.error('Error fetching user:', err);
        });
    }
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const profilePath = user?.role === 'freelancer' ? '/freelancer/profile' : '/client/profile';
  const dashboardPath = user?.role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard';
  const isClient = user?.role === 'client';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-800 shadow-lg py-2' : 'bg-slate-900 py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex-shrink-0 flex items-center">
            <div className="h-12 w-12 bg-teal-500 rounded-full flex items-center justify-center mr-3 overflow-hidden transition-transform duration-300 hover:scale-110">
              <svg className="h-7 w-7 text-white" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill="currentColor" />
                <image href="/imges/iconelogo.png" x="10" y="10" width="80" height="80" clipPath="circle(50%)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-teal-400 font-bold text-xl tracking-wide transition-colors duration-300 hover:text-teal-300">CEYLON</span>
              <span className="text-gray-300 text-sm tracking-widest">WORKFORCE</span>
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button className="group text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200" onClick={() => toggleDropdown('explore')}>
                Explore
                <svg className={`ml-2 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'explore' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'explore' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 animate-fadeIn">
                  <Link to="/freelancer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Freelancers</Link>
                  <Link to="/categories/projects" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Projects</Link>
                  <Link to="/Category" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Categories</Link>
                </div>
              )}
            </div>
            <Link to="/category" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Hire a Freelacer</Link>
            <Link to="/find-jobs" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Find Jobs</Link>
            <Link to="/blog" className="text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('user')}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={user.profilePicture}
                    alt="User Profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-avatar.png"; // or any public image path
                    }}
                    className="w-9 h-9 rounded-full border-2 border-teal-500 shadow-sm cursor-pointer"
                  />
                </button>
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fadeIn">
                    <Link
                      to={profilePath}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>

                    <Link
                      to={dashboardPath}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {isClient && (
                      <Link
                      to='/profile'
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                      Become a freelancer
                    </Link>)}

                    <button
                      onClick={() => {
                        authService.logout();
                        setUser(null);
                        localStorage.removeItem('user');
                        window.location.href = '/'; // Redirect after logout
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/oauth2-callback"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign up
                </Link>
                <Link
                  to="/oauth2-callback"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  Log in
                </Link>
              </>
            )}

          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200">
              <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/freelancer" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Freelancers</Link>
          <Link to="/categories/projects" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Projects</Link>
          <Link to="/Category" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Categories</Link>
          <Link to="/category" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Hire a Freelancer</Link>
          <Link to="/find-jobs" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Find Jobs</Link>
          <Link to="/blog" className="block text-teal-400 hover:text-teal-300 px-3 py-2 rounded-md text-base font-medium">Blog</Link>

          {user ? (
            <>
              <Link to={profilePath}className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">My Profile</Link>
              <Link  to={dashboardPath} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Dashboard</Link>
              <button
                onClick={() => {
                  authService.logout();
                  setUser(null);
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/oauth2-callback" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Sign up</Link>
              <Link to="/oauth2-callback" className="block bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-base font-medium">Log in</Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
