"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

interface Alert {
  student: string;
  subject: string;
  status: "Ready" | "Needs Work" | "Critical";
  score: number;
  daysLeft: number;
  weakTopics: string[];
  recommendation: string;
}

export default function ExamAlertsPage() {
  const alerts: Alert[] = [
    {
      student: "રાજ પટેલ | Raj Patel",
      subject: "ગણિત | Mathematics",
      status: "Ready",
      score: 85,
      daysLeft: 15,
      weakTopics: [],
      recommendation: "સારી તૈયારી છે | Good preparation",
    },
    {
      student: "પ્રિયા શર્મા | Priya Sharma",
      subject: "વિજ્ઞાન | Science",
      status: "Needs Work",
      score: 62,
      daysLeft: 15,
      weakTopics: [
        "પ્રકાશસંશ્લેષણ | Photosynthesis",
        "કોષ વિભાજન | Cell Division",
      ],
      recommendation: "દરરોજ 1 કલાક પ્રેક્ટિસ | Practice 1 hour daily",
    },
    {
      student: "અર્જુન ઠાકર | Arjun Thakkar",
      subject: "ગણિત | Mathematics",
      status: "Critical",
      score: 45,
      daysLeft: 15,
      weakTopics: [
        "બીજગણિત | Algebra",
        "ભૂમિતિ | Geometry",
        "આંકડાશાસ્ત્ર | Statistics",
      ],
      recommendation:
        "તાત્કાલિક વિશેષ કોચિંગ જરૂરી | Urgent special coaching needed",
    },
    {
      student: "દિવ્યા મહેતા | Divya Mehta",
      subject: "અંગ્રેજી | English",
      status: "Ready",
      score: 78,
      daysLeft: 15,
      weakTopics: ["નિબંધ લેખન | Essay Writing"],
      recommendation: "નિબંધ પ્રેક્ટિસ કરો | Practice essays",
    },
    {
      student: "કૃષ પંડ્યા | Krish Pandya",
      subject: "સામાજિક | Social",
      status: "Needs Work",
      score: 58,
      daysLeft: 15,
      weakTopics: ["ભારતનો ઇતિહાસ | Indian History", "ભૂગોળ | Geography"],
      recommendation: "નકશા અને તારીખો યાદ કરો | Memorize maps and dates",
    },
  ];

  const statusConfig = {
    Ready: {
      color: "green",
      icon: CheckCircle,
      bgClass: "bg-green-50",
      borderClass: "border-green-300",
      textClass: "text-green-700",
    },
    "Needs Work": {
      color: "yellow",
      icon: AlertTriangle,
      bgClass: "bg-yellow-50",
      borderClass: "border-yellow-300",
      textClass: "text-yellow-700",
    },
    Critical: {
      color: "red",
      icon: XCircle,
      bgClass: "bg-red-50",
      borderClass: "border-red-300",
      textClass: "text-red-700",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              પરીક્ષા ચેતવણી | Exam Alerts
            </h1>
            <p className="text-gray-600 mt-2">
              પરીક્ષા તૈયારી ચેતવણી અને સૂચનો | Exam readiness alerts and
              suggestions
            </p>
          </div>
          <Bell className="w-12 h-12 text-red-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "તૈયાર | Ready",
              value: alerts.filter((a) => a.status === "Ready").length,
              icon: CheckCircle,
              color: "green",
            },
            {
              label: "કામ જરૂરી | Needs Work",
              value: alerts.filter((a) => a.status === "Needs Work").length,
              icon: AlertTriangle,
              color: "yellow",
            },
            {
              label: "ગંભીર | Critical",
              value: alerts.filter((a) => a.status === "Critical").length,
              icon: XCircle,
              color: "red",
            },
            {
              label: "દિવસ બાકી | Days Left",
              value: "15",
              icon: Clock,
              color: "orange",
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

        {/* Class Average Alert */}
        <Card className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="flex items-start gap-4">
            <Bell className="w-8 h-8 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                વર્ગ સરેરાશ | Class Average
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-red-100 text-sm">
                    વર્તમાન સરેરાશ | Current Average
                  </p>
                  <p className="text-3xl font-bold">66%</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm">લક્ષ્યાંક | Target</p>
                  <p className="text-3xl font-bold">75%</p>
                </div>
                <div>
                  <p className="text-red-100 text-sm">
                    સુધારણા જરૂરી | Improvement Needed
                  </p>
                  <p className="text-3xl font-bold">+9%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Student Alerts */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            વિદ્યાર્થી ચેતવણીઓ | Student Alerts
          </h2>
          {alerts.map((alert, index) => {
            const config = statusConfig[alert.status];
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
                        <h3 className="text-xl font-bold text-gray-800">
                          {alert.student}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bgClass} ${config.textClass} border ${config.borderClass} flex items-center gap-1`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{alert.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-800">
                        {alert.score}%
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1 justify-end mt-1">
                        <Clock className="w-4 h-4" />
                        {alert.daysLeft} દિવસ | days
                      </p>
                    </div>
                  </div>

                  {/* Weak Topics */}
                  {alert.weakTopics.length > 0 && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 mb-4">
                      <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5 text-amber-600" />
                        કમજોર વિષયો | Weak Topics:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {alert.weakTopics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700 border border-amber-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendation */}
                  <div
                    className={`p-4 rounded-lg border-2 ${config.bgClass} ${config.borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <TrendingUp
                        className={`w-5 h-5 ${config.textClass} mt-0.5`}
                      />
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">
                          ભલામણ | Recommendation:
                        </p>
                        <p className="text-gray-700">{alert.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                    >
                      વધુ જુઓ | View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      યોજના બનાવો | Create Plan
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Action Card */}
        <Card className="p-6 border-2 border-red-300">
          <h2 className="text-2xl font-bold mb-4">
            ભલામણ કરેલ ક્રિયાઓ | Recommended Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "કમજોર વિદ્યાર્થીઓ માટે વિશેષ કોચિંગ | Special coaching for weak students",
              "દરરોજ પ્રેક્ટિસ સેશન આયોજિત કરો | Organize daily practice sessions",
              "પેરેન્ટ-ટીચર મીટિંગ | Parent-teacher meeting",
              "મોક ટેસ્ટ લો | Conduct mock tests",
            ].map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-r from-red-50 to-orange-50 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-gray-700">{action}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
