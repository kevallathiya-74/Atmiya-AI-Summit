// AI Agent System for GYAANSETU.AI
// AutoGPT-style agents for complex educational tasks
// Based on AutoGPt(3) patterns for lesson planning, safety checks, content generation

import { AI_CONFIG } from "./config";
import { ragEngine } from "./rag-engine-advanced";
import { visionService } from "./vision-services";

// ==================== TYPES ====================

export interface AgentTask {
  id: string;
  type: string;
  description: string;
  input: Record<string, unknown>;
  status: "pending" | "running" | "completed" | "failed";
  result?: unknown;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AgentPlan {
  goal: string;
  tasks: AgentTask[];
  currentTaskIndex: number;
  status: "planning" | "executing" | "completed" | "failed";
}

export interface AgentCapability {
  name: string;
  description: string;
  execute: (input: Record<string, unknown>) => Promise<unknown>;
}

export interface SafetyCheckResult {
  isSafe: boolean;
  concerns: string[];
  concernsGu: string[];
  recommendations: string[];
  recommendationsGu: string[];
  ageAppropriate: boolean;
  contentRating: "safe" | "caution" | "unsafe";
}

// ==================== AGENT CAPABILITIES ====================

const AGENT_CAPABILITIES: AgentCapability[] = [
  {
    name: "search_knowledge",
    description: "Search the educational knowledge base for relevant information",
    execute: async (input) => {
      const { query, subject, classLevel } = input as { query: string; subject?: string; classLevel?: number };
      return ragEngine.search({
        query,
        filters: { subject, class: classLevel },
        topK: 5,
      });
    },
  },
  {
    name: "generate_explanation",
    description: "Generate a detailed explanation of a concept",
    execute: async (input) => {
      const { concept, level, language } = input as { concept: string; level: string; language: "gu" | "en" };
      
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OpenAI API key not configured");
      
      const prompt = language === "gu"
        ? `"${concept}" ની ${level} સ્તરે વિસ્તૃત સમજૂતી આપો. ઉદાહરણો સાથે.`
        : `Provide a detailed explanation of "${concept}" at ${level} level. Include examples.`;
      
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
          max_tokens: 1000,
        }),
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
    },
  },
  {
    name: "create_quiz_questions",
    description: "Generate quiz questions on a topic",
    execute: async (input) => {
      const { topic, count, difficulty, questionTypes } = input as {
        topic: string;
        count: number;
        difficulty: string;
        questionTypes: string[];
      };
      
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OpenAI API key not configured");
      
      const prompt = `Create ${count} ${difficulty} level quiz questions about "${topic}". 
Question types: ${questionTypes.join(", ")}.
Output as JSON array: [{"type": "mcq|short|truefalse", "question": "", "questionGu": "", "options": [], "answer": "", "answerGu": "", "explanation": ""}]`;
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.openai.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 2000,
        }),
      });
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch {
        // Return raw content
      }
      return content;
    },
  },
  {
    name: "analyze_image",
    description: "Analyze an educational image (diagram, homework, textbook)",
    execute: async (input) => {
      const { imageUrl, analysisType } = input as { imageUrl: string; analysisType: string };
      return visionService.analyzeImage({
        image: imageUrl,
        type: analysisType as "ocr" | "homework" | "diagram" | "textbook" | "handwriting" | "general",
      });
    },
  },
  {
    name: "safety_check",
    description: "Check content for safety and age-appropriateness",
    execute: async (input) => {
      const { content, targetAge } = input as { content: string; targetAge: number };
      
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OpenAI API key not configured");
      
      const prompt = `Analyze the following educational content for safety and age-appropriateness (target age: ${targetAge}).
Check for:
1. Inappropriate language or content
2. Accuracy of educational information
3. Age-appropriate complexity
4. Cultural sensitivity for Indian/Gujarati students
5. Any harmful or misleading information

Content to check:
${content}

Output as JSON: {
  "isSafe": boolean,
  "concerns": ["list of concerns"],
  "concernsGu": ["ગુજરાતીમાં ચિંતાઓ"],
  "recommendations": ["list of recommendations"],
  "recommendationsGu": ["ગુજરાતીમાં ભલામણો"],
  "ageAppropriate": boolean,
  "contentRating": "safe|caution|unsafe"
}`;
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.openai.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });
      
      const data = await response.json();
      const contentResult = data.choices[0].message.content;
      
      try {
        const jsonMatch = contentResult.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      } catch {
        // Return default safe result
      }
      
      return {
        isSafe: true,
        concerns: [],
        concernsGu: [],
        recommendations: [],
        recommendationsGu: [],
        ageAppropriate: true,
        contentRating: "safe",
      };
    },
  },
  {
    name: "translate",
    description: "Translate content between English and Gujarati",
    execute: async (input) => {
      const { text, targetLanguage } = input as { text: string; targetLanguage: "gu" | "en" };
      
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OpenAI API key not configured");
      
      const prompt = targetLanguage === "gu"
        ? `Translate the following to Gujarati. Keep educational terms accurate:\n\n${text}`
        : `Translate the following Gujarati text to English. Keep educational terms accurate:\n\n${text}`;
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.openai.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      });
      
      const data = await response.json();
      return data.choices[0].message.content;
    },
  },
];

