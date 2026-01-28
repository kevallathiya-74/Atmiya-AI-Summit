"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PenTool,
  FileQuestion,
  BookOpen,
  ClipboardList,
  Sparkles,
  Copy,
  Download,
} from "lucide-react";
import type { DifficultyLevel } from "@/types";

const CONTENT_TYPES = [
  {
    id: "quiz",
    label: "Quiz Generator",
    labelGu: "ક્વિઝ જનરેટર",
    icon: FileQuestion,
  },
  {
    id: "notes",
    label: "Notes Generator",
    labelGu: "નોંધો જનરેટર",
    icon: BookOpen,
  },
  {
    id: "worksheet",
    label: "Worksheet",
    labelGu: "વર્કશીટ",
    icon: ClipboardList,
  },
  { id: "assignment", label: "Assignment", labelGu: "સોંપણી", icon: PenTool },
];

export default function ContentGeneratorPage() {
  const [selectedType, setSelectedType] = useState("quiz");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    difficulty: "average" as DifficultyLevel,
    questionCount: 10,
    additionalInstructions: "",
  });

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      if (selectedType === "quiz") {
        setGeneratedContent(`# ${formData.subject} - ${formData.topic} Quiz

**Difficulty:** ${formData.difficulty}
**Total Questions:** ${formData.questionCount}

## Questions:

### Question 1 (MCQ)
આ વિષયનો મુખ્ય ઉદ્દેશ્ય શું છે?
a) પ્રથમ વિકલ્પ
b) બીજો વિકલ્પ
c) ત્રીજો વિકલ્પ ✓
d) ચોથો વિકલ્પ

### Question 2 (Short Answer)
આ ખ્યાલ કેવી રીતે કામ કરે છે તેનું સંક્ષિપ્ત વર્ણન કરો.

### Question 3 (MCQ)
નીચેનામાંથી કયું સાચું નથી?
a) પ્રથમ વિકલ્પ
b) બીજો વિકલ્પ ✓
c) ત્રીજો વિકલ્પ
d) ચોથો વિકલ્પ

---
**Answer Key:**
1. c) ત્રીજો વિકલ્પ
2. [Open-ended answer]
3. b) બીજો વિકલ્પ`);
      } else if (selectedType === "notes") {
        setGeneratedContent(`# ${formData.topic} - Study Notes

## મુખ્ય મુદ્દાઓ (Key Points):

1. **પ્રથમ ખ્યાલ:** આ વિષય વિશેની મૂળભૂત માહિતી
2. **બીજો ખ્યાલ:** વધુ વિગતવાર સમજૂતી
3. **ત્રીજો ખ્યાલ:** વ્યવહારિક ઉપયોગ

## વિગતવાર સમજૂતી (Detailed Explanation):

આ વિષય ખૂબ જ મહત્વપૂર્ણ છે કારણ કે...

### ઉદાહરણો (Examples):
- ઉદાહરણ 1: પ્રાથમિક સ્તર
- ઉદાહરણ 2: મધ્યમ સ્તર
- ઉદાહરણ 3: ઉચ્ચ સ્તર

## સારાંશ (Summary):
આ વિષયમાં આપણે શીખ્યા કે...`);
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Generator</h1>
        <p className="text-gray-600 font-gujarati mt-1">
          AI થી ઝડપથી શૈક્ષણિક સામગ્રી બનાવો
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Type Selector */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 mb-4 font-gujarati">
              સામગ્રી પ્રકાર
            </h2>
            <div className="space-y-2">
              {CONTENT_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedType === type.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{type.label}</div>
                      <div className="text-xs font-gujarati opacity-80">
                        {type.labelGu}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Generator Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 font-gujarati">
                સામગ્રી બનાવો
              </h2>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Quadratic Equations"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as DifficultyLevel,
                      })
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weak">Weak / નબળા માટે</option>
                    <option value="average">Average / સરેરાશ માટે</option>
                    <option value="advanced">Advanced / ઉચ્ચ માટે</option>
                  </select>
                </div>

                {selectedType === "quiz" && (
                  <div>
                    <Label htmlFor="count">Number of Questions</Label>
                    <Input
                      id="count"
                      type="number"
                      min="5"
                      max="50"
                      value={formData.questionCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          questionCount: parseInt(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="instructions">
                  Additional Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="કોઈપણ વિશેષ જરૂરિયાતો અથવા સૂચનાઓ..."
                  value={formData.additionalInstructions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalInstructions: e.target.value,
                    })
                  }
                  rows={3}
                  className="mt-1 font-gujarati"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!formData.subject || !formData.topic || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate{" "}
                    {CONTENT_TYPES.find((t) => t.id === selectedType)?.label}
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 font-gujarati">
                    જનરેટ થયેલી સામગ્રી
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                    {generatedContent}
                  </pre>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
