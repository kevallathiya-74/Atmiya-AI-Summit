"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/store/dashboard-store";
import {
  BookOpen,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClassLevel, Subject, Chapter, Topic } from "@/types";

// Demo data - replace with API calls
const DEMO_SUBJECTS: Subject[] = [
  { id: "math", name: "Mathematics", nameGu: "ગણિત", icon: "📐" },
  { id: "science", name: "Science", nameGu: "વિજ્ઞાન", icon: "🔬" },
  { id: "gujarati", name: "Gujarati", nameGu: "ગુજરાતી", icon: "📖" },
  {
    id: "social",
    name: "Social Science",
    nameGu: "સામાજિક વિજ્ઞાન",
    icon: "🌍",
  },
];

const DEMO_CHAPTERS: Record<string, Chapter[]> = {
  math: [
    {
      id: "ch1",
      subjectId: "math",
      name: "Algebra",
      nameGu: "બીજગણિત",
      topicCount: 5,
    },
    {
      id: "ch2",
      subjectId: "math",
      name: "Geometry",
      nameGu: "ભૂમિતિ",
      topicCount: 7,
    },
  ],
  science: [
    {
      id: "ch3",
      subjectId: "science",
      name: "Physics",
      nameGu: "ભૌતિક વિજ્ઞાન",
      topicCount: 6,
    },
    {
      id: "ch4",
      subjectId: "science",
      name: "Chemistry",
      nameGu: "રસાયણ વિજ્ઞાન",
      topicCount: 4,
    },
  ],
};

const DEMO_TOPICS: Record<string, Topic[]> = {
  ch1: [
    {
      id: "t1",
      chapterId: "ch1",
      name: "Linear Equations",
      nameGu: "રેખીય સમીકરણો",
      masteryLevel: 85,
    },
    {
      id: "t2",
      chapterId: "ch1",
      name: "Quadratic Equations",
      nameGu: "ચતુર્ભુજ સમીકરણો",
      isWeak: true,
      masteryLevel: 45,
    },
  ],
};

export function CurriculumSelector() {
  const { studentContext, setStudentContext } = useDashboardStore();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId === selectedSubject ? null : subjectId);
    setSelectedChapter(null);
    setStudentContext({ currentSubject: subjectId });
  };

  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId === selectedChapter ? null : chapterId);
    setStudentContext({ currentChapter: chapterId });
  };

  const handleTopicClick = (topic: Topic) => {
    setStudentContext({ currentTopic: topic.name });
  };

  return (
    <div className="space-y-4">
      {/* Class Level Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 font-gujarati">
            તમારો વર્ગ
          </h3>
          <div className="flex gap-2">
            {([10, 11, 12] as ClassLevel[]).map((level) => (
              <Button
                key={level}
                variant={
                  studentContext.classLevel === level ? "default" : "outline"
                }
                size="sm"
                onClick={() => setStudentContext({ classLevel: level })}
              >
                Class {level}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Subjects Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DEMO_SUBJECTS.map((subject) => (
          <motion.button
            key={subject.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubjectClick(subject.id)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all text-left",
              selectedSubject === subject.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:border-blue-300"
            )}
          >
            <div className="text-3xl mb-2">{subject.icon}</div>
            <div className="font-semibold text-gray-900">{subject.name}</div>
            <div className="text-sm text-gray-600 font-gujarati">
              {subject.nameGu}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Chapters List */}
      <AnimatePresence>
        {selectedSubject && DEMO_CHAPTERS[selectedSubject] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2"
          >
            <h4 className="font-semibold text-gray-900 font-gujarati px-2">
              પ્રકરણો
            </h4>
            {DEMO_CHAPTERS[selectedSubject].map((chapter) => (
              <Card
                key={chapter.id}
                className={cn(
                  "p-4 cursor-pointer transition-all",
                  selectedChapter === chapter.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-blue-300"
                )}
                onClick={() => handleChapterClick(chapter.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {chapter.name}
                    </div>
                    <div className="text-sm text-gray-600 font-gujarati">
                      {chapter.nameGu}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {chapter.topicCount} topics
                    </span>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 transition-transform",
                        selectedChapter === chapter.id && "rotate-90"
                      )}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Topics List */}
      <AnimatePresence>
        {selectedChapter && DEMO_TOPICS[selectedChapter] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2"
          >
            <h4 className="font-semibold text-gray-900 font-gujarati px-2">
              વિષયો
            </h4>
            {DEMO_TOPICS[selectedChapter].map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ x: 4 }}
                onClick={() => handleTopicClick(topic)}
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-all",
                  "border-2 bg-white",
                  topic.isWeak
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-200 hover:border-blue-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {topic.isWeak ? (
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {topic.name}
                      </div>
                      <div className="text-sm text-gray-600 font-gujarati">
                        {topic.nameGu}
                      </div>
                    </div>
                  </div>
                  {topic.masteryLevel !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-gray-700">
                        {topic.masteryLevel}%
                      </div>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all",
                            topic.masteryLevel >= 70
                              ? "bg-green-500"
                              : topic.masteryLevel >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          )}
                          style={{ width: `${topic.masteryLevel}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Next Best Topic Suggestion */}
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 font-gujarati">
                    AI ભલામણ
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 font-gujarati">
                    આગળ &quot;Quadratic Equations&quot; અભ્યાસ કરો - તમારી
                    પ્રગતિ માટે શ્રેષ્ઠ
                  </p>
                  <Button size="sm" className="mt-3 font-gujarati">
                    શરૂ કરો
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
