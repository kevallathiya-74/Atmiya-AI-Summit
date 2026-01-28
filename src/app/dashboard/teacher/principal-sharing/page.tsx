"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Users,
  Lock,
  Unlock,
  Eye,
  Download,
  Send,
  Shield,
} from "lucide-react";

interface SharedReport {
  reportName: string;
  sharedWith: string;
  accessLevel: "View" | "Download" | "Edit";
  sharedDate: string;
  status: "Active" | "Pending" | "Expired";
}

export default function PrincipalSharingPage() {
  const [shareEmail, setShareEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("view");

  const sharedReports: SharedReport[] = [
    {
      reportName: "વર્ગ 10-A પ્રગતિ રિપોર્ટ | Class 10-A Progress Report",
      sharedWith: "પ્રિન્સિપાલ શર્મા | Principal Sharma",
      accessLevel: "Download",
      sharedDate: "15 જાન્યુ 2025 | 15 Jan 2025",
      status: "Active",
    },
    {
      reportName: "મધ્યવાર્ષિક પરીક્ષા વિશ્લેષણ | Mid-term Exam Analysis",
      sharedWith: "વાઇસ પ્રિન્સિપાલ પટેલ | Vice Principal Patel",
      accessLevel: "View",
      sharedDate: "12 જાન્યુ 2025 | 12 Jan 2025",
      status: "Active",
    },
    {
      reportName: "વિદ્યાર્થી હાજરી સરેરાશ | Student Attendance Average",
      sharedWith: "એડમિન ઓફિસ | Admin Office",
      accessLevel: "Download",
      sharedDate: "10 જાન્યુ 2025 | 10 Jan 2025",
      status: "Active",
    },
    {
      reportName: "શિક્ષક કાર્યક્ષમતા | Teacher Efficiency",
      sharedWith: "પ્રિન્સિપાલ શર્મા | Principal Sharma",
      accessLevel: "View",
      sharedDate: "5 જાન્યુ 2025 | 5 Jan 2025",
      status: "Expired",
    },
  ];

  const statusConfig = {
    Active: {
      color: "green",
      bgClass: "bg-green-100",
      textClass: "text-green-700",
      borderClass: "border-green-300",
    },
    Pending: {
      color: "yellow",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-700",
      borderClass: "border-yellow-300",
    },
    Expired: {
      color: "red",
      bgClass: "bg-red-100",
      textClass: "text-red-700",
      borderClass: "border-red-300",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              પ્રિન્સિપાલ શેરિંગ | Principal Sharing
            </h1>
            <p className="text-gray-600 mt-2">
              એડમિન/પ્રિન્સિપાલ સાથે રિપોર્ટ શેર કરો | Share reports with
              admin/principal
            </p>
          </div>
          <Share2 className="w-12 h-12 text-indigo-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "શેર કરેલ | Shared",
              value: sharedReports.length,
              icon: Share2,
              color: "indigo",
            },
            {
              label: "સક્રિય | Active",
              value: sharedReports.filter((r) => r.status === "Active").length,
              icon: Eye,
              color: "purple",
            },
            {
              label: "સુરક્ષિત | Secure",
              value: "100%",
              icon: Shield,
              color: "pink",
            },
            {
              label: "મહિના | This Month",
              value: "12",
              icon: Users,
              color: "indigo",
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

        {/* Share New Report */}
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Send className="w-6 h-6" />
            નવી રિપોર્ટ શેર કરો | Share New Report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-indigo-100 mb-2 block">
                રિપોર્ટ | Report
              </label>
              <select className="w-full px-4 py-2 rounded-lg text-gray-800">
                <option>વર્ગ પ્રગતિ | Class Progress</option>
                <option>પરીક્ષા પરિણામ | Exam Results</option>
                <option>હાજરી | Attendance</option>
                <option>પ્રદર્શન | Performance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-indigo-100 mb-2 block">
                સાથે શેર કરો | Share With
              </label>
              <select className="w-full px-4 py-2 rounded-lg text-gray-800">
                <option>પ્રિન્સિપાલ | Principal</option>
                <option>વાઇસ પ્રિન્સિપાલ | Vice Principal</option>
                <option>એડમિન | Admin</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-indigo-100 mb-2 block">
                એક્સેસ લેવલ | Access Level
              </label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              >
                <option value="view">જોવું માત્ર | View Only</option>
                <option value="download">ડાઉનલોડ | Download</option>
                <option value="edit">સંપાદિત | Edit</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                <Send className="w-4 h-4 mr-2" />
                શેર કરો | Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Shared Reports */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            શેર કરેલ રિપોર્ટ્સ | Shared Reports
          </h2>
          {sharedReports.map((report, index) => (
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
                      <h3 className="text-xl font-bold text-gray-800">
                        {report.reportName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                          statusConfig[report.status].bgClass
                        } ${statusConfig[report.status].textClass} ${
                          statusConfig[report.status].borderClass
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {report.sharedWith}
                      </span>
                      <span>{report.sharedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Access Level */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {report.accessLevel === "View" && (
                        <Eye className="w-5 h-5 text-indigo-600" />
                      )}
                      {report.accessLevel === "Download" && (
                        <Download className="w-5 h-5 text-indigo-600" />
                      )}
                      {report.accessLevel === "Edit" && (
                        <Lock className="w-5 h-5 text-indigo-600" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-800">
                          એક્સેસ લેવલ | Access Level:
                        </p>
                        <p className="text-sm text-gray-600">
                          {report.accessLevel === "View" &&
                            "જોવું માત્ર | View Only"}
                          {report.accessLevel === "Download" &&
                            "જુઓ અને ડાઉનલોડ કરો | View & Download"}
                          {report.accessLevel === "Edit" &&
                            "સંપૂર્ણ એક્સેસ | Full Access"}
                        </p>
                      </div>
                    </div>
                    {report.status === "Active" ? (
                      <Lock className="w-5 h-5 text-green-600" />
                    ) : (
                      <Unlock className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {report.status === "Active" ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        એક્સેસ બદલો | Change Access
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        શેરિંગ બંધ કરો | Stop Sharing
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600"
                    >
                      ફરીથી શેર કરો | Re-share
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Info Card */}
        <Card className="p-6 border-2 border-indigo-300 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-indigo-600 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                સુરક્ષા વિશેષતાઓ | Security Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {[
                  "એન્ક્રિપ્ટેડ શેરિંગ | Encrypted sharing",
                  "એક્સેસ કંટ્રોલ | Access control",
                  "સમય મર્યાદા | Time limits",
                  "એક્ટિવિટી ટ્રેકિંગ | Activity tracking",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Lock className="w-4 h-4 text-indigo-600" />
                    <span>{feature}</span>
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
