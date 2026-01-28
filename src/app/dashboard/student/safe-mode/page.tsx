"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertTriangle, Lock } from "lucide-react";
import { useState } from "react";

export default function SafeModePage() {
  const [safeMode, setSafeMode] = useState(true);

  const safetyFeatures = [
    {
      feature: "Content Filtering",
      featureGu: "સામગ્રી ફિલ્ટરિંગ",
      description: "All inappropriate content blocked",
      enabled: true,
    },
    {
      feature: "AI Moderation",
      featureGu: "AI મોડરેશન",
      description: "Peer content monitored 24/7",
      enabled: true,
    },
    {
      feature: "Privacy Protection",
      featureGu: "ગોપનીયતા સુરક્ષા",
      description: "Personal data never shared",
      enabled: true,
    },
    {
      feature: "Safe Search",
      featureGu: "સુરક્ષિત શોધ",
      description: "Only educational results",
      enabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            સુરક્ષિત શીખવું
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Safe Learning Mode - Protected learning environment
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-green-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Safe Learning Mode</h2>
              <p className="opacity-90">
                {safeMode
                  ? "Active - You're protected"
                  : "Inactive - Standard mode"}
              </p>
            </div>
            <Button
              onClick={() => setSafeMode(!safeMode)}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
              disabled={safeMode}
            >
              {safeMode ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Active
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Turn On
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Safety Features
          </h2>
          <div className="space-y-3">
            {safetyFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 p-4 bg-green-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    {feature.featureGu}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    {feature.feature}
                  </p>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            For Parents & Teachers
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            Safe Learning Mode is always on and cannot be disabled by students.
            It ensures a completely safe educational environment.
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ No external links or ads</li>
            <li>✓ Age-appropriate content only</li>
            <li>✓ GSEB-aligned curriculum</li>
            <li>✓ Moderated peer interactions</li>
          </ul>
        </Card>

        <Card className="p-6 border-2 border-yellow-200 bg-yellow-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Report Safety Concerns
              </p>
              <p className="text-sm text-gray-700">
                If you see anything inappropriate, report it immediately. We
                take safety seriously.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
