"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Sparkles,
  User,
  Bot,
  Loader2,
  BookmarkPlus,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings2,
  Upload,
  FileText,
  X,
  Zap,
  Brain,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateAIResponse, ChatContext } from "@/lib/ai/chat-service";

// Voice recognition hook
function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "gu-IN"; // Gujarati

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current][0].transcript;
        setTranscript(result);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript("");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return { isListening, transcript, startListening, stopListening };
}

// Text-to-speech hook
function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.lang = "gu-IN";
      utteranceRef.current.rate = 0.9;
      utteranceRef.current.onstart = () => setIsSpeaking(true);
      utteranceRef.current.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utteranceRef.current);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { isSpeaking, speak, stop };
}

interface ExplanationMode {
  id: string;
  name: string;
  nameGu: string;
  icon: React.ReactNode;
}

const explanationModes: ExplanationMode[] = [
  { id: "simple", name: "Simple", nameGu: "સરળ", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "story", name: "Story", nameGu: "વાર્તા", icon: <BookmarkPlus className="w-4 h-4" /> },
  { id: "stepByStep", name: "Step-by-Step", nameGu: "ક્રમબદ્ધ", icon: <Brain className="w-4 h-4" /> },
  { id: "realWorld", name: "Real Examples", nameGu: "વાસ્તવિક", icon: <Zap className="w-4 h-4" /> },
];

