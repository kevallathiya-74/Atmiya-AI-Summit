"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import {
  BarChart3,
  TrendingUp,
  Users,
  Brain,
  Download,
  Calendar,
  Activity,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PageHeader
          title="Analytics & Reports"
          description="Platform performance and usage metrics"
          action={
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 Days
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value="1,234"
            change="+12% vs last month"
            icon={Users}
            color="from-blue-500 to-cyan-500"
            trend="up"
          />
          <StatCard
            title="Active Teachers"
            value="89"
            change="+5% vs last month"
            icon={Users}
            color="from-green-500 to-emerald-500"
            trend="up"
          />
          <StatCard
            title="AI Queries"
            value="15.2K"
            change="+23% vs last month"
            icon={Brain}
            color="from-purple-500 to-pink-500"
            trend="up"
          />
          <StatCard
            title="Avg Session Time"
            value="24 min"
            change="+8% vs last month"
            icon={Activity}
            color="from-orange-500 to-red-500"
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Student Engagement
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart placeholder</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Usage Trends
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart placeholder</p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Performance Metrics
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart placeholder</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
