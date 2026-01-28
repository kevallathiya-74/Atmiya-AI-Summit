"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Zap,
  TrendingDown,
} from "lucide-react";

interface RevisionTopic {
  id: string;
  topic: string;
  subject: string;
  priority: "high" | "medium" | "low";
  weaknessScore: number;
  lastCovered: string;
  studentsAffected: number;
  estimatedTime: string;
  reason: string;
}

export default function RevisionSuggesterPage() {
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const revisionTopics: RevisionTopic[] = [
    {
      id: "r1",
      topic: "ચતુર્ભુજ | Quadrilaterals",
      subject: "ગણિત | Mathematics",
      priority: "high",
      weaknessScore: 45,
      lastCovered: "3 weeks ago",
      studentsAffected: 67,
      estimatedTime: "2 periods",
      reason:
        "67% વિદ્યાર્થીઓએ ટેસ્ટમાં નબળું પ્રદર્શન | 67% students performed poorly in test",
    },
    {
      id: "r2",
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      subject: "વિજ્ઞાન | Science",
      priority: "high",
      weaknessScore: 52,
      lastCovered: "2 weeks ago",
      studentsAffected: 58,
      estimatedTime: "1.5 periods",
      reason: "મુખ્ય સંકલ્પનાઓમાં મૂંઝવણ | Confusion in key concepts",
    },
    {
      id: "r3",
      topic: "ક્રિયાપદો | Verbs",
      subject: "અંગ્રેજી | English",
      priority: "medium",
      weaknessScore: 68,
      lastCovered: "1 week ago",
      studentsAffected: 42,
      estimatedTime: "1 period",
      reason: "કાળ વપરાશમાં ભૂલો | Errors in tense usage",
    },
    {
      id: "r4",
      topic: "ભારતીય સંવિધાન | Indian Constitution",
      subject: "સામાજિક | Social Studies",
      priority: "medium",
      weaknessScore: 70,
      lastCovered: "4 weeks ago",
      studentsAffected: 35,
      estimatedTime: "2 periods",
      reason: "લાંબા સમયથી આવરી લેવાયું નથી | Not covered for long time",
    },
    {
      id: "r5",
      topic: "રાસાયણિક પ્રતિક્રિયાઓ | Chemical Reactions",
      subject: "વિજ્ઞાન | Science",
      priority: "low",
      weaknessScore: 78,
      lastCovered: "1 week ago",
      studentsAffected: 28,
      estimatedTime: "1 period",
      reason:
        "કેટલાક વિદ્યાર્થીઓને સમીકરણો સમજવામાં મુશ્કેલી | Some students struggle with equations",
    },
    {
      id: "r6",
      topic: "કવિતા વિશ્લેષણ | Poetry Analysis",
      subject: "ગુજરાતી | Gujarati",
      priority: "low",
      weaknessScore: 82,
      lastCovered: "5 days ago",
      studentsAffected: 22,
      estimatedTime: "1 period",
      reason:
        "ગહન અર્થ સમજવામાં મુશ્કેલી | Difficulty in understanding deeper meaning",
    },
  ];

  const filteredTopics =
    selectedPriority === "all"
      ? revisionTopics
      : revisionTopics.filter((t) => t.priority === selectedPriority);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Clock className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              પુનરાવર્તન સૂચક | Revision Suggester
            </h1>
            <p className="text-gray-600 mt-2">
              AI દ્વારા સૂચવેલ પુનરાવર્તન વિષયો | AI-suggested topics for
              revision
            </p>
          </div>
          <Brain className="w-12 h-12 text-orange-500" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "ઉચ્ચ પ્રાથમિકતા | High Priority",
              value: revisionTopics.filter((t) => t.priority === "high").length,
              icon: AlertTriangle,
              color: "red",
            },
            {
              label: "મધ્યમ પ્રાથમિકતા | Medium Priority",
              value: revisionTopics.filter((t) => t.priority === "medium")
                .length,
              icon: Clock,
              color: "yellow",
            },
            {
              label: "નીચી પ્રાથમિકતા | Low Priority",
              value: revisionTopics.filter((t) => t.priority === "low").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "કુલ પ્રભાવિત | Total Affected",
              value: revisionTopics.reduce(
                (acc, t) => acc + t.studentsAffected,
                0
              ),
              icon: Target,
              color: "orange",
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

        {/* Filter Controls */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700">
              ફિલ્ટર | Filter:
            </span>
            <div className="flex gap-2">
              {["all", "high", "medium", "low"].map((priority) => (
                <Button
                  key={priority}
                  variant={
                    selectedPriority === priority ? "default" : "outline"
                  }
                  onClick={() => setSelectedPriority(priority)}
                  className={
                    selectedPriority === priority
                      ? "bg-orange-500 hover:bg-orange-600"
                      : ""
                  }
                >
                  {priority === "all"
                    ? "બધા | All"
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Revision Topics */}
        <div className="space-y-4">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {topic.topic}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getPriorityColor(
                          topic.priority
                        )}`}
                      >
                        {getPriorityIcon(topic.priority)}
                        {topic.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {topic.subject}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        છેલ્લે આવરી લીધું | Last covered: {topic.lastCovered}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        અંદાજિત સમય | Est. time: {topic.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">
                      {topic.weaknessScore}%
                    </div>
                    <p className="text-xs text-gray-600">
                      નબળાઈ સ્કોર | Weakness
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200 mb-4">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        AI સૂચન કારણ | AI Suggestion Reason:
                      </p>
                      <p className="text-sm text-gray-700">{topic.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {topic.studentsAffected} વિદ્યાર્થીઓ પ્રભાવિત | students
                      affected
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      સામગ્રી | Content
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      શેડ્યૂલ કરો | Schedule
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            સંપૂર્ણ પુનરાવર્તન યોજના બનાવો | Create Complete Revision Plan
          </Button>
          <Button variant="outline" className="flex-1">
            પુનરાવર્તન રિપોર્ટ ડાઉનલોડ કરો | Download Revision Report
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
