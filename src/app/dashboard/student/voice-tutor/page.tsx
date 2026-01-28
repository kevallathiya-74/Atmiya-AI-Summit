"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Volume2,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Languages,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function VoiceTutorPage() {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("gu");
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const languages = [
    { code: "gu", label: "ગુજરાતી", labelEn: "Gujarati" },
    { code: "hi", label: "हिन्दी", labelEn: "Hindi" },
    { code: "en", label: "English", labelEn: "English" },
  ];

  const speedOptions = [
    { value: 0.75, label: "0.75x (Slow)" },
    { value: 1.0, label: "1.0x (Normal)" },
    { value: 1.25, label: "1.25x (Fast)" },
    { value: 1.5, label: "1.5x (Faster)" },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    // TODO: Integrate Web Speech API for voice input
  };

  const handleStopListening = () => {
    setIsListening(false);
    // TODO: Stop recording and process
  };

  const handlePlayResponse = () => {
    setIsPlaying(true);
    // TODO: Integrate Text-to-Speech API
  };

  const handleReset = () => {
    setTranscript("");
    setResponse("");
    setIsListening(false);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              અવાજ શિક્ષક
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Voice Tutor - Speak naturally in Gujarati
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">
              AI-Powered
            </span>
          </div>
        </div>

        {/* Settings Bar */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-6">
            {/* Language Selector */}
            <div className="flex-1 min-w-[200px]">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Languages className="w-4 h-4" />
                Language / ભાષા
              </label>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={cn(
                      selectedLanguage === lang.code &&
                        "bg-purple-600 hover:bg-purple-700"
                    )}
                  >
                    {lang.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Speech Speed */}
            <div className="flex-1 min-w-[200px]">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Gauge className="w-4 h-4" />
                Speech Speed / વાણી ઝડપ
              </label>
              <div className="flex gap-2">
                {speedOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={speechSpeed === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSpeechSpeed(option.value)}
                    className={cn(
                      speechSpeed === option.value &&
                        "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Main Interaction Area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Voice Input */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-purple-600" />
              તમારો પ્રશ્ન બોલો
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Ask Your Question (Voice Input)
            </p>

            <div className="flex flex-col items-center gap-6">
              {/* Microphone Button */}
              <button
                onClick={isListening ? handleStopListening : handleStartListening}
                className={cn(
                  "relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300",
                  isListening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-purple-600 hover:bg-purple-700"
                )}
              >
                {isListening ? (
                  <MicOff className="w-12 h-12 text-white" />
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
                {isListening && (
                  <span className="absolute -bottom-8 text-sm font-medium text-red-600">
                    Listening... સાંભળી રહ્યું છે
                  </span>
                )}
              </button>

              {/* Transcript Display */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
                >
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    You said:
                  </p>
                  <p className="text-base text-gray-900">{transcript}</p>
                </motion.div>
              )}

              {/* Instructions */}
              <div className="w-full space-y-2 text-sm text-gray-600">
                <p>✓ માઇક્રોફોન પર ક્લિક કરો</p>
                <p>✓ Click microphone to start</p>
                <p>✓ Speak clearly in Gujarati</p>
                <p>✓ Click again to stop</p>
              </div>
            </div>
          </Card>

          {/* AI Response */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              AI નો જવાબ
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              AI Response (Audio + Text)
            </p>

            <ScrollArea className="h-[300px] mb-6">
              {response ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-sm max-w-none"
                >
                  <p className="text-gray-900 leading-relaxed">{response}</p>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Volume2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>જવાબ અહીં દેખાશે</p>
                    <p className="text-sm mt-1">Response will appear here</p>
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* Audio Controls */}
            <div className="flex gap-3">
              <Button
                onClick={handlePlayResponse}
                disabled={!response}
                className="flex-1"
                variant={isPlaying ? "secondary" : "default"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play Audio / સાંભળો
                  </>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                disabled={!transcript && !response}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Info */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
          <h3 className="text-lg font-semibold mb-4">વિશેષતાઓ / Features</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Languages className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Multi-language Support</p>
                <p className="text-xs text-gray-600">Gujarati, Hindi, English</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Gauge className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Adjustable Speed</p>
                <p className="text-xs text-gray-600">0.75x to 1.5x playback</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">AI-Powered Responses</p>
                <p className="text-xs text-gray-600">Context-aware explanations</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
