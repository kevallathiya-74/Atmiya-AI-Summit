"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SelfExplanationPage() {
  const [explanation, setExplanation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">સ્વ-સમજૂતી</h1><p className="text-sm md:text-base text-gray-600 mt-2">Self Explanation - Explain concepts in your own words</p></div>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50"><h2 className="text-xl font-semibold mb-2">Today's Topic: Integers</h2><p className="text-sm text-gray-600 mb-4">આજનો વિષય: પૂર્ણાંકો</p><p className="text-gray-700">Explain what you learned about integers today in your own words. Try to include examples.</p></Card>

        <Card className="p-6"><Textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Type your explanation in Gujarati or English..." className="min-h-[200px] mb-4" /><Button onClick={() => setSubmitted(true)} disabled={!explanation} className="w-full"><Send className="w-4 h-4 mr-2" />Submit Explanation</Button></Card>

        {submitted && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300"><div className="flex items-center gap-3"><CheckCircle2 className="w-8 h-8 text-green-600" /><div><h3 className="text-lg font-semibold text-gray-900">Great Job!</h3><p className="text-sm text-gray-600">Your explanation has been saved. +20 XP earned!</p></div></div></Card></motion.div>)}
      </motion.div>
    </div>
  );
}
