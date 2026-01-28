"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  MessageSquare,
  BookOpen,
  Target,
  Trophy,
  Calendar,
  Brain,
  Users,
  WifiOff,
  TrendingUp,
  Shield,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  Zap,
  Award,
  RefreshCw,
  Sparkles,
  Map,
  CheckCircle2,
  AlertCircle,
  Download,
  Volume2,
  HelpCircle,
  UserCheck,
  BookMarked,
  PenTool,
  BarChart3,
  Lock,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getGreeting } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  labelGu: string;
  badge?: string;
  isNew?: boolean;
}

interface NavGroup {
  id: string;
  label: string;
  labelGu: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    labelGu: "ડેશબોર્ડ",
    icon: <Home className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student",
        icon: <Home className="w-4 h-4" />,
        label: "Overview",
        labelGu: "ઝાંખી",
      },
    ],
  },
  {
    id: "ai-tutor",
    label: "AI Tutor",
    labelGu: "AI શિક્ષક",
    icon: <MessageSquare className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/ask-ai",
        icon: <MessageSquare className="w-4 h-4" />,
        label: "Ask AI (Text)",
        labelGu: "AI ને પૂછો (લખાણ)",
      },
      {
        href: "/dashboard/student/voice-tutor",
        icon: <Volume2 className="w-4 h-4" />,
        label: "Voice Tutor",
        labelGu: "અવાજ શિક્ષક",
        isNew: true,
      },
      {
        href: "/dashboard/student/explanation-styles",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Explanation Styles",
        labelGu: "સમજૂતી શૈલી",
      },
    ],
  },
  {
    id: "learning-path",
    label: "Learning Path",
    labelGu: "શિક્ષણ માર્ગ",
    icon: <Map className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/learn",
        icon: <BookOpen className="w-4 h-4" />,
        label: "Subject Learning",
        labelGu: "વિષય શીખો",
      },
      {
        href: "/dashboard/student/curriculum",
        icon: <BookMarked className="w-4 h-4" />,
        label: "Syllabus Tree",
        labelGu: "અભ્યાસક્રમ વૃક્ષ",
      },
      {
        href: "/dashboard/student/next-topic",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Next Best Topic",
        labelGu: "આગળનું વિષય",
        badge: "AI",
      },
      {
        href: "/dashboard/student/class-selection",
        icon: <GraduationCap className="w-4 h-4" />,
        label: "Class Selection",
        labelGu: "ધોરણ પસંદગી",
      },
    ],
  },
  {
    id: "practice",
    label: "Practice Zone",
    labelGu: "અભ્યાસ ઝોન",
    icon: <Target className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/practice",
        icon: <Target className="w-4 h-4" />,
        label: "Practice Questions",
        labelGu: "પ્રશ્નો",
      },
      {
        href: "/dashboard/student/exam-style",
        icon: <PenTool className="w-4 h-4" />,
        label: "Exam-Style Questions",
        labelGu: "પરીક્ષા શૈલી",
        badge: "AI",
      },
      {
        href: "/dashboard/student/instant-explain",
        icon: <HelpCircle className="w-4 h-4" />,
        label: "Instant Explanation",
        labelGu: "તુરંત સમજૂતી",
      },
    ],
  },
  {
    id: "gamification",
    label: "Gamification",
    labelGu: "ગેમિફિકેશન",
    icon: <Trophy className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/streaks",
        icon: <Zap className="w-4 h-4" />,
        label: "Daily Streaks",
        labelGu: "દૈનિક સ્ટ્રીક્સ",
      },
      {
        href: "/dashboard/student/xp-levels",
        icon: <Award className="w-4 h-4" />,
        label: "XP & Levels",
        labelGu: "XP અને સ્તરો",
      },
      {
        href: "/dashboard/student/badges",
        icon: <Trophy className="w-4 h-4" />,
        label: "Badges & Rewards",
        labelGu: "બેજ અને પુરસ્કારો",
      },
      {
        href: "/dashboard/student/micro-challenges",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Micro Challenges",
        labelGu: "માઇક્રો ચેલેન્જ",
        badge: "3min",
      },
    ],
  },
  {
    id: "revision",
    label: "Revision & Planner",
    labelGu: "પુનરાવર્તન અને આયોજક",
    icon: <Calendar className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/smart-revision",
        icon: <RefreshCw className="w-4 h-4" />,
        label: "Smart Revision",
        labelGu: "સ્માર્ટ રિવિઝન",
        badge: "AI",
      },
      {
        href: "/dashboard/student/study-planner",
        icon: <Calendar className="w-4 h-4" />,
        label: "Study Planner",
        labelGu: "અભ્યાસ યોજનાકાર",
      },
      {
        href: "/dashboard/student/self-explanation",
        icon: <PenTool className="w-4 h-4" />,
        label: "Self Explanation",
        labelGu: "સ્વ-સમજૂતી",
      },
    ],
  },
  {
    id: "ai-coach",
    label: "AI Coach",
    labelGu: "AI કોચ",
    icon: <Brain className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/learning-dna",
        icon: <Brain className="w-4 h-4" />,
        label: "Learning DNA",
        labelGu: "લર્નિંગ DNA",
      },
      {
        href: "/dashboard/student/concept-gaps",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Concept Gaps",
        labelGu: "કોન્સેપ્ટ ગેપ",
        badge: "AI",
      },
      {
        href: "/dashboard/student/confusion-detector",
        icon: <HelpCircle className="w-4 h-4" />,
        label: "Confusion Detector",
        labelGu: "મૂંઝવણ શોધક",
      },
      {
        href: "/dashboard/student/ai-messages",
        icon: <Sparkles className="w-4 h-4" />,
        label: "AI Messages",
        labelGu: "AI સંદેશાઓ",
      },
    ],
  },
  {
    id: "peer-learning",
    label: "Peer Learning",
    labelGu: "સાથીદાર શીખવું",
    icon: <Users className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/doubt-sharing",
        icon: <Users className="w-4 h-4" />,
        label: "Safe Doubt Sharing",
        labelGu: "સુરક્ષિત શંકા શેરિંગ",
      },
      {
        href: "/dashboard/student/anonymous-mode",
        icon: <UserCheck className="w-4 h-4" />,
        label: "Anonymous Learning",
        labelGu: "અનામી શીખવું",
      },
    ],
  },
  {
    id: "offline-rural",
    label: "Offline & Rural",
    labelGu: "ઓફલાઇન અને ગ્રામીણ",
    icon: <WifiOff className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/offline-capsules",
        icon: <Download className="w-4 h-4" />,
        label: "Offline Capsules",
        labelGu: "ઓફલાઇન કેપ્સ્યુલ",
      },
      {
        href: "/dashboard/student/audio-lessons",
        icon: <Volume2 className="w-4 h-4" />,
        label: "Audio Lessons",
        labelGu: "ઓડિયો પાઠ",
      },
      {
        href: "/dashboard/student/low-bandwidth",
        icon: <WifiOff className="w-4 h-4" />,
        label: "Low Bandwidth Mode",
        labelGu: "લો બેન્ડવિડ્થ મોડ",
      },
    ],
  },
  {
    id: "progress",
    label: "Progress & Readiness",
    labelGu: "પ્રગતિ અને તૈયારી",
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/exam-readiness",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Exam Readiness",
        labelGu: "પરીક્ષા તૈયારી",
      },
      {
        href: "/dashboard/student/weak-areas",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Weak Areas",
        labelGu: "નબળા ક્ષેત્રો",
      },
      {
        href: "/dashboard/student/performance",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Performance Analytics",
        labelGu: "પ્રદર્શન વિશ્લેષણ",
      },
      {
        href: "/dashboard/student/notes",
        icon: <BookMarked className="w-4 h-4" />,
        label: "Notes & History",
        labelGu: "નોંધો અને ઇતિહાસ",
      },
    ],
  },
  {
    id: "safety",
    label: "Safety & Privacy",
    labelGu: "સુરક્ષા અને ગોપનીયતા",
    icon: <Shield className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/student/safe-mode",
        icon: <Shield className="w-4 h-4" />,
        label: "Safe Learning Mode",
        labelGu: "સુરક્ષિત શીખવું",
      },
      {
        href: "/dashboard/student/explainable-ai",
        icon: <Eye className="w-4 h-4" />,
        label: "Explainable AI",
        labelGu: "સમજાવી શકાય તેવું AI",
      },
      {
        href: "/dashboard/student/privacy",
        icon: <Lock className="w-4 h-4" />,
        label: "Privacy Settings",
        labelGu: "ગોપનીયતા સેટિંગ્સ",
      },
    ],
  },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "dashboard",
    "ai-tutor",
  ]);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== "student") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!mounted || !isAuthenticated || user?.role !== "student") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GayanSetu.AI
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <>
            {/* Overlay for mobile */}
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
              />
            )}

            {/* Sidebar Content */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 w-72 h-screen bg-white border-r border-gray-200 flex flex-col"
            >
              {/* Logo */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-2.5 rounded-xl shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      GayanSetu.AI
                    </h1>
                    <p className="text-xs text-gray-500 font-gujarati">
                      તમારો AI શિક્ષક
                    </p>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-gujarati text-gray-600">
                      {getGreeting()}
                    </p>
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation with Collapsible Groups */}
              <ScrollArea className="flex-1 px-4">
                <nav className="space-y-2 py-4">
                  {navigationGroups.map((group) => {
                    const isExpanded = expandedGroups.includes(group.id);
                    return (
                      <div key={group.id} className="space-y-1">
                        {/* Group Header */}
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group",
                            "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          {group.icon}
                          <span className="flex-1 font-medium font-gujarati text-sm">
                            {group.labelGu}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {/* Group Items */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <ul className="space-y-1 ml-4 mt-1">
                                {group.items.map((item) => {
                                  const isActive = pathname === item.href;
                                  return (
                                    <li key={item.href}>
                                      <button
                                        onClick={() => {
                                          router.push(item.href);
                                          setIsSidebarOpen(false);
                                        }}
                                        className={cn(
                                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left relative",
                                          isActive
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        )}
                                      >
                                        {item.icon}
                                        <span className="flex-1 text-sm font-gujarati">
                                          {item.labelGu}
                                        </span>
                                        {item.badge && (
                                          <span
                                            className={cn(
                                              "text-xs px-1.5 py-0.5 rounded font-medium",
                                              isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-blue-100 text-blue-700"
                                            )}
                                          >
                                            {item.badge}
                                          </span>
                                        )}
                                        {item.isNew && (
                                          <span
                                            className={cn(
                                              "text-xs px-1.5 py-0.5 rounded font-medium",
                                              isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-green-100 text-green-700"
                                            )}
                                          >
                                            NEW
                                          </span>
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>

                {/* Settings at Bottom of Scroll */}
                <div className="py-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      router.push("/dashboard/student/settings");
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
                      pathname === "/dashboard/student/settings"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium font-gujarati">સેટિંગ્સ</span>
                  </button>
                </div>
              </ScrollArea>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start gap-3 font-gujarati text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5" />
                  લૉગઆઉટ
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
