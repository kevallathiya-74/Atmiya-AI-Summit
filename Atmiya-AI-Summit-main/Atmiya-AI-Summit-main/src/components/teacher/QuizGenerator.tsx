"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTeacherStore, QuizQuestion } from "@/store/teacher-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileQuestion,
  Loader2,
  Download,
  Copy,
  Check,
  Plus,
  Minus,
  Sparkles,
  Printer,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  "ગણિત",
  "વિજ્ઞાન",
  "ગુજરાતી",
  "અંગ્રેજી",
  "સામાજિક વિજ્ઞાન",
];

const classes = [5, 6, 7, 8, 9, 10, 11, 12];

const questionTypes = [
  { id: "mcq", name: "MCQ", nameGu: "બહુવિકલ્પ" },
  { id: "short", name: "Short Answer", nameGu: "ટૂંક જવાબ" },
  { id: "long", name: "Long Answer", nameGu: "વિસ્તૃત જવાબ" },
  { id: "fill", name: "Fill in Blanks", nameGu: "ખાલી જગ્યા" },
  { id: "truefalse", name: "True/False", nameGu: "સાચું/ખોટું" },
];

// Sample generated questions
const generateSampleQuestions = (
  subject: string,
  difficulty: string,
  count: number,
  types: string[]
): Omit<QuizQuestion, "id">[] => {
  const sampleQuestions: Omit<QuizQuestion, "id">[] = [];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length] as QuizQuestion["type"];
    let question: Omit<QuizQuestion, "id">;

    if (type === "mcq") {
      question = {
        type: "mcq",
        question: `Sample MCQ Question ${i + 1} for ${subject}`,
        questionGu: `${subject} માટે MCQ પ્રશ્ન ${i + 1}`,
        options: ["વિકલ્પ A", "વિકલ્પ B", "વિકલ્પ C", "વિકલ્પ D"],
        answer: "વિકલ્પ A",
        answerGu: "વિકલ્પ A",
        marks: difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3,
        explanation: "This is the explanation for the answer.",
        explanationGu: "આ જવાબની સમજૂતી છે.",
      };
    } else if (type === "short") {
      question = {
        type: "short",
        question: `Sample Short Answer Question ${i + 1}`,
        questionGu: `ટૂંક જવાબ પ્રશ્ન ${i + 1}: [પ્રશ્ન અહીં]`,
        answer: "Sample short answer",
        answerGu: "ટૂંક જવાબ અહીં લખો",
        marks: 2,
      };
    } else if (type === "long") {
      question = {
        type: "long",
        question: `Sample Long Answer Question ${i + 1}`,
        questionGu: `વિસ્તૃત જવાબ પ્રશ્ન ${i + 1}: [પ્રશ્ન અહીં]`,
        answer: "Detailed answer with multiple points",
        answerGu: "વિસ્તૃત જવાબ અહીં લખો",
        marks: 5,
      };
    } else if (type === "fill") {
      question = {
        type: "fill",
        question: "________ is the capital of Gujarat.",
        questionGu: "ગુજરાતની રાજધાની ________ છે.",
        answer: "Gandhinagar",
        answerGu: "ગાંધીનગર",
        marks: 1,
      };
    } else {
      question = {
        type: "truefalse",
        question: "The Earth is flat.",
        questionGu: "પૃથ્વી સપાટ છે. (સાચું/ખોટું)",
        options: ["સાચું", "ખોટું"],
        answer: "ખોટું",
        answerGu: "ખોટું",
        marks: 1,
        explanation: "The Earth is spherical.",
        explanationGu: "પૃથ્વી ગોળાકાર છે.",
      };
    }

    sampleQuestions.push(question);
  }

  return sampleQuestions;
};

