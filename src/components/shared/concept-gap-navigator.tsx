"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Link2, TrendingUp } from "lucide-react";
import type { LearningDNA } from "@/types";
import { cn } from "@/lib/utils";

interface ConceptGapNavigatorProps {
  learningDNA: LearningDNA;
  onFillGap?: (topicId: string) => void;
  className?: string;
}

export function ConceptGapNavigator({
  learningDNA,
  onFillGap,
  className,
}: ConceptGapNavigatorProps) {
  const conceptGaps = learningDNA.conceptGaps || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (conceptGaps.length === 0) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 font-gujarati">
              કોન્સેપ્ટ ગેપ નેવિગેટર
            </h3>
            <p className="text-sm text-gray-600">Concept Gap Navigator</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-green-700 font-gujarati">
            🎉 તમને કોઈ કોન્સેપ્ટ ગેપ નથી!
          </p>
          <p className="text-sm text-gray-600 mt-2">
            No concept gaps detected. Great work!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 font-gujarati">
            કોન્સેપ્ટ ગેપ નેવિગેટર
          </h3>
          <p className="text-sm text-gray-600">Hidden Weak Concepts</p>
        </div>
      </div>

      <div className="space-y-3">
        {conceptGaps.slice(0, 5).map((gap) => (
          <div
            key={gap.topicId}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-gray-900">{gap.topicName}</p>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      getSeverityColor(gap.severity)
                    )}
                  >
                    {gap.severity}
                  </span>
                </div>
                {gap.relatedTopics.length > 0 && (
                  <div className="flex items-start gap-2 mt-2">
                    <Link2 className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-xs text-gray-600">
                      Related: {gap.relatedTopics.slice(0, 2).join(", ")}
                    </p>
                  </div>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onFillGap?.(gap.topicId)}
                className="font-gujarati"
              >
                ભરો
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-orange-50 rounded-lg">
        <p className="text-sm text-orange-900 font-gujarati">
          🔍 AI એ છુપાયેલી નબળી કોન્સેપ્ટ શોધી છે
        </p>
        <p className="text-xs text-orange-700 mt-1">
          Focus on these to strengthen your foundation
        </p>
      </div>
    </Card>
  );
}
