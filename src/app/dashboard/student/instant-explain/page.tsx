"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, Send, Sparkles, Loader2 } from "lucide-react";

export default function InstantExplainPage() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");

  const handleAsk = () => {
    setIsLoading(true);
    setTimeout(() => {
      setExplanation("Step 1: Understand the problem...\nStep 2: Apply the formula...\nStep 3: Calculate the result...");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">તુરંત સમજૂતી</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">Instant Explanation - Get answers instantly</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-purple-600" />તમારો પ્રશ્ન પૂછો</h2>
          <Textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Type your question in Gujarati or English..." className="min-h-[120px] mb-4" />
          <Button onClick={handleAsk} disabled={!question || isLoading} className="w-full">{isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</> : <><Send className="w-4 h-4 mr-2" />Get Instant Explanation</>}</Button>
        </Card>

        {isLoading && (
          <Card className="p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
            </div>
          </Card>
        )}

        {explanation && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-green-600" />AI Explanation</h3>
              <ScrollArea className="h-[400px]"><pre className="whitespace-pre-wrap text-sm text-gray-700">{explanation}</pre></ScrollArea>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
