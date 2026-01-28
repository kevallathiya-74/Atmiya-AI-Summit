"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  XPBar,
  StreakCounter,
  BadgeDisplay,
  StudentContextBanner,
  AITutorControls,
  CurriculumSelector,
  LearningDNACard,
  ConceptGapNavigator,
  SmartRevisionEngine,
  ExamReadinessCard,
  StudyPlannerCard,
  SafeLearningBadge,
  ExplainableAICard,
} from "@/components/shared";
import {
  MessageSquare,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  History,
  Settings as SettingsIcon,
  Wifi,
  WifiOff,
  Volume2,
  Users,
  Shield,
  Brain,
  BookMarked,
  Trophy,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    title: "AI ને પૂછો",
    titleEn: "Ask AI",
    description: "Gujarati AI Tutor with voice",
    icon: MessageSquare,
    href: "/dashboard/student/ask-ai",
    color: "from-blue-500 to-purple-600",
    xpReward: 10,
  },
  {
    title: "શીખો",
    titleEn: "Learn",
    description: "Subject-wise learning paths",
    icon: BookOpen,
    href: "/dashboard/student/learn",
    color: "from-green-500 to-teal-600",
    xpReward: 25,
  },
  {
    title: "અભ્યાસ",
    titleEn: "Practice",
    description: "AI-generated practice questions",
    icon: Target,
    href: "/dashboard/student/practice",
    color: "from-orange-500 to-red-600",
    xpReward: 50,
  },
  {
    title: "નોંધો",
    titleEn: "Notes",
    description: "Your saved notes & history",
    icon: History,
    href: "/dashboard/student/notes",
    color: "from-purple-500 to-pink-600",
    xpReward: 5,
  },
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const {
    gamification,
    studentContext,
    coachMessages,
    learningDNA,
    revisionSchedule,
    examReadiness,
    settings,
    updateSettings,
  } = useDashboardStore();

  const [selectedClass, setSelectedClass] = useState<number>(
    studentContext.classLevel
  );

  const todaysCoachMessage = coachMessages[0] || {
    message: "Great job! Keep learning consistently.",
    messageGu: "સરસ! સતત શીખવાનું ચાલુ રાખો.",
    type: "motivation" as const,
  };

  return (
    <ScrollArea className="h-screen">
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto pb-20">
        {/* Header: Settings & Safe Learning */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-gujarati">
              નમસ્તે! 🙏
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Welcome to GYAANSETU.AI
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Low Bandwidth Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSettings({
                  lowBandwidthMode: !settings.lowBandwidthMode,
                })
              }
              className={cn(
                settings.lowBandwidthMode && "bg-green-50 border-green-500"
              )}
            >
              {settings.lowBandwidthMode ? (
                <>
                  <WifiOff className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline font-gujarati">
                    લો બેન્ડવિડ્થ
                  </span>
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Normal</span>
                </>
              )}
            </Button>

            {/* Voice Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSettings({ voiceEnabled: !settings.voiceEnabled })
              }
            >
              <Volume2
                className={cn(
                  "w-4 h-4",
                  !settings.voiceEnabled && "text-gray-400"
                )}
              />
            </Button>
          </div>
        </div>

        {/* Safe Learning Badge */}
        <SafeLearningBadge
          isActive={true}
          onToggle={(active) => console.log("Safe mode:", active)}
        />

        {/* XP, Streak & Level Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="lg:col-span-2 p-4 md:p-6">
            <XPBar
              currentXP={gamification.xp}
              level={gamification.level}
              className="mb-6"
            />

            <div className="flex items-center gap-4 flex-wrap">
              <StreakCounter streak={gamification.streak} />

              <div className="flex-1 min-w-[200px] space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-gujarati">
                    આજે મેળવેલ XP
                  </span>
                  <span className="font-semibold text-gray-900">
                    {gamification.dailyXP} XP
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-gujarati">
                    આ અઠવાડિયે
                  </span>
                  <span className="font-semibold text-gray-900">
                    {gamification.weeklyXP} XP
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 font-gujarati">બેજ</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard/student/settings")}
              >
                View All
              </Button>
            </div>
            <BadgeDisplay badges={gamification.badges} maxDisplay={4} />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 font-gujarati">
                {gamification.badges.filter((b) => b.earnedAt).length} /{" "}
                {gamification.badges.length} earned
              </p>
            </div>
          </Card>
        </div>

        {/* Student Context & Class Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StudentContextBanner context={studentContext} showDifficulty />

          <Card className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                <BookMarked className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-gujarati">
                  તમારો ધોરણ
                </h3>
                <p className="text-sm text-gray-600">Select Your Class</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[5, 6, 7, 8, 9, 10, 11, 12].map((classNum) => (
                <Button
                  key={classNum}
                  variant={selectedClass === classNum ? "default" : "outline"}
                  className="font-gujarati"
                  onClick={() => setSelectedClass(classNum)}
                >
                  {classNum}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Coach Daily Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 font-gujarati">
                  આજનો સંદેશો - AI લર્નિંગ કોચ
                </h3>
                <p className="text-gray-700 font-gujarati">
                  {todaysCoachMessage.messageGu}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {todaysCoachMessage.message}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            ઝડપી ક્રિયાઓ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card
                    className="p-4 md:p-6 cursor-pointer hover:shadow-lg transition-all group"
                    onClick={() => router.push(action.href)}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br mb-4",
                        "flex items-center justify-center shadow-md",
                        "group-hover:scale-110 transition-transform",
                        action.color
                      )}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 font-gujarati">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {action.titleEn}
                    </p>
                    <p className="text-xs text-gray-500">
                      {action.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-600">
                        +{action.xpReward} XP
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Tutor Controls */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            AI ટ્યુટર સેટિંગ્સ
          </h2>
          <AITutorControls />
        </div>

        {/* Personalization Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            તમારું વ્યક્તિગત લર્નિંગ પ્રોફાઇલ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <LearningDNACard learningDNA={learningDNA} />
            <ConceptGapNavigator
              learningDNA={learningDNA}
              onFillGap={(topicId) => console.log("Fill gap:", topicId)}
            />
            <SmartRevisionEngine
              revisionSchedule={revisionSchedule}
              onCompleteRevision={(id) => console.log("Complete:", id)}
            />
          </div>
        </div>

        {/* Exam & Planning Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            પરીક્ષા તૈયારી અને આયોજન
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ExamReadinessCard
              examReadiness={examReadiness}
              onFocusArea={(area) => console.log("Focus on:", area)}
            />
            <StudyPlannerCard
              examDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              onGeneratePlan={() => console.log("Generate new plan")}
            />
          </div>
        </div>

        {/* Curriculum Selection */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            અભ્યાસક્રમ પસંદગી
          </h2>
          <CurriculumSelector />
        </div>

        {/* Accessibility & Rural Features */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
            ઍક્સેસિબિલિટી ફીચર્સ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <WifiOff className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900 font-gujarati">
                  ઓફલાઇન મોડ
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Download AI capsules for offline learning
              </p>
              <Button
                variant="outline"
                className="w-full font-gujarati"
                onClick={() => console.log("Open offline manager")}
              >
                કેપ્સ્યુલ્સ જુઓ
              </Button>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Volume2 className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900 font-gujarati">
                  અવાજ ટ્યુટર
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Accent-friendly Gujarati voice lessons
              </p>
              <Button
                variant="outline"
                className="w-full font-gujarati"
                onClick={() =>
                  updateSettings({ voiceEnabled: !settings.voiceEnabled })
                }
              >
                {settings.voiceEnabled ? "સક્રિય" : "સક્રિય કરો"}
              </Button>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900 font-gujarati">
                  સુરક્ષિત પીઅર લર્નિંગ
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Anonymous doubt sharing with AI moderation
              </p>
              <Button variant="outline" className="w-full font-gujarati">
                શંકા શેર કરો
              </Button>
            </Card>
          </div>
        </div>

        {/* Explainable AI Example */}
        <ExplainableAICard
          explanation={{
            source: "GSEB Class 10 Math Textbook, Chapter 3",
            confidence: 95,
            reasoning:
              "Answer verified against official syllabus and cross-checked with multiple authoritative sources",
          }}
        />

        {/* Achievement Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6 md:py-8"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold font-gujarati text-sm md:text-base">
              🎉 તમે આજે {gamification.dailyXP} XP મેળવ્યા! સરસ કામ!
            </span>
          </div>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
