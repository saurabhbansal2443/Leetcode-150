import React, { useState, useEffect, useMemo } from "react";
import { topicWiseData, theoryNotes } from "../TopicWiseData";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Github,
  ExternalLink,
  FileText,
  BookOpen,
  Trophy,
  Flame,
  Search,
  ChevronDown,
  ChevronUp,
  Circle,
  X,
} from "lucide-react";

// Simple markdown-like renderer for theory content
const RenderContent = ({ text }) => {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeKey = 0;

  lines.forEach((line, i) => {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${codeKey++}`} className="bg-black/60 border border-white/10 rounded-xl p-4 my-3 overflow-x-auto text-sm font-mono text-emerald-400">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      return;
    }
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="border-white/10 my-4" />);
      return;
    }
    // Bold markdown: **text**
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={j} className="bg-white/10 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
      }
      return <span key={j}>{part}</span>;
    });
    if (line.startsWith("- ")) {
      elements.push(<li key={i} className="text-gray-300 text-sm ml-4 list-disc leading-relaxed">{rendered}</li>);
    } else {
      elements.push(<p key={i} className="text-gray-300 text-sm leading-relaxed">{rendered}</p>);
    }
  });
  return <div className="space-y-1">{elements}</div>;
};

const categoryColors = {
  Beginner: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    solid: "bg-emerald-500",
  },
  Intermediate: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    solid: "bg-amber-500",
  },
  Advanced: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    solid: "bg-rose-500",
  },
};

const TopicWiseSolutions = () => {
  // Per-question progress: { "topicId-qid": true }
  const [questionProgress, setQuestionProgress] = useState(() => {
    const saved = localStorage.getItem("topicwise_question_progress");
    return saved ? JSON.parse(saved) : {};
  });
  const [theoryCompletedIds, setTheoryCompletedIds] = useState(() => {
    const saved = localStorage.getItem("theory_progress");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedTopics, setExpandedTopics] = useState({});
  const [showTheory, setShowTheory] = useState(false);
  const [expandedTheory, setExpandedTheory] = useState({});

  const toggleTheoryExpand = (id) => {
    setExpandedTheory((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    localStorage.setItem(
      "topicwise_question_progress",
      JSON.stringify(questionProgress),
    );
  }, [questionProgress]);

  useEffect(() => {
    localStorage.setItem("theory_progress", JSON.stringify(theoryCompletedIds));
  }, [theoryCompletedIds]);

  const toggleQuestionComplete = (topicId, qid) => {
    const key = `${topicId}-${qid}`;
    const newProgress = { ...questionProgress };
    if (newProgress[key]) {
      delete newProgress[key];
    } else {
      newProgress[key] = true;
      toast.dismiss();
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-[#12121a] border border-indigo-500/50 p-4 rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.3)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="bg-indigo-500/20 p-2 rounded-xl">
              <Trophy className="text-indigo-400" size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Question Solved!</p>
              <p className="text-gray-400 text-xs">
                Keep the momentum going! 🔥
              </p>
            </div>
          </motion.div>
        ),
        { duration: 1500 },
      );
    }
    setQuestionProgress(newProgress);
  };

  const toggleTopicExpand = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const toggleTheoryComplete = (id) => {
    if (theoryCompletedIds.includes(id)) {
      setTheoryCompletedIds(theoryCompletedIds.filter((item) => item !== id));
    } else {
      setTheoryCompletedIds([...theoryCompletedIds, id]);
    }
  };

  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredTopics = topicWiseData.filter((topic) => {
    const matchesSearch = topic.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || topic.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate total questions and completed
  const totalQuestions = useMemo(
    () =>
      topicWiseData.reduce(
        (sum, topic) => sum + (topic.questions?.length || 0),
        0,
      ),
    [],
  );

  const completedQuestions = useMemo(
    () => Object.keys(questionProgress).length,
    [questionProgress],
  );

  const progressPercentage = totalQuestions
    ? Math.round((completedQuestions / totalQuestions) * 100)
    : 0;

  const getTopicProgress = (topic) => {
    if (!topic.questions || topic.questions.length === 0) return 0;
    const completed = topic.questions.filter(
      (q) => questionProgress[`${topic.id}-${q.qid}`],
    ).length;
    return Math.round((completed / topic.questions.length) * 100);
  };

  const getTopicCompletedCount = (topic) => {
    if (!topic.questions) return 0;
    return topic.questions.filter(
      (q) => questionProgress[`${topic.id}-${q.qid}`],
    ).length;
  };

  const theoryProgressPercentage = Math.round(
    (theoryCompletedIds.length / theoryNotes.length) * 100,
  );

  return (
    <div className="min-h-screen bg-[#0a0a0c] pb-20 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Topic-Wise DSA Practice
        </motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          Master DSA{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Topic by Topic
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {totalQuestions} assignment questions across {topicWiseData.length}{" "}
          topics — track every single question you solve.
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
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700" />

            <div className="z-10">
              <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2 block">
                Questions Progress
              </span>
              <h2 className="text-4xl font-black text-white mb-6">
                DSA <span className="text-indigo-500">Mastery</span>
              </h2>

              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Solved
                  </p>
                  <p className="text-2xl font-black text-white">
                    {completedQuestions}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-black text-gray-400">
                    {totalQuestions}
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                    Topics
                  </p>
                  <p className="text-2xl font-black text-gray-400">
                    {topicWiseData.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-44 h-44 flex items-center justify-center bg-black/40 rounded-full border border-white/5 shadow-inner">
              <svg className="h-36 w-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-white/5"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={402}
                  initial={{ strokeDashoffset: 402 }}
                  animate={{
                    strokeDashoffset: 402 - (402 * progressPercentage) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-indigo-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">
                  {progressPercentage}%
                </span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase mt-1 tracking-widest">
                  Complete
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0e0e12] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Flame className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Question Mastery
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Track every question across all topics. Expand any topic to see
              and mark individual questions!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-600 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === filter
                    ? "bg-indigo-500 text-white border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Topics List */}
      <div className="max-w-6xl mx-auto space-y-6 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredTopics.map((topic) => {
            const colors = categoryColors[topic.category];
            const topicProgress = getTopicProgress(topic);
            const completedCount = getTopicCompletedCount(topic);
            const isExpanded = expandedTopics[topic.id];
            const totalQ = topic.questions?.length || 0;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={topic.id}
                className={`group relative rounded-3xl border transition-all duration-500 ${
                  topicProgress === 100
                    ? "bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_40px_rgba(79,70,229,0.1)]"
                    : "bg-[#0d0d10] border-white/5 hover:border-white/20"
                }`}
              >
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopicExpand(topic.id)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-3xl flex-shrink-0">{topic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3
                          className={`text-xl font-bold transition-all leading-tight ${
                            topicProgress === 100
                              ? "text-gray-500 line-through opacity-60"
                              : "text-gray-100"
                          }`}
                        >
                          {topic.name}
                        </h3>
                        <span
                          className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                        >
                          {topic.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 sm:w-48 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${topicProgress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-500">
                          {completedCount}/{totalQ}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="hidden sm:flex gap-2">
                      {topic.assignmentLink && (
                        <a
                          href={topic.assignmentLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all"
                          title="Assignment Questions"
                        >
                          <FileText size={16} />
                        </a>
                      )}
                      {topic.githubLink && (
                        <a
                          href={topic.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                          title="GitHub Repository"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {topic.notesLink && (
                        <a
                          href={topic.notesLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all"
                          title="Notes"
                        >
                          <BookOpen size={16} />
                        </a>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" size={22} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={22} />
                    )}
                  </div>
                </button>

                {/* Mobile resource links */}
                <div className="sm:hidden flex gap-2 px-6 pb-3">
                  {topic.assignmentLink && (
                    <a
                      href={topic.assignmentLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase"
                    >
                      <FileText size={12} /> Doc
                    </a>
                  )}
                  {topic.githubLink && (
                    <a
                      href={topic.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 text-white border border-white/10 text-[10px] font-bold uppercase"
                    >
                      <Github size={12} /> Code
                    </a>
                  )}
                  {topic.notesLink && (
                    <a
                      href={topic.notesLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase"
                    >
                      <BookOpen size={12} /> Notes
                    </a>
                  )}
                </div>

                {/* Expanded Questions */}
                <AnimatePresence>
                  {isExpanded && topic.questions && topic.questions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 border-t border-white/5 pt-4">
                        <div className="space-y-1">
                          {topic.questions.map((q) => {
                            const isCompleted = questionProgress[`${topic.id}-${q.qid}`];
                            return (
                              <motion.div
                                key={q.qid}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: q.qid * 0.02 }}
                                className={`w-full flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 group/q cursor-pointer ${isCompleted ? "bg-indigo-500/5" : "hover:bg-white/[0.03]"}`}
                                onClick={() => toggleQuestionComplete(topic.id, q.qid)}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <div className={`flex-shrink-0 transition-all duration-300 ${isCompleted ? "text-indigo-400" : "text-gray-700 group-hover/q:text-gray-500"}`}>
                                    {isCompleted ? <CheckCircle size={20} strokeWidth={2.5} /> : <Circle size={20} strokeWidth={1.5} />}
                                  </div>
                                  <span className={`text-sm font-medium transition-all flex-1 ${isCompleted ? "text-gray-500 line-through" : "text-gray-300"}`}>
                                    <span className="text-gray-600 font-mono text-xs mr-2">Q{q.qid}.</span>
                                    {q.text}
                                  </span>
                                </div>
                                {q.image && (
                                  <div className={`mt-2 sm:mt-0 sm:ml-auto p-2 bg-white/5 rounded-lg border transition-all flex-shrink-0 ${isCompleted ? 'border-indigo-500/20 opacity-50' : 'border-white/10'}`}>
                                    <img src={q.image} alt={`Pattern ${q.qid}`} className="w-auto h-20 sm:h-24 object-contain rounded mx-auto" loading="lazy" />
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {isExpanded && (!topic.questions || topic.questions.length === 0) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 border-t border-white/5 pt-4">
                        <p className="text-gray-500 text-sm">No assignment questions — check the GitHub repository for code solutions.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Theory Notes Section */}
      <div className="max-w-6xl mx-auto">
        <motion.button
          onClick={() => setShowTheory(!showTheory)}
          className="w-full flex items-center justify-between p-8 rounded-[2.5rem] bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-white/10 mb-8 group hover:border-indigo-500/30 transition-all duration-500"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="text-purple-400" size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white">Theory Notes</h2>
              <p className="text-gray-500 text-sm mt-1">
                {theoryCompletedIds.length}/{theoryNotes.length} completed •
                Core concepts & definitions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${theoryProgressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-purple-400 text-xs font-bold">
                {theoryProgressPercentage}%
              </span>
            </div>
            {showTheory ? (
              <ChevronUp className="text-gray-400" size={24} />
            ) : (
              <ChevronDown className="text-gray-400" size={24} />
            )}
          </div>
        </motion.button>

        <AnimatePresence>
          {showTheory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pb-8">
                {theoryNotes.map((note) => {
                  const isDone = theoryCompletedIds.includes(note.id);
                  const isOpen = expandedTheory[note.id];
                  return (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-2xl border transition-all duration-500 ${
                        isDone ? "bg-purple-500/5 border-purple-500/30" : "bg-[#0d0d10] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <button
                        onClick={() => toggleTheoryExpand(note.id)}
                        className="w-full p-5 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{note.icon}</span>
                          <h4 className={`font-bold text-sm transition-all ${isDone ? "text-gray-500 line-through" : "text-white"}`}>
                            {note.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleTheoryComplete(note.id); }}
                            className={`transform transition-all duration-300 hover:scale-110 ${isDone ? "text-purple-400" : "text-gray-700 hover:text-gray-400"}`}
                          >
                            <CheckCircle size={22} strokeWidth={isDone ? 2.5 : 1.5} />
                          </button>
                          {isOpen ? <ChevronUp className="text-gray-400" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-white/5 pt-4">
                              <RenderContent text={note.content} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopicWiseSolutions;
