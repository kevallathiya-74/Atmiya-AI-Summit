"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Brain,
  Trophy,
  Flame,
  Star,
  Zap,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Subject configuration with Gujarati names
const SUBJECTS = [
  { id: "mathematics", name: "ગણિત", icon: "🔢", color: "from-blue-500 to-cyan-500" },
  { id: "science", name: "વિજ્ઞાન", icon: "🔬", color: "from-green-500 to-emerald-500" },
  { id: "gujarati", name: "ગુજરાતી", icon: "📚", color: "from-orange-500 to-red-500" },
  { id: "english", name: "અંગ્રેજી", icon: "🔤", color: "from-purple-500 to-pink-500" },
  { id: "social_science", name: "સામાજિક વિજ્ઞાન", icon: "🌍", color: "from-yellow-500 to-orange-500" },
  { id: "hindi", name: "હિન્દી", icon: "📖", color: "from-red-500 to-rose-500" },
];

// Questions organized by subject
const questionsBySubject: Record<string, Array<{
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}>> = {
  mathematics: [
    {
      id: "m1",
      question: "જો x + 5 = 12 હોય, તો x = ?",
      options: ["5", "6", "7", "8"],
      answer: "7",
      explanation: "x + 5 = 12, તેથી x = 12 - 5 = 7",
    },
    {
      id: "m2",
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "2 + 2 = 4 એ મૂળભૂત સરવાળો છે",
    },
    {
      id: "m3",
      question: "એક ત્રિકોણના બધા ખૂણાઓનો સરવાળો કેટલો હોય છે?",
      options: ["90°", "180°", "270°", "360°"],
      answer: "180°",
      explanation: "ત્રિકોણના ત્રણ ખૂણાઓનો સરવાળો હંમેશા 180° હોય છે",
    },
  ],
  science: [
    {
      id: "s1",
      question: "પાણીનું રાસાયણિક સૂત્ર શું છે?",
      options: ["H₂O", "CO₂", "O₂", "H₂"],
      answer: "H₂O",
      explanation: "પાણી બે હાઇડ્રોજન અને એક ઓક્સિજન અણુથી બને છે",
    },
    {
      id: "s2",
      question: "પ્રકાશસંશ્લેષણ કઈ પ્રક્રિયા છે?",
      options: ["ખોરાક બનાવવાની", "શ્વસનની", "ઉત્સર્જનની", "વૃદ્ધિની"],
      answer: "ખોરાક બનાવવાની",
      explanation: "છોડ સૂર્યપ્રકાશનો ઉપયોગ કરીને ખોરાક બનાવે છે",
    },
    {
      id: "s3",
      question: "ગુરુત્વાકર્ષણ બળ કોણે શોધ્યું?",
      options: ["આઈન્સ્ટાઈન", "ન્યૂટન", "ગેલિલિયો", "એડિસન"],
      answer: "ન્યૂટન",
      explanation: "સર આઇઝેક ન્યૂટને ગુરુત્વાકર્ષણનો નિયમ આપ્યો",
    },
  ],
  gujarati: [
    {
      id: "g1",
      question: "ગુજરાતની રાજધાની શું છે?",
      options: ["અમદાવાદ", "ગાંધીનગર", "સુરત", "રાજકોટ"],
      answer: "ગાંધીનગર",
      explanation: "ગાંધીનગર ગુજરાતની રાજધાની છે",
    },
    {
      id: "g2",
      question: "'નરસિંહ મહેતા' કઈ ભાષાના કવિ હતા?",
      options: ["હિન્દી", "ગુજરાતી", "સંસ્કૃત", "મરાઠી"],
      answer: "ગુજરાતી",
      explanation: "નરસિંહ મહેતા ગુજરાતી ભાષાના આદ્ય કવિ હતા",
    },
  ],
  english: [
    {
      id: "e1",
      question: "What is the past tense of 'go'?",
      options: ["goed", "went", "gone", "going"],
      answer: "went",
      explanation: "'Go' નો ભૂતકાળ 'went' છે",
    },
    {
      id: "e2",
      question: "Which is a noun in: 'The cat sat on the mat'?",
      options: ["sat", "on", "the", "cat"],
      answer: "cat",
      explanation: "'Cat' એ noun (નામ) છે",
    },
  ],
  social_science: [
    {
      id: "ss1",
      question: "ભારતના પ્રથમ વડાપ્રધાન કોણ હતા?",
      options: ["મહાત્મા ગાંધી", "જવાહરલાલ નેહરુ", "સરદાર પટેલ", "બી.આર. આંબેડકર"],
      answer: "જવાહરલાલ નેહરુ",
      explanation: "જવાહરલાલ નેહરુ ભારતના પ્રથમ વડાપ્રધાન હતા (1947-1964)",
    },
    {
      id: "ss2",
      question: "ભારતનો સ્વતંત્રતા દિવસ ક્યારે ઉજવાય છે?",
      options: ["26 જાન્યુઆરી", "15 ઓગસ્ટ", "2 ઓક્ટોબર", "14 નવેમ્બર"],
      answer: "15 ઓગસ્ટ",
      explanation: "15 ઓગસ્ટ 1947ના રોજ ભારત આઝાદ થયું",
    },
  ],
  hindi: [
    {
      id: "h1",
      question: "'राष्ट्रगान' का अर्थ क्या है?",
      options: ["देश का गीत", "प्रार्थना", "भजन", "कविता"],
      answer: "देश का गीत",
      explanation: "રાષ્ટ્રગાન એટલે દેશનું ગીત",
    },
  ],
};

