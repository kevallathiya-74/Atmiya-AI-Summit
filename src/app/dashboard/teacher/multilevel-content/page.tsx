"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Layers,
  Zap,
  TrendingUp,
  Users,
  Download,
  Target,
  Award,
  BookOpen,
} from "lucide-react";

interface LevelContent {
  level: string;
  description: string;
  content: string;
  difficulty: number;
  targetStudents: string;
}

export default function MultilevelContentPage() {
  const [topic, setTopic] = useState("બીજગણિત | Algebra");
  const [subject, setSubject] = useState("ગણિત | Mathematics");

  const levels: LevelContent[] = [
    {
      level: "મૂળભૂત | Basic",
      description: "નબળા વિદ્યાર્થીઓ માટે | For struggling students",
      content:
        "બીજગણિત માં અક્ષરો અને સંખ્યાઓનો ઉપયોગ થાય છે. જેમ કે x + 2 = 5 માં x = 3 છે. સરળ ઉદાહરણો સાથે પ્રેક્ટિસ કરો.\n\nIn algebra, we use letters and numbers. Like in x + 2 = 5, x = 3. Practice with simple examples.",
      difficulty: 30,
      targetStudents: "ધોરણ 8-9, નબળા વિદ્યાર્થીઓ | Std 8-9, Weak students",
    },
    {
      level: "મધ્યમ | Intermediate",
      description: "સરેરાશ વિદ્યાર્થીઓ માટે | For average students",
      content:
        "બીજગણિતમાં ચલો અને અચળાંકોનો ઉપયોગ કરી સમીકરણો ઉકેલવામાં આવે છે. 2x + 3 = 11 ઉકેલવા માટે પગલાંઓ: 1) 2x = 11-3, 2) 2x = 8, 3) x = 4\n\nAlgebra uses variables and constants to solve equations. Steps to solve 2x + 3 = 11: 1) 2x = 11-3, 2) 2x = 8, 3) x = 4",
      difficulty: 60,
      targetStudents:
        "ધોરણ 9-10, સરેરાશ વિદ્યાર્થીઓ | Std 9-10, Average students",
    },
    {
      level: "પ્રગતિશીલ | Advanced",
      description: "સારા વિદ્યાર્થીઓ માટે | For good students",
      content:
        "બીજગણિતમાં જટિલ સમીકરણો જેવાં કે દ્વિઘાત સમીકરણ ax² + bx + c = 0 ઉકેલવામાં આવે છે. ઉકેલ: x = [-b ± √(b²-4ac)] / 2a. વ્યવહારિક સમસ્યાઓમાં ઉપયોગ.\n\nAlgebra solves complex equations like quadratic equation ax² + bx + c = 0. Solution: x = [-b ± √(b²-4ac)] / 2a. Applications in real-world problems.",
      difficulty: 85,
      targetStudents: "ધોરણ 10-12, સારા વિદ્યાર્થીઓ | Std 10-12, Good students",
    },
    {
      level: "નિષ્ણાત | Expert",
      description: "ઉત્તમ વિદ્યાર્થીઓ માટે | For excellent students",
      content:
        "ઉચ્ચ બીજગણિતમાં બહુપદી વિભાજન, સારાંશ નિયમો, અને જટિલ સમીકરણ પ્રણાલીઓનો સમાવેશ થાય છે. ગણિતીય પ્રમાણ અને સિદ્ધાંતોનો ઉપયોગ કરી સમસ્યાઓ ઉકેલવી.\n\nAdvanced algebra includes polynomial division, remainder theorems, and complex equation systems. Use mathematical proofs and theorems to solve problems.",
      difficulty: 95,
      targetStudents:
        "ધોરણ 11-12, ઉત્તમ વિદ્યાર્થીઓ | Std 11-12, Excellent students",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
              બહુસ્તરીય સામગ્રી | Multilevel Content
            </h1>
            <p className="text-gray-600 mt-2">
              વિવિધ મુશ્કેલી સ્તર માટે સામગ્રી | Generate content for multiple
              difficulty levels
            </p>
          </div>
          <Layers className="w-12 h-12 text-rose-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ સ્તર | Total Levels",
              value: "4",
              icon: Layers,
              color: "rose",
            },
            {
              label: "વિષયો આવરી લીધા | Topics Covered",
              value: "156",
              icon: BookOpen,
              color: "pink",
            },
            {
              label: "વિદ્યાર્થીઓ લાભાન્વિત | Students Benefited",
              value: "2,345",
              icon: Users,
              color: "fuchsia",
            },
            {
              label: "ડાઉનલોડ | Downloads",
              value: "1,234",
              icon: Download,
              color: "purple",
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

        {/* Topic Selection */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-rose-500" />
            વિષય પસંદ કરો | Select Topic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                વિષય | Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="વિષય દાખલ કરો | Enter subject"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                વિષયવસ્તુ | Topic
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="વિષયવસ્તુ દાખલ કરો | Enter topic"
              />
            </div>
          </div>
          <Button className="w-full mt-4 bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600">
            <Zap className="w-4 h-4 mr-2" />
            બહુસ્તરીય સામગ્રી બનાવો | Generate Multilevel Content
          </Button>
        </Card>

        {/* Level Overview */}
        <Card className="p-6 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            સ્તર ઝલક | Level Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {levels.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 text-center"
              >
                <Layers className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold mb-1">{level.level}</h3>
                <div className="text-3xl font-bold mb-1">
                  {level.difficulty}%
                </div>
                <p className="text-xs text-rose-100">મુશ્કેલી | Difficulty</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Multilevel Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-rose-500" />
            બહુસ્તરીય સામગ્રી | Multilevel Content
          </h2>
          {levels.map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {level.level}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-300">
                        સ્તર {index + 1} | Level {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {level.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {level.targetStudents}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-rose-600">
                      {level.difficulty}%
                    </div>
                    <p className="text-xs text-gray-600">
                      મુશ્કેલી | Difficulty
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-all duration-500"
                    style={{ width: `${level.difficulty}%` }}
                  />
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-5 rounded-lg border border-rose-200 mb-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-rose-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        સામગ્રી | Content:
                      </h4>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {level.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    ડાઉનલોડ | Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    સંપાદિત કરો | Edit
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600"
                  >
                    પ્રેક્ટિસ ઉમેરો | Add Practice
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Usage Tips */}
        <Card className="p-6 border-2 border-rose-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-rose-500" />
            ઉપયોગ ટીપ્સ | Usage Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "નબળા વિદ્યાર્થીઓ સાથે મૂળભૂત સ્તરથી શરૂ કરો | Start with basic level for weak students",
              "પ્રગતિ મુજબ સ્તર વધારો | Increase level based on progress",
              "દરેક સ્તર માટે પ્રેક્ટિસ આપો | Provide practice for each level",
              "નિયમિત મૂલ્યાંકન કરો | Regular assessment",
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-rose-50 to-pink-50 flex items-start gap-3"
              >
                <TrendingUp className="w-5 h-5 text-rose-600 mt-0.5" />
                <p className="text-sm text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-600 hover:to-fuchsia-600">
            બધા સ્તર ડાઉનલોડ કરો | Download All Levels
          </Button>
          <Button variant="outline" className="flex-1">
            નવો વિષય ઉમેરો | Add New Topic
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
