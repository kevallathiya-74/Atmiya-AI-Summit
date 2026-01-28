"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit3,
  Save,
  Download,
  Copy,
  RefreshCw,
  Check,
  FileText,
  Sparkles,
} from "lucide-react";

export default function EditableOutputPage() {
  const [content, setContent] = useState({
    question: "પાયથાગોરસ પ્રમેય સમજાવો | Explain Pythagoras theorem",
    answer:
      "પાયથાગોરસ પ્રમેય જણાવે છે કે કાટકોણ ત્રિકોણમાં, કર્ણની બાજુનો વર્ગ બાકીની બે બાજુઓના વર્ગના સરવાળા જેટલો હોય છે. સૂત્ર: a² + b² = c²\n\nMathematically, in a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides.\n\nFormula: a² + b² = c²\n\nExample: If sides are 3 and 4, hypotenuse = √(9+16) = √25 = 5",
    notes:
      "• મુખ્ય બિંદુઓ આવરી લેવા\n• ઉદાહરણો સાથે સમજાવવું\n• વિદ્યાર્થીઓને પ્રેક્ટિસ કરાવવી\n\n• Cover key points\n• Explain with examples\n• Give practice to students",
  });

  const [isEditing, setIsEditing] = useState({
    question: false,
    answer: false,
    notes: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const templates = [
    {
      name: "પ્રશ્ન-જવાબ | Q&A Format",
      icon: FileText,
      description: "પ્રશ્ન અને જવાબ ફોર્મેટ | Question and answer format",
    },
    {
      name: "નોંધો | Notes Format",
      icon: Edit3,
      description: "શિક્ષણ નોંધો ફોર્મેટ | Teaching notes format",
    },
    {
      name: "ટેસ્ટ | Test Format",
      icon: Check,
      description: "પરીક્ષા ફોર્મેટ | Examination format",
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
              સંપાદન યોગ્ય આઉટપુટ | Editable Output
            </h1>
            <p className="text-gray-600 mt-2">
              AI-જનરેટ કરેલ સામગ્રીને સંપાદિત કરો | Edit AI-generated content
            </p>
          </div>
          <Edit3 className="w-12 h-12 text-violet-500" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "સંપાદિત | Edited",
              value: "156",
              icon: Edit3,
              color: "violet",
            },
            {
              label: "સાચવેલ | Saved",
              value: "134",
              icon: Save,
              color: "purple",
            },
            {
              label: "ડાઉનલોડ | Downloaded",
              value: "89",
              icon: Download,
              color: "fuchsia",
            },
            {
              label: "કોપી કરેલ | Copied",
              value: "234",
              icon: Copy,
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

        {/* Templates */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" />
            ટેમ્પલેટ્સ | Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-violet-300">
                  <template.icon className="w-8 h-8 text-violet-500 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Editable Content */}
        <div className="space-y-4">
          {/* Question Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-500" />
                પ્રશ્ન | Question
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setIsEditing({ ...isEditing, question: !isEditing.question })
                }
              >
                {isEditing.question ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-1" />
                )}
                {isEditing.question ? "થઈ ગયું | Done" : "સંપાદિત કરો | Edit"}
              </Button>
            </div>
            {isEditing.question ? (
              <Textarea
                value={content.question}
                onChange={(e) =>
                  setContent({ ...content, question: e.target.value })
                }
                className="min-h-[80px] font-medium"
              />
            ) : (
              <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
                <p className="text-lg font-medium text-gray-800">
                  {content.question}
                </p>
              </div>
            )}
          </Card>

          {/* Answer Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-500" />
                જવાબ | Answer
              </h2>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(content.answer)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  કોપી | Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setIsEditing({ ...isEditing, answer: !isEditing.answer })
                  }
                >
                  {isEditing.answer ? (
                    <Check className="w-4 h-4 mr-1" />
                  ) : (
                    <Edit3 className="w-4 h-4 mr-1" />
                  )}
                  {isEditing.answer ? "થઈ ગયું | Done" : "સંપાદિત કરો | Edit"}
                </Button>
              </div>
            </div>
            {isEditing.answer ? (
              <Textarea
                value={content.answer}
                onChange={(e) =>
                  setContent({ ...content, answer: e.target.value })
                }
                className="min-h-[200px]"
              />
            ) : (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-lg border border-purple-200">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {content.answer}
                </p>
              </div>
            )}
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-fuchsia-500" />
                શિક્ષણ નોંધો | Teaching Notes
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setIsEditing({ ...isEditing, notes: !isEditing.notes })
                }
              >
                {isEditing.notes ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-1" />
                )}
                {isEditing.notes ? "થઈ ગયું | Done" : "સંપાદિત કરો | Edit"}
              </Button>
            </div>
            {isEditing.notes ? (
              <Textarea
                value={content.notes}
                onChange={(e) =>
                  setContent({ ...content, notes: e.target.value })
                }
                className="min-h-[150px]"
              />
            ) : (
              <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-lg border border-fuchsia-200">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {content.notes}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                સાચવ્યું! | Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                સાચવો | Save Changes
              </>
            )}
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-5 h-5 mr-2" />
            ડાઉનલોડ કરો | Download
          </Button>
          <Button variant="outline" className="flex-1">
            <RefreshCw className="w-5 h-5 mr-2" />
            ફરીથી બનાવો | Regenerate
          </Button>
        </div>

        {/* AI Enhancement Options */}
        <Card className="p-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            AI સુધારણા વિકલ્પો | AI Enhancement Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "લંબાવો | Expand",
              "સંક્ષિપ્ત કરો | Summarize",
              "સરળ બનાવો | Simplify",
              "ઉદાહરણો ઉમેરો | Add Examples",
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
