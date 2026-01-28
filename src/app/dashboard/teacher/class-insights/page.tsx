"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, TrendingUp, AlertCircle, Award, Target } from "lucide-react";

interface StudentPerformance {
  studentId: string;
  studentName: string;
  studentNameGu: string;
  topicId: string;
  topicName: string;
  topicNameGu: string;
  score: number;
  attentionLevel: "high" | "medium" | "low";
}

const DEMO_HEATMAP_DATA: StudentPerformance[] = [
  {
    studentId: "1",
    studentName: "Rajesh Patel",
    studentNameGu: "રાજેશ પટેલ",
    topicId: "t1",
    topicName: "Algebra",
    topicNameGu: "બીજગણિત",
    score: 85,
    attentionLevel: "high",
  },
  {
    studentId: "1",
    studentName: "Rajesh Patel",
    studentNameGu: "રાજેશ પટેલ",
    topicId: "t2",
    topicName: "Geometry",
    topicNameGu: "ભૂમિતિ",
    score: 78,
    attentionLevel: "high",
  },
  {
    studentId: "1",
    studentName: "Rajesh Patel",
    studentNameGu: "રાજેશ પટેલ",
    topicId: "t3",
    topicName: "Statistics",
    topicNameGu: "આંકડાશાસ્ત્ર",
    score: 92,
    attentionLevel: "high",
  },
  {
    studentId: "2",
    studentName: "Priya Shah",
    studentNameGu: "પ્રિયા શાહ",
    topicId: "t1",
    topicName: "Algebra",
    topicNameGu: "બીજગણિત",
    score: 72,
    attentionLevel: "medium",
  },
  {
    studentId: "2",
    studentName: "Priya Shah",
    studentNameGu: "પ્રિયા શાહ",
    topicId: "t2",
    topicName: "Geometry",
    topicNameGu: "ભૂમિતિ",
    score: 68,
    attentionLevel: "medium",
  },
  {
    studentId: "2",
    studentName: "Priya Shah",
    studentNameGu: "પ્રિયા શાહ",
    topicId: "t3",
    topicName: "Statistics",
    topicNameGu: "આંકડાશાસ્ત્ર",
    score: 75,
    attentionLevel: "medium",
  },
  {
    studentId: "3",
    studentName: "Amit Desai",
    studentNameGu: "અમિત દેસાઈ",
    topicId: "t1",
    topicName: "Algebra",
    topicNameGu: "બીજગણિત",
    score: 45,
    attentionLevel: "low",
  },
  {
    studentId: "3",
    studentName: "Amit Desai",
    studentNameGu: "અમિત દેસાઈ",
    topicId: "t2",
    topicName: "Geometry",
    topicNameGu: "ભૂમિતિ",
    score: 52,
    attentionLevel: "low",
  },
  {
    studentId: "3",
    studentName: "Amit Desai",
    studentNameGu: "અમિત દેસાઈ",
    topicId: "t3",
    topicName: "Statistics",
    topicNameGu: "આંકડાશાસ્ત્ર",
    score: 38,
    attentionLevel: "low",
  },
];

