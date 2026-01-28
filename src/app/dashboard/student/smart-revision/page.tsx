"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SmartRevisionEngine } from "@/components/shared";
import { RefreshCw, Calendar, Brain, TrendingUp } from "lucide-react";

export default function SmartRevisionPage() {
  const dueTopics = [
    {
      topic: "Integers",
      topicGu: "પૂર્ણાંકો",
      dueIn: "Today",
      priority: "High",
      lastReviewed: "7 days ago",
    },
    {
      topic: "Algebra Basics",
      topicGu: "બીજગણિત મૂળભૂત",
      dueIn: "Tomorrow",
      priority: "Medium",
      lastReviewed: "14 days ago",
    },
    {
      topic: "Triangles",
      topicGu: "ત્રિકોણ",
      dueIn: "3 days",
      priority: "Low",
      lastReviewed: "21 days ago",
    },
  ];

  const mockRevisionSchedule = dueTopics.map((t, i) => ({
    id: `revision-${i}`,
    topicId: `topic-${i}`,
    topicName: t.topic,
    scheduledDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
    priority: t.priority.toLowerCase() as "high" | "medium" | "low",
    completed: false,
    reviewCount: Math.floor(Math.random() * 5) + 1,
    retentionScore: Math.floor(Math.random() * 30) + 70,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            સ્માર્ટ રિવિઝન
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Smart Revision - AI-powered spaced repetition
          </p>
        </div>

        <SmartRevisionEngine revisionSchedule={mockRevisionSchedule} />

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Due for Revision
          </h2>
          <div className="space-y-3">
            {dueTopics.map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  topic.priority === "High"
                    ? "bg-red-50 border-red-200"
                    : topic.priority === "Medium"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {topic.topicGu}
                    </p>
                    <p className="text-sm text-gray-600">{topic.topic}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{topic.dueIn}</p>
                    <p className="text-xs text-gray-500">
                      {topic.lastReviewed}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Brain className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Forgetting Curve</p>
            <p className="text-lg font-semibold text-gray-900">
              Optimal timing
            </p>
          </Card>
          <Card className="p-6">
            <Calendar className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Next Review</p>
            <p className="text-lg font-semibold text-gray-900">Today, 5 PM</p>
          </Card>
          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Retention Rate</p>
            <p className="text-lg font-semibold text-gray-900">87%</p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
