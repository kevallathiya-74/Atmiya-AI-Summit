"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { Eye, CheckCircle2, Plus, Edit, Ban, CheckCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subjects: string[];
  classes: number;
  verified: boolean;
  status: "active" | "inactive" | "pending";
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Dr. Raj Kumar",
      email: "raj.kumar@teacher.com",
      avatar: "RK",
      subjects: ["Physics", "Mathematics"],
      classes: 8,
      verified: true,
      status: "active",
    },
    {
      id: "2",
      name: "Prof. Meera Singh",
      email: "meera.singh@teacher.com",
      avatar: "MS",
      subjects: ["Chemistry", "Biology"],
      classes: 6,
      verified: true,
      status: "active",
    },
    {
      id: "3",
      name: "Arjun Kapoor",
      email: "arjun.kapoor@teacher.com",
      avatar: "AK",
      subjects: ["English", "History"],
      classes: 5,
      verified: false,
      status: "pending",
    },
    {
      id: "4",
      name: "Dr. Kavita Desai",
      email: "kavita.desai@teacher.com",
      avatar: "KD",
      subjects: ["Mathematics", "Computer Science"],
      classes: 10,
      verified: true,
      status: "active",
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    subjects: [] as string[],
    status: "pending" as Teacher["status"],
  });

  const [editTeacher, setEditTeacher] = useState({
    name: "",
    email: "",
    subjects: [] as string[],
  });

  const availableSubjects = [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "English",
    "History",
    "Geography",
    "Computer Science",
    "Gujarati",
    "Hindi",
  ];

  const handleCreateTeacher = async () => {
    if (
      !newTeacher.name ||
      !newTeacher.email ||
      newTeacher.subjects.length === 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newTeacher.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const teacher: Teacher = {
      id: (teachers.length + 1).toString(),
      ...newTeacher,
      avatar: newTeacher.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      classes: 0,
      verified: false,
    };

    setTeachers([...teachers, teacher]);
    setShowCreateDialog(false);
    setIsCreating(false);
    setNewTeacher({
      name: "",
      email: "",
      subjects: [],
      status: "pending",
    });
  };

  const handleEditClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditTeacher({
      name: teacher.name,
      email: teacher.email,
      subjects: teacher.subjects,
    });
    setShowEditDialog(true);
  };

  const handleUpdateTeacher = async () => {
    if (!selectedTeacher || !editTeacher.name || !editTeacher.email) {
      alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editTeacher.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsEditing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id
          ? {
              ...t,
              ...editTeacher,
              avatar: editTeacher.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
            }
          : t
      )
    );

    setShowEditDialog(false);
    setIsEditing(false);
    setSelectedTeacher(null);
  };

  const handleSuspendClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowSuspendDialog(true);
  };

  const handleSuspendTeacher = async () => {
    if (!selectedTeacher) return;

    setIsSuspending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id
          ? {
              ...t,
              status: t.status === "active" ? "inactive" : "active",
            }
          : t
      )
    );

    setShowSuspendDialog(false);
    setIsSuspending(false);
    setSelectedTeacher(null);
  };

  const handleVerifyClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowVerifyDialog(true);
  };

  const handleVerifyTeacher = async () => {
    if (!selectedTeacher) return;

    setIsVerifying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id
          ? {
              ...t,
              verified: true,
              status: "active",
            }
          : t
      )
    );

    setShowVerifyDialog(false);
    setIsVerifying(false);
    setSelectedTeacher(null);
  };

  const toggleSubject = (subject: string, isNew: boolean) => {
    if (isNew) {
      setNewTeacher((prev) => ({
        ...prev,
        subjects: prev.subjects.includes(subject)
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      }));
    } else {
      setEditTeacher((prev) => ({
        ...prev,
        subjects: prev.subjects.includes(subject)
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      }));
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "pending":
        return "info";
      default:
        return "neutral";
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
    ];
    return colors[index % colors.length];
  };

  const getSubjectColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-green-100 text-green-800",
    ];
    return colors[index % colors.length];
  };

  const columns = [
    {
      key: "teacher",
      label: "Teacher",
      render: (teacher: Teacher) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
              parseInt(teacher.id) - 1
            )} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}
          >
            {teacher.avatar}
          </div>
          <div>
            <p className="font-medium text-gray-900">{teacher.name}</p>
            <p className="text-sm text-gray-500">{teacher.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "subjects",
      label: "Subjects",
      render: (teacher: Teacher) => (
        <div className="flex flex-wrap gap-1.5">
          {teacher.subjects.map((subject, index) => (
            <span
              key={subject}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getSubjectColor(
                index
              )}`}
            >
              {subject}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "classes",
      label: "Classes",
      render: (teacher: Teacher) => (
        <span className="text-sm font-medium text-gray-700">
          {teacher.classes} {teacher.classes === 1 ? "class" : "classes"}
        </span>
      ),
    },
    {
      key: "verification",
      label: "Verification",
      render: (teacher: Teacher) => (
        <div className="flex items-center gap-2">
          {teacher.verified ? (
            <div className="flex items-center gap-1.5 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Verified</span>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleVerifyClick(teacher)}
              className="h-7 text-xs"
            >
              Verify
            </Button>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (teacher: Teacher) => (
        <StatusBadge
          status={
            teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)
          }
          variant={getStatusVariant(teacher.status)}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (teacher: Teacher) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleEditClick(teacher)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleSuspendClick(teacher)}
          >
            {teacher.status === "active" ? (
              <Ban className="w-4 h-4 text-red-600" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PageHeader
          title="Teacher Management"
          description="View and manage all teacher accounts and their assignments"
          action={
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Teacher
            </Button>
          }
        />

        <DataTable
          columns={columns}
          data={teachers}
          searchKeys={["name", "email"]}
          searchPlaceholder="Search teachers by name or email..."
          onExport={() => {}}
          onFilter={() => {}}
        />
      </div>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>Create a new teacher account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                placeholder="Dr. John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
                placeholder="john.doe@school.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Subjects * (Select at least one)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableSubjects.map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={newTeacher.subjects.includes(subject)}
                      onChange={() => toggleSubject(subject, true)}
                      className="rounded"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateTeacher} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Teacher"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>Update teacher information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                value={editTeacher.name}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={editTeacher.email}
                onChange={(e) =>
                  setEditTeacher({ ...editTeacher, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subjects *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableSubjects.map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={editTeacher.subjects.includes(subject)}
                      onChange={() => toggleSubject(subject, false)}
                      className="rounded"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              disabled={isEditing}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateTeacher} disabled={isEditing}>
              {isEditing ? "Updating..." : "Update Teacher"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suspend/Activate Confirmation */}
      <ConfirmDialog
        open={showSuspendDialog}
        onOpenChange={setShowSuspendDialog}
        onConfirm={handleSuspendTeacher}
        title={
          selectedTeacher?.status === "active"
            ? "Suspend Teacher?"
            : "Activate Teacher?"
        }
        description={
          selectedTeacher?.status === "active"
            ? `Are you sure you want to suspend ${selectedTeacher?.name}? They will lose access to all platform features.`
            : `Are you sure you want to activate ${selectedTeacher?.name}? They will regain full platform access.`
        }
        confirmText={
          isSuspending
            ? "Processing..."
            : selectedTeacher?.status === "active"
            ? "Yes, Suspend"
            : "Yes, Activate"
        }
        cancelText="Cancel"
        variant={selectedTeacher?.status === "active" ? "danger" : "default"}
      />

      {/* Verify Confirmation */}
      <ConfirmDialog
        open={showVerifyDialog}
        onOpenChange={setShowVerifyDialog}
        onConfirm={handleVerifyTeacher}
        title="Verify Teacher?"
        description={`Are you sure you want to verify ${selectedTeacher?.name}? This will grant them full teaching privileges.`}
        confirmText={isVerifying ? "Verifying..." : "Yes, Verify"}
        cancelText="Cancel"
        variant="default"
      />
    </div>
  );
}
