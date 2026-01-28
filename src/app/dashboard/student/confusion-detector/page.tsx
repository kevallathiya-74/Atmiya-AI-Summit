"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { HelpCircle, Brain, TrendingDown, Lightbulb } from "lucide-react";

export default function ConfusionDetectorPage() {
  const confusionSignals = [
    {
      topic: "Integers - Division",
      topicGu: "પૂર્ણાંકો - ભાગાકાર",
      signal: "Multiple retries",
      confidence: 85,
    },
    {
      topic: "Algebra - Variables",
      topicGu: "બીજગણિત - ચલ",
      signal: "Long response time",
      confidence: 70,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            મૂંઝવણ શોધક
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Confusion Detector - AI spots when you're confused
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-4">
            <Brain className="w-12 h-12 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                AI Monitoring Active
              </h2>
              <p className="text-sm text-gray-600">
                We track patterns to detect confusion early and offer help
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            Detected Confusion Signals
          </h2>
          <div className="space-y-3">
            {confusionSignals.map((signal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {signal.topicGu}
                    </p>
                    <p className="text-sm text-gray-600">{signal.topic}</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                    {signal.confidence}% sure
                  </span>
                </div>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  {signal.signal}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            How It Works
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Tracks time spent on questions</li>
            <li>✓ Monitors retry patterns</li>
            <li>✓ Analyzes answer confidence</li>
            <li>✓ Suggests targeted help</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
