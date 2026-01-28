"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { XPBar } from "@/components/shared";
import { Award, TrendingUp, Target } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";

export default function XPLevelsPage() {
  const { gamification } = useDashboardStore();

  const xpActivities = [
    { activity: "Complete Topic", xp: 50 },
    { activity: "Daily Streak", xp: 20 },
    { activity: "Practice Questions", xp: 10 },
    { activity: "Perfect Score", xp: 100 },
    { activity: "Micro Challenge", xp: 30 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            XP અને સ્તરો
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            XP & Levels - Track your progress
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <div className="flex items-center gap-4 mb-6">
            <Award className="w-12 h-12" />
            <div>
              <p className="text-sm opacity-90">Current Level</p>
              <p className="text-5xl font-bold">{gamification.level}</p>
            </div>
          </div>
          <XPBar currentXP={gamification.xp} level={gamification.level} />
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Next Level Requirements
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Level {gamification.level + 1} • Need{" "}
              {1000 - (gamification.xp % 1000)} more XP
            </p>
            <div className="space-y-2">
              {xpActivities.map((activity, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{activity.activity}</span>
                  <span className="font-semibold text-green-600">
                    +{activity.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Level Perks
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Unlock advanced topics</li>
              <li>✓ Access exclusive badges</li>
              <li>✓ Leaderboard ranking</li>
              <li>✓ Special AI features</li>
            </ul>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
