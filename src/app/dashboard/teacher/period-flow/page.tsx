"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Users,
  Target,
} from "lucide-react";

export default function PeriodFlowPage() {
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [isPeriodActive, setIsPeriodActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const periods = [
    {
      id: 1,
      subject: "Mathematics",
      class: "10-A",
      time: "9:00 - 9:45",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Science",
      class: "10-B",
      time: "10:00 - 10:45",
      status: "upcoming",
    },
    {
      id: 3,
      subject: "Mathematics",
      class: "9-A",
      time: "11:00 - 11:45",
      status: "upcoming",
    },
    {
      id: 4,
      subject: "English",
      class: "10-A",
      time: "12:00 - 12:45",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Period-wise Teaching Flow
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your daily teaching schedule
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current Period</h2>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Clock className="w-4 h-4" />
                {Math.floor(timeElapsed / 60)}:
                {(timeElapsed % 60).toString().padStart(2, "0")}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    Mathematics
                  </h3>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                    Period {currentPeriod}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Class 10-A • 9:00 - 9:45
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Topic: Quadratic Equations
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsPeriodActive(!isPeriodActive)}
                  className="flex-1"
                  variant={isPeriodActive ? "destructive" : "default"}
                >
                  {isPeriodActive ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Period
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Period
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Attendance</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="w-5 h-5 mb-1" />
                <span className="text-xs">Lesson Plan</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Target className="w-5 h-5 mb-1" />
                <span className="text-xs">Quiz</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <AlertCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">Doubts</span>
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {periods.map((period) => (
                <motion.div
                  key={period.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: period.id * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    period.id === currentPeriod
                      ? "bg-blue-50 border-blue-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {period.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        {period.class} • {period.time}
                      </p>
                    </div>
                    <div className="text-right">
                      {period.id < currentPeriod && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                      {period.id === currentPeriod && (
                        <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>
    </div>
  );
}
