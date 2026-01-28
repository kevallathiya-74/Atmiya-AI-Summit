"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { StudyPlannerCard } from "@/components/shared";
import { Calendar, Target, Clock, CheckCircle2 } from "lucide-react";

export default function StudyPlannerPage() {
  const todayTasks = [
    { time: "09:00 AM", subject: "Mathematics", task: "Complete Chapter 1", duration: "60 min", completed: true },
    { time: "11:00 AM", subject: "Science", task: "Revision - Physics", duration: "45 min", completed: true },
    { time: "03:00 PM", subject: "English", task: "Grammar Practice", duration: "30 min", completed: false },
    { time: "05:00 PM", subject: "Gujarati", task: "Reading Comprehension", duration: "40 min", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">અભ્યાસ યોજનાકાર</h1><p className="text-sm md:text-base text-gray-600 mt-2">Study Planner - Organize your learning schedule</p></div>

        <StudyPlannerCard />

        <Card className="p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" />Today's Schedule</h2><div className="space-y-3">{todayTasks.map((task, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className={`flex items-center gap-4 p-4 rounded-lg ${task.completed ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'}`}><div className="flex-shrink-0">{task.completed ? <CheckCircle2 className="w-8 h-8 text-green-600" /> : <Clock className="w-8 h-8 text-blue-600" />}</div><div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">{task.time}</span><span className="font-semibold text-gray-900">{task.subject}</span></div><p className="text-sm text-gray-700">{task.task}</p></div><div className="text-right text-sm text-gray-600">{task.duration}</div></motion.div>))}</div></Card>

        <div className="grid md:grid-cols-3 gap-6"><Card className="p-6"><Target className="w-8 h-8 text-purple-600 mb-3" /><p className="text-sm text-gray-600 mb-1">Tasks Today</p><p className="text-2xl font-bold text-gray-900">4</p></Card><Card className="p-6"><CheckCircle2 className="w-8 h-8 text-green-600 mb-3" /><p className="text-sm text-gray-600 mb-1">Completed</p><p className="text-2xl font-bold text-green-600">2</p></Card><Card className="p-6"><Calendar className="w-8 h-8 text-blue-600 mb-3" /><p className="text-sm text-gray-600 mb-1">Study Hours</p><p className="text-2xl font-bold text-blue-600">2.5h</p></Card></div>
      </motion.div>
    </div>
  );
}
