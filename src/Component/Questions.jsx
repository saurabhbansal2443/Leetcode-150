import React, { useState, useEffect } from "react";
import questionsData from "../QuestionsData";
import toast, { Toaster } from "react-hot-toast";

const Questions = () => {
  // Load progress from localStorage so students don't lose data on refresh
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem("leetcode_progress");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("leetcode_progress", JSON.stringify(completedIds));
  }, [completedIds]);

  const toggleComplete = (id) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter((item) => item !== id));
    } else {
      setCompletedIds([...completedIds, id]);
      toast.success("Question marked as completed!");
    }
  };

  const progressPercentage = Math.round((completedIds.length / questionsData.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster />
      
      {/* Header & Stats */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">LeetCode 150 Master Tracker</h1>
        <p className="text-gray-600 mb-6">Track your progress, watch tutorials, and review code solutions.</p>
        
        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700">
            <span>Overall Progress</span>
            <span>{completedIds.length} / {questionsData.length} Solved ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questionsData.map((q) => {
          const isDone = completedIds.includes(q.id);
          
          return (
            <div 
              key={q.id} 
              className={`bg-white rounded-xl shadow-md border transition-all duration-200 hover:shadow-lg ${isDone ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                    ID: #{q.id}
                  </span>
                  <input 
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleComplete(q.id)}
                    className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                  />
                </div>

                <h3 className={`text-lg font-bold mb-4 line-clamp-1 ${isDone ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                  {q.name}
                </h3>

                <div className="flex flex-col gap-2">
                  {/* Problem Link */}
                  <a 
                    href={q.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-orange-50 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors"
                  >
                    LeetCode Problem
                  </a>

                  {/* YouTube Link */}
                  <a 
                    href={q.youtubeLink || "#"}
                    target={q.youtubeLink ? "_blank" : "_self"}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                      q.youtubeLink 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    {q.youtubeLink ? "Watch Solution" : "Video Coming Soon"}
                  </a>

                  {/* GitHub Link */}
                  <a 
                    href={q.githubLink || "#"}
                    target={q.githubLink ? "_blank" : "_self"}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold border transition-all ${
                      q.githubLink 
                      ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white' 
                      : 'border-gray-200 text-gray-300 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    {q.githubLink ? "View Code" : "No Code Yet"}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;