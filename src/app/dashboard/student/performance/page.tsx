"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Award, Target } from "lucide-react";

export default function PerformancePage() {
  const stats = [
    {
      label: "Total Questions",
      labelGu: "કુલ પ્રશ્નો",
      value: 450,
      icon: Target,
    },
    {
      label: "Correct Answers",
      labelGu: "સાચા જવાબો",
      value: 378,
      icon: Award,
    },
    {
      label: "Accuracy Rate",
      labelGu: "સચોટતા દર",
      value: "84%",
      icon: TrendingUp,
    },
    {
      label: "Study Hours",
      labelGu: "અભ્યાસ કલાકો",
      value: "125h",
      icon: BarChart3,
    },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", subjectGu: "ગણિત", score: 87, trend: "up" },
    { subject: "Science", subjectGu: "વિજ્ઞાન", score: 82, trend: "up" },
    { subject: "English", subjectGu: "અંગ્રેજી", score: 75, trend: "down" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            પ્રદર્શન વિશ્લેષણ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Performance Analytics - Track your learning progress
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <Icon className="w-8 h-8 text-blue-600 mb-3" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.labelGu}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            Subject Performance
          </h2>
          <div className="space-y-4">
            {subjectPerformance.map((sub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {sub.subjectGu}
                    </p>
                    <p className="text-sm text-gray-600">{sub.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {sub.score}%
                    </span>
                    <TrendingUp
                      className={`w-5 h-5 ${
                        sub.trend === "up" ? "text-green-600" : "text-red-600"
                      } ${sub.trend === "down" && "rotate-180"}`}
                    />
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{ width: `${sub.score}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50">
          <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">+12%</p>
              <p className="text-sm text-gray-600">Improvement this week</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
