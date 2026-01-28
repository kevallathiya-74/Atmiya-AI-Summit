// Agent API Route for GYAANSETU.AI
// AutoGPT-style task automation for educational tasks

import { NextRequest, NextResponse } from "next/server";

type AgentType = "lesson-plan" | "quiz" | "homework" | "safety" | "explain" | "custom";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      agentType,
      task,
      params,
      language = "gu"
    } = body as {
      agentType: AgentType;
      task?: string;
      params: Record<string, unknown>;
      language?: "gu" | "en";
    };
    
    const ollamaKey = process.env.OLLAMA_API_KEY;
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!ollamaKey && !openaiKey) {
      return NextResponse.json(
        { error: "No AI API key configured. Set OLLAMA_API_KEY or OPENAI_API_KEY" },
        { status: 500 }
      );
    }
    
    // Use Ollama key if available, otherwise fallback to OpenAI
    const apiKey = ollamaKey || openaiKey || '';
    const useOllama = !!ollamaKey;
    
    let result;
    
    switch (agentType) {
      case "lesson-plan":
        result = await generateLessonPlan(params, language, apiKey, useOllama, ollamaBaseUrl);
        break;
      case "quiz":
        result = await generateQuiz(params, language, apiKey, useOllama, ollamaBaseUrl);
        break;
      case "homework":
        result = await checkHomework(params, language, apiKey, useOllama, ollamaBaseUrl);
        break;
      case "safety":
        result = await checkSafety(params, apiKey, useOllama, ollamaBaseUrl);
        break;
      case "explain":
        result = await explainConcept(params, language, apiKey, useOllama, ollamaBaseUrl);
        break;
      case "custom":
        result = await executeCustomTask(task || "", params, language, apiKey, useOllama, ollamaBaseUrl);
        break;
      default:
        return NextResponse.json(
          { error: "Unknown agent type" },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      agentType,
      result,
      language,
    });
    
  } catch (error) {
    console.error("Agent API Error:", error);
    return NextResponse.json(
      { error: "Agent task failed" },
      { status: 500 }
    );
  }
}

// Generate comprehensive lesson plan
async function generateLessonPlan(
  params: Record<string, unknown>, 
  language: "gu" | "en",
  apiKey: string,
  useOllama: boolean,
  ollamaBaseUrl: string
) {
  const { subject, classLevel, chapter, topic, duration, board } = params;
  
  const prompt = language === "gu"
    ? `ધોરણ ${classLevel} ${subject} માટે વિગતવાર પાઠ યોજના બનાવો.
પ્રકરણ: ${chapter}
વિષય: ${topic}
સમયગાળો: ${duration} મિનિટ
બોર્ડ: ${board || "GSEB"}

JSON ફોર્મેટમાં આઉટપુટ:
{
  "title": "Lesson title",
  "titleGu": "પાઠનું શીર્ષક",
  "objectives": ["objective 1"],
  "objectivesGu": ["ઉદ્દેશ 1"],
  "introduction": "How to introduce the topic (5 min)",
  "introductionGu": "વિષય કેવી રીતે રજૂ કરવો",
  "mainContent": "Main teaching content",
  "mainContentGu": "મુખ્ય શિક્ષણ સામગ્રી",
  "activities": ["activity 1"],
  "activitiesGu": ["પ્રવૃત્તિ 1"],
  "assessment": "How to assess understanding",
  "assessmentGu": "સમજણ કેવી રીતે ચકાસવી",
  "homework": "Homework assignment",
  "homeworkGu": "ગૃહકાર્ય",
  "resources": ["teaching aids needed"],
  "boardContent": "What to write on blackboard"
}`
    : `Create a detailed lesson plan for Class ${classLevel} ${subject}.
Chapter: ${chapter}
Topic: ${topic}
Duration: ${duration} minutes
Board: ${board || "GSEB"}

Output in JSON format:
{
  "title": "Lesson title",
  "titleGu": "પાઠનું શીર્ષક",
  "objectives": ["objective 1"],
  "objectivesGu": ["ઉદ્દેશ 1"],
  "introduction": "How to introduce the topic (5 min)",
  "introductionGu": "વિષય કેવી રીતે રજૂ કરવો",
  "mainContent": "Main teaching content",
  "mainContentGu": "મુખ્ય શિક્ષણ સામગ્રી",
  "activities": ["activity 1"],
  "activitiesGu": ["પ્રવૃત્તિ 1"],
  "assessment": "How to assess understanding",
  "assessmentGu": "સમજણ કેવી રીતે ચકાસવી",
  "homework": "Homework assignment",
  "homeworkGu": "ગૃહકાર્ય",
  "resources": ["teaching aids needed"],
  "boardContent": "What to write on blackboard"
}`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl);
}

