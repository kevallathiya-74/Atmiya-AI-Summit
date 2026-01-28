"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "./progress-ring";
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ExamReadiness } from "@/types";
import { cn } from "@/lib/utils";

interface ExamReadinessCardProps {
  examReadiness: ExamReadiness;
  onFocusArea?: (area: string) => void;
  className?: string;
}

export function ExamReadinessCard({
  examReadiness,
  onFocusArea,
  className,
}: ExamReadinessCardProps) {
  const getReadinessLevel = (percentage: number) => {
    if (percentage >= 80)
      return { label: "તૈયાર", color: "text-green-600", labelEn: "Ready" };
    if (percentage >= 60)
      return { label: "સારું", color: "text-blue-600", labelEn: "Good" };
    if (percentage >= 40)
      return {
        label: "સુધારો",
        color: "text-orange-600",
        labelEn: "Needs Work",
      };
    return {
      label: "વધુ મહેનત",
      color: "text-red-600",
      labelEn: "More Effort",
    };
  };

  const readiness = getReadinessLevel(examReadiness.percentage);

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 font-gujarati">
            પરીક્ષા તૈયારી
          </h3>
          <p className="text-sm text-gray-600">Exam Readiness</p>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6 relative">
        <ProgressRing
          progress={examReadiness.percentage}
          size={140}
          strokeWidth={12}
          showPercentage={false}
          color="stroke-green-500"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn("text-3xl font-bold", readiness.color)}>
              {examReadiness.percentage}%
            </div>
            <div className="text-sm text-gray-600 font-gujarati mt-1">
              {readiness.label}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {examReadiness.strongAreas.length > 0 && (
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm font-medium text-green-900 font-gujarati">
                મજબૂત ક્ષેત્રો
              </p>
            </div>
            <p className="text-xs text-green-700">
              {examReadiness.strongAreas.slice(0, 3).join(", ")}
            </p>
          </div>
        )}

        {examReadiness.weakAreas.length > 0 && (
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <p className="text-sm font-medium text-orange-900 font-gujarati">
                નબળા ક્ષેત્રો
              </p>
            </div>
            <p className="text-xs text-orange-700 mb-2">
              {examReadiness.weakAreas.slice(0, 3).join(", ")}
            </p>
            {onFocusArea && (
              <Button
                size="sm"
                variant="outline"
                className="w-full font-gujarati"
                onClick={() => onFocusArea(examReadiness.weakAreas[0])}
              >
                આ પર ધ્યાન કેન્દ્રિત કરો
              </Button>
            )}
          </div>
        )}

        {examReadiness.recommendedFocus.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-900 font-gujarati">
                ભલામણ કરેલ ફોકસ
              </p>
            </div>
            <p className="text-xs text-blue-700">
              {examReadiness.recommendedFocus.slice(0, 2).join(", ")}
            </p>
          </div>
        )}
      </div>

      {examReadiness.predictedScore && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-900 font-gujarati">
            🎯 અનુમાનિત સ્કોર: {examReadiness.predictedScore}%
          </p>
          <p className="text-xs text-purple-700 mt-1">
            Based on current performance trends
          </p>
        </div>
      )}
    </Card>
  );
}
