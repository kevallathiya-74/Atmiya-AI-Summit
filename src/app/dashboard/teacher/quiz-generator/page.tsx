"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
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
  Save,
  Edit,
  Trash2,
  BookOpen,
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

interface SavedQuiz {
  id: string;
  title: string;
  titleGu: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  questions: QuizQuestion[];
  createdAt: string;
  totalMarks: number;
}

export default function QuizGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[]>([]);

  // New states for CRUD
  const [activeTab, setActiveTab] = useState<"generate" | "saved">("generate");
  const [savedQuizzes, setSavedQuizzes] = useState<SavedQuiz[]>([
    {
      id: "1",
      title: "Mathematics Basic Quiz",
      titleGu: "ગણિત મૂળભૂત ક્વિઝ",
      topic: "Mathematics",
      difficulty: "easy",
      questions: [],
      createdAt: "2 દિવસ પહેલાં",
      totalMarks: 20,
    },
    {
      id: "2",
      title: "Science Advanced Test",
      titleGu: "વિજ્ઞાન અદ્યતન પરીક્ષા",
      topic: "Science",
      difficulty: "hard",
      questions: [],
      createdAt: "1 અઠવાડિયા પહેલાં",
      totalMarks: 50,
    },
  ]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<SavedQuiz | null>(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizTitleGu, setQuizTitleGu] = useState("");

  // CRUD Handlers
  const handleSaveQuiz = () => {
    if (!quizTitle.trim() || !quizTitleGu.trim()) {
      alert(
        "કૃપા કરીને ક્વિઝ શીર્ષક અંગ્રેજી અને ગુજરાતીમાં ભરો | Please fill quiz title in both English and Gujarati"
      );
      return;
    }

    if (generatedQuiz.length === 0) {
      alert("કૃપા કરીને પ્રથમ ક્વિઝ જનરેટ કરો | Please generate a quiz first");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const totalMarks = generatedQuiz.reduce((sum, q) => sum + q.marks, 0);
      const newQuiz: SavedQuiz = {
        id: Date.now().toString(),
        title: quizTitle,
        titleGu: quizTitleGu,
        topic,
        difficulty,
        questions: generatedQuiz,
        createdAt: "હમણાં જ",
        totalMarks,
      };
      setSavedQuizzes([newQuiz, ...savedQuizzes]);
      setShowSaveDialog(false);
      setQuizTitle("");
      setQuizTitleGu("");
      setIsSaving(false);
      alert("ક્વિઝ સફળતાપૂર્વક સાચવ્યું! | Quiz saved successfully!");
    }, 1000);
  };

  const handleEditClick = (quiz: SavedQuiz) => {
    setSelectedQuiz(quiz);
    setQuizTitle(quiz.title);
    setQuizTitleGu(quiz.titleGu);
    setShowEditDialog(true);
  };

  const handleUpdateQuiz = () => {
    if (!quizTitle.trim() || !quizTitleGu.trim()) {
      alert("કૃપા કરીને ક્વિઝ શીર્ષક ભરો | Please fill quiz title");
      return;
    }

    setIsEditing(true);
    setTimeout(() => {
      setSavedQuizzes(
        savedQuizzes.map((quiz) =>
          quiz.id === selectedQuiz?.id
            ? { ...quiz, title: quizTitle, titleGu: quizTitleGu }
            : quiz
        )
      );
      setShowEditDialog(false);
      setSelectedQuiz(null);
      setQuizTitle("");
      setQuizTitleGu("");
      setIsEditing(false);
      alert("ક્વિઝ અપડેટ થયું! | Quiz updated!");
    }, 1000);
  };

  const handleDeleteClick = (quiz: SavedQuiz) => {
    setSelectedQuiz(quiz);
    setShowDeleteDialog(true);
  };

  const handleDeleteQuiz = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setSavedQuizzes(
        savedQuizzes.filter((quiz) => quiz.id !== selectedQuiz?.id)
      );
      setShowDeleteDialog(false);
      setSelectedQuiz(null);
      setIsDeleting(false);
    }, 1000);
  };

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

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab("generate")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "generate"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>ક્વિઝ જનરેટ કરો | Generate Quiz</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "saved"
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>સાચવેલ ક્વિઝ | Saved Quizzes ({savedQuizzes.length})</span>
            </div>
          </button>
        </div>

        {activeTab === "generate" ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: "કુલ ક્વિઝ | Total Quizzes",
                  value: savedQuizzes.length.toString(),
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
                      setDifficulty(
                        e.target.value as "easy" | "medium" | "hard"
                      )
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
                    <Button
                      onClick={() => setShowSaveDialog(true)}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4" />
                      સાચવો | Save
                    </Button>
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
          </>
        ) : (
          /* Saved Quizzes View */
          <div className="space-y-4">
            {savedQuizzes.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  કોઈ સાચવેલ ક્વિઝ નથી | No Saved Quizzes
                </h3>
                <p className="text-gray-500">
                  પ્રથમ ક્વિઝ જનરેટ કરો અને તેને સાચવો | Generate your first
                  quiz and save it
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedQuizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {quiz.titleGu}
                          </h3>
                          <p className="text-sm text-gray-600">{quiz.title}</p>
                        </div>
                        <FileText className="w-8 h-8 text-purple-500" />
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">વિષય | Topic:</span>
                          <span className="font-medium">{quiz.topic}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">સ્તર | Level:</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              difficultyColors[quiz.difficulty]
                            }`}
                          >
                            {quiz.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            કુલ ગુણ | Marks:
                          </span>
                          <span className="font-medium">{quiz.totalMarks}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            બનાવ્યું | Created:
                          </span>
                          <span className="font-medium">{quiz.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditClick(quiz)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          સંપાદન | Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(quiz)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>ક્વિઝ સાચવો | Save Quiz</DialogTitle>
            <DialogDescription>
              આ ક્વિઝને ભવિષ્યમાં ઉપયોગ માટે સાચવો | Save this quiz for future
              use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>શીર્ષક (ગુજરાતી) | Title (Gujarati) *</Label>
              <Input
                value={quizTitleGu}
                onChange={(e) => setQuizTitleGu(e.target.value)}
                placeholder="ઉદાહરણ: ગણિત મૂળભૂત ક્વિઝ"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (English) *</Label>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="e.g., Mathematics Basic Quiz"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              disabled={isSaving}
            >
              રદ કરો | Cancel
            </Button>
            <Button onClick={handleSaveQuiz} disabled={isSaving}>
              {isSaving ? "સાચવી રહ્યું છે..." : "સાચવો | Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>ક્વિઝ સંપાદિત કરો | Edit Quiz</DialogTitle>
            <DialogDescription>
              ક્વિઝ શીર્ષક અપડેટ કરો | Update quiz title
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>શીર્ષક (ગુજરાતી) | Title (Gujarati) *</Label>
              <Input
                value={quizTitleGu}
                onChange={(e) => setQuizTitleGu(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (English) *</Label>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              રદ કરો | Cancel
            </Button>
            <Button onClick={handleUpdateQuiz} disabled={isEditing}>
              {isEditing ? "અપડેટ કરી રહ્યું છે..." : "અપડેટ | Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteQuiz}
        title="ક્વિઝ કાઢી નાખો? | Delete Quiz?"
        description={`શું તમે ખરેખર "${selectedQuiz?.titleGu}" કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી ફેરવી શકાશે નહીં. | Are you sure you want to delete "${selectedQuiz?.title}"? This action cannot be undone.`}
        confirmText={
          isDeleting ? "કાઢી રહ્યું છે..." : "હા, કાઢી નાખો | Yes, Delete"
        }
        cancelText="રદ કરો | Cancel"
        variant="danger"
      />
    </div>
  );
}
