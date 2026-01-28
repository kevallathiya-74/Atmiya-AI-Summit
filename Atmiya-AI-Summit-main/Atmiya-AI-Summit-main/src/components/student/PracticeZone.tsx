"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore, Question } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Zap,
  RefreshCw,
  BookOpen,
  Brain,
  Sparkles,
  Timer,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample questions in Gujarati
const sampleQuestions: Omit<Question, "id">[] = [
  {
    question: "What is the capital of Gujarat?",
    questionGu: "ગુજરાતની રાજધાની શું છે?",
    type: "mcq",
    options: ["અમદાવાદ", "ગાંધીનગર", "સુરત", "વડોદરા"],
    answer: "ગાંધીનગર",
    explanation: "Gandhinagar is the capital of Gujarat, named after Mahatma Gandhi.",
    explanationGu: "ગાંધીનગર ગુજરાતની રાજધાની છે, જેનું નામ મહાત્મા ગાંધી પરથી રાખવામાં આવ્યું છે.",
    difficulty: "easy",
    subject: "સામાજિક વિજ્ઞાન",
    topic: "ગુજરાતનો ભૂગોળ",
    xpReward: 10,
  },
  {
    question: "What is 25 × 4?",
    questionGu: "25 × 4 = ?",
    type: "mcq",
    options: ["90", "100", "110", "80"],
    answer: "100",
    explanation: "25 × 4 = 100. This is a basic multiplication.",
    explanationGu: "25 × 4 = 100. આ સરળ ગુણાકાર છે.",
    difficulty: "easy",
    subject: "ગણિત",
    topic: "ગુણાકાર",
    xpReward: 10,
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    questionGu: "પ્રકાશસંશ્લેષણ દરમિયાન છોડ કયો વાયુ શોષે છે?",
    type: "mcq",
    options: ["ઓક્સિજન", "કાર્બન ડાયોક્સાઇડ", "નાઇટ્રોજન", "હાઇડ્રોજન"],
    answer: "કાર્બન ડાયોક્સાઇડ",
    explanation: "Plants absorb carbon dioxide (CO2) during photosynthesis and release oxygen.",
    explanationGu: "છોડ પ્રકાશસંશ્લેષણ દરમિયાન કાર્બન ડાયોક્સાઇડ (CO2) શોષે છે અને ઓક્સિજન છોડે છે.",
    difficulty: "medium",
    subject: "વિજ્ઞાન",
    topic: "પ્રકાશસંશ્લેષણ",
    xpReward: 15,
  },
  {
    question: "Who wrote the Indian National Anthem?",
    questionGu: "ભારતનું રાષ્ટ્રગીત કોણે લખ્યું?",
    type: "mcq",
    options: ["રવીન્દ્રનાથ ટાગોર", "બંકિમચંદ્ર ચટ્ટોપાધ્યાય", "મહાત્મા ગાંધી", "જવાહરલાલ નેહરુ"],
    answer: "રવીન્દ્રનાથ ટાગોર",
    explanation: "Rabindranath Tagore wrote 'Jana Gana Mana', the Indian National Anthem.",
    explanationGu: "રવીન્દ્રનાથ ટાગોરે 'જન ગણ મન' ભારતનું રાષ્ટ્રગીત લખ્યું હતું.",
    difficulty: "medium",
    subject: "સામાજિક વિજ્ઞાન",
    topic: "ભારતીય ઇતિહાસ",
    xpReward: 15,
  },
  {
    question: "What is the formula for the area of a circle?",
    questionGu: "વર્તુળના ક્ષેત્રફળનું સૂત્ર શું છે?",
    type: "mcq",
    options: ["πr", "2πr", "πr²", "2πr²"],
    answer: "πr²",
    explanation: "The area of a circle is πr², where r is the radius.",
    explanationGu: "વર્તુળનું ક્ષેત્રફળ πr² છે, જ્યાં r ત્રિજ્યા છે.",
    difficulty: "medium",
    subject: "ગણિત",
    topic: "ક્ષેત્રફળ",
    xpReward: 15,
  },
];

// Practice mode selector
interface PracticeModeProps {
  onSelectMode: (mode: "topic" | "exam" | "revision" | "challenge") => void;
}

