"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  TrendingDown,
  Users,
  Target,
  BookOpen,
  Lightbulb,
  FileWarning,
} from "lucide-react";

interface MistakePattern {
  id: string;
  mistake: string;
  frequency: number;
  subject: string;
  topic: string;
  studentsAffected: number;
  severity: "high" | "medium" | "low";
  suggestion: string;
}

export default function MistakeAnalyzerPage() {
  const mistakes: MistakePattern[] = [
    {
      id: "m1",
      mistake: "કર્ણની ખોટી ઓળખ | Incorrect identification of hypotenuse",
      frequency: 23,
      subject: "ગણિત | Mathematics",
      topic: "પાયથાગોરસ પ્રમેય | Pythagoras Theorem",
      studentsAffected: 23,
      severity: "high",
      suggestion: "વધુ વિઝ્યુઅલ ઉદાહરણો આપો | Provide more visual examples",
    },
    {
      id: "m2",
      mistake: "સમીકરણમાં ચિહ્નોની ભૂલ | Sign errors in equations",
      frequency: 19,
      subject: "ગણિત | Mathematics",
      topic: "સમીકરણો | Equations",
      studentsAffected: 19,
      severity: "high",
      suggestion: "ચરણબદ્ધ પ્રેક્ટિસ વધારો | Increase step-by-step practice",
    },
    {
      id: "m3",
      mistake: "પ્રકાશસંશ્લેષણ સમીકરણ | Photosynthesis equation errors",
      frequency: 15,
      subject: "વિજ્ઞાન | Science",
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      studentsAffected: 15,
      severity: "medium",
      suggestion: "સમીકરણ યાદ રાખવા માટે મેમોનિક | Use mnemonic for equation",
    },
    {
      id: "m4",
      mistake: "Tense મિક્સિંગ | Tense mixing in sentences",
      frequency: 28,
      subject: "અંગ્રેજી | English",
      topic: "Grammar",
      studentsAffected: 28,
      severity: "high",
      suggestion: "દૈનિક વ્યાકરણ પ્રેક્ટિસ | Daily grammar practice",
    },
    {
      id: "m5",
      mistake: "તારીખો યાદ રાખવામાં ભૂલ | Date memorization errors",
      frequency: 12,
      subject: "સામાજિક | Social Studies",
      topic: "ઈતિહાસ | History",
      studentsAffected: 12,
      severity: "medium",
      suggestion: "ટાઇમલાઇન બનાવવી | Create timelines",
    },
    {
      id: "m6",
      mistake: "રાસાયણિક ફોર્મ્યુલા ભૂલો | Chemical formula mistakes",
      frequency: 17,
      subject: "વિજ્ઞાન | Science",
      topic: "રસાયણશાસ્ત્ર | Chemistry",
      studentsAffected: 17,
      severity: "medium",
      suggestion: "ફ્લેશકાર્ડ્સ ઉપયોગ | Use flashcards",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const totalMistakes = mistakes.reduce((acc, m) => acc + m.frequency, 0);
  const avgStudentsAffected = Math.round(
    mistakes.reduce((acc, m) => acc + m.studentsAffected, 0) / mistakes.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              ભૂલ વિશ્લેષક | Mistake Analyzer
            </h1>
            <p className="text-gray-600 mt-2">
              વર્ગમાં સામાન્ય ભૂલો | Common mistakes across class
            </p>
          </div>
          <FileWarning className="w-12 h-12 text-red-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ ભૂલની પેટર્ન | Total Mistake Patterns",
              value: mistakes.length,
              icon: FileWarning,
              color: "red",
            },
            {
              label: "કુલ ઘટનાઓ | Total Occurrences",
              value: totalMistakes,
              icon: TrendingDown,
              color: "orange",
            },
            {
              label: "સરેરાશ પ્રભાવિત | Avg Affected",
              value: avgStudentsAffected,
              icon: Users,
              color: "yellow",
            },
            {
              label: "ઉચ્ચ તીવ્રતા | High Severity",
              value: mistakes.filter((m) => m.severity === "high").length,
              icon: AlertTriangle,
              color: "rose",
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

        {/* Most Common Mistakes */}
        <Card className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            સૌથી સામાન્ય ભૂલો | Most Common Mistakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mistakes.slice(0, 3).map((mistake, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
              >
                <p className="text-3xl font-bold mb-2">{mistake.frequency}</p>
                <p className="text-sm text-red-100">{mistake.mistake}</p>
                <p className="text-xs text-red-200 mt-2">
                  {mistake.studentsAffected} વિદ્યાર્થીઓ | students
                </p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Detailed Mistakes List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-red-500" />
            વિગતવાર ભૂલ વિશ્લેષણ | Detailed Mistake Analysis
          </h2>
          {mistakes.map((mistake, index) => (
            <motion.div
              key={mistake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getSeverityColor(
                          mistake.severity
                        )}`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {mistake.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {mistake.subject}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {mistake.mistake}
                    </h3>
                    <p className="text-sm text-gray-600">
                      વિષય | Topic: {mistake.topic}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-600">
                      {mistake.frequency}
                    </div>
                    <p className="text-xs text-gray-600">વખત | times</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-red-600" />
                      <p className="text-xs text-gray-600">
                        પ્રભાવિત વિદ્યાર્થીઓ | Affected
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-red-600">
                      {mistake.studentsAffected}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                      <p className="text-xs text-gray-600">
                        આવર્તન | Frequency
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">
                      {mistake.frequency}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-yellow-600" />
                      <p className="text-xs text-gray-600">
                        તીવ્રતા | Severity
                      </p>
                    </div>
                    <p className="text-lg font-bold text-yellow-600 capitalize">
                      {mistake.severity}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        AI સૂચન | AI Suggestion:
                      </p>
                      <p className="text-sm text-gray-700">
                        {mistake.suggestion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <BookOpen className="w-4 h-4 mr-1" />
                    શિક્ષણ સામગ્રી | Teaching Material
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  >
                    સુધારાત્મક યોજના | Remedial Plan
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
            સંપૂર્ણ રિપોર્ટ બનાવો | Generate Complete Report
          </Button>
          <Button variant="outline" className="flex-1">
            સુધારણા યોજના ડાઉનલોડ કરો | Download Remedial Plan
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
