import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Menu, X } from "lucide-react";
import image from "../Assets/codingTerminalLogo.jpeg";

const LOGO_URL = image;

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Topic-Wise DSA" },
  { to: "/100days", label: "100 Days Challenge" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={LOGO_URL}
            alt="Coding Terminal"
            className="w-10 h-10 rounded-full border border-indigo-500/50"
          />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Coding Terminal
          </span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://youtube.com/@CodingTerminal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-bold transition-all ml-3"
          >
            <Youtube size={18} /> Subscribe
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href="https://youtube.com/@CodingTerminal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl text-sm font-bold transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <Youtube size={18} /> Subscribe on YouTube
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;