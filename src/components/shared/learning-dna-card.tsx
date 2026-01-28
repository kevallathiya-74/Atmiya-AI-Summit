"use client";

import { Card } from "@/components/ui/card";
import { Brain, Clock, BookMarked, Mic } from "lucide-react";
import type { LearningDNA } from "@/types";
import { cn } from "@/lib/utils";

interface LearningDNACardProps {
  learningDNA: LearningDNA;
  className?: string;
}

export function LearningDNACard({
  learningDNA,
  className,
}: LearningDNACardProps) {
  const dnaMetrics = [
    {
      icon: BookMarked,
      label: "મજબૂત વિષયો",
      labelEn: "Strong Subjects",
      value: learningDNA.strongSubjects.slice(0, 3).join(", ") || "N/A",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: Brain,
      label: "કમજોર વિષયો",
      labelEn: "Weak Topics",
      value: learningDNA.weakTopics.slice(0, 3).join(", ") || "Great progress!",
      color: "text-orange-600 bg-orange-50",
    },
    {
      icon: Clock,
      label: "શીખવાનો સમય",
      labelEn: "Learning Time",
      value: learningDNA.preferredLearningTime,
      color: "text-blue-600 bg-blue-50",
    },
  ];

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 font-gujarati">
            તમારી લર્નિંગ DNA
          </h3>
          <p className="text-sm text-gray-600">Your Learning Profile</p>
        </div>
      </div>

      <div className="space-y-3">
        {dnaMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
            >
              <div className={cn("p-2 rounded-lg", metric.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 font-gujarati">
                  {metric.label}
                </p>
                <p className="text-xs text-gray-600">{metric.labelEn}</p>
                <p className="text-sm text-gray-800 mt-1 truncate">
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900 font-gujarati">
          💡 તમારી શીખવાની શૈલી અનુકૂળ બનાવવામાં આવી રહી છે
        </p>
        <p className="text-xs text-blue-700 mt-1">
          AI is adapting to your learning style
        </p>
      </div>
    </Card>
  );
}
