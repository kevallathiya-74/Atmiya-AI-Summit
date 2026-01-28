"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingDown, CheckCircle2 } from "lucide-react";
import type { RevisionSchedule } from "@/types";
import { cn } from "@/lib/utils";

interface SmartRevisionEngineProps {
  revisionSchedule: RevisionSchedule[];
  onCompleteRevision?: (id: string) => void;
  className?: string;
}

export function SmartRevisionEngine({
  revisionSchedule,
  onCompleteRevision,
  className,
}: SmartRevisionEngineProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const upcomingRevisions = revisionSchedule
    .filter((item) => !item.completed)
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
          <TrendingDown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 font-gujarati">
            સ્માર્ટ રિવિઝન એન્જિન
          </h3>
          <p className="text-sm text-gray-600">Forgetting Curve Based</p>
        </div>
      </div>

      {upcomingRevisions.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-900 font-gujarati">
            તમે બધા અદ્યતન છો!
          </p>
          <p className="text-sm text-gray-600 mt-1">
            No pending revisions. Great job!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingRevisions.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-gray-900">
                      {item.topicName}
                    </p>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        getPriorityColor(item.priority)
                      )}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.scheduledDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onCompleteRevision?.(item.id)}
                  className="font-gujarati"
                >
                  પૂર્ણ
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900 font-gujarati">
          🧠 ભૂલી જવાના વળાંક પર આધારિત શેડ્યૂલ
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Revisions scheduled based on memory retention science
        </p>
      </div>
    </Card>
  );
}
