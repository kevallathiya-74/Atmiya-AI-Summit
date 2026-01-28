"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  FileCheck,
  RefreshCw,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface HallucinationCheck {
  content: string;
  verificati: string;
  status: "Verified" | "Suspicious" | "False";
  confidence: number;
  sources: string[];
  suggestion: string;
}

export default function HallucinationCheckPage() {
  const checks: HallucinationCheck[] = [
    {
      content:
        "પાયથાગોરસ પ્રમેય a² + b² = c² | Pythagoras theorem a² + b² = c²",
      verificati: "ગણિત સિદ્ધાંત | Mathematical theorem",
      status: "Verified",
      confidence: 98,
      sources: ["NCERT પાઠ્યપુસ્તક | NCERT textbook", "વિકિપીડિયા | Wikipedia"],
      suggestion: "સાચી માહિતી છે | Information is correct",
    },
    {
      content: "ભારતમાં 29 રાજ્યો છે | India has 29 states",
      verificati: "ભૌગોલિક માહિતી | Geographic information",
      status: "False",
      confidence: 95,
      sources: ["સત્તાવાર સરકારી વેબસાઇટ | Official government website"],
      suggestion:
        "ભારતમાં 28 રાજ્યો અને 8 કેન્દ્રશાસિત પ્રદેશો છે | India has 28 states and 8 union territories",
    },
    {
      content: "પ્રકાશનો વેગ 3 x 10⁸ m/s છે | Speed of light is 3 x 10⁸ m/s",
      verificati: "ભૌતિક શાસ્ત્ર તથ્ય | Physics fact",
      status: "Verified",
      confidence: 99,
      sources: ["વૈજ્ઞાનિક સંદર્ભ | Scientific reference", "NCERT"],
      suggestion: "સાચી માહિતી છે | Information is correct",
    },
    {
      content:
        "મહાત્મા ગાંધીનો જન્મ 1869માં થયો | Mahatma Gandhi was born in 1869",
      verificati: "ઐતિહાસિક તથ્ય | Historical fact",
      status: "Suspicious",
      confidence: 65,
      sources: ["વિવિધ સ્રોતો | Multiple sources"],
      suggestion:
        "સાચી તારીખ 2 ઓક્ટોબર 1869 છે | Correct date is 2 October 1869",
    },
    {
      content:
        "પાણીનું રાસાયણિક સૂત્ર H₂O છે | Chemical formula of water is H₂O",
      verificati: "રસાયણશાસ્ત્ર | Chemistry",
      status: "Verified",
      confidence: 100,
      sources: ["NCERT", "વિજ્ઞાન પાઠ્યપુસ્તક | Science textbook"],
      suggestion: "સાચી માહિતી છે | Information is correct",
    },
  ];

  const statusConfig = {
    Verified: {
      icon: CheckCircle,
      color: "green",
      bgClass: "bg-green-50",
      borderClass: "border-green-300",
      textClass: "text-green-700",
    },
    Suspicious: {
      icon: AlertTriangle,
      color: "yellow",
      bgClass: "bg-yellow-50",
      borderClass: "border-yellow-300",
      textClass: "text-yellow-700",
    },
    False: {
      icon: XCircle,
      color: "red",
      bgClass: "bg-red-50",
      borderClass: "border-red-300",
      textClass: "text-red-700",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-stone-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-zinc-600 bg-clip-text text-transparent">
              હેલ્યુસિનેશન ચેક | Hallucination Check
            </h1>
            <p className="text-gray-600 mt-2">
              AI આઉટપુટની ચોકસાઈ ચકાસો | Verify AI output accuracy
            </p>
          </div>
          <Shield className="w-12 h-12 text-slate-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "ચકાસાયેલ | Verified",
              value: checks.filter((c) => c.status === "Verified").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "શંકાસ્પદ | Suspicious",
              value: checks.filter((c) => c.status === "Suspicious").length,
              icon: AlertTriangle,
              color: "yellow",
            },
            {
              label: "ખોટું | False",
              value: checks.filter((c) => c.status === "False").length,
              icon: XCircle,
              color: "red",
            },
            {
              label: "સરેરાશ આત્મવિશ્વાસ | Avg Confidence",
              value: `${Math.round(
                checks.reduce((acc, c) => acc + c.confidence, 0) / checks.length
              )}%`,
              icon: TrendingUp,
              color: "slate",
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

        {/* Quick Check Card */}
        <Card className="p-6 bg-gradient-to-r from-slate-500 to-zinc-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FileCheck className="w-6 h-6" />
            તાત્કાલિક ચકાસણી | Quick Check
          </h2>
          <div className="space-y-3">
            <textarea
              className="w-full px-4 py-3 rounded-lg text-gray-800 min-h-[100px]"
              placeholder="ચકાસવા માટે AI આઉટપુટ અહીં પેસ્ટ કરો | Paste AI output here to verify..."
            />
            <Button className="w-full bg-white text-slate-600 hover:bg-slate-50">
              <RefreshCw className="w-4 h-4 mr-2" />
              હવે ચકાસો | Verify Now
            </Button>
          </div>
        </Card>

        {/* Verification Results */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-slate-500" />
            ચકાસણી પરિણામો | Verification Results
          </h2>
          {checks.map((check, index) => {
            const config = statusConfig[check.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 hover:shadow-lg transition-shadow border-2 ${config.borderClass}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border ${config.bgClass} ${config.textClass} ${config.borderClass} flex items-center gap-2`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {check.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                          {check.confidence}% આત્મવિશ્વાસ | confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {check.verificati}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-gradient-to-r from-slate-50 to-zinc-50 p-4 rounded-lg border border-slate-200 mb-4">
                    <p className="font-medium text-gray-800">{check.content}</p>
                  </div>

                  {/* Sources */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 mb-4">
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      સ્રોતો | Sources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {check.sources.map((source, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 border border-blue-300"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Suggestion */}
                  <div
                    className={`p-4 rounded-lg border-2 ${config.bgClass} ${config.borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <TrendingUp
                        className={`w-5 h-5 ${config.textClass} mt-0.5`}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">
                          સૂચન | Suggestion:
                        </p>
                        <p className="text-gray-700">{check.suggestion}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="p-6 border-2 border-slate-300 bg-gradient-to-r from-slate-50 to-zinc-50">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-slate-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                હેલ્યુસિનેશન શું છે? | What is Hallucination?
              </h2>
              <p className="text-gray-700 mb-3">
                AI હેલ્યુસિનેશન એટલે AI દ્વારા ખોટી અથવા ભ્રામક માહિતી પૂરી
                પાડવી જે વાસ્તવિકતા પર આધારિત નથી.
              </p>
              <p className="text-gray-700">
                AI hallucination means providing false or misleading information
                by AI that is not based on reality.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "સ્વતંત્ર સ્રોતોથી ચકાસો | Verify with independent sources",
                  "એક કરતાં વધુ AI ટૂલ્સ વાપરો | Use multiple AI tools",
                  "તથ્યો માન્ય સ્રોતોથી ચકાસો | Cross-check facts with valid sources",
                  "શંકા હોય તો માનવ નિષ્ણાત પૂછો | Ask human expert when in doubt",
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 text-slate-600" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
