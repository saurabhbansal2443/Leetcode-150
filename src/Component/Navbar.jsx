import React from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import image from "../Assets/codingTerminalLogo.jpeg";

const LOGO_URL = image;

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={LOGO_URL}
            alt="Coding Terminal"
            className="w-10 h-10 rounded-full border border-indigo-500/50"
          />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Coding Terminal
          </span>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://youtube.com/@CodingTerminal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-bold transition-all"
        >
          <Youtube size={18} /> Subscribe
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;