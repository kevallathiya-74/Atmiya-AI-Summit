"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Key,
  CheckCircle,
  Download,
  FileText,
  Award,
  Target,
  BookOpen,
  Zap,
} from "lucide-react";

interface AnswerKey {
  question: string;
  correctAnswer: string;
  options?: string[];
  explanation: string;
  marks: number;
}

export default function AnswerKeyPage() {
  const answerKey: AnswerKey[] = [
    {
      question: "પાયથાગોરસ પ્રમેય શું છે? | What is Pythagoras theorem?",
      correctAnswer: "a² + b² = c²",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "ab = c"],
      explanation:
        "કાટકોણ ત્રિકોણમાં કર્ણનો વર્ગ બાકીની બે બાજુઓના વર્ગના સરવાળા જેટલો હોય છે | In a right triangle, the square of hypotenuse equals the sum of squares of other two sides",
      marks: 1,
    },
    {
      question:
        "પ્રકાશસંશ્લેષણનું સમીકરણ લખો | Write the equation of photosynthesis",
      correctAnswer: "6CO₂ + 6H₂O + પ્રકાશ → C₆H₁₂O₆ + 6O₂",
      explanation:
        "છોડ કાર્બન ડાયોક્સાઇડ અને પાણીને પ્રકાશની હાજરીમાં ગ્લુકોઝ અને ઓક્સિજનમાં પરિવર્તિત કરે છે | Plants convert carbon dioxide and water into glucose and oxygen in presence of light",
      marks: 2,
    },
    {
      question:
        "ભારતના પ્રથમ વડાપ્રધાન કોણ હતા? | Who was India's first Prime Minister?",
      correctAnswer: "જવાહરલાલ નેહરુ | Jawaharlal Nehru",
      explanation:
        "પંડિત જવાહરલાલ નેહરુ 1947માં ભારતના પ્રથમ વડાપ્રધાન બન્યા | Pandit Jawaharlal Nehru became India's first Prime Minister in 1947",
      marks: 1,
    },
    {
      question: "2x + 5 = 15 ઉકેલો | Solve 2x + 5 = 15",
      correctAnswer: "x = 5",
      explanation:
        "પગલાંઓ: 2x = 15-5, 2x = 10, x = 5 | Steps: 2x = 15-5, 2x = 10, x = 5",
      marks: 2,
    },
    {
      question: "હરિતકણ શું છે? | What is chloroplast?",
      correctAnswer:
        "પ્રકાશસંશ્લેષણ થતું કોષાંગ | Organelle where photosynthesis occurs",
      explanation:
        "હરિતકણ છોડના કોષમાં હરિતદ્રવ્ય ધરાવતું કોષાંગ છે જ્યાં પ્રકાશસંશ્લેષણ થાય છે | Chloroplast is an organelle in plant cells containing chlorophyll where photosynthesis occurs",
      marks: 2,
    },
  ];

  const totalMarks = answerKey.reduce((acc, item) => acc + item.marks, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              જવાબ કી | Answer Key
            </h1>
            <p className="text-gray-600 mt-2">
              જવાબ કી સ્વચાલિત બનાવો | Auto-generate answer keys
            </p>
          </div>
          <Key className="w-12 h-12 text-cyan-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ પ્રશ્નો | Total Questions",
              value: answerKey.length,
              icon: FileText,
              color: "cyan",
            },
            {
              label: "કુલ ગુણ | Total Marks",
              value: totalMarks,
              icon: Award,
              color: "sky",
            },
            {
              label: "સરેરાશ ગુણ | Avg Marks",
              value: (totalMarks / answerKey.length).toFixed(1),
              icon: Target,
              color: "blue",
            },
            {
              label: "જવાબ કી બનાવી | Keys Generated",
              value: "234",
              icon: CheckCircle,
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

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            ઝડપી ક્રિયાઓ | Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "નવી કી બનાવો | New Key",
              "આયાત કરો | Import",
              "નિકાસ કરો | Export",
              "શેર કરો | Share",
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  {action}
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Answer Key Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-500" />
              જવાબ કી | Answer Key
            </h2>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Download className="w-4 h-4 mr-2" />
              ડાઉનલોડ કરો | Download
            </Button>
          </div>

          {answerKey.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                        {index + 1}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-300">
                        {item.marks} ગુણ | Marks
                      </span>
                    </div>
                    <p className="text-lg font-medium text-gray-800 mb-3">
                      {item.question}
                    </p>
                  </div>
                </div>

                {/* Options (if MCQ) */}
                {item.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {item.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 ${
                          option === item.correctAnswer
                            ? "bg-green-50 border-green-500"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {String.fromCharCode(65 + optIndex)})
                          </span>
                          <span>{option}</span>
                          {option === item.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Correct Answer */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-300 mb-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">
                        સાચો જવાબ | Correct Answer:
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        {item.correctAnswer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">
                        સમજૂતી | Explanation:
                      </p>
                      <p className="text-sm text-gray-700">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="p-6 border-2 border-cyan-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                જવાબ કી સારાંશ | Answer Key Summary
              </h3>
              <p className="text-gray-600">
                કુલ પ્રશ્નો: {answerKey.length} | કુલ ગુણ: {totalMarks}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-1" />
                Word
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
