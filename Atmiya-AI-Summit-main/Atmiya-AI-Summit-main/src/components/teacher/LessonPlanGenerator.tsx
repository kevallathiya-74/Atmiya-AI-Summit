"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTeacherStore } from "@/store/teacher-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Loader2,
  Download,
  Copy,
  Check,
  BookOpen,
  Clock,
  Target,
  Lightbulb,
  Pencil,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Subject options
const subjects = [
  "ગણિત",
  "વિજ્ઞાન",
  "ગુજરાતી",
  "અંગ્રેજી",
  "સામાજિક વિજ્ઞાન",
  "હિન્દી",
  "સંસ્કૃત",
];

const classes = [5, 6, 7, 8, 9, 10, 11, 12];

export default function LessonPlanGenerator() {
  const { addLessonPlan, isGenerating, setIsGenerating, teacherProfile } = useTeacherStore();

  const [formData, setFormData] = useState({
    class: 10,
    subject: "ગણિત",
    chapter: "",
    topic: "",
    duration: 40,
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!formData.chapter || !formData.topic) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const plan = {
      title: `${formData.topic} - Lesson Plan`,
      titleGu: `${formData.topic} - પાઠ યોજના`,
      class: formData.class,
      subject: formData.subject,
      chapter: formData.chapter,
      topic: formData.topic,
      duration: formData.duration,
      objectives: [
        "Students will understand the basic concept",
        "Students will be able to solve related problems",
        "Students will apply the concept in real-life situations",
      ],
      objectivesGu: [
        "વિદ્યાર્થીઓ મૂળભૂત ખ્યાલ સમજશે",
        "વિદ્યાર્થીઓ સંબંધિત સમસ્યાઓ ઉકેલી શકશે",
        "વિદ્યાર્થીઓ વાસ્તવિક જીવનમાં ખ્યાલનો ઉપયોગ કરી શકશે",
      ],
      introduction: `આજે આપણે ${formData.topic} વિશે શીખીશું. આ ટોપિક ${formData.chapter} પ્રકરણનો ભાગ છે અને GSEB ધોરણ ${formData.class} ના પાઠ્યક્રમમાં મહત્વપૂર્ણ છે.

**પ્રેરણાદાયી પ્રશ્ન:** [વિદ્યાર્થીઓને વિચારવા માટે પ્રશ્ન પૂછો]

**પૂર્વ જ્ઞાન ચકાસણી:** વિદ્યાર્થીઓને પાછલા પાઠ વિશે પૂછો`,
      mainContent: `## મુખ્ય વિષયવસ્તુ

### 1. પરિચય (5 મિનિટ)
- ${formData.topic} ની વ્યાખ્યા
- મહત્વ અને ઉપયોગ

### 2. સમજૂતી (15 મિનિટ)
- મૂળભૂત ખ્યાલો
- સૂત્રો અને નિયમો
- ઉદાહરણો સાથે સમજાવો

### 3. પ્રેક્ટિસ (10 મિનિટ)
- વર્ગમાં સાથે મળીને ઉદાહરણ ઉકેલો
- વિદ્યાર્થીઓને બોર્ડ પર બોલાવો

### 4. સારાંશ (5 મિનિટ)
- મુખ્ય મુદ્દાઓની પુનરાવર્તન
- પ્રશ્નોત્તરી`,
      activities: [
        "જૂથ ચર્ચા - 5 મિનિટ",
        "બોર્ડ પર ઉદાહરણ - 10 મિનિટ",
        "વ્યક્તિગત પ્રેક્ટિસ - 5 મિનિટ",
      ],
      assessment: `**ઝડપી મૂલ્યાંકન:**
1. 3 MCQ પ્રશ્નો (મૌખિક)
2. 1 બોર્ડ પર ઉકેલવાનું ઉદાહરણ
3. વિદ્યાર્થીઓના પ્રશ્નો`,
      homework: `**ગૃહકાર્ય:**
1. પાઠ્યપુસ્તકમાંથી પ્રશ્ન 1-5 ઉકેલો
2. ${formData.topic} પર 5 વાક્યોમાં નોંધ લખો
3. સંબંધિત ઉદાહરણો શોધો`,
      resources: [
        "GSEB પાઠ્યપુસ્તક",
        "બ્લેકબોર્ડ અને ચોક",
        "ચાર્ટ/ડાયાગ્રામ",
        "પ્રોજેક્ટર (જો ઉપલબ્ધ હોય)",
      ],
      boardContent: `╔══════════════════════════════════════╗
║     ${formData.topic}                    ║
║     ધોરણ: ${formData.class} | ${formData.subject}          ║
╠══════════════════════════════════════╣
║                                      ║
║  📌 વ્યાખ્યા:                         ║
║  _________________________________   ║
║  _________________________________   ║
║                                      ║
║  📌 સૂત્ર:                            ║
║  _________________________________   ║
║                                      ║
║  📌 ઉદાહરણ:                          ║
║  _________________________________   ║
║  _________________________________   ║
║  _________________________________   ║
║                                      ║
║  📌 યાદ રાખો:                         ║
║  •                                   ║
║  •                                   ║
║  •                                   ║
║                                      ║
╚══════════════════════════════════════╝`,
    };

    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  const handleSave = () => {
    if (generatedPlan) {
      addLessonPlan(generatedPlan);
      // Show success notification
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                પાઠ યોજના જનરેટર
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                AI સાથે ઝડપથી પાઠ યોજના બનાવો
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="p-6 lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 font-gujarati flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-600" />
              વિગતો દાખલ કરો
            </h2>

            <div className="space-y-4">
              <div>
                <Label className="font-gujarati">ધોરણ</Label>
                <select
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: parseInt(e.target.value) })
                  }
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      ધોરણ {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="font-gujarati">વિષય</Label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="font-gujarati">પ્રકરણ</Label>
                <Input
                  value={formData.chapter}
                  onChange={(e) =>
                    setFormData({ ...formData, chapter: e.target.value })
                  }
                  placeholder="દા.ત. ત્રિકોણમિતિ"
                  className="mt-1 font-gujarati"
                />
              </div>

              <div>
                <Label className="font-gujarati">ટોપિક</Label>
                <Input
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  placeholder="દા.ત. sin અને cos નો પરિચય"
                  className="mt-1 font-gujarati"
                />
              </div>

              <div>
                <Label className="font-gujarati">સમયગાળો (મિનિટ)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: parseInt(e.target.value) })
                  }
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.chapter || !formData.topic}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 font-gujarati"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    જનરેટ થઈ રહ્યું છે...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    પાઠ યોજના બનાવો
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Generated Plan */}
          <Card className="p-6 lg:col-span-2 overflow-auto max-h-[80vh]">
            {!generatedPlan ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4"
                >
                  <FileText className="w-10 h-10 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-700 font-gujarati mb-2">
                  પાઠ યોજના જનરેટ કરો
                </h3>
                <p className="text-gray-500 font-gujarati max-w-md">
                  ડાબી બાજુ વિગતો ભરો અને &ldquo;પાઠ યોજના બનાવો&rdquo; બટન દબાવો
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 font-gujarati">
                      {generatedPlan.titleGu}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ધોરણ {generatedPlan.class} | {generatedPlan.subject} |{" "}
                      {generatedPlan.chapter}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(JSON.stringify(generatedPlan, null, 2))}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSave}
                      className="font-gujarati"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      સાચવો
                    </Button>
                  </div>
                </div>

                {/* Duration & Topic */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      {generatedPlan.duration} મિનિટ
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-700">{generatedPlan.topic}</span>
                  </div>
                </div>

                {/* Objectives */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2 font-gujarati">
                    <Target className="w-5 h-5" />
                    શૈક્ષણિક ઉદ્દેશ્યો
                  </h3>
                  <ul className="space-y-2">
                    {generatedPlan.objectivesGu.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-green-700">
                        <span className="text-green-500">✓</span>
                        <span className="font-gujarati">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Introduction */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 font-gujarati">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    પરિચય
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl whitespace-pre-wrap text-gray-700 font-gujarati">
                    {generatedPlan.introduction}
                  </div>
                </div>

                {/* Main Content */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                    📚 મુખ્ય વિષયવસ્તુ
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-xl whitespace-pre-wrap text-gray-700 font-gujarati prose prose-sm max-w-none">
                    {generatedPlan.mainContent}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                    🎯 પ્રવૃત્તિઓ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {generatedPlan.activities.map((activity: string, i: number) => (
                      <div
                        key={i}
                        className="bg-purple-50 p-3 rounded-xl text-purple-700 text-sm font-gujarati"
                      >
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment & Homework */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                      📝 મૂલ્યાંકન
                    </h3>
                    <div className="bg-amber-50 p-4 rounded-xl whitespace-pre-wrap text-gray-700 font-gujarati text-sm">
                      {generatedPlan.assessment}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                      📖 ગૃહકાર્ય
                    </h3>
                    <div className="bg-red-50 p-4 rounded-xl whitespace-pre-wrap text-gray-700 font-gujarati text-sm">
                      {generatedPlan.homework}
                    </div>
                  </div>
                </div>

                {/* Board Content */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                    🖥️ બ્લેકબોર્ડ સામગ્રી
                  </h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                    {generatedPlan.boardContent}
                  </pre>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2 font-gujarati">
                    📦 જરૂરી સાધનો
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {generatedPlan.resources.map((resource: string, i: number) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 font-gujarati"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
