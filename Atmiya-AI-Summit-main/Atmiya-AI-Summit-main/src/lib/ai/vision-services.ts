// Vision Services for GYAANSETU.AI
// Image-to-Text (OCR), Image Analysis, Image-to-Video
// Based on adse/multilanguage_invoice_extractor (Gemini Vision) patterns

import { AI_CONFIG } from "./config";

// ==================== TYPES ====================

export interface ImageAnalysisOptions {
  image: File | Blob | string; // File, Blob, or base64
  prompt?: string;
  language?: "gu" | "hi" | "en";
  type: "ocr" | "homework" | "diagram" | "textbook" | "handwriting" | "general";
}

export interface OCRResult {
  text: string;
  textGu?: string;
  confidence: number;
  blocks: {
    text: string;
    boundingBox?: { x: number; y: number; width: number; height: number };
    type: "text" | "formula" | "diagram" | "table";
  }[];
  detectedLanguage: string;
}

export interface HomeworkCheckResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
  feedbackGu: string;
  corrections: {
    original: string;
    corrected: string;
    explanation: string;
    explanationGu: string;
  }[];
  suggestions: string[];
  suggestionsGu: string[];
}

export interface DiagramAnalysisResult {
  description: string;
  descriptionGu: string;
  labels: { name: string; nameGu: string; position?: string }[];
  concepts: string[];
  conceptsGu: string[];
  relatedTopics: string[];
}

export interface VideoGenerationOptions {
  images: (File | Blob | string)[];
  script?: string;
  scriptGu?: string;
  duration?: number; // seconds per image
  style?: "educational" | "storytelling" | "slideshow";
  voiceover?: boolean;
  language?: "gu" | "hi" | "en";
}

export interface VideoResult {
  videoUrl: string;
  videoBlob: Blob;
  duration: number;
  frames: number;
}

// ==================== IMAGE UTILITIES ====================

