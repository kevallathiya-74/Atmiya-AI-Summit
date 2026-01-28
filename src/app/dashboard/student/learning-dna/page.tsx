"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LearningDNACard } from "@/components/shared";
import { Brain, Zap, Target, TrendingUp } from "lucide-react";

export default function LearningDNAPage() {
  const dnaProfile = {
    learningStyle: "Visual Learner",
    learningStyleGu: "દૃશ્ય શિક્ષક",
    strengths: ["Pattern Recognition", "Quick Recall", "Problem Solving"],
    weaknesses: ["Long Reading", "Abstract Concepts"],
    preferences: {
      speed: "Fast",
      difficulty: "Medium-Hard",
      format: "Interactive",
    },
  };

  const mockLearningDNA = {
    strongSubjects: ["Mathematics", "Science"],
    weakTopics: ["Long Reading", "Abstract Concepts"],
    preferredLearningTime: "Evening",
    averageStudyDuration: 60,
    conceptGaps: [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            લર્નિંગ DNA
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Learning DNA - Your unique learning profile
          </p>
        </div>

        <LearningDNACard learningDNA={mockLearningDNA} />

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Your Learning Style
          </h2>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {dnaProfile.learningStyleGu}
              </p>
              <p className="text-sm text-gray-600">
                {dnaProfile.learningStyle}
              </p>
            </div>
            <Zap className="w-12 h-12 text-purple-600" />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Strengths / મજબૂતીઓ
            </h3>
            <ul className="space-y-2">
              {dnaProfile.strengths.map((s, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Areas to Improve
            </h3>
            <ul className="space-y-2">
              {dnaProfile.weaknesses.map((w, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  {w}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
