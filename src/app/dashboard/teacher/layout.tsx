"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  ClipboardList,
  BookOpen,
  PenTool,
  TrendingUp,
  Home,
  Clock,
  MessageSquare,
  Sparkles,
  Brain,
  Target,
  Edit3,
  Award,
  Calendar,
  Share2,
  Shield,
  ChevronDown,
  ChevronRight,
  Volume2,
  FileQuestion,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  labelGu: string;
  badge?: string;
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
        href: "/dashboard/teacher",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Overview",
        labelGu: "ઝાંખી",
      },
    ],
  },
  {
    id: "lesson-planning",
    label: "Lesson Planning",
    labelGu: "પાઠ આયોજન",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/lesson-planner",
        icon: <FileText className="w-4 h-4" />,
        label: "Lesson Plan Generator",
        labelGu: "પાઠ યોજના બનાવનાર",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/period-flow",
        icon: <Clock className="w-4 h-4" />,
        label: "Period-wise Flow",
        labelGu: "કલાકવાર પ્રવાહ",
      },
      {
        href: "/dashboard/teacher/time-optimizer",
        icon: <Zap className="w-4 h-4" />,
        label: "Time Optimizer",
        labelGu: "સમય શ્રેષ્ઠકરણ",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/teacher-shadow",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Teacher Shadow AI",
        labelGu: "શિક્ષક AI સહાયક",
        badge: "AI",
      },
    ],
  },
  {
    id: "notes-content",
    label: "Notes & Content",
    labelGu: "નોંધો અને સામગ્રી",
    icon: <PenTool className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/notes-generator",
        icon: <PenTool className="w-4 h-4" />,
        label: "Notes Generator",
        labelGu: "નોંધો બનાવનાર",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/exam-notes",
        icon: <Target className="w-4 h-4" />,
        label: "Exam-Focused Notes",
        labelGu: "પરીક્ષા કેન્દ્રિત નોંધો",
      },
      {
        href: "/dashboard/teacher/gujarati-explainer",
        icon: <Volume2 className="w-4 h-4" />,
        label: "Gujarati Explainer",
        labelGu: "ગુજરાતી સમજૂતી",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/editable-output",
        icon: <Edit3 className="w-4 h-4" />,
        label: "Edit AI Content",
        labelGu: "AI સામગ્રી સંપાદન",
      },
      {
        href: "/dashboard/teacher/multilevel-content",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Multi-level Content",
        labelGu: "બહુ-સ્તરીય સામગ્રી",
        badge: "AI",
      },
    ],
  },
  {
    id: "questions-exams",
    label: "Questions & Exams",
    labelGu: "પ્રશ્નો અને પરીક્ષાઓ",
    icon: <FileQuestion className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/quiz-generator",
        icon: <FileQuestion className="w-4 h-4" />,
        label: "Quiz Generator",
        labelGu: "ક્વિઝ બનાવનાર",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/quality-checker",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Question Quality",
        labelGu: "પ્રશ્ન ગુણવત્તા",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/answer-key",
        icon: <FileText className="w-4 h-4" />,
        label: "Answer Key Generator",
        labelGu: "જવાબ કી બનાવનાર",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/marking-scheme",
        icon: <ClipboardList className="w-4 h-4" />,
        label: "Marking Scheme",
        labelGu: "માર્કિંગ યોજના",
      },
      {
        href: "/dashboard/teacher/exam-relevance",
        icon: <Target className="w-4 h-4" />,
        label: "Exam Relevance",
        labelGu: "પરીક્ષા સુસંગતતા",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/curriculum-alignment",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Curriculum Alignment",
        labelGu: "અભ્યાસક્રમ સંરેખણ",
      },
    ],
  },
  {
    id: "classroom-mode",
    label: "Classroom Mode",
    labelGu: "વર્ગખંડ મોડ",
    icon: <Users className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/classroom-mode",
        icon: <Users className="w-4 h-4" />,
        label: "Live Classroom",
        labelGu: "લાઇવ વર્ગખંડ",
      },
      {
        href: "/dashboard/teacher/substitute-mode",
        icon: <Users className="w-4 h-4" />,
        label: "Substitute Teacher",
        labelGu: "અવેજી શિક્ષક",
        badge: "AI",
      },
    ],
  },
  {
    id: "class-insights",
    label: "Class Insights",
    labelGu: "વર્ગ આંતરદૃષ્ટિ",
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/class-insights",
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Class Analytics",
        labelGu: "વર્ગ વિશ્લેષણ",
      },
      {
        href: "/dashboard/teacher/understanding-heatmap",
        icon: <Target className="w-4 h-4" />,
        label: "Understanding Heatmap",
        labelGu: "સમજ હીટમેપ",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/performance-trends",
        icon: <TrendingUp className="w-4 h-4" />,
        label: "Performance Trends",
        labelGu: "પ્રદર્શન વલણ",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/mistake-analyzer",
        icon: <AlertTriangle className="w-4 h-4" />,
        label: "Common Mistakes",
        labelGu: "સામાન્ય ભૂલો",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/revision-suggester",
        icon: <RefreshCw className="w-4 h-4" />,
        label: "Revision Suggester",
        labelGu: "પુનરાવર્તન સૂચવનાર",
        badge: "AI",
      },
    ],
  },
  {
    id: "assignments",
    label: "Assignments",
    labelGu: "સોંપણીઓ",
    icon: <ClipboardList className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/assignments",
        icon: <ClipboardList className="w-4 h-4" />,
        label: "Assignment Manager",
        labelGu: "સોંપણી વ્યવસ્થાપક",
      },
      {
        href: "/dashboard/teacher/model-answers",
        icon: <FileText className="w-4 h-4" />,
        label: "Model Answers",
        labelGu: "નમૂના જવાબો",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/assessment-dashboard",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Assessment Insights",
        labelGu: "મૂલ્યાંકન આંતરદૃષ્ટિ",
      },
    ],
  },
  {
    id: "reports-admin",
    label: "Reports & Admin",
    labelGu: "અહેવાલો અને વહીવટ",
    icon: <Calendar className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/syllabus-tracker",
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: "Syllabus Tracker",
        labelGu: "અભ્યાસક્રમ ટ્રેકર",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/exam-alerts",
        icon: <AlertTriangle className="w-4 h-4" />,
        label: "Exam Readiness",
        labelGu: "પરીક્ષા તૈયારી",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/mis-export",
        icon: <Download className="w-4 h-4" />,
        label: "MIS Export",
        labelGu: "MIS નિકાસ",
      },
      {
        href: "/dashboard/teacher/principal-sharing",
        icon: <Share2 className="w-4 h-4" />,
        label: "Principal Sharing",
        labelGu: "આચાર્ય શેરિંગ",
      },
    ],
  },
  {
    id: "productivity-tools",
    label: "Productivity Tools",
    labelGu: "ઉત્પાદકતા સાધનો",
    icon: <Award className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/skill-tips",
        icon: <Award className="w-4 h-4" />,
        label: "Teaching Skill Tips",
        labelGu: "શિક્ષણ કૌશલ્ય સૂચનો",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/content-generator",
        icon: <Sparkles className="w-4 h-4" />,
        label: "Quick Content",
        labelGu: "ઝડપી સામગ્રી",
        badge: "AI",
      },
    ],
  },
  {
    id: "responsible-ai",
    label: "Responsible AI",
    labelGu: "જવાબદાર AI",
    icon: <Shield className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/teacher/resources",
        icon: <BookOpen className="w-4 h-4" />,
        label: "Safe Content",
        labelGu: "સુરક્ષિત સામગ્રી",
      },
      {
        href: "/dashboard/teacher/hallucination-check",
        icon: <Eye className="w-4 h-4" />,
        label: "Accuracy Check",
        labelGu: "ચોકસાઈ તપાસ",
        badge: "AI",
      },
      {
        href: "/dashboard/teacher/explainable-output",
        icon: <MessageSquare className="w-4 h-4" />,
        label: "Explainable AI",
        labelGu: "સમજાવી શકાય તેવું AI",
      },
      {
        href: "/dashboard/teacher/ethical-analytics",
        icon: <Shield className="w-4 h-4" />,
        label: "Ethical Analytics",
        labelGu: "નૈતિક વિશ્લેષણ",
      },
      {
        href: "/dashboard/teacher/settings",
        icon: <Settings className="w-4 h-4" />,
        label: "Settings",
        labelGu: "સેટિંગ્સ",
      },
    ],
  },
];

