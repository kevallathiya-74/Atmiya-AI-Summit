"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  Zap,
  BookOpen,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  PlayCircle,
} from "lucide-react";

interface QuickLesson {
  period: string;
  subject: string;
  topic: string;
  duration: number;
  activities: string[];
  materials: string[];
  assessment: string;
}

export default function SubstituteModePage() {
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [selectedSubject, setSelectedSubject] = useState("math");

  const quickLessons: QuickLesson[] = [
    {
      period: "પહેલો પીરિયડ | First Period",
      subject: "ગણિત | Mathematics",
      topic: "બીજગણિત પુનરાવર્તન | Algebra Revision",
      duration: 45,
      activities: [
        "5 મિનિટ: પરિચય અને ધ્યેય સમજાવવું | Introduction and objectives",
        "15 મિનિટ: બોર્ડ પર ઉદાહરણો | Examples on board",
        "15 મિનિટ: વિદ્યાર્થી પ્રેક્ટિસ | Student practice",
        "10 મિનિટ: Q&A અને નિષ્કર્ષ | Q&A and conclusion",
      ],
      materials: [
        "બોર્ડ અને ચોક | Board and chalk",
        "વર્કશીટ | Worksheet",
        "પાઠ્યપુસ્તક | Textbook",
      ],
      assessment: "5 પ્રશ્નોની ક્વિઝ | 5 question quiz",
    },
    {
      period: "બીજો પીરિયડ | Second Period",
      subject: "વિજ્ઞાન | Science",
      topic: "પ્રકાશસંશ્લેષણ | Photosynthesis",
      duration: 45,
      activities: [
        "5 મિનિટ: પરિચય અને પૂર્વજ્ઞાન | Introduction and prior knowledge",
        "10 મિનિટ: આકૃતિ સાથે સમજાવવું | Explain with diagram",
        "15 મિનિટ: વીડિયો બતાવવો | Show video",
        "10 મિનિટ: ચર્ચા | Discussion",
        "5 મિનિટ: નોંધ લેવી | Note-taking",
      ],
      materials: [
        "પ્રોજેક્ટર | Projector",
        "આકૃતિઓ | Diagrams",
        "વર્કશીટ | Worksheet",
      ],
      assessment: "મૌખિક પ્રશ્નો | Oral questions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              અવેજી મોડ | Substitute Mode
            </h1>
            <p className="text-gray-600 mt-2">
              અવેજી શિક્ષકો માટે ઝડપી પાઠ યોજના | Quick lesson plans for
              substitute teachers
            </p>
          </div>
          <Zap className="w-12 h-12 text-lime-500" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "ઝડપી યોજનાઓ | Quick Plans",
              value: "24",
              icon: FileText,
              color: "lime",
            },
            {
              label: "સરેરાશ સમય | Avg Time",
              value: "45m",
              icon: Clock,
              color: "green",
            },
            {
              label: "સફળતા દર | Success Rate",
              value: "92%",
              icon: CheckCircle,
              color: "emerald",
            },
            {
              label: "ઉપયોગ | Usage",
              value: "156",
              icon: PlayCircle,
              color: "teal",
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

        {/* Emergency Lesson Generator */}
        <Card className="p-6 bg-gradient-to-r from-lime-500 to-emerald-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            કટોકટી પાઠ જનરેટર | Emergency Lesson Generator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-lime-100 mb-2 block">
                વર્ગ | Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              >
                <option value="8-A">8-A</option>
                <option value="9-A">9-A</option>
                <option value="10-A">10-A</option>
                <option value="11-A">11-A</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-lime-100 mb-2 block">
                વિષય | Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              >
                <option value="math">ગણિત | Mathematics</option>
                <option value="science">વિજ્ઞાન | Science</option>
                <option value="english">અંગ્રેજી | English</option>
                <option value="social">સામાજિક | Social</option>
              </select>
            </div>
          </div>
          <Button className="w-full bg-white text-lime-600 hover:bg-lime-50">
            <Zap className="w-4 h-4 mr-2" />
            તાત્કાલિક પાઠ યોજના બનાવો | Generate Instant Lesson Plan
          </Button>
        </Card>

        {/* Ready-to-Use Lesson Plans */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-lime-500" />
            તૈયાર પાઠ યોજનાઓ | Ready-to-Use Lesson Plans
          </h2>
          {quickLessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {lesson.period}
                      </h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-lime-100 text-lime-700 border border-lime-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration} મિનિટ | min
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {lesson.subject}
                    </p>
                    <p className="font-semibold text-gray-800">
                      {lesson.topic}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600"
                  >
                    <PlayCircle className="w-4 h-4 mr-1" />
                    શરૂ કરો | Start
                  </Button>
                </div>

                {/* Activities Timeline */}
                <div className="bg-gradient-to-r from-lime-50 to-emerald-50 p-5 rounded-lg border border-lime-200 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-lime-600" />
                    પ્રવૃત્તિઓ | Activities:
                  </h4>
                  <div className="space-y-2">
                    {lesson.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-lime-500 mt-2"></div>
                        <p className="text-sm text-gray-700 flex-1">
                          {activity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Materials */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      સામગ્રી | Materials:
                    </h4>
                    <ul className="space-y-1">
                      {lesson.materials.map((material, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-center gap-2"
                        >
                          <span className="text-blue-600">•</span>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Assessment */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      મૂલ્યાંકન | Assessment:
                    </h4>
                    <p className="text-sm text-gray-700">{lesson.assessment}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    ડાઉનલોડ | Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    પ્રિન્ટ | Print
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Emergency Tips */}
        <Card className="p-6 border-2 border-lime-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-lime-500" />
            અવેજી શિક્ષક ટીપ્સ | Substitute Teacher Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "સમય પર પહોંચો અને તૈયાર રહો | Arrive on time and be prepared",
              "વર્ગ નિયમો જાળવી રાખો | Maintain classroom rules",
              "નિયમિત શિક્ષક માટે નોંધ છોડો | Leave notes for regular teacher",
              "વિદ્યાર્થીઓને સક્રિય રાખો | Keep students engaged",
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-lime-50 to-emerald-50 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-lime-600 mt-0.5" />
                <p className="text-sm text-gray-700">{tip}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
