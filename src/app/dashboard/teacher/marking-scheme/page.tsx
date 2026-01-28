"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  Award,
  Target,
  FileText,
  Download,
  Edit,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

interface MarkingCriteria {
  step: string;
  marks: number;
  description: string;
  examples: string[];
}

interface Question {
  question: string;
  totalMarks: number;
  criteria: MarkingCriteria[];
}

export default function MarkingSchemePage() {
  const [selectedExam, setSelectedExam] = useState("unit-test-1");

  const questions: Question[] = [
    {
      question: "પાયથાગોરસ પ્રમેયને સાબિત કરો | Prove Pythagoras theorem",
      totalMarks: 5,
      criteria: [
        {
          step: "આકૃતિ | Diagram",
          marks: 1,
          description: "સ્વચ્છ અને લેબલ સહિત | Clear and labeled",
          examples: [
            "કાટકોણ ત્રિકોણ | Right triangle",
            "બધી બાજુઓ લેબલ | All sides labeled",
          ],
        },
        {
          step: "આપેલ અને સાબિતી કરવું | Given and To Prove",
          marks: 1,
          description: "સ્પષ્ટ વિધાન | Clear statements",
          examples: ["આપેલ: ABC કાટકોણ ત્રિકોણ | Given: ABC right triangle"],
        },
        {
          step: "રચના | Construction",
          marks: 1,
          description: "જરૂરી રચના | Required construction",
          examples: ["લંબ દોરવો | Draw perpendicular"],
        },
        {
          step: "સાબિતી પગલાંઓ | Proof Steps",
          marks: 1.5,
          description: "તાર્કિક પગલાંઓ | Logical steps",
          examples: [
            "સમાન ત્રિકોણ | Similar triangles",
            "વિસ્તાર સરખામણી | Area comparison",
          ],
        },
        {
          step: "નિષ્કર્ષ | Conclusion",
          marks: 0.5,
          description: "આખરી સમીકરણ | Final equation",
          examples: ["a² + b² = c²"],
        },
      ],
    },
    {
      question:
        "પ્રકાશસંશ્લેષણની પ્રક્રિયા સમજાવો | Explain the process of photosynthesis",
      totalMarks: 4,
      criteria: [
        {
          step: "વ્યાખ્યા | Definition",
          marks: 1,
          description: "સ્પષ્ટ વ્યાખ્યા | Clear definition",
          examples: [
            "છોડમાં ખોરાક બનાવવાની પ્રક્રિયા | Food making process in plants",
          ],
        },
        {
          step: "સમીકરણ | Equation",
          marks: 1,
          description: "રાસાયણિક સમીકરણ | Chemical equation",
          examples: ["6CO₂ + 6H₂O + પ્રકાશ → C₆H₁₂O₆ + 6O₂"],
        },
        {
          step: "પગલાંઓ | Steps",
          marks: 1.5,
          description: "વિગતવાર પ્રક્રિયા | Detailed process",
          examples: [
            "પ્રકાશ શોષણ | Light absorption",
            "CO₂ નિયત્રણ | CO₂ fixation",
          ],
        },
        {
          step: "મહત્વ | Importance",
          marks: 0.5,
          description: "મહત્વ જણાવો | State importance",
          examples: ["ઓક્સિજન છોડે છે | Releases oxygen"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              માર્કિંગ સ્કીમ | Marking Scheme
            </h1>
            <p className="text-gray-600 mt-2">
              પગલાવાર માર્કિંગ સ્કીમ બનાવો | Step-wise marking scheme
            </p>
          </div>
          <ClipboardCheck className="w-12 h-12 text-violet-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "કુલ પ્રશ્નો | Total Questions",
              value: questions.length,
              icon: FileText,
              color: "violet",
            },
            {
              label: "કુલ ગુણ | Total Marks",
              value: questions.reduce((acc, q) => acc + q.totalMarks, 0),
              icon: Award,
              color: "purple",
            },
            {
              label: "સ્કીમ બનાવી | Schemes Created",
              value: "189",
              icon: CheckCircle,
              color: "fuchsia",
            },
            {
              label: "સરેરાશ ગુણ | Avg Marks",
              value: "4.5",
              icon: Target,
              color: "pink",
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

        {/* Exam Selector */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">
            પરીક્ષા પસંદ કરો | Select Exam
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "unit-test-1", label: "યુનિટ ટેસ્ટ 1 | Unit Test 1" },
              { id: "unit-test-2", label: "યુનિટ ટેસ્ટ 2 | Unit Test 2" },
              { id: "mid-term", label: "અર્ધવાર્ષિક | Mid-term" },
              { id: "final", label: "વાર્ષિક | Final" },
            ].map((exam) => (
              <Button
                key={exam.id}
                variant={selectedExam === exam.id ? "default" : "outline"}
                onClick={() => setSelectedExam(exam.id)}
                className={
                  selectedExam === exam.id
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
                    : ""
                }
              >
                {exam.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Marking Schemes */}
        <div className="space-y-6">
          {questions.map((question, qIndex) => (
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIndex * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-700 font-bold text-lg">
                        Q{qIndex + 1}
                      </span>
                      <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {question.totalMarks} ગુણ | Marks
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      {question.question}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    સંપાદિત કરો | Edit
                  </Button>
                </div>

                {/* Marking Criteria */}
                <div className="space-y-3">
                  {question.criteria.map((criteria, cIndex) => (
                    <div
                      key={cIndex}
                      className="bg-gradient-to-r from-violet-50 to-fuchsia-50 p-5 rounded-lg border-2 border-violet-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500 text-white font-bold text-sm">
                            {cIndex + 1}
                          </span>
                          <div>
                            <p className="font-bold text-gray-800">
                              {criteria.step}
                            </p>
                            <p className="text-sm text-gray-600">
                              {criteria.description}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-violet-500 text-white">
                          {criteria.marks} ગુણ | marks
                        </span>
                      </div>

                      {/* Examples */}
                      <div className="ml-11 space-y-2">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          ઉદાહરણો | Examples:
                        </p>
                        {criteria.examples.map((example, eIndex) => (
                          <div key={eIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-violet-600 mt-0.5" />
                            <p className="text-sm text-gray-700">{example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 p-4 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-lg border-2 border-violet-300">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-lg">
                      કુલ | Total:
                    </span>
                    <span className="px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      {question.totalMarks} ગુણ | Marks
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 py-6 text-lg">
            <Download className="w-5 h-5 mr-2" />
            માર્કિંગ સ્કીમ ડાઉનલોડ કરો | Download Marking Scheme
          </Button>
          <Button variant="outline" className="flex-1 py-6 text-lg">
            <FileText className="w-5 h-5 mr-2" />
            PDF બનાવો | Generate PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