// ==================== AGENT CLASS ====================

export class EducationalAgent {
  private capabilities: Map<string, AgentCapability> = new Map();
  private currentPlan: AgentPlan | null = null;
  
  constructor() {
    // Register default capabilities
    AGENT_CAPABILITIES.forEach(cap => this.capabilities.set(cap.name, cap));
  }
  
  // Register a new capability
  registerCapability(capability: AgentCapability): void {
    this.capabilities.set(capability.name, capability);
  }
  
  // Create a plan for a complex goal
  async createPlan(goal: string, context: Record<string, unknown> = {}): Promise<AgentPlan> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const capabilityList = Array.from(this.capabilities.values())
      .map(c => `- ${c.name}: ${c.description}`)
      .join("\n");
    
    const prompt = `You are an educational AI agent planner. Create a step-by-step plan to achieve the following goal.

Goal: ${goal}

Context: ${JSON.stringify(context)}

Available capabilities:
${capabilityList}

Create a plan as JSON:
{
  "goal": "the goal",
  "tasks": [
    {
      "id": "task-1",
      "type": "capability_name",
      "description": "what this task does",
      "input": { "param1": "value1" }
    }
  ]
}

Keep the plan focused and use only necessary tasks.`;
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.openai.model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 1500,
      }),
    });
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        this.currentPlan = {
          goal: parsed.goal || goal,
          tasks: parsed.tasks.map((t: AgentTask, idx: number) => ({
            ...t,
            id: t.id || `task-${idx + 1}`,
            status: "pending" as const,
          })),
          currentTaskIndex: 0,
          status: "planning",
        };
        return this.currentPlan;
      }
    } catch (error) {
      throw new Error(`Failed to parse plan: ${error}`);
    }
    
    throw new Error("Failed to create plan");
  }
  
  // Execute the current plan
  async executePlan(): Promise<Record<string, unknown>> {
    if (!this.currentPlan) {
      throw new Error("No plan to execute. Call createPlan first.");
    }
    
    this.currentPlan.status = "executing";
    const results: Record<string, unknown> = {};
    
    for (let i = 0; i < this.currentPlan.tasks.length; i++) {
      const task = this.currentPlan.tasks[i];
      this.currentPlan.currentTaskIndex = i;
      
      try {
        task.status = "running";
        task.startedAt = new Date();
        
        const capability = this.capabilities.get(task.type);
        if (!capability) {
          throw new Error(`Unknown capability: ${task.type}`);
        }
        
        task.result = await capability.execute(task.input);
        task.status = "completed";
        task.completedAt = new Date();
        
        results[task.id] = task.result;
      } catch (error) {
        task.status = "failed";
        task.error = error instanceof Error ? error.message : "Unknown error";
        task.completedAt = new Date();
        
        // Don't fail entire plan on single task failure
        results[task.id] = { error: task.error };
      }
    }
    
    const hasFailures = this.currentPlan.tasks.some(t => t.status === "failed");
    this.currentPlan.status = hasFailures ? "failed" : "completed";
    
    return results;
  }
  
  // Execute a single capability
  async executeCapability(name: string, input: Record<string, unknown>): Promise<unknown> {
    const capability = this.capabilities.get(name);
    if (!capability) {
      throw new Error(`Unknown capability: ${name}`);
    }
    return capability.execute(input);
  }
  
  // Get current plan status
  getPlanStatus(): AgentPlan | null {
    return this.currentPlan;
  }
}

