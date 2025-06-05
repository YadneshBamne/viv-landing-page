import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';

const Navbar = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div>
            <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img className="mr-6 mt-2" src="./v3.png" width={75} alt="Logo" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-8 tracking-wide items-center text-sm font-medium">
          <a
            href="/"
            className="text-white transition duration-200 hover:text-amber-100"
          >
            VIV
          </a>
          {["NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white transition duration-200 hover:text-amber-100"
            >
              {item}
            </Link>
          ))}

          <a
            href="https://docs.cosinv.com/"
            className="text-white transition duration-200 hover:text-amber-100"
          >
            DOCS
          </a>
          <a
            href="/api"
            className="text-white transition duration-200 hover:text-amber-100"
          >
            API
          </a>
        </div>
        <div className="hidden md:flex">
          <Link to="https://chat.cosinv.com/">
            <button className="text-white cursor-pointer px-4 py-2 rounded-full border border-white transition hover:bg-white hover:text-black font-semibold">
              Try VIV AI
            </button>
          </Link>
        </div>
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <MenuIcon size={29} className="text-white" />
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden transition-all ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed right-0 top-0 z-40 bg-[#07080A] w-[250px] h-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-4">
          <a href="/" className="text-white text-lg hover:text-gray-300">
            VIV
          </a>
          {["NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white text-lg hover:text-gray-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://docs.cosinv.com/"
            className="text-white text-lg hover:text-gray-300"
          >
            DOCS
          </a>
          <a
            href="/api"
            className="text-white text-lg hover:text-gray-300"
          >
            API
          </a>
          <Link to="https://chat.cosinv.com/">
            <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
              Try ViV AI
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
