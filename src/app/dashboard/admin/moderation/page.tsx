"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, Eye, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function Moderation() {
  const flaggedContent = [
    {
      id: 1,
      type: "Question",
      content: "Is this appropriate for students?",
      reporter: "System",
      severity: "medium",
      status: "pending",
    },
    {
      id: 2,
      type: "Answer",
      content: "Peer learning response",
      reporter: "Teacher",
      severity: "low",
      status: "pending",
    },
    {
      id: 3,
      type: "Message",
      content: "Student communication",
      reporter: "AI",
      severity: "high",
      status: "pending",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Moderation & Safety
          </h1>
          <p className="text-gray-600 mt-1">
            Review and moderate flagged content
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Flag className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">
              {flaggedContent.length}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600">Pending Review</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">45</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Approved Today</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-gray-600" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <p className="text-sm font-medium text-gray-600">Rejected Today</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Moderation Queue
        </h3>
        <div className="space-y-4">
          {flaggedContent.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      {item.type}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        item.severity === "high"
                          ? "bg-red-100 text-red-800"
                          : item.severity === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{item.content}</p>
                  <p className="text-xs text-gray-500">
                    Reported by: {item.reporter}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <XCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
