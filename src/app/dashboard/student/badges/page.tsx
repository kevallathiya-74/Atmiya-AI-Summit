"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge as BadgeIcon, Lock, Trophy } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";

export default function BadgesPage() {
  const { gamification } = useDashboardStore();

  const badges = [
    {
      id: 1,
      name: "First Steps",
      nameGu: "પ્રથમ પગલું",
      rarity: "Common",
      unlocked: true,
      icon: "🎯",
    },
    {
      id: 2,
      name: "Week Warrior",
      nameGu: "સપ્તાહ યોદ્ધા",
      rarity: "Rare",
      unlocked: true,
      icon: "⚔️",
    },
    {
      id: 3,
      name: "Perfect Score",
      nameGu: "સંપૂર્ણ સ્કોર",
      rarity: "Epic",
      unlocked: false,
      icon: "💯",
    },
    {
      id: 4,
      name: "Year Legend",
      nameGu: "વર્ષ દંતકથા",
      rarity: "Legendary",
      unlocked: false,
      icon: "👑",
    },
    {
      id: 5,
      name: "Speed Master",
      nameGu: "ઝડપ માસ્ટર",
      rarity: "Rare",
      unlocked: true,
      icon: "⚡",
    },
    {
      id: 6,
      name: "Curious Mind",
      nameGu: "જિજ્ઞાસુ મન",
      rarity: "Common",
      unlocked: true,
      icon: "🧠",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            બેજ અને પુરસ્કારો
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Badges & Rewards - Collect achievements
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {gamification.badges.length}
            </p>
            <p className="text-sm text-gray-600">Earned</p>
          </Card>
          <Card className="p-4 text-center">
            <BadgeIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{badges.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className={`p-6 text-center ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300"
                    : "bg-gray-50 opacity-60"
                }`}
              >
                {badge.unlocked ? (
                  <div className="text-6xl mb-3">{badge.icon}</div>
                ) : (
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                )}
                <h3 className="font-bold text-gray-900 mb-1">{badge.nameGu}</h3>
                <p className="text-sm text-gray-600 mb-2">{badge.name}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    badge.rarity === "Legendary"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                      : badge.rarity === "Epic"
                      ? "bg-purple-100 text-purple-700"
                      : badge.rarity === "Rare"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {badge.rarity}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
