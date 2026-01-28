"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  FileQuestion,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Users,
  Calendar,
  MessageSquare,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  labelGu: string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard/teacher",
    icon: <BarChart3 className="w-5 h-5" />,
    label: "Dashboard",
    labelGu: "ડેશબોર્ડ",
  },
  {
    href: "/dashboard/teacher/lesson-plan",
    icon: <FileText className="w-5 h-5" />,
    label: "Lesson Plan",
    labelGu: "પાઠ યોજના",
  },
  {
    href: "/dashboard/teacher/quiz",
    icon: <FileQuestion className="w-5 h-5" />,
    label: "Quiz Generator",
    labelGu: "પ્રશ્નપત્ર",
  },
  {
    href: "/dashboard/teacher/notes",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Notes",
    labelGu: "નોંધો",
  },
  {
    href: "/dashboard/teacher/ai-assistant",
    icon: <MessageSquare className="w-5 h-5" />,
    label: "AI Assistant",
    labelGu: "AI સહાયક",
  },
  {
    href: "/dashboard/teacher/analytics",
    icon: <Target className="w-5 h-5" />,
    label: "Analytics",
    labelGu: "વિશ્લેષણ",
  },
  {
    href: "/dashboard/teacher/settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    labelGu: "સેટિંગ્સ",
  },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "શુભ સવાર";
  if (hour < 17) return "શુભ બપોર";
  return "શુભ સાંજ";
}

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

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== "teacher") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

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
            <div className="bg-gradient-to-br from-green-600 to-teal-700 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              GYAANSETU.AI
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

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-600 to-teal-700 p-2.5 rounded-xl shadow-md">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  GYAANSETU.AI
                </h1>
                <p className="text-xs text-gray-500 font-gujarati">શિક્ષક પોર્ટલ</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-green-200">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 font-gujarati">{getGreeting()},</p>
                <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setIsSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <span
                    className={cn(
                      "transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-white" : "text-gray-500"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="font-gujarati">{item.labelGu}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-gujarati"
            >
              <LogOut className="w-5 h-5 mr-3" />
              લૉગ આઉટ
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
