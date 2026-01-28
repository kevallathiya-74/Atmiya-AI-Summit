"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Target,
  Download,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo student data
const DEMO_STUDENTS = [
  { id: "1", name: "અર્જુન પટેલ", class: "8", avgScore: 85, trend: "up", attendance: 95 },
  { id: "2", name: "પ્રિયા શાહ", class: "8", avgScore: 92, trend: "up", attendance: 98 },
  { id: "3", name: "રાહુલ મહેતા", class: "8", avgScore: 72, trend: "down", attendance: 88 },
  { id: "4", name: "નિશા જોશી", class: "8", avgScore: 78, trend: "stable", attendance: 92 },
  { id: "5", name: "વિરાજ ત્રિવેદી", class: "8", avgScore: 88, trend: "up", attendance: 96 },
  { id: "6", name: "આર્યા દેસાઈ", class: "8", avgScore: 65, trend: "down", attendance: 75 },
];

// Demo class performance
const CLASS_PERFORMANCE = {
  averageScore: 80,
  highestScore: 98,
  lowestScore: 55,
  passRate: 92,
  subjectWise: [
    { subject: "ગણિત", average: 78, highest: 95 },
    { subject: "વિજ્ઞાન", average: 82, highest: 98 },
    { subject: "ગુજરાતી", average: 85, highest: 92 },
    { subject: "અંગ્રેજી", average: 75, highest: 90 },
    { subject: "સામાજિક વિજ્ઞાન", average: 80, highest: 94 },
  ],
};

export default function ReportsPage() {
  const [selectedClass, setSelectedClass] = useState("8");
  const [reportType, setReportType] = useState<"class" | "student">("class");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const filteredStudents = DEMO_STUDENTS.filter(s => s.class === selectedClass);
  const atRiskStudents = filteredStudents.filter(s => s.avgScore < 75 || s.attendance < 80);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                વિદ્યાર્થી રિપોર્ટ્સ
              </h1>
              <p className="text-gray-600 font-gujarati">
                વર્ગ અને વિદ્યાર્થી પ્રદર્શન વિશ્લેષણ
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-40 font-gujarati">
                <SelectValue placeholder="ધોરણ પસંદ કરો" />
              </SelectTrigger>
              <SelectContent>
                {["5", "6", "7", "8", "9", "10", "11", "12"].map((level) => (
                  <SelectItem key={level} value={level} className="font-gujarati">
                    ધોરણ {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="font-gujarati">
              <Download className="w-4 h-4 mr-2" />
              રિપોર્ટ ડાઉનલોડ
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-gujarati">કુલ વિદ્યાર્થીઓ</p>
                  <p className="text-3xl font-bold mt-1">{filteredStudents.length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-gujarati">સરેરાશ સ્કોર</p>
                  <p className="text-3xl font-bold mt-1">{CLASS_PERFORMANCE.averageScore}%</p>
                </div>
                <Award className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-gujarati">પાસ રેટ</p>
                  <p className="text-3xl font-bold mt-1">{CLASS_PERFORMANCE.passRate}%</p>
                </div>
                <Target className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-gujarati">ધ્યાન જોઈએ</p>
                  <p className="text-3xl font-bold mt-1">{atRiskStudents.length}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-gujarati flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  વિષય પ્રમાણે પ્રદર્શન
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CLASS_PERFORMANCE.subjectWise.map((subject, index) => (
                    <motion.div
                      key={subject.subject}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 font-gujarati">
                          {subject.subject}
                        </span>
                        <span className="text-sm text-gray-600">
                          {subject.average}% સરેરાશ
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.average}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                          className={cn(
                            "h-full rounded-full",
                            subject.average >= 80 ? "bg-gradient-to-r from-green-400 to-emerald-500" :
                            subject.average >= 60 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                            "bg-gradient-to-r from-red-400 to-red-500"
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* At-Risk Students */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="font-gujarati flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-5 h-5" />
                  ધ્યાન આપવાની જરૂર
                </CardTitle>
                <CardDescription className="font-gujarati">
                  ઓછા સ્કોર અથવા હાજરી ધરાવતા વિદ્યાર્થીઓ
                </CardDescription>
              </CardHeader>
              <CardContent>
                {atRiskStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-600 font-gujarati">બધા વિદ્યાર્થીઓ સારું કરી રહ્યા છે!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {atRiskStudents.map((student) => (
                      <div
                        key={student.id}
                        className="p-3 bg-orange-50 rounded-xl border border-orange-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800 font-gujarati">
                            {student.name}
                          </span>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            student.avgScore < 75 ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                          )}>
                            {student.avgScore}%
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          <span className="font-gujarati">હાજરી: {student.attendance}%</span>
                          {student.trend === "down" && (
                            <span className="flex items-center text-red-600">
                              <TrendingDown className="w-3 h-3 mr-1" />
                              ઘટતું
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Student List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="font-gujarati flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                વિદ્યાર્થી યાદી - ધોરણ {selectedClass}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 font-gujarati">નામ</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 font-gujarati">સરેરાશ સ્કોર</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 font-gujarati">હાજરી</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 font-gujarati">ટ્રેન્ડ</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 font-gujarati">સ્થિતિ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-800 font-gujarati">
                            {student.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={cn(
                            "font-bold",
                            student.avgScore >= 80 ? "text-green-600" :
                            student.avgScore >= 60 ? "text-yellow-600" : "text-red-600"
                          )}>
                            {student.avgScore}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={cn(
                            student.attendance >= 90 ? "text-green-600" :
                            student.attendance >= 75 ? "text-yellow-600" : "text-red-600"
                          )}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.trend === "up" ? (
                            <span className="inline-flex items-center text-green-600">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              વધતું
                            </span>
                          ) : student.trend === "down" ? (
                            <span className="inline-flex items-center text-red-600">
                              <TrendingDown className="w-4 h-4 mr-1" />
                              ઘટતું
                            </span>
                          ) : (
                            <span className="text-gray-500">સ્થિર</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {student.avgScore >= 75 && student.attendance >= 80 ? (
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-gujarati">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              સારું
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-gujarati">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              ધ્યાન જોઈએ
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
