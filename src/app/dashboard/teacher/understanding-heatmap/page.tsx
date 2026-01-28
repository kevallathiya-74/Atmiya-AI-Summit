"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Map,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Target,
  Users,
  Thermometer,
} from "lucide-react";

interface TopicUnderstanding {
  topic: string;
  subject: string;
  understanding: number;
  studentsStruggling: number;
  studentsExcelling: number;
  studentsAverage: number;
  status: "excellent" | "good" | "needs-attention" | "critical";
}

export default function UnderstandingHeatmapPage() {
  const topics: TopicUnderstanding[] = [
    {
      topic: "બીજગણિત | Algebra",
      subject: "ગણિત | Mathematics",
      understanding: 85,
      studentsStruggling: 8,
      studentsExcelling: 25,
      studentsAverage: 12,
      status: "excellent",
    },
    {
      topic: "ભૂમિતિ | Geometry",
      subject: "ગણિત | Mathematics",
      understanding: 72,
      studentsStruggling: 15,
      studentsExcelling: 18,
      studentsAverage: 12,
      status: "good",
    },
    {
      topic: "ત્રિકોણમિતિ | Trigonometry",
      subject: "ગણિત | Mathematics",
      understanding: 58,
      studentsStruggling: 22,
      studentsExcelling: 10,
      studentsAverage: 13,
      status: "needs-attention",
    },
    {
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      subject: "વિજ્ઞાન | Science",
      understanding: 88,
      studentsStruggling: 5,
      studentsExcelling: 30,
      studentsAverage: 10,
      status: "excellent",
    },
    {
      topic: "રાસાયણિક પ્રતિક્રિયાઓ | Chemical Reactions",
      subject: "વિજ્ઞાન | Science",
      understanding: 68,
      studentsStruggling: 18,
      studentsExcelling: 15,
      studentsAverage: 12,
      status: "good",
    },
    {
      topic: "વિદ્યુત | Electricity",
      subject: "વિજ્ઞાન | Science",
      understanding: 45,
      studentsStruggling: 28,
      studentsExcelling: 7,
      studentsAverage: 10,
      status: "critical",
    },
    {
      topic: "Grammar (Tenses)",
      subject: "અંગ્રેજી | English",
      understanding: 65,
      studentsStruggling: 20,
      studentsExcelling: 12,
      studentsAverage: 13,
      status: "needs-attention",
    },
    {
      topic: "સંવિધાન | Constitution",
      subject: "સામાજિક | Social",
      understanding: 78,
      studentsStruggling: 10,
      studentsExcelling: 22,
      studentsAverage: 13,
      status: "good",
    },
  ];

  const getStatusColor = (
    status: string,
    type: "bg" | "text" | "border" = "bg"
  ) => {
    const colors = {
      excellent: {
        bg: "bg-green-500",
        text: "text-green-700",
        border: "border-green-300",
        light: "bg-green-50",
      },
      good: {
        bg: "bg-blue-500",
        text: "text-blue-700",
        border: "border-blue-300",
        light: "bg-blue-50",
      },
      "needs-attention": {
        bg: "bg-yellow-500",
        text: "text-yellow-700",
        border: "border-yellow-300",
        light: "bg-yellow-50",
      },
      critical: {
        bg: "bg-red-500",
        text: "text-red-700",
        border: "border-red-300",
        light: "bg-red-50",
      },
    };
    return colors[status as keyof typeof colors]?.[type] || colors.good[type];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "good":
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case "needs-attention":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "critical":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const avgUnderstanding = Math.round(
    topics.reduce((acc, t) => acc + t.understanding, 0) / topics.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              સમજ હીટમેપ | Understanding Heatmap
            </h1>
            <p className="text-gray-600 mt-2">
              વર્ગ સમજનું દ્રશ્ય નકશો | Visual heatmap of class understanding
            </p>
          </div>
          <Map className="w-12 h-12 text-blue-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "સરેરાશ સમજ | Avg Understanding",
              value: `${avgUnderstanding}%`,
              icon: Target,
              color: "blue",
            },
            {
              label: "ઉત્તમ | Excellent",
              value: topics.filter((t) => t.status === "excellent").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "ધ્યાન જરૂર | Needs Attention",
              value: topics.filter((t) => t.status === "needs-attention")
                .length,
              icon: AlertCircle,
              color: "yellow",
            },
            {
              label: "જટિલ | Critical",
              value: topics.filter((t) => t.status === "critical").length,
              icon: TrendingDown,
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

        {/* Heatmap Grid */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-blue-500" />
            વિષય સમજ હીટમેપ | Topic Understanding Heatmap
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer"
              >
                <div
                  className={`p-4 rounded-lg ${getStatusColor(
                    topic.status,
                    "bg"
                  )} bg-opacity-20 border-2 ${getStatusColor(
                    topic.status,
                    "border"
                  )} hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">
                      {topic.subject}
                    </span>
                    {getStatusIcon(topic.status)}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">
                    {topic.topic}
                  </h3>
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{
                        color:
                          topic.understanding >= 80
                            ? "#10b981"
                            : topic.understanding >= 65
                            ? "#3b82f6"
                            : topic.understanding >= 50
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {topic.understanding}%
                    </div>
                    <p className="text-xs text-gray-600">સમજ | Understanding</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Detailed Topic Analysis */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-teal-500" />
            વિગતવાર વિષય વિશ્લેષણ | Detailed Topic Analysis
          </h2>
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {topic.topic}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(
                          topic.status,
                          "bg"
                        )} ${getStatusColor(
                          topic.status,
                          "text"
                        )} ${getStatusColor(
                          topic.status,
                          "border"
                        )} bg-opacity-20`}
                      >
                        {getStatusIcon(topic.status)}
                        {topic.status.toUpperCase().replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{topic.subject}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-3xl font-bold"
                      style={{
                        color:
                          topic.understanding >= 80
                            ? "#10b981"
                            : topic.understanding >= 65
                            ? "#3b82f6"
                            : topic.understanding >= 50
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {topic.understanding}%
                    </div>
                    <p className="text-xs text-gray-600">એકંદર સમજ | Overall</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${topic.understanding}%`,
                      backgroundColor:
                        topic.understanding >= 80
                          ? "#10b981"
                          : topic.understanding >= 65
                          ? "#3b82f6"
                          : topic.understanding >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <Users className="w-5 h-5 text-red-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-red-600">
                      {topic.studentsStruggling}
                    </p>
                    <p className="text-xs text-gray-600">
                      સંઘર્ષ કરી રહ્યા | Struggling
                    </p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Users className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-yellow-600">
                      {topic.studentsAverage}
                    </p>
                    <p className="text-xs text-gray-600">સરેરાશ | Average</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-green-600">
                      {topic.studentsExcelling}
                    </p>
                    <p className="text-xs text-gray-600">ઉત્તમ | Excelling</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    વિગતવાર જુઓ | View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                  >
                    સુધારણા યોજના | Remedial Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            સંપૂર્ણ હીટમેપ રિપોર્ટ | Complete Heatmap Report
          </Button>
          <Button variant="outline" className="flex-1">
            એક્સપોર્ટ કરો | Export Data
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
