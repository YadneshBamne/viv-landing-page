import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ArrowRight, MenuIcon, MoveRight } from "lucide-react";
import Particles from "./bits/Particles";
import PixelCard from "./bits/PixelCard";
import BlurText from "./bits/BlurTxt";
import { ShineBorder } from "./components/magicui/shine-border";
import "./App.css";
import bgVideo from "/bgvideo.mp4";

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
      description:
        "Attractive cash and equity-based packages to reward top talent.",
    },
    {
      title: "Comprehensive Health Coverage",
      description:
        "Medical, dental, vision, and disability insurance for your well-being.",
    },
    {
      title: "Flexible Time Off",
      description:
        "Work hard, rest well. Take time off when you need it to avoid burnout.",
    },
    {
      title: "Visa Sponsorship",
      description:
        "Support for international talent to join our mission-driven team.",
    },
    {
      title: "Retirement Savings",
      description:
        "Secure your financial future with our retirement savings plan.",
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-10 tracking-wide">
            {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
              <Link
                key={i}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-xl"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
          Try ViV AI
        </button>

        {/* Mobile Toggle */}
        <div
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
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
        className={`fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden transition-all ${
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
          {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
            <Link
              key={i}
              to={`/${item.toLowerCase()}`}
              className="text-white text-lg hover:text-gray-300"
            >
              {item}
            </Link>
          ))}
          <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
            Try ViV AI
          </button>
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
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 bg-neutral-900 rounded-lg text-left"
              >
                <h3 className="text-white text-xl font-bold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center pb-24 mt-10">
        <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
            {footerSections.map((section, index) => (
              <div key={`footer-${index}`}>
                <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">
                  {section.title}
                </h5>
                <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                  {section.links.map((link, linkIndex) => (
                    <li key={`link-${index}-${linkIndex}`}>
                      <Link
                        to={`/${link.toLowerCase()}`}
                        className="hover:text-gray-300"
                      >
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
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-10 tracking-wide">
            {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
              <Link
                key={i}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-xl"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
          Try ViV AI
        </button>

        {/* Mobile Toggle */}
        <div
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
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
        className={`fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden transition-all ${
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
          {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
            <Link
              key={i}
              to={`/${item.toLowerCase()}`}
              className="text-white text-lg hover:text-gray-300"
            >
              {item}
            </Link>
          ))}
          <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
            Try ViV AI
          </button>
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
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center pb-24 mt-10">
        <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
            {footerSections.map((section, index) => (
              <div key={`footer-${index}`}>
                <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">
                  {section.title}
                </h5>
                <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                  {section.links.map((link, linkIndex) => (
                    <li key={`link-${index}-${linkIndex}`}>
                      <Link
                        to={`/${link.toLowerCase()}`}
                        className="hover:text-gray-300"
                      >
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
            <div className="relative w-full overflow-x-hidden text-white">
              {/* VIDEO BACKGROUND SECTION */}
              <div className="relative w-full min-h-screen">
                {/* Background Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                  <source src={bgVideo} type="video/mp4" />
                  Your browser does not support the video tag or the video
                  failed to load.
                </video>

                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040403] bg-opacity-50 z-10" />

                {/* Content over video */}
                <div className="relative z-20">
                  {/* Navbar */}
                  <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4 font-bold">
                      <Link to="/">
                        <img className="mr-8" src="./viv.png" width={95} alt="Logo" />
                      </Link>
                      <div className="hidden md:flex space-x-10 tracking-wide">
                        {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                          <Link
                            key={i}
                            to={`/${item.toLowerCase()}`}
                            className="text-white hover:text-gray-300 text-sm sm:text-xl"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                      Try ViV AI
                    </button>

                    {/* Mobile Toggle */}
                    <div
                      className="md:hidden flex items-center"
                      onClick={toggleMenu}
                    >
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
                    className={`fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden transition-all ${
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
                      {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                        <Link
                          key={i}
                          to={`/${item.toLowerCase()}`}
                          className="text-white text-lg hover:text-gray-300"
                        >
                          {item}
                        </Link>
                      ))}
                      <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                        Try ViV AI
                      </button>
                    </div>
                  </div>

                  {/* Hero */}
                  <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
                    <BlurText
                      text="ViV"
                      delay={250}
                      animateBy="letters"
                      direction="bottom"
                      className={`transition-all duration-1000 select-none font-bold leading-none break-words mb-20 
                      ${
                        isLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50"
                      } 
                      text-[200px] sm:text-[180px] md:text-[250px] lg:text-[250px] ml-2`}
                    />
                    <p className="text-sm sm:text-base pb-5 text-gray-400 select-none">
                      Secure, reliable and cost effective
                    </p>
                    <div className="relative w-full max-w-[580px] px-2">
                      <input
                        type="text"
                        placeholder="Search Anything"
                        className="w-full px-6 py-3 pr-14 rounded-full text-white text-base sm:text-lg bg-neutral-950 border focus:outline-none focus:ring-2"
                      />
                      <Link to="http://localhost:5173/chat">
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 mr-1 rounded-full hover:bg-amber-50 transition">
                          <ArrowRight className="w-5 h-5 cursor-pointer" />
                        </button>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>

              {/* PRODUCTS Section */}
              <section className="w-full min-h-screen flex items-center justify-center px-4 bg-[#040403]">
                <div className="max-w-6xl w-full text-center">
                  <h1 className="text-white text-5xl sm:text-8xl font-bold font-mono mb-15">
                    PRODUCTS
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                      {
                        title: "API",
                        price: "Smart Surveillance",
                        features: [
                          "AI-powered detection",
                          "Low latency video analytics",
                          "Cloud/Edge compatible",
                        ],
                      },
                      {
                        title: "DOCS",
                        price: "Enterprise Assistant",
                        features: [
                          "Custom-trained chatbots",
                          "Multi-language NLP",
                          "Seamless integrations",
                        ],
                      },
                      {
                        title: "ViV AI",
                        price: "Predictive Security",
                        features: [
                          "Threat detection AI",
                          "Behavior analytics",
                          "Automated response",
                        ],
                      },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="relative h-[500px] w-full overflow-hidden mb-10"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PixelCard
                            variant="red"
                            className="backdrop-blur-3xl"
                          >
                            <ShineBorder
                              shineColor={["#D7F9F1", "#40434E", "#FFF7F8"]}
                              className="rounded-3xl"
                            />
                            <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                              <h3 className="text-white text-4xl font-extrabold mb-6">
                                {product.title}
                              </h3>
                              <p className="text-white mb-4 text-2xl font-bold tracking-wide">
                                {product.price}
                              </p>
                              <ul className="text-lg text-white space-y-2 mb-6 font-semibold tracking-wide">
                                {product.features.map((feat, i) => (
                                  <li key={i}>• {feat}</li>
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
              <section className="relative w-full min-h-screen bg-[#040403] flex items-center justify-center px-4 overflow-hidden">
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
                  <h1 className="text-white text-4xl sm:text-8xl font-bold font-mono mb-15">
                    PRICING PLANS
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                      {
                        title: "Free",
                        price: "₹0",
                        features: [
                          "Basic access",
                          "Limited API calls",
                          "Community support",
                        ],
                      },
                      {
                        title: "Pro",
                        price: "₹999/mo",
                        features: [
                          "Unlimited API usage",
                          "Priority support",
                          "Access to beta features",
                        ],
                      },
                      {
                        title: "Enterprise",
                        price: "Custom",
                        features: [
                          "Dedicated infra",
                          "SLA guarantees",
                          "Onboarding + training",
                        ],
                      },
                    ].map((plan, idx) => (
                      <div key={idx} className="flex justify-center">
                        <PixelCard
                          variant="yellow"
                          className="backdrop-blur-3xl"
                        >
                          <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                            <h3 className="text-white text-5xl font-extrabold mb-10">
                              {plan.title}
                            </h3>
                            <p className="text-white mb-4 text-xl font-extrabold tracking-wide">
                              {plan.price}
                            </p>
                            <ul className="text-md text-white space-y-2 mb-6 font-extrabold tracking-widest">
                              {plan.features.map((feat, i) => (
                                <li key={i}>• {feat}</li>
                              ))}
                            </ul>
                            <button className="flex items-center justify-center gap-2 cursor-pointer w-full border border-white text-white rounded-full py-2 hover:bg-white hover:text-black transition-all font-semibold">
                              {plan.title === "Enterprise"
                                ? "Contact Us"
                                : "Get Started"}
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
              <div
                className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center"
                id="footer"
              >
                <div className="w-full max-w-6xl px-6 sm:px-10 text-[1.3rem]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 justify-items-start md:justify-items-start text-start md:text-left">
                    {footerSections.map((section, index) => (
                      <div key={`footer-${index}`}>
                        <h5 className="text-[#ccc] font-mono text-2xl sm:text-3xl mb-5">
                          {section.title}
                        </h5>
                        <ul className="space-y-2 text-[#999] text-[15px] sm:text-xl">
                          {section.links.map((link, linkIndex) => (
                            <li key={`link-${index}-${linkIndex}`}>
                              <Link
                                to={`/${link.toLowerCase()}`}
                                className="hover:text-gray-300"
                              >
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
            <>
              <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between bg-black">
                <div className="flex items-center space-x-4 font-bold">
                  <Link to="/">
                    <img className="mr-8" src="./viv.png" width={80} alt="Logo" />
                  </Link>
                  <div className="hidden md:flex space-x-10 tracking-wide">
                    {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                      <Link
                        key={i}
                        to={`/${item.toLowerCase()}`}
                        className="text-white hover:text-gray-300 text-sm sm:text-xl"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>

                <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                  Try ViV AI
                </button>

                {/* Mobile Toggle */}
                <div
                  className="md:hidden flex items-center"
                  onClick={toggleMenu}
                >
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
                className={`fixed inset-0 bg-black bg-opacity-70 z-30 md:hidden transition-all ${
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
                  {["VIV", "API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                    <Link
                      key={i}
                      to={`/${item.toLowerCase()}`}
                      className="text-white text-lg hover:text-gray-300"
                    >
                      {item}
                    </Link>
                  ))}
                  <button className="text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                    Try ViV AI
                  </button>
                </div>
              </div>
              <main className="grid min-h-screen place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <p className="text-9xl font-semibold text-white">404</p>
                  <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                    Page not found
                  </h1>
                  <p className="mt-6 text-lg font-medium text-pretty text-white sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="/"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go back home
                    </a>
                  </div>
                </div>
              </main>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
