"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  Calendar,
  Target,
  Clock,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyTask {
  id: string;
  time: string;
  subject: string;
  subjectGu: string;
  task: string;
  duration: string;
  completed: boolean;
}

const demoTasks: StudyTask[] = [
  {
    id: "1",
    time: "09:00",
    subject: "Mathematics",
    subjectGu: "ગણિત",
    task: "Complete Chapter 1",
    duration: "60",
    completed: true,
  },
  {
    id: "2",
    time: "11:00",
    subject: "Science",
    subjectGu: "વિજ્ઞાન",
    task: "Revision - Physics",
    duration: "45",
    completed: true,
  },
  {
    id: "3",
    time: "15:00",
    subject: "English",
    subjectGu: "અંગ્રેજી",
    task: "Grammar Practice",
    duration: "30",
    completed: false,
  },
  {
    id: "4",
    time: "17:00",
    subject: "Gujarati",
    subjectGu: "ગુજરાતી",
    task: "Reading Comprehension",
    duration: "40",
    completed: false,
  },
];

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>(demoTasks);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);

  // Form state
  const [newTask, setNewTask] = useState({
    time: "",
    subject: "",
    task: "",
    duration: "30",
  });

  const [editTask, setEditTask] = useState({
    time: "",
    subject: "",
    task: "",
    duration: "",
  });

  const subjectOptions = [
    { value: "math", label: "Mathematics", labelGu: "ગણિત" },
    { value: "science", label: "Science", labelGu: "વિજ્ઞાન" },
    { value: "english", label: "English", labelGu: "અંગ્રેજી" },
    { value: "gujarati", label: "Gujarati", labelGu: "ગુજરાતી" },
    { value: "social", label: "Social Science", labelGu: "સામાજિક વિજ્ઞાન" },
  ];

  const handleCreateTask = async () => {
    if (!newTask.time || !newTask.subject || !newTask.task) {
      alert("કૃપા કરીને બધી વિગતો ભરો");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const selectedSubject = subjectOptions.find(
      (s) => s.value === newTask.subject
    );

    const task: StudyTask = {
      id: Date.now().toString(),
      time: newTask.time,
      subject: selectedSubject?.label || "",
      subjectGu: selectedSubject?.labelGu || "",
      task: newTask.task,
      duration: newTask.duration,
      completed: false,
    };

    setTasks([...tasks, task].sort((a, b) => a.time.localeCompare(b.time)));
    setShowCreateDialog(false);
    setIsCreating(false);
    setNewTask({ time: "", subject: "", task: "", duration: "30" });
  };

  const handleEditClick = (task: StudyTask) => {
    setSelectedTask(task);
    const subject = subjectOptions.find((s) => s.label === task.subject);
    setEditTask({
      time: task.time,
      subject: subject?.value || "",
      task: task.task,
      duration: task.duration,
    });
    setShowEditDialog(true);
  };

  const handleUpdateTask = async () => {
    if (
      !selectedTask ||
      !editTask.time ||
      !editTask.subject ||
      !editTask.task
    ) {
      alert("કૃપા કરીને બધી વિગતો ભરો");
      return;
    }

    setIsEditing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const selectedSubject = subjectOptions.find(
      (s) => s.value === editTask.subject
    );

    setTasks(
      tasks
        .map((t) =>
          t.id === selectedTask.id
            ? {
                ...t,
                time: editTask.time,
                subject: selectedSubject?.label || "",
                subjectGu: selectedSubject?.labelGu || "",
                task: editTask.task,
                duration: editTask.duration,
              }
            : t
        )
        .sort((a, b) => a.time.localeCompare(b.time))
    );

    setShowEditDialog(false);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleDeleteClick = (task: StudyTask) => {
    setSelectedTask(task);
    setShowDeleteDialog(true);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTasks(tasks.filter((t) => t.id !== selectedTask.id));
    setShowDeleteDialog(false);
    setIsDeleting(false);
    setSelectedTask(null);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalDuration = tasks.reduce((acc, t) => acc + parseInt(t.duration), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              અભ્યાસ યોજનાકાર
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Study Planner - Organize your learning schedule
            </p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            નવું કાર્ય ઉમેરો
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">કુલ કાર્યો</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">પૂર્ણ થયેલ</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {completedCount}/{tasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">કુલ સમય</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalDuration} મિનિટ
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              આજનું શિડ્યૂલ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  હજુ સુધી કોઈ કાર્ય નથી
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ઉપર "નવું કાર્ય ઉમેરો" બટન દબાવો અને તમારું શિડ્યૂલ બનાવો
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  કાર્ય ઉમેરો
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-2 transition-all",
                      task.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-blue-50 border-blue-200"
                    )}
                  >
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className="flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600 hover:scale-110 transition-transform" />
                      ) : (
                        <div className="w-8 h-8 border-4 border-blue-600 rounded-full hover:scale-110 transition-transform" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                          {task.time}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {task.subjectGu}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({task.subject})
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-sm text-gray-700",
                          task.completed && "line-through"
                        )}
                      >
                        {task.task}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-600 flex-shrink-0">
                      {task.duration} મિનિટ
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(task)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(task)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Task Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">નવું કાર્ય ઉમેરો</DialogTitle>
            <DialogDescription>
              તમારા અભ્યાસ સમયપત્રકમાં નવું કાર્ય ઉમેરો
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="time">સમય *</Label>
              <Input
                id="time"
                type="time"
                value={newTask.time}
                onChange={(e) =>
                  setNewTask({ ...newTask, time: e.target.value })
                }
                placeholder="09:00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">વિષય *</Label>
              <Select
                value={newTask.subject}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, subject: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="વિષય પસંદ કરો" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.labelGu} ({subject.label})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task">કાર્ય વિગત *</Label>
              <Textarea
                id="task"
                value={newTask.task}
                onChange={(e) =>
                  setNewTask({ ...newTask, task: e.target.value })
                }
                placeholder="Complete Chapter 1, Practice questions, etc."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">સમયગાળો (મિનિટ) *</Label>
              <Select
                value={newTask.duration}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, duration: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="સમયગાળો પસંદ કરો" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 મિનિટ</SelectItem>
                  <SelectItem value="30">30 મિનિટ</SelectItem>
                  <SelectItem value="45">45 મિનિટ</SelectItem>
                  <SelectItem value="60">60 મિનિટ</SelectItem>
                  <SelectItem value="90">90 મિનિટ</SelectItem>
                  <SelectItem value="120">120 મિનિટ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              disabled={isCreating}
            >
              રદ કરો
            </Button>
            <Button
              onClick={handleCreateTask}
              disabled={isCreating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isCreating ? "ઉમેરી રહ્યા છીએ..." : "કાર્ય ઉમેરો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">કાર્ય સુધારો</DialogTitle>
            <DialogDescription>તમારા કાર્યની વિગતો સુધારો</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-time">સમય *</Label>
              <Input
                id="edit-time"
                type="time"
                value={editTask.time}
                onChange={(e) =>
                  setEditTask({ ...editTask, time: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-subject">વિષય *</Label>
              <Select
                value={editTask.subject}
                onValueChange={(value) =>
                  setEditTask({ ...editTask, subject: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="વિષય પસંદ કરો" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.labelGu} ({subject.label})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-task">કાર્ય વિગત *</Label>
              <Textarea
                id="edit-task"
                value={editTask.task}
                onChange={(e) =>
                  setEditTask({ ...editTask, task: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-duration">સમયગાળો (મિનિટ) *</Label>
              <Select
                value={editTask.duration}
                onValueChange={(value) =>
                  setEditTask({ ...editTask, duration: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="સમયગાળો પસંદ કરો" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 મિનિટ</SelectItem>
                  <SelectItem value="30">30 મિનિટ</SelectItem>
                  <SelectItem value="45">45 મિનિટ</SelectItem>
                  <SelectItem value="60">60 મિનિટ</SelectItem>
                  <SelectItem value="90">90 મિનિટ</SelectItem>
                  <SelectItem value="120">120 મિનિટ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              રદ કરો
            </Button>
            <Button
              onClick={handleUpdateTask}
              disabled={isEditing}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isEditing ? "સુધારી રહ્યા છીએ..." : "કાર્ય સુધારો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteTask}
        title="કાર્ય કાઢી નાખો?"
        description={`શું તમે ખરેખર "${selectedTask?.task}" કાર્ય કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી ન લાવી શકાય.`}
        confirmText={isDeleting ? "કાઢી રહ્યા છીએ..." : "હા, કાઢી નાખો"}
        cancelText="ના, રહેવા દો"
        variant="danger"
      />
    </div>
  );
}
