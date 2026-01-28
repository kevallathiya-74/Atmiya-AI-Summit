"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ExamReadinessCard } from "@/components/shared";
import { CheckCircle2, AlertTriangle, TrendingUp, Target } from "lucide-react";

export default function ExamReadinessPage() {
  const subjects = [
    {
      subject: "Mathematics",
      subjectGu: "ગણિત",
      readiness: 85,
      status: "Good",
    },
    {
      subject: "Science",
      subjectGu: "વિજ્ઞાન",
      readiness: 72,
      status: "Moderate",
    },
    {
      subject: "English",
      subjectGu: "અંગ્રેજી",
      readiness: 65,
      status: "Needs Work",
    },
  ];

  const mockExamReadiness = {
    overallReadiness: 78,
    percentage: 78,
    strongAreas: ["Mathematics", "Science"],
    weakAreas: ["English"],
    recommendedFocus: ["Grammar", "Vocabulary"],
    subjects: subjects.map((sub) => ({
      subjectName: sub.subject,
      readiness: sub.readiness,
      lastPracticeDate: new Date().toISOString(),
    })),
    upcomingExam: {
      examName: "Mid-term Exam",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      daysLeft: 7,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            પરીક્ષા તૈયારી
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Exam Readiness - Track your exam preparation
          </p>
        </div>

        <ExamReadinessCard examReadiness={mockExamReadiness} />

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subject-wise Readiness</h2>
          <div className="space-y-4">
            {subjects.map((sub, idx) => (
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      sub.status === "Good"
                        ? "bg-green-100 text-green-700"
                        : sub.status === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      sub.readiness >= 80
                        ? "bg-gradient-to-r from-green-500 to-teal-500"
                        : sub.readiness >= 70
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-red-500 to-pink-500"
                    }`}
                    style={{ width: `${sub.readiness}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {sub.readiness}% Ready
                </p>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Topics Mastered</p>
            <p className="text-2xl font-bold text-gray-900">18 / 24</p>
          </Card>
          <Card className="p-6">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Weak Areas</p>
            <p className="text-2xl font-bold text-gray-900">4</p>
          </Card>
          <Card className="p-6">
            <Target className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Days to Exam</p>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
