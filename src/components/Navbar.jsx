import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Updated icons for mobile menu

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  // Toggle the mobile menu
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-bold">
          <Link to="/">AnimeWorld</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          <li>
            <Link to="/" className="hover:text-gray-200 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleNav}>
            {navOpen ? (
              <XMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-600 transition-all duration-300 ease-in-out ${
          navOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 py-6 text-white font-semibold">
          <li>
            <Link to="/" onClick={toggleNav} className="hover:text-gray-200 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNav} className="hover:text-gray-200 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleNav} className="hover:text-gray-200 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