function PracticeModeSelector({ onSelectMode }: PracticeModeProps) {
  const modes = [
    {
      id: "topic",
      name: "ટોપિક પ્રેક્ટિસ",
      icon: <BookOpen className="w-8 h-8" />,
      description: "વિષય અનુસાર પ્રશ્નો પ્રેક્ટિસ કરો",
      color: "blue",
    },
    {
      id: "exam",
      name: "પરીક્ષા મોડ",
      icon: <Timer className="w-8 h-8" />,
      description: "સમયબદ્ધ પરીક્ષા જેવા પ્રશ્નો",
      color: "red",
    },
    {
      id: "revision",
      name: "રિવિઝન",
      icon: <RefreshCw className="w-8 h-8" />,
      description: "ખોટા જવાબોની પુનરાવર્તન",
      color: "amber",
    },
    {
      id: "challenge",
      name: "ચેલેન્જ",
      icon: <Trophy className="w-8 h-8" />,
      description: "3-મિનિટ ઝડપી ક્વિઝ",
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {modes.map((mode, index) => (
        <motion.button
          key={mode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectMode(mode.id as any)}
          className={cn(
            "p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg group",
            mode.color === "blue" && "border-blue-200 hover:border-blue-400 bg-blue-50",
            mode.color === "red" && "border-red-200 hover:border-red-400 bg-red-50",
            mode.color === "amber" && "border-amber-200 hover:border-amber-400 bg-amber-50",
            mode.color === "purple" && "border-purple-200 hover:border-purple-400 bg-purple-50"
          )}
        >
          <div
            className={cn(
              "mb-3",
              mode.color === "blue" && "text-blue-600",
              mode.color === "red" && "text-red-600",
              mode.color === "amber" && "text-amber-600",
              mode.color === "purple" && "text-purple-600"
            )}
          >
            {mode.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-800 font-gujarati mb-1">
            {mode.name}
          </h3>
          <p className="text-sm text-gray-600 font-gujarati">{mode.description}</p>
        </motion.button>
      ))}
    </div>
  );
}

// Question card component
interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  showResult: boolean;
  timeLimit?: number;
}

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult,
  timeLimit,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0);

  useEffect(() => {
    if (timeLimit && timeLeft > 0 && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLimit, timeLeft, showResult]);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    onAnswer(option);
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      {/* Progress and Timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-gujarati">
            પ્રશ્ન {questionNumber}/{totalQuestions}
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
        {timeLimit && (
          <div
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full",
              timeLeft < 10 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            )}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono">{timeLeft}s</span>
          </div>
        )}
        <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
          <Zap className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-bold text-yellow-700">+{question.xpReward}</span>
        </div>
      </div>

      {/* Difficulty Badge */}
      <div className="mb-4">
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full font-gujarati",
            question.difficulty === "easy" && "bg-green-100 text-green-700",
            question.difficulty === "medium" && "bg-yellow-100 text-yellow-700",
            question.difficulty === "hard" && "bg-red-100 text-red-700"
          )}
        >
          {question.difficulty === "easy" && "સરળ"}
          {question.difficulty === "medium" && "મધ્યમ"}
          {question.difficulty === "hard" && "કઠિન"}
        </span>
        <span className="text-xs text-gray-500 ml-2 font-gujarati">
          {question.subject} • {question.topic}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 font-gujarati">
        {question.questionGu}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.answer;
          const showCorrectness = showResult;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                !showResult && !isSelected && "border-gray-200 hover:border-blue-400 bg-gray-50",
                !showResult && isSelected && "border-blue-500 bg-blue-50",
                showResult && isCorrect && "border-green-500 bg-green-50",
                showResult && isSelected && !isCorrect && "border-red-500 bg-red-50"
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  !showResult && "bg-gray-200 text-gray-600",
                  showResult && isCorrect && "bg-green-500 text-white",
                  showResult && isSelected && !isCorrect && "bg-red-500 text-white"
                )}
              >
                {showResult && isCorrect ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : showResult && isSelected && !isCorrect ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  String.fromCharCode(65 + index)
                )}
              </span>
              <span className="text-gray-800 font-gujarati">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-6 p-4 rounded-xl",
              question.isCorrect ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {question.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-700 font-gujarati">સાચો જવાબ! 🎉</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700 font-gujarati">સમજાવટ</span>
                </>
              )}
            </div>
            <p className="text-gray-700 font-gujarati">{question.explanationGu}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Results screen
