"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  Blocks,
  Brain,
  Check,
  Zap,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";

export default function ExplanationStylesPage() {
  const { studentContext } = useDashboardStore();
  const [selectedStyle, setSelectedStyle] = useState("simple");
  const [isExplainLike10, setIsExplainLike10] = useState(false);

  const explanationStyles = [
    {
      id: "simple",
      icon: Lightbulb,
      title: "Simple & Clear",
      titleGu: "સરળ અને સ્પષ્ટ",
      description: "Short, easy-to-understand explanations with examples",
      descriptionGu: "ટૂંકા, સમજવા સરળ સમજૂતીઓ ઉદાહરણો સાથે",
      color: "from-green-500 to-emerald-600",
      features: ["✓ Short sentences", "✓ Daily life examples", "✓ No complex terms"],
    },
    {
      id: "detailed",
      icon: BookOpen,
      title: "Detailed & Thorough",
      titleGu: "વિગતવાર અને સંપૂર્ણ",
      description: "Comprehensive explanations with step-by-step breakdown",
      descriptionGu: "પગલું-દર-પગલું વિભાજન સાથે સંપૂર્ણ સમજૂતીઓ",
      color: "from-blue-500 to-indigo-600",
      features: [
        "✓ Complete coverage",
        "✓ Multiple examples",
        "✓ Theory + Practice",
      ],
    },
    {
      id: "visual",
      icon: Blocks,
      title: "Visual & Interactive",
      titleGu: "દૃશ્ય અને ઇન્ટરેક્ટિવ",
      description: "Learn with diagrams, analogies, and visual patterns",
      descriptionGu: "આકૃતિઓ, સામ્યતા અને દૃશ્ય પેટર્ન સાથે શીખો",
      color: "from-purple-500 to-pink-600",
      features: ["✓ Diagrams", "✓ Real-world analogies", "✓ Pattern focus"],
    },
    {
      id: "conceptual",
      icon: Brain,
      title: "Conceptual & Deep",
      titleGu: "વૈચારિક અને ઊંડું",
      description: "Focus on 'why' and 'how' behind concepts",
      descriptionGu: "કોન્સેપ્ટ્સ પાછળના 'શા માટે' અને 'કેવી રીતે' પર ધ્યાન",
      color: "from-orange-500 to-red-600",
      features: [
        "✓ Root concepts",
        "✓ Critical thinking",
        "✓ Deep connections",
      ],
    },
  ];

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
    // TODO: Update explanation style in store
  };

  const handleExplainLike10Toggle = () => {
    const newValue = !isExplainLike10;
    setIsExplainLike10(newValue);
    // TODO: Update explain like 10 setting in store
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
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            સમજૂતી શૈલી
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Explanation Styles - Choose how AI explains concepts to you
          </p>
        </div>

        {/* Explain Like I'm 10 Toggle */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Explain Like I&apos;m 10
                </h3>
                <Button
                  onClick={handleExplainLike10Toggle}
                  variant={isExplainLike10 ? "default" : "outline"}
                  className={cn(
                    isExplainLike10 && "bg-orange-600 hover:bg-orange-700"
                  )}
                >
                  {isExplainLike10 ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Enabled
                    </>
                  ) : (
                    "Enable"
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                જાણે હું 10 વર્ષનો છું તેમ સમજાવો
              </p>
              <p className="text-sm text-gray-600">
                When enabled, AI will use very simple language, short sentences,
                and everyday examples as if explaining to a 10-year-old. Perfect
                for understanding difficult concepts.
              </p>
              {isExplainLike10 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-white rounded-lg border border-orange-200"
                >
                  <p className="text-sm font-medium text-orange-700 mb-2">
                    🎯 Active Mode:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Uses 5th-grade vocabulary</li>
                    <li>• Maximum 15 words per sentence</li>
                    <li>• Relatable everyday examples</li>
                    <li>• No technical jargon</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </Card>

        <Separator />

        {/* Explanation Style Cards */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            તમારી શૈલી પસંદ કરો
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Choose Your Preferred Explanation Style
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {explanationStyles.map((style, index) => {
              const Icon = style.icon;
              const isSelected = selectedStyle === style.id;

              return (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={cn(
                      "p-6 cursor-pointer transition-all duration-300 hover:shadow-xl",
                      isSelected
                        ? "ring-4 ring-purple-500 shadow-lg"
                        : "hover:ring-2 hover:ring-gray-300"
                    )}
                    onClick={() => handleStyleChange(style.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                          style.color
                        )}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {style.titleGu}
                          </h3>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                            >
                              <Check className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          {style.title}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                          {style.descriptionGu}
                        </p>
                        <p className="text-xs text-gray-600 mb-4">
                          {style.description}
                        </p>
                        <div className="space-y-1">
                          {style.features.map((feature, idx) => (
                            <p
                              key={idx}
                              className="text-xs text-gray-700 font-medium"
                            >
                              {feature}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Selection Summary */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Current Settings / વર્તમાન સેટિંગ્સ
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Explanation Style:
              </p>
              <p className="text-base font-semibold text-green-700">
                {
                  explanationStyles.find((s) => s.id === selectedStyle)
                    ?.titleGu
                }
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Explain Like I&apos;m 10:
              </p>
              <p
                className={cn(
                  "text-base font-semibold",
                  isExplainLike10 ? "text-orange-700" : "text-gray-500"
                )}
              >
                {isExplainLike10 ? "✓ Enabled" : "○ Disabled"}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
