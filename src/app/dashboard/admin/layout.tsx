"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  Brain,
  BarChart3,
  Shield,
  Settings,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  UserCog,
  ClipboardList,
  Flag,
  Zap,
  TrendingUp,
  Lock,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Overview",
      },
    ],
  },
  {
    id: "user-management",
    label: "User Management",
    icon: <UserCog className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/users",
        icon: <Users className="w-4 h-4" />,
        label: "Admin Accounts",
      },
    ],
  },
  {
    id: "student-management",
    label: "Student Management",
    icon: <GraduationCap className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/students",
        icon: <Users className="w-4 h-4" />,
        label: "Student List",
      },
    ],
  },
  {
    id: "teacher-management",
    label: "Teacher Management",
    icon: <UserCheck className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/teachers",
        icon: <Users className="w-4 h-4" />,
        label: "Teacher List",
      },
    ],
  },
  {
    id: "content-curriculum",
    label: "Content & Curriculum",
    icon: <BookOpen className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/content",
        icon: <ClipboardList className="w-4 h-4" />,
        label: "Curriculum Manager",
      },
    ],
  },
  {
    id: "ai-configuration",
    label: "AI Configuration",
    icon: <Brain className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/ai-config",
        icon: <Zap className="w-4 h-4" />,
        label: "AI Settings",
      },
    ],
  },
  {
    id: "analytics-reports",
    label: "Analytics & Reports",
    icon: <TrendingUp className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Platform Analytics",
      },
    ],
  },
  {
    id: "moderation-safety",
    label: "Moderation & Safety",
    icon: <Shield className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/moderation",
        icon: <Flag className="w-4 h-4" />,
        label: "Content Moderation",
      },
    ],
  },
  {
    id: "system-settings",
    label: "System Settings",
    icon: <Settings className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/settings",
        icon: <Lock className="w-4 h-4" />,
        label: "Platform Settings",
      },
    ],
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    icon: <FileText className="w-5 h-5" />,
    items: [
      {
        href: "/dashboard/admin/audit-logs",
        icon: <ShieldCheck className="w-4 h-4" />,
        label: "Activity Logs",
      },
    ],
  },
];

export default function AdminDashboardLayout({
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
    "user-management",
  ]);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated || user?.role !== "admin") {
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

  if (!mounted || !isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              GayanSetu Admin
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
            <div className="bg-gradient-to-br from-red-600 to-orange-600 p-2.5 rounded-xl shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                GayanSetu Admin
              </h2>
              <p className="text-xs text-gray-500">Platform Control</p>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
            <Avatar className="h-10 w-10 ring-2 ring-red-200">
              <AvatarFallback className="bg-gradient-to-br from-red-600 to-orange-600 text-white font-semibold">
                {user?.name?.substring(0, 2).toUpperCase() || "AD"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-red-600 font-medium">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-220px)]">
          <nav className="p-4 space-y-1">
            {navigationGroups.map((group) => {
              const isExpanded = expandedGroups.includes(group.id);
              return (
                <div key={group.id} className="mb-2">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600 group-hover:text-red-600 transition-colors">
                        {group.icon}
                      </div>
                      <span className="font-medium text-sm">{group.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

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
                                      ? "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-sm"
                                      : "text-gray-700 hover:bg-gray-100"
                                  )}
                                >
                                  <div
                                    className={cn(
                                      isActive ? "text-white" : "text-gray-500"
                                    )}
                                  >
                                    {item.icon}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
                                      {item.badge}
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
        </ScrollArea>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            Logout
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
