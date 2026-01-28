"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ConceptGapNavigator } from "@/components/shared";
import { AlertCircle, Target, TrendingUp } from "lucide-react";

export default function ConceptGapsPage() {
  const gaps = [
    { concept: "Negative Numbers", conceptGu: "ઋણ સંખ્યાઓ", severity: "High", chapter: "Integers" },
    { concept: "Fractions", conceptGu: "ભિન્ન", severity: "Medium", chapter: "Number System" },
    { concept: "Angles", conceptGu: "ખૂણા", severity: "Low", chapter: "Geometry" },
  ];

  const mockLearningDNA = {
    strongSubjects: ["Mathematics"],
    weakTopics: ["Negative Numbers", "Fractions"],
    preferredLearningTime: "Evening",
    averageStudyDuration: 60,
    conceptGaps: gaps.map((g, i) => ({
      topicId: `topic-${i}`,
      topicName: g.concept,
      severity: g.severity.toLowerCase() as "low" | "medium" | "high",
      relatedTopics: [],
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">કોન્સેપ્ટ ગેપ</h1><p className="text-sm md:text-base text-gray-600 mt-2">Concept Gaps - AI identifies knowledge gaps</p></div>

        <ConceptGapNavigator learningDNA={mockLearningDNA} />

        <Card className="p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-600" />Identified Gaps</h2><div className="space-y-3">{gaps.map((gap, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className={`p-4 rounded-lg border-2 ${gap.severity === 'High' ? 'bg-red-50 border-red-300' : gap.severity === 'Medium' ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'}`}><div className="flex items-center justify-between"><div><p className="font-semibold text-gray-900">{gap.conceptGu}</p><p className="text-sm text-gray-600">{gap.concept} • {gap.chapter}</p></div><span className={`px-3 py-1 rounded-full text-xs font-bold ${gap.severity === 'High' ? 'bg-red-100 text-red-700' : gap.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{gap.severity}</span></div></motion.div>))}</div></Card>
      </motion.div>
    </div>
  );
}
