"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  BookOpen,
} from "lucide-react";

interface ExamRelevanceTopic {
  topic: string;
  subject: string;
  relevanceScore: number;
  examFrequency: number;
  marksAllocation: number;
  difficulty: "easy" | "medium" | "hard";
  priority: "high" | "medium" | "low";
  lastExamAppearance: string;
}

export default function ExamRelevancePage() {
  const topics: ExamRelevanceTopic[] = [
    {
      topic: "બીજગણિત | Algebra",
      subject: "ગણિત | Mathematics",
      relevanceScore: 95,
      examFrequency: 100,
      marksAllocation: 15,
      difficulty: "medium",
      priority: "high",
      lastExamAppearance: "ટર્મ 1, 2026 | Term 1, 2026",
    },
    {
      topic: "ભૂમિતિ પ્રમાણ | Geometry proofs",
      subject: "ગણિત | Mathematics",
      relevanceScore: 92,
      examFrequency: 95,
      marksAllocation: 12,
      difficulty: "hard",
      priority: "high",
      lastExamAppearance: "ટર્મ 1, 2026 | Term 1, 2026",
    },
    {
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      subject: "વિજ્ઞાન | Science",
      relevanceScore: 88,
      examFrequency: 90,
      marksAllocation: 10,
      difficulty: "medium",
      priority: "high",
      lastExamAppearance: "ટર્મ 1, 2026 | Term 1, 2026",
    },
    {
      topic: "વિદ્યુત પ્રવાહ | Electric current",
      subject: "વિજ્ઞાન | Science",
      relevanceScore: 85,
      examFrequency: 85,
      marksAllocation: 12,
      difficulty: "hard",
      priority: "high",
      lastExamAppearance: "સેમી-ફાઇનલ 2025 | Semi-final 2025",
    },
    {
      topic: "Grammar (Tenses)",
      subject: "અંગ્રેજી | English",
      relevanceScore: 78,
      examFrequency: 80,
      marksAllocation: 8,
      difficulty: "medium",
      priority: "medium",
      lastExamAppearance: "ટર્મ 1, 2026 | Term 1, 2026",
    },
    {
      topic: "સ્વતંત્રતા સંગ્રામ | Freedom Struggle",
      subject: "સામાજિક | Social",
      relevanceScore: 82,
      examFrequency: 75,
      marksAllocation: 10,
      difficulty: "medium",
      priority: "medium",
      lastExamAppearance: "ફાઇનલ 2025 | Final 2025",
    },
    {
      topic: "કવિતા | Poetry",
      subject: "ગુજરાતી | Gujarati",
      relevanceScore: 65,
      examFrequency: 60,
      marksAllocation: 6,
      difficulty: "easy",
      priority: "low",
      lastExamAppearance: "ટર્મ 2, 2025 | Term 2, 2025",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "hard":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "medium":
        return <Target className="w-4 h-4 text-yellow-600" />;
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const avgRelevance = Math.round(
    topics.reduce((acc, t) => acc + t.relevanceScore, 0) / topics.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              પરીક્ષા સંબંધિતતા | Exam Relevance
            </h1>
            <p className="text-gray-600 mt-2">
              પરીક્ષા સંબંધિતતા સ્કોર જુઓ | Show exam relevance scores
            </p>
          </div>
          <Award className="w-12 h-12 text-amber-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "સરેરાશ સંબંધિતતા | Avg Relevance",
              value: `${avgRelevance}%`,
              icon: Target,
              color: "amber",
            },
            {
              label: "ઉચ્ચ પ્રાથમિકતા | High Priority",
              value: topics.filter((t) => t.priority === "high").length,
              icon: AlertTriangle,
              color: "red",
            },
            {
              label: "કુલ ગુણ | Total Marks",
              value: topics.reduce((acc, t) => acc + t.marksAllocation, 0),
              icon: Star,
              color: "orange",
            },
            {
              label: "વિષયો | Topics",
              value: topics.length,
              icon: BookOpen,
              color: "yellow",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Exam Priority Insights */}
        <Card className="p-6 bg-gradient-to-r from-amber-500 to-red-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            પરીક્ષા પ્રાથમિકતા સૂઝ | Exam Priority Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topics.slice(0, 3).map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <h3 className="font-semibold">{topic.topic}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-100">
                    {topic.marksAllocation} ગુણ | Marks
                  </span>
                  <span className="text-2xl font-bold">
                    {topic.relevanceScore}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Topic-wise Exam Relevance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-500" />
            વિષય-વાર પરીક્ષા સંબંધિતતા | Topic-wise Exam Relevance
          </h2>
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {topic.topic}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getDifficultyColor(
                          topic.difficulty
                        )}`}
                      >
                        {topic.difficulty.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          topic.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : topic.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {getPriorityIcon(topic.priority)}
                        {topic.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {topic.subject}
                    </p>
                    <p className="text-xs text-gray-500">
                      છેલ્લે દેખાવ | Last appeared: {topic.lastExamAppearance}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-amber-600">
                      {topic.relevanceScore}%
                    </div>
                    <p className="text-xs text-gray-600">
                      સંબંધિતતા | Relevance
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"
                    style={{ width: `${topic.relevanceScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-amber-600">
                      {topic.examFrequency}%
                    </p>
                    <p className="text-xs text-gray-600">આવર્તન | Frequency</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <Star className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-orange-600">
                      {topic.marksAllocation}
                    </p>
                    <p className="text-xs text-gray-600">ગુણ | Marks</p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                    <Target className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <p className="text-lg font-bold text-red-600 capitalize">
                      {topic.difficulty}
                    </p>
                    <p className="text-xs text-gray-600">
                      મુશ્કેલી | Difficulty
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    પૂર્વ પેપર્સ | Previous Papers
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600"
                  >
                    પ્રેક્ટિસ સામગ્રી | Practice Material
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Exam Preparation Tips */}
        <Card className="p-6 border-2 border-amber-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-amber-500" />
            પરીક્ષા તૈયારી ટીપ્સ | Exam Preparation Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "ઉચ્ચ સંબંધિતતા વિષયો પર ધ્યાન કેન્દ્રિત કરો | Focus on high relevance topics",
              "નિયમિત પૂર્વ પેપર્સ પ્રેક્ટિસ | Regular previous paper practice",
              "મુશ્કેલ વિષયો માટે વધારાનો સમય આપો | Extra time for difficult topics",
              "સરેરાશ 10-12 ગુણના પ્રશ્નો તૈયાર રાખો | Prepare 10-12 mark questions",
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-amber-50 to-orange-50 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600">
            સંપૂર્ણ પરીક્ષા માર્ગદર્શિકા | Complete Exam Guide
          </Button>
          <Button variant="outline" className="flex-1">
            પૂર્વ પેપર્સ ડાઉનલોડ કરો | Download Previous Papers
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
