"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";

export default function AnonymousModePage() {
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            અનામી શીખવું
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Anonymous Learning - Learn without revealing identity
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Anonymous Mode</h2>
              <p className="opacity-90">
                {isAnonymous
                  ? "Active - Your identity is hidden"
                  : "Inactive - Using your profile"}
              </p>
            </div>
            <Button
              onClick={() => setIsAnonymous(!isAnonymous)}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              {isAnonymous ? (
                <>
                  <EyeOff className="w-5 h-5 mr-2" />
                  Turn Off
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 mr-2" />
                  Turn On
                </>
              )}
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              When Anonymous Mode is ON
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Your name is hidden</li>
              <li>✓ Profile picture not shown</li>
              <li>✓ Questions appear as "Anonymous"</li>
              <li>✓ Activity not linked to you</li>
            </ul>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              Your Privacy
            </h3>
            <p className="text-sm text-gray-700">
              All your learning data stays private. Anonymous mode adds an extra
              layer when interacting with peers.
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
