"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  Users,
  GraduationCap,
  Shield,
  Activity,
  MessageSquare,
  Server,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Info,
  Eye,
  Settings,
  FileText,
  BarChart3,
} from "lucide-react";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: "info" | "warning" | "success";
}

interface SystemAlert {
  id: string;
  message: string;
  type: "info" | "warning" | "success";
  timestamp: string;
}

export default function AdminDashboard() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: "1",
      user: "Priya Sharma",
      action: "Completed Physics Chapter 5",
      timestamp: "2 minutes ago",
      type: "success",
    },
    {
      id: "2",
      user: "Amit Patel",
      action: "Submitted assignment for review",
      timestamp: "15 minutes ago",
      type: "info",
    },
    {
      id: "3",
      user: "Dr. Raj Kumar",
      action: "Created new assessment",
      timestamp: "1 hour ago",
      type: "info",
    },
    {
      id: "4",
      user: "Sneha Reddy",
      action: "Achieved 95% in Math test",
      timestamp: "2 hours ago",
      type: "success",
    },
    {
      id: "5",
      user: "System",
      action: "Database backup completed",
      timestamp: "3 hours ago",
      type: "success",
    },
  ]);

  const [alerts] = useState<SystemAlert[]>([
    {
      id: "1",
      message: "Server maintenance scheduled for 2 AM tonight",
      type: "info",
      timestamp: "Just now",
    },
    {
      id: "2",
      message: "High API usage detected - monitor performance",
      type: "warning",
      timestamp: "30 minutes ago",
    },
    {
      id: "3",
      message: "All systems operational - 99.9% uptime",
      type: "success",
      timestamp: "1 hour ago",
    },
  ]);

  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5% from last month",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      trend: "up" as const,
    },
    {
      title: "Active Teachers",
      value: "156",
      change: "+4 new this week",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500",
      trend: "up" as const,
    },
    {
      title: "Admin Users",
      value: "23",
      change: "2 pending verification",
      icon: Shield,
      color: "from-orange-500 to-red-500",
      trend: "neutral" as const,
    },
    {
      title: "Platform Usage",
      value: "89.2%",
      change: "+5.3% increase",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      trend: "up" as const,
    },
    {
      title: "AI Queries",
      value: "45.2K",
      change: "Today's count",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-500",
      trend: "up" as const,
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "All services operational",
      icon: Server,
      color: "from-teal-500 to-cyan-500",
      trend: "up" as const,
    },
  ];

  const quickActions = [
    {
      label: "View Reports",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      onClick: () => {},
    },
    {
      label: "Monitor Activity",
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      onClick: () => {},
    },
    {
      label: "Analytics",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      onClick: () => {},
    },
    {
      label: "System Settings",
      icon: Settings,
      color: "from-green-500 to-emerald-500",
      onClick: () => {},
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PageHeader
          title="Admin Dashboard"
          description="Monitor and manage the GYAANSETU.AI platform"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h2>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  System Alerts
                </h2>
                <AlertCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge
                          status={
                            alert.type.charAt(0).toUpperCase() +
                            alert.type.slice(1)
                          }
                          variant={alert.type}
                        />
                      </div>
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {alert.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Button
                    onClick={action.onClick}
                    className="w-full h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br hover:scale-105 transition-all shadow-sm hover:shadow-md text-white"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    }}
                  >
                    <div
                      className={`bg-gradient-to-br ${action.color} p-3 rounded-xl`}
                    >
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
