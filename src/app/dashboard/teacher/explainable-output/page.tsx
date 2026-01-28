"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  GitBranch,
  Lightbulb,
  Target,
  TrendingUp,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface ExplainableOutput {
  output: string;
  reasoning: string[];
  dataUsed: string[];
  confidence: number;
  alternatives: string[];
}

export default function ExplainableOutputPage() {
  const outputs: ExplainableOutput[] = [
    {
      output:
        "રાજને બીજગણિતમાં વધુ પ્રેક્ટિસની જરૂર છે | Raj needs more practice in algebra",
      reasoning: [
        "છેલ્લા 3 ટેસ્ટમાં બીજગણિતના પ્રશ્નોમાં 45% સ્કોર | 45% score in algebra questions in last 3 tests",
        "વર્ગની સરેરાશ 72% છે | Class average is 72%",
        "વાર્ષિક પરીક્ષામાં બીજગણિત 30% વેઇટેજ ધરાવે છે | Algebra has 30% weightage in annual exam",
      ],
      dataUsed: [
        "રાજના છેલ્લા 5 ટેસ્ટના સ્કોર | Raj's last 5 test scores",
        "વર્ગ સરેરાશ | Class average",
        "સિલેબસ વેઇટેજ | Syllabus weightage",
      ],
      confidence: 87,
      alternatives: [
        "વન-ઓન-વન કોચિંગ સૂચવો | Suggest one-on-one coaching",
        "વધુ હોમવર્ક આપો | Assign more homework",
      ],
    },
    {
      output:
        "પ્રિયા માટે વાંચન ગતિ સુધારવાની જરૂર છે | Priya needs to improve reading speed",
      reasoning: [
        "વાંચન પ્રવૃત્તિમાં સરેરાશથી 40% ધીમી | 40% slower than average in reading activities",
        "સમજ સારી છે પણ સમય વધુ લાગે છે | Comprehension is good but takes more time",
        "છેલ્લા મહિનામાં કોઈ સુધારો નથી | No improvement in last month",
      ],
      dataUsed: [
        "વાંચન ગતિ મેટ્રિક્સ | Reading speed metrics",
        "સમજ ટેસ્ટ સ્કોર | Comprehension test scores",
        "સમય ટ્રેકિંગ ડેટા | Time tracking data",
      ],
      confidence: 82,
      alternatives: [
        "દરરોજ 15 મિનિટ વાંચન પ્રેક્ટિસ | Daily 15 minute reading practice",
        "ઓડિયોબુક સાથે અભ્યાસ | Study with audiobooks",
      ],
    },
    {
      output:
        "વર્ગ 10-A માં વિજ્ઞાનમાં વધુ પ્રેક્ટિકલ જરૂરી છે | Class 10-A needs more practical in science",
      reasoning: [
        "પ્રેક્ટિકલ પ્રશ્નોમાં સરેરાશ 58% સ્કોર | Average 58% score in practical questions",
        "થિયરીમાં 78% સ્કોર છે | Theory score is 78%",
        "છેલ્લા 2 મહિનામાં માત્ર 3 પ્રેક્ટિકલ | Only 3 practicals in last 2 months",
      ],
      dataUsed: [
        "પ્રેક્ટિકલ vs થિયરી સ્કોર | Practical vs theory scores",
        "પ્રેક્ટિકલ સેશન ફ્રીક્વન્સી | Practical session frequency",
        "સિલેબસ રિક્વાયરમેન્ટ | Syllabus requirement",
      ],
      confidence: 91,
      alternatives: [
        "સાપ્તાહિક પ્રેક્ટિકલ સેશન આયોજિત કરો | Organize weekly practical sessions",
        "વર્ચુઅલ લેબ વાપરો | Use virtual labs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              સમજાવી શકાય તેવું આઉટપુટ | Explainable Output
            </h1>
            <p className="text-gray-600 mt-2">
              AI નિર્ણય પ્રક્રિયા અને તર્ક સમજો | Understand AI decision-making
              process and reasoning
            </p>
          </div>
          <Brain className="w-12 h-12 text-teal-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "વિશ્લેષણ | Analyses",
              value: outputs.length,
              icon: Brain,
              color: "teal",
            },
            {
              label: "સરેરાશ આત્મવિશ્વાસ | Avg Confidence",
              value: `${Math.round(
                outputs.reduce((acc, o) => acc + o.confidence, 0) /
                  outputs.length
              )}%`,
              icon: TrendingUp,
              color: "cyan",
            },
            {
              label: "પારદર્શિતા | Transparency",
              value: "100%",
              icon: Eye,
              color: "blue",
            },
            {
              label: "કુલ સૂચન | Total Suggestions",
              value: "24",
              icon: Lightbulb,
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

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                પારદર્શક AI | Transparent AI
              </h2>
              <p className="text-teal-50">
                આ પેજ બતાવે છે કે AI કેવી રીતે નિર્ણય લે છે, કયા ડેટાનો ઉપયોગ
                કરે છે, અને વૈકલ્પિક સમાધાન શું છે.
              </p>
              <p className="text-teal-50 mt-2">
                This page shows how AI makes decisions, what data it uses, and
                what alternative solutions exist.
              </p>
            </div>
          </div>
        </Card>

        {/* Explainable Outputs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-teal-500" />
            AI નિર્ણય વિશ્લેષણ | AI Decision Analysis
          </h2>
          {outputs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-teal-200">
                {/* Output */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-teal-600" />
                    <h3 className="text-xl font-bold text-gray-800">
                      AI સૂચન | AI Recommendation
                    </h3>
                    <span className="ml-auto px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 border-2 border-teal-300">
                      {item.confidence}% આત્મવિશ્વાસ | confidence
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-5 rounded-lg border-2 border-teal-300">
                    <p className="text-lg font-semibold text-gray-800">
                      {item.output}
                    </p>
                  </div>
                </div>

                {/* Reasoning Process */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-cyan-600" />
                    <h4 className="font-bold text-gray-800">
                      તર્ક પ્રક્રિયા | Reasoning Process:
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {item.reasoning.map((reason, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 text-white font-bold text-sm">
                          {idx + 1}
                        </span>
                        <p className="text-gray-700 flex-1">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Used */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-gray-800">
                      વપરાયેલ ડેટા | Data Used:
                    </h4>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex flex-wrap gap-2">
                      {item.dataUsed.map((data, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-300 flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alternatives */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">
                      વૈકલ્પિક સમાધાન | Alternative Solutions:
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.alternatives.map((alt, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200"
                      >
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <p className="text-gray-700">{alt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5 pt-5 border-t-2 border-gray-200">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 py-6 text-lg">
                    <CheckCircle className="w-5 h-5 mr-2" />આ સૂચન અમલમાં મૂકો |
                    Implement This Recommendation
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Card */}
        <Card className="p-6 border-2 border-teal-300 bg-gradient-to-r from-teal-50 to-cyan-50">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-teal-600" />
            સમજાવી શકાય તેવા AI ના ફાયદા | Benefits of Explainable AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "પારદર્શિતા વધે છે | Increases transparency",
              "વિશ્વાસ વધે છે | Builds trust",
              "ભૂલો સમજી શકાય છે | Errors can be understood",
              "સુધારણા શક્ય બને છે | Improvements become possible",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border bg-white"
              >
                <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
