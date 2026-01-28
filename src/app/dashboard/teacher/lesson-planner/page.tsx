"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Sparkles,
  Download,
  Save,
  Trash2,
  Clock,
} from "lucide-react";
import type { ClassLevel } from "@/types";

export default function LessonPlannerPage() {
  const { lessonPlans, addLessonPlan, removeLessonPlan } = useDashboardStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    classLevel: 10 as ClassLevel,
    subject: "",
    topic: "",
    duration: 45,
  });

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      addLessonPlan({
        ...formData,
        objectives: [
          "વિદ્યાર્થીઓ મૂળભૂત ખ્યાલો સમજશે",
          "વ્યવહારિક ઉપયોગ શીખશે",
          "વિષય અંગે વિચારણા કરી શકશે",
        ],
        activities: [
          "પરિચય અને ઉદાહરણો (10 મિનિટ)",
          "જૂથ પ્રવૃત્તિ (20 મિનિટ)",
          "પ્રશ્નોત્તરી અને ચર્ચા (15 મિનિટ)",
        ],
        resources: [
          "પાઠ્યપુસ્તક પ્રકરણ",
          "વ્હાઇટબોર્ડ અને માર્કર્સ",
          "પ્રોજેક્ટર (વૈકલ્પિક)",
        ],
        assessment: "મૌખિક પ્રશ્નો, લેખિત કસોટી, જૂથ પ્રવૃત્તિ મૂલ્યાંકન",
      });

      setIsGenerating(false);
      setFormData({
        title: "",
        classLevel: 10,
        subject: "",
        topic: "",
        duration: 45,
      });
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lesson Planner</h1>
          <p className="text-gray-600 font-gujarati mt-1">
            AI-સંચાલિત પાઠ યોજના જનરેટર
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">AI Powered</span>
        </div>
      </div>

      {/* Generator Form */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 font-gujarati">
          નવી પાઠ યોજના બનાવો
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              placeholder="e.g., Introduction to Algebra"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="class">Class Level</Label>
            <select
              id="class"
              value={formData.classLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  classLevel: parseInt(e.target.value) as ClassLevel,
                })
              }
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
                <option key={level} value={level}>
                  Class {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g., Mathematics, Science"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: parseInt(e.target.value) })
              }
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="topic">Topic Details</Label>
            <Textarea
              id="topic"
              placeholder="આ વિષય વિશે વિગતવાર માહિતી આપો..."
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              rows={4}
              className="mt-1 font-gujarati"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleGenerate}
            disabled={
              !formData.title ||
              !formData.subject ||
              !formData.topic ||
              isGenerating
            }
            className="flex-1 md:flex-initial"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Lesson Plan
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Saved Lesson Plans */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 font-gujarati">
          સાચવેલી પાઠ યોજનાઓ
        </h2>

        {lessonPlans.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-gujarati">
              હજુ સુધી કોઈ પાઠ યોજના બનાવેલ નથી
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Use the form above to create your first lesson plan
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessonPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {plan.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Class {plan.classLevel}</span>
                        <span>•</span>
                        <span>{plan.subject}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {plan.duration}min
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLessonPlan(plan.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700 font-gujarati mb-1">
                        ઉદ્દેશ્યો
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 font-gujarati">
                        {plan.objectives.slice(0, 2).map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 font-gujarati mb-1">
                        પ્રવૃત્તિઓ
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 font-gujarati">
                        {plan.activities.slice(0, 2).map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
