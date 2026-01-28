"use client";

import { Card } from "@/components/ui/card";
import { useDashboardStore } from "@/store/dashboard-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function TeacherSettingsPage() {
  const { settings, updateSettings } = useDashboardStore();

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 font-gujarati mt-1">
          તમારી પસંદગીઓ સેટ કરો
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 font-gujarati">
          સામાન્ય સેટિંગ્સ
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Notifications</Label>
              <p className="text-sm text-gray-600">
                Receive updates about students
              </p>
            </div>
            <button
              onClick={() =>
                updateSettings({
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notificationsEnabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notificationsEnabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium font-gujarati">
                ગુજરાતી ઇન્ટરફેસ
              </Label>
              <p className="text-sm text-gray-600">
                Use Gujarati language for UI
              </p>
            </div>
            <button
              onClick={() =>
                updateSettings({
                  language: settings.language === "gu" ? "en" : "gu",
                })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.language === "gu" ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.language === "gu" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <Button variant="outline" className="w-full">
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
