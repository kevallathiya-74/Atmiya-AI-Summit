"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WifiOff, Check, Zap } from "lucide-react";
import { useState } from "react";

export default function LowBandwidthPage() {
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);

  const features = [
    { feature: "Reduced image quality", featureGu: "ઓછી છબી ગુણવત્તા", saving: "70% data" },
    { feature: "Text-first content", featureGu: "ટેક્સ્ટ-પ્રથમ સામગ્રી", saving: "80% data" },
    { feature: "Minimal animations", featureGu: "ન્યૂનતમ એનિમેશન", saving: "50% data" },
    { feature: "Compressed downloads", featureGu: "સંકુચિત ડાઉનલોડ્સ", saving: "60% data" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 md:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        <div><h1 className="text-3xl md:text-4xl font-bold text-gray-900">લો બેન્ડવિડ્થ મોડ</h1><p className="text-sm md:text-base text-gray-600 mt-2">Low Bandwidth Mode - Learn with minimal data usage</p></div>

        <Card className="p-8 bg-gradient-to-br from-orange-500 to-red-600 text-white"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-bold mb-2">Low Bandwidth Mode</h2><p className="opacity-90">{lowBandwidthMode ? "Active - Saving up to 75% data" : "Inactive - Standard quality"}</p></div><Button onClick={() => setLowBandwidthMode(!lowBandwidthMode)} size="lg" className="bg-white text-orange-600 hover:bg-gray-100">{lowBandwidthMode ? <><Check className="w-5 h-5 mr-2" />Turn Off</> : <><WifiOff className="w-5 h-5 mr-2" />Turn On</>}</Button></div></Card>

        <Card className="p-6"><h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-orange-600" />Features & Data Savings</h2><div className="space-y-3">{features.map((f, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"><div><p className="font-semibold text-gray-900">{f.featureGu}</p><p className="text-sm text-gray-600">{f.feature}</p></div><span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{f.saving}</span></motion.div>))}</div></Card>

        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50"><h3 className="text-lg font-semibold mb-3">Perfect For</h3><ul className="space-y-2 text-sm text-gray-700"><li>✓ Rural areas with slow internet</li><li>✓ Limited mobile data plans</li><li>✓ 2G/3G connections</li><li>✓ Saving data costs</li></ul></Card>
      </motion.div>
    </div>
  );
}
