// AI Configuration for GYAANSETU.AI
// Supports multiple LLM providers: OpenAI, Google Gemini, Local Models

export const AI_CONFIG = {
  // Primary AI Provider
  provider: process.env.NEXT_PUBLIC_AI_PROVIDER || "gemini",
  
  // API Keys (set via environment variables)
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: "gpt-4-turbo-preview",
    assistantId: process.env.OPENAI_ASSISTANT_ID || "",
  },
  
  gemini: {
    apiKey: process.env.GOOGLE_API_KEY || "",
    model: "gemini-pro",
    embeddingModel: "models/embedding-001",
  },
  
  // RAG Configuration
  rag: {
    chunkSize: 50000,
    chunkOverlap: 1000,
    maxRetrievedDocs: 5,
    similarityThreshold: 0.7,
  },
  
  // Gujarati Language Settings
  gujarati: {
    defaultLanguage: "gu",
    supportedLanguages: ["gu", "en", "hi"],
    tts: {
      enabled: true,
      speed: "normal", // slow, normal, fast
    },
    stt: {
      enabled: true,
      dialect: "gu-IN",
    },
  },
  
  // Educational Settings
  education: {
    classes: [5, 6, 7, 8, 9, 10, 11, 12],
    boards: ["GSEB", "NCERT", "CBSE"],
    subjects: {
      primary: ["ગણિત", "વિજ્ઞાન", "ગુજરાતી", "અંગ્રેજી", "સામાજિક વિજ્ઞાન"],
      secondary: ["ગણિત", "ભૌતિકશાસ્ત્ર", "રસાયણશાસ્ત્ર", "જીવવિજ્ઞાન", "ગુજરાતી", "અંગ્રેજી"],
    },
  },
  
  // Explanation Modes
  explanationModes: {
    simple: "Explain like I'm 10",
    story: "Story-based explanation",
    realWorld: "Real-life examples",
    stepByStep: "Step-by-step logic",
    visual: "Visual analogy (text-based)",
  },
  
  // Gamification Settings
  gamification: {
    xpPerQuestion: 10,
    xpPerLesson: 50,
    xpPerStreak: 25,
    streakResetHours: 24,
    levelThresholds: [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500],
  },
};

// Gujarati System Prompts
export const GUJARATI_SYSTEM_PROMPTS = {
  student: `તમે GYAANSETU.AI છો, એક મૈત્રીપૂર્ણ ગુજરાતી AI શિક્ષક. તમે ગુજરાતી વિદ્યાર્થીઓને તેમની ભાષામાં શીખવામાં મદદ કરો છો.

નિયમો:
1. હંમેશા ગુજરાતીમાં જવાબ આપો (જ્યાં સુધી વિદ્યાર્થી અંગ્રેજી ન માંગે)
2. સરળ અને સ્પષ્ટ ભાષા વાપરો
3. ઉદાહરણો આપો જે ગુજરાતી સંસ્કૃતિ સાથે સંબંધિત હોય
4. વિદ્યાર્થીને પ્રોત્સાહિત કરો
5. ખોટી માહિતી ન આપો - જો ખબર ન હોય તો કહો
6. વિદ્યાર્થીની ઉંમર અને સ્તર અનુસાર જવાબ આપો`,

  teacher: `તમે GYAANSETU.AI છો, શિક્ષકો માટે એક AI સહાયક. તમે ગુજરાતી શિક્ષકોને પાઠ આયોજન, પ્રશ્નપત્ર બનાવવા, અને મૂલ્યાંકનમાં મદદ કરો છો.

નિયમો:
1. વ્યાવસાયિક અને સહાયક બનો
2. GSEB/NCERT પાઠ્યક્રમ અનુસાર સામગ્રી બનાવો
3. વિવિધ સ્તરના વિદ્યાર્થીઓ માટે સામગ્રી અનુકૂળ કરો
4. ગુણવત્તા અને ચોકસાઈ પર ધ્યાન આપો
5. સમય બચાવવા માટે કાર્યક્ષમ સૂચનો આપો`,
};

export type AIProvider = "openai" | "gemini" | "local";
export type ExplanationMode = keyof typeof AI_CONFIG.explanationModes;
