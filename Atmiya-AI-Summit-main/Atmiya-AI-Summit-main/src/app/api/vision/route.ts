// Vision API Route for GYAANSETU.AI
// Handles image analysis, OCR, homework checking

import { NextRequest, NextResponse } from "next/server";

// Image analysis types
type AnalysisType = "ocr" | "homework" | "diagram" | "textbook" | "handwriting" | "general";

const VISION_PROMPTS: Record<AnalysisType, { gu: string; en: string }> = {
  ocr: {
    gu: `આ છબીમાંથી તમામ ટેક્સ્ટ કાઢો. ગુજરાતી અને અંગ્રેજી બંને ટેક્સ્ટ ઓળખો. ગાણિતિક સૂત્રો અને ચિહ્નો પણ ઓળખો. JSON ફોર્મેટમાં આઉટપુટ આપો: {"text": "full text", "blocks": [{"text": "block text", "type": "text|formula|diagram|table"}], "language": "detected language"}`,
    en: `Extract all text from this image. Recognize both Gujarati and English text. Also recognize mathematical formulas and symbols. Output in JSON format: {"text": "full text", "blocks": [{"text": "block text", "type": "text|formula|diagram|table"}], "language": "detected language"}`,
  },
  homework: {
    gu: `આ ગૃહકાર્યની છબી તપાસો. દરેક જવાબની ચકાસણી કરો, ભૂલો શોધો, અને સુધારણા સૂચવો. JSON ફોર્મેટમાં આઉટપુટ: {"isCorrect": boolean, "score": 0-100, "feedback": "overall feedback", "feedbackGu": "ગુજરાતીમાં પ્રતિસાદ", "corrections": [{"original": "", "corrected": "", "explanation": "", "explanationGu": ""}], "suggestions": [], "suggestionsGu": []}`,
    en: `Check this homework image. Verify each answer, find errors, and suggest corrections. Output in JSON format: {"isCorrect": boolean, "score": 0-100, "feedback": "overall feedback", "feedbackGu": "feedback in Gujarati", "corrections": [{"original": "", "corrected": "", "explanation": "", "explanationGu": ""}], "suggestions": [], "suggestionsGu": []}`,
  },
  diagram: {
    gu: `આ આકૃતિનું વિશ્લેષણ કરો. તમામ ભાગો ઓળખો, વૈજ્ઞાનિક/ગાણિતિક ખ્યાલો સમજાવો. JSON ફોર્મેટમાં: {"description": "", "descriptionGu": "", "labels": [{"name": "", "nameGu": "", "position": ""}], "concepts": [], "conceptsGu": [], "relatedTopics": []}`,
    en: `Analyze this diagram. Identify all parts, explain scientific/mathematical concepts. In JSON format: {"description": "", "descriptionGu": "", "labels": [{"name": "", "nameGu": "", "position": ""}], "concepts": [], "conceptsGu": [], "relatedTopics": []}`,
  },
  textbook: {
    gu: `આ પાઠ્યપુસ્તકના પૃષ્ઠને વાંચો. મુખ્ય મુદ્દાઓ, વ્યાખ્યાઓ, સૂત્રો અને ઉદાહરણો કાઢો. JSON ફોર્મેટમાં: {"text": "extracted text", "keyPoints": [], "keyPointsGu": [], "definitions": [], "formulas": [], "summary": "", "summaryGu": ""}`,
    en: `Read this textbook page. Extract key points, definitions, formulas, and examples. In JSON format: {"text": "extracted text", "keyPoints": [], "keyPointsGu": [], "definitions": [], "formulas": [], "summary": "", "summaryGu": ""}`,
  },
  handwriting: {
    gu: `આ હસ્તલિખિત ટેક્સ્ટ વાંચો. ગુજરાતી અને અંગ્રેજી બંને ઓળખો. JSON ફોર્મેટમાં: {"text": "recognized text", "confidence": 0-1, "language": "detected language"}`,
    en: `Read this handwritten text. Recognize both Gujarati and English. In JSON format: {"text": "recognized text", "confidence": 0-1, "language": "detected language"}`,
  },
  general: {
    gu: `આ શૈક્ષણિક છબીનું વિશ્લેષણ કરો. શું દેખાય છે તે વર્ણવો અને તેની શૈક્ષણિક સુસંગતતા સમજાવો. JSON ફોર્મેટમાં: {"description": "", "descriptionGu": "", "educationalRelevance": "", "educationalRelevanceGu": "", "suggestedTopics": []}`,
    en: `Analyze this educational image. Describe what you see and explain its educational relevance. In JSON format: {"description": "", "descriptionGu": "", "educationalRelevance": "", "educationalRelevanceGu": "", "suggestedTopics": []}`,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const type = (formData.get("type") as AnalysisType) || "general";
    const language = (formData.get("language") as string) || "gu";
    const customPrompt = formData.get("prompt") as string | null;
    const subject = formData.get("subject") as string | null;
    
    if (!image) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }
    
    // Check for API keys
    const ollamaKey = process.env.OLLAMA_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!ollamaKey && !openaiKey && !geminiKey) {
      return NextResponse.json(
        { error: "No vision API key configured. Set OLLAMA_API_KEY, OPENAI_API_KEY or GOOGLE_GEMINI_API_KEY" },
        { status: 500 }
      );
    }
    
    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type || "image/jpeg";
    
    // Build prompt
    let prompt = customPrompt || VISION_PROMPTS[type][language === "gu" ? "gu" : "en"];
    if (subject && !customPrompt) {
      prompt = `Subject: ${subject}. ${prompt}`;
    }
    
    let result;
    
    // Prefer Gemini for vision tasks (better multilingual support)
    if (geminiKey) {
      result = await analyzeWithGemini(base64, mimeType, prompt, geminiKey);
    } else if (openaiKey) {
      result = await analyzeWithOpenAI(base64, mimeType, prompt, openaiKey);
    }
    
    return NextResponse.json({
      type,
      result,
      language,
    });
    
  } catch (error) {
    console.error("Vision API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}

async function analyzeWithGemini(
  base64: string, 
  mimeType: string, 
  prompt: string, 
  apiKey: string
) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2000,
        },
      }),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;
  
  return parseVisionResponse(content);
}

async function analyzeWithOpenAI(
  base64: string, 
  mimeType: string, 
  prompt: string, 
  apiKey: string
) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
                detail: "high",
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return parseVisionResponse(content);
}

function parseVisionResponse(content: string) {
  try {
    // Try to extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // JSON parsing failed
  }
  
  // Return raw text if not JSON
  return { text: content, raw: true };
}
