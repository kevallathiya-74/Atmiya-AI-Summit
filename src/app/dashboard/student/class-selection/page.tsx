"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Check,
  ArrowRight,
  BookOpen,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import type { ClassLevel } from "@/types";

export default function ClassSelectionPage() {
  const { studentContext, setStudentContext } = useDashboardStore();
  const [selectedClass, setSelectedClass] = useState(
    studentContext.classLevel || 10
  );

  const classes: {
    value: ClassLevel;
    label: string;
    labelEn: string;
    subjects: number;
  }[] = [
    { value: 5, label: "ધોરણ 5", labelEn: "Class 5", subjects: 6 },
    { value: 6, label: "ધોરણ 6", labelEn: "Class 6", subjects: 7 },
    { value: 7, label: "ધોરણ 7", labelEn: "Class 7", subjects: 7 },
    { value: 8, label: "ધોરણ 8", labelEn: "Class 8", subjects: 8 },
    { value: 9, label: "ધોરણ 9", labelEn: "Class 9", subjects: 9 },
    { value: 10, label: "ધોરણ 10", labelEn: "Class 10", subjects: 9 },
    { value: 11, label: "ધોરણ 11", labelEn: "Class 11", subjects: 10 },
    { value: 12, label: "ધોરણ 12", labelEn: "Class 12", subjects: 10 },
  ];

  const handleClassSelect = (classValue: ClassLevel) => {
    setSelectedClass(classValue);
  };

  const handleConfirm = () => {
    setStudentContext({ classLevel: selectedClass });
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
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center"
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            તમારું ધોરણ પસંદ કરો
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Select Your Class - Choose from Class 5 to Class 12
          </p>
        </div>

        {/* Current Selection Display */}
        {studentContext.classLevel && (
          <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Class</p>
                <p className="text-2xl font-bold text-gray-900">
                  Class {studentContext.classLevel} • ધોરણ{" "}
                  {studentContext.classLevel}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        )}

        {/* Class Selection Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {classes.map((classItem, index) => {
            const isSelected = selectedClass === classItem.value;
            const isCurrent = studentContext.classLevel === classItem.value;

            return (
              <motion.div
                key={classItem.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative",
                    isSelected
                      ? "ring-4 ring-purple-500 shadow-xl"
                      : "hover:ring-2 hover:ring-gray-300"
                  )}
                  onClick={() => handleClassSelect(classItem.value)}
                >
                  {isCurrent && (
                    <div className="absolute top-3 right-3">
                      <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                        Current
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <div
                      className={cn(
                        "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-gradient-to-br from-purple-500 to-indigo-600 scale-110"
                          : "bg-gradient-to-br from-gray-200 to-gray-300"
                      )}
                    >
                      <span
                        className={cn(
                          "text-2xl font-bold",
                          isSelected ? "text-white" : "text-gray-600"
                        )}
                      >
                        {classItem.value}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {classItem.label}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {classItem.labelEn}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <BookOpen className="w-4 h-4" />
                      <span>{classItem.subjects} Subjects</span>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 w-8 h-8 mx-auto rounded-full bg-purple-500 flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Confirm Button */}
        {selectedClass !== studentContext.classLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">
                    You&apos;ve selected / તમે પસંદ કર્યું છે:
                  </p>
                  <p className="text-2xl font-bold">
                    Class {selectedClass} • ધોરણ {selectedClass}
                  </p>
                </div>
                <Button
                  onClick={handleConfirm}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                >
                  Confirm Selection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              What Changes? / શું બદલાય છે?
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Curriculum and syllabus content will match your class /
                  અભ્યાસક્રમ અને સિલેબસ સામગ્રી તમારા ધોરણ સાથે મેળ ખાશે
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  Question difficulty will be adjusted / પ્રશ્નની મુશ્કેલી
                  ગોઠવવામાં આવશે
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  AI recommendations will be personalized / AI ભલામણો વ્યક્તિગત
                  થશે
                </span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              GSEB Aligned / GSEB સાથે સંરેખિત
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              All content, questions, and syllabus are aligned with Gujarat
              Secondary and Higher Secondary Education Board (GSEB) standards.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              બધી સામગ્રી, પ્રશ્નો અને અભ્યાસક્રમ ગુજરાત માધ્યમિક અને ઉચ્ચતર
              માધ્યમિક શિક્ષણ બોર્ડ (GSEB) ધોરણો સાથે સંરેખિત છે.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
