"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/admin/page-header";
import { Brain, Zap, Shield, Languages, Settings, Save } from "lucide-react";

export default function AIConfiguration() {
  const [config, setConfig] = useState({
    aiEnabled: true,
    gujaratiExplanation: true,
    englishExplanation: true,
    voiceTutor: false,
    instantExplain: true,
    confusionDetector: true,
    safetyMode: true,
    contentModeration: true,
    maxQueryPerDay: 100,
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <PageHeader
          title="AI Configuration"
          description="Configure AI features and behavior"
          action={
            <Button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          }
        />

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Core AI Features</h3>
              <p className="text-sm text-gray-500">
                Enable or disable main AI functionalities
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">AI System</p>
                <p className="text-sm text-gray-500">
                  Master toggle for all AI features
                </p>
              </div>
              <Switch
                checked={config.aiEnabled}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, aiEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Instant Explain</p>
                <p className="text-sm text-gray-500">
                  Real-time explanations for students
                </p>
              </div>
              <Switch
                checked={config.instantExplain}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, instantExplain: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Confusion Detector</p>
                <p className="text-sm text-gray-500">
                  Detect when students are confused
                </p>
              </div>
              <Switch
                checked={config.confusionDetector}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, confusionDetector: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Voice Tutor</p>
                <p className="text-sm text-gray-500">
                  Voice-based AI interactions
                </p>
              </div>
              <Switch
                checked={config.voiceTutor}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, voiceTutor: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Languages className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Language Support</h3>
              <p className="text-sm text-gray-500">
                Configure multi-language AI responses
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">
                  Gujarati Explanations
                </p>
                <p className="text-sm text-gray-500">
                  AI responses in Gujarati language
                </p>
              </div>
              <Switch
                checked={config.gujaratiExplanation}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, gujaratiExplanation: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">
                  English Explanations
                </p>
                <p className="text-sm text-gray-500">
                  AI responses in English language
                </p>
              </div>
              <Switch
                checked={config.englishExplanation}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, englishExplanation: checked })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Safety & Moderation
              </h3>
              <p className="text-sm text-gray-500">
                AI safety and content moderation settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Safety Mode</p>
                <p className="text-sm text-gray-500">
                  Filter inappropriate content
                </p>
              </div>
              <Switch
                checked={config.safetyMode}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, safetyMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Content Moderation</p>
                <p className="text-sm text-gray-500">
                  Auto-moderate user-generated content
                </p>
              </div>
              <Switch
                checked={config.contentModeration}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, contentModeration: checked })
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
