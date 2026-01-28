"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Play,
  Pause,
  Square,
  Users,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  BookOpen,
  Lightbulb,
  Timer,
} from "lucide-react";

export default function ClassroomModePage() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("introduction");

  const sessionData = {
    subject: "ગણિત | Mathematics",
    topic: "સમીકરણો | Equations",
    class: "10-A",
    duration: 45,
    studentsPresent: 42,
    studentsTotal: 45,
  };

  const phases = [
    {
      id: "introduction",
      label: "પરિચય | Introduction",
      duration: 5,
      icon: BookOpen,
      color: "blue",
    },
    {
      id: "teaching",
      label: "શિક્ષણ | Teaching",
      duration: 20,
      icon: Target,
      color: "purple",
    },
    {
      id: "practice",
      label: "પ્રેક્ટિસ | Practice",
      duration: 12,
      icon: Lightbulb,
      color: "green",
    },
    {
      id: "qa",
      label: "પ્રશ્નોત્તર | Q&A",
      duration: 5,
      icon: MessageSquare,
      color: "orange",
    },
    {
      id: "conclusion",
      label: "નિષ્કર્ષ | Conclusion",
      duration: 3,
      icon: CheckCircle,
      color: "cyan",
    },
  ];

  const liveMetrics = [
    { label: "ધ્યાન સ્તર | Attention Level", value: 87, status: "good" },
    { label: "સમજ સ્તર | Understanding Level", value: 78, status: "good" },
    {
      label: "સક્રિય ભાગીદારી | Active Participation",
      value: 65,
      status: "moderate",
    },
    { label: "પ્રશ્નો પૂછ્યા | Questions Asked", value: 12, status: "good" },
  ];

  const quickActions = [
    { label: "હાજરી લો | Take Attendance", icon: Users, color: "blue" },
    { label: "પોલ શરૂ કરો | Start Poll", icon: Target, color: "green" },
    { label: "નોંધ શેર કરો | Share Notes", icon: BookOpen, color: "purple" },
    {
      label: "અસાઇનમેન્ટ આપો | Give Assignment",
      icon: CheckCircle,
      color: "orange",
    },
  ];

  const alerts = [
    {
      type: "info",
      message: "5 વિદ્યાર્થીઓ મૂંઝવણમાં લાગે છે | 5 students seem confused",
      icon: AlertCircle,
    },
    {
      type: "success",
      message:
        "રવિ પટેલે ઉત્તમ પ્રશ્ન પૂછ્યો | Ravi Patel asked excellent question",
      icon: CheckCircle,
    },
    {
      type: "warning",
      message: "સમય 60% પસાર થયો | 60% time elapsed",
      icon: Clock,
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
              વર્ગ મોડ | Classroom Mode
            </h1>
            <p className="text-gray-600 mt-2">
              એક પીરિયડ કેન્દ્રિત શિક્ષણ ઇન્ટરફેસ | Single period focused
              teaching interface
            </p>
          </div>
          <div className="flex gap-3">
            {!isSessionActive ? (
              <Button
                onClick={() => setIsSessionActive(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Play className="w-5 h-5 mr-2" />
                સેશન શરૂ કરો | Start Session
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsSessionActive(false)}
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  વિરામ | Pause
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsSessionActive(false)}
                  className="border-red-500 text-red-600 hover:bg-red-50"
                >
                  <Square className="w-5 h-5 mr-2" />
                  સમાપ્ત કરો | End
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Session Info */}
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <p className="text-indigo-100 text-sm mb-1">વિષય | Subject</p>
              <p className="text-xl font-bold">{sessionData.subject}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">વિષયવસ્તુ | Topic</p>
              <p className="text-xl font-bold">{sessionData.topic}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">વર્ગ | Class</p>
              <p className="text-xl font-bold">{sessionData.class}</p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">હાજરી | Attendance</p>
              <p className="text-xl font-bold">
                {sessionData.studentsPresent}/{sessionData.studentsTotal}
              </p>
            </div>
            <div>
              <p className="text-indigo-100 text-sm mb-1">સમય | Duration</p>
              <p className="text-xl font-bold">
                {sessionData.duration} મિનિટ | min
              </p>
            </div>
          </div>
        </Card>

        {/* Timer and Phase Tracker */}
        {isSessionActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Timer className="w-8 h-8 text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-600">
                      વીતેલો સમય | Elapsed Time
                    </p>
                    <p className="text-3xl font-bold text-gray-800">
                      {Math.floor(elapsedTime / 60)}:
                      {(elapsedTime % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    વર્તમાન તબક્કો | Current Phase
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {phases.find((p) => p.id === currentPhase)?.label}
                  </p>
                </div>
              </div>

              {/* Phase Progress */}
              <div className="space-y-2">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="flex items-center gap-3">
                    <phase.icon className={`w-5 h-5 text-${phase.color}-500`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {phase.label}
                        </span>
                        <span className="text-xs text-gray-600">
                          {phase.duration} મિનિટ | min
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-${
                            phase.color
                          }-400 to-${
                            phase.color
                          }-600 transition-all duration-500 ${
                            currentPhase === phase.id ? "animate-pulse" : ""
                          }`}
                          style={{
                            width: currentPhase === phase.id ? "60%" : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Metrics */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-500" />
              લાઇવ મેટ્રિક્સ | Live Metrics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {liveMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border"
                >
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-gray-800">
                      {typeof metric.value === "number" &&
                      metric.label.includes("Level")
                        ? `${metric.value}%`
                        : metric.value}
                    </p>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metric.status === "good"
                          ? "bg-green-500"
                          : metric.status === "moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                  {typeof metric.value === "number" &&
                    metric.label.includes("Level") && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className={`h-1.5 rounded-full ${
                            metric.status === "good"
                              ? "bg-green-500"
                              : metric.status === "moderate"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                    )}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Alerts */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              ચેતવણીઓ | Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    alert.type === "success"
                      ? "bg-green-50 border-green-300"
                      : alert.type === "warning"
                      ? "bg-yellow-50 border-yellow-300"
                      : "bg-blue-50 border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <alert.icon
                      className={`w-5 h-5 mt-0.5 ${
                        alert.type === "success"
                          ? "text-green-600"
                          : alert.type === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            ઝડપી ક્રિયાઓ | Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto flex-col gap-2 py-4 hover:shadow-md"
                >
                  <action.icon className={`w-8 h-8 text-${action.color}-500`} />
                  <span className="text-sm">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
