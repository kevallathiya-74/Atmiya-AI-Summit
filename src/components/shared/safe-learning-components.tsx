"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SafeLearningBadgeProps {
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

export function SafeLearningBadge({
  isActive = true,
  onToggle,
  className,
}: SafeLearningBadgeProps) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              isActive ? "bg-green-100" : "bg-gray-100"
            )}
          >
            <Shield
              className={cn(
                "w-5 h-5",
                isActive ? "text-green-600" : "text-gray-400"
              )}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 font-gujarati">
              સુરક્ષિત શિક્ષણ મોડ
            </p>
            <p className="text-xs text-gray-600">Child-safe content only</p>
          </div>
        </div>
        {onToggle && (
          <Button
            size="sm"
            variant={isActive ? "default" : "outline"}
            onClick={() => onToggle(!isActive)}
          >
            {isActive ? "Active" : "Activate"}
          </Button>
        )}
      </div>

      {isActive && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-3 h-3" />
            <span>Age-appropriate content verified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Eye className="w-3 h-3" />
            <span>AI moderation active</span>
          </div>
        </div>
      )}
    </Card>
  );
}

interface ExplainableAICardProps {
  explanation?: {
    source: string;
    confidence: number;
    reasoning: string;
  };
  onShowExplanation?: () => void;
  className?: string;
}

export function ExplainableAICard({
  explanation,
  onShowExplanation,
  className,
}: ExplainableAICardProps) {
  if (!explanation) return null;

  return (
    <Card className={cn("p-4 border-blue-200 bg-blue-50", className)}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900 font-gujarati mb-2">
            આ જવાબ કેમ?
          </p>
          <div className="space-y-2 text-xs text-blue-800">
            <div>
              <span className="font-medium">Source: </span>
              {explanation.source}
            </div>
            <div>
              <span className="font-medium">Confidence: </span>
              {explanation.confidence}%
            </div>
            {explanation.reasoning && (
              <div>
                <span className="font-medium">Reasoning: </span>
                {explanation.reasoning}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
