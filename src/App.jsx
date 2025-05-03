import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ArrowRight, MenuIcon, MoveRight } from "lucide-react";
import Particles from "./bits/Particles";
import PixelCard from "./bits/PixelCard";
import BlurText from "./bits/BlurTxt";
import { ShineBorder } from "./components/magicui/shine-border";
import "./App.css";
import { AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, PerspectiveCamera, Points, RawShaderMaterial, Scene, WebGLRenderer } from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import GUI from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/lil-gui.module.min.js";
import { TWEEN } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/tween.module.min.js";

// GalaxyBackground Component
const GalaxyBackground = () => {
  const canvasRef = useRef(null);
  const guiRef = useRef(null);

  useEffect(() => {
    const count = 128 ** 2;
    const shaderUtils = `
      float random (vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      vec3 scatter (vec3 seed) {
        float u = random(seed.xy);
        float v = random(seed.yz);
        float theta = u * 6.28318530718;
        float phi = acos(2.0 * v - 1.0);
        float sinTheta = sin(theta);
        float cosTheta = cos(theta);
        float sinPhi = sin(phi);
        float cosPhi = cos(phi);
        float x = sinPhi * cosTheta;
        float y = sinPhi * sinTheta;
        float z = cosPhi;
        return vec3(x, y, z);
      }
    `;

    // Scene Setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 3);

    const renderer = new WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const orbit = new OrbitControls(camera, canvasRef.current);

    // Star Alpha Texture
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = ctx.canvas.height = 32;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 32, 32);
    let grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0.0, "#fff");
    grd.addColorStop(1.0, "#000");
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.rect(15, 0, 2, 32); ctx.fill();
    ctx.beginPath(); ctx.rect(0, 15, 32, 2); ctx.fill();
    grd = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grd.addColorStop(0.1, "#ffff");
    grd.addColorStop(0.6, "#0000");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 32, 32);
    const alphaMap = new CanvasTexture(ctx.canvas);

    // Galaxy
    const galaxyGeometry = new BufferGeometry();
    const galaxyPosition = new Float32Array(count * 3);
    const galaxySeed = new Float32Array(count * 3);
    const galaxySize = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      galaxyPosition[i * 3] = i / count;
      galaxySeed[i * 3 + 0] = Math.random();
      galaxySeed[i * 3 + 1] = Math.random();
      galaxySeed[i * 3 + 2] = Math.random();
      galaxySize[i] = Math.random() * 2 + 0.5;
    }
    galaxyGeometry.setAttribute("position", new BufferAttribute(galaxyPosition, 3));
    galaxyGeometry.setAttribute("size", new BufferAttribute(galaxySize, 1));
    galaxyGeometry.setAttribute("seed", new BufferAttribute(galaxySeed, 3));

    const innColor = new Color("#f40");
    const outColor = new Color("#a7f");
    const galaxyMaterial = new RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: renderer.getPixelRatio() },
        uBranches: { value: 2 },
        uRadius: { value: 0 },
        uSpin: { value: Math.PI * 0.25 },
        uRandomness: { value: 0 },
        uAlphaMap: { value: alphaMap },
        uColorInn: { value: innColor },
        uColorOut: { value: outColor },
      },
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        attribute float size;
        attribute vec3 seed;
        uniform mat4 projectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform float uTime;
        uniform float uSize;
        uniform float uBranches;
        uniform float uRadius;
        uniform float uSpin;
        uniform float uRandomness;
        varying float vDistance;
        #define PI  3.14159265359
        #define PI2 6.28318530718
        ${shaderUtils}
        void main() {
          vec3 p = position;
          float st = sqrt(p.x);
          float qt = p.x * p.x;
          float mt = mix(st, qt, p.x);
          float angle = qt * uSpin * (2.0 - sqrt(1.0 - qt));
          float branchOffset = (PI2 / uBranches) * floor(seed.x * uBranches);
          p.x = position.x * cos(angle + branchOffset) * uRadius;
          p.z = position.x * sin(angle + branchOffset) * uRadius;
          p += scatter(seed) * random(seed.zx) * uRandomness * mt;
          p.y *= 0.5 + qt * 0.5;
          vec3 temp = p;
          float ac = cos(-uTime * (2.0 - st) * 0.5);
          float as = sin(-uTime * (2.0 - st) * 0.5);
          p.x = temp.x * ac - temp.z * as;
          p.z = temp.x * as + temp.z * ac;
          vDistance = mt;
          vec4 mvp = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvp;
          gl_PointSize = (10.0 * size * uSize) / -mvp.z;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uColorInn;
        uniform vec3 uColorOut;
        uniform sampler2D uAlphaMap;
        varying float vDistance;
        #define PI  3.14159265359
        void main() {
          vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
          float a = texture2D(uAlphaMap, uv).g;
          if (a < 0.1) discard;
          vec3 color = mix(uColorInn, uColorOut, vDistance);
          float c = step(0.99, (sin(gl_PointCoord.x * PI) + sin(gl_PointCoord.y * PI)) * 0.5);
          color = max(color, vec3(c));
          gl_FragColor = vec4(color, a);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    galaxyMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace("#include <random, scatter>", shaderUtils);
    };
    const galaxy = new Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // Universe
    const universeGeometry = new BufferGeometry();
    const universePosition = new Float32Array((count * 3) / 2);
    const universeSeed = new Float32Array((count * 3) / 2);
    const universeSize = new Float32Array(count / 2);
    for (let i = 0; i < count / 2; i++) {
      universeSeed[i * 3 + 0] = Math.random();
      universeSeed[i * 3 + 1] = Math.random();
      universeSeed[i * 3 + 2] = Math.random();
      universeSize[i] = Math.random() * 2 + 0.5;
    }
    universeGeometry.setAttribute("position", new BufferAttribute(universePosition, 3));
    universeGeometry.setAttribute("seed", new BufferAttribute(universeSeed, 3));
    universeGeometry.setAttribute("size", new BufferAttribute(universeSize, 1));

    const universeMaterial = new RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: galaxyMaterial.uniforms.uSize,
        uRadius: galaxyMaterial.uniforms.uRadius,
        uAlphaMap: galaxyMaterial.uniforms.uAlphaMap,
      },
      vertexShader: `
        precision highp float;
        attribute vec3 seed;
        attribute float size;
        uniform mat4 projectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform float uTime;
        uniform float uSize;
        uniform float uRadius;
        #define PI  3.14159265359
        #define PI2 6.28318530718
        ${shaderUtils}
        const float r = 3.0;
        const vec3 s = vec3(2.1, 1.3, 2.1);
        void main() {
          vec3 p = scatter(seed) * r * s;
          float q = random(seed.zx);
          for (int i = 0; i < 3; i++) q *= q;
          p *= q;
          float l = length(p) / (s.x * r);
          p = l < 0.001 ? (p / l) : p;
          vec3 temp = p;
          float ql = 1.0 - l;
          for (int i = 0; i < 3; i++) ql *= ql;
          float ac = cos(-uTime * ql);
          float as = sin(-uTime * ql);
          p.x = temp.x * ac - temp.z * as;
          p.z = temp.x * as + temp.z * ac;
          vec4 mvp = modelViewMatrix * vec4(p * uRadius, 1.0);
          gl_Position = projectionMatrix * mvp;
          l = (2.0 - l) * (2.0 - l);
          gl_PointSize = (r * size * uSize * l) / -mvp.z;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uAlphaMap;
        #define PI 3.14159265359
        void main() {
          vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);
          float a = texture2D(uAlphaMap, uv).g;
          if (a < 0.1) discard;
          gl_FragColor = vec4(vec3(1.0), a);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    universeMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader.replace("#include <random, scatter>", shaderUtils);
    };
    const universe = new Points(universeGeometry, universeMaterial);
    scene.add(universe);

    // GUI
    const gui = new GUI().close();
    guiRef.current = gui;
    const u = galaxyMaterial.uniforms;
    gui.add(u.uSize, "value", 0, 4, 0.01).name("star size");
    gui.add(u.uBranches, "value", 1, 5, 1).name("branch num");
    const cRadius = gui.add(u.uRadius, "value", 0, 5, 0.01).name("scale");
    const cSpin = gui.add(u.uSpin, "value", -12.57, 12.57, 0.01).name("spin");
    const cRandomness = gui.add(u.uRandomness, "value", 0, 1, 0.01).name("scatter");
    gui.addColor({ color: innColor.getHexString() }, "color").name("inn color").onChange((hex) => {
      const { r, g, b } = new Color(hex);
      u.uColorInn.value = [r, g, b];
    });
    gui.addColor({ color: outColor.getHexString() }, "color").name("out color").onChange((hex) => {
      const { r, g, b } = new Color(hex);
      u.uColorOut.value = [r, g, b];
    });

    // Animation
    new TWEEN.Tween({
      radius: 0,
      spin: 0,
      randomness: 0,
      rotate: 0,
    }).to({
      radius: 1.618,
      spin: Math.PI * 2,
      randomness: 0.5,
      rotate: Math.PI * 4,
    })
      .duration(5000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(({ radius, spin, randomness, rotate }) => {
        cRadius.setValue(radius);
        cRadius.updateDisplay();
        cSpin.setValue(spin);
        cSpin.updateDisplay();
        cRandomness.setValue(randomness);
        cRandomness.updateDisplay();
        galaxy.rotation.y = rotate;
        universe.rotation.y = rotate / 3;
      })
      .onComplete(() => gui.open())
      .start();

    // Render Loop
    const t = 0.001;
    let animationFrameId;
    const animate = () => {
      galaxyMaterial.uniforms.uTime.value += t / 2;
      universeMaterial.uniforms.uTime.value += t / 3;
      TWEEN.update();
      orbit.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      gui.destroy();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  );
};

// Career Component
const Career = () => {
  const footerSections = [
    { title: "TRY VIV ON", links: ["Web", "Android", "IOS"] },
    { title: "PRODUCTS", links: ["API", "PlayGround"] },
    { title: "COMPANY", links: ["Career", "News"] },
    { title: "RESOURCES", links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"] },
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
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img src="./savege.png" width={70} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-4">
            {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
              <Link
                key={i}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-base"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
          Try ViV AI
        </button>
      </nav>
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 py-12">
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold font-mono mb-6">
          Join ViV AI's Mission
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mb-8">
          We are a team of innovators building AI to accelerate human understanding of the universe. Join us to shape the future of AI with ambitious goals and a passion for excellence.
        </p>
        <button className="text-white px-6 py-3 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold text-lg mb-12">
          Explore Open Roles
        </button>
        <div className="max-w-6xl w-full">
          <h2 className="text-white text-3xl sm:text-4xl font-bold font-mono mb-8">
            Why Work at ViV AI?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 bg-neutral-900 rounded-lg text-left">
                <h3 className="text-white text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-base">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center pb-24 mt-10">
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
  );
};

// News Component
const News = () => {
  const footerSections = [
    { title: "TRY VIV ON", links: ["Web", "Android", "IOS"] },
    { title: "PRODUCTS", links: ["API", "PlayGround"] },
    { title: "COMPANY", links: ["Career", "News"] },
    { title: "RESOURCES", links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"] },
  ];

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#040403]">
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-4 font-bold">
          <Link to="/">
            <img src="./savege.png" width={70} alt="Logo" />
          </Link>
          <div className="hidden md:flex space-x-4">
            {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
              <Link
                key={i}
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-300 text-sm sm:text-base"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
          Try ViV AI
        </button>
      </nav>
      <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-5xl sm:text-8xl font-bold font-mono mb-10">
          VIV IN THE NEWS
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-8">
          Stay updated with the latest announcements, product launches, and media coverage about ViV AI's innovative solutions.
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
      <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center pb-24 mt-10">
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
    { title: "TRY VIV ON", links: ["Web", "Android", "IOS"] },
    { title: "PRODUCTS", links: ["API", "PlayGround"] },
    { title: "COMPANY", links: ["Career", "News"] },
    { title: "RESOURCES", links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"] },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full overflow-x-hidden text-white">
              {/* GALAXY BACKGROUND SECTION */}
              <div className="relative w-full min-h-screen">
                <GalaxyBackground />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040403] bg-opacity-50 z-10" />
                <div className="relative z-20">
                  <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4 font-bold">
                      <Link to="/">
                        <img src="./savege.png" width={70} alt="Logo" />
                      </Link>
                      <div className="hidden md:flex space-x-4">
                        {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                          <Link
                            key={i}
                            to={`/${item.toLowerCase()}`}
                            className="text-white hover:text-gray-300 text-sm sm:text-base"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                      Try ViV AI
                    </button>
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
                      {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
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
                  <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
                    <BlurText
                      text="ViV"
                      delay={250}
                      animateBy="letters"
                      direction="bottom"
                      className={`transition-all duration-1000 select-none font-bold leading-none break-words mb-20 
                      ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"} 
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
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 mr-1 rounded-full hover:bg-amber-50 transition">
                        <ArrowRight className="w-5 h-5 cursor-pointer" />
                      </button>
                    </div>
                  </section>
                </div>
              </div>
              <section className="w-full min-h-screen flex items-center justify-center px-4 bg-[#040403]">
                <div className="max-w-6xl w-full text-center">
                  <h1 className="text-white text-5xl sm:text-8xl yard font-bold font-mono mb-15">
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
                    ].map((product, idx) => (
                      <div key={idx} className="relative h-[500px] w-full overflow-hidden mb-10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PixelCard variant="red" className="backdrop-blur-3xl">
                            <ShineBorder shineColor={["#D7F9F1", "#40434E", "#FFF7F8"]} className="rounded-3xl" />
                            <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                              <h3 className="text-white text-4xl font-extrabold mb-6">{product.title}</h3>
                              <p className="text-white mb-4 text-2xl font-bold tracking-wide">{product.price}</p>
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
                      { title: "Free", price: "₹0", features: ["Basic access", "Limited API calls", "Community support"] },
                      { title: "Pro", price: "₹999/mo", features: ["Unlimited API usage", "Priority support", "Access to beta features"] },
                      { title: "Enterprise", price: "Custom", features: ["Dedicated infra", "SLA guarantees", "Onboarding + training"] },
                    ].map((plan, idx) => (
                      <div key={idx} className="flex justify-center">
                        <PixelCard variant="yellow" className="backdrop-blur-3xl">
                          <div className="absolute p-6 text-left hover:scale-[1.02] transition-transform shadow-md">
                            <h3 className="text-white text-5xl font-extrabold mb-10">{plan.title}</h3>
                            <p className="text-white mb-4 text-xl font-extrabold tracking-wide">{plan.price}</p>
                            <ul className="text-md text-white space-y-2 mb-6 font-extrabold tracking-widest">
                              {plan.features.map((feat, i) => (
                                <li key={i}>• {feat}</li>
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
              <div className="w-full min-h-screen bg-gradient-to-t from-[#1E2019] to-[#040403] to-55% flex items-center justify-center" id="footer">
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
          }
        />
        <Route path="/career" element={<Career />} />
        <Route path="/news" element={<News />} />
        <Route
          path="*"
          element={
            <>
              <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between bg-black">
                <div className="flex items-center space-x-4 font-bold">
                  <Link to="/">
                    <img src="./savege.png" width={70} alt="Logo" />
                  </Link>
                  <div className="hidden md:flex space-x-4">
                    {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
                      <Link
                        key={i}
                        to={`/${item.toLowerCase()}`}
                        className="text-white hover:text-gray-300 text-sm sm:text-base"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
                <button className="hidden md:block text-white px-4 py-2 rounded-full border hover:bg-amber-50 hover:text-black font-extrabold">
                  Try ViV AI
                </button>
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
                  {["API", "DOCS", "NEWS", "CAREER"].map((item, i) => (
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