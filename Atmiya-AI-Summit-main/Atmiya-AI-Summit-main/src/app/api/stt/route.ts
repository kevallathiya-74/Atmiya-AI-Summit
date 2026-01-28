// Speech-to-Text API Route for GYAANSETU.AI
// Handles audio transcription with Gujarati support

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audio = formData.get("audio") as File;
    const language = (formData.get("language") as string) || "gu";
    const prompt = formData.get("prompt") as string | null;
    
    if (!audio) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    
    // Prepare form data for OpenAI Whisper
    const openaiFormData = new FormData();
    openaiFormData.append("file", audio);
    openaiFormData.append("model", "whisper-1");
    openaiFormData.append("response_format", "verbose_json");
    
    // Set language hint
    const languageCode = language === "gu" ? "gu" : language === "hi" ? "hi" : "en";
    openaiFormData.append("language", languageCode);
    
    // Add context prompt for better recognition
    const contextPrompt = prompt || (
      language === "gu" 
        ? "ગુજરાતી શૈક્ષણિક વિષયવસ્તુ, ગણિત, વિજ્ઞાન, GSEB અભ્યાસક્રમ"
        : language === "hi"
        ? "हिंदी शैक्षिक सामग्री, गणित, विज्ञान"
        : "Educational content, mathematics, science, GSEB curriculum"
    );
    openaiFormData.append("prompt", contextPrompt);
    
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: openaiFormData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Transcription failed", details: errorData },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      text: data.text,
      language: data.language || languageCode,
      duration: data.duration,
      segments: data.segments?.map((seg: { text: string; start: number; end: number }) => ({
        text: seg.text,
        start: seg.start,
        end: seg.end,
      })),
    });
    
  } catch (error) {
    console.error("STT Error:", error);
    return NextResponse.json(
      { error: "Failed to process speech-to-text" },
      { status: 500 }
    );
  }
}