export default function EnhancedAIChat() {
  const {
    messages,
    addMessage,
    saveNote,
    isAILoading,
    setAILoading,
    learningProfile,
    addXP,
    gamification,
  } = useDashboardStore();

  const [input, setInput] = useState("");
  const [selectedMode, setSelectedMode] = useState("stepByStep");
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isListening, transcript, startListening, stopListening } = useVoiceRecognition();
  const { isSpeaking, speak, stop } = useTextToSpeech();

  // Update input when voice transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAILoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    addMessage({
      role: "user",
      content: userMessage,
    });

    setAILoading(true);

    try {
      const context: ChatContext = {
        userRole: "student",
        studentClass: learningProfile.class,
        subject: learningProfile.subjects[0],
        explanationMode: selectedMode as any,
        weakTopics: learningProfile.weakTopics,
      };

      const response = await generateAIResponse(userMessage, context);

      addMessage({
        role: "assistant",
        content: response.content,
        metadata: {
          xpEarned: response.xpEarned,
          sources: response.sources,
        },
      });

      // Award XP
      if (response.xpEarned) {
        addXP(response.xpEarned, "question");
      }
    } catch (error) {
      addMessage({
        role: "assistant",
        content: "માફ કરશો, કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
      });
    } finally {
      setAILoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSaveNote = (message: any) => {
    saveNote(message);
  };

  const suggestedQuestions = [
    "ગણિતમાં ટકાવારી કેવી રીતે ગણવી?",
    "વિજ્ઞાનમાં પ્રકાશસંશ્લેષણ શું છે?",
    "ગુજરાતી વ્યાકરણ - સમાસ સમજાવો",
    "ઇતિહાસમાં મહાત્મા ગાંધી વિશે જણાવો",
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl shadow-md"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-gujarati">
                  AI ને પૂછો
                </h1>
                <p className="text-sm text-gray-600 font-gujarati">
                  ગુજરાતીમાં કોઈપણ પ્રશ્ન પૂછો • ધોરણ {learningProfile.class}
                </p>
              </div>
            </div>

            {/* XP & Streak Display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">{gamification.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-bold text-orange-700">{gamification.streak} દિવસ</span>
              </div>
            </div>
          </div>

          {/* Explanation Mode Selector */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-600 font-gujarati">સમજાવવાની રીત:</span>
            <div className="flex gap-2">
              {explanationModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all",
                    selectedMode === mode.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {mode.icon}
                  <span className="font-gujarati">{mode.nameGu}</span>
                </button>
              ))}
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
              className="text-center py-12 space-y-8"
            >
              {/* Mascot */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg"
              >
                <span className="text-5xl">🎓</span>
              </motion.div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-900 font-gujarati">
                  નમસ્તે! હું તમારો AI શિક્ષક છું
                </h2>
                <p className="text-gray-600 font-gujarati max-w-lg mx-auto text-lg">
                  મને ગુજરાતીમાં કોઈપણ પ્રશ્ન પૂછો - ગણિત, વિજ્ઞાન, ગુજરાતી, અંગ્રેજી, કે અન્ય કોઈ વિષય!
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="max-w-2xl mx-auto">
                <p className="text-sm text-gray-500 mb-4 font-gujarati">✨ આ પ્રશ્નો અજમાવો:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setInput(question)}
                      className="text-left p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-200 group"
                    >
                      <p className="text-sm font-medium text-gray-700 font-gujarati group-hover:text-blue-600">
                        {question}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span className="font-gujarati">અવાજથી પૂછો</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-gujarati">PDF અપલોડ કરો</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="font-gujarati">જવાબ સાંભળો</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                    >
                      <Bot className="w-6 h-6 text-white" />
                    </motion.div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-5 py-4 shadow-md",
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-white border border-gray-200"
                    )}
                  >
                    <p
                      className={cn(
                        "text-base leading-relaxed whitespace-pre-wrap font-gujarati",
                        message.role === "user" ? "text-white" : "text-gray-800"
                      )}
                    >
                      {message.content}
                    </p>

                    {/* XP Earned Badge */}
                    {message.metadata?.xpEarned && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        <Zap className="w-3 h-3" />
                        +{message.metadata.xpEarned} XP
                      </motion.div>
                    )}

                    {message.role === "assistant" && (
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSaveNote(message)}
                          className="h-8 text-xs font-gujarati text-gray-600 hover:text-blue-600"
                        >
                          <BookmarkPlus className="w-4 h-4 mr-1" />
                          સાચવો
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => (isSpeaking ? stop() : speak(message.content))}
                          className="h-8 text-xs font-gujarati text-gray-600 hover:text-blue-600"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4 mr-1" />
                          ) : (
                            <Volume2 className="w-4 h-4 mr-1" />
                          )}
                          {isSpeaking ? "બંધ કરો" : "સાંભળો"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setInput("ફરીથી સમજાવો")}
                          className="h-8 text-xs font-gujarati text-gray-600 hover:text-blue-600"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          ફરીથી
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-lg"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Loading State */}
              {isAILoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-md">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5 text-blue-600" />
                      </motion.div>
                      <span className="text-base font-gujarati text-gray-600">
                        વિચારી રહ્યું છું...
                      </span>
                      <motion.div
                        className="flex gap-1"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      </motion.div>
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
          {/* Uploaded File Preview */}
          {uploadedFile && (
            <div className="mb-3 flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">{uploadedFile.name}</span>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex gap-3 items-end">
            {/* File Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-14 w-14 shrink-0"
            >
              <Upload className="w-5 h-5" />
            </Button>

            {/* Voice Input */}
            <Button
              type="button"
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              onClick={isListening ? stopListening : startListening}
              className="h-14 w-14 shrink-0"
            >
              {isListening ? (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                  <MicOff className="w-5 h-5" />
                </motion.div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="તમારો પ્રશ્ન અહીં લખો... (અથવા માઇક બટન દબાવો)"
                className="min-h-[56px] max-h-32 resize-none pr-12 font-gujarati text-base rounded-xl border-2 focus:border-blue-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {isListening && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </motion.div>
              )}
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              disabled={!input.trim() || isAILoading}
              className="h-14 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50 rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 font-gujarati">
              Enter = મોકલો | Shift + Enter = નવી લાઇન | 🎤 = અવાજથી પૂછો
            </p>
            <p className="text-xs text-gray-400">
              Powered by GYAANSETU.AI 🚀
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
