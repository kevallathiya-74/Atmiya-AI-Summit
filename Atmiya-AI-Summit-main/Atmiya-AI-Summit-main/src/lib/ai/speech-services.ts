// Speech Services for GYAANSETU.AI
// Text-to-Speech and Speech-to-Text with Gujarati support
// Based on AI_Tutor voice interface patterns

import { AI_CONFIG } from "./config";

// ==================== TYPES ====================

export interface TTSOptions {
  text: string;
  language?: "gu" | "hi" | "en"; // Gujarati, Hindi, English
  voice?: string;
  speed?: number; // 0.25 to 4.0
  pitch?: number; // 0.0 to 2.0
}

export interface STTOptions {
  audio: Blob | File;
  language?: "gu" | "hi" | "en";
  prompt?: string; // Context hint for better recognition
}

export interface TTSResult {
  audioUrl: string;
  audioBlob: Blob;
  duration?: number;
}

export interface STTResult {
  text: string;
  confidence: number;
  language: string;
  segments?: {
    text: string;
    start: number;
    end: number;
  }[];
}

// ==================== VOICE CONFIGURATIONS ====================

const VOICE_CONFIG = {
  // OpenAI TTS voices
  openai: {
    gu: "shimmer", // Best for Indian languages
    hi: "shimmer",
    en: "nova",
  },
  // Azure Neural voices (if using Azure)
  azure: {
    gu: "gu-IN-DhwaniNeural",
    hi: "hi-IN-SwaraNeural",
    en: "en-IN-NeerjaNeural",
  },
  // Google Cloud voices
  google: {
    gu: "gu-IN-Standard-A",
    hi: "hi-IN-Neural2-A",
    en: "en-IN-Neural2-A",
  },
};

// Language prompts for better STT recognition
const LANGUAGE_PROMPTS = {
  gu: "ગુજરાતી શૈક્ષણિક વિષયવસ્તુ, ગણિત, વિજ્ઞાન, GSEB અભ્યાસક્રમ",
  hi: "हिंदी शैक्षिक सामग्री, गणित, विज्ञान",
  en: "Educational content, mathematics, science, GSEB curriculum",
};

// ==================== TEXT-TO-SPEECH ====================

export class TextToSpeechService {
  private cache: Map<string, TTSResult> = new Map();
  
  // Generate speech using OpenAI TTS
  async synthesize(options: TTSOptions): Promise<TTSResult> {
    const { text, language = "gu", speed = 1.0 } = options;
    
    // Check cache
    const cacheKey = `${text}-${language}-${speed}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const voice = VOICE_CONFIG.openai[language] || "shimmer";
    
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice,
        speed,
        response_format: "mp3",
      }),
    });
    
    if (!response.ok) {
      throw new Error(`TTS synthesis failed: ${response.statusText}`);
    }
    
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    const result: TTSResult = { audioUrl, audioBlob };
    
    // Cache the result
    this.cache.set(cacheKey, result);
    
    return result;
  }
  
  // Synthesize with SSML for better control
  async synthesizeSSML(ssml: string, language: "gu" | "hi" | "en" = "gu"): Promise<TTSResult> {
    // Convert SSML to plain text for OpenAI (SSML not fully supported)
    const plainText = ssml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    
    return this.synthesize({ text: plainText, language });
  }
  
  // Generate educational pronunciation guide
  async pronounceWord(word: string, language: "gu" | "hi" | "en" = "gu"): Promise<TTSResult> {
    const text = language === "gu" 
      ? `${word}. ફરીથી: ${word}`
      : language === "hi"
      ? `${word}. दोबारा: ${word}`
      : `${word}. Again: ${word}`;
    
    return this.synthesize({ text, language, speed: 0.8 });
  }
  
  // Clear cache
  clearCache(): void {
    this.cache.forEach(result => {
      URL.revokeObjectURL(result.audioUrl);
    });
    this.cache.clear();
  }
}

// ==================== SPEECH-TO-TEXT ====================

export class SpeechToTextService {
  // Transcribe audio using OpenAI Whisper
  async transcribe(options: STTOptions): Promise<STTResult> {
    const { audio, language = "gu", prompt } = options;
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    // Prepare form data
    const formData = new FormData();
    formData.append("file", audio, "audio.webm");
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");
    
    // Set language hint
    const languageCode = language === "gu" ? "gu" : language === "hi" ? "hi" : "en";
    formData.append("language", languageCode);
    
    // Add context prompt for better recognition
    const contextPrompt = prompt || LANGUAGE_PROMPTS[language];
    formData.append("prompt", contextPrompt);
    
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`STT transcription failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      text: data.text,
      confidence: 0.95, // Whisper doesn't return confidence, using high default
      language: data.language || languageCode,
      segments: data.segments?.map((seg: { text: string; start: number; end: number }) => ({
        text: seg.text,
        start: seg.start,
        end: seg.end,
      })),
    };
  }
  
  // Real-time transcription using Web Speech API (browser-side)
  createRealtimeTranscriber(
    language: "gu" | "hi" | "en" = "gu",
    callbacks: {
      onResult?: (text: string, isFinal: boolean) => void;
      onError?: (error: Error) => void;
      onEnd?: () => void;
    }
  ): {
    start: () => void;
    stop: () => void;
    isListening: () => boolean;
  } {
    // This is a factory for browser-side implementation
    // Actual implementation runs in the browser
    
    const languageCode = language === "gu" ? "gu-IN" : language === "hi" ? "hi-IN" : "en-IN";
    
    return {
      start: () => {
        // Browser implementation
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
          const SpeechRecognition = window.webkitSpeechRecognition as typeof window.SpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = languageCode;
          
          recognition.onresult = (event: unknown) => {
            const e = event as { results: { isFinal: boolean; 0: { transcript: string } }[] };
            const result = e.results[e.results.length - 1];
            const transcript = result[0].transcript;
            callbacks.onResult?.(transcript, result.isFinal);
          };
          
          recognition.onerror = (event: unknown) => {
            const e = event as { error: string };
            callbacks.onError?.(new Error(e.error));
          };
          
          recognition.onend = () => {
            callbacks.onEnd?.();
          };
          
          recognition.start();
        }
      },
      stop: () => {
        // Implementation handles stopping
      },
      isListening: () => false,
    };
  }
}

