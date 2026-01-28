"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HeatmapCell } from "@/types";

interface ClassHeatmapProps {
  data: HeatmapCell[];
  className?: string;
}

export function ClassHeatmap({ data, className }: ClassHeatmapProps) {
  const getColorClass = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-green-400";
    if (score >= 60) return "bg-yellow-400";
    if (score >= 40) return "bg-orange-400";
    return "bg-red-400";
  };

  const uniqueStudents = [...new Set(data.map((cell) => cell.studentName))];
  const uniqueTopics = [...new Set(data.map((cell) => cell.topicName))];

  return (
    <div className={cn("overflow-auto", className)}>
      <div className="inline-block min-w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white border border-gray-300 p-2 text-sm font-semibold text-gray-700">
                Student / Topic
              </th>
              {uniqueTopics.map((topic) => (
                <th
                  key={topic}
                  className="border border-gray-300 p-2 text-sm font-semibold text-gray-700 min-w-[80px]"
                >
                  <div className="writing-mode-vertical transform rotate-180">
                    {topic}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueStudents.map((student, studentIndex) => (
              <tr key={student}>
                <td className="sticky left-0 z-10 bg-white border border-gray-300 p-2 text-sm font-medium text-gray-900">
                  {student}
                </td>
                {uniqueTopics.map((topic, topicIndex) => {
                  const cell = data.find(
                    (d) => d.studentName === student && d.topicName === topic
                  );
                  const score = cell?.score || 0;

                  return (
                    <td
                      key={`${student}-${topic}`}
                      className="border border-gray-300 p-1"
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay:
                            (studentIndex * uniqueTopics.length + topicIndex) *
                            0.01,
                        }}
                        className={cn(
                          "w-full h-12 rounded flex items-center justify-center",
                          "text-white font-semibold text-sm",
                          getColorClass(score)
                        )}
                        title={`${student} - ${topic}: ${score}%`}
                      >
                        {score}%
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
