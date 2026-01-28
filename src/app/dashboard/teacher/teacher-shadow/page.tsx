"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Eye,
  TrendingUp,
  Clock,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
} from "lucide-react";

interface TeachingMetric {
  metric: string;
  score: number;
  trend: "up" | "down" | "stable";
  feedback: string;
}

export default function TeacherShadowPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const metrics: TeachingMetric[] = [
    {
      metric: "વર્ગ જોડાણ | Class Engagement",
      score: 87,
      trend: "up",
      feedback:
        "વિદ્યાર્થીઓ સક્રિય હતા, વધુ પ્રશ્નો પૂછ્યા | Students were active, asked more questions",
    },
    {
      metric: "સમય વ્યવસ્થાપન | Time Management",
      score: 92,
      trend: "up",
      feedback:
        "સારો સમય ફાળવણી, પરંતુ Q&A માટે વધુ સમય | Good allocation, but more time for Q&A",
    },
    {
      metric: "સામગ્રી સ્પષ્ટતા | Content Clarity",
      score: 78,
      trend: "down",
      feedback:
        "કેટલાક વિભાગો ઝડપથી આવરી લીધા | Some sections covered too quickly",
    },
    {
      metric: "વિદ્યાર્થી સમજ | Student Understanding",
      score: 85,
      trend: "stable",
      feedback:
        "મોટાભાગના વિદ્યાર્થીઓએ સમજી લીધું | Most students understood concepts",
    },
    {
      metric: "પ્રશ્ન જવાબ | Question Answering",
      score: 90,
      trend: "up",
      feedback: "સ્પષ્ટ અને વિગતવાર જવાબો | Clear and detailed answers",
    },
  ];

  const suggestions = [
    {
      title: "મંદ શીખનારાઓ પર ધ્યાન આપો | Focus on Slow Learners",
      description:
        "5 વિદ્યાર્થીઓને વધારાની મદદની જરૂર છે | 5 students need extra help",
      priority: "high",
    },
    {
      title: "દ્રશ્ય સહાયક ઉમેરો | Add Visual Aids",
      description:
        "જટિલ વિભાગો માટે વધુ આકૃતિઓ | More diagrams for complex sections",
      priority: "medium",
    },
    {
      title: "પ્રેક્ટિસ સમય વધારો | Increase Practice Time",
      description:
        "હાથથી પ્રેક્ટિસ માટે 10 મિનિટ વધારે | 10 more minutes for hands-on practice",
      priority: "medium",
    },
    {
      title: "ગ્રૂપ એક્ટિવિટી | Group Activity",
      description:
        "સહયોગી શિક્ષણ માટે જૂથ કાર્ય | Group work for collaborative learning",
      priority: "low",
    },
  ];

  const recentSessions = [
    {
      date: "આજે | Today",
      topic: "બીજગણિત | Algebra",
      duration: "45 મિનિટ | min",
      score: 87,
    },
    {
      date: "ગઈકાલે | Yesterday",
      topic: "ભૂગોળ | Geography",
      duration: "40 મિનિટ | min",
      score: 92,
    },
    {
      date: "2 દિવસ પહેલા | 2 days ago",
      topic: "રસાયણશાસ્ત્ર | Chemistry",
      duration: "50 મિનિટ | min",
      score: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              શિક્ષક પડછાયો | Teacher Shadow AI
            </h1>
            <p className="text-gray-600 mt-2">
              તમારી શિક્ષણ અસરકારકતા ટ્રેક કરો | Track your teaching
              effectiveness
            </p>
          </div>
          <Eye className="w-12 h-12 text-indigo-500" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "આજના સેશન | Today's Sessions",
              value: "4",
              icon: Clock,
              color: "indigo",
            },
            {
              label: "સરેરાશ સ્કોર | Avg Score",
              value: "87%",
              icon: Target,
              color: "purple",
            },
            {
              label: "કુલ વિદ્યાર્થીઓ | Total Students",
              value: "156",
              icon: Users,
              color: "pink",
            },
            {
              label: "સુધારો | Improvement",
              value: "+12%",
              icon: TrendingUp,
              color: "green",
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

        {/* Teaching Metrics */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" />
            શિક્ષણ મેટ્રિક્સ | Teaching Metrics
          </h2>
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-800">
                      {metric.metric}
                    </h3>
                    {metric.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                    {metric.trend === "down" && (
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                    )}
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">
                    {metric.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{metric.feedback}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Suggestions */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              AI સૂચનો | AI Suggestions
            </h2>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    {suggestion.priority === "high" && (
                      <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
                    )}
                    {suggestion.priority === "medium" && (
                      <MessageSquare className="w-5 h-5 text-yellow-500 mt-1" />
                    )}
                    {suggestion.priority === "low" && (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {suggestion.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Sessions */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-indigo-500" />
              તાજેતરના સેશન | Recent Sessions
            </h2>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-gradient-to-r from-indigo-50 to-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {session.date}
                    </span>
                    <span className="text-lg font-bold text-indigo-600">
                      {session.score}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {session.topic}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {session.duration}
                  </p>
                </motion.div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              બધા સેશન જુઓ | View All Sessions
            </Button>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
