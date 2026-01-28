"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  FileCheck,
  Download,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Award,
  Target,
  Star,
} from "lucide-react";

interface ModelAnswer {
  id: string;
  question: string;
  marks: number;
  answer: string;
  keyPoints: string[];
  commonMistakes: string[];
  difficulty: "easy" | "medium" | "hard";
}

export default function ModelAnswersPage() {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [customQuestion, setCustomQuestion] = useState("");

  const modelAnswers: ModelAnswer[] = [
    {
      id: "ma1",
      question:
        "પાયથાગોરસ પ્રમેય સમજાવો અને ત્રણ ઉદાહરણો આપો | Explain Pythagoras theorem with three examples",
      marks: 5,
      answer:
        "પાયથાગોરસ પ્રમેય જણાવે છે કે કાટકોણ ત્રિકોણમાં, કર્ણની બાજુનો વર્ગ બાકીની બે બાજુઓના વર્ગના સરવાળા જેટલો હોય છે. સૂત્ર: a² + b² = c² | Pythagoras theorem states that in a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides. Formula: a² + b² = c²",
      keyPoints: [
        "કર્ણની વ્યાખ્યા | Definition of hypotenuse",
        "સૂત્રનું સ્પષ્ટીકરણ | Formula explanation",
        "ત્રણ સાંખ્યિક ઉદાહરણો | Three numerical examples",
        "વ્યવહારિક ઉપયોગ | Practical applications",
      ],
      commonMistakes: [
        "કર્ણને યોગ્ય રીતે ઓળખવામાં નિષ્ફળતા | Failure to identify hypotenuse correctly",
        "ચોરસ ભૂલી જવું | Forgetting to square",
      ],
      difficulty: "medium",
    },
    {
      id: "ma2",
      question:
        "પ્રકાશસંશ્લેષણની પ્રક્રિયા વર્ણવો | Describe the process of photosynthesis",
      marks: 4,
      answer:
        "પ્રકાશસંશ્લેષણ એ પ્રક્રિયા છે જેમાં છોડ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડનો ઉપયોગ કરીને ગ્લુકોઝ અને ઓક્સિજન બનાવે છે. સમીકરણ: 6CO₂ + 6H₂O + પ્રકાશ → C₆H₁₂O₆ + 6O₂ | Photosynthesis is the process where plants use sunlight, water and carbon dioxide to produce glucose and oxygen. Equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂",
      keyPoints: [
        "હરિતકણમાં થાય છે | Occurs in chloroplasts",
        "પ્રકાશ જરૂરી છે | Light is essential",
        "રાસાયણિક સમીકરણ | Chemical equation",
        "પરિણામો: ગ્લુકોઝ અને ઓક્સિજન | Products: glucose and oxygen",
      ],
      commonMistakes: [
        "સમીકરણમાં ભૂલો | Errors in equation",
        "સ્થાન ભૂલી જવું | Forgetting location",
      ],
      difficulty: "medium",
    },
    {
      id: "ma3",
      question:
        "ભારતીય સ્વતંત્રતા સંગ્રામમાં ગાંધીજીની ભૂમિકા | Gandhi's role in Indian independence",
      marks: 6,
      answer:
        "મહાત્મા ગાંધીએ અહિંસક અને સત્યાગ્રહના સિદ્ધાંતો દ્વારા ભારતીય સ્વતંત્રતા સંગ્રામનું નેતૃત્વ કર્યું. તેમણે અસહકાર આંદોલન, સવિનય ભંગ અને ભારત છોડો આંદોલન શરૂ કર્યા | Mahatma Gandhi led the Indian independence movement through principles of non-violence and Satyagraha. He initiated Non-Cooperation, Civil Disobedience and Quit India movements",
      keyPoints: [
        "અહિંસાનો સિદ્ધાંત | Principle of non-violence",
        "મુખ્ય આંદોલનો | Major movements",
        "લોકોને એકીકૃત કર્યા | United people",
        "આંતરરાષ્ટ્રીય પ્રભાવ | International impact",
      ],
      commonMistakes: [
        "તારીખો ભૂલી જવી | Forgetting dates",
        "આંદોલનોની ક્રમ | Sequence of movements",
      ],
      difficulty: "hard",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "hard":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              મોડેલ જવાબો | Model Answers
            </h1>
            <p className="text-gray-600 mt-2">
              અસાઇનમેન્ટ માટે મોડેલ જવાબો બનાવો | Generate model answers for
              assignments
            </p>
          </div>
          <FileCheck className="w-12 h-12 text-teal-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ મોડેલ જવાબો | Total Model Answers",
              value: "234",
              icon: FileCheck,
              color: "teal",
            },
            {
              label: "આ મહિને બનાવ્યા | Created This Month",
              value: "45",
              icon: Award,
              color: "cyan",
            },
            {
              label: "સરેરાશ ગુણ | Avg Marks",
              value: "5.2",
              icon: Star,
              color: "blue",
            },
            {
              label: "ડાઉનલોડ | Downloads",
              value: "1,234",
              icon: Download,
              color: "green",
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

        {/* Generate Custom Answer */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-teal-500" />
            કસ્ટમ જવાબ બનાવો | Generate Custom Answer
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                પ્રશ્ન દાખલ કરો | Enter Question
              </label>
              <Textarea
                placeholder="તમારો પ્રશ્ન અહીં લખો... | Write your question here..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  વિષય | Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="math">ગણિત | Mathematics</option>
                  <option value="science">વિજ્ઞાન | Science</option>
                  <option value="english">અંગ્રેજી | English</option>
                  <option value="social">સામાજિક | Social Studies</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  ગુણ | Marks
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  defaultValue={5}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600">
              મોડેલ જવાબ બનાવો | Generate Model Answer
            </Button>
          </div>
        </Card>

        {/* Model Answers List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-500" />
            હાલના મોડેલ જવાબો | Existing Model Answers
          </h2>
          {modelAnswers.map((answer, index) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                          answer.difficulty
                        )}`}
                      >
                        {answer.difficulty.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-teal-600">
                        {answer.marks} ગુણ | Marks
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {answer.question}
                    </h3>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200 mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Target className="w-5 h-5 text-teal-500 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">
                        મોડેલ જવાબ | Model Answer:
                      </p>
                      <p className="text-sm text-gray-700">{answer.answer}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-800">
                        મુખ્ય મુદ્દાઓ | Key Points
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {answer.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-green-600 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-gray-800">
                        સામાન્ય ભૂલો | Common Mistakes
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {answer.commonMistakes.map((mistake, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="text-red-600 mt-1">•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    PDF ડાઉનલોડ | Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Word ડાઉનલોડ | Download Word
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
