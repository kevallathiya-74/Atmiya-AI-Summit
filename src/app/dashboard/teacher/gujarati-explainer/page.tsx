"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Download, Volume2, RefreshCw } from "lucide-react";

export default function GujaratiExplainerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState({
    topic: "",
    englishText: "",
    difficulty: "medium",
  });
  const [gujaratiExplanation, setGujaratiExplanation] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGujaratiExplanation(
        `${input.topic} વિશે સરળ સમજૂતી:\n\nઆ વિષય મહત્વપૂર્ણ છે કારણ કે તે વિદ્યાર્થીઓને મૂળભૂત ખ્યાલોને સમજવામાં મદદ કરે છે. આપણે આને વિવિધ ઉદાહરણો દ્વારા સમજી શકીએ છીએ.\n\nમુખ્ય મુદ્દાઓ:\n• પ્રથમ મહત્વપૂર્ણ વિગત\n• બીજી મહત્વપૂર્ણ વિગત\n• ત્રીજી મહત્વપૂર્ણ વિગત\n\nઉદાહરણ: આ વિષયની વાસ્તવિક જિંદગીમાં ઉપયોગિતા...`
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Gujarati Explanation Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Convert English concepts to simple Gujarati explanations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Input</h2>
            <div className="space-y-4">
              <div>
                <Label>Topic / વિષય</Label>
                <Input
                  placeholder="Enter topic..."
                  value={input.topic}
                  onChange={(e) =>
                    setInput({ ...input, topic: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>English Content</Label>
                <Textarea
                  placeholder="Paste English explanation or concept..."
                  value={input.englishText}
                  onChange={(e) =>
                    setInput({ ...input, englishText: e.target.value })
                  }
                  rows={8}
                />
              </div>

              <div>
                <Label>Difficulty Level</Label>
                <div className="flex gap-2 mt-2">
                  {["easy", "medium", "hard"].map((level) => (
                    <Button
                      key={level}
                      variant={
                        input.difficulty === level ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setInput({ ...input, difficulty: level })}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!input.topic || !input.englishText || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Gujarati Explanation
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Gujarati Output</h2>
              {gujaratiExplanation && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {gujaratiExplanation ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-gujarati text-base p-4 bg-orange-50 rounded-lg border border-orange-200">
                  {gujaratiExplanation}
                </pre>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Generated Gujarati explanation will appear here</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold">Simple Language</p>
                <p className="text-sm text-gray-600">
                  Uses everyday Gujarati words students understand
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Text-to-Speech</p>
                <p className="text-sm text-gray-600">
                  Listen to Gujarati pronunciation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Regenerate</p>
                <p className="text-sm text-gray-600">
                  Get alternative explanations instantly
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
