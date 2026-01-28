"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PenTool,
  Filter,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExamStylePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const itemsPerPage = 10;

  const questions = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    question: `Exam question ${i + 1} content here`,
    questionGu: `પરીક્ષા પ્રશ્ન ${i + 1} સામગ્રી અહીં`,
    difficulty: ["Easy", "Medium", "Hard"][i % 3],
    marks: [2, 3, 5][i % 3],
    time: [5, 10, 15][i % 3],
  }));

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              પરીક્ષા શૈલી પ્રશ્નો
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Exam-Style Questions - Practice like real exams
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">
              AI-Generated
            </span>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-3">
            {["all", "Easy", "Medium", "Hard"].map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff === "all" ? "All" : diff}
              </Button>
            ))}
          </div>
        </Card>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {currentQuestions.map((q, idx) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                        Q{q.id}
                      </span>
                      <span
                        className={cn(
                          "px-3 py-1 text-xs font-bold rounded",
                          q.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : q.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{q.marks} marks</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {q.time}min
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-900 mb-2">{q.questionGu}</p>
                  <p className="text-sm text-gray-600 mb-4">{q.question}</p>
                  <Button>Attempt Question</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
