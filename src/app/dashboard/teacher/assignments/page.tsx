"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 font-gujarati mt-1">
            સોંપણીઓ વ્યવસ્થાપિત કરો
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Assignment
        </Button>
      </div>

      <Card className="p-12 text-center">
        <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Assignment management coming soon...</p>
      </Card>
    </div>
  );
}
