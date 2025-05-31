"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { MenuIcon } from "lucide-react"

export default function TermsPolicy() {
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
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold font-mono mb-10">
          Terms & Privacy Policy
        </h1>

        <div className="max-w-4xl w-full text-left">
          <div className="mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">Terms of Service</h2>
            <div className="bg-neutral-900 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                By accessing or using ViV AI's services, you agree to be bound by these Terms of Service. If you
                disagree with any part of the terms, you may not access the service.
              </p>
              <h3 className="text-white text-xl font-bold mb-2">Use License</h3>
              <p className="text-gray-300 mb-4">
                Permission is granted to temporarily use ViV AI's services for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <h3 className="text-white text-xl font-bold mb-2">Limitations</h3>
              <p className="text-gray-300">
                You must not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create
                derivative works from, transfer, or sell any information obtained from ViV AI's services.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">Privacy Policy</h2>
            <div className="bg-neutral-900 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                Your privacy is important to us. It is ViV AI's policy to respect your privacy regarding any information
                we may collect from you across our website and other sites we own and operate.
              </p>
              <h3 className="text-white text-xl font-bold mb-2">Information We Collect</h3>
              <p className="text-gray-300 mb-4">
                We only collect information about you if we have a reason to do so—for example, to provide our services,
                to communicate with you, or to make our services better.
              </p>
              <h3 className="text-white text-xl font-bold mb-2">Data Security</h3>
              <p className="text-gray-300">
                We take security measures to protect your information, including using encryption for data transmission
                and secure storage practices. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">Cookie Policy</h2>
            <div className="bg-neutral-900 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                We use cookies to understand and save your preferences for future visits and compile aggregate data
                about site traffic and site interaction.
              </p>
              <h3 className="text-white text-xl font-bold mb-2">Types of Cookies We Use</h3>
              <p className="text-gray-300">
                Essential cookies: Necessary for the website to function properly.
                <br />
                Analytics cookies: Help us understand how visitors interact with our website.
                <br />
                Preference cookies: Enable the website to remember information that changes the way the website behaves
                or looks.
              </p>
            </div>
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