"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  BookOpen,
  Plus,
  Edit,
  ChevronRight,
  FileText,
  Layers,
  Trash2,
  X,
} from "lucide-react";

interface ClassItem {
  class: string;
  subjects: string[];
  topics: number;
}

interface Board {
  board: string;
  classes: ClassItem[];
}

export default function ContentManagement() {
  const [expandedBoard, setExpandedBoard] = useState<string | null>("GSEB");
  const [curriculum, setCurriculum] = useState<Board[]>([
    {
      board: "GSEB",
      classes: [
        {
          class: "Class 10",
          subjects: [
            "Science",
            "Mathematics",
            "Social Science",
            "Gujarati",
            "English",
          ],
          topics: 45,
        },
        {
          class: "Class 9",
          subjects: [
            "Science",
            "Mathematics",
            "Social Science",
            "Gujarati",
            "English",
          ],
          topics: 42,
        },
      ],
    },
    {
      board: "NCERT",
      classes: [
        {
          class: "Class 10",
          subjects: [
            "Science",
            "Mathematics",
            "Social Science",
            "Hindi",
            "English",
          ],
          topics: 48,
        },
        {
          class: "Class 9",
          subjects: [
            "Science",
            "Mathematics",
            "Social Science",
            "Hindi",
            "English",
          ],
          topics: 44,
        },
      ],
    },
  ]);

  // CRUD States
  const [showAddBoardDialog, setShowAddBoardDialog] = useState(false);
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [newBoardName, setNewBoardName] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "board" | "class" | "subject";
    board: string;
    class?: string;
    subject?: string;
  } | null>(null);

  // CRUD Handlers
  const handleAddBoard = () => {
    if (!newBoardName.trim()) {
      alert("Please enter a board name");
      return;
    }

    if (curriculum.find((b) => b.board === newBoardName)) {
      alert("Board already exists");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      setCurriculum([...curriculum, { board: newBoardName, classes: [] }]);
      setShowAddBoardDialog(false);
      setNewBoardName("");
      setIsAdding(false);
    }, 1000);
  };

  const handleAddClass = () => {
    if (!newClassName.trim()) {
      alert("Please enter a class name");
      return;
    }

    const board = curriculum.find((b) => b.board === selectedBoard);
    if (board && board.classes.find((c) => c.class === newClassName)) {
      alert("Class already exists in this board");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      setCurriculum(
        curriculum.map((board) =>
          board.board === selectedBoard
            ? {
                ...board,
                classes: [
                  ...board.classes,
                  { class: newClassName, subjects: [], topics: 0 },
                ],
              }
            : board
        )
      );
      setShowAddClassDialog(false);
      setNewClassName("");
      setSelectedBoard("");
      setIsAdding(false);
    }, 1000);
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) {
      alert("Please enter a subject name");
      return;
    }

    const board = curriculum.find((b) => b.board === selectedBoard);
    const classItem = board?.classes.find((c) => c.class === selectedClass);
    if (classItem && classItem.subjects.includes(newSubject)) {
      alert("Subject already exists in this class");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      setCurriculum(
        curriculum.map((board) =>
          board.board === selectedBoard
            ? {
                ...board,
                classes: board.classes.map((classItem) =>
                  classItem.class === selectedClass
                    ? {
                        ...classItem,
                        subjects: [...classItem.subjects, newSubject],
                      }
                    : classItem
                ),
              }
            : board
        )
      );
      setShowAddSubjectDialog(false);
      setNewSubject("");
      setSelectedBoard("");
      setSelectedClass("");
      setIsAdding(false);
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setTimeout(() => {
      if (deleteTarget.type === "board") {
        setCurriculum(curriculum.filter((b) => b.board !== deleteTarget.board));
      } else if (deleteTarget.type === "class") {
        setCurriculum(
          curriculum.map((board) =>
            board.board === deleteTarget.board
              ? {
                  ...board,
                  classes: board.classes.filter(
                    (c) => c.class !== deleteTarget.class
                  ),
                }
              : board
          )
        );
      } else if (deleteTarget.type === "subject") {
        setCurriculum(
          curriculum.map((board) =>
            board.board === deleteTarget.board
              ? {
                  ...board,
                  classes: board.classes.map((classItem) =>
                    classItem.class === deleteTarget.class
                      ? {
                          ...classItem,
                          subjects: classItem.subjects.filter(
                            (s) => s !== deleteTarget.subject
                          ),
                        }
                      : classItem
                  ),
                }
              : board
          )
        );
      }
      setShowDeleteDialog(false);
      setDeleteTarget(null);
      setIsDeleting(false);
    }, 1000);
  };

  const getTotalTopics = () => {
    return curriculum.reduce(
      (total, board) =>
        total + board.classes.reduce((sum, c) => sum + c.topics, 0),
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PageHeader
          title="Content & Curriculum"
          description="Manage GSEB and NCERT curriculum structure"
          action={
            <Button
              onClick={() => setShowAddBoardDialog(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Board
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {curriculum.length}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Curriculum Boards
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {curriculum.map((b) => b.board).join(", ")}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {getTotalTopics()}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Topics</p>
            <p className="text-xs text-gray-500 mt-1">Across all subjects</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Edit className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Pending Approvals
            </p>
            <p className="text-xs text-gray-500 mt-1">Content waiting review</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Curriculum Structure
          </h3>
          <div className="space-y-4">
            {curriculum.map((board) => (
              <div key={board.board} className="border rounded-lg">
                <button
                  onClick={() =>
                    setExpandedBoard(
                      expandedBoard === board.board ? null : board.board
                    )
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      {board.board}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({board.classes.length} classes)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoard(board.board);
                        setShowAddClassDialog(true);
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget({
                          type: "board",
                          board: board.board,
                        });
                        setShowDeleteDialog(true);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedBoard === board.board ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {expandedBoard === board.board && (
                  <div className="border-t bg-gray-50 p-4 space-y-3">
                    {board.classes.map((classItem) => (
                      <div
                        key={classItem.class}
                        className="bg-white rounded-lg p-4 border"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {classItem.class}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {classItem.topics} topics
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedBoard(board.board);
                                setSelectedClass(classItem.class);
                                setShowDeleteDialog(true);
                                setDeleteTarget({
                                  type: "class",
                                  board: board.board,
                                  class: classItem.class,
                                });
                              }}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {classItem.subjects.map((subject) => (
                            <span
                              key={subject}
                              className="group px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1"
                            >
                              {subject}
                              <button
                                onClick={() => {
                                  setDeleteTarget({
                                    type: "subject",
                                    board: board.board,
                                    class: classItem.class,
                                    subject: subject,
                                  });
                                  setShowDeleteDialog(true);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3 text-blue-900 hover:text-red-600" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBoard(board.board);
                              setSelectedClass(classItem.class);
                              setShowAddSubjectDialog(true);
                            }}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Subject
                          </Button>
                          <Button variant="outline" size="sm">
                            View Topics
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Board Dialog */}
      <Dialog open={showAddBoardDialog} onOpenChange={setShowAddBoardDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Board</DialogTitle>
            <DialogDescription>Create a new curriculum board</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Board Name *</Label>
              <Input
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="e.g., CBSE, ICSE"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddBoardDialog(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button onClick={handleAddBoard} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Board"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Class Dialog */}
      <Dialog open={showAddClassDialog} onOpenChange={setShowAddClassDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Add a new class to {selectedBoard} board
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Class Name *</Label>
              <Input
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="e.g., Class 11, Class 12"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddClassDialog(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button onClick={handleAddClass} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Class"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Subject Dialog */}
      <Dialog
        open={showAddSubjectDialog}
        onOpenChange={setShowAddSubjectDialog}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Add a new subject to {selectedClass} in {selectedBoard}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Subject Name *</Label>
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g., Physics, Chemistry"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddSubjectDialog(false)}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button onClick={handleAddSubject} disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Subject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteTarget?.type}?`}
        description={`Are you sure you want to delete this ${
          deleteTarget?.type
        }? ${
          deleteTarget?.type === "board"
            ? "This will delete all classes and subjects in this board."
            : deleteTarget?.type === "class"
            ? "This will delete all subjects in this class."
            : "This will remove the subject from the class."
        } This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Yes, Delete"}
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
