import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useTransition,
} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  ArrowRight,
  MenuIcon,
  MoveRight,
  Play,
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
  Paperclip,
  Command,
  SendIcon,
  XIcon,
  LoaderIcon,
  Sparkles,
  ImageIcon,
  Figma,
  MonitorIcon,
  Mic2,
  Mic,
} from "lucide-react";
import Lottie from "lottie-react";
import Spline from "@splinetool/react-spline";
import Particles from "./bits/Particles";
import PixelCard from "./bits/PixelCard";
import { ShineBorder } from "./components/magicui/shine-border";
import { motion, AnimatePresence } from "framer-motion";
import notFoundAnimation from "./assets/notfound.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Placeholder Button Component
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

// Textarea Component
/**
 * @typedef {Object} UseAutoResizeTextareaProps
 * @property {number} minHeight - Minimum height of the textarea.
 * @property {number} [maxHeight] - Optional maximum height of the textarea.
 */

/**
 * @param {UseAutoResizeTextareaProps} props
 */
function UseAutoResizeTextarea({ minHeight, maxHeight }) {
  // Your hook or component logic here
  return <textarea style={{ minHeight, maxHeight }} />;
}

function useAutoResizeTextarea({ minHeight, maxHeight }) {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(
    (reset) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

/**
 * @typedef {Object} TextareaProps
 * @property {string} [containerClassName] - Optional class for container styling.
 * @property {boolean} [showRing] - Whether to show a focus ring.
 * @property {React.TextareaHTMLAttributes<HTMLTextAreaElement>} rest - All other textarea props.
 */

/**
 * @param {TextareaProps} props
 */
function Textarea({ containerClassName = "", showRing = true, ...rest }) {
  return (
    <div className={containerClassName}>
      <textarea
        {...rest}
        className={`${rest.className ?? ""} ${showRing ? "focus:ring" : ""}`}
      />
    </div>
  );
}

// const Textarea = React.forwardRef(
//   ({ className, containerClassName, showRing = true, ...props }, ref) => {
//     const [isFocused, setIsFocused] = React.useState(false);

//     return (
//       <div className={cn("relative", containerClassName)}>
//         <textarea
//           className={cn(
//             "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
//             "transition-all duration-200 ease-in-out",
//             "placeholder:text-muted-foreground",
//             "disabled:cursor-not-allowed disabled:opacity-50",
//             showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
//             className,
//           )}
//           ref={ref}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           {...props}
//         />
//         {showRing && isFocused && (
//           <motion.span
//             className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           />
//         )}
//         {props.onChange && (
//           <div
//             className="absolute bottom-2 right-2 opacity-0 w-2 h-2 bg-violet-500 rounded-full"
//             style={{ animation: "none" }}
//             id="textarea-ripple"
//           />
//         )}
//       </div>
//     );
//   },
// );
Textarea.displayName = "Textarea";
/**
 * @typedef {Object} CommandSuggestion
 * @property {React.ReactNode} icon - The icon to display.
 * @property {string} label - The main label of the suggestion.
 * @property {string} description - A short description.
 * @property {string} prefix - A command prefix.
 */

/**
 * @param {CommandSuggestion} props
 */
function CommandSuggestionItem({ icon, label, description, prefix }) {
  return (
    <div className="flex items-start space-x-2">
      <div className="text-lg">{icon}</div>
      <div>
        <div className="font-medium">
          {prefix} {label}
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
}

// AnimatedAIChat Component (Frontend UI only)
function AnimatedAIChat() {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [recentCommand, setRecentCommand] = useState(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const commandPaletteRef = useRef < HTMLDivElement > null;

  /** @type {CommandSuggestion[]} */
  const commandSuggestions = [
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Clone UI",
      description: "Generate a UI from a screenshot",
      prefix: "/clone",
    },
    {
      icon: <Figma className="w-4 h-4" />,
      label: "Import Figma",
      description: "Import a design from Figma",
      prefix: "/figma",
    },
    {
      icon: <MonitorIcon className="w-4 h-4" />,
      label: "Create Page",
      description: "Generate a new web page",
      prefix: "/page",
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Improve",
      description: "Improve existing UI design",
      prefix: "/improve",
    },
  ];

  useEffect(() => {
    if (value.startsWith("/") && !value.includes(" ")) {
      setShowCommandPalette(true);
      const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) =>
        cmd.prefix.startsWith(value)
      );
      if (matchingSuggestionIndex >= 0) {
        setActiveSuggestion(matchingSuggestionIndex);
      } else {
        setActiveSuggestion(-1);
      }
    } else {
      setShowCommandPalette(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      const commandButton = document.querySelector("[data-command-button]");
      if (
        commandPaletteRef.current &&
        !commandPaletteRef.current.contains(target) &&
        !commandButton?.contains(target)
      ) {
        setShowCommandPalette(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /** @param {React.KeyboardEvent<HTMLTextAreaElement>} e */
  const handleKeyDown = (e) => {
    if (showCommandPalette) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev < commandSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          prev > 0 ? prev - 1 : commandSuggestions.length - 1
        );
      } else if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          const selectedCommand = commandSuggestions[activeSuggestion];
          setValue(selectedCommand.prefix + " ");
          setShowCommandPalette(false);
          setRecentCommand(selectedCommand.label);
          setTimeout(() => setRecentCommand(null), 3500);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowCommandPalette(false);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (value.trim()) {
      startTransition(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setValue("");
          adjustHeight(true);
        }, 3000);
      });
    }
  };

  const handleAttachFile = () => {
    const mockFileName = `file-${Math.floor(Math.random() * 1000)}.pdf`;
    setAttachments((prev) => [...prev, mockFileName]);
  };

  /** @param {number} index */
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const selectCommandSuggestion = (index) => {
    const selectedCommand = commandSuggestions[index];
    setValue(selectedCommand.prefix + " ");
    setShowCommandPalette(false);
    setRecentCommand(selectedCommand.label);
    setTimeout(() => setRecentCommand(null), 2000);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto relative z-10 px-2">
      <motion.div
        className="space-y-10 sm:space-y-12 md:space-y-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-9xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
              VIV AI
            </h1>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
          <motion.p
            className="text-sm text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Type a command or ask a question
          </motion.p>
        </div>

        <motion.div
          className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence>
            {showCommandPalette && (
              <motion.div
                ref={commandPaletteRef}
                className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-black/90 rounded-lg z-50 shadow-lg border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                <div className="py-1 bg-black/95">
                  {commandSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.prefix}
                      className={cn(
                        "flex items-center gap-2 px-9 py-2 text-xs transition-colors cursor-pointer",
                        activeSuggestion === index
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5"
                      )}
                      onClick={() => selectCommandSuggestion(index)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <div className="w-5 h-5 flex items-center justify-center text-white/60">
                        {suggestion.icon}
                      </div>
                      <div className="font-medium">{suggestion.label}</div>
                      <div className="text-white/40 text-xs ml-1">
                        {suggestion.prefix}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask ViV AI a question..."
              containerClassName="w-full"
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-white/90 text-sm",
                "focus:outline-none",
                "placeholder:text-white/20",
                "min-h-[60px]"
              )}
              style={{ overflow: "hidden" }}
              showRing={false}
            />
          </div>

          <AnimatePresence>
            {attachments.length > 0 && (
              <motion.div
                className="px-4 pb-3 flex gap-2 flex-wrap"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {attachments.map((file, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-xs bg-white/[0.03] py-1.5 px-3 rounded-lg text-white/70"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <span>{file}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={handleAttachFile}
                whileTap={{ scale: 0.94 }}
                className="p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors relative group"
              >
                <Paperclip className="w-4 h-4" />
                <motion.span
                  className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="button-highlight"
                />
              </motion.button>
              <motion.button
                type="button"
                data-command-button
                // onClick={(e) => {
                //   e.stopPropagation();
                //   setShowCommandPalette((prev) => !prev);
                // }}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  "p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors relative group",
                  showCommandPalette && "bg-white/10 text-white/90"
                )}
              >
                <Mic className="w-4 h-4" />
                <motion.span
                  className="absolute inset-0 bg-white/[0.05] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="button-highlight"
                />
              </motion.button>
            </div>

            <Link to="https://chat.cosinv.com/">
              <motion.button
                type="button"
                onClick={handleSendMessage}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTyping || !value.trim()}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "flex items-center gap-2 cursor-pointer",
                  value.trim()
                    ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                    : "bg-white/[0.05] text-white/40"
                )}
              >
                {isTyping ? (
                  <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                ) : (
                  <SendIcon className="w-4 h-4" />
                )}

                <span>Send</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {commandSuggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion.prefix}
              onClick={() => selectCommandSuggestion(index)}
              className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-sm text-white/60 hover:text-white/90 transition-all relative group cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {suggestion.icon}
              <span>{suggestion.label}</span>
              <motion.div
                className="absolute inset-0 border border-white/[0.05] rounded-lg"
                initial={false}
                animate={{ opacity: [0, 1], scale: [0.98, 1] }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isTyping && (
          <motion.div
            className="fixed bottom-8 left-1/2 mx-auto transform -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-4 py-2 shadow-lg border border-white/[0.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-center">
                <span className="text-xs font-medium text-white/90 mb-0.5">
                  ViV
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Thinking</span>
                <TypingDots />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.1, 0.85] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
          style={{ boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)" }}
        />
      ))}
    </div>
  );
}

// Career Component
const Career = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const footerSections = [
    { title: "TRY VIV ON", links: ["Web", "Android", "IOS"] },
    { title: "PRODUCTS", links: ["API", "PlayGround"] },
    { title: "COMPANY", links: ["Career", "News"] },
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
    <div className="relative w-full overflow-x-hidden text-white bg-[#0A0A0C]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img className="mr-4" src="./viv.png" width={85} alt="Logo" />
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-8 tracking-wide items-center text-sm font-medium">
          {["VIV", "NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white transition duration-200 hover:text-amber-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://viv-test.vercel.app/"
            className="text-white transition duration-200 hover:text-amber-300"
          >
            DOCS
          </a>
          <a
            href="https://chat.cosinv.com/dashboard"
            className="text-white transition duration-200 hover:text-amber-300"
          >
            API
          </a>
        </div>

        {/* Try VIV AI Button */}
        <div className="hidden md:flex">
          <Link to="https://chat.cosinv.com/">
            <button className="text-white cursor-pointer px-4 py-2 rounded-full border border-white transition hover:bg-white hover:text-black font-semibold">
              Try VIV AI
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
          {["VIV", "NEWS", "CAREER"].map((item) => (
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
          <a
            href="https://chat.cosinv.com/dashboard"
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
              <div
                key={benefit.title}
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
      <footer className="bg-[#0A0A0C] backdrop-blur-sm flex justify-center">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                  VIV
                </div>
                <span className="text-white">COSINV AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Streamline your workflow with our all-in-one SaaS platform.
                Boost productivity and scale your business.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center pt-8">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} COSINV. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// News Component
const News = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const footerSections = [
    { title: "TRY VIV ON", links: ["Web", "Android", "IOS"] },
    { title: "PRODUCTS", links: ["API", "PlayGround"] },
    { title: "COMPANY", links: ["Career", "News"] },
    {
      title: "RESOURCES",
      links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"],
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden text-white bg-[#0A0A0C]">
      {/* Header */}
      <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img className="mr-4" src="./viv.png" width={85} alt="Logo" />
          </Link>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex space-x-8 tracking-wide items-center text-sm font-medium">
          {["VIV", "NEWS", "CAREER"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white transition duration-200 hover:text-amber-300"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://viv-test.vercel.app/"
            className="text-white transition duration-200 hover:text-amber-300"
          >
            DOCS
          </a>
          <a
            href="https://chat.cosinv.com/dashboard"
            className="text-white transition duration-200 hover:text-amber-300"
          >
            API
          </a>
        </div>

        {/* Try VIV AI Button */}
        <div className="hidden md:flex">
          <Link to="https://chat.cosinv.com/">
            <button className="text-white cursor-pointer px-4 py-2 rounded-full border border-white transition hover:bg-white hover:text-black font-semibold">
              Try VIV AI
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
          <a
            href="https://chat.cosinv.com/dashboard"
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
      <footer className="bg-[#0A0A0C] backdrop-blur-sm flex justify-center">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                  VIV
                </div>
                <span className="text-white">COSINV AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Streamline your workflow with our all-in-one SaaS platform.
                Boost productivity and scale your business.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center pt-8">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} COSINV. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
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
    {
      title: "RESOURCES",
      links: ["Documentation", "Privacy Policy", "Legal", "Security", "Status"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with real-time data visualization and reporting.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with integrated communication tools.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Enterprise Security",
      description:
        "Keep your data safe with end-to-end encryption and compliance features.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools through our extensive API ecosystem.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team.",
      icon: <Star className="size-5" />,
    },
  ];

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative w-full overflow-x-hidden text-white bg-[#07080A]">
              {/* SPLINE BACKGROUND SECTION */}
              <div className="relative w-full h-screen">
                {/* <Spline
                  scene="https://prod.spline.design/lq9VhNcDjdCW-zwT/scene.splinecode"
                  // scene="https://prod.spline.design/8q5ksF9IUhDxIS00/scene.splinecode"
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                /> */}

                {/* Navbar and Chat UI */}
                <div className="relative z-40 flex flex-col h-full">
                  {/* Navbar */}
                  <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                      <Link to="/">
                        <img
                          className="mr-4"
                          src="./v.jpg"
                          width={85}
                          alt="Logo"
                        />
                      </Link>
                    </div>

                    {/* Center Nav Links */}
                    <div className="hidden md:flex space-x-8 tracking-wide items-center text-sm font-medium">
                      {["VIV", "NEWS", "CAREER"].map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase()}`}
                          className="text-white transition duration-200 hover:text-amber-300"
                        >
                          {item}
                        </Link>
                      ))}
                      <a
                        href="https://viv-test.vercel.app/"
                        className="text-white transition duration-200 hover:text-amber-300"
                      >
                        DOCS
                      </a>
                      <a
                        href="https://chat.cosinv.com/dashboard"
                        className="text-white transition duration-200 hover:text-amber-300"
                      >
                        API
                      </a>
                    </div>

                    {/* Try VIV AI Button */}
                    <div className="hidden md:flex">
                      <Link to="https://chat.cosinv.com/">
                        <button className="text-white cursor-pointer px-4 py-2 rounded-full border border-white transition hover:bg-white hover:text-black font-semibold">
                          Try VIV AI
                        </button>
                      </Link>
                    </div>

                    {/* Mobile Menu Button */}
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

                  {/* Mobile Sidebar Overlay */}
                  <div
                    className={`fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden transition-all ${
                      isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={toggleMenu}
                  ></div>

                  {/* Mobile Sidebar */}
                  <div
                    className={`fixed right-0 top-0 z-40 bg-[#07080A] w-[250px] h-full transform transition-transform duration-300 ${
                      isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                    <div className="flex flex-col items-start p-6 space-y-4">
                      {["VIV", "NEWS", "CAREER"].map((item) => (
                        <Link
                          key={item}
                          to={`/${item.toLowerCase()}`}
                          className="text-white text-lg hover:text-amber-300"
                        >
                          {item}
                        </Link>
                      ))}
                      <a
                        href="https://viv-test.vercel.app/"
                        className="text-white text-lg hover:text-amber-300"
                      >
                        DOCS
                      </a>
                      <a
                        href="https://chat.cosinv.com/dashboard"
                        className="text-white text-lg hover:text-amber-300"
                      >
                        API
                      </a>
                      <Link to="https://chat.cosinv.com/">
                        <button className="text-white px-4 py-2 rounded-full border transition hover:bg-white hover:text-black font-semibold cursor-pointer">
                          Try VIV AI
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Chat UI */}
                  <div className="absolute bottom-30 p-4 w-full flex justify-center z-30">
                    <AnimatedAIChat />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <section
                id="features"
                className="w-full py-20 md:py-15 flex justify-center"
              >
                <div className="container px-4 md:px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                  >
                    <Badge
                      className="rounded-full px-8 py-3 text-md font-medium"
                      variant="secondary"
                    >
                      Features
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                      Everything You Need to Succeed
                    </h2>
                    <p className="max-w-[800px] text-gray-400 md:text-lg">
                      Our comprehensive platform provides all the tools you need
                      to streamline your workflow, boost productivity, and
                      achieve your goals.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {features.map((feature, i) => (
                      <motion.div key={i} variants={item}>
                        <Card className=" text-white h-full overflow-hidden border-[#272727] bg-[#070707] backdrop-blur transition-all hover:shadow-md">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-white mb-4">
                              {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-400">
                              {feature.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Products Section */}
              <section
                id="products"
                className="w-full py-20 md:py-32 bg-[#07080A] relative overflow-hidden flex justify-center"
              >
                <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

                <div className="container px-4 md:px-6 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                  >
                    <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-white text-black">
                      Products
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      Our Innovative Solutions
                    </h2>
                    <p className="max-w-[800px] text-gray-400 md:text-lg">
                      Explore our cutting-edge products designed to empower your
                      business.
                    </p>
                  </motion.div>

                  <div className="mx-auto max-w-5xl">
                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                      {[
                        {
                          title: "API",
                          subtitle: "Smart Surveillance",
                          features: [
                            "AI-powered detection",
                            "Low latency video analytics",
                            "Cloud/Edge compatible",
                          ],
                          cta: "Learn More",
                        },
                        {
                          title: "DOCS",
                          subtitle: "Enterprise Assistant",
                          features: [
                            "Custom-trained chatbots",
                            "Multi-language NLP",
                            "Seamless integrations",
                          ],
                          cta: "Learn More",
                          popular: true,
                        },
                        {
                          title: "ViV AI",
                          subtitle: "Predictive Security",
                          features: [
                            "Threat detection AI",
                            "Behavior analytics",
                            "Automated response",
                          ],
                          cta: "Learn More",
                        },
                      ].map((product, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                          <Card
                            className={`relative overflow-hidden h-full ${
                              product.popular
                                ? "border-[#272727] shadow-lg"
                                : "border-[#272727] shadow-md"
                            } bg-[#070707]`}
                          >
                            <CardContent className="p-6 flex flex-col h-full">
                              <h3 className="text-2xl font-bold text-white">
                                {product.title}
                              </h3>
                              <p className="text-xl font-semibold text-white mt-2">
                                {product.subtitle}
                              </p>
                              <ul className="space-y-3 my-6 flex-grow">
                                {product.features.map((feature, j) => (
                                  <li key={j} className="flex items-center">
                                    <Check className="mr-2 size-4 text-blue-500" />
                                    <span className="text-gray-300">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Button
                                className={`w-full mt-auto rounded-full bg-white text-black cursor-pointer`}
                              >
                                {product.cta}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Pricing Section */}
              <section
                id="pricing"
                className="w-full py-20 md:py-20 bg-[#07080A] relative overflow-hidden flex justify-center"
              >
                <div className="absolute inset-0 -z-10 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

                <div className="container px-4 md:px-6 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                  >
                    <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-white text-black">
                      Pricing
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      Simple, Transparent Pricing
                    </h2>
                    <p className="max-w-[800px] text-gray-400 md:text-lg">
                      Choose the plan that's right for your business. All plans
                      include a 14-day free trial.
                    </p>
                  </motion.div>

                  <div className="mx-auto max-w-5xl">
                    <Tabs defaultValue="monthly" className="w-full">
                      <div className="flex justify-center mb-8">
                        <TabsList className="rounded-full p-1 bg-gray-800">
                          <TabsTrigger
                            value="monthly"
                            className="rounded-full px-6 text-gray-200 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                          >
                            Monthly
                          </TabsTrigger>
                          <TabsTrigger
                            value="annually"
                            className="rounded-full px-6 text-gray-200 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                          >
                            Annually (Save 20%)
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="monthly">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                          {[
                            {
                              name: "Starter",
                              price: "$29",
                              description:
                                "Perfect for small teams and startups.",
                              features: [
                                "Up to 5 team members",
                                "Basic analytics",
                                "5GB storage",
                                "Email support",
                              ],
                              cta: "Start Free Trial",
                            },
                            {
                              name: "Professional",
                              price: "$79",
                              description: "Ideal for growing businesses.",
                              features: [
                                "Up to 20 team members",
                                "Advanced analytics",
                                "25GB storage",
                                "Priority email support",
                                "API access",
                              ],
                              cta: "Start Free Trial",
                              popular: true,
                            },
                            {
                              name: "Enterprise",
                              price: "$199",
                              description:
                                "For large organizations with complex needs.",
                              features: [
                                "Unlimited team members",
                                "Custom analytics",
                                "Unlimited storage",
                                "24/7 phone & email support",
                                "Advanced API access",
                                "Custom integrations",
                              ],
                              cta: "Contact Sales",
                            },
                          ].map((plan, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <Card
                                className={`relative overflow-hidden h-full ${
                                  plan.popular
                                    ? "border-gray-700 shadow-lg"
                                    : "border-gray-700 shadow-md"
                                } bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur`}
                              >
                                <CardContent className="p-6 flex flex-col h-full">
                                  <h3 className="text-2xl font-bold text-white">
                                    {plan.name}
                                  </h3>
                                  <div className="flex items-baseline mt-4">
                                    <span className="text-4xl font-bold text-white">
                                      {plan.price}
                                    </span>
                                    <span className="text-gray-400 ml-1">
                                      /month
                                    </span>
                                  </div>
                                  <p className="text-gray-400 mt-2">
                                    {plan.description}
                                  </p>
                                  <ul className="space-y-3 my-6 flex-grow">
                                    {plan.features.map((feature, j) => (
                                      <li key={j} className="flex items-center">
                                        <Check className="mr-2 size-4 text-blue-500" />
                                        <span className="text-gray-300">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                  <Button
                                    className={`w-full mt-auto rounded-full ${
                                      plan.popular
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-700 hover:bg-gray-600"
                                    } text-white`}
                                    variant={
                                      plan.popular ? "default" : "outline"
                                    }
                                  >
                                    {plan.cta}
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="annually">
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                          {[
                            {
                              name: "Starter",
                              price: "$23",
                              description:
                                "Perfect for small teams and startups.",
                              features: [
                                "Up to 5 team members",
                                "Basic analytics",
                                "5GB storage",
                                "Email support",
                              ],
                              cta: "Start Free Trial",
                            },
                            {
                              name: "Professional",
                              price: "$63",
                              description: "Ideal for growing businesses.",
                              features: [
                                "Up to 20 team members",
                                "Advanced analytics",
                                "25GB storage",
                                "Priority email support",
                                "API access",
                              ],
                              cta: "Start Free Trial",
                              popular: true,
                            },
                            {
                              name: "Enterprise",
                              price: "$159",
                              description:
                                "For large organizations with complex needs.",
                              features: [
                                "Unlimited team members",
                                "Custom analytics",
                                "Unlimited storage",
                                "24/7 phone & email support",
                                "Advanced API access",
                                "Custom integrations",
                              ],
                              cta: "Contact Sales",
                            },
                          ].map((plan, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                              <Card
                                className={`relative overflow-hidden h-full ${
                                  plan.popular
                                    ? "border-gray-700 shadow-lg"
                                    : "border-gray-700 shadow-md"
                                } bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur`}
                              >
                                <CardContent className="p-6 flex flex-col h-full">
                                  <h3 className="text-2xl font-bold text-white">
                                    {plan.name}
                                  </h3>
                                  <div className="flex items-baseline mt-4">
                                    <span className="text-4xl font-bold text-white">
                                      {plan.price}
                                    </span>
                                    <span className="text-gray-400 ml-1">
                                      /month
                                    </span>
                                  </div>
                                  <p className="text-gray-400 mt-2">
                                    {plan.description}
                                  </p>
                                  <ul className="space-y-3 my-6 flex-grow">
                                    {plan.features.map((feature, j) => (
                                      <li key={j} className="flex items-center">
                                        <Check className="mr-2 size-4 text-blue-500" />
                                        <span className="text-gray-300">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                  <Button
                                    className={`w-full mt-auto rounded-full ${
                                      plan.popular
                                        ? "bg-blue-600 hover:bg-blue-700"
                                        : "bg-gray-700 hover:bg-gray-600"
                                    } text-white`}
                                    variant={
                                      plan.popular ? "default" : "outline"
                                    }
                                  >
                                    {plan.cta}
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-[#07080A] backdrop-blur-sm flex justify-center">
                <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
                  <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-bold">
                        <div className="size-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                          VIV
                        </div>
                        <span className="text-white">COSINV AI</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Streamline your workflow with our all-in-one SaaS
                        platform. Boost productivity and scale your business.
                      </p>
                      <div className="flex gap-4">
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                          <span className="sr-only">Facebook</span>
                        </Link>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                          <span className="sr-only">Twitter</span>
                        </Link>
                        <Link
                          href="#"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-5"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white">Product</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link
                            href="#features"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Features
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#pricing"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Pricing
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Integrations
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            API
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white">
                        Resources
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Documentation
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Guides
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Support
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-white">Company</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            Terms of Service
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row justify-between items-center pt-8">
                    <p className="text-xs text-gray-400">
                      © {new Date().getFullYear()} COSINV. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="#"
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="#"
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Cookie Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          }
        />
        <Route path="/career" element={<Career />} />
        <Route path="/news" element={<News />} />
        <Route
          path="*"
          element={
            <div className="relative w-full overflow-x-hidden text-white bg-[#0A0A0C]">
              {/* Navbar */}
              <nav className="w-full px-4 py-5 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                  <Link to="/">
                    <img
                      className="mr-4"
                      src="./viv.png"
                      width={85}
                      alt="Logo"
                    />
                  </Link>
                </div>

                {/* Center Nav Links */}
                <div className="hidden md:flex space-x-8 tracking-wide items-center text-sm font-medium">
                  {["VIV", "NEWS", "CAREER"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="text-white transition duration-200 hover:text-amber-300"
                    >
                      {item}
                    </Link>
                  ))}
                  <a
                    href="https://viv-test.vercel.app/"
                    className="text-white transition duration-200 hover:text-amber-300"
                  >
                    DOCS
                  </a>
                  <a
                    href="https://chat.cosinv.com/dashboard"
                    className="text-white transition duration-200 hover:text-amber-300"
                  >
                    API
                  </a>
                </div>

                {/* Try VIV AI Button */}
                <div className="hidden md:flex">
                  <Link to="https://chat.cosinv.com/">
                    <button className="text-white cursor-pointer px-4 py-2 rounded-full border border-white transition hover:bg-white hover:text-black font-semibold">
                      Try VIV AI
                    </button>
                  </Link>
                </div>

                {/* Mobile Menu Button */}
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
                className={`fixed inset-0 bg-[#0A0A0C] bg-opacity-70 z-40 md:hidden transition-all ${
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
                  {["VIV", "NEWS", "CAREER"].map((item) => (
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
                  <a
                    href="https://chat.cosinv.com/dashboard"
                    className="text-white hover:text-gray-300 text-sm sm:text-xl"
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

              {/* 404 Page with Lottie Animation */}
              <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-24 sm:py-32 bg-[#0A0A0C]">
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
