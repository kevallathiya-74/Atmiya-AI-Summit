"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
  FileText,
} from "lucide-react";

interface SyllabusUnit {
  id: string;
  unit: string;
  topics: number;
  completed: number;
  inProgress: number;
  pending: number;
  deadline: string;
  status: "on-track" | "behind" | "ahead";
}

export default function SyllabusTrackerPage() {
  const [selectedBoard, setSelectedBoard] = useState<"GSEB" | "NCERT">("GSEB");
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const syllabusUnits: SyllabusUnit[] = [
    {
      id: "u1",
      unit: "સંખ્યા પદ્ધતિ | Number Systems",
      topics: 8,
      completed: 8,
      inProgress: 0,
      pending: 0,
      deadline: "15 Feb 2026",
      status: "ahead",
    },
    {
      id: "u2",
      unit: "બીજગણિત | Algebra",
      topics: 12,
      completed: 9,
      inProgress: 2,
      pending: 1,
      deadline: "28 Feb 2026",
      status: "on-track",
    },
    {
      id: "u3",
      unit: "ભૂમિતિ | Geometry",
      topics: 15,
      completed: 5,
      inProgress: 3,
      pending: 7,
      deadline: "15 Mar 2026",
      status: "behind",
    },
    {
      id: "u4",
      unit: "ત્રિકોણમિતિ | Trigonometry",
      topics: 10,
      completed: 2,
      inProgress: 1,
      pending: 7,
      deadline: "30 Mar 2026",
      status: "on-track",
    },
    {
      id: "u5",
      unit: "આંકડાશાસ્ત્ર | Statistics",
      topics: 8,
      completed: 0,
      inProgress: 0,
      pending: 8,
      deadline: "15 Apr 2026",
      status: "on-track",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "text-green-600 bg-green-50 border-green-300";
      case "on-track":
        return "text-blue-600 bg-blue-50 border-blue-300";
      case "behind":
        return "text-red-600 bg-red-50 border-red-300";
      default:
        return "text-gray-600 bg-gray-50 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ahead":
        return <TrendingUp className="w-4 h-4" />;
      case "on-track":
        return <Target className="w-4 h-4" />;
      case "behind":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalTopics = syllabusUnits.reduce((acc, unit) => acc + unit.topics, 0);
  const completedTopics = syllabusUnits.reduce(
    (acc, unit) => acc + unit.completed,
    0
  );
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              પાઠ્યક્રમ ટ્રેકર | Syllabus Tracker
            </h1>
            <p className="text-gray-600 mt-2">
              GSEB/NCERT પાઠ્યક્રમ પ્રગતિ | Track GSEB/NCERT syllabus progress
            </p>
          </div>
          <BookOpen className="w-12 h-12 text-blue-500" />
        </div>

        {/* Selection Controls */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                બોર્ડ | Board
              </label>
              <select
                value={selectedBoard}
                onChange={(e) =>
                  setSelectedBoard(e.target.value as "GSEB" | "NCERT")
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="GSEB">GSEB - Gujarat Board</option>
                <option value="NCERT">NCERT - National Board</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                વર્ગ | Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="8">8th Standard</option>
                <option value="9">9th Standard</option>
                <option value="10">10th Standard</option>
                <option value="11">11th Standard</option>
                <option value="12">12th Standard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                વિષય | Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Mathematics">ગણિત | Mathematics</option>
                <option value="Science">વિજ્ઞાન | Science</option>
                <option value="Social Science">
                  સામાજિક વિજ્ઞાન | Social Science
                </option>
                <option value="English">અંગ્રેજી | English</option>
                <option value="Gujarati">ગુજરાતી | Gujarati</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Overall Progress */}
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                એકંદર પ્રગતિ | Overall Progress
              </h2>
              <p className="text-blue-100">
                {completedTopics} of {totalTopics} વિષયો પૂર્ણ | topics
                completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold">{overallProgress}%</div>
              <p className="text-blue-100">પૂર્ણ | Complete</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 mt-4">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ એકમ | Total Units",
              value: syllabusUnits.length,
              icon: FileText,
              color: "blue",
            },
            {
              label: "પૂર્ણ | Completed",
              value: completedTopics,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "પ્રગતિમાં | In Progress",
              value: syllabusUnits.reduce((acc, u) => acc + u.inProgress, 0),
              icon: Clock,
              color: "yellow",
            },
            {
              label: "બાકી | Pending",
              value: syllabusUnits.reduce((acc, u) => acc + u.pending, 0),
              icon: AlertTriangle,
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

        {/* Unit-wise Progress */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" />
            એકમ-વાર પ્રગતિ | Unit-wise Progress
          </h2>
          <div className="space-y-4">
            {syllabusUnits.map((unit, index) => {
              const unitProgress = Math.round(
                (unit.completed / unit.topics) * 100
              );
              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">
                        {unit.unit}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {unit.completed}/{unit.topics} વિષયો પૂર્ણ | topics
                        completed
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(
                          unit.status
                        )}`}
                      >
                        {getStatusIcon(unit.status)}
                        {unit.status.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {unit.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${unitProgress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-2xl font-bold text-green-600">
                        {unit.completed}
                      </p>
                      <p className="text-xs text-gray-600">પૂર્ણ | Done</p>
                    </div>
                    <div className="text-center p-2 bg-yellow-50 rounded">
                      <p className="text-2xl font-bold text-yellow-600">
                        {unit.inProgress}
                      </p>
                      <p className="text-xs text-gray-600">
                        પ્રગતિમાં | Ongoing
                      </p>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded">
                      <p className="text-2xl font-bold text-red-600">
                        {unit.pending}
                      </p>
                      <p className="text-xs text-gray-600">બાકી | Pending</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            વિગતવાર રિપોર્ટ ડાઉનલોડ કરો | Download Detailed Report
          </Button>
          <Button variant="outline" className="flex-1">
            સમયપત્રક શેર કરો | Share Schedule
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
