"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  Target,
  CheckCircle2,
  XCircle,
  Plus,
  History,
  Trash2,
  RotateCcw,
  Book,
  Trophy,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticeSession {
  id: string;
  subject: string;
  subjectGu: string;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  duration: string;
}

// Demo practice history
const demoHistory: PracticeSession[] = [
  {
    id: "1",
    subject: "Mathematics",
    subjectGu: "ગણિત",
    totalQuestions: 10,
    correctAnswers: 8,
    date: "આજે",
    duration: "15 મિનિટ",
  },
  {
    id: "2",
    subject: "Science",
    subjectGu: "વિજ્ઞાન",
    totalQuestions: 15,
    correctAnswers: 12,
    date: "ગઈકાલે",
    duration: "20 મિનિટ",
  },
  {
    id: "3",
    subject: "English",
    subjectGu: "અંગ્રેજી",
    totalQuestions: 8,
    correctAnswers: 6,
    date: "2 દિવસ પહેલા",
    duration: "10 મિનિટ",
  },
];

export default function PracticePage() {
  const [sessions, setSessions] = useState<PracticeSession[]>(demoHistory);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Form state
  const [newSession, setNewSession] = useState({
    subject: "",
    totalQuestions: "10",
  });

  const subjectOptions = [
    { value: "math", label: "Mathematics", labelGu: "ગણિત" },
    { value: "science", label: "Science", labelGu: "વિજ્ઞાન" },
    { value: "english", label: "English", labelGu: "અંગ્રેજી" },
    { value: "gujarati", label: "Gujarati", labelGu: "ગુજરાતી" },
    { value: "social", label: "Social Science", labelGu: "સામાજિક વિજ્ઞાન" },
  ];

  const handleCreateSession = async () => {
    if (!newSession.subject || !newSession.totalQuestions) {
      alert("કૃપા કરીને બધી વિગતો ભરો");
      return;
    }

    setIsCreating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const selectedSubject = subjectOptions.find(
      (s) => s.value === newSession.subject
    );

    const session: PracticeSession = {
      id: Date.now().toString(),
      subject: selectedSubject?.label || "",
      subjectGu: selectedSubject?.labelGu || "",
      totalQuestions: parseInt(newSession.totalQuestions),
      correctAnswers: Math.floor(
        Math.random() * parseInt(newSession.totalQuestions)
      ),
      date: "હમણાં જ",
      duration: "પૂર્ણ થયું",
    };

    setSessions([session, ...sessions]);
    setShowCreateDialog(false);
    setIsCreating(false);
    setNewSession({ subject: "", totalQuestions: "10" });
  };

  const handleClearHistory = async () => {
    setIsClearing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSessions([]);
    setShowClearDialog(false);
    setIsClearing(false);
  };

  const getScorePercentage = (correct: number, total: number) => {
    return Math.round((correct / total) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 60) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 40)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              પ્રેક્ટિસ ઝોન
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Practice Zone - Test your knowledge
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowHistoryDialog(true)}
              variant="outline"
              size="lg"
            >
              <History className="w-5 h-5 mr-2" />
              ઇતિહાસ
            </Button>
            <Button
              onClick={() => setShowCreateDialog(true)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              નવું શરૂ કરો
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">કુલ પ્રેક્ટિસ</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {sessions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600 rounded-xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">સરેરાશ સ્કોર</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {sessions.length > 0
                      ? Math.round(
                          sessions.reduce(
                            (acc, s) =>
                              acc +
                              getScorePercentage(
                                s.correctAnswers,
                                s.totalQuestions
                              ),
                            0
                          ) / sessions.length
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">કુલ પ્રશ્નો</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {sessions.reduce((acc, s) => acc + s.totalQuestions, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Practice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              તાજેતરની પ્રેક્ટિસ
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">
                  હજુ સુધી કોઈ પ્રેક્ટિસ નથી
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ઉપર "નવું શરૂ કરો" બટન દબાવો અને પ્રેક્ટિસ શરૂ કરો
                </p>
                <Button
                  onClick={() => setShowCreateDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  પ્રેક્ટિસ શરૂ કરો
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {sessions.map((session, idx) => {
                    const percentage = getScorePercentage(
                      session.correctAnswers,
                      session.totalQuestions
                    );
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border-2",
                          getScoreColor(percentage)
                        )}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg">
                              {session.subjectGu}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({session.subject})
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span>
                              {session.correctAnswers}/{session.totalQuestions}{" "}
                              બરાબર
                            </span>
                            <span className="text-gray-500">•</span>
                            <span>{session.duration}</span>
                            <span className="text-gray-500">•</span>
                            <span>{session.date}</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">
                            {percentage}%
                          </div>
                          <div className="text-xs text-gray-600">સ્કોર</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          ફરી પ્રયાસ
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Create Practice Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              નવી પ્રેક્ટિસ શરૂ કરો
            </DialogTitle>
            <DialogDescription>
              તમે કયા વિષયની પ્રેક્ટિસ કરવા માંગો છો?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">વિષય પસંદ કરો *</Label>
              <Select
                value={newSession.subject}
                onValueChange={(value) =>
                  setNewSession({ ...newSession, subject: value })
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
              <Label htmlFor="questions">કેટલા પ્રશ્નો? *</Label>
              <Select
                value={newSession.totalQuestions}
                onValueChange={(value) =>
                  setNewSession({ ...newSession, totalQuestions: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="પ્રશ્નો પસંદ કરો" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 પ્રશ્નો</SelectItem>
                  <SelectItem value="10">10 પ્રશ્નો</SelectItem>
                  <SelectItem value="15">15 પ્રશ્નો</SelectItem>
                  <SelectItem value="20">20 પ્રશ્નો</SelectItem>
                  <SelectItem value="25">25 પ્રશ્નો</SelectItem>
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
              onClick={handleCreateSession}
              disabled={isCreating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isCreating ? "શરૂ થઈ રહ્યું છે..." : "પ્રેક્ટિસ શરૂ કરો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <History className="w-6 h-6" />
              પ્રેક્ટિસ ઇતિહાસ
            </DialogTitle>
            <DialogDescription>
              તમારી બધી પ્રેક્ટિસની વિગતો અહીં છે
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">હજુ સુધી કોઈ પ્રેક્ટિસ નથી</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const percentage = getScorePercentage(
                    session.correctAnswers,
                    session.totalQuestions
                  );
                  return (
                    <div
                      key={session.id}
                      className={cn(
                        "p-4 rounded-lg border-2",
                        getScoreColor(percentage)
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg">
                          {session.subjectGu}
                        </span>
                        <span className="text-2xl font-bold">
                          {percentage}%
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          {session.correctAnswers}/{session.totalQuestions}{" "}
                          બરાબર જવાબ
                        </div>
                        <div className="text-gray-600">
                          {session.duration} • {session.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          <div className="flex justify-between items-center pt-4 border-t">
            {sessions.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setShowHistoryDialog(false);
                  setShowClearDialog(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                બધી પ્રેક્ટિસ કાઢી નાખો
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setShowHistoryDialog(false)}
              className="ml-auto"
            >
              બંધ કરો
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clear History Confirmation */}
      <ConfirmDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        onConfirm={handleClearHistory}
        title="બધી પ્રેક્ટિસ કાઢી નાખો?"
        description="શું તમે ખરેખર તમારી બધી પ્રેક્ટિસ કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી ન લાવી શકાય."
        confirmText={isClearing ? "કાઢી રહ્યા છીએ..." : "હા, કાઢી નાખો"}
        cancelText="ના, રહેવા દો"
        variant="danger"
      />
    </div>
  );
}
