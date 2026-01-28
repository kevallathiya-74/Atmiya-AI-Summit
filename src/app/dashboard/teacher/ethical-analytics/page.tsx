"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
} from "lucide-react";

interface PrivacyMetric {
  metric: string;
  status: "Compliant" | "Warning" | "Action Needed";
  description: string;
  details: string;
}

interface DataCategory {
  category: string;
  dataCollected: string[];
  usage: string;
  retention: string;
  sharing: "None" | "Anonymized" | "Aggregated";
}

export default function EthicalAnalyticsPage() {
  const privacyMetrics: PrivacyMetric[] = [
    {
      metric: "ડેટા એન્ક્રિપ્શન | Data Encryption",
      status: "Compliant",
      description:
        "તમામ ડેટા AES-256 એન્ક્રિપ્શન સાથે સુરક્ષિત છે | All data secured with AES-256 encryption",
      details: "99.9% સુરક્ષા સ્કોર | 99.9% security score",
    },
    {
      metric: "સંમતિ વ્યવસ્થા | Consent Management",
      status: "Compliant",
      description:
        "તમામ વિદ્યાર્થીઓએ ડેટા સંગ્રહ માટે સંમતિ આપી છે | All students have given consent for data collection",
      details: "100% સંમતિ પ્રાપ્ત | 100% consent obtained",
    },
    {
      metric: "ડેટા ન્યૂનીકરણ | Data Minimization",
      status: "Warning",
      description:
        "કેટલાક અનાવશ્યક ડેટા સંગ્રહિત છે | Some unnecessary data is being stored",
      details: "15% ડેટા ઘટાડી શકાય | 15% data can be reduced",
    },
    {
      metric: "એક્સેસ કંટ્રોલ | Access Control",
      status: "Compliant",
      description:
        "ફક્ત અધિકૃત શિક્ષકોને જ એક્સેસ છે | Only authorized teachers have access",
      details: "રોલ-બેઝ્ડ એક્સેસ સક્રિય | Role-based access active",
    },
    {
      metric: "ડેટા રીટેન્શન | Data Retention",
      status: "Action Needed",
      description:
        "જૂના ડેટાને હટાવવાની જરૂર છે | Old data needs to be removed",
      details: "2 વર્ષથી જુનો ડેટા હટાવો | Remove data older than 2 years",
    },
  ];

  const dataCategories: DataCategory[] = [
    {
      category: "વિદ્યાર્થી માહિતી | Student Information",
      dataCollected: ["નામ | Name", "રોલ નંબર | Roll number", "વર્ગ | Class"],
      usage: "શૈક્ષણિક ટ્રેકિંગ | Academic tracking",
      retention: "વિદ્યાર્થી સક્રિય હોય ત્યાં સુધી | Until student is active",
      sharing: "None",
    },
    {
      category: "શૈક્ષણિક પ્રદર્શન | Academic Performance",
      dataCollected: [
        "ટેસ્ટ સ્કોર | Test scores",
        "હાજરી | Attendance",
        "સ્વભાવ | Behavior",
      ],
      usage: "પ્રગતિ વિશ્લેષણ | Progress analysis",
      retention: "5 વર્ષ | 5 years",
      sharing: "Aggregated",
    },
    {
      category: "AI ઇન્ટરેક્શન | AI Interaction",
      dataCollected: ["પ્રશ્નો | Questions", "પ્રતિભાવ સમય | Response time"],
      usage: "AI સુધારણા | AI improvement",
      retention: "1 વર્ષ | 1 year",
      sharing: "Anonymized",
    },
  ];

  const statusConfig = {
    Compliant: {
      icon: CheckCircle,
      color: "green",
      bgClass: "bg-green-50",
      borderClass: "border-green-300",
      textClass: "text-green-700",
    },
    Warning: {
      icon: AlertTriangle,
      color: "yellow",
      bgClass: "bg-yellow-50",
      borderClass: "border-yellow-300",
      textClass: "text-yellow-700",
    },
    "Action Needed": {
      icon: AlertTriangle,
      color: "red",
      bgClass: "bg-red-50",
      borderClass: "border-red-300",
      textClass: "text-red-700",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              નૈતિક વિશ્લેષણ | Ethical Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              ગોપનીયતા અનુપાલન વિશ્લેષણ | Privacy-compliant analytics
            </p>
          </div>
          <Shield className="w-12 h-12 text-green-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "અનુપાલન સ્કોર | Compliance Score",
              value: "87%",
              icon: Shield,
              color: "green",
            },
            {
              label: "સુરક્ષિત વિદ્યાર્થીઓ | Protected Students",
              value: "450",
              icon: Users,
              color: "emerald",
            },
            {
              label: "એન્ક્રિપ્ટેડ ડેટા | Encrypted Data",
              value: "100%",
              icon: Lock,
              color: "teal",
            },
            {
              label: "ઓડિટ | Audits",
              value: "12",
              icon: BarChart3,
              color: "green",
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

        {/* Privacy Overview */}
        <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                ગોપનીયતા પ્રથમ | Privacy First
              </h2>
              <p className="text-green-50 mb-2">
                આ સિસ્ટમ વિદ્યાર્થી ગોપનીયતા અને ડેટા સુરક્ષાને સર્વોચ્ચ
                પ્રાથમિકતા આપે છે.
              </p>
              <p className="text-green-50">
                This system gives highest priority to student privacy and data
                security.
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy Metrics */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-500" />
            ગોપનીયતા મેટ્રિક્સ | Privacy Metrics
          </h2>
          {privacyMetrics.map((metric, index) => {
            const config = statusConfig[metric.status];
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
                          {metric.metric}
                        </h3>
                        <span
                          className={`px-3 py-2 rounded-full text-sm font-semibold border ${config.bgClass} ${config.textClass} ${config.borderClass} flex items-center gap-2`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {metric.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg border ${config.bgClass} ${config.borderClass} mb-3`}
                  >
                    <p className="text-gray-700">{metric.description}</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-gray-800 mb-1">
                      વિગતો | Details:
                    </p>
                    <p className="text-gray-700">{metric.details}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Data Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="w-6 h-6 text-green-500" />
            ડેટા વર્ગીકરણ | Data Categories
          </h2>
          {dataCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {category.category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Data Collected */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-green-600" />
                      સંગ્રહિત ડેટા | Data Collected:
                    </p>
                    <ul className="space-y-1">
                      {category.dataCollected.map((data, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Usage */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-gray-800 mb-2">
                      ઉપયોગ | Usage:
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      {category.usage}
                    </p>
                    <p className="font-semibold text-gray-800 mb-1">
                      રીટેન્શન | Retention:
                    </p>
                    <p className="text-sm text-gray-700 mb-3">
                      {category.retention}
                    </p>
                    <p className="font-semibold text-gray-800 mb-1">
                      શેરિંગ | Sharing:
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        category.sharing === "None"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : category.sharing === "Anonymized"
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {category.sharing === "None" && (
                        <EyeOff className="w-3 h-3" />
                      )}
                      {category.sharing}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 py-6 text-lg">
            <Shield className="w-5 h-5 mr-2" />
            સંપૂર્ણ ગોપનીયતા રિપોર્ટ | Full Privacy Report
          </Button>
          <Button variant="outline" className="py-6 text-lg">
            <BarChart3 className="w-5 h-5 mr-2" />
            ડેટા ઓડિટ | Data Audit
          </Button>
        </div>

        {/* Compliance Info */}
        <Card className="p-6 border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            અનુપાલન ધોરણો | Compliance Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "GDPR સુસંગત | GDPR compliant",
              "ISO 27001 પ્રમાણિત | ISO 27001 certified",
              "ભારતીય IT અધિનિયમ 2000 | Indian IT Act 2000",
            ].map((standard, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg border bg-white"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">{standard}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
