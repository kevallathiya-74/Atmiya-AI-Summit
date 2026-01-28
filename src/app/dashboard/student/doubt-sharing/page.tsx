"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MessageCircle, ShieldCheck, Flag } from "lucide-react";

export default function DoubtSharingPage() {
  const doubts = [
    {
      id: 1,
      student: "Anonymous Student",
      doubt: "How to solve quadratic equations?",
      doubtGu: "દ્વિઘાત સમીકરણો કેવી રીતે ઉકેલવું?",
      replies: 3,
      time: "5 min ago",
    },
    {
      id: 2,
      student: "Anonymous",
      doubt: "Explain photosynthesis process",
      doubtGu: "પ્રકાશસંશ્લેષણ પ્રક્રિયા સમજાવો",
      replies: 5,
      time: "15 min ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            સુરક્ષિત શંકા શેરિંગ
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Safe Doubt Sharing - Ask and help peers anonymously
          </p>
        </div>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 text-green-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                100% Safe & Moderated
              </h2>
              <p className="text-sm text-gray-600">
                All content is AI-moderated for safety. No personal information
                is shared.
              </p>
            </div>
          </div>
        </Card>

        <Button className="w-full" size="lg">
          <MessageCircle className="w-5 h-5 mr-2" />
          Post Your Doubt Anonymously
        </Button>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {doubts.map((doubt, idx) => (
              <motion.div
                key={doubt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-2">
                        {doubt.student} • {doubt.time}
                      </p>
                      <p className="font-semibold text-gray-900 mb-1">
                        {doubt.doubtGu}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        {doubt.doubt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {doubt.replies} replies
                        </span>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}
