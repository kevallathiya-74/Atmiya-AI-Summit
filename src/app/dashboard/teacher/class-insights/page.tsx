"use client";

import { Card } from "@/components/ui/card";
import { ClassHeatmap } from "@/components/shared";
import { Users, TrendingUp, AlertCircle } from "lucide-react";

const DEMO_HEATMAP_DATA = [
  {
    studentId: "1",
    studentName: "Student 1",
    topicId: "t1",
    topicName: "Topic A",
    score: 85,
    attentionLevel: "high" as const,
  },
  {
    studentId: "2",
    studentName: "Student 2",
    topicId: "t1",
    topicName: "Topic A",
    score: 72,
    attentionLevel: "medium" as const,
  },
  {
    studentId: "3",
    studentName: "Student 3",
    topicId: "t1",
    topicName: "Topic A",
    score: 45,
    attentionLevel: "low" as const,
  },
];

export default function ClassInsightsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Class Insights</h1>
        <p className="text-gray-600 font-gujarati mt-1">
          વિદ્યાર્થીઓની પ્રગતિ અને કામગીરી વિશ્લેષણ
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Class Performance Heatmap
          </h2>
        </div>
        <ClassHeatmap data={DEMO_HEATMAP_DATA} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900 font-gujarati">
              પ્રગતિશીલ વિદ્યાર્થીઓ
            </h3>
          </div>
          <p className="text-gray-600">Feature coming soon...</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900 font-gujarati">
              ધ્યાનની જરૂર
            </h3>
          </div>
          <p className="text-gray-600">Feature coming soon...</p>
        </Card>
      </div>
    </div>
  );
}
