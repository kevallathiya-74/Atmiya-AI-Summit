"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  ThumbsUp,
  BookOpen,
  Users,
} from "lucide-react";

interface SkillTip {
  category: string;
  tip: string;
  impact: "High" | "Medium" | "Low";
  timeToImplement: string;
  benefit: string;
}

export default function SkillTipsPage() {
  const tips: SkillTip[] = [
    {
      category: "વર્ગ સંચાલન | Classroom Management",
      tip: "પ્રથમ 5 મિનિટમાં વર્ગનું ધ્યાન ખેંચો | Capture attention in first 5 minutes",
      impact: "High",
      timeToImplement: "તાત્કાલિક | Immediate",
      benefit:
        "વિદ્યાર્થી એન્ગેજમેન્ટ 40% વધે | Student engagement increases by 40%",
    },
    {
      category: "પૂછપરછ તકનીક | Questioning Technique",
      tip: "ખુલ્લા પ્રશ્નો પૂછો જે વિચાર પ્રેરે | Ask open-ended questions that provoke thinking",
      impact: "High",
      timeToImplement: "1 અઠવાડિયું | 1 week",
      benefit:
        "વિચારશક્તિ અને ભાગીદારી સુધરે | Critical thinking and participation improve",
    },
    {
      category: "સમય વ્યવસ્થાપન | Time Management",
      tip: "દરેક પાઠ માટે સમય બ્લોક્સ બનાવો | Create time blocks for each lesson",
      impact: "High",
      timeToImplement: "2 દિવસ | 2 days",
      benefit: "સિલેબસ કવરેજ 95%+ | Syllabus coverage 95%+",
    },
    {
      category: "ટેકનોલોજી ઉપયોગ | Technology Use",
      tip: "વિઝ્યુઅલ સાધનોનો ઉપયોગ કરો | Use visual aids and multimedia",
      impact: "Medium",
      timeToImplement: "1 અઠવાડિયું | 1 week",
      benefit: "સમજ 30% વધે | Understanding increases by 30%",
    },
    {
      category: "મૂલ્યાંકન | Assessment",
      tip: "ફોર્મેટિવ એસેસમેન્ટ વધુ વાર લો | Conduct formative assessments frequently",
      impact: "High",
      timeToImplement: "તાત્કાલિક | Immediate",
      benefit: "કમજોરી જલ્દી ઓળખાય | Weaknesses identified early",
    },
    {
      category: "વિદ્યાર્થી સંબંધ | Student Relationship",
      tip: "દરેક વિદ્યાર્થી સાથે અંગત જોડાણ બનાવો | Build personal connection with students",
      impact: "Medium",
      timeToImplement: "1 મહિનો | 1 month",
      benefit: "વર્ગ વાતાવરણ સુધરે | Classroom atmosphere improves",
    },
  ];

  const impactColors = {
    High: "bg-green-100 text-green-700 border-green-300",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Low: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              કૌશલ્ય ટીપ્સ | Skill Tips
            </h1>
            <p className="text-gray-600 mt-2">
              શિક્ષણ કૌશલ્ય સુધારવા માટે AI સૂચનો | AI suggestions for teaching
              skill improvement
            </p>
          </div>
          <Lightbulb className="w-12 h-12 text-amber-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ ટીપ્સ | Total Tips",
              value: tips.length,
              icon: Sparkles,
              color: "amber",
            },
            {
              label: "ઉચ્ચ પ્રભાવ | High Impact",
              value: tips.filter((t) => t.impact === "High").length,
              icon: TrendingUp,
              color: "orange",
            },
            {
              label: "વર્ગો | Categories",
              value: "6",
              icon: BookOpen,
              color: "yellow",
            },
            {
              label: "શિક્ષકો | Teachers Using",
              value: "342",
              icon: Users,
              color: "amber",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Insight Card */}
        <Card className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                આજની AI ઇનસાઇટ | Today's AI Insight
              </h2>
              <p className="text-amber-50 mb-4">
                તમારા શિક્ષણ પેટર્નના આધારે, વર્ગ સંચાલનમાં 20% સુધારણા શક્ય છે.
                નીચેની ટીપ્સ અજમાવો.
              </p>
              <p className="text-amber-50">
                Based on your teaching patterns, 20% improvement in classroom
                management is possible. Try tips below.
              </p>
            </div>
          </div>
        </Card>

        {/* Tips Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-500" />
            વ્યક્તિગત સૂચનો | Personalized Tips
          </h2>
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-700 border border-amber-300">
                        {tip.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                          impactColors[tip.impact]
                        }`}
                      >
                        {tip.impact} પ્રભાવ | Impact
                      </span>
                    </div>
                  </div>
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                </div>

                {/* Tip Content */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-lg border-2 border-amber-200 mb-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
                    <p className="text-lg font-medium text-gray-800">
                      {tip.tip}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <p className="font-semibold text-gray-800">
                        લાગુ કરવાનો સમય | Time to Implement
                      </p>
                    </div>
                    <p className="text-gray-700">{tip.timeToImplement}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <p className="font-semibold text-gray-800">
                        લાભ | Benefit
                      </p>
                    </div>
                    <p className="text-gray-700">{tip.benefit}</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    લાગુ કરવા ચિહ્નિત કરો | Mark as Implemented
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Card */}
        <Card className="p-6 border-2 border-amber-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-500" />
              તમારી પ્રગતિ | Your Progress
            </h2>
            <span className="px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              73% સુધારણા | Improvement
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "અમલમાં મૂકેલ | Implemented",
                value: "15/20",
                color: "green",
              },
              { label: "પ્રગતિમાં | In Progress", value: "3", color: "yellow" },
              { label: "આગળ આવનાર | Upcoming", value: "2", color: "blue" },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 bg-gradient-to-r from-${item.color}-50 to-${item.color}-100 border-${item.color}-300`}
              >
                <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                <p className="text-3xl font-bold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
