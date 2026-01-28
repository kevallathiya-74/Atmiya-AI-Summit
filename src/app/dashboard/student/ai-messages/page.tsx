"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, MessageCircle, Trophy, Target } from "lucide-react";

export default function AIMessagesPage() {
  const messages = [
    {
      id: 1,
      type: "motivation",
      title: "Great Progress!",
      titleGu: "ઉત્તમ પ્રગતિ!",
      message: "You've completed 3 chapters this week. Keep it up!",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "tip",
      title: "Learning Tip",
      titleGu: "શીખવાની ટીપ",
      message:
        "Try explaining concepts in your own words to strengthen understanding.",
      time: "Yesterday",
    },
    {
      id: 3,
      type: "reminder",
      title: "Revision Due",
      titleGu: "પુનરાવર્તન બાકી",
      message: "3 topics are due for revision today.",
      time: "Today",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            AI સંદેશાઓ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            AI Messages - Personalized guidance and tips
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-4">
            <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {messages.length}
            </p>
            <p className="text-sm text-gray-600">New Messages</p>
          </Card>
          <Card className="p-4">
            <MessageCircle className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">This Week</p>
          </Card>
          <Card className="p-4">
            <Trophy className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600">Total</p>
          </Card>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === "motivation"
                          ? "bg-green-100"
                          : msg.type === "tip"
                          ? "bg-blue-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {msg.type === "motivation" ? (
                        <Trophy className="w-6 h-6 text-green-600" />
                      ) : msg.type === "tip" ? (
                        <Sparkles className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Target className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {msg.titleGu}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{msg.title}</p>
                      <p className="text-sm text-gray-700 mb-2">
                        {msg.message}
                      </p>
                      <p className="text-xs text-gray-500">{msg.time}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
