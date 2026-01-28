"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo questions
const demoQuestions = [
  {
    id: "1",
    question: "ગુજરાતની રાજધાની શું છે?",
    options: ["અમદાવાદ", "ગાંધીનગર", "સુરત", "રાજકોટ"],
    answer: "ગાંધીનગર",
  },
  {
    id: "2",
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: "3",
    question: "પાણીનું રાસાયણિક સૂત્ર શું છે?",
    options: ["H₂O", "CO₂", "O₂", "H₂"],
    answer: "H₂O",
  },
  {
    id: "4",
    question: "ભારતના પ્રથમ વડાપ્રધાન કોણ હતા?",
    options: [
      "મહાત્મા ગાંધી",
      "જવાહરલાલ નેહરુ",
      "સરદાર પટેલ",
      "બી.આર. આંબેડકર",
    ],
    answer: "જવાહરલાલ નેહરુ",
  },
];

export default function PracticePage() {
  const {
    questions,
    currentQuestionIndex,
    addQuestion,
    answerQuestion,
    nextQuestion,
    resetPractice,
  } = useDashboardStore();
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState(demoQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleStartPractice = () => {
    setPracticeStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = currentQuestions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setPracticeStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (!practiceStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                અભ્યાસ શરૂ કરો
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg text-gray-700 font-gujarati">
                  તમારા જ્ઞાનની કસોટી કરો
                </p>
                <p className="text-gray-600 font-gujarati">
                  {currentQuestions.length} પ્રશ્નો • બહુવિકલ્પી પ્રશ્નો
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">
                    {currentQuestions.length}
                  </p>
                  <p className="text-sm text-gray-600 font-gujarati">પ્રશ્નો</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-3xl font-bold text-green-600">
                    {currentQuestions.length * 5}
                  </p>
                  <p className="text-sm text-gray-600 font-gujarati">મિનિટ</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600">100</p>
                  <p className="text-sm text-gray-600 font-gujarati">ગુણ</p>
                </div>
              </div>

              <Button
                onClick={handleStartPractice}
                size="lg"
                className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati"
              >
                <Target className="w-5 h-5 mr-2" />
                શરૂ કરો
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-0 shadow-2xl">
            <CardContent className="pt-12 pb-8 text-center space-y-6">
              <div className="flex justify-center">
                <div
                  className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center shadow-lg",
                    percentage >= 70
                      ? "bg-gradient-to-br from-green-500 to-emerald-600"
                      : "bg-gradient-to-br from-orange-500 to-red-600"
                  )}
                >
                  <div className="text-white">
                    <p className="text-5xl font-bold">{percentage}%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 font-gujarati">
                  {percentage >= 70 ? "શાબાશ! 🎉" : "સારો પ્રયાસ! 💪"}
                </h2>
                <p className="text-lg text-gray-600 font-gujarati">
                  તમે {currentQuestions.length} માંથી {score} પ્રશ્નો સાચા કર્યા
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-6 bg-green-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-3xl font-bold text-green-600">{score}</p>
                  </div>
                  <p className="text-sm text-gray-600 font-gujarati">
                    સાચા જવાબ
                  </p>
                </div>
                <div className="p-6 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <p className="text-3xl font-bold text-red-600">
                      {currentQuestions.length - score}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 font-gujarati">
                    ખોટા જવાબ
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12 font-gujarati"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  ફરીથી પ્રયાસ કરો
                </Button>
                <Button
                  onClick={() => setPracticeStarted(false)}
                  size="lg"
                  className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati"
                >
                  પૂર્ણ કર્યું
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 rounded-xl shadow-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                  અભ્યાસ
                </h1>
                <p className="text-sm text-gray-600 font-gujarati">
                  પ્રશ્ન {currentIndex + 1} / {currentQuestions.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-gujarati">ગુણ</p>
              <p className="text-2xl font-bold text-purple-600">{score}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${
                  ((currentIndex + 1) / currentQuestions.length) * 100
                }%`,
              }}
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="pt-8 pb-8 space-y-8">
                  {/* Question */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-gujarati leading-relaxed">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.answer;
                      const showCorrect = showResult && isCorrect;
                      const showIncorrect =
                        showResult && isSelected && !isCorrect;

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          className={cn(
                            "w-full p-5 rounded-xl border-2 text-left transition-all duration-200 font-gujarati text-lg",
                            !showResult &&
                              !isSelected &&
                              "border-gray-200 hover:border-purple-300 hover:bg-purple-50",
                            !showResult &&
                              isSelected &&
                              "border-purple-500 bg-purple-50",
                            showCorrect && "border-green-500 bg-green-50",
                            showIncorrect && "border-red-500 bg-red-50",
                            showResult && "cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={cn(
                                showCorrect && "text-green-700 font-semibold",
                                showIncorrect && "text-red-700"
                              )}
                            >
                              {option}
                            </span>
                            {showCorrect && (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            )}
                            {showIncorrect && (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit/Next Button */}
                  <div className="flex gap-3 pt-4">
                    {!showResult ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        size="lg"
                        className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        ચકાસો
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextQuestion}
                        size="lg"
                        className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati"
                      >
                        {currentIndex < currentQuestions.length - 1
                          ? "આગળ વધો"
                          : "પૂર્ણ કરો"}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