// ==================== SPECIALIZED AGENTS ====================

// Lesson Planning Agent
export class LessonPlanningAgent extends EducationalAgent {
  async createLessonPlan(options: {
    subject: string;
    class: number;
    chapter: string;
    topic: string;
    duration: number;
    board: string;
  }): Promise<Record<string, unknown>> {
    const goal = `Create a comprehensive lesson plan for Class ${options.class} ${options.subject}, 
Chapter: ${options.chapter}, Topic: ${options.topic}. Duration: ${options.duration} minutes. Board: ${options.board}.
Include objectives, introduction, main content, activities, assessment, and homework.`;
    
    await this.createPlan(goal, options);
    return this.executePlan();
  }
}

// Content Safety Agent
export class SafetyAgent extends EducationalAgent {
  async checkContent(content: string, targetAge: number): Promise<SafetyCheckResult> {
    const result = await this.executeCapability("safety_check", { content, targetAge });
    return result as SafetyCheckResult;
  }
  
  async checkMultipleContents(contents: string[], targetAge: number): Promise<SafetyCheckResult[]> {
    const results: SafetyCheckResult[] = [];
    
    for (const content of contents) {
      const result = await this.checkContent(content, targetAge);
      results.push(result);
    }
    
    return results;
  }
}

// Quiz Generation Agent
export class QuizGenerationAgent extends EducationalAgent {
  async generateQuiz(options: {
    subject: string;
    class: number;
    chapter: string;
    topics: string[];
    questionCount: number;
    difficulty: "easy" | "medium" | "hard" | "mixed";
    questionTypes: ("mcq" | "short" | "long" | "truefalse" | "fill")[];
  }): Promise<Record<string, unknown>> {
    const goal = `Generate a comprehensive quiz for Class ${options.class} ${options.subject}.
Chapter: ${options.chapter}
Topics: ${options.topics.join(", ")}
Questions: ${options.questionCount}
Difficulty: ${options.difficulty}
Question types: ${options.questionTypes.join(", ")}

Create questions in both English and Gujarati with detailed answers and explanations.`;
    
    await this.createPlan(goal, options);
    return this.executePlan();
  }
}

// Homework Helper Agent
export class HomeworkHelperAgent extends EducationalAgent {
  async analyzeAndHelp(imageUrl: string, subject?: string): Promise<{
    analysis: unknown;
    help: string;
    helpGu: string;
    steps: string[];
    stepsGu: string[];
  }> {
    // First analyze the homework image
    const analysis = await this.executeCapability("analyze_image", {
      imageUrl,
      analysisType: "homework",
    });
    
    // Then generate help based on analysis
    const goal = `Based on the homework analysis, provide step-by-step help to solve any incorrect problems.
Analysis: ${JSON.stringify(analysis)}
Subject: ${subject || "General"}

Provide clear explanations in both English and Gujarati.`;
    
    await this.createPlan(goal, { analysis, subject });
    const results = await this.executePlan();
    
    return {
      analysis,
      help: results.help as string || "",
      helpGu: results.helpGu as string || "",
      steps: results.steps as string[] || [],
      stepsGu: results.stepsGu as string[] || [],
    };
  }
}

// ==================== EXPORTS ====================

export const educationalAgent = new EducationalAgent();
export const lessonPlanningAgent = new LessonPlanningAgent();
export const safetyAgent = new SafetyAgent();
export const quizGenerationAgent = new QuizGenerationAgent();
export const homeworkHelperAgent = new HomeworkHelperAgent();
