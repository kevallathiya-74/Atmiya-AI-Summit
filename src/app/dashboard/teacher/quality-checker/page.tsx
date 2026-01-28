"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  TrendingUp,
  Target,
  FileCheck,
  Award,
} from "lucide-react";

interface QuestionQuality {
  id: string;
  question: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  qualityScore: number;
  clarity: number;
  relevance: number;
  appropriateness: number;
  issues: string[];
  suggestions: string[];
  status: "excellent" | "good" | "needs-improvement" | "poor";
}

export default function QualityCheckerPage() {
  const questions: QuestionQuality[] = [
    {
      id: "q1",
      question:
        "પાયથાગોરસ પ્રમેય સમજાવો અને બે ઉદાહરણો આપો | Explain Pythagoras theorem with two examples",
      subject: "ગણિત | Mathematics",
      difficulty: "medium",
      qualityScore: 92,
      clarity: 95,
      relevance: 90,
      appropriateness: 90,
      issues: [],
      suggestions: ["વધુ ઉદાહરણો ઉમેરી શકો | Can add more examples"],
      status: "excellent",
    },
    {
      id: "q2",
      question: "પ્રકાશસંશ્લેષણ શું છે? | What is photosynthesis?",
      subject: "વિજ્ઞાન | Science",
      difficulty: "easy",
      qualityScore: 78,
      clarity: 90,
      relevance: 80,
      appropriateness: 65,
      issues: ["ખૂબ સરળ | Too simple", "વિગતનો અભાવ | Lacks detail"],
      suggestions: [
        "પ્રક્રિયા સમજાવવા કહો | Ask to explain process",
        "રાસાયણિક સમીકરણ માંગો | Request chemical equation",
      ],
      status: "good",
    },
    {
      id: "q3",
      question: "ગાંધીજી કોણ હતા? | Who was Gandhiji?",
      subject: "સામાજિક | Social Studies",
      difficulty: "easy",
      qualityScore: 62,
      clarity: 85,
      relevance: 70,
      appropriateness: 32,
      issues: [
        "ખૂબ સામાન્ય | Too general",
        "વિશ્લેષણાત્મક વિચારસરણી નથી | No analytical thinking",
        "વય માટે અયોગ્ય | Not appropriate for age",
      ],
      suggestions: [
        "સ્વતંત્રતા સંગ્રામમાં ભૂમિકા પૂછો | Ask about role in freedom struggle",
        "વિશિષ્ટ યોગદાન વિશે પૂછો | Inquire about specific contributions",
      ],
      status: "needs-improvement",
    },
    {
      id: "q4",
      question:
        "વિદ્યુત શું છે? સમજાવો અને તેના પ્રકારો લખો | What is electricity? Explain and write its types",
      subject: "વિજ્ઞાન | Science",
      difficulty: "hard",
      qualityScore: 88,
      clarity: 85,
      relevance: 90,
      appropriateness: 90,
      issues: [],
      suggestions: ["ઉદાહરણો માટે પૂછી શકો | Can ask for examples"],
      status: "excellent",
    },
    {
      id: "q5",
      question: "the grammar | કંઈક લખો",
      subject: "અંગ્રેજી | English",
      difficulty: "easy",
      qualityScore: 38,
      clarity: 25,
      relevance: 40,
      appropriateness: 50,
      issues: [
        "અસ્પષ્ટ પ્રશ્ન | Unclear question",
        "વ્યાકરણીય ભૂલો | Grammatical errors",
        "સંદર્ભનો અભાવ | Lacks context",
      ],
      suggestions: [
        "પ્રશ્ન સ્પષ્ટ રીતે ફરીથી લખો | Rewrite question clearly",
        "વિશિષ્ટ વિષય નક્કી કરો | Specify exact topic",
      ],
      status: "poor",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-300";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "needs-improvement":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "poor":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "good":
        return <Star className="w-5 h-5 text-blue-600" />;
      case "needs-improvement":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "poor":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const avgQuality = Math.round(
    questions.reduce((acc, q) => acc + q.qualityScore, 0) / questions.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              ગુણવત્તા તપાસણી | Quality Checker
            </h1>
            <p className="text-gray-600 mt-2">
              પ્રશ્ન ગુણવત્તા અને મુશ્કેલી તપાસો | Check question quality and
              difficulty
            </p>
          </div>
          <FileCheck className="w-12 h-12 text-sky-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "સરેરાશ ગુણવત્તા | Avg Quality",
              value: `${avgQuality}%`,
              icon: Target,
              color: "sky",
            },
            {
              label: "ઉત્તમ | Excellent",
              value: questions.filter((q) => q.status === "excellent").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "સારું | Good",
              value: questions.filter((q) => q.status === "good").length,
              icon: Star,
              color: "blue",
            },
            {
              label: "સુધારણા જરૂર | Needs Work",
              value: questions.filter(
                (q) => q.status === "needs-improvement" || q.status === "poor"
              ).length,
              icon: AlertTriangle,
              color: "yellow",
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

        {/* Quality Distribution */}
        <Card className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            ગુણવત્તા વિતરણ | Quality Distribution
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "ઉત્તમ | Excellent",
                count: questions.filter((q) => q.status === "excellent").length,
                color: "green",
              },
              {
                label: "સારું | Good",
                count: questions.filter((q) => q.status === "good").length,
                color: "blue",
              },
              {
                label: "સુધારણા | Needs Work",
                count: questions.filter((q) => q.status === "needs-improvement")
                  .length,
                color: "yellow",
              },
              {
                label: "નબળું | Poor",
                count: questions.filter((q) => q.status === "poor").length,
                color: "red",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 text-center"
              >
                <p className="text-4xl font-bold mb-1">{item.count}</p>
                <p className="text-sm text-sky-100">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Question Quality Analysis */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-sky-500" />
            પ્રશ્ન ગુણવત્તા વિશ્લેષણ | Question Quality Analysis
          </h2>
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(
                          question.status
                        )}`}
                      >
                        {getStatusIcon(question.status)}
                        {question.status.toUpperCase().replace("-", " ")}
                      </span>
                      <span className="text-sm text-gray-600">
                        {question.subject}
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-800 mb-1">
                      {question.question}
                    </p>
                    <p className="text-sm text-gray-600">
                      મુશ્કેલી | Difficulty:{" "}
                      <span className="font-semibold capitalize">
                        {question.difficulty}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-4xl font-bold"
                      style={{
                        color:
                          question.qualityScore >= 85
                            ? "#10b981"
                            : question.qualityScore >= 70
                            ? "#3b82f6"
                            : question.qualityScore >= 50
                            ? "#f59e0b"
                            : "#ef4444",
                      }}
                    >
                      {question.qualityScore}
                    </div>
                    <p className="text-xs text-gray-600">ગુણવત્તા | Quality</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${question.qualityScore}%`,
                      backgroundColor:
                        question.qualityScore >= 85
                          ? "#10b981"
                          : question.qualityScore >= 70
                          ? "#3b82f6"
                          : question.qualityScore >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">
                      {question.clarity}%
                    </p>
                    <p className="text-xs text-gray-600">સ્પષ્ટતા | Clarity</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-2xl font-bold text-purple-600">
                      {question.relevance}%
                    </p>
                    <p className="text-xs text-gray-600">
                      સંબંધિતતા | Relevance
                    </p>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-2xl font-bold text-indigo-600">
                      {question.appropriateness}%
                    </p>
                    <p className="text-xs text-gray-600">
                      યોગ્યતા | Appropriateness
                    </p>
                  </div>
                </div>

                {question.issues.length > 0 && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          સમસ્યાઓ | Issues:
                        </p>
                        <ul className="space-y-1">
                          {question.issues.map((issue, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-red-600 mt-1">•</span>
                              <span>{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {question.suggestions.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">
                          સૂચનો | Suggestions:
                        </p>
                        <ul className="space-y-1">
                          {question.suggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-green-600 mt-1">•</span>
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
                    સંપાદિત કરો | Edit
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600"
                  >
                    સુધારો | Improve
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600">
            બધા પ્રશ્નો તપાસો | Check All Questions
          </Button>
          <Button variant="outline" className="flex-1">
            ગુણવત્તા રિપોર્ટ | Quality Report
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
