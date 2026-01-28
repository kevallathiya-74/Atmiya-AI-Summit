"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Card } from "@/components/ui/card";
import {
  Flame,
  Zap,
  Trophy,
  Star,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Confetti component for celebrations
function Confetti() {
  const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
        />
      ))}
    </div>
  );
}

// Streak display component
export function StreakDisplay() {
  const { gamification, updateStreak } = useDashboardStore();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-4xl"
        >
          🔥
        </motion.div>
        <div>
          <p className="text-sm text-orange-600 font-gujarati">દૈનિક સ્ટ્રીક</p>
          <p className="text-3xl font-bold text-orange-700">
            {gamification.streak} <span className="text-lg font-gujarati">દિવસ</span>
          </p>
          {gamification.streak > 0 && (
            <p className="text-xs text-orange-500 font-gujarati">
              🏆 સૌથી લાંબી: {gamification.longestStreak} દિવસ
            </p>
          )}
        </div>
        {gamification.streakFreezes > 0 && (
          <div className="ml-auto flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full">
            <span className="text-lg">❄️</span>
            <span className="text-sm text-blue-700">{gamification.streakFreezes}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// XP and Level display
export function XPDisplay() {
  const { gamification } = useDashboardStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(gamification.level);

  // Level thresholds
  const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  const currentThreshold = levelThresholds[gamification.level - 1] || 0;
  const nextThreshold = levelThresholds[gamification.level] || levelThresholds[levelThresholds.length - 1];
  const progress = ((gamification.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  useEffect(() => {
    if (gamification.level > prevLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
      setPrevLevel(gamification.level);
    }
  }, [gamification.level, prevLevel]);

  return (
    <>
      {showLevelUp && <Confetti />}
      
      <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 relative overflow-hidden">
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 flex items-center justify-center z-10"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl mb-2"
              >
                🎉
              </motion.div>
              <p className="text-2xl font-bold text-yellow-700 font-gujarati">
                લેવલ અપ!
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl font-bold text-white">{gamification.level}</span>
            </motion.div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs px-1.5 rounded-full">
              LVL
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="font-bold text-yellow-700">{gamification.xp} XP</span>
              </div>
              <span className="text-sm text-yellow-600">
                {nextThreshold - gamification.xp} XP બાકી
              </span>
            </div>
            <div className="h-3 bg-yellow-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Daily/Weekly XP */}
        <div className="mt-3 pt-3 border-t border-yellow-200 flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-yellow-600" />
            <span className="text-yellow-700 font-gujarati">આજે: {gamification.dailyXP} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-yellow-600" />
            <span className="text-yellow-700 font-gujarati">અઠવાડિક: {gamification.weeklyXP} XP</span>
          </div>
        </div>
      </Card>
    </>
  );
}

// Badges display
export function BadgesDisplay() {
  const { gamification } = useDashboardStore();
  const [selectedBadge, setSelectedBadge] = useState<typeof gamification.badges[0] | null>(null);

  return (
    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-purple-600" />
        <h3 className="font-bold text-purple-700 font-gujarati">બેજ સંગ્રહ</h3>
        <span className="ml-auto text-sm text-purple-500">
          {gamification.badges.length} મેળવ્યા
        </span>
      </div>

      {gamification.badges.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🏅</div>
          <p className="text-sm text-purple-600 font-gujarati">
            શીખતા રહો અને બેજ મેળવો!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {gamification.badges.map((badge, index) => (
            <motion.button
              key={badge.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              onClick={() => setSelectedBadge(badge)}
              className="relative group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow">
                {badge.icon}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-purple-700 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap z-10"
              >
                {badge.nameGu}
              </motion.div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-white rounded-2xl p-6 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">{selectedBadge.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{selectedBadge.name}</h3>
              <p className="text-lg font-gujarati text-purple-600 mb-2">
                {selectedBadge.nameGu}
              </p>
              <p className="text-gray-600">{selectedBadge.description}</p>
              <p className="text-sm text-gray-400 mt-4">
                મેળવ્યો: {new Date(selectedBadge.earnedAt).toLocaleDateString("gu-IN")}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Stats display
export function StatsDisplay() {
  const { gamification } = useDashboardStore();
  const accuracy =
    gamification.totalQuestionsAnswered > 0
      ? Math.round((gamification.correctAnswers / gamification.totalQuestionsAnswered) * 100)
      : 0;

  const stats = [
    {
      icon: <Target className="w-5 h-5" />,
      label: "પ્રશ્નો",
      value: gamification.totalQuestionsAnswered,
      color: "blue",
    },
    {
      icon: <Star className="w-5 h-5" />,
      label: "સાચા",
      value: gamification.correctAnswers,
      color: "green",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "ચોકસાઈ",
      value: `${accuracy}%`,
      color: "purple",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      label: "પાઠ",
      value: gamification.lessonsCompleted,
      color: "amber",
    },
  ];

  return (
    <Card className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-gray-600" />
        <h3 className="font-bold text-gray-700 font-gujarati">મારી પ્રગતિ</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-3 rounded-xl",
              stat.color === "blue" && "bg-blue-100",
              stat.color === "green" && "bg-green-100",
              stat.color === "purple" && "bg-purple-100",
              stat.color === "amber" && "bg-amber-100"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 mb-1",
                stat.color === "blue" && "text-blue-600",
                stat.color === "green" && "text-green-600",
                stat.color === "purple" && "text-purple-600",
                stat.color === "amber" && "text-amber-600"
              )}
            >
              {stat.icon}
              <span className="text-sm font-gujarati">{stat.label}</span>
            </div>
            <p
              className={cn(
                "text-2xl font-bold",
                stat.color === "blue" && "text-blue-700",
                stat.color === "green" && "text-green-700",
                stat.color === "purple" && "text-purple-700",
                stat.color === "amber" && "text-amber-700"
              )}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

// Main gamification panel
export function GamificationPanel() {
  return (
    <div className="space-y-4">
      <XPDisplay />
      <StreakDisplay />
      <StatsDisplay />
      <BadgesDisplay />
    </div>
  );
}

export default GamificationPanel;
