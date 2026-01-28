"use client";

import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-600 font-gujarati mt-1">શૈક્ષણિક સંસાધનો</p>
      </div>

      <Card className="p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">Resource library coming soon...</p>
      </Card>
    </div>
  );
}