// Generate quiz questions
async function generateQuiz(
  params: Record<string, unknown>, 
  language: "gu" | "en",
  apiKey: string,
  useOllama: boolean,
  ollamaBaseUrl: string
) {
  const { subject, classLevel, chapter, topics, questionCount, difficulty, questionTypes } = params;
  
  const typesStr = Array.isArray(questionTypes) ? questionTypes.join(", ") : "mcq, short, truefalse";
  const topicsStr = Array.isArray(topics) ? topics.join(", ") : topics;
  
  const prompt = language === "gu"
    ? `ધોરણ ${classLevel} ${subject} માટે ક્વિઝ બનાવો.
પ્રકરણ: ${chapter}
વિષયો: ${topicsStr}
પ્રશ્નોની સંખ્યા: ${questionCount}
મુશ્કેલી: ${difficulty}
પ્રશ્ન પ્રકારો: ${typesStr}

JSON ફોર્મેટમાં આઉટપુટ:
{
  "title": "Quiz title",
  "titleGu": "ક્વિઝ શીર્ષક",
  "totalMarks": number,
  "duration": number (in minutes),
  "questions": [
    {
      "type": "mcq|short|long|truefalse|fill",
      "question": "Question in English",
      "questionGu": "પ્રશ્ન ગુજરાતીમાં",
      "options": ["option 1", "option 2"] (for MCQ only),
      "optionsGu": ["વિકલ્પ 1", "વિકલ્પ 2"],
      "answer": "correct answer",
      "answerGu": "સાચો જવાબ",
      "marks": number,
      "explanation": "why this is correct",
      "explanationGu": "આ શા માટે સાચું છે"
    }
  ]
}`
    : `Create a quiz for Class ${classLevel} ${subject}.
Chapter: ${chapter}
Topics: ${topicsStr}
Number of questions: ${questionCount}
Difficulty: ${difficulty}
Question types: ${typesStr}

Output in JSON format with the same structure.`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl, 3000);
}

// Check homework (from text description)
async function checkHomework(
  params: Record<string, unknown>, 
  language: "gu" | "en",
  apiKey: string,
  useOllama: boolean,
  ollamaBaseUrl: string
) {
  const { homeworkText, subject, expectedAnswers } = params;
  
  const prompt = language === "gu"
    ? `આ ${subject} ગૃહકાર્ય તપાસો:

${homeworkText}

${expectedAnswers ? `અપેક્ષિત જવાબો: ${expectedAnswers}` : ""}

JSON ફોર્મેટમાં આઉટપુટ:
{
  "score": 0-100,
  "isCorrect": boolean,
  "feedback": "Overall feedback",
  "feedbackGu": "એકંદર પ્રતિસાદ",
  "corrections": [
    {
      "problem": "Which problem",
      "original": "Student's answer",
      "correct": "Correct answer",
      "explanation": "Why it's wrong and how to fix",
      "explanationGu": "ગુજરાતીમાં સમજૂતી"
    }
  ],
  "strengths": ["what student did well"],
  "strengthsGu": ["વિદ્યાર્થીએ શું સારું કર્યું"],
  "improvements": ["areas to improve"],
  "improvementsGu": ["સુધારવા માટેના ક્ષેત્રો"]
}`
    : `Check this ${subject} homework:

${homeworkText}

${expectedAnswers ? `Expected answers: ${expectedAnswers}` : ""}

Output detailed feedback in JSON format.`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl);
}