export default function ClassInsightsPage() {
  const getColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-400";
    return "bg-orange-500";
  };

  const uniqueStudents = Array.from(
    new Set(DEMO_HEATMAP_DATA.map((d) => d.studentId))
  ).map((id) => {
    const student = DEMO_HEATMAP_DATA.find((d) => d.studentId === id);
    return {
      id,
      name: student?.studentName || "",
      nameGu: student?.studentNameGu || "",
    };
  });

  const uniqueTopics = Array.from(
    new Set(DEMO_HEATMAP_DATA.map((d) => d.topicId))
  ).map((id) => {
    const topic = DEMO_HEATMAP_DATA.find((d) => d.topicId === id);
    return {
      id,
      name: topic?.topicName || "",
      nameGu: topic?.topicNameGu || "",
    };
  });

  const topPerformers = uniqueStudents
    .map((student) => {
      const scores = DEMO_HEATMAP_DATA.filter(
        (d) => d.studentId === student.id
      ).map((d) => d.score);
      const avgScore =
        scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return { ...student, avgScore };
    })
    .filter((s) => s.avgScore >= 75)
    .sort((a, b) => b.avgScore - a.avgScore);

  const needsAttention = uniqueStudents
    .map((student) => {
      const scores = DEMO_HEATMAP_DATA.filter(
        (d) => d.studentId === student.id
      ).map((d) => d.score);
      const avgScore =
        scores.reduce((sum, score) => sum + score, 0) / scores.length;
      return { ...student, avgScore };
    })
    .filter((s) => s.avgScore < 60)
    .sort((a, b) => a.avgScore - b.avgScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            વર્ગ આંતરદૃષ્ટિ | Class Insights
          </h1>
          <p className="text-gray-600 mt-2">
            વિદ્યાર્થીઓની પ્રગતિ અને કામગીરી વિશ્લેષણ | Student progress and
            performance analysis
          </p>
        </div>

        {/* Heatmap Card */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              વર્ગ પ્રદર્શન હીટમેપ | Class Performance Heatmap
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-white border-2 border-gray-300 p-4 text-left">
                    <div className="font-semibold text-gray-700">
                      <div>Student / Topic</div>
                      <div className="text-sm font-gujarati text-gray-600">
                        વિદ્યાર્થી / વિષય
                      </div>
                    </div>
                  </th>
                  {uniqueTopics.map((topic) => (
                    <th
                      key={topic.id}
                      className="border-2 border-gray-300 p-4 text-center bg-gradient-to-br from-blue-50 to-purple-50 min-w-[140px]"
                    >
                      <div className="font-semibold text-gray-800">
                        {topic.name}
                      </div>
                      <div className="text-sm font-gujarati text-gray-600">
                        {topic.nameGu}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueStudents.map((student, studentIndex) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: studentIndex * 0.1 }}
                  >
                    <td className="sticky left-0 z-10 bg-white border-2 border-gray-300 p-4">
                      <div className="font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm font-gujarati text-gray-600">
                        {student.nameGu}
                      </div>
                    </td>
                    {uniqueTopics.map((topic, topicIndex) => {
                      const cell = DEMO_HEATMAP_DATA.find(
                        (d) =>
                          d.studentId === student.id && d.topicId === topic.id
                      );
                      const score = cell?.score || 0;

                      return (
                        <td
                          key={`${student.id}-${topic.id}`}
                          className="border-2 border-gray-300 p-2"
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay:
                                (studentIndex * uniqueTopics.length +
                                  topicIndex) *
                                0.05,
                            }}
                            className={`w-full h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md ${getColorClass(
                              score
                            )}`}
                            title={`${student.name} - ${topic.name}: ${score}%`}
                          >
                            {score}%
                          </motion.div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center gap-6 flex-wrap">
            <div className="text-sm text-gray-600 font-semibold">
              Performance Scale:
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">80-100% (Excellent)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-400 rounded"></div>
              <span className="text-sm text-gray-700">60-79% (Good)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">
                Below 60% (Needs Attention)
              </span>
            </div>
          </div>
        </Card>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                પ્રગતિશીલ વિદ્યાર્થીઓ | Top Performers
              </h3>
            </div>
            {topPerformers.length > 0 ? (
              <div className="space-y-3">
                {topPerformers.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm font-gujarati text-gray-600">
                        {student.nameGu}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        {student.avgScore.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No data available
              </p>
            )}
          </Card>

          <Card className="p-6 shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                ધ્યાનની જરૂર | Needs Attention
              </h3>
            </div>
            {needsAttention.length > 0 ? (
              <div className="space-y-3">
                {needsAttention.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm font-gujarati text-gray-600">
                        {student.nameGu}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-orange-600">
                        {student.avgScore.toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                All students performing well!
              </p>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
