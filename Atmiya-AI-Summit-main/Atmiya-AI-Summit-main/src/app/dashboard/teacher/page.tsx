"use client";

import { motion } from "framer-motion";
import { useTeacherStore } from "@/store/teacher-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  FileText,
  FileQuestion,
  BookOpen,
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherDashboardPage() {
  const router = useRouter();
  const { lessonPlans, generatedQuizzes, syllabusProgress, teacherProfile } = useTeacherStore();

  const quickActions = [
    {
      title: "પાઠ યોજના",
      titleEn: "Lesson Plan",
      icon: <FileText className="w-6 h-6" />,
      href: "/dashboard/teacher/lesson-plan",
      color: "blue",
      description: "AI સાથે પાઠ યોજના બનાવો",
    },
    {
      title: "પ્રશ્નપત્ર",
      titleEn: "Quiz",
      icon: <FileQuestion className="w-6 h-6" />,
      href: "/dashboard/teacher/quiz",
      color: "green",
      description: "MCQ અને પ્રશ્નો જનરેટ કરો",
    },
    {
      title: "નોંધો",
      titleEn: "Notes",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/dashboard/teacher/notes",
      color: "purple",
      description: "પરીક્ષા કેન્દ્રિત નોંધો",
    },
    {
      title: "AI સહાયક",
      titleEn: "AI Assistant",
      icon: <Sparkles className="w-6 h-6" />,
      href: "/dashboard/teacher/ai-assistant",
      color: "amber",
      description: "શિક્ષણ સહાય માટે AI",
    },
  ];

  const stats = [
    {
      title: "પાઠ યોજનાઓ",
      value: lessonPlans.length,
      icon: <FileText className="w-5 h-5" />,
      color: "blue",
    },
    {
      title: "પ્રશ્નપત્રો",
      value: generatedQuizzes.length,
      icon: <FileQuestion className="w-5 h-5" />,
      color: "green",
    },
    {
      title: "ધોરણો",
      value: teacherProfile.classes.length,
      icon: <Users className="w-5 h-5" />,
      color: "purple",
    },
    {
      title: "વિષયો",
      value: teacherProfile.subjects.length,
      icon: <BookOpen className="w-5 h-5" />,
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-gujarati">
              શિક્ષક ડેશબોર્ડ
            </h1>
            <p className="text-gray-600 font-gujarati mt-1">
              આજનું આયોજન અને કાર્યો
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("gu-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "p-4",
                  stat.color === "blue" && "bg-blue-50 border-blue-200",
                  stat.color === "green" && "bg-green-50 border-green-200",
                  stat.color === "purple" && "bg-purple-50 border-purple-200",
                  stat.color === "amber" && "bg-amber-50 border-amber-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      stat.color === "blue" && "bg-blue-100 text-blue-600",
                      stat.color === "green" && "bg-green-100 text-green-600",
                      stat.color === "purple" && "bg-purple-100 text-purple-600",
                      stat.color === "amber" && "bg-amber-100 text-amber-600"
                    )}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-2xl font-bold",
                        stat.color === "blue" && "text-blue-700",
                        stat.color === "green" && "text-green-700",
                        stat.color === "purple" && "text-purple-700",
                        stat.color === "amber" && "text-amber-700"
                      )}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 font-gujarati">{stat.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 font-gujarati">
            ⚡ ઝડપી ક્રિયાઓ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-lg group",
                    action.color === "blue" && "hover:border-blue-400",
                    action.color === "green" && "hover:border-green-400",
                    action.color === "purple" && "hover:border-purple-400",
                    action.color === "amber" && "hover:border-amber-400"
                  )}
                  onClick={() => router.push(action.href)}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                      action.color === "blue" && "bg-blue-100 text-blue-600",
                      action.color === "green" && "bg-green-100 text-green-600",
                      action.color === "purple" && "bg-purple-100 text-purple-600",
                      action.color === "amber" && "bg-amber-100 text-amber-600"
                    )}
                  >
                    {action.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 font-gujarati mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-gujarati">
                    {action.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-400 group-hover:text-gray-600">
                    <span className="font-gujarati">ખોલો</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Syllabus Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold text-gray-800 font-gujarati">
                પાઠ્યક્રમ પ્રગતિ
              </h2>
            </div>

            <div className="space-y-4">
              {syllabusProgress.map((progress, index) => (
                <motion.div
                  key={progress.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border",
                    progress.behindSchedule
                      ? "bg-red-50 border-red-200"
                      : "bg-green-50 border-green-200"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 font-gujarati">
                      {progress.subject}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        progress.behindSchedule ? "text-red-600" : "text-green-600"
                      )}
                    >
                      {progress.percentComplete}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percentComplete}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-full rounded-full",
                        progress.behindSchedule
                          ? "bg-red-500"
                          : "bg-gradient-to-r from-green-500 to-teal-500"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-gujarati">
                      {progress.completedChapters}/{progress.totalChapters} પ્રકરણ
                    </span>
                    {progress.behindSchedule && (
                      <span className="flex items-center gap-1 text-red-600 font-gujarati">
                        <AlertTriangle className="w-4 h-4" />
                        મોડું
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-800 font-gujarati">
                તાજેતરની પ્રવૃત્તિઓ
              </h2>
            </div>

            <div className="space-y-4">
              {lessonPlans.length === 0 && generatedQuizzes.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-gujarati">
                    હજુ સુધી કોઈ પ્રવૃત્તિ નથી
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 font-gujarati"
                    onClick={() => router.push("/dashboard/teacher/lesson-plan")}
                  >
                    પાઠ યોજના બનાવો
                  </Button>
                </div>
              ) : (
                <>
                  {lessonPlans.slice(0, 3).map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50"
                    >
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 font-gujarati">
                          {plan.titleGu}
                        </p>
                        <p className="text-sm text-gray-500">
                          ધોરણ {plan.class} • {plan.subject}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  ))}
                  {generatedQuizzes.slice(0, 3).map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (lessonPlans.length + index) * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-50"
                    >
                      <FileQuestion className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 font-gujarati">
                          {quiz.titleGu}
                        </p>
                        <p className="text-sm text-gray-500">
                          {quiz.questionCount} પ્રશ્નો • {quiz.totalMarks} ગુણ
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Tips */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 font-gujarati mb-1">
                💡 આજની ટિપ
              </h3>
              <p className="text-green-700 font-gujarati">
                વિદ્યાર્થીઓને સારી રીતે સમજાવવા માટે, પહેલા તેમના પૂર્વ જ્ઞાનની ચકાસણી કરો.
                AI Assistant નો ઉપયોગ કરીને વિવિધ સમજાવટ પદ્ધતિઓ શોધી શકો છો.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
