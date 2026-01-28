"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  AlertCircle,
  BarChart3,
  LineChart,
} from "lucide-react";

interface StudentPerformance {
  name: string;
  trend: "improving" | "declining" | "stable";
  currentScore: number;
  previousScore: number;
  change: number;
}

export default function PerformanceTrendsPage() {
  const classAverage = [
    { month: "સપ્ટેમ્બર | Sep", score: 72 },
    { month: "ઓક્ટોબર | Oct", score: 75 },
    { month: "નવેમ્બર | Nov", score: 78 },
    { month: "ડિસેમ્બર | Dec", score: 81 },
    { month: "જાન્યુઆરી | Jan", score: 84 },
  ];

  const topPerformers: StudentPerformance[] = [
    {
      name: "રવિ પટેલ | Ravi Patel",
      trend: "improving",
      currentScore: 95,
      previousScore: 88,
      change: 7,
    },
    {
      name: "પ્રિયા શાહ | Priya Shah",
      trend: "improving",
      currentScore: 93,
      previousScore: 90,
      change: 3,
    },
    {
      name: "અમિત દવે | Amit Dave",
      trend: "stable",
      currentScore: 92,
      previousScore: 92,
      change: 0,
    },
  ];

  const needsAttention: StudentPerformance[] = [
    {
      name: "રાજ વર્મા | Raj Verma",
      trend: "declining",
      currentScore: 58,
      previousScore: 68,
      change: -10,
    },
    {
      name: "નિશા મહેતા | Nisha Mehta",
      trend: "declining",
      currentScore: 62,
      previousScore: 70,
      change: -8,
    },
    {
      name: "કરણ શુક્લા | Karan Shukla",
      trend: "stable",
      currentScore: 65,
      previousScore: 65,
      change: 0,
    },
  ];

  const subjectTrends = [
    { subject: "ગણિત | Math", current: 78, previous: 72, trend: "up" },
    { subject: "વિજ્ઞાન | Science", current: 82, previous: 85, trend: "down" },
    { subject: "અંગ્રેજી | English", current: 75, previous: 74, trend: "up" },
    { subject: "સામાજિક | Social", current: 80, previous: 78, trend: "up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              પ્રદર્શન વલણ | Performance Trends
            </h1>
            <p className="text-gray-600 mt-2">
              સમયાંતરે વિદ્યાર્થી પ્રદર્શન વિશ્લેષણ | Student performance
              analytics over time
            </p>
          </div>
          <BarChart3 className="w-12 h-12 text-green-500" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "વર્ગ સરેરાશ | Class Average",
              value: "84%",
              change: "+12%",
              icon: Target,
              color: "green",
            },
            {
              label: "કુલ વિદ્યાર્થીઓ | Total Students",
              value: "156",
              change: "+8",
              icon: Users,
              color: "blue",
            },
            {
              label: "સુધારા | Improving",
              value: "89",
              change: "+15",
              icon: TrendingUp,
              color: "emerald",
            },
            {
              label: "ધ્યાન આપવું | Need Attention",
              value: "23",
              change: "-5",
              icon: AlertCircle,
              color: "red",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                  <span
                    className={`text-sm font-semibold ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Class Average Trend */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <LineChart className="w-6 h-6 text-blue-500" />
            વર્ગ સરેરાશ વલણ | Class Average Trend
          </h2>
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-around gap-2">
              {classAverage.map((data, index) => {
                const height = (data.score / 100) * 100;
                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex-1 bg-gradient-to-t from-blue-500 to-green-500 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-semibold">
                        {data.score}%
                      </span>
                    </div>
                    <div className="absolute -bottom-16 left-0 right-0 text-center">
                      <p className="text-xs text-gray-600 whitespace-nowrap">
                        {data.month}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">
                +12% improvement since સપ્ટેમ્બર | September
              </span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              ટોચ પ્રદર્શન | Top Performers
            </h2>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">
                        +{student.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      પૂર્વ | Previous: {student.previousScore}%
                    </span>
                    <span className="text-gray-800 font-semibold">
                      વર્તમાન | Current: {student.currentScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${student.currentScore}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Needs Attention */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              ધ્યાન આપવાની જરૂર | Needs Attention
            </h2>
            <div className="space-y-3">
              {needsAttention.map((student, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {student.trend === "declining" && (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-semibold">
                            {student.change}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      પૂર્વ | Previous: {student.previousScore}%
                    </span>
                    <span className="text-gray-800 font-semibold">
                      વર્તમાન | Current: {student.currentScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${student.currentScore}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Subject-wise Trends */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            વિષય-વાર વલણ | Subject-wise Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectTrends.map((subject, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
                    {subject.subject}
                  </h3>
                  {subject.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    પૂર્વ | Previous: {subject.previous}%
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {subject.current}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      subject.trend === "up"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-red-500 to-orange-500"
                    }`}
                    style={{ width: `${subject.current}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            વિગતવાર રિપોર્ટ ડાઉનલોડ કરો | Download Detailed Report
          </Button>
          <Button variant="outline" className="flex-1">
            મુખ્ય સાથે શેર કરો | Share with Principal
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
