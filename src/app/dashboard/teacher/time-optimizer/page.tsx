"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";

interface TimeSlot {
  period: string;
  subject: string;
  class: string;
  duration: number;
  efficiency: number;
  recommendation: string;
}

export default function TimeOptimizerPage() {
  const [selectedDay, setSelectedDay] = useState("monday");

  const currentSchedule: TimeSlot[] = [
    {
      period: "9:00 - 9:45",
      subject: "ગણિત | Mathematics",
      class: "10-A",
      duration: 45,
      efficiency: 92,
      recommendation: "આદર્શ સમય | Ideal time for complex topics",
    },
    {
      period: "9:45 - 10:30",
      subject: "વિજ્ઞાન | Science",
      class: "10-B",
      duration: 45,
      efficiency: 88,
      recommendation: "સારો જોડાણ સમય | Good engagement time",
    },
    {
      period: "10:50 - 11:35",
      subject: "અંગ્રેજી | English",
      class: "9-A",
      duration: 45,
      efficiency: 75,
      recommendation: "બ્રેક પછી ધીમો શરૂઆત | Slow start after break",
    },
    {
      period: "11:35 - 12:20",
      subject: "સામાજિક | Social",
      class: "9-B",
      duration: 45,
      efficiency: 68,
      recommendation: "લંચ પહેલાં ઓછું ધ્યાન | Low attention before lunch",
    },
    {
      period: "1:00 - 1:45",
      subject: "ગણિત | Mathematics",
      class: "8-A",
      duration: 45,
      efficiency: 62,
      recommendation: "લંચ પછી એનર્જી ઓછી | Low energy after lunch",
    },
    {
      period: "1:45 - 2:30",
      subject: "વિજ્ઞાન | Science",
      class: "8-B",
      duration: 45,
      efficiency: 70,
      recommendation: "સુધરેલું ધ્યાન | Improved attention",
    },
  ];

  const optimizedSchedule: TimeSlot[] = [
    {
      period: "9:00 - 9:45",
      subject: "ગણિત | Mathematics",
      class: "10-A",
      duration: 45,
      efficiency: 92,
      recommendation: "યથાવત | Keep as is",
    },
    {
      period: "9:45 - 10:30",
      subject: "ગણિત | Mathematics",
      class: "8-A",
      duration: 45,
      efficiency: 89,
      recommendation: "સવારે ખસેડવું | Move to morning",
    },
    {
      period: "10:50 - 11:35",
      subject: "વિજ્ઞાન | Science",
      class: "10-B",
      duration: 45,
      efficiency: 85,
      recommendation: "સુધરેલું સમય | Improved slot",
    },
    {
      period: "11:35 - 12:20",
      subject: "અંગ્રેજી | English",
      class: "9-A",
      duration: 45,
      efficiency: 78,
      recommendation: "હળવા વિષય | Lighter subject",
    },
    {
      period: "1:00 - 1:45",
      subject: "સામાજિક | Social",
      class: "9-B",
      duration: 45,
      efficiency: 75,
      recommendation: "ચર્ચા આધારિત | Discussion-based",
    },
    {
      period: "1:45 - 2:30",
      subject: "વિજ્ઞાન | Science",
      class: "8-B",
      duration: 45,
      efficiency: 72,
      recommendation: "પ્રેક્ટિકલ સેશન | Practical session",
    },
  ];

  const suggestions = [
    {
      title:
        "સવારની પીરિયડ્સમાં જટિલ વિષયો | Complex topics in morning periods",
      impact: "+15% efficiency",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "લંચ પછી ઇન્ટરેક્ટિવ સેશન | Interactive sessions after lunch",
      impact: "+12% engagement",
      icon: Zap,
      color: "blue",
    },
    {
      title: "બ્રેક પછી હળવા વિષયો | Lighter subjects after breaks",
      impact: "+8% attention",
      icon: Target,
      color: "purple",
    },
    {
      title:
        "એક જ વર્ગ માટે સતત પીરિયડ ટાળો | Avoid consecutive periods for same class",
      impact: "+10% retention",
      icon: AlertCircle,
      color: "orange",
    },
  ];

  const avgEfficiency =
    currentSchedule.reduce((acc, slot) => acc + slot.efficiency, 0) /
    currentSchedule.length;
  const optimizedAvg =
    optimizedSchedule.reduce((acc, slot) => acc + slot.efficiency, 0) /
    optimizedSchedule.length;
  const improvement = Math.round(optimizedAvg - avgEfficiency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              સમય ઑપ્ટિમાઇઝર | Time Optimizer
            </h1>
            <p className="text-gray-600 mt-2">
              શિક્ષણ શેડ્યૂલ ઑપ્ટિમાઇઝ કરો | Optimize teaching schedule and time
              allocation
            </p>
          </div>
          <Clock className="w-12 h-12 text-cyan-500" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "વર્તમાન કાર્યક્ષમતા | Current Efficiency",
              value: `${Math.round(avgEfficiency)}%`,
              icon: BarChart3,
              color: "cyan",
            },
            {
              label: "ઑપ્ટિમાઇઝ્ડ કાર્યક્ષમતા | Optimized Efficiency",
              value: `${Math.round(optimizedAvg)}%`,
              icon: TrendingUp,
              color: "green",
            },
            {
              label: "સુધારો | Improvement",
              value: `+${improvement}%`,
              icon: Zap,
              color: "blue",
            },
            {
              label: "કુલ પીરિયડ્સ | Total Periods",
              value: currentSchedule.length,
              icon: Calendar,
              color: "indigo",
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

        {/* AI Suggestions */}
        <Card className="p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            AI સૂચનો | AI Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <div className="flex items-start gap-3">
                  <suggestion.icon className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-cyan-100">{suggestion.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Schedule */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gray-500" />
              વર્તમાન શેડ્યૂલ | Current Schedule
            </h2>
            <div className="space-y-3">
              {currentSchedule.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {slot.period}
                      </p>
                      <p className="text-sm text-gray-600">
                        {slot.subject} - {slot.class}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          slot.efficiency >= 80
                            ? "text-green-600"
                            : slot.efficiency >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {slot.efficiency}%
                      </div>
                      <p className="text-xs text-gray-600">
                        {slot.duration} min
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {slot.recommendation}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className={`h-1.5 rounded-full ${
                        slot.efficiency >= 80
                          ? "bg-green-500"
                          : slot.efficiency >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${slot.efficiency}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Optimized Schedule */}
          <Card className="p-6 border-2 border-cyan-500">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-500" />
              ઑપ્ટિમાઇઝ્ડ શેડ્યૂલ | Optimized Schedule
            </h2>
            <div className="space-y-3">
              {optimizedSchedule.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-gradient-to-r from-cyan-50 to-blue-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {slot.period}
                      </p>
                      <p className="text-sm text-gray-600">
                        {slot.subject} - {slot.class}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {slot.efficiency}%
                      </div>
                      <p className="text-xs text-gray-600">
                        {slot.duration} min
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {slot.recommendation}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${slot.efficiency}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            ઑપ્ટિમાઇઝ્ડ શેડ્યૂલ લાગુ કરો | Apply Optimized Schedule
          </Button>
          <Button variant="outline" className="flex-1">
            શેડ્યૂલ ડાઉનલોડ કરો | Download Schedule
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
