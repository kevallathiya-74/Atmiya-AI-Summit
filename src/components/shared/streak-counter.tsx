"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
  const getStreakColor = () => {
    if (streak >= 30) return "from-purple-500 to-pink-600";
    if (streak >= 14) return "from-orange-500 to-red-600";
    if (streak >= 7) return "from-yellow-400 to-orange-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-gradient-to-r shadow-lg",
        getStreakColor(),
        className
      )}
    >
      <motion.div
        animate={{
          scale: streak > 0 ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          repeat: streak >= 7 ? Infinity : 0,
          repeatDelay: 1,
        }}
      >
        <Flame className="w-5 h-5 text-white" />
      </motion.div>
      <div className="flex flex-col items-start">
        <span className="text-xs font-medium text-white/90">Streak</span>
        <span className="text-lg font-bold text-white">{streak} days</span>
      </div>
    </motion.div>
  );
}