export default function TeacherDashboardLayout({
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
    "lesson-planning",
  ]);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== "teacher") {
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

  if (!mounted || !isAuthenticated || user?.role !== "teacher") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GayanSetu AI
            </h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200 transition-transform duration-300",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 p-2.5 rounded-xl shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GayanSetu AI
              </h1>
              <p className="text-xs text-gray-600 font-gujarati">
                શિક્ષક ડેશબોર્ડ
              </p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
            <Avatar className="w-10 h-10 border-2 border-white shadow">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-600">શિક્ષક</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-240px)]">
          {navigationGroups.map((group) => (
            <div key={group.id} className="mb-2">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  {group.icon}
                  <span>{group.label}</span>
                </div>
                {expandedGroups.includes(group.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedGroups.includes(group.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 space-y-1"
                >
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group relative",
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <span
                          className={cn(
                            "transition-transform group-hover:scale-110",
                            isActive && "scale-110"
                          )}
                        >
                          {item.icon}
                        </span>
                        <div className="flex-1 text-left">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              isActive && "text-white"
                            )}
                          >
                            {item.label}
                          </p>
                          <p
                            className={cn(
                              "text-xs font-gujarati",
                              isActive ? "text-white/80" : "text-gray-500"
                            )}
                          >
                            {item.labelGu}
                          </p>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-bold bg-purple-100 text-purple-700 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="teacherActiveIndicator"
                            className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                          />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-gujarati">લૉગઆઉટ</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn("lg:ml-72 min-h-screen", "pt-16 lg:pt-0")}>
        {children}
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
