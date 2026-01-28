"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Users, MessageCircle, ShieldCheck, Flag, Plus, Edit2, Trash2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Doubt {
  id: string;
  student: string;
  subject: string;
  subjectGu: string;
  doubt: string;
  doubtGu: string;
  replies: number;
  time: string;
  isOwn: boolean;
}

const demoDoubts: Doubt[] = [
  {
    id: "1",
    student: "Anonymous Student",
    subject: "Mathematics",
    subjectGu: "ગણિત",
    doubt: "How to solve quadratic equations?",
    doubtGu: "દ્વિઘાત સમીકરણો કેવી રીતે ઉકેલવું?",
    replies: 3,
    time: "5 min ago",
    isOwn: false,
  },
  {
    id: "2",
    student: "Anonymous",
    subject: "Science",
    subjectGu: "વિજ્ઞાન",
    doubt: "Explain photosynthesis process",
    doubtGu: "પ્રકાશસંશ્લેષણ પ્રક્રિયા સમજાવો",
    replies: 5,
    time: "15 min ago",
    isOwn: true,
  },
  {
    id: "3",
    student: "Anonymous",
    subject: "English",
    subjectGu: "અંગ્રેજી",
    doubt: "Difference between simple past and present perfect",
    doubtGu: "સિમ્પલ પાસ્ટ અને પ્રેઝન્ટ પરફેક્ટ વચ્ચેનો તફાવત",
    replies: 2,
    time: "1 hour ago",
    isOwn: false,
  },
];

