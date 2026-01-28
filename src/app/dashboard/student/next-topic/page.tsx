"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Brain, Target, Zap, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";

export default function NextTopicPage() {
  const { studentContext } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI recommendation
  const recommendation = {
    topic: "Integers - Negative Numbers",
    topicGu: "પૂર્ણાંકો - ઋણ સંખ્યાઓ",
    chapter: "Chapter 1: Number System",
    chapterGu: "પ્રકરણ 1: સંખ્યા પદ્ધતિ",
    confidence: 92,
    reasons: [
      "You've completed Natural and Whole Numbers with 95% accuracy",
      "તમે પ્રાકૃતિક અને પૂર્ણ સંખ્યાઓ 95% સચોટતા સાથે પૂર્ણ કર્યા છે",
      "Integers build directly on your current knowledge",
      "પૂર્ણાંકો તમારા વર્તમાન જ્ઞાન પર સીધા બંધાય છે",
      "This topic unlocks 3 more chapters in your path",
      "આ વિષય તમારા માર્ગમાં 3 વધુ પ્રકરણો અનલોક કરે છે",
    ],
    estimatedTime: "25-30 minutes",
    difficulty: "Medium",
    unlocks: ["Rational Numbers", "Decimals", "Fractions"],
  };

  const alternativeTopics = [
    {
      id: "alt1",
      topic: "Basic Algebra - Variables",
      topicGu: "મૂળભૂત બીજગણિત - ચલ",
      confidence: 85,
      reason: "Strong foundation in arithmetic operations",
      reasonGu: "અંકગણિત કામગીરીમાં મજબૂત પાયો",
    },
    {
      id: "alt2",
      topic: "Lines and Angles",
      topicGu: "રેખાઓ અને ખૂણા",
      confidence: 78,
      reason: "Good visual learning ability",
      reasonGu: "સારી દૃશ્ય શીખવાની ક્ષમતા",
    },
  ];

  const handleStartTopic = () => {
    setIsLoading(true);
    // Simulate navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              આગળનું વિષય
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Next Best Topic - AI recommends what to learn next
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">
              AI-Powered
            </span>
          </div>
        </div>

        {/* Current Context */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            તમારી શીખવાની સ્થિતિ / Your Learning Status
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Current Class</p>
              <p className="font-semibold text-gray-900">
                Class {studentContext.classLevel || 10}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Subject</p>
              <p className="font-semibold text-gray-900">
                {studentContext.currentSubject || "Mathematics"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Topics Completed</p>
              <p className="font-semibold text-green-600">8 / 24</p>
            </div>
          </div>
        </Card>

        {/* Main Recommendation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="w-8 h-8" />
                  આગળ શું શીખવું / What to Learn Next
                </h2>
                <div className="px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                  <span className="text-sm font-semibold">
                    {recommendation.confidence}% Match
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">
                    {recommendation.topicGu}
                  </h3>
                  <p className="text-xl opacity-90 mb-4">
                    {recommendation.topic}
                  </p>
                  <p className="text-sm opacity-80">{recommendation.chapterGu}</p>
                  <p className="text-sm opacity-75">{recommendation.chapter}</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="text-sm opacity-80">Time Needed</span>
                    </div>
                    <p className="font-semibold text-lg">
                      {recommendation.estimatedTime}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm opacity-80">Difficulty</span>
                    </div>
                    <p className="font-semibold text-lg">
                      {recommendation.difficulty}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm opacity-80">Unlocks</span>
                    </div>
                    <p className="font-semibold text-lg">
                      {recommendation.unlocks.length} Topics
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleStartTopic}
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg h-14"
                >
                  {isLoading ? (
                    "Starting..."
                  ) : (
                    <>
                      Start Learning Now / હવે શીખવાનું શરૂ કરો
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Why This Topic? */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            આ વિષય શા માટે? / Why This Topic?
          </h3>
          <div className="space-y-3">
            {recommendation.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg",
                  index % 2 === 0 ? "bg-green-50" : "bg-blue-50"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    index % 2 === 0
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  )}
                >
                  <span className="font-bold text-sm">{Math.floor(index / 2) + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{reason}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* What You'll Unlock */}
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            તમે શું અનલોક કરશો / What You'll Unlock
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {recommendation.unlocks.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-4 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">{topic}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Alternative Recommendations */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            વૈકલ્પિક ભલામણો / Alternative Recommendations
          </h3>
          <div className="space-y-3">
            {alternativeTopics.map((alt, index) => (
              <motion.div
                key={alt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                      {alt.confidence}% Match
                    </span>
                    <h4 className="font-semibold text-gray-900">{alt.topicGu}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{alt.topic}</p>
                  <p className="text-xs text-gray-500">
                    {alt.reasonGu} • {alt.reason}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Select
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
