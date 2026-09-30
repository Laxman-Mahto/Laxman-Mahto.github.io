import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// --- Helper Functions ---
const timeAgo = (dateString: string | number): string => {
  const date = typeof dateString === 'number' ? new Date(dateString * 1000) : new Date(dateString.replace(' ', 'T') + 'Z');
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

// --- YouTube Card ---
interface YouTubeVideo {
  title: string;
  link: string;
  thumbnail: string;
  pubDate: string;
}

const YouTubeCard: React.FC = () => {
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYouTube = async () => {
      try {
        // Adding a timestamp parameter to bust rss2json's cache
        const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 60)); // Changes every hour
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCgogIv4w00RwDnt9mVM5-cw%26t%3D${cacheBuster}`);
        if (!res.ok) throw new Error("Failed to fetch YouTube feed");
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setVideo(data.items[0]);
        } else {
          throw new Error("No items found in YouTube feed");
        }
      } catch (err) {
        console.error("YouTube Fetch Error:", err);
        // Fallback to manual video if API fails
        setVideo({
          title: "Day 3 | LeetCode 1111 | Java Solution & Explanation",
          link: "https://www.youtube.com/watch?v=qi_AuJnOODg",
          thumbnail: "https://i2.ytimg.com/vi/qi_AuJnOODg/hqdefault.jpg",
          pubDate: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
        });
      } finally {
        setLoading(false);
      }
    };
    fetchYouTube();
  }, []);


  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 h-28 w-full" />
    );
  }
  if (!video) return null;

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 p-4 transition-colors w-full h-full"
    >
      <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold text-red-600 dark:text-red-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
        Latest Video
      </div>
      
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-shrink-0 w-24 h-16 sm:w-28 sm:h-[4.5rem] rounded-md overflow-hidden relative">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
             <svg className="w-6 h-6 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </div>
        </div>
        <div className="flex flex-col justify-center overflow-hidden flex-1">
          <h4 className="text-sm sm:text-[14px] font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1 font-inter">{video.title.replace(/&amp;/g, '&')}</h4>
          <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-inter mt-auto pt-1 border-t border-gray-100 dark:border-white/5 truncate">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Latest:</span> <span className="opacity-75">{timeAgo(video.pubDate)}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

// --- LeetCode Card ---
interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
}

interface LeetCodeRecent {
  title: string;
  timestamp: string;
}

const LeetCodeCard: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [recent, setRecent] = useState<LeetCodeRecent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        // Fetch stats
        const statsRes = await fetch("https://alfa-leetcode-api.onrender.com/buildwithlaxman/solved");
        if (!statsRes.ok) throw new Error("Failed to fetch LC stats");
        const statsData = await statsRes.json();
        
        if (statsData.solvedProblem !== undefined) {
          setStats({
            totalSolved: statsData.solvedProblem,
            easySolved: statsData.easySolved,
            mediumSolved: statsData.mediumSolved,
            hardSolved: statsData.hardSolved,
            totalQuestions: 3200
          });
        } else {
          throw new Error("LC Stats API returned error status");
        }

        // Fetch recent submissions
        try {
          const recentRes = await fetch("https://alfa-leetcode-api.onrender.com/buildwithlaxman/submission");
          if (recentRes.ok) {
            const recentData = await recentRes.json();
            if (recentData && recentData.submission && recentData.submission.length > 0) {
              const accepted = recentData.submission.find((sub: any) => sub.statusDisplay === "Accepted");
              if (accepted) setRecent(accepted);
            }
          }
        } catch (recentErr) {
          console.warn("Failed to fetch recent LC submissions", recentErr);
          setRecent({
            title: "Check if There Is a Valid Parentheses String Path",
            timestamp: (Math.floor(Date.now() / 1000) - 5 * 3600).toString()
          });
        }

      } catch (err) {
        console.error("LeetCode Fetch Error:", err);
        // Fallback to manual stats if API fails
        setStats({
          totalSolved: 115,
          easySolved: 67,
          mediumSolved: 36,
          hardSolved: 12,
          totalQuestions: 3200
        });
        if (!recent) {
          setRecent({
            title: "Check if There Is a Valid Parentheses String Path",
            timestamp: (Math.floor(Date.now() / 1000) - 5 * 3600).toString()
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLeetCode();
  }, []);


  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 h-28 w-full" />
    );
  }
  if (!stats) return null;

  const total = stats.easySolved + stats.mediumSolved + stats.hardSolved;
  const easyPct = total ? (stats.easySolved / total) * 100 : 0;
  const medPct = total ? (stats.mediumSolved / total) * 100 : 0;
  const hardPct = total ? (stats.hardSolved / total) * 100 : 0;

  return (
    <a
      href="https://leetcode.com/buildwithlaxman/"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 p-4 transition-colors w-full h-full"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-600 dark:text-yellow-500">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.956-.207a1.378 1.378 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z"/></svg>
          LeetCode
        </div>
        <div className="text-xs font-bold text-gray-900 dark:text-white font-inter">
          <span className="text-lg">{stats.totalSolved}</span>
          <span className="text-gray-500 dark:text-gray-400 font-normal"> / {stats.totalQuestions || 3000}</span>
        </div>
      </div>
      
      {/* Visual Bar */}
      <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-gray-200 dark:bg-white/10 mb-2 mt-1">
        {easyPct > 0 && <div className="bg-teal-500 h-full" style={{ width: `${easyPct}%` }} title={`Easy: ${stats.easySolved}`} />}
        {medPct > 0 && <div className="bg-yellow-500 h-full" style={{ width: `${medPct}%` }} title={`Medium: ${stats.mediumSolved}`} />}
        {hardPct > 0 && <div className="bg-red-500 h-full" style={{ width: `${hardPct}%` }} title={`Hard: ${stats.hardSolved}`} />}
      </div>
      
      {/* Stats Breakdown */}
      <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-medium font-inter mb-1.5">
         <span className="text-teal-600 dark:text-teal-400">Easy: {stats.easySolved}</span>
         <span className="text-gray-300 dark:text-gray-700">|</span>
         <span className="text-yellow-600 dark:text-yellow-500">Med: {stats.mediumSolved}</span>
         <span className="text-gray-300 dark:text-gray-700">|</span>
         <span className="text-red-600 dark:text-red-400">Hard: {stats.hardSolved}</span>
      </div>

      {recent && (
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-inter mt-auto pt-1.5 border-t border-gray-100 dark:border-white/5">
          <div className="truncate">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Latest:</span> {recent.title}
          </div>
          <span className="opacity-75 flex-shrink-0">{timeAgo(parseInt(recent.timestamp))}</span>
        </div>
      )}
    </a>
  );
};

const CurrentlyBuilding: React.FC = () => {
  return (
    <motion.section
      className="w-full max-w-4xl mx-auto pb-10 sm:pb-14 pt-0"
      aria-labelledby="currently-building-heading"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2
        id="currently-building-heading"
        className="text-xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-10 font-inter"
      >
        Currently building and learning
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <LeetCodeCard />
        <YouTubeCard />
      </div>
    </motion.section>
  );
};

export default CurrentlyBuilding;
