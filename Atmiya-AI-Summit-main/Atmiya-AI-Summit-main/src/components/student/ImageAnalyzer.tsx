"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  FileText,
  BookOpen,
  PenTool,
  Sparkles,
  Loader2,
  Check,
  X,
  Volume2,
  Copy,
  Download,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageAnalyzerProps {
  onResult?: (result: AnalysisResult) => void;
  defaultType?: AnalysisType;
  language?: "gu" | "en";
}

type AnalysisType = "ocr" | "homework" | "diagram" | "textbook" | "handwriting" | "general";

interface AnalysisResultData {
  text?: string;
  raw?: boolean;
  score?: number;
  isCorrect?: boolean;
  feedback?: string;
  feedbackGu?: string;
  corrections?: Array<{
    original: string;
    corrected: string;
    explanation: string;
    explanationGu?: string;
  }>;
  description?: string;
  descriptionGu?: string;
  labels?: Array<{
    name: string;
    nameGu?: string;
  }>;
  concepts?: string[];
  conceptsGu?: string[];
  keyPoints?: string[];
  keyPointsGu?: string[];
}

interface AnalysisResult {
  type: AnalysisType;
  result: AnalysisResultData;
  language: string;
}

const ANALYSIS_TYPES: { 
  value: AnalysisType; 
  label: string; 
  labelGu: string; 
  icon: typeof Camera; 
  description: string;
  descriptionGu: string;
}[] = [
  { 
    value: "homework", 
    label: "Check Homework", 
    labelGu: "ગૃહકાર્ય તપાસો",
    icon: FileText,
    description: "Upload homework for instant checking",
    descriptionGu: "તાત્કાલિક તપાસ માટે ગૃહકાર્ય અપલોડ કરો"
  },
  { 
    value: "textbook", 
    label: "Scan Textbook", 
    labelGu: "પાઠ્યપુસ્તક સ્કેન",
    icon: BookOpen,
    description: "Extract text from textbook pages",
    descriptionGu: "પાઠ્યપુસ્તકના પૃષ્ઠોમાંથી ટેક્સ્ટ કાઢો"
  },
  { 
    value: "diagram", 
    label: "Analyze Diagram", 
    labelGu: "આકૃતિ વિશ્લેષણ",
    icon: ImageIcon,
    description: "Understand scientific diagrams",
    descriptionGu: "વૈજ્ઞાનિક આકૃતિઓ સમજો"
  },
  { 
    value: "handwriting", 
    label: "Read Handwriting", 
    labelGu: "હસ્તલેખન વાંચો",
    icon: PenTool,
    description: "Convert handwritten notes to text",
    descriptionGu: "હસ્તલિખિત નોટ્સને ટેક્સ્ટમાં રૂપાંતરિત કરો"
  },
  { 
    value: "ocr", 
    label: "Extract Text (OCR)", 
    labelGu: "ટેક્સ્ટ કાઢો (OCR)",
    icon: FileText,
    description: "Extract all text from any image",
    descriptionGu: "કોઈપણ છબીમાંથી તમામ ટેક્સ્ટ કાઢો"
  },
  { 
    value: "general", 
    label: "General Analysis", 
    labelGu: "સામાન્ય વિશ્લેષણ",
    icon: Sparkles,
    description: "AI analysis of any educational image",
    descriptionGu: "કોઈપણ શૈક્ષણિક છબીનું AI વિશ્લેષણ"
  },
];

