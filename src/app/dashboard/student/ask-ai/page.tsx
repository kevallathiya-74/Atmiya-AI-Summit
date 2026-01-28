"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Bot, Loader2, BookmarkPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AskAIPage() {
  const { messages, addMessage, saveNote } = useDashboardStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    addMessage({
      role: "user",
      content: userMessage,
    });

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        `તમારા પ્રશ્ન "${userMessage}" માટે આભાર. મને તમને મદદ કરવામાં આનંદ થાય છે.`,
        `આ એક સરસ પ્રશ્ન છે! ચાલો આપણે આ વિષયને વધુ ઊંડાણથી સમજીએ.`,
        `હું તમારી મદદ કરીશ. આ વિષય વિશે વધુ જાણવા માટે, અહીં કેટલાક મહત્વપૂર્ણ મુદ્દાઓ છે:`,
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      addMessage({
        role: "assistant",
        content:
          randomResponse +
          "\n\nઆ એક ડેમો રિસ્પોન્સ છે. વાસ્તવિક AI ઇન્ટિગ્રેશન પછીથી ઉમેરવામાં આવશે.",
      });

      setIsLoading(false);
    }, 1500);
  };

  const handleSaveNote = (message: any) => {
    saveNote(message);
    // Show toast notification (implement later)
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                AI ને પૂછો
              </h1>
              <p className="text-sm text-gray-600 font-gujarati">
                ગુજરાતીમાં તમારા પ્રશ્નો પૂછો
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                <Sparkles className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900 font-gujarati">
                  હેલો! હું તમારો AI શિક્ષક છું
                </h2>
                <p className="text-gray-600 font-gujarati max-w-md mx-auto">
                  મને કોઈપણ પ્રશ્ન પૂછો અને હું ગુજરાતીમાં તમને મદદ કરીશ
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {[
                  "વિજ્ઞાન શું છે?",
                  "ગણિતમાં મને મદદ કરો",
                  "ગુજરાતી વ્યાકરણ શીખો",
                  "ઇતિહાસ વિશે જણાવો",
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <p className="text-sm font-medium text-gray-700 font-gujarati group-hover:text-blue-600">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-5 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-white border border-gray-200"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm leading-relaxed whitespace-pre-wrap font-gujarati",
                        message.role === "user" ? "text-white" : "text-gray-800"
                      )}
                    >
                      {message.content}
                    </p>

                    {message.role === "assistant" && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveNote(message)}
                          className="h-8 text-xs font-gujarati text-gray-600 hover:text-blue-600"
                        >
                          <BookmarkPlus className="w-4 h-4 mr-1" />
                          સાચવો
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm font-gujarati">
                        વિચારી રહ્યું છું...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="તમારો પ્રશ્ન અહીં લખો..."
                className="min-h-[56px] max-h-32 resize-none pr-12 font-gujarati text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-14 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center font-gujarati">
            Enter = મોકલો | Shift + Enter = નવી લાઇન
          </p>
        </form>
      </div>
    </div>
  );
}
