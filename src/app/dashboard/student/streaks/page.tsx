"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StreakCounter } from "@/components/shared";
import { Zap, Calendar, Trophy, Flame } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";

export default function StreaksPage() {
  const { gamification } = useDashboardStore();

  const milestones = [
    {
      days: 7,
      label: "Week Warrior",
      reward: "+100 XP",
      unlocked: gamification.streak >= 7,
    },
    {
      days: 30,
      label: "Month Master",
      reward: "+500 XP",
      unlocked: gamification.streak >= 30,
    },
    {
      days: 100,
      label: "Century Champion",
      reward: "+2000 XP",
      unlocked: false,
    },
    { days: 365, label: "Year Legend", reward: "+10000 XP", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            દૈનિક સ્ટ્રીક્સ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Daily Streaks - Keep your learning momentum
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Flame className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Current Streak</p>
            <p className="text-4xl font-bold text-orange-600">
              {gamification.streak} days
            </p>
          </Card>
          <Card className="p-6">
            <Trophy className="w-8 h-8 text-yellow-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Longest Streak</p>
            <p className="text-4xl font-bold text-yellow-600">
              {gamification.streak || 0} days
            </p>
          </Card>
          <Card className="p-6">
            <Zap className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Total Active Days</p>
            <p className="text-4xl font-bold text-blue-600">142 days</p>
          </Card>
        </div>

        <Card className="p-6">
          <StreakCounter streak={gamification.streak} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Streak Milestones</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg ${
                  m.unlocked
                    ? "bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-300"
                    : "bg-gray-100 border-2 border-gray-200 opacity-60"
                }`}
              >
                <Trophy
                  className={`w-8 h-8 mb-2 ${
                    m.unlocked ? "text-green-600" : "text-gray-400"
                  }`}
                />
                <p className="font-bold text-gray-900">{m.days} Days</p>
                <p className="text-sm text-gray-700 mb-1">{m.label}</p>
                <p className="text-xs text-gray-600">{m.reward}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
