"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Send,
  StopCircle,
  Languages,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceInterfaceProps {
  onTranscript?: (text: string) => void;
  onSend?: (text: string) => Promise<string>;
  language?: "gu" | "hi" | "en";
  autoSpeak?: boolean;
  className?: string;
}

export function VoiceInterface({
  onTranscript,
  onSend,
  language = "gu",
  autoSpeak = true,
  className,
}: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  
  // Using generic type to avoid SpeechRecognition type issues
  interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: unknown) => void) | null;
    onerror: ((event: unknown) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  }
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const languageNames = {
    gu: "ગુજરાતી",
    hi: "हिंदी",
    en: "English",
  };
  
  const languageCodes = {
    gu: "gu-IN",
    hi: "hi-IN",
    en: "en-IN",
  };
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = languageCodes[selectedLanguage];
        
        recognition.onresult = (event: unknown) => {
          const e = event as { results: { isFinal: boolean; 0: { transcript: string } }[] };
          let interim = "";
          let final = "";
          
          for (let i = 0; i < e.results.length; i++) {
            const result = e.results[i];
            if (result.isFinal) {
              final += result[0].transcript;
            } else {
              interim += result[0].transcript;
            }
          }
          
          if (final) {
            setTranscript(prev => prev + final);
            onTranscript?.(final);
          }
          setInterimTranscript(interim);
        };
        
        recognition.onerror = (event: unknown) => {
          const e = event as { error: string };
          console.error("Speech recognition error:", e.error);
          setError(`Voice error: ${e.error}`);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition as unknown as SpeechRecognitionInstance;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage, onTranscript]);
  
  // Start/stop listening
  const toggleListening = useCallback(async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setError(null);
      setTranscript("");
      setInterimTranscript("");
      
      // Also start media recorder for Whisper fallback
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
      } catch (err) {
        console.error("Media recorder error:", err);
      }
      
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        setError("Could not start voice recognition");
        console.error(err);
      }
    }
  }, [isListening]);
  
  // Use Whisper API for better accuracy
  const transcribeWithWhisper = async () => {
    if (mediaRecorderRef.current && audioChunksRef.current.length > 0) {
      mediaRecorderRef.current.stop();
      
      // Wait for final chunks
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("language", selectedLanguage);
      
      try {
        const response = await fetch("/api/stt", {
          method: "POST",
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          setTranscript(data.text);
          onTranscript?.(data.text);
        }
      } catch (err) {
        console.error("Whisper transcription error:", err);
      }
    }
  };
  
  // Send message and get response
  const handleSend = async () => {
    const text = transcript.trim();
    if (!text || !onSend) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const responseText = await onSend(text);
      setResponse(responseText);
      
      // Auto-speak response if enabled
      if (autoSpeak && responseText) {
        await speakText(responseText);
      }
    } catch (err) {
      setError("Failed to get response");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Text-to-speech
  const speakText = async (text: string) => {
    setIsSpeaking(true);
    
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: selectedLanguage }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        if (audioRef.current) {
          audioRef.current.pause();
        }
        
        audioRef.current = new Audio(url);
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };
        audioRef.current.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };
        
        await audioRef.current.play();
      } else {
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageCodes[selectedLanguage];
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    } catch (err) {
      setIsSpeaking(false);
      console.error("TTS error:", err);
      
      // Fallback to browser TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCodes[selectedLanguage];
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };
  
  // Cycle through languages
  const cycleLanguage = () => {
    const langs: ("gu" | "hi" | "en")[] = ["gu", "hi", "en"];
    const currentIndex = langs.indexOf(selectedLanguage);
    const nextIndex = (currentIndex + 1) % langs.length;
    setSelectedLanguage(langs[nextIndex]);
  };
  
  return (
    <Card className={cn("border-0 shadow-xl", className)}>
      <CardContent className="p-6 space-y-4">
        {/* Language Selector */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={cycleLanguage}
            className="font-gujarati"
          >
            <Languages className="w-4 h-4 mr-2" />
            {languageNames[selectedLanguage]}
          </Button>
        </div>
        
        {/* Main Voice Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl",
              isListening
                ? "bg-gradient-to-br from-red-500 to-rose-600 animate-pulse"
                : "bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
            )}
          >
            {isListening ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </motion.button>
        </div>
        
        {/* Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center items-center gap-2"
            >
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scaleY: [1, 2, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-1 h-4 bg-orange-500 rounded-full"
                  />
                ))}
              </div>
              <span className="text-orange-600 font-gujarati">
                {selectedLanguage === "gu" ? "સાંભળી રહ્યું છે..." : 
                 selectedLanguage === "hi" ? "सुन रहा है..." : "Listening..."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Transcript Display */}
        {(transcript || interimTranscript) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-gray-50 rounded-xl"
          >
            <p className="text-gray-700 font-gujarati">
              {transcript}
              <span className="text-gray-400">{interimTranscript}</span>
            </p>
          </motion.div>
        )}
        
        {/* Action Buttons */}
        {transcript && !isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-3"
          >
            <Button
              variant="outline"
              onClick={() => {
                setTranscript("");
                setResponse("");
              }}
              className="font-gujarati"
            >
              {selectedLanguage === "gu" ? "સાફ કરો" : 
               selectedLanguage === "hi" ? "साफ़ करें" : "Clear"}
            </Button>
            
            {onSend && (
              <Button
                onClick={handleSend}
                disabled={isProcessing}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-gujarati"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {selectedLanguage === "gu" ? "પ્રક્રિયા..." : 
                     selectedLanguage === "hi" ? "प्रक्रिया..." : "Processing..."}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {selectedLanguage === "gu" ? "મોકલો" : 
                     selectedLanguage === "hi" ? "भेजें" : "Send"}
                  </>
                )}
              </Button>
            )}
          </motion.div>
        )}
        
        {/* Response Display */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-green-600 font-gujarati">
                  {selectedLanguage === "gu" ? "GYAANSETU જવાબ" : 
                   selectedLanguage === "hi" ? "GYAANSETU उत्तर" : "GYAANSETU Response"}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => isSpeaking ? stopSpeaking() : speakText(response)}
                  className="h-8 w-8 p-0"
                >
                  {isSpeaking ? (
                    <StopCircle className="w-4 h-4 text-red-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-green-600" />
                  )}
                </Button>
              </div>
              <p className="text-gray-700 font-gujarati whitespace-pre-wrap">
                {response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center font-gujarati"
          >
            {error}
          </motion.div>
        )}
        
        {/* Instructions */}
        <p className="text-center text-xs text-gray-400 font-gujarati">
          {selectedLanguage === "gu" 
            ? "બોલવા માટે માઇક બટન દબાવો" 
            : selectedLanguage === "hi"
            ? "बोलने के लिए माइक बटन दबाएं"
            : "Press the mic button to speak"}
        </p>
      </CardContent>
    </Card>
  );
}

export default VoiceInterface;
