"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CurriculumSelector } from "@/components/shared";
import {
  BookMarked,
  ChevronRight,
  ChevronDown,
  FileText,
  CheckCircle2,
  Circle,
  Lock,
  Sparkles,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";

interface Topic {
  id: string;
  name: string;
  nameGu: string;
  completed: boolean;
  locked: boolean;
  subtopics?: Topic[];
}

export default function CurriculumPage() {
  const { studentContext } = useDashboardStore();
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  // Mock curriculum data
  const chapters = [
    {
      id: "ch1",
      number: 1,
      name: "Number System",
      nameGu: "સંખ્યા પદ્ધતિ",
      progress: 75,
      topics: [
        {
          id: "t1",
          name: "Natural Numbers",
          nameGu: "પ્રાકૃતિક સંખ્યાઓ",
          completed: true,
          locked: false,
        },
        {
          id: "t2",
          name: "Whole Numbers",
          nameGu: "પૂર્ણ સંખ્યાઓ",
          completed: true,
          locked: false,
        },
        {
          id: "t3",
          name: "Integers",
          nameGu: "પૂર્ણાંકો",
          completed: false,
          locked: false,
          subtopics: [
            {
              id: "st1",
              name: "Positive Integers",
              nameGu: "ધન પૂર્ણાંકો",
              completed: false,
              locked: false,
            },
            {
              id: "st2",
              name: "Negative Integers",
              nameGu: "ઋણ પૂર્ણાંકો",
              completed: false,
              locked: false,
            },
          ],
        },
        {
          id: "t4",
          name: "Rational Numbers",
          nameGu: "પરિમેય સંખ્યાઓ",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: "ch2",
      number: 2,
      name: "Algebra",
      nameGu: "બીજગણિત",
      progress: 40,
      topics: [
        {
          id: "t5",
          name: "Variables and Expressions",
          nameGu: "ચલ અને સમીકરણો",
          completed: true,
          locked: false,
        },
        {
          id: "t6",
          name: "Linear Equations",
          nameGu: "રેખીય સમીકરણો",
          completed: false,
          locked: false,
        },
        {
          id: "t7",
          name: "Polynomials",
          nameGu: "બહુપદી",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: "ch3",
      number: 3,
      name: "Geometry",
      nameGu: "ભૂમિતિ",
      progress: 0,
      topics: [
        {
          id: "t8",
          name: "Lines and Angles",
          nameGu: "રેખાઓ અને ખૂણા",
          completed: false,
          locked: false,
        },
        {
          id: "t9",
          name: "Triangles",
          nameGu: "ત્રિકોણ",
          completed: false,
          locked: true,
        },
      ],
    },
  ];

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            અભ્યાસક્રમ વૃક્ષ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Syllabus Tree - Complete curriculum at a glance
          </p>
        </div>

        {/* Curriculum Selector */}
        <CurriculumSelector />

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Chapters</p>
            <p className="text-2xl font-bold text-gray-900">{chapters.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Topics</p>
            <p className="text-2xl font-bold text-gray-900">
              {chapters.reduce((sum, ch) => sum + ch.topics.length, 0)}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {chapters.reduce(
                (sum, ch) =>
                  sum + ch.topics.filter((t) => t.completed).length,
                0
              )}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">
              {chapters.reduce(
                (sum, ch) =>
                  sum +
                  ch.topics.filter((t) => !t.completed && !t.locked).length,
                0
              )}
            </p>
          </Card>
        </div>

        {/* Curriculum Tree */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-purple-600" />
            {studentContext.currentSubject || "Mathematics"} Curriculum
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Class {studentContext.classLevel || 10} • GSEB Syllabus
          </p>

          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {chapters.map((chapter, chapterIndex) => {
                const isExpanded = expandedChapters.includes(chapter.id);

                return (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: chapterIndex * 0.05 }}
                  >
                    <div
                      className={cn(
                        "rounded-lg border-2 transition-all",
                        isExpanded
                          ? "border-purple-300 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      {/* Chapter Header */}
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full p-4 flex items-center gap-4 text-left"
                      >
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                              CH {chapter.number}
                            </span>
                            <h3 className="font-semibold text-gray-900">
                              {chapter.nameGu}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {chapter.name}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {chapter.progress}%
                          </div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all"
                              style={{ width: `${chapter.progress}%` }}
                            />
                          </div>
                        </div>
                      </button>

                      {/* Topics List */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-purple-200 bg-white"
                        >
                          <div className="p-4 space-y-2">
                            {chapter.topics.map((topic, topicIndex) => {
                              const hasSubtopics =
                                topic.subtopics && topic.subtopics.length > 0;
                              const isTopicExpanded = expandedTopics.includes(
                                topic.id
                              );

                              return (
                                <div key={topic.id} className="space-y-2">
                                  <div
                                    className={cn(
                                      "flex items-center gap-3 p-3 rounded-lg transition-all",
                                      topic.locked
                                        ? "bg-gray-50 cursor-not-allowed"
                                        : topic.completed
                                        ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                                        : "bg-blue-50 hover:bg-blue-100 cursor-pointer"
                                    )}
                                    onClick={() =>
                                      hasSubtopics && toggleTopic(topic.id)
                                    }
                                  >
                                    {hasSubtopics && (
                                      <div className="flex-shrink-0">
                                        {isTopicExpanded ? (
                                          <ChevronDown className="w-4 h-4 text-gray-600" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-gray-400" />
                                        )}
                                      </div>
                                    )}
                                    <div className="flex-shrink-0">
                                      {topic.locked ? (
                                        <Lock className="w-5 h-5 text-gray-400" />
                                      ) : topic.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-blue-600" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-gray-900 text-sm">
                                        {topic.nameGu}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {topic.name}
                                      </p>
                                    </div>
                                    {!topic.locked && (
                                      <Button size="sm" variant="ghost">
                                        {topic.completed ? "Review" : "Start"}
                                      </Button>
                                    )}
                                  </div>

                                  {/* Subtopics */}
                                  {hasSubtopics && isTopicExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="ml-12 space-y-2"
                                    >
                                      {topic.subtopics!.map((subtopic) => (
                                        <div
                                          key={subtopic.id}
                                          className={cn(
                                            "flex items-center gap-3 p-2 rounded-lg text-sm",
                                            subtopic.completed
                                              ? "bg-green-100"
                                              : "bg-gray-50"
                                          )}
                                        >
                                          <div className="flex-shrink-0">
                                            {subtopic.completed ? (
                                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            ) : (
                                              <Circle className="w-4 h-4 text-gray-400" />
                                            )}
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                              {subtopic.nameGu}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                              {subtopic.name}
                                            </p>
                                          </div>
                                          <Button size="sm" variant="ghost">
                                            Start
                                          </Button>
                                        </div>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Legend */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Locked (Complete previous topics)</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
