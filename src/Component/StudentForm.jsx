import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Youtube, ChevronRight, Award, BookOpen, Target } from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

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
        },
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

      {/* Hero Section */}
      <header className="relative pt-16 pb-8 px-4">
        {/* Animated Background Glow */}
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/30 blur-[140px] rounded-full -z-10"
        />

        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Batch Starting Soon
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-black mb-6 leading-[1.05] tracking-tight"
          >
            Master the <span className="text-indigo-500">Top 150</span> <br />{" "}
            LeetCode Set
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Stop wandering. Start solving. Join the 150-day structured roadmap
            to crack MAANG interviews with daily guidance.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.a
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 30px rgba(79, 70, 229, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              href="#register"
              className="px-10 py-5 bg-indigo-600 rounded-2xl font-bold transition-all flex items-center gap-3 w-fit mx-auto group"
            >
              Join the Challenge
              <ChevronRight
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </header>

      {/* Value Propositions */}
      <motion.section
        initial="initial"
        whileInView="whileInView"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 pt-12  grid md:grid-cols-3 gap-8"
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
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 transition-colors hover:border-indigo-500/40 group"
          >
            <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Registration Section */}
      <section id="register" className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-600/20 via-transparent to-transparent rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold mb-8"
              >
                Commit to 150 Days.
              </motion.h2>
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                className="space-y-6"
              >
                {[
                  "Get the exclusive DSA Roadmap PDF.",
                  "Personalized updates on uploads.",
                  "Join our community of 10k+ learners.",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    variants={fadeInUp}
                    className="flex items-center gap-4 text-gray-300 text-lg"
                  >
                    <div className="p-1 bg-indigo-500/20 rounded-full">
                      <Award size={20} className="text-indigo-400" />
                    </div>
                    {text}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="p-8 lg:p-14 bg-white/[0.02] border-l border-white/5">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input Fields */}
                {[
                  { id: "name", label: "Full Name", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                  { id: "phoneNumber", label: "WhatsApp Number", type: "tel" },
                ].map((field) => (
                  <motion.div key={field.id} variants={fadeInUp}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">
                      {field.label}
                    </label>
                    <input
                      name={field.id}
                      type={field.type}
                      required
                      placeholder={`Your ${field.id}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600"
                      onChange={handleChange}
                      value={formData[field.id]}
                    />
                  </motion.div>
                ))}

                <div className="grid grid-cols-2 gap-5">
                  <motion.div variants={fadeInUp}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">
                      College
                    </label>
                    <input
                      name="college"
                      required
                      placeholder="University"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                      onChange={handleChange}
                      value={formData.college}
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] ml-1 mb-2 block">
                      Branch
                    </label>
                    <input
                      name="branch"
                      required
                      placeholder="e.g. CSE"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-600"
                      onChange={handleChange}
                      value={formData.branch}
                    />
                  </motion.div>
                </div>

                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all disabled:opacity-50 mt-6 shadow-2xl text-lg"
                >
                  {loading ? "Processing..." : "Start My Journey"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-24 px-4">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
        >
          <p className="text-gray-500 mb-6 font-medium">
            Don't forget to follow the series on
          </p>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://youtube.com/@CodingTerminal"
            className="inline-flex items-center gap-3 text-3xl font-black transition-colors hover:text-red-500"
          >
            <Youtube size={40} className="text-red-600" /> Coding Terminal
          </motion.a>
        </motion.div>
      </footer>
    </div>
  );
};

export default StudentForm;
