"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { MenuIcon, Calendar, Tag } from "lucide-react"

export default function ReleaseNotes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const footerSections = [
    {
      title: "TRY VIV ON",
      links: ["Web", "Android", "IOS"],
    },
    {
      title: "PRODUCTS",
      links: ["API", "PlayGround"],
    },
    {
      title: "COMPANY",
      links: ["Career", "News"],
    },
    {
      title: "RESOURCES",
      links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"],
    },
  ]

  const releases = [
    {
      version: "v2.4.0",
      date: "May 25, 2025",
      highlights: [
        "Improved response accuracy by 15%",
        "Added support for 5 new languages",
        "Enhanced context retention in long conversations",
      ],
      details:
        "This major update focuses on improving the core AI capabilities with better language understanding and expanded multilingual support.",
    },
    {
      version: "v2.3.2",
      date: "April 10, 2025",
      highlights: [
        "Fixed critical security vulnerability",
        "Improved API response time by 30%",
        "Added new developer documentation",
      ],
      details:
        "This security and performance update addresses several issues reported by our community and improves overall system stability.",
    },
    {
      version: "v2.3.0",
      date: "March 2, 2025",
      highlights: [
        "Launched new voice recognition feature",
        "Redesigned user interface for better accessibility",
        "Added integration with popular productivity tools",
      ],
      details:
        "This feature update introduces voice capabilities and significant UI improvements based on user feedback.",
    },
    {
      version: "v2.2.1",
      date: "January 15, 2025",
      highlights: ["Bug fixes for mobile experience", "Performance optimizations", "Updated privacy controls"],
      details: "This maintenance release focuses on improving the mobile experience and addressing privacy concerns.",
    },
  ]

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-10 tracking-wide">
            {["VIV", "API", "NEWS", "CAREER"].map((item, i) => (
              <Link key={i} to={`/${item.toLowerCase()}`} className="text-white hover:text-gray-300 text-sm sm:text-xl">
                {item}
              </Link>
            ))}
            <a href="https://viv-test.vercel.app/" className="text-white hover:text-gray-300 text-sm sm:text-xl">
              DOCS
            </a>
          </div>
        </div>

        <Link to="https://chat.cosinv.com/">
          <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
            Try ViV AI
          </button>
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
        className={`fixed right-0 top-0 z-40 bg-[#040403] w-[250px] h-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-4">
          {["VIV", "API", "NEWS", "CAREER"].map((item, i) => (
            <Link key={i} to={`/${item.toLowerCase()}`} className="text-white text-lg hover:text-gray-300">
              {item}
            </Link>
          ))}
          <a href="https://viv-test.vercel.app/" className="text-white text-lg hover:text-gray-300">
            DOCS
          </a>
          <Link to="https://chat.cosinv.com/">
            <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
              Try ViV AI
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-start items-center px-4 py-12">
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold font-mono mb-10">Release Notes</h1>

        <div className="max-w-4xl w-full">
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto text-center mb-12">
            Stay up to date with the latest improvements, features, and fixes to ViV AI's platform and services.
          </p>

          <div className="space-y-8">
            {releases.map((release, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-white text-2xl font-bold">{release.version}</h2>
                  <div className="flex items-center text-gray-400 mt-2 sm:mt-0">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{release.date}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Tag className="w-4 h-4 mr-2 text-amber-400" />
                    <h3 className="text-amber-400 font-semibold">Highlights</h3>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
                    {release.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">Details</h3>
                  <p className="text-gray-300">{release.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/documentation">
              <button className="text-white px-6 py-3 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold text-lg">
                View Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#010101] to-55% flex items-center justify-center pb-24 mt-10">
        <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
            {footerSections.map((section, index) => (
              <div key={`footer-${index}`}>
                <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">{section.title}</h5>
                <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                  {section.links.map((link, linkIndex) => (
                    <li key={`link-${index}-${linkIndex}`}>
                      <Link to={`/${link.toLowerCase()}`} className="hover:text-gray-300">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}