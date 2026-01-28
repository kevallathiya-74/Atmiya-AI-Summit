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
    label: "Overview",
    labelGu: "ઝાંખી",
  },
  {
    href: "/dashboard/teacher/lesson-planner",
    icon: <FileText className="w-5 h-5" />,
    label: "Lesson Planner",
    labelGu: "પાઠ યોજનાકાર",
  },
  {
    href: "/dashboard/teacher/content-generator",
    icon: <PenTool className="w-5 h-5" />,
    label: "Content Generator",
    labelGu: "સામગ્રી જનરેટર",
  },
  {
    href: "/dashboard/teacher/class-insights",
    icon: <Users className="w-5 h-5" />,
    label: "Class Insights",
    labelGu: "વર્ગ આંતરદૃષ્ટિ",
  },
  {
    href: "/dashboard/teacher/assignments",
    icon: <ClipboardList className="w-5 h-5" />,
    label: "Assignments",
    labelGu: "સોંપણીઓ",
  },
  {
    href: "/dashboard/teacher/resources",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Resources",
    labelGu: "સંસાધનો",
  },
  {
    href: "/dashboard/teacher/settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    labelGu: "સેટિંગ્સ",
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
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative",
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
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                  />
                )}
              </button>
            );
          })}
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
