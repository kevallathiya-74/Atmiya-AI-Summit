"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Sparkles,
  Download,
  Settings,
  CheckCircle,
  Clock,
  Target,
  Brain,
  Zap,
} from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  marks: number;
}

export default function QuizGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[]>([]);

  const mockQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "રામાયણના લેખક કોણ હતા? | Who was the author of Ramayana?",
      options: [
        "વાલ્મીકિ | Valmiki",
        "વ્યાસ | Vyasa",
        "કાલિદાસ | Kalidasa",
        "તુલસીદાસ | Tulsidas",
      ],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "સંસ્કૃત સાહિત્ય | Sanskrit Literature",
      marks: 1,
    },
    {
      id: "q2",
      question:
        "પાણીનું રાસાયણિક સૂત્ર શું છે? | What is the chemical formula of water?",
      options: ["H2O", "CO2", "O2", "H2SO4"],
      correctAnswer: 0,
      difficulty: "easy",
      topic: "રસાયણશાસ્ત્ર | Chemistry",
      marks: 1,
    },
    {
      id: "q3",
      question: "ભારતમાં કેટલા રાજ્યો છે? | How many states are in India?",
      options: ["28", "29", "30", "27"],
      correctAnswer: 0,
      difficulty: "medium",
      topic: "ભારતીય રાજકારણ | Indian Politics",
      marks: 2,
    },
    {
      id: "q4",
      question: "પાયથાગોરસ પ્રમેય શું છે? | What is Pythagoras theorem?",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "ab = c"],
      correctAnswer: 0,
      difficulty: "medium",
      topic: "ગણિત | Mathematics",
      marks: 2,
    },
    {
      id: "q5",
      question:
        "પ્રકાશસંશ્લેષણની પ્રક્રિયા ક્યાં થાય છે? | Where does photosynthesis occur?",
      options: [
        "હરિતકણ | Chloroplast",
        "માઇટોકોન્ડ્રિયા | Mitochondria",
        "ન્યુક્લિયસ | Nucleus",
        "રિબોસોમ | Ribosome",
      ],
      correctAnswer: 0,
      difficulty: "hard",
      topic: "જીવવિજ્ઞાન | Biology",
      marks: 3,
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedQuiz(mockQuestions.slice(0, numQuestions));
      setIsGenerating(false);
    }, 2000);
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    hard: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ક્વિઝ જનરેટર | Quiz Generator
            </h1>
            <p className="text-gray-600 mt-2">
              AI સાથે સ્વચાલિત ક્વિઝ બનાવો | Create automated quizzes with AI
            </p>
          </div>
          <Sparkles className="w-12 h-12 text-purple-500" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ ક્વિઝ | Total Quizzes",
              value: "124",
              icon: FileText,
              color: "purple",
            },
            {
              label: "આ મહિને | This Month",
              value: "23",
              icon: Clock,
              color: "pink",
            },
            {
              label: "સરેરાશ સ્કોર | Avg Score",
              value: "78%",
              icon: Target,
              color: "blue",
            },
            {
              label: "ઓટો-ગ્રેડ | Auto-Graded",
              value: "100%",
              icon: CheckCircle,
              color: "green",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-4 bg-gradient-to-br from-${stat.color}-50 to-white border-${stat.color}-200`}
              >
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

        {/* Quiz Configuration */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-500" />
            ક્વિઝ રૂપરેખાંકન | Quiz Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="topic">વિષય | Topic</Label>
              <Input
                id="topic"
                placeholder="ઉદાહરણ: ગણિત, વિજ્ઞાન | e.g., Math, Science"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="numQuestions">
                પ્રશ્નોની સંખ્યા | Number of Questions
              </Label>
              <Input
                id="numQuestions"
                type="number"
                min="5"
                max="50"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="difficulty">સ્તર | Difficulty Level</Label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as "easy" | "medium" | "hard")
                }
                className="mt-2 w-full px-3 py-2 border rounded-md"
              >
                <option value="easy">સરળ | Easy</option>
                <option value="medium">મધ્યમ | Medium</option>
                <option value="hard">મુશ્કેલ | Hard</option>
              </select>
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                જનરેટ કરી રહ્યું છે... | Generating...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                ક્વિઝ જનરેટ કરો | Generate Quiz
              </>
            )}
          </Button>
        </Card>

        {/* Generated Quiz */}
        {generatedQuiz.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                જનરેટ કરેલ ક્વિઝ | Generated Quiz ({generatedQuiz.length}{" "}
                પ્રશ્નો)
              </h2>
              <div className="space-x-2">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  પીડીએફ | PDF
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Word
                </Button>
              </div>
            </div>

            {generatedQuiz.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-purple-600">
                          Q{index + 1}.
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            difficultyColors[question.difficulty]
                          }`}
                        >
                          {question.difficulty.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600">
                          {question.topic}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-gray-800">
                        {question.question}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">
                      {question.marks} ગુણ | Marks
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 ${
                          optIndex === question.correctAnswer
                            ? "bg-green-50 border-green-500"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {String.fromCharCode(65 + optIndex)})
                          </span>
                          <span>{option}</span>
                          {optIndex === question.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
