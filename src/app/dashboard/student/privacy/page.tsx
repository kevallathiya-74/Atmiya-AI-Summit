"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Shield, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PrivacyPage() {
  const [dataSharing, setDataSharing] = useState(false);

  const privacySettings = [
    {
      id: 1,
      setting: "Profile Visibility",
      settingGu: "પ્રોફાઇલ દૃશ્યતા",
      status: "Private",
      description: "Only you can see your profile",
    },
    {
      id: 2,
      setting: "Learning History",
      settingGu: "શીખવાનો ઇતિહાસ",
      status: "Private",
      description: "Your progress is visible only to you",
    },
    {
      id: 3,
      setting: "Peer Interactions",
      settingGu: "સાથીદાર ક્રિયાપ્રતિક્રિયા",
      status: "Anonymous",
      description: "Your identity is hidden in forums",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            ગોપનીયતા સેટિંગ્સ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Privacy Settings - Control your data and privacy
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Your Data is Protected
              </h2>
              <p className="text-sm text-gray-600">
                We never sell your data. All information is encrypted and
                secure.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            Privacy Settings
          </h2>
          <div className="space-y-4">
            {privacySettings.map((setting, idx) => (
              <motion.div
                key={setting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {setting.settingGu}
                    </p>
                    <p className="text-sm text-gray-600">{setting.setting}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                    {setting.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Data Sharing</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Share Anonymous Analytics
              </p>
              <p className="text-sm text-gray-600">
                Help improve the platform by sharing anonymized usage data
              </p>
            </div>
            <Button
              onClick={() => setDataSharing(!dataSharing)}
              variant={dataSharing ? "default" : "outline"}
            >
              {dataSharing ? (
                <Eye className="w-4 h-4 mr-2" />
              ) : (
                <EyeOff className="w-4 h-4 mr-2" />
              )}
              {dataSharing ? "Enabled" : "Disabled"}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            * No personal information is ever shared. Only anonymized, aggregate
            data.
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            Delete Your Data
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            You have the right to request deletion of all your personal data.
            This action is permanent and cannot be undone.
          </p>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Request Data Deletion
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3">What We Collect</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Learning progress and performance</li>
            <li>✓ Topics studied and time spent</li>
            <li>✓ Question attempts and scores</li>
            <li>✓ Device and browser information</li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            We DO NOT collect: Personal conversations, location data, contacts,
            photos/videos from your device.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
