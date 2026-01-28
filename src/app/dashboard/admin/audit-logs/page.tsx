"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/page-header";
import {
  FileText,
  Search,
  Filter,
  Download,
  Shield,
  Settings,
  User,
  AlertCircle,
} from "lucide-react";

export default function AuditLogs() {
  const logs = [
    {
      id: 1,
      action: "User Login",
      user: "admin@gayansetu.ai",
      timestamp: "2 minutes ago",
      type: "auth",
      status: "success",
    },
    {
      id: 2,
      action: "AI Config Updated",
      user: "superadmin@gayansetu.ai",
      timestamp: "15 minutes ago",
      type: "config",
      status: "success",
    },
    {
      id: 3,
      action: "Student Account Created",
      user: "system",
      timestamp: "1 hour ago",
      type: "user",
      status: "success",
    },
    {
      id: 4,
      action: "Failed Login Attempt",
      user: "unknown@email.com",
      timestamp: "2 hours ago",
      type: "auth",
      status: "failed",
    },
    {
      id: 5,
      action: "Content Approved",
      user: "moderator@gayansetu.ai",
      timestamp: "3 hours ago",
      type: "moderation",
      status: "success",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">
            System activity and security audit trail
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Logs
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Search logs..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter by Type
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {log.type === "auth" && (
                        <Shield className="w-4 h-4 text-blue-600" />
                      )}
                      {log.type === "config" && (
                        <Settings className="w-4 h-4 text-purple-600" />
                      )}
                      {log.type === "user" && (
                        <User className="w-4 h-4 text-green-600" />
                      )}
                      {log.type === "moderation" && (
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        log.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{logs.length}</span> of{" "}
              <span className="font-medium">125</span> results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
