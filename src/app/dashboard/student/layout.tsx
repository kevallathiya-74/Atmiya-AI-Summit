"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  BookOpen,
  History,
  Target,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getGreeting } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  labelGu: string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard/student/ask-ai",
    icon: <MessageSquare className="w-5 h-5" />,
    label: "Ask AI",
    labelGu: "AI ને પૂછો",
  },
  {
    href: "/dashboard/student/learn",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Learn",
    labelGu: "શીખો",
  },
  {
    href: "/dashboard/student/notes",
    icon: <History className="w-5 h-5" />,
    label: "Notes",
    labelGu: "નોંધો",
  },
  {
    href: "/dashboard/student/practice",
    icon: <Target className="w-5 h-5" />,
    label: "Practice",
    labelGu: "અભ્યાસ",
  },
  {
    href: "/dashboard/student/settings",
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    labelGu: "સેટિંગ્સ",
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

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== "student") {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

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

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => {
                            router.push(item.href);
                            setIsSidebarOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left",
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {item.icon}
                          <span className="font-medium font-gujarati">
                            {item.labelGu}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

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