async function imageToBase64(image: File | Blob | string): Promise<string> {
  if (typeof image === "string") {
    // Already base64 or URL
    if (image.startsWith("data:")) {
      return image.split(",")[1];
    }
    // Fetch URL and convert
    const response = await fetch(image);
    const blob = await response.blob();
    return blobToBase64(blob);
  }
  return blobToBase64(image);
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getMimeType(file: File | Blob): string {
  if (file instanceof File) {
    return file.type || "image/jpeg";
  }
  return file.type || "image/jpeg";
}

// ==================== PROMPTS ====================

const VISION_PROMPTS = {
  ocr: {
    gu: `આ છબીમાંથી તમામ ટેક્સ્ટ કાઢો. ગુજરાતી અને અંગ્રેજી બંને ટેક્સ્ટ ઓળખો. ગાણિતિક સૂત્રો અને ચિહ્નો પણ ઓળખો. JSON ફોર્મેટમાં આઉટપુટ આપો: {"text": "full text", "blocks": [{"text": "block text", "type": "text|formula|diagram|table"}], "language": "detected language"}`,
    en: `Extract all text from this image. Recognize both Gujarati and English text. Also recognize mathematical formulas and symbols. Output in JSON format: {"text": "full text", "blocks": [{"text": "block text", "type": "text|formula|diagram|table"}], "language": "detected language"}`,
  },
  homework: {
    gu: `આ ગૃહકાર્યની છબી તપાસો. દરેક જવાબની ચકાસણી કરો, ભૂલો શોધો, અને સુધારણા સૂચવો. JSON ફોર્મેટમાં આઉટપુટ: {"isCorrect": boolean, "score": 0-100, "feedback": "overall feedback", "corrections": [{"original": "", "corrected": "", "explanation": ""}], "suggestions": []}`,
    en: `Check this homework image. Verify each answer, find errors, and suggest corrections. Output in JSON format: {"isCorrect": boolean, "score": 0-100, "feedback": "overall feedback", "corrections": [{"original": "", "corrected": "", "explanation": ""}], "suggestions": []}`,
  },
  diagram: {
    gu: `આ આકૃતિનું વિશ્લેષણ કરો. તમામ ભાગો ઓળખો, વૈજ્ઞાનિક/ગાણિતિક ખ્યાલો સમજાવો. JSON ફોર્મેટમાં: {"description": "", "labels": [{"name": "", "position": ""}], "concepts": [], "relatedTopics": []}`,
    en: `Analyze this diagram. Identify all parts, explain scientific/mathematical concepts. In JSON format: {"description": "", "labels": [{"name": "", "position": ""}], "concepts": [], "relatedTopics": []}`,
  },
  textbook: {
    gu: `આ પાઠ્યપુસ્તકના પૃષ્ઠને વાંચો. મુખ્ય મુદ્દાઓ, વ્યાખ્યાઓ, સૂત્રો અને ઉદાહરણો કાઢો. સારાંશ આપો.`,
    en: `Read this textbook page. Extract key points, definitions, formulas, and examples. Provide a summary.`,
  },
  handwriting: {
    gu: `આ હસ્તલિખિત ટેક્સ્ટ વાંચો. ગુજરાતી અને અંગ્રેજી બંને ઓળખો. જો અસ્પષ્ટ હોય તો શ્રેષ્ઠ અનુમાન આપો.`,
    en: `Read this handwritten text. Recognize both Gujarati and English. If unclear, provide best guess.`,
  },
  general: {
    gu: `આ શૈક્ષણિક છબીનું વિશ્લેષણ કરો. શું દેખાય છે તે વર્ણવો અને તેની શૈક્ષણિક સુસંગતતા સમજાવો.`,
    en: `Analyze this educational image. Describe what you see and explain its educational relevance.`,
  },
};

// ==================== VISION SERVICE ====================

export class VisionService {
  private useOpenAI: boolean;
  private useGemini: boolean;
  
  constructor() {
    this.useOpenAI = !!process.env.OPENAI_API_KEY;
    this.useGemini = !!process.env.GOOGLE_GEMINI_API_KEY;
  }
  
  // Analyze image using GPT-4 Vision or Gemini Pro Vision
  async analyzeImage(options: ImageAnalysisOptions): Promise<OCRResult | HomeworkCheckResult | DiagramAnalysisResult | string> {
    const { image, type, language = "gu" } = options;
    
    const base64Image = await imageToBase64(image);
    const mimeType = typeof image !== "string" 
      ? getMimeType(image) 
      : "image/jpeg";
    
    const prompt = options.prompt || VISION_PROMPTS[type][language === "gu" ? "gu" : "en"];
    
    if (this.useGemini) {
      return this.analyzeWithGemini(base64Image, mimeType, prompt, type);
    } else if (this.useOpenAI) {
      return this.analyzeWithOpenAI(base64Image, mimeType, prompt, type);
    } else {
      throw new Error("No vision API configured. Set OPENAI_API_KEY or GOOGLE_GEMINI_API_KEY");
    }
  }
  
  // Analyze with OpenAI GPT-4 Vision
  private async analyzeWithOpenAI(
    base64Image: string,
    mimeType: string,
    prompt: string,
    type: ImageAnalysisOptions["type"]
  ): Promise<OCRResult | HomeworkCheckResult | DiagramAnalysisResult | string> {
    const apiKey = process.env.OPENAI_API_KEY;
    
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
                  url: `data:${mimeType};base64,${base64Image}`,
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
      throw new Error(`OpenAI Vision analysis failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return this.parseVisionResponse(content, type);
  }
  
  // Analyze with Google Gemini Pro Vision
  private async analyzeWithGemini(
    base64Image: string,
    mimeType: string,
    prompt: string,
    type: ImageAnalysisOptions["type"]
  ): Promise<OCRResult | HomeworkCheckResult | DiagramAnalysisResult | string> {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
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
                    data: base64Image,
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
      throw new Error(`Gemini Vision analysis failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    return this.parseVisionResponse(content, type);
  }
  
  // Parse vision response based on type
  private parseVisionResponse(
    content: string,
    type: ImageAnalysisOptions["type"]
  ): OCRResult | HomeworkCheckResult | DiagramAnalysisResult | string {
    // Try to parse as JSON
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        switch (type) {
          case "ocr":
          case "textbook":
          case "handwriting":
            return {
              text: parsed.text || content,
              confidence: parsed.confidence || 0.9,
              blocks: parsed.blocks || [],
              detectedLanguage: parsed.language || "unknown",
            } as OCRResult;
            
          case "homework":
            return {
              isCorrect: parsed.isCorrect || false,
              score: parsed.score || 0,
              feedback: parsed.feedback || "",
              feedbackGu: parsed.feedbackGu || parsed.feedback || "",
              corrections: parsed.corrections || [],
              suggestions: parsed.suggestions || [],
              suggestionsGu: parsed.suggestionsGu || parsed.suggestions || [],
            } as HomeworkCheckResult;
            
          case "diagram":
            return {
              description: parsed.description || "",
              descriptionGu: parsed.descriptionGu || parsed.description || "",
              labels: parsed.labels || [],
              concepts: parsed.concepts || [],
              conceptsGu: parsed.conceptsGu || parsed.concepts || [],
              relatedTopics: parsed.relatedTopics || [],
            } as DiagramAnalysisResult;
            
          default:
            return content;
        }
      }
    } catch {
      // JSON parsing failed, return as string
    }
    
    // Return raw content if not JSON
    if (type === "ocr" || type === "textbook" || type === "handwriting") {
      return {
        text: content,
        confidence: 0.8,
        blocks: [{ text: content, type: "text" }],
        detectedLanguage: "unknown",
      } as OCRResult;
    }
    
    return content;
  }
  
  // OCR - Extract text from image
  async extractText(image: File | Blob | string, language: "gu" | "hi" | "en" = "gu"): Promise<OCRResult> {
    const result = await this.analyzeImage({ image, type: "ocr", language });
    return result as OCRResult;
  }
  
  // Check homework
  async checkHomework(image: File | Blob | string, subject?: string): Promise<HomeworkCheckResult> {
    const customPrompt = subject
      ? `Check this ${subject} homework. Verify answers, find errors, suggest corrections. Output JSON.`
      : undefined;
    const result = await this.analyzeImage({ image, type: "homework", prompt: customPrompt });
    return result as HomeworkCheckResult;
  }
  
  // Analyze diagram
  async analyzeDiagram(image: File | Blob | string, subject?: string): Promise<DiagramAnalysisResult> {
    const customPrompt = subject
      ? `Analyze this ${subject} diagram. Identify parts, explain concepts. Output JSON.`
      : undefined;
    const result = await this.analyzeImage({ image, type: "diagram", prompt: customPrompt });
    return result as DiagramAnalysisResult;
  }
  
  // Scan textbook page
  async scanTextbook(image: File | Blob | string): Promise<OCRResult> {
    const result = await this.analyzeImage({ image, type: "textbook" });
    return result as OCRResult;
  }
  
  // Read handwriting
  async readHandwriting(image: File | Blob | string): Promise<OCRResult> {
    const result = await this.analyzeImage({ image, type: "handwriting" });
    return result as OCRResult;
  }
}

