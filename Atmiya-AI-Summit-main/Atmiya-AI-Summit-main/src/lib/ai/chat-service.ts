// Gujarati AI Chat Service for GYAANSETU.AI
// Integrates OpenAI and Google Gemini with Gujarati language support

import { AI_CONFIG, GUJARATI_SYSTEM_PROMPTS, ExplanationMode } from "./config";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    explanationMode?: ExplanationMode;
    subject?: string;
    topic?: string;
    sources?: string[];
    xpEarned?: number;
  };
}

export interface ChatContext {
  userRole: "student" | "teacher";
  studentClass?: number;
  subject?: string;
  topic?: string;
  explanationMode?: ExplanationMode;
  previousMistakes?: string[];
  weakTopics?: string[];
}

export interface AIResponse {
  content: string;
  sources?: string[];
  confidence: number;
  suggestions?: string[];
  xpEarned?: number;
}

// Generate unique ID
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Build context-aware system prompt
export function buildSystemPrompt(context: ChatContext): string {
  let basePrompt =
    context.userRole === "student"
      ? GUJARATI_SYSTEM_PROMPTS.student
      : GUJARATI_SYSTEM_PROMPTS.teacher;

  if (context.userRole === "student") {
    // Add student-specific context
    if (context.studentClass) {
      basePrompt += `\n\nવિદ્યાર્થી ધોરણ ${context.studentClass}માં છે.`;
    }
    if (context.subject) {
      basePrompt += `\nવર્તમાન વિષય: ${context.subject}`;
    }
    if (context.topic) {
      basePrompt += `\nવર્તમાન ટોપિક: ${context.topic}`;
    }
    if (context.weakTopics && context.weakTopics.length > 0) {
      basePrompt += `\nનબળા ટોપિક્સ: ${context.weakTopics.join(", ")}`;
    }
    if (context.explanationMode) {
      basePrompt += `\n\nસમજાવવાની રીત: ${AI_CONFIG.explanationModes[context.explanationMode]}`;
    }
  }

  return basePrompt;
}

// Adjust response based on explanation mode
export function formatResponseByMode(
  response: string,
  mode: ExplanationMode
): string {
  // This would be handled by the AI model based on the system prompt
  // This is a fallback formatting
  return response;
}

// Calculate XP for interaction
export function calculateXP(
  action: "question" | "lesson" | "revision" | "streak",
  correct?: boolean
): number {
  const { gamification } = AI_CONFIG;
  
  switch (action) {
    case "question":
      return correct ? gamification.xpPerQuestion : Math.floor(gamification.xpPerQuestion / 2);
    case "lesson":
      return gamification.xpPerLesson;
    case "revision":
      return Math.floor(gamification.xpPerLesson * 0.7);
    case "streak":
      return gamification.xpPerStreak;
    default:
      return 0;
  }
}

// Detect if user needs simpler explanation
export function detectConfusion(
  messages: ChatMessage[],
  windowSize: number = 5
): boolean {
  const recentMessages = messages.slice(-windowSize);
  
  // Check for repeated questions on same topic
  const topics = recentMessages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase());

  // Simple confusion detection: similar questions asked multiple times
  const uniqueTopics = new Set(topics);
  if (topics.length > 2 && uniqueTopics.size < topics.length - 1) {
    return true;
  }

  // Check for Gujarati confusion indicators
  const confusionPhrases = [
    "સમજાયું નહીં",
    "ફરીથી સમજાવો",
    "મને સમજ નથી પડતી",
    "કંઈ સમજાતું નથી",
    "confused",
    "not clear",
    "શું?",
  ];

  const lastUserMessage = recentMessages
    .filter((m) => m.role === "user")
    .pop()?.content.toLowerCase();

  if (lastUserMessage) {
    return confusionPhrases.some((phrase) =>
      lastUserMessage.includes(phrase.toLowerCase())
    );
  }

  return false;
}

// Generate follow-up questions
export function generateFollowUpQuestions(
  topic: string,
  language: "gu" | "en" = "gu"
): string[] {
  if (language === "gu") {
    return [
      `"${topic}" વિશે વધુ ઉદાહરણ આપો`,
      `આનો વ્યવહારિક ઉપયોગ શું છે?`,
      `સંબંધિત ટોપિક્સ કયા છે?`,
      `આના પર પ્રશ્ન પૂછો`,
    ];
  }
  return [
    `Give more examples about "${topic}"`,
    `What is the practical use of this?`,
    `What are related topics?`,
    `Quiz me on this`,
  ];
}

// Gujarati text-to-speech helper
export function prepareTextForTTS(text: string): string {
  // Clean text for TTS
  let cleaned = text
    .replace(/\[.*?\]/g, "") // Remove source citations
    .replace(/\*\*/g, "") // Remove markdown bold
    .replace(/\n{3,}/g, "\n\n") // Reduce multiple newlines
    .replace(/[#*_`]/g, ""); // Remove other markdown

  return cleaned;
}

// AI Response Generator - Calls the real API
export async function generateAIResponse(
  message: string,
  context: ChatContext,
  ragContext?: string
): Promise<AIResponse> {
  try {
    // Call the actual API endpoint
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        mode: context.explanationMode || "simple",
        classLevel: context.studentClass?.toString(),
        subject: context.subject,
        provider: "auto", // Auto-detect: uses OpenAI if key available, else demo
        conversationHistory: [], // Can be expanded for multi-turn conversations
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.response) {
      return {
        content: data.response,
        confidence: 0.9,
        xpEarned: calculateXP("question", true),
        suggestions: generateFollowUpQuestions(message, "gu"),
      };
    } else {
      throw new Error(data.error || "Unknown error");
    }
  } catch (error) {
    console.error("AI Response Error:", error);
    
    // Fallback to demo response on error
    return {
      content: `માફ કરશો, હાલમાં AI સેવામાં સમસ્યા છે. 

તમારો પ્રશ્ન હતો: "${message}"

કૃપા કરીને થોડીવાર પછી ફરી પ્રયાસ કરો. 
જો સમસ્યા ચાલુ રહે, તો API key તપાસો.`,
      confidence: 0.5,
      xpEarned: 5,
      suggestions: ["ફરી પ્રયાસ કરો", "બીજો પ્રશ્ન પૂછો"],
    };
  }
}

// Unified chat service export for convenience
export const chatService = {
  generateMessageId,
  buildSystemPrompt,
  formatResponseByMode,
  calculateXP,
  detectConfusion,
  generateFollowUpQuestions,
  prepareTextForTTS,
  generateAIResponse,
};