export function ImageAnalyzer({ onResult, defaultType = "homework", language = "gu" }: ImageAnalyzerProps) {
  const [selectedType, setSelectedType] = useState<AnalysisType>(defaultType);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const isGujarati = language === "gu";
  
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  }, []);
  
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("type", selectedType);
      formData.append("language", language);
      
      const response = await fetch("/api/vision", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Analysis failed");
      }
      
      const data = await response.json();
      setResult(data);
      onResult?.(data);
      
    } catch (err) {
      setError(isGujarati ? "વિશ્લેષણ નિષ્ફળ. ફરી પ્રયાસ કરો." : "Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };
  
  const handleCopyResult = () => {
    if (result) {
      const text = typeof result.result === "string" 
        ? result.result 
        : JSON.stringify(result.result, null, 2);
      navigator.clipboard.writeText(text);
    }
  };
  
  const handleSpeak = async () => {
    if (!result) return;
    
    const text = result.result.text || result.result.feedback || result.result.description || "";
    if (!text) return;
    
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audio.play();
      }
    } catch (err) {
      console.error("TTS error:", err);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Analysis Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ANALYSIS_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.value;
          
          return (
            <motion.button
              key={type.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(type.value)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                isSelected
                  ? "border-orange-500 bg-orange-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-orange-300"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  isSelected ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "font-medium font-gujarati",
                  isSelected ? "text-orange-700" : "text-gray-700"
                )}>
                  {isGujarati ? type.labelGu : type.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-gujarati">
                {isGujarati ? type.descriptionGu : type.description}
              </p>
            </motion.button>
          );
        })}
      </div>
      
      {/* Image Upload Area */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-orange-400 transition-colors">
        <CardContent className="p-6">
          {!selectedImage ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <Camera className="w-10 h-10 text-orange-500" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 font-gujarati">
                  {isGujarati ? "છબી અપલોડ કરો" : "Upload Image"}
                </h3>
                <p className="text-sm text-gray-500 font-gujarati">
                  {isGujarati 
                    ? "ફોટો લો અથવા ગેલેરીમાંથી પસંદ કરો" 
                    : "Take a photo or choose from gallery"}
                </p>
              </div>
              
              <div className="flex justify-center gap-4">
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="font-gujarati"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {isGujarati ? "કેમેરા" : "Camera"}
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-gujarati"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isGujarati ? "અપલોડ" : "Upload"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-64 object-contain rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={handleReset}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="font-gujarati"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isGujarati ? "બદલો" : "Change"}
                </Button>
                
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-gujarati"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isGujarati ? "વિશ્લેષણ..." : "Analyzing..."}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGujarati ? "વિશ્લેષણ કરો" : "Analyze"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-gujarati"
        >
          {error}
        </motion.div>
      )}
      
      {/* Results Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-green-700 font-gujarati">
                    <Check className="w-5 h-5" />
                    {isGujarati ? "વિશ્લેષણ પૂર્ણ" : "Analysis Complete"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={handleSpeak}>
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCopyResult}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResultDisplay result={result} language={language} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Result display component based on analysis type
function ResultDisplay({ result, language }: { result: AnalysisResult; language: "gu" | "en" }) {
  const isGujarati = language === "gu";
  const data = result.result;
  
  if (data.raw) {
    return (
      <div className="whitespace-pre-wrap font-gujarati text-gray-700">
        {data.text}
      </div>
    );
  }
  
  switch (result.type) {
    case "homework":
      const score = data.score ?? 0;
      return (
        <div className="space-y-4">
          {/* Score */}
          <div className="flex items-center gap-4">
            <div className={cn(
              "text-4xl font-bold",
              score >= 80 ? "text-green-600" : 
              score >= 60 ? "text-yellow-600" : "text-red-600"
            )}>
              {score}%
            </div>
            <div className="font-gujarati text-gray-600">
              {data.isCorrect 
                ? (isGujarati ? "બધા જવાબો સાચા!" : "All answers correct!")
                : (isGujarati ? "કેટલાક સુધારા જરૂરી" : "Some corrections needed")}
            </div>
          </div>
          
          {/* Feedback */}
          <div className="p-4 bg-white/80 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
              {isGujarati ? "પ્રતિસાદ" : "Feedback"}
            </h4>
            <p className="text-gray-600 font-gujarati">
              {isGujarati ? data.feedbackGu || data.feedback : data.feedback}
            </p>
          </div>
          
          {/* Corrections */}
          {data.corrections && data.corrections.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 font-gujarati">
                {isGujarati ? "સુધારાઓ" : "Corrections"}
              </h4>
              {data.corrections.map((c: { original: string; corrected: string; explanation: string; explanationGu?: string }, i: number) => (
                <div key={i} className="p-3 bg-white/80 rounded-lg">
                  <div className="flex gap-2 text-sm">
                    <span className="text-red-500 line-through">{c.original}</span>
                    <span className="text-green-500">→ {c.corrected}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-gujarati">
                    {isGujarati ? c.explanationGu || c.explanation : c.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      
    case "diagram":
      return (
        <div className="space-y-4">
          <div className="p-4 bg-white/80 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
              {isGujarati ? "વર્ણન" : "Description"}
            </h4>
            <p className="text-gray-600 font-gujarati">
              {isGujarati ? data.descriptionGu || data.description : data.description}
            </p>
          </div>
          
          {data.labels && data.labels.length > 0 && (
            <div className="p-4 bg-white/80 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
                {isGujarati ? "ભાગો" : "Parts"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.labels.map((label: { name: string; nameGu?: string }, i: number) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-gujarati">
                    {isGujarati ? label.nameGu || label.name : label.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {data.concepts && data.concepts.length > 0 && (
            <div className="p-4 bg-white/80 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
                {isGujarati ? "સંબંધિત ખ્યાલો" : "Related Concepts"}
              </h4>
              <ul className="list-disc list-inside text-gray-600 font-gujarati">
                {(isGujarati ? data.conceptsGu || data.concepts : data.concepts).map((c: string, i: number) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
      
    case "ocr":
    case "textbook":
    case "handwriting":
      return (
        <div className="space-y-4">
          <div className="p-4 bg-white/80 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
              {isGujarati ? "નિષ્કર્ષિત ટેક્સ્ટ" : "Extracted Text"}
            </h4>
            <p className="text-gray-600 font-gujarati whitespace-pre-wrap">
              {data.text}
            </p>
          </div>
          
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="p-4 bg-white/80 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2 font-gujarati">
                {isGujarati ? "મુખ્ય મુદ્દાઓ" : "Key Points"}
              </h4>
              <ul className="list-disc list-inside text-gray-600 font-gujarati">
                {(isGujarati ? data.keyPointsGu || data.keyPoints : data.keyPoints).map((p: string, i: number) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
      
    default:
      return (
        <div className="p-4 bg-white/80 rounded-lg">
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      );
  }
}

export default ImageAnalyzer;