interface ResultsProps {
  questions: Question[];
  onRetry: () => void;
  onBack: () => void;
}

function ResultsScreen({ questions, onRetry, onBack }: ResultsProps) {
  const correctCount = questions.filter((q) => q.isCorrect).length;
  const totalXP = questions.reduce(
    (sum, q) => sum + (q.isCorrect ? q.xpReward : Math.floor(q.xpReward / 3)),
    0
  );
  const accuracy = Math.round((correctCount / questions.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      {/* Trophy animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="inline-block mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
          {accuracy >= 80 ? (
            <Trophy className="w-12 h-12 text-white" />
          ) : accuracy >= 50 ? (
            <Award className="w-12 h-12 text-white" />
          ) : (
            <Target className="w-12 h-12 text-white" />
          )}
        </div>
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2 font-gujarati">
        {accuracy >= 80 ? "શાબાશ! 🎉" : accuracy >= 50 ? "સારું!" : "વધુ પ્રયાસ કરો!"}
      </h2>

      <p className="text-gray-600 font-gujarati mb-8">
        તમે {questions.length} માંથી {correctCount} પ્રશ્નો સાચા આપ્યા
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
        <Card className="p-4 bg-green-50 border-green-200">
          <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-700">{correctCount}</p>
          <p className="text-sm text-green-600 font-gujarati">સાચા</p>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-700">{totalXP}</p>
          <p className="text-sm text-yellow-600 font-gujarati">XP</p>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-700">{accuracy}%</p>
          <p className="text-sm text-blue-600 font-gujarati">ચોકસાઈ</p>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onBack} className="font-gujarati">
          <ChevronLeft className="w-4 h-4 mr-2" />
          પાછા જાઓ
        </Button>
        <Button
          onClick={onRetry}
          className="bg-gradient-to-r from-blue-600 to-purple-600 font-gujarati"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          ફરી પ્રયાસ કરો
        </Button>
      </div>
    </motion.div>
  );
}

// Main Practice Zone component
export default function PracticeZone() {
  const {
    questions,
    currentQuestionIndex,
    practiceMode,
    addQuestions,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    resetPractice,
    setPracticeMode,
  } = useDashboardStore();

  const [showModeSelector, setShowModeSelector] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [practiceComplete, setPracticeComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectMode = (mode: "topic" | "exam" | "revision" | "challenge") => {
    resetPractice();
    setPracticeMode(mode);
    addQuestions(sampleQuestions);
    setShowModeSelector(false);
    setShowResult(false);
    setPracticeComplete(false);
  };

  const handleAnswer = (answer: string) => {
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, answer, 0);
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
      setShowResult(false);
    } else {
      setPracticeComplete(true);
    }
  };

  const handleBack = () => {
    setShowModeSelector(true);
    resetPractice();
    setPracticeComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-md">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                પ્રેક્ટિસ ઝોન
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                શીખો, પ્રેક્ટિસ કરો, સફળ થાઓ!
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {showModeSelector ? (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 font-gujarati">
              પ્રેક્ટિસ મોડ પસંદ કરો
            </h2>
            <PracticeModeSelector onSelectMode={handleSelectMode} />
          </div>
        ) : practiceComplete ? (
          <ResultsScreen questions={questions} onRetry={() => handleSelectMode(practiceMode)} onBack={handleBack} />
        ) : currentQuestion ? (
          <div>
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              showResult={showResult}
              timeLimit={practiceMode === "challenge" ? 30 : undefined}
            />

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  previousQuestion();
                  setShowResult(true);
                }}
                disabled={currentQuestionIndex === 0}
                className="font-gujarati"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                પાછળ
              </Button>
              
              {showResult && (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 font-gujarati"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      આગળ
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      પૂર્ણ કરો
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
