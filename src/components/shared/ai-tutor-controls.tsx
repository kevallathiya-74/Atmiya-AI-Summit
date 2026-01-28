"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDashboardStore } from "@/store/dashboard-store";
import {
  Zap,
  Heart,
  BookOpen,
  Sparkles,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExplanationSpeed, ExplanationStyle } from "@/types";

export function AITutorControls() {
  const { aiTutorConfig, setAITutorConfig } = useDashboardStore();
  const [showControls, setShowControls] = useState(false);

  const speeds: { value: ExplanationSpeed; label: string; labelGu: string }[] =
    [
      { value: "slow", label: "Slow", labelGu: "ધીમું" },
      { value: "normal", label: "Normal", labelGu: "સામાન્ય" },
      { value: "fast", label: "Fast", labelGu: "ઝડપી" },
    ];

  const styles: {
    value: ExplanationStyle;
    label: string;
    labelGu: string;
    icon: any;
  }[] = [
    { value: "story", label: "Story", labelGu: "વાર્તા", icon: Heart },
    {
      value: "real-life",
      label: "Real-life",
      labelGu: "વાસ્તવિક",
      icon: Sparkles,
    },
    {
      value: "step-by-step",
      label: "Step-by-step",
      labelGu: "પગલું-દર-પગલું",
      icon: BookOpen,
    },
    { value: "visual-analogy", label: "Visual", labelGu: "દૃશ્ય", icon: Zap },
  ];

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 font-gujarati">
          AI શિક્ષક સેટિંગ્સ
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? "Hide" : "Show"}
        </Button>
      </div>

      {showControls && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="space-y-4"
        >
          {/* Speed Control */}
          <div>
            <Label className="text-sm font-medium text-gray-700 font-gujarati">
              સમજાવવાની ગતિ
            </Label>
            <div className="flex gap-2 mt-2">
              {speeds.map((speed) => (
                <Button
                  key={speed.value}
                  variant={
                    aiTutorConfig.speed === speed.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setAITutorConfig({ speed: speed.value })}
                  className="flex-1 font-gujarati"
                >
                  {speed.labelGu}
                </Button>
              ))}
            </div>
          </div>

          {/* Explanation Style */}
          <div>
            <Label className="text-sm font-medium text-gray-700 font-gujarati">
              સમજાવવાની શૈલી
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {styles.map((style) => {
                const Icon = style.icon;
                return (
                  <Button
                    key={style.value}
                    variant={
                      aiTutorConfig.style === style.value
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setAITutorConfig({ style: style.value })}
                    className="font-gujarati justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {style.labelGu}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center gap-4 pt-2 border-t">
            <button
              onClick={() =>
                setAITutorConfig({
                  explainLike10: !aiTutorConfig.explainLike10,
                })
              }
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                aiTutorConfig.explainLike10
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium font-gujarati">
                સરળ ભાષામાં
              </span>
            </button>

            <button
              onClick={() =>
                setAITutorConfig({ voiceEnabled: !aiTutorConfig.voiceEnabled })
              }
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                aiTutorConfig.voiceEnabled
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              {aiTutorConfig.voiceEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="text-sm font-medium font-gujarati">અવાજ</span>
            </button>
          </div>
        </motion.div>
      )}
    </Card>
  );
}

export function VoiceInputButton({
  onVoiceInput,
}: {
  onVoiceInput?: (text: string) => void;
}) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input will be implemented with backend
    if (onVoiceInput) {
      setTimeout(() => {
        onVoiceInput("Sample voice input");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <Button
      type="button"
      size="icon"
      variant={isListening ? "default" : "outline"}
      onClick={handleVoiceInput}
      className={cn("relative", isListening && "animate-pulse")}
    >
      <Mic className="w-5 h-5" />
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
    </Button>
  );
}
