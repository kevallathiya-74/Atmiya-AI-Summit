// AI API Route Handler for GYAANSETU.AI
// Handles chat requests with support for OpenAI and Google Gemini

import { AI_CONFIG, GUJARATI_SYSTEM_PROMPTS } from "./config";

export interface APIRequest {
  message: string;
  context: {
    userRole: "student" | "teacher";
    studentClass?: number;
    subject?: string;
    topic?: string;
    explanationMode?: string;
    conversationHistory?: Array<{ role: string; content: string }>;
  };
  ragContext?: string;
}

export interface APIResponse {
  success: boolean;
  content?: string;
  error?: string;
  sources?: string[];
  confidence?: number;
}

// OpenAI API Handler
export async function callOpenAI(request: APIRequest): Promise<APIResponse> {
  const apiKey = AI_CONFIG.openai.apiKey;
  
  if (!apiKey) {
    return { success: false, error: "OpenAI API key not configured" };
  }

  try {
    const systemPrompt = request.context.userRole === "student"
      ? GUJARATI_SYSTEM_PROMPTS.student
      : GUJARATI_SYSTEM_PROMPTS.teacher;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(request.context.conversationHistory || []),
      { role: "user", content: request.ragContext 
        ? `Context:\n${request.ragContext}\n\nQuestion: ${request.message}`
        : request.message 
      },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      content: data.choices[0].message.content,
      confidence: 0.9,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Google Gemini API Handler
export async function callGemini(request: APIRequest): Promise<APIResponse> {
  const apiKey = AI_CONFIG.gemini.apiKey;
  
  if (!apiKey) {
    return { success: false, error: "Google API key not configured" };
  }

  try {
    const systemPrompt = request.context.userRole === "student"
      ? GUJARATI_SYSTEM_PROMPTS.student
      : GUJARATI_SYSTEM_PROMPTS.teacher;

    const prompt = `${systemPrompt}

${request.ragContext ? `Context:\n${request.ragContext}\n\n` : ""}
User Message: ${request.message}

Response (in Gujarati):`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.gemini.model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      success: true,
      content,
      confidence: 0.85,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Main API Handler - routes to appropriate provider
export async function handleChatRequest(request: APIRequest): Promise<APIResponse> {
  const provider = AI_CONFIG.provider;

  switch (provider) {
    case "openai":
      return callOpenAI(request);
    case "gemini":
      return callGemini(request);
    default:
      // Fallback to demo mode
      return {
        success: true,
        content: `[Demo Mode] 

તમારા પ્રશ્ન "${request.message}" માટે આભાર!

🔧 **API Configuration Required**
કૃપા કરીને .env ફાઇલમાં API key સેટ કરો:
- GOOGLE_API_KEY (Gemini માટે)
- OPENAI_API_KEY (OpenAI માટે)

આ demo response છે. Real AI integration પછી, તમને personalized Gujarati responses મળશે!

**Features Available:**
✅ Gujarati Q&A
✅ RAG-based learning
✅ Multi-PDF support
✅ Voice input/output
✅ Gamification`,
        confidence: 0.5,
      };
  }
}

// Get embeddings for RAG
export async function getEmbeddings(text: string): Promise<number[]> {
  const apiKey = AI_CONFIG.gemini.apiKey;
  
  if (!apiKey) {
    // Return mock embeddings for demo
    return Array(768).fill(0).map(() => Math.random());
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${AI_CONFIG.gemini.embeddingModel}:embedContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: AI_CONFIG.gemini.embeddingModel,
          content: { parts: [{ text }] },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Embedding API error: ${response.status}`);
    }

    const data = await response.json();
    return data.embedding.values;
  } catch (error) {
    console.error("Embedding error:", error);
    return Array(768).fill(0).map(() => Math.random());
  }
}