export default function QuizGenerator() {
  const { addQuiz, isGenerating, setIsGenerating } = useTeacherStore();

  const [formData, setFormData] = useState({
    class: 10,
    subject: "ગણિત",
    chapter: "",
    difficulty: "mixed" as "easy" | "medium" | "hard" | "mixed",
    questionCount: 10,
    duration: 30,
    selectedTypes: ["mcq", "short"],
    title: "",
  });

  const [generatedQuiz, setGeneratedQuiz] = useState<{
    questions: Omit<QuizQuestion, "id">[];
    totalMarks: number;
  } | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!formData.chapter || formData.selectedTypes.length === 0) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const questions = generateSampleQuestions(
      formData.subject,
      formData.difficulty,
      formData.questionCount,
      formData.selectedTypes
    );

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

    setGeneratedQuiz({ questions, totalMarks });
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (generatedQuiz) {
      addQuiz({
        title: formData.title || `${formData.subject} Quiz`,
        titleGu: formData.title || `${formData.subject} ક્વિઝ`,
        class: formData.class,
        subject: formData.subject,
        chapter: formData.chapter,
        difficulty: formData.difficulty,
        questionCount: formData.questionCount,
        questions: generatedQuiz.questions.map((q, i) => ({
          ...q,
          id: `q_${i}`,
        })),
        totalMarks: generatedQuiz.totalMarks,
        duration: formData.duration,
      });
    }
  };

  const handleCopy = async () => {
    if (!generatedQuiz) return;
    await navigator.clipboard.writeText(formatQuizForPrint());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatQuizForPrint = () => {
    if (!generatedQuiz) return "";

    let text = `
═══════════════════════════════════════════════════
${formData.subject} - પ્રશ્નપત્ર
ધોરણ: ${formData.class} | પ્રકરણ: ${formData.chapter}
સમય: ${formData.duration} મિનિટ | કુલ ગુણ: ${generatedQuiz.totalMarks}
═══════════════════════════════════════════════════

`;

    generatedQuiz.questions.forEach((q, i) => {
      text += `\nપ્રશ્ન ${i + 1}. (${q.marks} ગુણ)\n`;
      text += `${q.questionGu}\n`;

      if (q.options) {
        q.options.forEach((opt, j) => {
          text += `   ${String.fromCharCode(65 + j)}) ${opt}\n`;
        });
      }

      if (showAnswers) {
        text += `\n   જવાબ: ${q.answerGu}\n`;
        if (q.explanationGu) {
          text += `   સમજૂતી: ${q.explanationGu}\n`;
        }
      }

      text += "\n";
    });

    return text;
  };

  const toggleQuestionType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(typeId)
        ? prev.selectedTypes.filter((t) => t !== typeId)
        : [...prev.selectedTypes, typeId],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-2.5 rounded-xl shadow-md">
              <FileQuestion className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                પ્રશ્નપત્ર જનરેટર
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                AI સાથે MCQ, ટૂંક જવાબ, અને વિસ્તૃત જવાબ પ્રશ્નો બનાવો
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 font-gujarati flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-green-600" />
              સેટિંગ્સ
            </h2>

            <div className="space-y-4">
              <div>
                <Label className="font-gujarati">શીર્ષક (વૈકલ્પિક)</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="દા.ત. એકમ કસોટી - 1"
                  className="mt-1 font-gujarati"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-gujarati">ધોરણ</Label>
                  <select
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: parseInt(e.target.value) })
                    }
                    className="w-full mt-1 p-2 border rounded-lg"
                  >
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="font-gujarati">વિષય</Label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full mt-1 p-2 border rounded-lg"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label className="font-gujarati">પ્રકરણ</Label>
                <Input
                  value={formData.chapter}
                  onChange={(e) =>
                    setFormData({ ...formData, chapter: e.target.value })
                  }
                  placeholder="દા.ત. બીજગણિત"
                  className="mt-1 font-gujarati"
                />
              </div>

              <div>
                <Label className="font-gujarati">મુશ્કેલી સ્તર</Label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {[
                    { id: "easy", name: "સરળ" },
                    { id: "medium", name: "મધ્યમ" },
                    { id: "hard", name: "કઠિન" },
                    { id: "mixed", name: "મિશ્ર" },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() =>
                        setFormData({ ...formData, difficulty: d.id as any })
                      }
                      className={cn(
                        "p-2 rounded-lg text-sm font-gujarati transition-all",
                        formData.difficulty === d.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="font-gujarati">પ્રશ્નના પ્રકારો</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {questionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleQuestionType(type.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-gujarati transition-all",
                        formData.selectedTypes.includes(type.id)
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                    >
                      {type.nameGu}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="font-gujarati">પ્રશ્નોની સંખ્યા</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          questionCount: Math.max(1, formData.questionCount - 1),
                        })
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-bold">
                      {formData.questionCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          questionCount: formData.questionCount + 1,
                        })
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="font-gujarati">સમય (મિનિટ)</Label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value),
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  !formData.chapter ||
                  formData.selectedTypes.length === 0
                }
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 font-gujarati"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    જનરેટ થઈ રહ્યું છે...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    પ્રશ્નપત્ર બનાવો
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Quiz */}
          <Card className="p-6 lg:col-span-2 overflow-auto max-h-[80vh]">
            {!generatedQuiz ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center mb-4"
                >
                  <FileQuestion className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-700 font-gujarati mb-2">
                  પ્રશ્નપત્ર જનરેટ કરો
                </h3>
                <p className="text-gray-500 font-gujarati max-w-md">
                  ડાબી બાજુ સેટિંગ્સ પસંદ કરો અને &ldquo;પ્રશ્નપત્ર બનાવો&rdquo; બટન દબાવો
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 font-gujarati">
                      {formData.title || `${formData.subject} પ્રશ્નપત્ર`}
                    </h2>
                    <p className="text-sm text-gray-500 font-gujarati">
                      ધોરણ {formData.class} | {formData.chapter} | સમય:{" "}
                      {formData.duration} મિનિટ | કુલ ગુણ: {generatedQuiz.totalMarks}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAnswers(!showAnswers)}
                      className="font-gujarati"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {showAnswers ? "જવાબ છુપાવો" : "જવાબ જુઓ"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSave}
                      className="font-gujarati"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      સાચવો
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                    >
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                  {generatedQuiz.questions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "p-4 rounded-xl border-2",
                        question.type === "mcq" && "border-blue-200 bg-blue-50/50",
                        question.type === "short" && "border-green-200 bg-green-50/50",
                        question.type === "long" && "border-purple-200 bg-purple-50/50",
                        question.type === "fill" && "border-amber-200 bg-amber-50/50",
                        question.type === "truefalse" && "border-pink-200 bg-pink-50/50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-gujarati",
                              question.type === "mcq" && "bg-blue-200 text-blue-800",
                              question.type === "short" && "bg-green-200 text-green-800",
                              question.type === "long" && "bg-purple-200 text-purple-800",
                              question.type === "fill" && "bg-amber-200 text-amber-800",
                              question.type === "truefalse" && "bg-pink-200 text-pink-800"
                            )}
                          >
                            {questionTypes.find((t) => t.id === question.type)?.nameGu}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 font-gujarati">
                          {question.marks} ગુણ
                        </span>
                      </div>

                      <p className="text-gray-800 font-gujarati text-lg mb-3">
                        {question.questionGu}
                      </p>

                      {question.options && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {question.options.map((opt, i) => (
                            <div
                              key={i}
                              className={cn(
                                "p-2 rounded-lg text-sm font-gujarati",
                                showAnswers && opt === question.answerGu
                                  ? "bg-green-200 text-green-800 font-bold"
                                  : "bg-white border"
                              )}
                            >
                              {String.fromCharCode(65 + i)}) {opt}
                            </div>
                          ))}
                        </div>
                      )}

                      {showAnswers && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-green-700 font-gujarati">
                            <strong>જવાબ:</strong> {question.answerGu}
                          </p>
                          {question.explanationGu && (
                            <p className="text-sm text-gray-600 font-gujarati mt-1">
                              <strong>સમજૂતી:</strong> {question.explanationGu}
                            </p>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