// ==================== IMAGE TO VIDEO SERVICE ====================

export class ImageToVideoService {
  // Generate educational video from images
  // Note: Full video generation requires external services (Runway, Pika, D-ID, etc.)
  // This provides a framework for integration
  
  async generateVideo(options: VideoGenerationOptions): Promise<VideoResult> {
    const { images, script, duration = 5, style = "educational", voiceover = true, language = "gu" } = options;
    
    // For now, return a placeholder - integrate with actual video API
    // Options: Runway ML, Pika Labs, D-ID (for avatar videos), Lumen5
    
    throw new Error(
      "Video generation requires integration with external services. " +
      "Configure RUNWAY_API_KEY, PIKA_API_KEY, or DID_API_KEY. " +
      "Alternatively, use the client-side canvas-based slideshow generator."
    );
  }
  
  // Client-side slideshow generator (canvas-based)
  async generateSlideshow(
    images: string[],
    options: {
      duration: number;
      transition: "fade" | "slide" | "none";
      music?: string;
    }
  ): Promise<Blob> {
    if (typeof window === "undefined") {
      throw new Error("Slideshow generation only available in browser");
    }
    
    // This would use canvas API and MediaRecorder
    // Implementation for browser-side video creation
    
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) throw new Error("Canvas context not available");
    
    const stream = (canvas as HTMLCanvasElement & { captureStream: (fps: number) => MediaStream }).captureStream(30);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    
    return new Promise((resolve, reject) => {
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        resolve(blob);
      };
      
      mediaRecorder.onerror = reject;
      mediaRecorder.start();
      
      // Render images sequentially
      let currentIndex = 0;
      const renderFrame = async () => {
        if (currentIndex >= images.length) {
          mediaRecorder.stop();
          return;
        }
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Calculate dimensions to fit while maintaining aspect ratio
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          currentIndex++;
          setTimeout(renderFrame, options.duration * 1000);
        };
        img.src = images[currentIndex];
      };
      
      renderFrame();
    });
  }
  
  // Generate educational content script for video
  async generateVideoScript(
    topic: string,
    options: { class: number; subject: string; duration: number; language: "gu" | "hi" | "en" }
  ): Promise<{ script: string; scriptGu: string; scenes: { description: string; narration: string }[] }> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const prompt = options.language === "gu"
      ? `ધોરણ ${options.class} ${options.subject} માટે "${topic}" વિષય પર ${options.duration} સેકન્ડનું શૈક્ષણિક વિડિઓ સ્ક્રિપ્ટ બનાવો. JSON ફોર્મેટમાં આઉટપુટ: {"script": "full script", "scriptGu": "gujarati script", "scenes": [{"description": "visual description", "narration": "what to say"}]}`
      : `Create a ${options.duration} second educational video script for Class ${options.class} ${options.subject} on "${topic}". Output in JSON: {"script": "full script", "scriptGu": "gujarati script", "scenes": [{"description": "visual description", "narration": "what to say"}]}`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Script generation failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Return basic structure
    }
    
    return {
      script: content,
      scriptGu: content,
      scenes: [{ description: "Educational content", narration: content }],
    };
  }
}

// Singleton instances
export const visionService = new VisionService();
export const videoService = new ImageToVideoService();
