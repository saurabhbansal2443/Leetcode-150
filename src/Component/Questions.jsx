import React, { useState, useEffect } from "react";
import questionsData from "../QuestionsData";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Youtube, Code2, ExternalLink, CheckCircle, Github, Trophy, Flame } from "lucide-react";

const Questions = () => {
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem("leetcode_progress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("leetcode_progress", JSON.stringify(completedIds));
  }, [completedIds]);

  const toggleComplete = (id) => {
    const isMarkingDone = !completedIds.includes(id);
    
    if (isMarkingDone) {
      setCompletedIds([...completedIds, id]);
      toast.dismiss(); 
      toast.custom((t) => (
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
            <p className="text-white font-bold text-sm">Problem Cleared!</p>
            <p className="text-gray-400 text-xs">Your logic is getting stronger. Keep going! 🚀</p>
          </div>
        </motion.div>
      ), { duration: 2000 });
    } else {
      setCompletedIds(completedIds.filter((item) => item !== id));
    }
  };

  const progressPercentage = Math.round((completedIds.length / questionsData.length) * 100);

  return (
    <div id="challenge" className="min-h-screen bg-[#0a0a0c] py-20 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500/30">
      <Toaster position="bottom-center" />

      {/* Progress Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700" />
            
            <div className="z-10">
              <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-2 block">Your Roadmap Progress</span>
              <h2 className="text-4xl font-black text-white mb-6">Top 150 <span className="text-indigo-500">Mastery</span></h2>
              
              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Solved</p>
                  <p className="text-2xl font-black text-white">{completedIds.length}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Remaining</p>
                  <p className="text-2xl font-black text-gray-400">{questionsData.length - completedIds.length}</p>
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
                  className="text-indigo-500" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{progressPercentage}%</span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase mt-1 tracking-widest">Complete</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0e0e12] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
              <Flame className="text-orange-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Coding Streak</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Consistency is the secret sauce. Solve at least one problem daily!</p>
          </div>
        </div>
      </motion.div>

      {/* Grid - Optimized for fast scrolling */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {questionsData.map((q) => {
          const isDone = completedIds.includes(q.id);

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Removed index-based delay to ensure instant visibility during scroll
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "100px" }}
              key={q.id}
              className={`group relative rounded-3xl border transition-all duration-500 ${
                isDone 
                  ? "bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_40px_rgba(79,70,229,0.1)]" 
                  : "bg-[#0d0d10] border-white/5 hover:border-white/20"
              }`}
            >
              <div className="p-7">
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[10px] font-black tracking-widest px-3 py-1 rounded-full ${isDone ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                    Question - {q.id}
                  </span>
                  <button 
                    onClick={() => toggleComplete(q.id)}
                    className={`transform transition-all duration-300 hover:scale-110 ${isDone ? "text-indigo-400" : "text-gray-700 hover:text-gray-400"}`}
                  >
                    <CheckCircle size={28} strokeWidth={isDone ? 2.5 : 1.5} />
                  </button>
                </div>

                <h3 className={`text-xl font-bold mb-8 transition-all duration-500 leading-tight ${
                  isDone ? "text-gray-500 line-through opacity-60" : "text-gray-100"
                }`}>
                  {q.name}
                </h3>

                <div className="space-y-3">
                  <a href={q.url} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-orange-500/5 text-orange-400 border border-orange-500/10 hover:bg-orange-500 hover:text-white transition-all font-bold text-xs uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Code2 size={16} /> Open LeetCode</span>
                    <ExternalLink size={14} />
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <a href={q.youtubeLink || "#"} target="_blank" rel="noreferrer" 
                       className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-black text-[10px] uppercase transition-all ${
                         q.youtubeLink ? "bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white" : "bg-white/5 text-gray-700 pointer-events-none"
                       }`}>
                      <Youtube size={16} /> Tutorial
                    </a>
                    <a href={q.githubLink || "#"} target="_blank" rel="noreferrer"
                       className={`flex items-center justify-center gap-2 p-3 rounded-2xl font-black text-[10px] uppercase transition-all border ${
                         q.githubLink ? "border-white/10 text-white hover:bg-white hover:text-black" : "border-white/5 text-gray-700 pointer-events-none"
                       }`}>
                      <Github size={16} /> Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Persistent Channel Motivation */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-3"
      >
        <div className="bg-black/90 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4 max-w-xs ring-1 ring-white/5">
          <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <Youtube className="text-white" size={24} />
          </div>
          <div className="pr-2">
            <p className="text-white text-sm font-black">Coding Terminal</p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">Full series explained</p>
            <a href="https://youtube.com/@CodingTerminal" target="_blank" rel="noreferrer" className="text-red-500 text-xs font-bold hover:underline">Subscribe →</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Questions;