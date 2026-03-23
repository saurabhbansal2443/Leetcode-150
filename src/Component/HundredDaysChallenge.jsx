import React, { useState, useEffect, useMemo } from "react";
import hundredDaysData, { topicsList, topicColors } from "../HundredDaysData";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Code2,
  Youtube,
  Trophy,
  Flame,
  Search,
  FileText,
  Filter,
  X,
  Code
} from "lucide-react";
import solutionsData from "../HundredDaysSolutions.json";

const HundredDaysChallenge = () => {
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem("hundred_days_progress");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeSolutionDay, setActiveSolutionDay] = useState(null);
  const [activeLang, setActiveLang] = useState("java");

  useEffect(() => {
    localStorage.setItem("hundred_days_progress", JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleComplete = (day) => {
    const isMarkingDone = !completedDays.includes(day);
    if (isMarkingDone) {
      setCompletedDays([...completedDays, day]);
      toast.dismiss();
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-[#12121a] border border-emerald-500/50 p-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="bg-emerald-500/20 p-2 rounded-xl">
              <Trophy className="text-emerald-400" size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Day {day} Cleared!</p>
              <p className="text-gray-400 text-xs">
                {hundredDaysData.length - completedDays.length - 1} days remaining. Keep it up! 🔥
              </p>
            </div>
          </motion.div>
        ),
        { duration: 1500 }
      );
    } else {
      setCompletedDays(completedDays.filter((d) => d !== day));
    }
  };

  const filteredData = useMemo(() => {
    return hundredDaysData.filter((q) => {
      const matchesSearch = q.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopic = activeTopic === "All" || q.topic === activeTopic;
      return matchesSearch && matchesTopic;
    });
  }, [searchQuery, activeTopic]);

  const topicCounts = useMemo(() => {
    const counts = {};
    hundredDaysData.forEach((q) => {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
    counts["All"] = hundredDaysData.length;
    return counts;
  }, []);

  const topicCompletedCounts = useMemo(() => {
    const counts = {};
    hundredDaysData.forEach((q) => {
      if (completedDays.includes(q.day)) {
        counts[q.topic] = (counts[q.topic] || 0) + 1;
      }
    });
    counts["All"] = completedDays.length;
    return counts;
  }, [completedDays]);

  const progressPercentage = Math.round(
    (completedDays.length / hundredDaysData.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c] pb-20 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/30">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto pt-12 mb-12 text-center"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          100 Days LeetCode Challenge
        </motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          100 Days of{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
            LeetCode
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Solve one problem daily for 100 days. Track your progress with code solutions
          &amp; video tutorials from edSlash.
        </p>
      </motion.div>

      {/* Progress Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700" />

            <div className="z-10">
              <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-2 block">
                Challenge Progress
              </span>
              <h2 className="text-4xl font-black text-white mb-6">
                100 Days <span className="text-emerald-500">Journey</span>
              </h2>

              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Completed</p>
                  <p className="text-2xl font-black text-white">{completedDays.length}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Remaining</p>
                  <p className="text-2xl font-black text-gray-400">{hundredDaysData.length - completedDays.length}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Total Days</p>
                  <p className="text-2xl font-black text-gray-400">{hundredDaysData.length}</p>
                </div>
              </div>
            </div>

            <div className="relative w-44 h-44 flex items-center justify-center bg-black/40 rounded-full border border-white/5 shadow-inner">
              <svg className="h-36 w-36 transform -rotate-90">
                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                <motion.circle
                  cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="10" fill="transparent"
                  strokeDasharray={402}
                  initial={{ strokeDashoffset: 402 }}
                  animate={{ strokeDashoffset: 402 - (402 * progressPercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-emerald-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{progressPercentage}%</span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase mt-1 tracking-widest">Complete</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0e0e12] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Flame className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Daily Streak</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              One problem a day keeps the interview anxiety away! Stay consistent.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Topic Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="max-w-6xl mx-auto mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-500" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Filter by Topic</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {topicsList.map((topic) => {
            const isActive = activeTopic === topic;
            const colors = topic !== "All" ? topicColors[topic] : null;
            const count = topicCounts[topic] || 0;
            const completed = topicCompletedCounts[topic] || 0;

            return (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? topic === "All"
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : `${colors.activeBg} text-white border-transparent shadow-[0_0_20px_rgba(0,0,0,0.3)]`
                    : topic === "All"
                    ? "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                    : `${colors.bg} ${colors.text} ${colors.border} hover:brightness-125`
                }`}
              >
                {topic !== "All" && (
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : colors.dot}`} />
                )}
                {topic}
                <span className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-gray-500"
                }`}>
                  {completed}/{count}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-gray-600 text-white"
          />
          {(activeTopic !== "All" || searchQuery) && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-bold">
              {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </motion.div>

      {/* Questions Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredData.map((q) => {
            const isDone = completedDays.includes(q.day);
            const tc = topicColors[q.topic];
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={q.day}
                className={`group relative rounded-3xl border transition-all duration-500 ${
                  isDone
                    ? "bg-emerald-500/5 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                    : "bg-[#0d0d10] border-white/5 hover:border-white/20"
                }`}
              >
                <div className="p-7">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${
                          isDone ? "bg-emerald-500 text-white" : "bg-white/5 text-gray-500"
                        }`}
                      >
                        DAY {q.day}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleComplete(q.day)}
                      className={`transform transition-all duration-300 hover:scale-110 ${
                        isDone ? "text-emerald-400" : "text-gray-700 hover:text-gray-400"
                      }`}
                    >
                      <CheckCircle size={28} strokeWidth={isDone ? 2.5 : 1.5} />
                    </button>
                  </div>

                  {/* Topic Badge */}
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg mb-4 border ${tc.bg} ${tc.text} ${tc.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${tc.dot}`} />
                    {q.topic}
                  </span>

                  <h3
                    className={`text-lg font-bold mb-6 transition-all duration-500 leading-tight ${
                      isDone ? "text-gray-500 line-through opacity-60" : "text-gray-100"
                    }`}
                  >
                    {q.name}
                  </h3>

                  <div className="space-y-3">
                    <a
                      href={q.leetcode}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-orange-500/5 text-orange-400 border border-orange-500/10 hover:bg-orange-500 hover:text-white transition-all font-bold text-xs uppercase tracking-wider"
                    >
                      <span className="flex items-center gap-2">
                        <Code2 size={16} /> Open LeetCode
                      </span>
                      <ExternalLink size={14} />
                    </a>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={q.video || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-black text-[10px] uppercase transition-all ${
                          q.video
                            ? "bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white"
                            : "bg-white/5 text-gray-700 border border-white/5 pointer-events-none"
                        }`}
                      >
                        <Youtube size={16} /> Tutorial
                      </a>
                      <button
                        onClick={() => {
                          if (q.codeSolution && solutionsData[q.day]) {
                            setActiveSolutionDay(q.day);
                            setActiveLang(solutionsData[q.day]?.java ? 'java' : 'python');
                          } else if (q.codeSolution) {
                            window.open(q.codeSolution, "_blank");
                          }
                        }}
                        className={`flex items-center justify-center gap-2 p-3 w-full rounded-2xl font-black text-[10px] uppercase transition-all border ${
                          q.codeSolution
                            ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white cursor-pointer"
                            : "border-white/5 text-gray-700 bg-white/5 pointer-events-none"
                        }`}
                      >
                        <FileText size={16} /> Solution
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto text-center py-20"
        >
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">No problems found</h3>
          <p className="text-gray-600 text-sm">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Code Modal */}
      <AnimatePresence>
        {activeSolutionDay && solutionsData[activeSolutionDay] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0e0e12] border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#14141a]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Code size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Day {activeSolutionDay} Solution</h3>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      {hundredDaysData.find(q => q.day === activeSolutionDay)?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSolutionDay(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Language Tabs */}
              <div className="flex px-6 pt-4 gap-4 bg-[#0e0e12] border-b border-white/5">
                {solutionsData[activeSolutionDay]?.java && (
                  <button
                    onClick={() => setActiveLang('java')}
                    className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                      activeLang === 'java'
                        ? 'text-emerald-400 border-emerald-500'
                        : 'text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    Java
                  </button>
                )}
                {solutionsData[activeSolutionDay]?.python && (
                  <button
                    onClick={() => setActiveLang('python')}
                    className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                      activeLang === 'python'
                        ? 'text-blue-400 border-blue-500'
                        : 'text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    Python
                  </button>
                )}
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-y-auto bg-[#0a0a0c] flex-1">
                <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                  <code>
                    {solutionsData[activeSolutionDay]?.[activeLang] || "// Solution not available in this language."}
                  </code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HundredDaysChallenge;
