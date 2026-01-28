"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  AlertTriangle,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";

export default function ExamFocusedNotesPage() {
  const [selectedSubject, setSelectedSubject] = useState("mathematics");

  const examTopics = [
    {
      topic: "Quadratic Equations",
      importance: "high",
      weight: "8 marks",
      lastExam: "Always asked",
    },
    {
      topic: "Triangles",
      importance: "high",
      weight: "6 marks",
      lastExam: "3 years",
    },
    {
      topic: "Probability",
      importance: "medium",
      weight: "4 marks",
      lastExam: "2 years",
    },
    {
      topic: "Statistics",
      importance: "medium",
      weight: "5 marks",
      lastExam: "1 year",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Exam-Focused Notes
          </h1>
          <p className="text-gray-600 mt-2">
            High-yield content for maximum marks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">High Priority Topics</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-gray-600">Exam Coverage</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-600">Total Marks</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            High-Priority Exam Topics
          </h2>
          <div className="space-y-3">
            {examTopics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  item.importance === "high"
                    ? "bg-red-50 border-red-200"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">
                        {item.topic}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          item.importance === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.importance.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Weight: {item.weight}</span>
                      <span>Last Asked: {item.lastExam}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Notes
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