// Content safety check
async function checkSafety(params: Record<string, unknown>, apiKey: string, useOllama: boolean, ollamaBaseUrl: string) {
  const { content, targetAge } = params;
  
  const prompt = `Analyze the following educational content for safety and age-appropriateness.
Target age: ${targetAge || 12} years

Content to check:
${content}

Check for:
1. Inappropriate language or content
2. Accuracy of educational information
3. Age-appropriate complexity
4. Cultural sensitivity for Indian/Gujarati students
5. Any harmful or misleading information

Output as JSON:
{
  "isSafe": boolean,
  "contentRating": "safe|caution|unsafe",
  "ageAppropriate": boolean,
  "concerns": ["list of concerns if any"],
  "concernsGu": ["ચિંતાઓની યાદી"],
  "recommendations": ["suggestions for improvement"],
  "recommendationsGu": ["સુધારણા માટેના સૂચનો"],
  "accuracy": {
    "isAccurate": boolean,
    "issues": ["any factual errors"]
  }
}`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl);
}

// Explain a concept
async function explainConcept(
  params: Record<string, unknown>, 
  language: "gu" | "en",
  apiKey: string,
  useOllama: boolean,
  ollamaBaseUrl: string
) {
  const { concept, classLevel, subject, complexity } = params;
  
  const prompt = language === "gu"
    ? `ધોરણ ${classLevel} ${subject} વિદ્યાર્થીઓ માટે "${concept}" સમજાવો.
જટિલતા સ્તર: ${complexity || "medium"}

JSON ફોર્મેટમાં આઉટપુટ:
{
  "explanation": "Clear explanation in English",
  "explanationGu": "ગુજરાતીમાં સ્પષ્ટ સમજૂતી",
  "keyPoints": ["key point 1"],
  "keyPointsGu": ["મુખ્ય મુદ્દો 1"],
  "examples": [
    {
      "example": "Example description",
      "exampleGu": "ઉદાહરણ વર્ણન"
    }
  ],
  "analogies": [
    {
      "analogy": "Real-life comparison",
      "analogyGu": "વાસ્તવિક જીવન સરખામણી"
    }
  ],
  "commonMistakes": ["mistake students often make"],
  "commonMistakesGu": ["વિદ્યાર્થીઓ ઘણીવાર કરે છે તે ભૂલ"],
  "practiceProblems": [
    {
      "problem": "Practice problem",
      "problemGu": "અભ્યાસ સમસ્યા",
      "solution": "Solution",
      "solutionGu": "ઉકેલ"
    }
  ]
}`
    : `Explain "${concept}" for Class ${classLevel} ${subject} students.
Complexity level: ${complexity || "medium"}

Output detailed explanation in JSON format.`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl, 2500);
}

// Execute custom task
async function executeCustomTask(
  task: string,
  params: Record<string, unknown>,
  language: "gu" | "en",
  apiKey: string,
  useOllama: boolean,
  ollamaBaseUrl: string
) {
  const prompt = language === "gu"
    ? `તમે GYAANSETU AI એજન્ટ છો. નીચેનું કાર્ય કરો:

કાર્ય: ${task}

પરિમાણો: ${JSON.stringify(params)}

ગુજરાતી અને અંગ્રેજી બંનેમાં JSON ફોર્મેટમાં વિગતવાર પરિણામ આપો.`
    : `You are GYAANSETU AI agent. Perform the following task:

Task: ${task}

Parameters: ${JSON.stringify(params)}

Provide detailed result in JSON format with both English and Gujarati content.`;
  
  return callAI(prompt, apiKey, useOllama, ollamaBaseUrl, 2000);
}

// Helper function to call AI (Ollama Cloud or OpenAI)
async function callAI(prompt: string, apiKey: string, useOllama: boolean, ollamaBaseUrl: string, maxTokens = 2000) {
  const systemPrompt = "You are GYAANSETU AI, an educational assistant for Gujarati students. Always provide accurate, age-appropriate educational content. Output valid JSON when requested.";
  
  if (useOllama) {
    try {
      const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama2",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ],
          stream: false,
          options: {
            temperature: 0.7,
          },
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const content = data.message?.content || data.response;
        
        // Try to parse JSON
        try {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        } catch {
          // JSON parsing failed
        }
        
        return { text: content, raw: true };
      }
    } catch (ollamaError) {
      console.error("Ollama API error:", ollamaError);
      // Fall through to OpenAI if available
    }
  }
  
  // Fallback to OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Try to parse JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // JSON parsing failed
  }
  
  return { text: content, raw: true };
}
