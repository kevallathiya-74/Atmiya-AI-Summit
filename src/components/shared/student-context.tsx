"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { AlertCircle, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StudentContext as StudentContextType } from "@/types";

interface StudentContextBannerProps {
  context: StudentContextType;
  showDifficulty?: boolean;
  className?: string;
}

export function StudentContextBanner({
  context,
  showDifficulty = false,
  className,
}: StudentContextBannerProps) {
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">
              Current Learning Context
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-gray-900">
                Class {context.classLevel}
              </span>
              {context.currentSubject && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {context.currentSubject}
                  </span>
                </>
              )}
              {context.currentChapter && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {context.currentChapter}
                  </span>
                </>
              )}
            </div>
            {context.currentTopic && (
              <p className="text-sm text-gray-500 mt-1 font-gujarati">
                Topic: {context.currentTopic}
              </p>
            )}
          </div>
        </div>

        {showDifficulty && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm"
          >
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Adaptive</span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

interface WeakTopicAlertProps {
  topicName: string;
  severity: "low" | "medium" | "high";
  relatedTopics?: string[];
  className?: string;
}

export function WeakTopicAlert({
  topicName,
  severity,
  relatedTopics = [],
  className,
}: WeakTopicAlertProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case "high":
        return "from-red-50 to-red-100 border-red-300";
      case "medium":
        return "from-orange-50 to-orange-100 border-orange-300";
      case "low":
        return "from-yellow-50 to-yellow-100 border-yellow-300";
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "rounded-lg border p-4 bg-gradient-to-r",
        getSeverityColor(),
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-gray-900">Weak Area Detected</h4>
          <p className="text-sm text-gray-700 mt-1">
            You might need more practice in: <strong>{topicName}</strong>
          </p>
          {relatedTopics.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-600">Related topics:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {relatedTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white text-gray-700"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
