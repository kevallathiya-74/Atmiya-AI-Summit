"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Target, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyPlannerCardProps {
  examDate?: Date;
  onGeneratePlan?: () => void;
  className?: string;
}

export function StudyPlannerCard({
  examDate,
  onGeneratePlan,
  className,
}: StudyPlannerCardProps) {
  const daysUntilExam = examDate
    ? Math.ceil(
        (examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const todaysPlan = [
    { subject: "ગણિત", topic: "બીજગણિત", duration: "30 min", completed: true },
    {
      subject: "વિજ્ઞાન",
      topic: "ભૌતિકશાસ્ત્ર",
      duration: "45 min",
      completed: false,
    },
    {
      subject: "ગુજરાતી",
      topic: "વ્યાકરણ",
      duration: "20 min",
      completed: false,
    },
  ];

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 font-gujarati">
            AI અભ્યાસ આયોજક
          </h3>
          <p className="text-sm text-gray-600">Study Planner</p>
        </div>
      </div>

      {daysUntilExam && (
        <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-gujarati">
                પરીક્ષા સુધી
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {daysUntilExam} days
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      )}

      <div className="space-y-3 mb-4">
        <p className="text-sm font-medium text-gray-700 font-gujarati">
          આજની યોજના
        </p>
        {todaysPlan.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "p-3 rounded-lg border transition-all",
              item.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200 hover:shadow-md"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "font-medium",
                      item.completed
                        ? "text-green-800 line-through"
                        : "text-gray-900"
                    )}
                  >
                    {item.subject}
                  </p>
                  {!item.completed && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {item.duration}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.topic}</p>
              </div>
              {item.completed ? (
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full font-gujarati"
        onClick={onGeneratePlan}
        variant="outline"
      >
        <Calendar className="w-4 h-4 mr-2" />
        નવી યોજના બનાવો
      </Button>

      <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
        <p className="text-sm text-indigo-900 font-gujarati">
          ⏰ AI તમારા લક્ષ્યો અનુસાર યોજના સમાયોજિત કરે છે
        </p>
        <p className="text-xs text-indigo-700 mt-1">
          Auto-adjusts when you miss study sessions
        </p>
      </div>
    </Card>
  );
}
