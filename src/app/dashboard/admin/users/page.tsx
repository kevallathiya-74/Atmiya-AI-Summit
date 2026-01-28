"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Shield, Eye } from "lucide-react";
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
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export default function UserManagement() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "Raj Shah",
      email: "raj@gayansetu.ai",
      role: "Super Admin",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@gayansetu.ai",
      role: "Admin",
      status: "active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gayansetu.ai",
      role: "Admin",
      status: "active",
      lastLogin: "3 days ago",
    },
    {
      id: 4,
      name: "Neha Desai",
      email: "neha@gayansetu.ai",
      role: "Content Admin",
      status: "active",
      lastLogin: "5 hours ago",
    },
    {
      id: 5,
      name: "Kiran Modi",
      email: "kiran@gayansetu.ai",
      role: "Moderator",
      status: "inactive",
      lastLogin: "1 week ago",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    setTimeout(() => {
      const newAdmin: Admin = {
        id: admins.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "active",
        lastLogin: "Just now",
      };
      setAdmins([...admins, newAdmin]);
      setShowAddModal(false);
      setFormData({ name: "", email: "", role: "Admin" });
      setLoading(false);
    }, 800);
  };

  const handleEdit = () => {
    if (!selectedAdmin) return;
    setLoading(true);
    setTimeout(() => {
      setAdmins(
        admins.map((admin) =>
          admin.id === selectedAdmin.id ? { ...admin, ...formData } : admin
        )
      );
      setShowEditModal(false);
      setSelectedAdmin(null);
      setFormData({ name: "", email: "", role: "Admin" });
      setLoading(false);
    }, 800);
  };

  const handleDelete = () => {
    if (!selectedAdmin) return;
    setLoading(true);
    setTimeout(() => {
      setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      setLoading(false);
    }, 800);
  };

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowDeleteModal(true);
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (admin: Admin) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold mr-3">
            {admin.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{admin.name}</p>
            <p className="text-sm text-gray-500">{admin.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (admin: Admin) => (
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-gray-900">
            {admin.role}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (admin: Admin) => (
        <StatusBadge
          status={admin.status}
          variant={admin.status === "active" ? "success" : "neutral"}
        />
      ),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      render: (admin: Admin) => (
        <span className="text-sm text-gray-600">{admin.lastLogin}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (admin: Admin) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(admin)}
            className="hover:bg-yellow-50 hover:border-yellow-300"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDeleteModal(admin)}
            className="hover:bg-red-50 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="User Management"
        description="Manage admin accounts and permissions"
        action={{
          label: "Add Admin",
          icon: Plus,
          onClick: () => setShowAddModal(true),
        }}
      />

      <DataTable
        columns={columns}
        data={admins}
        searchKeys={["name", "email"]}
        searchPlaceholder="Search by name or email..."
        onExport={() => console.log("Export")}
        onFilter={() => console.log("Filter")}
      />
    </div>
  );
}