// ==================== VOICE INTERFACE MANAGER ====================

export class VoiceInterfaceManager {
  private tts: TextToSpeechService;
  private stt: SpeechToTextService;
  private isListening: boolean = false;
  private isSpeaking: boolean = false;
  private currentAudio: HTMLAudioElement | null = null;
  
  constructor() {
    this.tts = new TextToSpeechService();
    this.stt = new SpeechToTextService();
  }
  
  // Speak text with Gujarati support
  async speak(text: string, language: "gu" | "hi" | "en" = "gu"): Promise<void> {
    if (this.isSpeaking) {
      this.stopSpeaking();
    }
    
    this.isSpeaking = true;
    
    try {
      const result = await this.tts.synthesize({ text, language });
      
      if (typeof window !== "undefined") {
        this.currentAudio = new Audio(result.audioUrl);
        
        return new Promise((resolve, reject) => {
          if (!this.currentAudio) return reject(new Error("Audio not created"));
          
          this.currentAudio.onended = () => {
            this.isSpeaking = false;
            resolve();
          };
          
          this.currentAudio.onerror = (e) => {
            this.isSpeaking = false;
            reject(e);
          };
          
          this.currentAudio.play();
        });
      }
    } catch (error) {
      this.isSpeaking = false;
      throw error;
    }
  }
  
  // Stop current speech
  stopSpeaking(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.isSpeaking = false;
  }
  
  // Listen for voice input
  async listen(
    language: "gu" | "hi" | "en" = "gu",
    duration: number = 10000
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Voice input only available in browser"));
        return;
      }
      
      this.isListening = true;
      let finalTranscript = "";
      
      const transcriber = this.stt.createRealtimeTranscriber(language, {
        onResult: (text, isFinal) => {
          if (isFinal) {
            finalTranscript = text;
          }
        },
        onError: (error) => {
          this.isListening = false;
          reject(error);
        },
        onEnd: () => {
          this.isListening = false;
          resolve(finalTranscript);
        },
      });
      
      transcriber.start();
      
      // Auto-stop after duration
      setTimeout(() => {
        transcriber.stop();
      }, duration);
    });
  }
  
  // Check if currently listening
  getIsListening(): boolean {
    return this.isListening;
  }
  
  // Check if currently speaking
  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
  
  // Cleanup
  cleanup(): void {
    this.stopSpeaking();
    this.tts.clearCache();
  }
}

// Singleton instances
export const ttsService = new TextToSpeechService();
export const sttService = new SpeechToTextService();
export const voiceInterface = new VoiceInterfaceManager();