export default function PracticePage() {
  const { gamification, addXP, updateStreak } = useDashboardStore();
  
  const [practiceMode, setPracticeMode] = useState<'select' | 'quiz' | 'completed'>('select');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<typeof questionsBySubject.mathematics>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    const subjectQuestions = questionsBySubject[subjectId] || [];
    const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
    setCurrentQuestions(shuffled);
  };

  const handleStartPractice = () => {
    if (!selectedSubject || currentQuestions.length === 0) return;
    setPracticeMode('quiz');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setXpEarned(0);
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
      setStreak(streak + 1);
      const earnedXP = 10 + Math.min(streak * 2, 10);
      setXpEarned(xpEarned + earnedXP);
      addXP(earnedXP, "practice");
    } else {
      setStreak(0);
    }

    setShowResult(true);
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowExplanation(false);
    } else {
      setPracticeMode('completed');
      if (score >= currentQuestions.length * 0.7) {
        updateStreak();
      }
    }
  };

  const handleRestart = () => {
    setPracticeMode('select');
    setSelectedSubject(null);
    setCurrentQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setXpEarned(0);
  };

  // Subject Selection Screen
  if (practiceMode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-gujarati">
              અભ્યાસ ઝોન
            </h1>
            <p className="text-gray-600 font-gujarati">
              વિષય પસંદ કરો અને તમારા જ્ઞાનની કસોટી કરો
            </p>
          </motion.div>

          {/* Gamification Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Flame className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">{gamification.streak}</p>
                  <p className="text-sm opacity-90 font-gujarati">દિવસ સ્ટ્રીક</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">{gamification.xp}</p>
                  <p className="text-sm opacity-90">XP</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Trophy className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">Lv.{gamification.level}</p>
                  <p className="text-sm opacity-90 font-gujarati">સ્તર</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Selection */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 font-gujarati">
              વિષય પસંદ કરો
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SUBJECTS.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "cursor-pointer transition-all duration-300 border-2 hover:scale-105",
                      selectedSubject === subject.id
                        ? "border-purple-500 shadow-lg shadow-purple-500/20"
                        : "border-transparent hover:border-gray-200"
                    )}
                    onClick={() => handleSelectSubject(subject.id)}
                  >
                    <CardContent className="p-6 text-center space-y-3">
                      <div className={cn(
                        "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl",
                        subject.color
                      )}>
                        {subject.icon}
                      </div>
                      <p className="font-semibold text-gray-800 font-gujarati">
                        {subject.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {questionsBySubject[subject.id]?.length || 0} પ્રશ્નો
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          {selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleStartPractice}
                size="lg"
                className="h-14 px-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati"
              >
                <Target className="w-5 h-5 mr-2" />
                અભ્યાસ શરૂ કરો ({currentQuestions.length} પ્રશ્નો)
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Completed Screen
  if (practiceMode === 'completed') {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    const isPassing = percentage >= 70;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-0 shadow-2xl overflow-hidden relative">
            <CardContent className="pt-12 pb-8 text-center space-y-6">
              {/* Score Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="flex justify-center"
              >
                <div
                  className={cn(
                    "w-36 h-36 rounded-full flex items-center justify-center shadow-2xl relative",
                    isPassing
                      ? "bg-gradient-to-br from-green-400 to-emerald-600"
                      : "bg-gradient-to-br from-orange-400 to-red-500"
                  )}
                >
                  <div className="text-white text-center">
                    <p className="text-5xl font-bold">{percentage}%</p>
                    <p className="text-sm opacity-80 font-gujarati">સ્કોર</p>
                  </div>
                  {isPassing && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Message */}
              <div className="space-y-2">
                <h2 className={cn(
                  "text-3xl font-bold font-gujarati",
                  isPassing ? "text-green-600" : "text-orange-600"
                )}>
                  {isPassing ? "શાબાશ! 🎉" : "સારો પ્રયાસ! 💪"}
                </h2>
                <p className="text-gray-600 font-gujarati">
                  {isPassing
                    ? "તમે ખૂબ સારું કર્યું!"
                    : "થોડી વધુ પ્રેક્ટિસ કરો"}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">{score}/{currentQuestions.length}</p>
                  <p className="text-sm text-gray-600 font-gujarati">સાચા જવાબો</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-3xl font-bold text-purple-600">+{xpEarned}</p>
                  <p className="text-sm text-gray-600">XP મેળવ્યા</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-3xl font-bold text-orange-600">{streak}</p>
                  <p className="text-sm text-gray-600 font-gujarati">મેક્સ સ્ટ્રીક</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  size="lg"
                  className="font-gujarati"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  ફરીથી પ્રયાસ
                </Button>
                <Button
                  onClick={handleRestart}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-gujarati"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  બીજો વિષય
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz Mode
  const currentQuestion = currentQuestions[currentIndex];
  const selectedSubjectData = SUBJECTS.find(s => s.id === selectedSubject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2.5 rounded-xl shadow-md bg-gradient-to-br",
                selectedSubjectData?.color || "from-purple-500 to-pink-600"
              )}>
                <span className="text-2xl">{selectedSubjectData?.icon || "📚"}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-gujarati">
                  {selectedSubjectData?.name || "અભ્યાસ"}
                </h1>
                <p className="text-sm text-gray-600 font-gujarati">
                  પ્રશ્ન {currentIndex + 1} / {currentQuestions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Streak indicator */}
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full"
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-bold text-orange-600">{streak}</span>
                </motion.div>
              )}
              <div className="text-right">
                <p className="text-sm text-gray-600 font-gujarati">સ્કોર</p>
                <p className="text-2xl font-bold text-purple-600">{score}/{currentIndex + (showResult ? 1 : 0)}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
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
                      {currentQuestion?.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion?.options?.map((option: string, index: number) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = option === currentQuestion.answer;
                      const showCorrect = showResult && isCorrect;
                      const showIncorrect = showResult && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResult}
                          className={cn(
                            "w-full p-5 rounded-xl border-2 text-left transition-all duration-200 font-gujarati text-lg",
                            !showResult && !isSelected && "border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:scale-[1.02]",
                            !showResult && isSelected && "border-purple-500 bg-purple-50 scale-[1.02]",
                            showCorrect && "border-green-500 bg-green-50",
                            showIncorrect && "border-red-500 bg-red-50",
                            showResult && "cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              showCorrect && "text-green-700 font-semibold",
                              showIncorrect && "text-red-700"
                            )}>
                              {option}
                            </span>
                            {showCorrect && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              </motion.div>
                            )}
                            {showIncorrect && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <XCircle className="w-6 h-6 text-red-600" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* XP Animation */}
                  {showResult && selectedAnswer === currentQuestion?.answer && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center"
                    >
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                        <Zap className="w-5 h-5" />
                        <span className="font-bold">+{10 + Math.min((streak - 1) * 2, 10)} XP</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Explanation */}
                  {showResult && currentQuestion?.explanation && (
                    <AnimatePresence>
                      {showExplanation ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                        >
                          <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                              <p className="font-semibold text-blue-800 mb-1 font-gujarati">સમજૂતી:</p>
                              <p className="text-blue-700 font-gujarati">{currentQuestion.explanation}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={handleShowExplanation}
                          className="w-full font-gujarati"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          સમજૂતી જુઓ
                        </Button>
                      )}
                    </AnimatePresence>
                  )}

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
                        {currentIndex < currentQuestions.length - 1 ? "આગળ વધો" : "પૂર્ણ કરો"}
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
