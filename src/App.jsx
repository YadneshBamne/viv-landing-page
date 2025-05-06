import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ArrowRight, MenuIcon, MoveRight, Play } from "lucide-react";
import Lottie from "lottie-react";
import Spline from "@splinetool/react-spline";
import Particles from "./bits/Particles";
import PixelCard from "./bits/PixelCard";
import { ShineBorder } from "./components/magicui/shine-border";
import { motion } from "framer-motion";
import notFoundAnimation from "./assets/notfound.json"; // Replace with your actual Lottie file path

// Placeholder Button Component (Replace with actual implementation, e.g., from shadcn/ui)
const Button = ({ size, className, children, ...props }) => {
  const sizeClasses = size === "lg" ? "text-lg" : "text-base";
  return (
    <button
      className={`px-4 py-2 rounded ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Career Component
const Career = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  ];

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Attractive cash and equity-based packages to reward top talent.",
    },
    {
      title: "Comprehensive Health Coverage",
      description: "Medical, dental, vision, and disability insurance for your well-being.",
    },
    {
      title: "Flexible Time Off",
      description: "Work hard, rest well. Take time off when you need it to avoid burnout.",
    },
    {
      title: "Visa Sponsorship",
      description: "Support for international talent to join our mission-driven team.",
    },
    {
      title: "Retirement Savings",
      description: "Secure your financial future with our retirement savings plan.",
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-10 tracking-wide">
            {["VIV", "API", "NEWS", "CAREER"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-xl"
              >
                {item}
              </Link>
            ))}
            <a
              href="https://viv-test.vercel.app/"
              className="text-white hover:text-gray-300 text-sm sm:text-xl"
            >
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
        className={`fixed right-0 top-0 z-40 bg-[#040403] w-[250px] h-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-4">
          {["VIV", "API", "NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white text-lg hover:text-gray-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://viv-test.vercel.app/"
            className="text-white text-lg hover:text-gray-300"
          >
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
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 py-12">
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold font-mono mb-6">
          Join ViV AI's Mission
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mb-8">
          We are a team of innovators building AI to accelerate human
          understanding of the universe. Join us to shape the future of AI with
          ambitious goals and a passion for excellence.
        </p>
        <button className="text-white px-6 py-3 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold text-lg mb-12">
          Explore Open Roles
        </button>

        {/* Benefits Section */}
        <div className="max-w-6xl w-full">
          <h2 className="text-white text-3xl sm:text-4xl font-bold font-mono mb-8">
            Why Work at ViV AI?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-6 bg-neutral-900 rounded-lg text-left">
                <h3 className="text-white text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#010101] to-55% flex items-center justify-center pb-24 mt-10">
        <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">{section.title}</h5>
                <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                  {section.links.map((link) => (
                    <li key={link}>
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
  );
};

// News Component
const News = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  ];

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-10 tracking-wide">
            {["VIV", "API", "NEWS", "CAREER"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-xl"
              >
                {item}
              </Link>
            ))}
            <a
              href="https://viv-test.vercel.app/"
              className="text-white hover:text-gray-300 text-sm sm:text-xl"
            >
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
        className={`fixed right-0 top-0 z-40 bg-[#040403] w-[250px] h-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start p-6 space-y-4">
          {["VIV", "API", "NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white text-lg hover:text-gray-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://viv-test.vercel.app/"
            className="text-white text-lg hover:text-gray-300"
          >
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
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-5xl sm:text-8xl font-bold font-mono mb-10">
          VIV IN THE NEWS
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-8">
          Stay updated with the latest announcements, product launches, and
          media coverage about ViV AI's innovative solutions.
        </p>
        <div className="relative w-full max-w-[580px] px-2">
          <input
            type="text"
            placeholder="Search News Articles"
            className="w-full px-6 py-3 pr-14 rounded-full text-white text-base sm:text-lg bg-neutral-950 border focus:outline-none focus:ring-2"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 mr-1 rounded-full hover:bg-amber-50 transition">
            <ArrowRight className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#010101] to-55% flex items-center justify-center pb-24 mt-10">
        <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">{section.title}</h5>
                <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                  {section.links.map((link) => (
                    <li key={link}>
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
  );
};

// Main App Component
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
              {/* SPLINE BACKGROUND SECTION */}
              <div className="relative w-full h-screen">
                {/* Spline Background */}
                <Spline
                  scene="https://prod.spline.design/lq9VhNcDjdCW-zwT/scene.splinecode"
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                />

                {/* Navbar and Input */}
                <div className="relative z-40 flex flex-col h-full">
                  {/* Navbar */}
                  <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4 font-bold">
                      <Link to="/">
                        <img className="mr-8" src="./viv.png" width={95} alt="Logo" />
                      </Link>
                      <div className="hidden md:flex space-x-10 tracking-wide">
                        {["VIV", "API", "NEWS", "CAREER"].map((item) => (
                          <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-white hover:text-gray-300 text-sm sm:text-xl"
                          >
                            {item}
                          </Link>
                        ))}
                        <a
                          href="https://viv-test.vercel.app/"
                          className="text-white hover:text-gray-300 text-sm sm:text-xl"
                        >
                          DOCS
                        </a>
                      </div>
                    </div>

                    <Link to="https://chat.cosinv.com/">
                      <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
                        Try VIV AI
                      </button>
                    </Link>

                    {/* Mobile Toggle */}
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
                    className={`fixed right-0 top-0 z-40 bg-[#040403] w-[250px] h-full transform transition-transform duration-300 ${
                      isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div className="flex flex-col items-start p-6 space-y-4">
                      {["VIV", "API", "NEWS", "CAREER"].map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase()}`}
                          className="text-white text-lg hover:text-gray-300"
                        >
                          {item}
                        </Link>
                      ))}
                      <a
                        href="https://viv-test.vercel.app/"
                        className="text-white text-lg hover:text-gray-300"
                      >
                        DOCS
                      </a>
                      <Link to="https://chat.cosinv.com/">
                        <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
                          Try ViV AI
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="absolute bottom-30 p-4 w-full flex justify-center z-30">
                    <div className="relative w-full max-w-[580px] px-2">
                      <input
                        type="text"
                        placeholder="Search Anything"
                        className="w-full px-6 py-3 pr-14 rounded-full text-white text-base sm:text-lg bg-neutral-950"
                      />
                      <Link to="https://chat.cosinv.com/">
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 mr-1 rounded-full hover:bg-amber-50 transition">
                          <ArrowRight className="w-5 h-5 cursor-pointer" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <section
                id="video-section"
                className="pt-4 mt-16 md:-mt-3 flex justify-center px-4 md:px-0 bg-[#010101]"
              >
                <div className="container">
                  <div className="max-w-[1100px] mx-auto">
                    {/* Browser Window Mockup */}
                    <div className="rounded-xl overflow-hidden bg-zinc-900/50 shadow-2xl border border-white/5">
                      {/* Browser Controls */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-600" />
                          <div className="w-3 h-3 rounded-full bg-yellow-600" />
                          <div className="w-3 h-3 rounded-full bg-green-600" />
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-black/40 rounded-md py-1.5 px-3 text-xs text-white max-w-[300px] flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-zinc-800" />
                            cosinv.com
                          </div>
                        </div>
                      </div>

                      {/* Video/Content Area */}
                      <div className="aspect-[16/9] relative">
                        {isPlaying ? (
                          <iframe
                            src={`https://player.vimeo.com/video/1055784280?h=your_hash_here&autoplay=1&title=0&byline=0&portrait=0`}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                            onClick={() => setIsPlaying(true)}
                          >
                            <div className="absolute inset-0">
                              <img
                                src="/chat.png"
                                alt="Weaves every interaction into a web of knowledge"
                                fill
                                className="object-cover"
                                priority
                                unoptimized
                              />
                            </div>
                            <div>
                              <Button
                                size="lg"
                                className="relative z-10 size-16 md:size-20 rounded-full p-2 bg-black/20 hover:bg-black/30 transition-all duration-200 backdrop-blur-sm"
                              >
                                <Play className="size-6 md:size-11 text-white" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* PRODUCTS Section */}
              <section className="w-full min-h-screen flex items-center justify-center px-4 bg-[#010101]">
                <div className="max-w-6xl w-full text-center">
                  <h1 className="text-white text-5xl sm:text-8xl font-bold font-mono mb-16">
                    PRODUCTS
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                      {
                        title: "API",
                        price: "Smart Surveillance",
                        features: ["AI-powered detection", "Low latency video analytics", "Cloud/Edge compatible"],
                      },
                      {
                        title: "DOCS",
                        price: "Enterprise Assistant",
                        features: ["Custom-trained chatbots", "Multi-language NLP", "Seamless integrations"],
                      },
                      {
                        title: "ViV AI",
                        price: "Predictive Security",
                        features: ["Threat detection AI", "Behavior analytics", "Automated response"],
                      },
                    ].map((product) => (
                      <div key={product.title} className="relative h-[500px] w-full overflow-hidden mb-10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PixelCard variant="red" className="backdrop-blur-3xl">
                            <ShineBorder shineColor={["#D7F9F1", "#40434E", "#FFF7F8"]} className="rounded-3xl" />
                            <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                              <h3 className="text-white text-4xl font-extrabold mb-6">{product.title}</h3>
                              <p className="text-white mb-4 text-2xl font-bold tracking-wide">{product.price}</p>
                              <ul className="text-lg text-white space-y-2 mb-6 font-semibold tracking-wide">
                                {product.features.map((feat) => (
                                  <li key={feat}>• {feat}</li>
                                ))}
                              </ul>
                            </div>
                          </PixelCard>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* PRICING Section */}
              <section className="relative w-full min-h-screen bg-[#010101] flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <Particles
                    particleColors={["#ffffff", "#ffffff"]}
                    particleCount={1000}
                    particleSpread={20}
                    speed={0.3}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={true}
                  />
                </div>
                <div className="relative z-10 max-w-6xl w-full text-center">
                  <h1 className="text-white text-4xl sm:text-8xl font-bold font-mono mb-16">
                    PRICING PLANS
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                      {
                        title: "Free",
                        price: "₹0",
                        features: ["Basic access", "Limited API calls", "Community support"],
                      },
                      {
                        title: "Pro",
                        price: "₹999/mo",
                        features: ["Unlimited API usage", "Priority support", "Access to beta features"],
                      },
                      {
                        title: "Enterprise",
                        price: "Custom",
                        features: ["Dedicated infra", "SLA guarantees", "Onboarding + training"],
                      },
                    ].map((plan) => (
                      <div key={plan.title} className="flex justify-center">
                        <PixelCard variant="yellow" className="backdrop-blur-3xl">
                          <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                            <h3 className="text-white text-5xl font-extrabold mb-10">{plan.title}</h3>
                            <p className="text-white mb-4 text-xl font-extrabold tracking-wide">{plan.price}</p>
                            <ul className="text-md text-white space-y-2 mb-6 font-extrabold tracking-widest">
                              {plan.features.map((feat) => (
                                <li key={feat}>• {feat}</li>
                              ))}
                            </ul>
                            <button className="flex items-center justify-center gap-2 cursor-pointer w-full border border-white text-white rounded-full py-2 hover:bg-white hover:text-black transition-all font-semibold">
                              {plan.title === "Enterprise" ? "Contact Us" : "Get Started"}
                              <MoveRight className="ml-2" size={20} />
                            </button>
                          </div>
                        </PixelCard>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FOOTER */}
              <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#010101] to-55% flex items-center justify-center" id="footer">
                <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
                    {footerSections.map((section) => (
                      <div key={section.title}>
                        <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">{section.title}</h5>
                        <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                          {section.links.map((link) => (
                            <li key={link}>
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
          }
        />
        <Route path="/career" element={<Career />} />
        <Route path="/news" element={<News />} />
        {/* Fallback for undefined routes like /api, /docs, /playground */}
        <Route
          path="*"
          element={
            <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
              {/* Navbar */}
              <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between z-40">
                <div className="flex items-center space-x-4 font-bold">
                  <Link to="/">
                    <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
                  </Link>
                  <div className="hidden md:flex space-x-10 tracking-wide">
                    {["VIV", "API", "NEWS", "CAREER"].map((item) => (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="text-white hover:text-gray-300 text-sm sm:text-xl"
                      >
                        {item}
                      </Link>
                    ))}
                    <a
                      href="https://viv-test.vercel.app/"
                      className="text-white hover:text-gray-300 text-sm sm:text-xl"
                    >
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
                className={`fixed right-0 top-0 z-40 bg-[#040403] w-[250px] h-full transform transition-transform duration-300 ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex flex-col items-start p-6 space-y-4">
                  {["VIV", "API", "NEWS", "CAREER"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="text-white text-lg hover:text-gray-300"
                    >
                      {item}
                    </Link>
                  ))}
                  <a
                    href="https://viv-test.vercel.app/"
                    className="text-white text-lg hover:text-gray-300"
                  >
                    DOCS
                  </a>
                  <Link to="https://chat.cosinv.com/">
                    <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 cursor-pointer hover:text-black font-extrabold">
                      Try ViV AI
                    </button>
                  </Link>
                </div>
              </div>

              {/* 404 Page with Lottie Animation */}
              <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-24 sm:py-32 bg-[#040403]">
                <div className="text-center">
                  <div className="flex justify-center">
                    <Lottie
                      animationData={notFoundAnimation}
                      loop={true}
                      className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] pb-20"
                    />
                  </div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Page Not Found
                  </h1>
                  <p className="mt-6 text-lg text-gray-400">
                    Sorry, we couldn’t find the page you’re looking for.
                  </p>
                  <div className="mt-10 flex items-center justify-center">
                    <Link
                      to="/"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go back home
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;