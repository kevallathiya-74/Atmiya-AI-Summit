"use client";

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
} from "@/components/shared";
import {
  MessageSquare,
  BookOpen,
  Target,
  Trophy,
  Calendar,
  Brain,
  Users,
  WifiOff,
  Shield,
  ArrowRight,
  Zap,
  Award,
  Sparkles,
  Volume2,
  Download,
  AlertCircle,
  CheckCircle2,
  Timer,
  Map,
  RefreshCw,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const featureCategories = [
  {
    id: "learning",
    title: "મુખ્ય શીખવું",
    titleEn: "Core Learning",
    icon: BookOpen,
    color: "from-green-500 to-teal-600",
    features: [
      {
        title: "AI શિક્ષક",
        titleEn: "AI Tutor",
        icon: MessageSquare,
        href: "/dashboard/student/ask-ai",
        count: "Text & Voice",
      },
      {
        title: "અભ્યાસક્રમ",
        titleEn: "Curriculum",
        icon: Map,
        href: "/dashboard/student/curriculum",
        count: "5-12",
      },
      {
        title: "આગળનું વિષય",
        titleEn: "Next Topic",
        icon: Sparkles,
        href: "/dashboard/student/next-topic",
        count: "AI",
      },
    ],
  },
  {
    id: "gamification",
    title: "ગેમિફિકેશન",
    titleEn: "Gamification",
    icon: Trophy,
    color: "from-yellow-500 to-orange-600",
    features: [
      {
        title: "સ્ટ્રીક્સ",
        titleEn: "Streaks",
        icon: Zap,
        href: "/dashboard/student/streaks",
        count: "Daily",
      },
      {
        title: "XP & સ્તરો",
        titleEn: "XP & Levels",
        icon: Award,
        href: "/dashboard/student/xp-levels",
        count: "Progress",
      },
      {
        title: "માઇક્રો ચેલેન્જ",
        titleEn: "Micro Challenges",
        icon: Timer,
        href: "/dashboard/student/micro-challenges",
        count: "3 min",
      },
    ],
  },
  {
    id: "ai-personalization",
    title: "AI વ્યક્તિગતકરણ",
    titleEn: "AI Personalization",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    features: [
      {
        title: "Learning DNA",
        titleEn: "Learning DNA",
        icon: Brain,
        href: "/dashboard/student/learning-dna",
        count: "Profile",
      },
      {
        title: "કોન્સેપ્ટ ગેપ",
        titleEn: "Concept Gaps",
        icon: AlertCircle,
        href: "/dashboard/student/concept-gaps",
        count: "Hidden",
      },
      {
        title: "સ્માર્ટ રિવિઝન",
        titleEn: "Smart Revision",
        icon: RefreshCw,
        href: "/dashboard/student/smart-revision",
        count: "AI",
      },
    ],
  },
  {
    id: "practice",
    title: "અભ્યાસ & પરીક્ષા",
    titleEn: "Practice & Exam",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
    features: [
      {
        title: "પ્રશ્નો",
        titleEn: "Practice",
        icon: Target,
        href: "/dashboard/student/practice",
        count: "Chapter",
      },
      {
        title: "પરીક્ષા તૈયારી",
        titleEn: "Exam Readiness",
        icon: CheckCircle2,
        href: "/dashboard/student/exam-readiness",
        count: "Score",
      },
      {
        title: "તાત્કાલિક સમજૂતી",
        titleEn: "Instant Explain",
        icon: HelpCircle,
        href: "/dashboard/student/instant-explain",
        count: "AI",
      },
    ],
  },
  {
    id: "planner",
    title: "આયોજન",
    titleEn: "Planning",
    icon: Calendar,
    color: "from-indigo-500 to-purple-600",
    features: [
      {
        title: "અભ્યાસ યોજના",
        titleEn: "Study Planner",
        icon: Calendar,
        href: "/dashboard/student/study-planner",
        count: "Auto",
      },
      {
        title: "સ્વ-સમજૂતી",
        titleEn: "Self Explanation",
        icon: MessageSquare,
        href: "/dashboard/student/self-explanation",
        count: "AI",
      },
    ],
  },
  {
    id: "accessibility",
    title: "ઍક્સેસિબિલિટી",
    titleEn: "Accessibility",
    icon: WifiOff,
    color: "from-green-500 to-emerald-600",
    features: [
      {
        title: "ઓફલાઇન",
        titleEn: "Offline",
        icon: Download,
        href: "/dashboard/student/offline-capsules",
        count: "Download",
      },
      {
        title: "ઓડિયો",
        titleEn: "Audio",
        icon: Volume2,
        href: "/dashboard/student/audio-lessons",
        count: "Voice",
      },
      {
        title: "લો બેન્ડવિડ્થ",
        titleEn: "Low Bandwidth",
        icon: WifiOff,
        href: "/dashboard/student/low-bandwidth",
        count: "Rural",
      },
    ],
  },
  {
    id: "peer",
    title: "સાથીદાર",
    titleEn: "Peer Learning",
    icon: Users,
    color: "from-pink-500 to-rose-600",
    features: [
      {
        title: "શંકા શેરિંગ",
        titleEn: "Doubt Sharing",
        icon: Users,
        href: "/dashboard/student/doubt-sharing",
        count: "Safe",
      },
    ],
  },
  {
    id: "safety",
    title: "સુરક્ષા",
    titleEn: "Safety & Privacy",
    icon: Shield,
    color: "from-red-500 to-orange-600",
    features: [
      {
        title: "સુરક્ષિત મોડ",
        titleEn: "Safe Mode",
        icon: Shield,
        href: "/dashboard/student/safe-mode",
        count: "Child-Safe",
      },
      {
        title: "સમજાવી શકાય AI",
        titleEn: "Explainable AI",
        icon: HelpCircle,
        href: "/dashboard/student/explainable-ai",
        count: "Transparent",
      },
    ],
  },
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const { gamification, studentContext, coachMessages } = useDashboardStore();

  const todaysCoachMessage = coachMessages[0] || {
    message: "Start your learning journey today!",
    messageGu: "આજે તમારી શીખવાની યાત્રા શરૂ કરો!",
    type: "motivation" as const,
  };

  return (
    <ScrollArea className="h-screen">
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto pb-20">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-gujarati mb-2">
            નમસ્તે! 🙏
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to GYAANSETU.AI - Your Gujarati AI Learning Platform
          </p>
        </div>

        {/* Gamification Stats */}
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
                  <span className="text-gray-600 font-gujarati">આજે XP</span>
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
                onClick={() => router.push("/dashboard/student/badges")}
              >
                All
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

        {/* Student Context */}
        <StudentContextBanner context={studentContext} showDifficulty />

        {/* AI Coach Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 p-3 rounded-xl flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 font-gujarati">
                  આજનો AI સંદેશો
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

        {/* All Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-gujarati">
            બધી સુવિધાઓ
            <span className="text-sm font-normal text-gray-600 ml-2">
              (49 Features)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featureCategories.map((category, idx) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                          category.color
                        )}
                      >
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 font-gujarati text-sm truncate">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {category.titleEn}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {category.features.map((feature) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <li key={feature.href}>
                            <button
                              onClick={() => router.push(feature.href)}
                              className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition-colors text-left group"
                            >
                              <FeatureIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                              <span className="flex-1 text-sm text-gray-700 font-gujarati truncate">
                                {feature.title}
                              </span>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {feature.count}
                              </span>
                              <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {gamification.level}
            </p>
            <p className="text-sm text-gray-600 font-gujarati">સ્તર</p>
          </Card>
          <Card className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {gamification.streak}
            </p>
            <p className="text-sm text-gray-600 font-gujarati">દિવસ સ્ટ્રીક</p>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {gamification.badges.filter((b) => b.earnedAt).length}
            </p>
            <p className="text-sm text-gray-600 font-gujarati">બેજ</p>
          </Card>
          <Card className="p-4 text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {gamification.xp}
            </p>
            <p className="text-sm text-gray-600">Total XP</p>
          </Card>
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold font-gujarati">
              🎉 તમારી શીખવાની યાત્રા અહીંથી શરૂ થાય છે!
            </span>
          </div>
        </motion.div>
      </div>
    </ScrollArea>
  );
}
