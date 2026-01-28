"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Play, Pause, Download, Headphones } from "lucide-react";
import { useState } from "react";

export default function AudioLessonsPage() {
  const [playing, setPlaying] = useState<number | null>(null);

  const lessons = [
    {
      id: 1,
      title: "Integers Explained",
      titleGu: "પૂર્ણાંકો સમજાવ્યા",
      duration: "12:30",
      size: "8 MB",
    },
    {
      id: 2,
      title: "Algebra Introduction",
      titleGu: "બીજગણિત પરિચય",
      duration: "15:45",
      size: "10 MB",
    },
    {
      id: 3,
      title: "Geometry Basics",
      titleGu: "ભૂમિતિ મૂળભૂત",
      duration: "10:20",
      size: "7 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ઓડિયો પાઠ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Audio Lessons - Learn by listening
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-4">
            <Headphones className="w-12 h-12 text-purple-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Perfect for Rural & Low Bandwidth
              </h2>
              <p className="text-sm text-gray-600">
                Audio lessons use minimal data and work offline after download.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {lesson.titleGu}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{lesson.title}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Duration: {lesson.duration}</span>
                      <span>Size: {lesson.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={playing === lesson.id ? "secondary" : "default"}
                      onClick={() =>
                        setPlaying(playing === lesson.id ? null : lesson.id)
                      }
                    >
                      {playing === lesson.id ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
