"use client";

import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClassHeatmap } from "@/components/shared";
import {
  FileText,
  Users,
  ClipboardList,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Demo data
const DEMO_STATS = {
  totalClasses: 4,
  totalStudents: 120,
  pendingAssignments: 8,
  completionRate: 87,
};

const DEMO_HEATMAP_DATA = [
  {
    studentId: "1",
    studentName: "રાજેશ",
    topicId: "t1",
    topicName: "Algebra",
    score: 85,
    attentionLevel: "high" as const,
  },
  {
    studentId: "1",
    studentName: "રાજેશ",
    topicId: "t2",
    topicName: "Geometry",
    score: 72,
    attentionLevel: "medium" as const,
  },
  {
    studentId: "2",
    studentName: "પ્રિયા",
    topicId: "t1",
    topicName: "Algebra",
    score: 92,
    attentionLevel: "high" as const,
  },
  {
    studentId: "2",
    studentName: "પ્રિયા",
    topicId: "t2",
    topicName: "Geometry",
    score: 88,
    attentionLevel: "high" as const,
  },
  {
    studentId: "3",
    studentName: "અમિત",
    topicId: "t1",
    topicName: "Algebra",
    score: 45,
    attentionLevel: "low" as const,
  },
  {
    studentId: "3",
    studentName: "અમિત",
    topicId: "t2",
    topicName: "Geometry",
    score: 52,
    attentionLevel: "low" as const,
  },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const { classInsights, teacherInsights } = useDashboardStore();

  const quickActions = [
    {
      title: "Create Lesson Plan",
      titleGu: "પાઠ યોજના બનાવો",
      icon: FileText,
      href: "/dashboard/teacher/lesson-planner",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Generate Quiz",
      titleGu: "ક્વિઝ બનાવો",
      icon: ClipboardList,
      href: "/dashboard/teacher/content-generator",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "View Analytics",
      titleGu: "વિશ્લેષણ જુઓ",
      icon: TrendingUp,
      href: "/dashboard/teacher/class-insights",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 font-gujarati mt-1">
          તમારા વર્ગો અને વિદ્યાર્થીઓનું વ્યવસ્થાપન કરો
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Classes",
            labelGu: "કુલ વર્ગો",
            value: DEMO_STATS.totalClasses,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            label: "Total Students",
            labelGu: "કુલ વિદ્યાર્થીઓ",
            value: DEMO_STATS.totalStudents,
            icon: Users,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Pending Work",
            labelGu: "બાકી કામ",
            value: DEMO_STATS.pendingAssignments,
            icon: Clock,
            color: "text-orange-600",
            bg: "bg-orange-100",
          },
          {
            label: "Completion Rate",
            labelGu: "પૂર્ણતા દર",
            value: `${DEMO_STATS.completionRate}%`,
            icon: CheckCircle2,
            color: "text-purple-600",
            bg: "bg-purple-100",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-500 font-gujarati">
                      {stat.labelGu}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 font-gujarati">
          ઝડપી ક્રિયાઓ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  className="p-6 cursor-pointer hover:shadow-lg transition-all group"
                  onClick={() => router.push(action.href)}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-gujarati">
                    {action.titleGu}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Insights */}
      {teacherInsights.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 font-gujarati">
              AI આંતરદૃષ્ટિ
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {teacherInsights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.priority === "high"
                    ? "border-red-500 bg-red-50"
                    : insight.priority === "medium"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Class Performance Heatmap */}
      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 font-gujarati">
            વર્ગ કામગીરી નકશો
          </h2>
          <p className="text-sm text-gray-600">
            વિદ્યાર્થીઓની પ્રગતિ ટ્રેક કરો
          </p>
        </div>
        <ClassHeatmap data={DEMO_HEATMAP_DATA} />
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 font-gujarati">
              તાજેતરની સોંપણીઓ
            </h3>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              {
                title: "Algebra Quiz",
                class: "Class 10-A",
                submitted: 28,
                total: 30,
              },
              {
                title: "Physics Assignment",
                class: "Class 10-B",
                submitted: 25,
                total: 32,
              },
              {
                title: "Gujarati Essay",
                class: "Class 10-C",
                submitted: 30,
                total: 30,
              },
            ].map((assignment) => (
              <div
                key={assignment.title}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    {assignment.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {assignment.class}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {assignment.submitted}/{assignment.total}
                  </div>
                  <div className="text-xs text-gray-500">submitted</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 font-gujarati">
              ટોચના પ્રદર્શનકારો
            </h3>
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="space-y-3">
            {[
              { name: "પ્રિયા શાહ", class: "Class 10-A", score: 95 },
              { name: "અમિત પટેલ", class: "Class 10-B", score: 92 },
              { name: "નીતા દેસાઈ", class: "Class 10-A", score: 90 },
            ].map((student, idx) => (
              <div
                key={student.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    idx === 0
                      ? "bg-yellow-400 text-yellow-900"
                      : idx === 1
                      ? "bg-gray-300 text-gray-700"
                      : "bg-orange-300 text-orange-900"
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 font-gujarati">
                    {student.name}
                  </div>
                  <div className="text-sm text-gray-600">{student.class}</div>
                </div>
                <div className="font-bold text-gray-900">{student.score}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
