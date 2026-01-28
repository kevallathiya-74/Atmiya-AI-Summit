"use client";

import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  History,
  Trash2,
  Clock,
  Bot,
  FileText,
  Copy,
  Share2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NotesPage() {
  const { messages, savedNotes, removeNote } = useDashboardStore();

  const allHistory = [...messages, ...savedNotes].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-xl shadow-md">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                નોંધો અને ઇતિહાસ
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                તમારા સાચવેલા સંદેશાઓ અને વાર્તાલાપ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {messages.length}
                    </p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      કુલ સંદેશાઓ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {savedNotes.length}
                    </p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      સાચવેલી નોંધો
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <History className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {allHistory.length}
                    </p>
                    <p className="text-sm text-gray-600 font-gujarati">
                      કુલ ઇતિહાસ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* History List */}
          {allHistory.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <History className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 font-gujarati mb-2">
                  કોઈ ઇતિહાસ નથી
                </h3>
                <p className="text-gray-600 font-gujarati">
                  તમારા વાર્તાલાપ અને નોંધો અહીં દેખાશે
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {allHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            item.role === "assistant"
                              ? "bg-gradient-to-br from-blue-500 to-purple-600"
                              : "bg-gradient-to-br from-gray-600 to-gray-800"
                          }`}
                        >
                          <Bot className="w-5 h-5 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-medium px-3 py-1 rounded-full ${
                                item.role === "assistant"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              } font-gujarati`}
                            >
                              {item.role === "assistant"
                                ? "AI પ્રતિભાવ"
                                : "તમારો સંદેશ"}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="font-gujarati">
                                {formatDate(new Date(item.timestamp))}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-800 font-gujarati leading-relaxed whitespace-pre-wrap">
                            {item.content}
                          </p>

                          {/* Actions */}
                          <div className="mt-4 flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs font-gujarati"
                              onClick={() =>
                                navigator.clipboard.writeText(item.content)
                              }
                            >
                              <Copy className="w-3.5 h-3.5 mr-1" />
                              કૉપિ
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-xs font-gujarati"
                            >
                              <Share2 className="w-3.5 h-3.5 mr-1" />
                              શેર
                            </Button>
                            {savedNotes.some((note) => note.id === item.id) && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs font-gujarati text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeNote(item.id)}
                              >
                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                કાઢી નાખો
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
