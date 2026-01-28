"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, HelpCircle, Lightbulb, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ExplainableAIPage() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">સમજાવી શકાય તેવું AI</h1><p className="text-sm md:text-base text-gray-600 mt-2">Explainable AI - Understand how AI makes decisions</p></div>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"><div className="flex items-center gap-4"><Eye className="w-12 h-12 text-blue-600" /><div><h2 className="text-lg font-semibold text-gray-900">Transparent AI</h2><p className="text-sm text-gray-600">We explain every AI recommendation so you understand why.</p></div></div></Card>

        <Card className="p-6"><h2 className="text-xl font-semibold mb-4">Example: AI Recommendation</h2><div className="p-4 bg-purple-50 rounded-lg mb-4"><p className="font-semibold text-gray-900 mb-2">Recommended Topic: Integers - Negative Numbers</p><Button onClick={() => setShowExplanation(!showExplanation)} variant="outline" size="sm" className="mt-2"><HelpCircle className="w-4 h-4 mr-2" />Why this recommendation?</Button></div>{showExplanation && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200"><h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-blue-600" />AI Explanation:</h3><ul className="space-y-2 text-sm text-gray-700"><li>1. You completed "Whole Numbers" with 95% accuracy (shows strong foundation)</li><li>2. "Negative Numbers" is the logical next step in curriculum progression</li><li>3. Your learning DNA shows you prefer sequential, structured learning</li><li>4. 87% of students at your level find this topic appropriate next</li><li>5. This topic unlocks 3 future chapters you'll need</li></ul></motion.div>)}</Card>

        <Card className="p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-purple-600" />Ask AI: "Why?"</h2><p className="text-sm text-gray-700 mb-4">You can always ask AI to explain its decisions:</p><div className="space-y-2 text-sm text-gray-700"><p>• "Why did you recommend this topic?"</p><p>• "Why is this marked as difficult for me?"</p><p>• "Why am I seeing this question?"</p><p>• "Why is my readiness score 75%?"</p></div></Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50"><h3 className="text-lg font-semibold mb-4">Data Sources</h3><p className="text-sm text-gray-700 mb-3">Our AI uses:</p><ul className="space-y-2 text-sm text-gray-700"><li>✓ GSEB official syllabus</li><li>✓ Your performance history</li><li>✓ Learning patterns analysis</li><li>✓ Educational research</li></ul></Card>
      </motion.div>
    </div>
  );
}