export default function DoubtSharingPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(demoDoubts);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);

  // Form state
  const [newDoubt, setNewDoubt] = useState({
    subject: "",
    doubt: "",
    doubtGu: "",
  });

  const [editDoubt, setEditDoubt] = useState({
    subject: "",
    doubt: "",
    doubtGu: "",
  });

  const subjectOptions = [
    { value: "math", label: "Mathematics", labelGu: "ગણિત" },
    { value: "science", label: "Science", labelGu: "વિજ્ઞાન" },
    { value: "english", label: "English", labelGu: "અંગ્રેજી" },
    { value: "gujarati", label: "Gujarati", labelGu: "ગુજરાતી" },
    { value: "social", label: "Social Science", labelGu: "સામાજિક વિજ્ઞાન" },
  ];

  const handlePostDoubt = async () => {
    if (!newDoubt.subject || !newDoubt.doubt) {
      alert("કૃપા કરીને બધી વિગતો ભરો");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const selectedSubject = subjectOptions.find((s) => s.value === newDoubt.subject);

    const doubt: Doubt = {
      id: Date.now().toString(),
      student: "Anonymous",
      subject: selectedSubject?.label || "",
      subjectGu: selectedSubject?.labelGu || "",
      doubt: newDoubt.doubt,
      doubtGu: newDoubt.doubtGu || newDoubt.doubt,
      replies: 0,
      time: "હમણાં જ",
      isOwn: true,
    };

    setDoubts([doubt, ...doubts]);
    setShowCreateDialog(false);
    setIsCreating(false);
    setNewDoubt({ subject: "", doubt: "", doubtGu: "" });
  };

  const handleEditClick = (doubt: Doubt) => {
    if (!doubt.isOwn) return;
    setSelectedDoubt(doubt);
    const subject = subjectOptions.find((s) => s.label === doubt.subject);
    setEditDoubt({
      subject: subject?.value || "",
      doubt: doubt.doubt,
      doubtGu: doubt.doubtGu,
    });
    setShowEditDialog(true);
  };

  const handleUpdateDoubt = async () => {
    if (!selectedDoubt || !editDoubt.subject || !editDoubt.doubt) {
      alert("કૃપા કરીને બધી વિગતો ભરો");
      return;
    }

    setIsEditing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const selectedSubject = subjectOptions.find((s) => s.value === editDoubt.subject);

    setDoubts(
      doubts.map((d) =>
        d.id === selectedDoubt.id
          ? {
              ...d,
              subject: selectedSubject?.label || "",
              subjectGu: selectedSubject?.labelGu || "",
              doubt: editDoubt.doubt,
              doubtGu: editDoubt.doubtGu || editDoubt.doubt,
            }
          : d
      )
    );

    setShowEditDialog(false);
    setIsEditing(false);
    setSelectedDoubt(null);
  };

  const handleDeleteClick = (doubt: Doubt) => {
    if (!doubt.isOwn) return;
    setSelectedDoubt(doubt);
    setShowDeleteDialog(true);
  };

  const handleDeleteDoubt = async () => {
    if (!selectedDoubt) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setDoubts(doubts.filter((d) => d.id !== selectedDoubt.id));
    setShowDeleteDialog(false);
    setIsDeleting(false);
    setSelectedDoubt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              સુરક્ષિત શંકા શેરિંગ
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Safe Doubt Sharing - Ask and help peers anonymously
            </p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            શંકા પૂછો
          </Button>
        </div>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                100% સુરક્ષિત અને મૉડરેટેડ
              </h2>
              <p className="text-sm text-gray-600">
                બધી સામગ્રી AI દ્વારા સુરક્ષા માટે ચકાસાય છે. કોઈ વ્યક્તિગત માહિતી શેર થતી નથી.
              </p>
            </div>
          </div>
        </Card>

        <ScrollArea className="h-[600px]">
          {doubts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">
                હજુ સુધી કોઈ શંકા નથી
              </p>
              <p className="text-sm text-gray-500 mb-4">
                તમારી શંકા પોસ્ટ કરવા ઉપર બટન દબાવો
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {doubts.map((doubt, idx) => (
                <motion.div
                  key={doubt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4">
                      <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-500">
                            {doubt.student} • {doubt.time}
                          </p>
                          {doubt.isOwn && (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(doubt)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClick(doubt)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded">
                            {doubt.subjectGu}
                          </span>
                        </div>
                        <p className="font-semibold text-gray-900 mb-1">
                          {doubt.doubtGu}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {doubt.doubt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {doubt.replies} replies
                          </span>
                          {!doubt.isOwn && (
                            <Button variant="ghost" size="sm">
                              <Flag className="w-4 h-4 mr-1" />
                              Report
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </motion.div>

      {/* Post Doubt Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">તમારી શંકા પૂછો</DialogTitle>
            <DialogDescription>
              તમે સંપૂર્ણ રીતે અનામી રહીને તમારી શંકા પૂછી શકો છો
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">વિષય *</Label>
              <Select
                value={newDoubt.subject}
                onValueChange={(value) => setNewDoubt({ ...newDoubt, subject: value })}
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
              <Label htmlFor="doubt">તમારી શંકા લખો (English) *</Label>
              <Textarea
                id="doubt"
                value={newDoubt.doubt}
                onChange={(e) => setNewDoubt({ ...newDoubt, doubt: e.target.value })}
                placeholder="How to solve this problem? Explain the concept..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doubtGu">તમારી શંકા લખો (ગુજરાતી) - વૈકલ્પિક</Label>
              <Textarea
                id="doubtGu"
                value={newDoubt.doubtGu}
                onChange={(e) => setNewDoubt({ ...newDoubt, doubtGu: e.target.value })}
                placeholder="આ સમસ્યા કેવી રીતે ઉકેલવી? વિભાવના સમજાવો..."
                rows={4}
              />
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">તમારી ખાનગીતા સુરક્ષિત છે</p>
                  <p>તમારું નામ અથવા વ્યક્તિગત માહિતી ક્યારેય શેર થશે નહીં.</p>
                </div>
              </div>
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
              onClick={handlePostDoubt}
              disabled={isCreating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {isCreating ? "પોસ્ટ થઈ રહ્યું છે..." : "શંકા પોસ્ટ કરો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Doubt Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">શંકા સુધારો</DialogTitle>
            <DialogDescription>
              તમારી શંકાની વિગતો સુધારો
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subject">વિષય *</Label>
              <Select
                value={editDoubt.subject}
                onValueChange={(value) => setEditDoubt({ ...editDoubt, subject: value })}
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
              <Label htmlFor="edit-doubt">તમારી શંકા (English) *</Label>
              <Textarea
                id="edit-doubt"
                value={editDoubt.doubt}
                onChange={(e) => setEditDoubt({ ...editDoubt, doubt: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-doubtGu">તમારી શંકા (ગુજરાતી)</Label>
              <Textarea
                id="edit-doubtGu"
                value={editDoubt.doubtGu}
                onChange={(e) => setEditDoubt({ ...editDoubt, doubtGu: e.target.value })}
                rows={4}
              />
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
              onClick={handleUpdateDoubt}
              disabled={isEditing}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isEditing ? "સુધારી રહ્યા છીએ..." : "શંકા સુધારો"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteDoubt}
        title="શંકા કાઢી નાખો?"
        description="શું તમે ખરેખર તમારી શંકા કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી ન લાવી શકાય."
        confirmText={isDeleting ? "કાઢી રહ્યા છીએ..." : "હા, કાઢી નાખો"}
        cancelText="ના, રહેવા દો"
        variant="danger"
      />
    </div>
  );
}
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
