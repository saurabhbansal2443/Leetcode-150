import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import image from "../Assets/codingTerminalLogo.jpeg";
import {
  Youtube,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Target,
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const LOGO_URL = image;

const StudentForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    college: "",
    branch: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxr50GtbIX4qAM40Rls1Y3oE-dzlWHAxWmkEbpGuKCvk9JuEEx6CoPg-CKWisEgHblpIg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      toast.success("Successfully Registered! Check your email soon. 🎉");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        college: "",
        branch: "",
      });
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Toaster position="top-center" />

      {/* Navbar with subtle drop-in */}
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
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-bold transition-all"
          >
            <Youtube size={18} /> Subscribe
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-4">
        {/* Breathing Background Glow */}
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Batch Starting Soon
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]"
          >
            Master the <span className="text-indigo-500">Top 150</span> <br />
            LeetCode Interview Set
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Stop wandering. Start solving. Join the 150-day structured roadmap
            to crack MAANG interviews with daily guidance.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#register"
              className="px-8 py-4 bg-indigo-600 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              Join the Challenge <ChevronRight size={20} />
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#challenge"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              View List <ExternalLink size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </header>

      {/* Value Propositions */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: <BookOpen className="text-indigo-400" />,
            title: "Structured Learning",
            desc: "No more random problems. We follow the official Top 150 list.",
          },
          {
            icon: <Youtube className="text-red-500" />,
            title: "Video Solutions",
            desc: "Daily detailed breakdowns of every logic and edge case on YouTube.",
          },
          {
            icon: <Target className="text-emerald-400" />,
            title: "Progress Tracking",
            desc: "Submit your details to get our custom progress tracking sheet.",
          },
        ].map((item, i) => (
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, borderColor: "rgba(99, 102, 241, 0.5)" }}
            key={i}
            className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 transition-all cursor-default"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Registration Section */}
      <section id="register" className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-indigo-600/10 to-transparent rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side: Motivation */}
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <motion.h2
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                className="text-3xl font-bold mb-6"
              >
                Commit to 150 Days of Consistency.
              </motion.h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Get the exclusive DSA Roadmap PDF.",
                  "Personalized updates on new video uploads.",
                  "Join our community of 10k+ learners.",
                ].map((text, idx) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    key={idx}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="mt-1 bg-indigo-500/20 p-1 rounded-full">
                      <Award size={16} className="text-indigo-400" />
                    </div>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Side: Form */}
            <div className="p-6 lg:p-12 bg-white/5 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input fields with focus animations */}
                {[
                  {
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    placeholder: "Enter your name",
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    placeholder: "name@example.com",
                  },
                  {
                    label: "WhatsApp Number",
                    name: "phoneNumber",
                    type: "tel",
                    placeholder: "+91 XXXXX XXXXX",
                  },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    variants={fadeInUp}
                    className="space-y-1"
                  >
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all focus:border-indigo-500"
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      value={formData[field.name]}
                    />
                  </motion.div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      College
                    </label>
                    <input
                      name="college"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="University"
                      onChange={handleChange}
                      value={formData.college}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Branch
                    </label>
                    <input
                      name="branch"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="CSE / IT"
                      onChange={handleChange}
                      value={formData.branch}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 mt-4 shadow-xl"
                >
                  {loading ? "Registering..." : "Start My Journey"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-gray-500">Don't forget to follow the series on</p>
          <motion.a
            whileHover={{ scale: 1.1, color: "#ef4444" }}
            href="https://youtube.com/@CodingTerminal"
            className="inline-flex items-center gap-2 text-2xl font-bold transition-colors"
          >
            <Youtube size={32} className="text-red-600" /> Coding Terminal
          </motion.a>
        </motion.div>
      </footer>
    </div>
  );
};

export default StudentForm;
