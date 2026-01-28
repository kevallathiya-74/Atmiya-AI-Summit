"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Sparkles, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MicroChallengesPage() {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);

  const challenges = [
    {
      id: 1,
      title: "Quick Math",
      titleGu: "ઝડપી ગણિત",
      difficulty: "Easy",
      xp: 30,
      time: 3,
      topic: "Arithmetic",
    },
    {
      id: 2,
      title: "Science Quiz",
      titleGu: "વિજ્ઞાન ક્વિઝ",
      difficulty: "Medium",
      xp: 50,
      time: 3,
      topic: "Physics",
    },
    {
      id: 3,
      title: "Grammar Sprint",
      titleGu: "વ્યાકરણ દોડ",
      difficulty: "Easy",
      xp: 30,
      time: 3,
      topic: "English",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              માઇક્રો ચેલેન્જ
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Micro Challenges - 3-minute quick wins
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <Timer className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              3 min each
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, idx) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      challenge.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Trophy className="w-4 h-4" />
                    <span className="font-bold">+{challenge.xp} XP</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {challenge.titleGu}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {challenge.title} • {challenge.topic}
                </p>
                <Button
                  className="w-full"
                  onClick={() => setActiveChallenge(challenge.id)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Start Challenge
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
