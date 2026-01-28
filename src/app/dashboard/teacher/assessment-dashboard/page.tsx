"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

interface AssessmentData {
  title: string;
  date: string;
  totalStudents: number;
  attempted: number;
  avgScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
}

export default function AssessmentDashboardPage() {
  const assessments: AssessmentData[] = [
    {
      title: "ગણિત ટર્મ ટેસ્ટ | Math Term Test",
      date: "20 જાન્યુઆરી | Jan 2026",
      totalStudents: 45,
      attempted: 43,
      avgScore: 78,
      highestScore: 98,
      lowestScore: 45,
      passRate: 86,
    },
    {
      title: "વિજ્ઞાન પ્રેક્ટિકલ | Science Practical",
      date: "18 જાન્યુઆરી | Jan 2026",
      totalStudents: 45,
      attempted: 45,
      avgScore: 82,
      highestScore: 95,
      lowestScore: 58,
      passRate: 91,
    },
    {
      title: "અંગ્રેજી સ્પીકિંગ | English Speaking",
      date: "15 જાન્યુઆરી | Jan 2026",
      totalStudents: 45,
      attempted: 42,
      avgScore: 75,
      highestScore: 92,
      lowestScore: 52,
      passRate: 82,
    },
  ];

  const subjectPerformance = [
    { subject: "ગણિત | Mathematics", avgScore: 78, trend: "up", students: 156 },
    { subject: "વિજ્ઞાન | Science", avgScore: 82, trend: "up", students: 156 },
    {
      subject: "અંગ્રેજી | English",
      avgScore: 75,
      trend: "stable",
      students: 156,
    },
    { subject: "સામાજિક | Social", avgScore: 80, trend: "up", students: 156 },
  ];

  const insights = [
    {
      type: "success",
      title: "ઉત્તમ પ્રદર્શન | Excellent Performance",
      description:
        "વિજ્ઞાન વર્ગમાં 91% પાસ રેટ | Science class achieved 91% pass rate",
      icon: CheckCircle,
    },
    {
      type: "warning",
      title: "ધ્યાન જરૂરી | Attention Needed",
      description:
        "અંગ્રેજીમાં 10 વિદ્યાર્થીઓને વધારાની મદદ | 10 students need extra help in English",
      icon: AlertCircle,
    },
    {
      type: "info",
      title: "સુધારણા | Improvement",
      description:
        "ગણિતમાં +12% સુધારો છેલ્લા મહિનાથી | +12% improvement in Math from last month",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              મૂલ્યાંકન ડેશબોર્ડ | Assessment Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              વ્યાપક મૂલ્યાંકન સૂઝ | Comprehensive assessment insights
            </p>
          </div>
          <BarChart3 className="w-12 h-12 text-purple-500" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ મૂલ્યાંકન | Total Assessments",
              value: "18",
              icon: FileText,
              color: "purple",
            },
            {
              label: "સરેરાશ સ્કોર | Average Score",
              value: "78%",
              icon: Target,
              color: "pink",
            },
            {
              label: "કુલ વિદ્યાર્થીઓ | Total Students",
              value: "156",
              icon: Users,
              color: "rose",
            },
            {
              label: "પાસ રેટ | Pass Rate",
              value: "86%",
              icon: Award,
              color: "fuchsia",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Assessments */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" />
            તાજેતરના મૂલ્યાંકન | Recent Assessments
          </h2>
          <div className="space-y-4">
            {assessments.map((assessment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {assessment.title}
                    </h3>
                    <p className="text-sm text-gray-600">{assessment.date}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      assessment.passRate >= 85
                        ? "bg-green-100 text-green-700"
                        : assessment.passRate >= 70
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {assessment.passRate}% પાસ | Pass
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {assessment.attempted}/{assessment.totalStudents}
                    </p>
                    <p className="text-xs text-gray-600">
                      પ્રયાસ કર્યો | Attempted
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {assessment.avgScore}%
                    </p>
                    <p className="text-xs text-gray-600">સરેરાશ | Average</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {assessment.highestScore}%
                    </p>
                    <p className="text-xs text-gray-600">ઉચ્ચતમ | Highest</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {assessment.lowestScore}%
                    </p>
                    <p className="text-xs text-gray-600">નીચલું | Lowest</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {assessment.passRate}%
                    </p>
                    <p className="text-xs text-gray-600">પાસ રેટ | Pass Rate</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    વિગત જુઓ | View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    રિપોર્ટ | Report
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Performance */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-pink-500" />
              વિષય પ્રદર્શન | Subject Performance
            </h2>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {subject.subject}
                    </h3>
                    <div className="flex items-center gap-2">
                      {subject.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-lg font-bold text-purple-600">
                        {subject.avgScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{subject.students} વિદ્યાર્થીઓ | students</span>
                    <span>
                      {subject.trend === "up"
                        ? "સુધરો | Improving"
                        : "સ્થિર | Stable"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${subject.avgScore}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Insights */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-rose-500" />
              મુખ્ય સૂઝ | Key Insights
            </h2>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    insight.type === "success"
                      ? "bg-green-50 border-green-300"
                      : insight.type === "warning"
                      ? "bg-yellow-50 border-yellow-300"
                      : "bg-blue-50 border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <insight.icon
                      className={`w-5 h-5 mt-0.5 ${
                        insight.type === "success"
                          ? "text-green-600"
                          : insight.type === "warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            વિગતવાર રિપોર્ટ બનાવો | Generate Detailed Report
          </Button>
          <Button variant="outline" className="flex-1">
            એક્સપોર્ટ કરો | Export Data
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
