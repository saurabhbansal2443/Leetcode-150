import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, PlayCircle, ExternalLink, X, ListVideo } from 'lucide-react';
import youtubeData from '../YoutubePlaylists.json';

const YoutubeSeries = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeSeries, setActiveSeries] = useState(0); // 0 or 1

  return (
    <div className="min-h-screen bg-[#0B0F19] py-12 px-4 sm:px-6 lg:px-8 font-sans relative selection:bg-red-500/30">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-orange-500">
            YouTube Series
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Master Data Structures and Algorithms through our curated video lessons. Watch directly here or on YouTube.
          </p>
        </motion.div>

        {/* Series Selection Toggle */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 px-4">
          {youtubeData.map((series, idx) => (
            <button
              key={series.id}
              onClick={() => setActiveSeries(idx)}
              className={`group relative overflow-hidden flex items-center justify-between gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto min-w-[280px] max-w-sm border ${
                activeSeries === idx 
                  ? "bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/50 text-white shadow-[0_0_30px_rgba(239,68,68,0.2)]" 
                  : "bg-white/[0.02] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-gray-200 hover:border-white/20"
              }`}
            >
              {activeSeries === idx && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-2xl"></div>
              )}
              <div className="flex items-center gap-4 relative z-10 w-full">
                <div className={`p-3 rounded-xl transition-all duration-300 ${activeSeries === idx ? "bg-red-500 text-white shadow-lg shadow-red-500/40" : "bg-white/10 text-gray-400 group-hover:text-white"}`}>
                  <Youtube size={26} strokeWidth={activeSeries === idx ? 2.5 : 2} />
                </div>
                <div className="flex flex-col items-start text-left flex-1 min-w-0">
                  <span className="text-base sm:text-lg tracking-wide truncate w-full group-hover:text-white transition-colors">
                    {series.title.split('|')[0].trim()}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium mt-0.5 ${activeSeries === idx ? "text-red-300" : "text-gray-500"}`}>
                    {series.items.length} Video Lectures
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <motion.div 
          key={activeSeries}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {youtubeData[activeSeries].items.map((video, index) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer hover:border-red-500/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative aspect-video overflow-hidden bg-black/20">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <PlayCircle className="text-white w-16 h-16 opacity-90 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-medium text-white backdrop-blur-sm">
                  Lecture {index + 1}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-white font-medium line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActiveVideo(null)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-5xl bg-[#12121A] rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-screen"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 flex-shrink-0">
                <h3 className="text-white font-medium truncate pr-4">{activeVideo.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a 
                    href={`https://youtube.com/watch?v=${activeVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  >
                    <ExternalLink size={18} />
                    <span className="hidden sm:inline">Watch on YouTube</span>
                  </a>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="aspect-video w-full bg-black flex-1 min-h-0">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-none w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YoutubeSeries;
