"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Play,
  Clock,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo lessons data
const demoLessons = [
  {
    id: "1",
    title: "ગુજરાતી વર્ણમાળા",
    description: "ગુજરાતી ભાષાના મૂળભૂત અક્ષરો શીખો",
    content: `# ગુજરાતી વર્ણમાળા

## સ્વરો (Vowels)
અ, આ, ઇ, ઈ, ઉ, ઊ, એ, ઐ, ઓ, ઔ

## વ્યંજનો (Consonants)
ક, ખ, ગ, ઘ, ઙ
ચ, છ, જ, ઝ, ઞ
ટ, ઠ, ડ, ઢ, ણ
ત, થ, દ, ધ, ન
પ, ફ, બ, ભ, મ
ય, ર, લ, વ
શ, ષ, સ, હ, ળ

## અભ્યાસ
પ્રત્યેક અક્ષરનો ઉચ્ચાર અને લેખન સારી રીતે શીખો.`,
    duration: "15 મિનિટ",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "ગણિતના મૂળભૂત સિદ્ધાંતો",
    description: "સરવાળો, બાદબાકી, ગુણાકાર અને ભાગાકાર",
    content: `# ગણિતના મૂળભૂત સિદ્ધાંતો

## સરવાળો (Addition)
2 + 3 = 5
10 + 15 = 25

## બાદબાકી (Subtraction)
10 - 3 = 7
50 - 20 = 30

## ગુણાકાર (Multiplication)
2 × 3 = 6
5 × 4 = 20

## ભાગાકાર (Division)
10 ÷ 2 = 5
20 ÷ 4 = 5

આ મૂળભૂત ક્રિયાઓ ગણિતની પાયાની કલાઓ છે.`,
    duration: "20 મિનિટ",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "વિજ્ઞાન: પાણીનું મહત્વ",
    description: "પાણી કેમ જરૂરી છે અને તેના ગુણધર્મો",
    content: `# પાણીનું મહત્વ

## પાણી શું છે?
પાણી એ જીવન માટે અત્યંત જરૂરી પદાર્થ છે. તે H₂O (બે હાઇડ્રોજન અને એક ઓક્સિજન) થી બનેલું છે.

## પાણીના ઉપયોગો
1. પીવા માટે
2. ખેતી માટે
3. સ્નાન માટે
4. રસોઈ માટે
5. સફાઈ માટે

## પાણીના ગુણધર્મો
- રંગહીન
- ગંધહીન
- સ્વાદહીન
- 100°C પર ઉકળે છે
- 0°C પર થીજે છે

## નિષ્કર્ષ
પાણી બચાવો, તે અમૂલ્ય સંપત્તિ છે!`,
    duration: "25 મિનિટ",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "ગુજરાતનો ઇતિહાસ",
    description: "ગુજરાતના ઐતિહાસિક મહત્વના સ્થળો",
    content: `# ગુજરાતનો ઇતિહાસ

## મહત્વના સ્થળો

### સોમનાથ મંદિર
- ભારતના 12 જ્યોતિર્લિંગોમાંનું એક
- સૌરાષ્ટ્રમાં આવેલું

### સાબરમતી આશ્રમ
- મહાત્મા ગાંધીનું નિવાસસ્થાન
- સ્વતંત્રતા સંગ્રામનું કેન્દ્ર

### લોથલ
- પ્રાચીન બંદર નગર
- સિંધુ સંસ્કૃતિનો ભાગ

### રાણી કી વાવ
- પાટણમાં આવેલી પ્રાચીન વાવ
- UNESCO વિશ્વ ધરોહર સ્થળ

આ બધા સ્થળો ગુજરાતની સમૃદ્ધ વારસાની સાક્ષી છે.`,
    duration: "30 મિનિટ",
    createdAt: new Date(),
  },
];

export default function LearnPage() {
  const { lessons, currentLesson, setCurrentLesson, addLesson } =
    useDashboardStore();
  const [allLessons, setAllLessons] = useState(demoLessons);

  useEffect(() => {
    // Initialize with demo lessons if empty
    if (lessons.length === 0) {
      demoLessons.forEach((lesson) => {
        addLesson(lesson);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartLesson = (lesson: any) => {
    setCurrentLesson(lesson);
  };

  const handleBackToLessons = () => {
    setCurrentLesson(null);
  };

  if (currentLesson) {
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Lesson Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="px-6 py-4">
            <Button
              variant="ghost"
              onClick={handleBackToLessons}
              className="mb-3 font-gujarati"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              પાછા જાઓ
            </Button>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 font-gujarati mb-2">
                  {currentLesson.title}
                </h1>
                <p className="text-gray-600 font-gujarati">
                  {currentLesson.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200">
                <Clock className="w-4 h-4" />
                <span className="font-gujarati">{currentLesson.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="prose prose-lg max-w-none">
                  {currentLesson.content.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1
                          key={index}
                          className="text-3xl font-bold text-gray-900 font-gujarati mb-6"
                        >
                          {line.replace("# ", "")}
                        </h1>
                      );
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-2xl font-semibold text-gray-800 font-gujarati mt-8 mb-4"
                        >
                          {line.replace("## ", "")}
                        </h2>
                      );
                    } else if (line.startsWith("### ")) {
                      return (
                        <h3
                          key={index}
                          className="text-xl font-semibold text-gray-800 font-gujarati mt-6 mb-3"
                        >
                          {line.replace("### ", "")}
                        </h3>
                      );
                    } else if (line.trim() === "") {
                      return <div key={index} className="h-4" />;
                    } else {
                      return (
                        <p
                          key={index}
                          className="text-gray-700 font-gujarati leading-relaxed mb-3"
                        >
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Lesson Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-gujarati"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                પૂર્ણ કર્યું
              </Button>
              <Button size="lg" variant="outline" className="font-gujarati">
                બુકમાર્ક કરો
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                શીખો
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                AI દ્વારા બનાવેલા પાઠો
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden group cursor-pointer">
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-gujarati">{lesson.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 font-gujarati line-clamp-2">
                      {lesson.title}
                    </CardTitle>
                    <CardDescription className="font-gujarati text-base line-clamp-2">
                      {lesson.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleStartLesson(lesson)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-gujarati"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      શરૂ કરો
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Generate New Lesson Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer">
              <CardContent className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 font-gujarati mb-2">
                  નવો પાઠ બનાવો
                </h3>
                <p className="text-gray-600 font-gujarati mb-4">
                  AI નો ઉપયોગ કરીને તમારી પસંદગીના વિષય પર નવો પાઠ બનાવો
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-gujarati"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI સાથે બનાવો
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
