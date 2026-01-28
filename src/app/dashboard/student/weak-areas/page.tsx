"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingDown, Target, Zap } from "lucide-react";

export default function WeakAreasPage() {
  const weakAreas = [
    {
      topic: "Negative Numbers",
      topicGu: "ઋણ સંખ્યાઓ",
      score: 45,
      attempts: 8,
      chapter: "Integers",
    },
    {
      topic: "Fractions",
      topicGu: "ભિન્ન",
      score: 52,
      attempts: 6,
      chapter: "Number System",
    },
    {
      topic: "Angles",
      topicGu: "ખૂણા",
      score: 60,
      attempts: 5,
      chapter: "Geometry",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            નબળા ક્ષેત્રો
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Weak Areas - Focus on what needs improvement
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
          <div className="flex items-center gap-4">
            <AlertCircle className="w-12 h-12 text-orange-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                AI-Identified Weak Topics
              </h2>
              <p className="text-sm text-gray-600">
                Based on your performance, these topics need more practice.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {weakAreas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 border-2 border-red-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {area.topicGu}
                    </p>
                    <p className="text-sm text-gray-600">
                      {area.topic} • {area.chapter}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                    Score: {area.score}%
                  </span>
                </div>
                <div className="mb-4">
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      style={{ width: `${area.score}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>Attempts: {area.attempts}</span>
                  <span>Need 75% to pass</span>
                </div>
                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Practice This Topic
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Improvement Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Focus on one topic at a time</li>
            <li>✓ Use explain-like-I'm-10 mode</li>
            <li>✓ Practice with easier questions first</li>
            <li>✓ Review concepts before practice</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
