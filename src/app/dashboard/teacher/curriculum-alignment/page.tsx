"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Target,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react";

interface CurriculumTopic {
  topic: string;
  standard: string;
  alignment: number;
  status: "aligned" | "partial" | "not-aligned";
  suggestions: string[];
}

export default function CurriculumAlignmentPage() {
  const topics: CurriculumTopic[] = [
    {
      topic: "બીજગણિત પાયાની સંકલ્પનાઓ | Algebraic fundamentals",
      standard: "GSEB Std 10 Math - Chapter 3",
      alignment: 95,
      status: "aligned",
      suggestions: [],
    },
    {
      topic: "ભૂમિતિ પ્રમેય | Geometry theorems",
      standard: "GSEB Std 10 Math - Chapter 4",
      alignment: 88,
      status: "aligned",
      suggestions: ["વધુ ઉદાહરણો ઉમેરો | Add more examples"],
    },
    {
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      standard: "GSEB Std 10 Science - Chapter 2",
      alignment: 72,
      status: "partial",
      suggestions: [
        "પ્રયોગો ઉમેરો | Add experiments",
        "વધુ આકૃતિઓ | More diagrams needed",
      ],
    },
    {
      topic: "વિદ્યુત પ્રવાહ | Electric current",
      standard: "GSEB Std 10 Science - Chapter 5",
      alignment: 65,
      status: "partial",
      suggestions: [
        "વ્યવહારિક ઉદાહરણો | Practical examples needed",
        "સલામતી સૂચનાઓ | Safety instructions required",
      ],
    },
    {
      topic: "Grammar advanced concepts",
      standard: "GSEB Std 10 English - Unit 3",
      alignment: 58,
      status: "partial",
      suggestions: [
        "વધુ પ્રેક્ટિસ સામગ્રી | More practice material",
        "વિગતવાર સમજૂતીઓ | Detailed explanations",
      ],
    },
    {
      topic: "કવિતા વિશ્લેષણ | Poetry analysis",
      standard: "GSEB Std 10 Gujarati - Chapter 7",
      alignment: 42,
      status: "not-aligned",
      suggestions: [
        "અભ્યાસક્રમ અનુસાર કવિતાઓ | Curriculum prescribed poems",
        "વિશ્લેષણ ફોર્મેટ સુધારો | Improve analysis format",
        "સંદર્ભ સામગ્રી | Reference material needed",
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aligned":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "not-aligned":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aligned":
        return "bg-green-100 text-green-700 border-green-300";
      case "partial":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "not-aligned":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const avgAlignment = Math.round(
    topics.reduce((acc, t) => acc + t.alignment, 0) / topics.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              અભ્યાસક્રમ સંરેખણ | Curriculum Alignment
            </h1>
            <p className="text-gray-600 mt-2">
              સામગ્રી અભ્યાસક્રમ સાથે તપાસો | Check content alignment with
              curriculum
            </p>
          </div>
          <BookOpen className="w-12 h-12 text-emerald-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "સરેરાશ સંરેખણ | Avg Alignment",
              value: `${avgAlignment}%`,
              icon: Target,
              color: "emerald",
            },
            {
              label: "સંરેખિત | Aligned",
              value: topics.filter((t) => t.status === "aligned").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "આંશિક | Partial",
              value: topics.filter((t) => t.status === "partial").length,
              icon: AlertCircle,
              color: "yellow",
            },
            {
              label: "અસંરેખિત | Not Aligned",
              value: topics.filter((t) => t.status === "not-aligned").length,
              icon: XCircle,
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

        {/* Overall Alignment Score */}
        <Card className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                એકંદર અભ્યાસક્રમ સંરેખણ | Overall Curriculum Alignment
              </h2>
              <p className="text-emerald-100">
                GSEB અભ્યાસક્રમ 2025-26 સાથે | With GSEB Curriculum 2025-26
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold">{avgAlignment}%</div>
              <p className="text-emerald-100">સંરેખિત | Aligned</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 mt-4">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${avgAlignment}%` }}
            />
          </div>
        </Card>

        {/* Topic-wise Alignment */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            વિષય-વાર સંરેખણ | Topic-wise Alignment
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
                          topic.status
                        )}`}
                      >
                        {getStatusIcon(topic.status)}
                        {topic.status.toUpperCase().replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-semibold">માનક | Standard:</span>{" "}
                      {topic.standard}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-4xl font-bold"
                      style={{
                        color:
                          topic.alignment >= 80
                            ? "#10b981"
                            : topic.alignment >= 60
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {topic.alignment}%
                    </div>
                    <p className="text-xs text-gray-600">સંરેખણ | Alignment</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${topic.alignment}%`,
                      backgroundColor:
                        topic.alignment >= 80
                          ? "#10b981"
                          : topic.alignment >= 60
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  />
                </div>

                {topic.suggestions.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          સુધારણા માટે સૂચનો | Suggestions for Improvement:
                        </p>
                        <ul className="space-y-1">
                          {topic.suggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-yellow-600 mt-1">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    અભ્યાસક્રમ જુઓ | View Curriculum
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    સંરેખણ સુધારો | Improve Alignment
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Curriculum Standards Reference */}
        <Card className="p-6 border-2 border-emerald-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-500" />
            અભ્યાસક્રમ માનક સંદર્ભ | Curriculum Standards Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                board: "GSEB",
                subjects:
                  "ગણિત, વિજ્ઞાન, અંગ્રેજી, ગુજરાતી | Math, Science, English, Gujarati",
                standards: "8-12",
              },
              {
                board: "NCERT",
                subjects: "ગણિત, વિજ્ઞાન | Math, Science",
                standards: "8-12",
              },
            ].map((ref, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-emerald-50 to-teal-50"
              >
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      {ref.board}
                    </h3>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">વિષયો | Subjects:</span>{" "}
                      {ref.subjects}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">ધોરણો | Standards:</span>{" "}
                      {ref.standards}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            <TrendingUp className="w-5 h-5 mr-2" />
            સંપૂર્ણ સંરેખણ રિપોર્ટ | Complete Alignment Report
          </Button>
          <Button variant="outline" className="flex-1">
            <FileText className="w-5 h-5 mr-2" />
            સૂચનો ડાઉનલોડ કરો | Download Suggestions
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
