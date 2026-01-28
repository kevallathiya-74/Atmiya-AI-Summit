"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTeacherStore } from "@/store/teacher-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Share2,
  Printer,
  Loader2,
  BookOpen,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { id: "mathematics", name: "ગણિત" },
  { id: "science", name: "વિજ્ઞાન" },
  { id: "gujarati", name: "ગુજરાતી" },
  { id: "english", name: "અંગ્રેજી" },
  { id: "social_science", name: "સામાજિક વિજ્ઞાન" },
  { id: "hindi", name: "હિન્દી" },
];

const CLASS_LEVELS = ["5", "6", "7", "8", "9", "10", "11", "12"];

export default function NotesGeneratorPage() {
  const { generatedNotes, addNotes, isGenerating, setIsGenerating } = useTeacherStore();
  
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [currentNotes, setCurrentNotes] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic || !subject || !classLevel) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedContent = `# ${topic}

## પરિચય
${topic} એ ${SUBJECTS.find(s => s.id === subject)?.name || subject} વિષયનો મહત્વનો ભાગ છે.

## મુખ્ય મુદ્દાઓ

### 1. પાયાની સમજ
- ${topic} ની વ્યાખ્યા
- મહત્વ અને ઉપયોગ
- રોજિંદા જીવનમાં ઉદાહરણો

### 2. વિસ્તૃત સમજૂતી
- ${additionalNotes || 'આ વિષય પર વધારાની માહિતી'}
- સિદ્ધાંતો અને નિયમો
- અમલીકરણ

### 3. અભ્યાસ માટે ટિપ્સ
1. નિયમિત પુનરાવર્તન કરો
2. પ્રેક્ટિકલ ઉદાહરણો સાથે શીખો
3. પ્રશ્નો પૂછવામાં અચકાશો નહીં

## સારાંશ
આ નોંધો ધોરણ ${classLevel} ના વિદ્યાર્થીઓ માટે તૈયાર કરવામાં આવી છે.

---
*AI દ્વારા જનરેટ | GYAANSETU.AI*`;

    setCurrentNotes(generatedContent);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (currentNotes) {
      navigator.clipboard.writeText(currentNotes);
    }
  };

  const handlePrint = () => {
    if (currentNotes) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>નોંધો - ${topic}</title>
              <style>
                body { font-family: 'Noto Sans Gujarati', sans-serif; padding: 20px; line-height: 1.8; }
                h1, h2, h3 { color: #333; }
                pre { white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <h1>${topic}</h1>
              <p><strong>વિષય:</strong> ${SUBJECTS.find(s => s.id === subject)?.name}</p>
              <p><strong>ધોરણ:</strong> ${classLevel}</p>
              <hr />
              <pre>${currentNotes}</pre>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
              નોંધો જનરેટર
            </h1>
            <p className="text-gray-600 font-gujarati">
              AI સાથે વ્યાપક અભ્યાસ નોંધો બનાવો
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-gujarati">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  નોંધો વિગતો
                </CardTitle>
                <CardDescription className="font-gujarati">
                  વિષય અને ટોપિક વિશે માહિતી ભરો
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic" className="font-gujarati">
                    ટોપિક / પ્રકરણ *
                  </Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="દા.ત., પ્રકાશસંશ્લેષણ, પાયથાગોરસનું પ્રમેય..."
                    className="font-gujarati"
                  />
                </div>

                {/* Subject & Class */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-gujarati">વિષય *</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger className="font-gujarati">
                        <SelectValue placeholder="વિષય પસંદ કરો" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subj) => (
                          <SelectItem key={subj.id} value={subj.id} className="font-gujarati">
                            {subj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-gujarati">ધોરણ *</Label>
                    <Select value={classLevel} onValueChange={setClassLevel}>
                      <SelectTrigger className="font-gujarati">
                        <SelectValue placeholder="ધોરણ પસંદ કરો" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_LEVELS.map((level) => (
                          <SelectItem key={level} value={level} className="font-gujarati">
                            ધોરણ {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additional" className="font-gujarati">
                    વધારાની સૂચનાઓ
                  </Label>
                  <Textarea
                    id="additional"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="કોઈ ખાસ મુદ્દા સમાવવા હોય તો લખો..."
                    rows={3}
                    className="font-gujarati"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!topic || !subject || !classLevel || isGenerating}
                  className="w-full h-12 text-base bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 font-gujarati"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      નોંધો બનાવી રહ્યા છીએ...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      AI નોંધો બનાવો
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-gujarati">ઝડપી ટેમ્પલેટ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { topic: "પ્રકાશસંશ્લેષણ", subject: "science" },
                    { topic: "પાયથાગોરસનું પ્રમેય", subject: "mathematics" },
                    { topic: "સ્વતંત્રતા સંગ્રામ", subject: "social_science" },
                    { topic: "ગુજરાતી વ્યાકરણ", subject: "gujarati" },
                  ].map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start font-gujarati text-xs"
                      onClick={() => {
                        setTopic(template.topic);
                        setSubject(template.subject);
                      }}
                    >
                      {template.topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Notes Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-xl h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-gujarati">
                  <FileText className="w-5 h-5 text-orange-600" />
                  જનરેટ થયેલી નોંધો
                </CardTitle>
                {currentNotes && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handlePrint}>
                      <Printer className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-96 space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-12 h-12 text-orange-500" />
                    </motion.div>
                    <p className="text-gray-600 font-gujarati">AI નોંધો તૈયાર કરી રહ્યું છે...</p>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-orange-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                ) : currentNotes ? (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl mb-4 border border-orange-200">
                        <div className="flex items-center gap-2 text-orange-700">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-semibold font-gujarati">નોંધો સફળતાપૂર્વક બનાવાઈ!</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-orange-600">
                          <span className="font-gujarati">વિષય: {SUBJECTS.find(s => s.id === subject)?.name}</span>
                          <span className="font-gujarati">ધોરણ: {classLevel}</span>
                        </div>
                      </div>
                      <div className="whitespace-pre-wrap font-gujarati text-gray-800 leading-relaxed">
                        {currentNotes}
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 font-gujarati">
                        નોંધો અહીં દેખાશે
                      </h3>
                      <p className="text-gray-500 font-gujarati text-sm mt-1">
                        ટોપિક ભરો અને AI નોંધો બનાવો પર ક્લિક કરો
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
