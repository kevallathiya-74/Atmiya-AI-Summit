"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Download,
  FileText,
  Table,
  BarChart3,
  FileSpreadsheet,
  CheckCircle,
  Calendar,
} from "lucide-react";

interface ExportData {
  type: string;
  title: string;
  format: string[];
  lastGenerated: string;
  recordCount: number;
}

export default function MISExportPage() {
  const [selectedFormat, setSelectedFormat] = useState("excel");

  const exportOptions: ExportData[] = [
    {
      type: "વિદ્યાર્થી ડેટા | Student Data",
      title: "વિદ્યાર્થીની સંપૂર્ણ માહિતી | Complete student information",
      format: ["Excel", "CSV", "PDF"],
      lastGenerated: "2 દિવસ પહેલાં | 2 days ago",
      recordCount: 450,
    },
    {
      type: "હાજરી રિપોર્ટ | Attendance Report",
      title: "માસિક હાજરી રિપોર્ટ | Monthly attendance report",
      format: ["Excel", "PDF"],
      lastGenerated: "આજે | Today",
      recordCount: 12500,
    },
    {
      type: "પરીક્ષા પરિણામ | Exam Results",
      title: "તમામ પરીક્ષાના પરિણામો | All exam results",
      format: ["Excel", "CSV", "PDF"],
      lastGenerated: "5 દિવસ પહેલાં | 5 days ago",
      recordCount: 2340,
    },
    {
      type: "પ્રગતિ રિપોર્ટ | Progress Report",
      title: "વિદ્યાર્થી પ્રગતિ રિપોર્ટ | Student progress report",
      format: ["PDF", "Word"],
      lastGenerated: "1 અઠવાડિયું પહેલાં | 1 week ago",
      recordCount: 450,
    },
    {
      type: "શિક્ષક પ્રદર્શન | Teacher Performance",
      title: "શિક્ષક પ્રદર્શન વિશ્લેષણ | Teacher performance analysis",
      format: ["Excel", "PDF"],
      lastGenerated: "3 દિવસ પહેલાં | 3 days ago",
      recordCount: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              MIS નિકાસ | MIS Export
            </h1>
            <p className="text-gray-600 mt-2">
              રિપોર્ટ્સ વિવિધ ફોર્મેટમાં નિકાસ કરો | Export reports in multiple
              formats
            </p>
          </div>
          <FileDown className="w-12 h-12 text-emerald-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "રિપોર્ટ પ્રકાર | Report Types",
              value: exportOptions.length,
              icon: FileText,
              color: "emerald",
            },
            {
              label: "કુલ રેકોર્ડ | Total Records",
              value: "15K+",
              icon: BarChart3,
              color: "teal",
            },
            {
              label: "મહિના નિકાસ | This Month",
              value: "234",
              icon: Download,
              color: "cyan",
            },
            {
              label: "ફોર્મેટ | Formats",
              value: "4",
              icon: FileSpreadsheet,
              color: "emerald",
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

        {/* Quick Export Card */}
        <Card className="p-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
          <h2 className="text-2xl font-bold mb-4">ઝડપી નિકાસ | Quick Export</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-emerald-100 mb-2 block">
                ફોર્મેટ | Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
                <option value="pdf">PDF (.pdf)</option>
                <option value="word">Word (.docx)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-100 mb-2 block">
                શરૂઆત તારીખ | Start Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-100 mb-2 block">
                અંતિમ તારીખ | End Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50">
                <Download className="w-4 h-4 mr-2" />
                નિકાસ કરો | Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-500" />
            ઉપલબ્ધ રિપોર્ટ્સ | Available Reports
          </h2>
          {exportOptions.map((option, index) => (
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
                      <FileText className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-xl font-bold text-gray-800">
                        {option.type}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">{option.title}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Table className="w-4 h-4" />
                        {option.recordCount.toLocaleString()} રેકોર્ડ | records
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        છેલ્લું: {option.lastGenerated} | Last:{" "}
                        {option.lastGenerated}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Format Options */}
                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-4 rounded-lg border border-emerald-200 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    ઉપલબ્ધ ફોર્મેટ | Available Formats:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.format.map((format, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {option.format.map((format, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="hover:bg-emerald-50"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      {format}
                    </Button>
                  ))}
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  >
                    સ્વનિર્ધારિત | Custom
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Schedule Export Card */}
        <Card className="p-6 border-2 border-emerald-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-500" />
            સ્વચાલિત નિકાસ સુનિશ્ચિત કરો | Schedule Automatic Export
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                આવર્તિ | Frequency
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300">
                <option>દૈનિક | Daily</option>
                <option>સાપ્તાહિક | Weekly</option>
                <option>માસિક | Monthly</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                રિપોર્ટ પ્રકાર | Report Type
              </label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300">
                {exportOptions.map((option, idx) => (
                  <option key={idx}>{option.type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                સુનિશ્ચિત કરો | Schedule
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-2">નોંધ | Note:</h3>
          <p className="text-gray-700">
            તમામ નિકાસ કરેલ ડેટા સુરક્ષિત છે અને ગોપનીયતા નીતિ અનુસાર છે | All
            exported data is secure and complies with privacy policy.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
