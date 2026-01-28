"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  BookOpen,
  Download,
  Copy,
  Edit,
  CheckCircle2,
} from "lucide-react";

export default function NotesGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    class: "10",
    format: "concise",
  });
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedNotes([
        "# મુખ્ય ખ્યાલો\n- પ્રથમ મહત્વપૂર્ણ મુદ્દો\n- બીજો મહત્વપૂર્ણ મુદ્દો\n- ત્રીજો મહત્વપૂર્ણ મુદ્દો",
        "# ઉદાહરણો\nવાસ્તવિક જીવનમાંથી ઉદાહરણો અહીં આવશે...",
        "# સૂત્રો અને સમીકરણો\nમહત્વપૂર્ણ સૂત્રો અહીં લખો...",
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Notes Generator
          </h1>
          <p className="text-gray-600 mt-2">
            AI-powered teaching notes for any topic
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generate Notes</h2>
            <div className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input
                  placeholder="Mathematics"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Topic</Label>
                <Input
                  placeholder="Quadratic Equations"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Class</Label>
                <Input
                  placeholder="10"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Format</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {["concise", "detailed", "visual"].map((format) => (
                    <Button
                      key={format}
                      variant={
                        formData.format === format ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setFormData({ ...formData, format })}
                    >
                      {format.charAt(0).toUpperCase() + format.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.subject || !formData.topic}
                className="w-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Notes"}
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Generated Notes</h2>
              {generatedNotes.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
            <ScrollArea className="h-96">
              {generatedNotes.length > 0 ? (
                <div className="space-y-4">
                  {generatedNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <pre className="whitespace-pre-wrap font-gujarati text-sm">
                        {note}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p>Your AI-generated notes will appear here</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
