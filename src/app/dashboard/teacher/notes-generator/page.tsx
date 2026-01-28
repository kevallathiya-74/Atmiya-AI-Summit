"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  Sparkles,
  BookOpen,
  Download,
  Copy,
  Edit,
  CheckCircle2,
  Save,
  Trash2,
  FileText,
} from "lucide-react";

interface SavedNote {
  id: string;
  title: string;
  titleGu: string;
  subject: string;
  topic: string;
  class: string;
  format: string;
  content: string[];
  createdAt: string;
}

export default function NotesGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"generate" | "saved">("generate");
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    class: "10",
    format: "concise",
  });
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

  // CRUD states
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([
    {
      id: "1",
      title: "Quadratic Equations Notes",
      titleGu: "ચતુર્ઘાત સમીકરણોની નોંધ",
      subject: "Mathematics",
      topic: "Quadratic Equations",
      class: "10",
      format: "concise",
      content: ["# Key concepts...", "# Examples..."],
      createdAt: "2 days ago",
    },
  ]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedNote, setSelectedNote] = useState<SavedNote | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTitleGu, setNoteTitleGu] = useState("");

  // CRUD Handlers
  const handleSaveNote = () => {
    if (!noteTitle.trim() || !noteTitleGu.trim()) {
      alert(
        "કૃપા કરીને નોંધ શીર્ષક અંગ્રેજી અને ગુજરાતીમાં ભરો | Please fill note title in both English and Gujarati"
      );
      return;
    }

    if (generatedNotes.length === 0) {
      alert("કૃપા કરીને પ્રથમ નોંધ જનરેટ કરો | Please generate notes first");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const newNote: SavedNote = {
        id: Date.now().toString(),
        title: noteTitle,
        titleGu: noteTitleGu,
        subject: formData.subject,
        topic: formData.topic,
        class: formData.class,
        format: formData.format,
        content: generatedNotes,
        createdAt: "હમણાં જ | Just now",
      };
      setSavedNotes([newNote, ...savedNotes]);
      setShowSaveDialog(false);
      setNoteTitle("");
      setNoteTitleGu("");
      setIsSaving(false);
      alert("નોંધ સફળતાપૂર્વક સાચવ્યું! | Note saved successfully!");
    }, 1000);
  };

  const handleEditClick = (note: SavedNote) => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNoteTitleGu(note.titleGu);
    setShowEditDialog(true);
  };

  const handleUpdateNote = () => {
    if (!noteTitle.trim() || !noteTitleGu.trim()) {
      alert("કૃપા કરીને નોંધ શીર્ષક ભરો | Please fill note title");
      return;
    }

    setIsEditing(true);
    setTimeout(() => {
      setSavedNotes(
        savedNotes.map((note) =>
          note.id === selectedNote?.id
            ? { ...note, title: noteTitle, titleGu: noteTitleGu }
            : note
        )
      );
      setShowEditDialog(false);
      setSelectedNote(null);
      setNoteTitle("");
      setNoteTitleGu("");
      setIsEditing(false);
      alert("નોંધ અપડેટ થયું! | Note updated!");
    }, 1000);
  };

  const handleDeleteClick = (note: SavedNote) => {
    setSelectedNote(note);
    setShowDeleteDialog(true);
  };

  const handleDeleteNote = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setSavedNotes(savedNotes.filter((note) => note.id !== selectedNote?.id));
      setShowDeleteDialog(false);
      setSelectedNote(null);
      setIsDeleting(false);
    }, 1000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedNotes([
        "# મુખ્ય ખ્યાલો\n- પ્રથમ મહત્વપૂર્ણ મુદ્દો\n- બીજો મહત્વપૂર્ણ મુદ્દો\n- ત્રીજો મહત્વપૂર્ણ મુદ્દો",
        "# ઉદાહરણો\nવાસ્તવિક જીવનમાંથી ઉદાહરણો અહીં આવશે...",
        "# સૂત્રો અને સમીકરણો\nમહત્વપૂર્ણ સૂત્રો અહીં લખો...",
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            નોંધ જનરેટર | Notes Generator
          </h1>
          <p className="text-gray-600 mt-2">
            કોઈપણ વિષય માટે AI-સંચાલિત શિક્ષણ નોંધ | AI-powered teaching notes
            for any topic
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab("generate")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "generate"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>નોંધ જનરેટ કરો | Generate Notes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "saved"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>સાચવેલ નોંધ | Saved Notes ({savedNotes.length})</span>
            </div>
          </button>
        </div>

        {activeTab === "generate" ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                જનરેટ કરો | Generate Notes
              </h2>
              <div className="space-y-4">
                <div>
                  <Label>વિષય | Subject</Label>
                  <Input
                    placeholder="Mathematics"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>વિષય | Topic</Label>
                  <Input
                    placeholder="Quadratic Equations"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>વર્ગ | Class</Label>
                  <Input
                    placeholder="10"
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>ફોર્મેટ | Format</Label>
                  <div className="flex flex-col gap-2 mt-2">
                    {["concise", "detailed", "visual"].map((format) => (
                      <Button
                        key={format}
                        variant={
                          formData.format === format ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setFormData({ ...formData, format })}
                      >
                        {format.charAt(0).toUpperCase() + format.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={
                    isGenerating || !formData.subject || !formData.topic
                  }
                  className="w-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating
                    ? "જનરેટ કરી રહ્યું છે... | Generating..."
                    : "નોંધ જનરેટ કરો | Generate Notes"}
                </Button>
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  જનરેટ કરેલ નોંધ | Generated Notes
                </h2>
                {generatedNotes.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setShowSaveDialog(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      સાચવો | Save
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
              <ScrollArea className="h-96">
                {generatedNotes.length > 0 ? (
                  <div className="space-y-4">
                    {generatedNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <pre className="whitespace-pre-wrap font-gujarati text-sm">
                          {note}
                        </pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-3 opacity-50" />
                      <p>
                        તમારી AI-જનરેટ કરેલ નોંધ અહીં દેખાશે | Your AI-generated
                        notes will appear here
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>
        ) : (
          /* Saved Notes View */
          <div className="space-y-4">
            {savedNotes.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  કોઈ સાચવેલ નોંધ નથી | No Saved Notes
                </h3>
                <p className="text-gray-500">
                  પ્રથમ નોંધ જનરેટ કરો અને તેને સાચવો | Generate your first
                  notes and save them
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedNotes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800 mb-1">
                            {note.titleGu}
                          </h3>
                          <p className="text-sm text-gray-600">{note.title}</p>
                        </div>
                        <FileText className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">વિષય | Subject:</span>
                          <span className="font-medium">{note.subject}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">ટોપિક | Topic:</span>
                          <span className="font-medium">{note.topic}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">વર્ગ | Class:</span>
                          <span className="font-medium">{note.class}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            બનાવ્યું | Created:
                          </span>
                          <span className="font-medium">{note.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditClick(note)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          સંપાદન | Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteClick(note)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>નોંધ સાચવો | Save Note</DialogTitle>
            <DialogDescription>
              આ નોંધને ભવિષ્યમાં ઉપયોગ માટે સાચવો | Save this note for future
              use
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>શીર્ષક (ગુજરાતી) | Title (Gujarati) *</Label>
              <Input
                value={noteTitleGu}
                onChange={(e) => setNoteTitleGu(e.target.value)}
                placeholder="ઉદાહરણ: ચતુર્ઘાત સમીકરણોની નોંધ"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (English) *</Label>
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g., Quadratic Equations Notes"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              disabled={isSaving}
            >
              રદ કરો | Cancel
            </Button>
            <Button onClick={handleSaveNote} disabled={isSaving}>
              {isSaving ? "સાચવી રહ્યું છે..." : "સાચવો | Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>નોંધ સંપાદિત કરો | Edit Note</DialogTitle>
            <DialogDescription>
              નોંધ શીર્ષક અપડેટ કરો | Update note title
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>શીર્ષક (ગુજરાતી) | Title (Gujarati) *</Label>
              <Input
                value={noteTitleGu}
                onChange={(e) => setNoteTitleGu(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (English) *</Label>
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              રદ કરો | Cancel
            </Button>
            <Button onClick={handleUpdateNote} disabled={isEditing}>
              {isEditing ? "અપડેટ કરી રહ્યું છે..." : "અપડેટ | Update"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteNote}
        title="નોંધ કાઢી નાખો? | Delete Note?"
        description={`શું તમે ખરેખર "${selectedNote?.titleGu}" કાઢી નાખવા માંગો છો? આ ક્રિયા પાછી ફેરવી શકાશે નહીં. | Are you sure you want to delete "${selectedNote?.title}"? This action cannot be undone.`}
        confirmText={
          isDeleting ? "કાઢી રહ્યું છે..." : "હા, કાઢી નાખો | Yes, Delete"
        }
        cancelText="રદ કરો | Cancel"
        variant="danger"
      />
    </div>
  );
}
