"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FolderDown, CheckCircle2, Clock } from "lucide-react";

export default function OfflineCapsulesPage() {
  const capsules = [
    {
      id: 1,
      title: "Integers Chapter",
      titleGu: "પૂર્ણાંકો પ્રકરણ",
      size: "15 MB",
      status: "downloaded",
    },
    {
      id: 2,
      title: "Algebra Basics",
      titleGu: "બીજગણિત મૂળભૂત",
      size: "20 MB",
      status: "available",
    },
    {
      id: 3,
      title: "Geometry - Triangles",
      titleGu: "ભૂમિતિ - ત્રિકોણ",
      size: "18 MB",
      status: "downloading",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ઓફલાઇન કેપ્સ્યુલ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Offline Capsules - Download content for offline learning
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <FolderDown className="w-12 h-12 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Download & Learn Anywhere
              </h2>
              <p className="text-sm text-gray-600">
                Save lessons, videos, and practice questions for offline access.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4">
            <Download className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Downloaded</p>
          </Card>
          <Card className="p-4">
            <Clock className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">45 MB</p>
            <p className="text-sm text-gray-600">Total Size</p>
          </Card>
        </div>

        <div className="space-y-4">
          {capsules.map((capsule, idx) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {capsule.titleGu}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {capsule.title}
                    </p>
                    <p className="text-xs text-gray-500">{capsule.size}</p>
                  </div>
                  {capsule.status === "downloaded" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Downloaded</span>
                    </div>
                  )}
                  {capsule.status === "available" && (
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  {capsule.status === "downloading" && (
                    <div className="text-sm text-blue-600 font-semibold">
                      Downloading... 45%
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
