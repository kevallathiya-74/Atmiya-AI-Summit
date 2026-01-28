"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Eye, Ban, CheckCircle, Edit, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  class: string;
  performance: number;
  status: "active" | "inactive" | "suspended";
  lastActive: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@student.com",
      avatar: "PS",
      class: "Class 12 - Science",
      performance: 92,
      status: "active",
      lastActive: "2 mins ago",
    },
    {
      id: "2",
      name: "Amit Patel",
      email: "amit.patel@student.com",
      avatar: "AP",
      class: "Class 11 - Commerce",
      performance: 78,
      status: "active",
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Sneha Reddy",
      email: "sneha.reddy@student.com",
      avatar: "SR",
      class: "Class 10 - CBSE",
      performance: 88,
      status: "active",
      lastActive: "30 mins ago",
    },
    {
      id: "4",
      name: "Rahul Verma",
      email: "rahul.verma@student.com",
      avatar: "RV",
      class: "Class 12 - Arts",
      performance: 65,
      status: "inactive",
      lastActive: "3 days ago",
    },
    {
      id: "5",
      name: "Anjali Gupta",
      email: "anjali.gupta@student.com",
      avatar: "AG",
      class: "Class 11 - Science",
      performance: 95,
      status: "active",
      lastActive: "10 mins ago",
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    class: "",
  });

  const handleSuspend = () => {
    if (!selectedStudent) return;
    setLoading(true);
    setTimeout(() => {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: "suspended" as const }
            : student
        )
      );
      setShowSuspendModal(false);
      setSelectedStudent(null);
      setLoading(false);
    }, 800);
  };

  const handleActivate = () => {
    if (!selectedStudent) return;
    setLoading(true);
    setTimeout(() => {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: "active" as const }
            : student
        )
      );
      setShowActivateModal(false);
      setSelectedStudent(null);
      setLoading(false);
    }, 800);
  };

  const handleEditClass = () => {
    if (!selectedStudent) return;
    setLoading(true);
    setTimeout(() => {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, class: formData.class }
            : student
        )
      );
      setShowEditModal(false);
      setSelectedStudent(null);
      setFormData({ class: "" });
      setLoading(false);
    }, 800);
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setFormData({ class: student.class });
    setShowEditModal(true);
  };

  const openSuspendModal = (student: Student) => {
    setSelectedStudent(student);
    setShowSuspendModal(true);
  };

  const openActivateModal = (student: Student) => {
    setSelectedStudent(student);
    setShowActivateModal(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "suspended":
        return "error";
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
      "from-indigo-500 to-purple-500",
    ];
    return colors[index % colors.length];
  };

  const columns = [
    {
      key: "student",
      label: "Student",
      render: (student: Student) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
              parseInt(student.id) - 1
            )} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}
          >
            {student.avatar}
          </div>
          <div>
            <p className="font-medium text-gray-900">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "class",
      label: "Class",
      render: (student: Student) => (
        <span className="text-sm text-gray-700">{student.class}</span>
      ),
    },
    {
      key: "performance",
      label: "Performance",
      render: (student: Student) => (
        <div className="w-32">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  student.performance >= 90
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : student.performance >= 75
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : student.performance >= 60
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                    : "bg-gradient-to-r from-red-500 to-pink-500"
                }`}
                style={{ width: `${student.performance}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-600 min-w-[35px]">
              {student.performance}%
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (student: Student) => (
        <StatusBadge
          status={
            student.status.charAt(0).toUpperCase() + student.status.slice(1)
          }
          variant={getStatusVariant(student.status)}
        />
      ),
    },
    {
      key: "lastActive",
      label: "Last Active",
      render: (student: Student) => (
        <span className="text-sm text-gray-600">{student.lastActive}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (student: Student) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            onClick={() => openEditModal(student)}
            title="Edit Class"
          >
            <Edit className="w-4 h-4" />
          </Button>
          {student.status === "suspended" ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 transition-colors"
              onClick={() => openActivateModal(student)}
              title="Activate Account"
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={() => openSuspendModal(student)}
              title="Suspend Account"
            >
              <Ban className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <PageHeader
          title="Student Management"
          description="View and manage all student accounts on the platform"
        />

        <DataTable
          columns={columns}
          data={students}
          searchKeys={["name", "email", "class"]}
          searchPlaceholder="Search students by name, email, or class..."
          onExport={() => {}}
          onFilter={() => {}}
        />

        {/* Edit Class Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Student Class</DialogTitle>
              <DialogDescription>
                Update class assignment for {selectedStudent?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => setFormData({ class: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 12 - Science">
                      Class 12 - Science
                    </SelectItem>
                    <SelectItem value="Class 12 - Commerce">
                      Class 12 - Commerce
                    </SelectItem>
                    <SelectItem value="Class 12 - Arts">
                      Class 12 - Arts
                    </SelectItem>
                    <SelectItem value="Class 11 - Science">
                      Class 11 - Science
                    </SelectItem>
                    <SelectItem value="Class 11 - Commerce">
                      Class 11 - Commerce
                    </SelectItem>
                    <SelectItem value="Class 11 - Arts">
                      Class 11 - Arts
                    </SelectItem>
                    <SelectItem value="Class 10 - CBSE">
                      Class 10 - CBSE
                    </SelectItem>
                    <SelectItem value="Class 10 - GSEB">
                      Class 10 - GSEB
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditClass}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Suspend Confirmation */}
        <ConfirmDialog
          open={showSuspendModal}
          onOpenChange={setShowSuspendModal}
          title="Suspend Student Account"
          description={`Are you sure you want to suspend ${selectedStudent?.name}'s account? They will not be able to access the platform until reactivated.`}
          onConfirm={handleSuspend}
          loading={loading}
          confirmText="Suspend Account"
          variant="danger"
        />

        {/* Activate Confirmation */}
        <ConfirmDialog
          open={showActivateModal}
          onOpenChange={setShowActivateModal}
          title="Activate Student Account"
          description={`Are you sure you want to activate ${selectedStudent?.name}'s account?`}
          onConfirm={handleActivate}
          loading={loading}
          confirmText="Activate Account"
          variant="default"
        />
      </div>
    </div>
  );
}
