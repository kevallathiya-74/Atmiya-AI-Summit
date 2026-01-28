"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPBarProps {
  currentXP: number;
  level: number;
  className?: string;
}

export function XPBar({ currentXP, level, className }: XPBarProps) {
  const xpForNextLevel = level * 1000;
  const xpInCurrentLevel = currentXP % 1000;
  const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold shadow-md">
            <Trophy className="w-4 h-4" />
          </div>
          <span className="font-semibold text-gray-900">Level {level}</span>
        </div>
        <span className="text-gray-600 font-medium">
          {xpInCurrentLevel} / {xpForNextLevel} XP
        </span>
      </div>

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
