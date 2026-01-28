// Blog & Content Generation Service for GYAANSETU.AI
// Based on adse/blog_generation_using_llama2-main patterns
// Educational content, study notes, and article generation

import { AI_CONFIG } from "./config";

// ==================== TYPES ====================

export interface BlogGenerationOptions {
  topic: string;
  topicGu?: string;
  style: "educational" | "storytelling" | "technical" | "simple";
  targetAudience: "students" | "teachers" | "parents" | "general";
  class?: number;
  subject?: string;
  wordCount?: number;
  language: "gu" | "en" | "both";
  includeImages?: boolean;
  includeSummary?: boolean;
  includeQuiz?: boolean;
}

export interface GeneratedBlog {
  title: string;
  titleGu: string;
  content: string;
  contentGu: string;
  summary?: string;
  summaryGu?: string;
  keyPoints: string[];
  keyPointsGu: string[];
  tags: string[];
  readingTime: number; // minutes
  quiz?: {
    question: string;
    questionGu: string;
    options: string[];
    optionsGu: string[];
    correctAnswer: number;
  }[];
  relatedTopics: string[];
  createdAt: Date;
}

export interface StudyNotesOptions {
  subject: string;
  class: number;
  chapter: string;
  topics: string[];
  board: string;
  noteType: "summary" | "detailed" | "exam-focused" | "revision";
  language: "gu" | "en" | "both";
}

export interface GeneratedStudyNotes {
  title: string;
  titleGu: string;
  subject: string;
  class: number;
  chapter: string;
  sections: {
    heading: string;
    headingGu: string;
    content: string;
    contentGu: string;
    keyPoints: string[];
    keyPointsGu: string[];
    formulas?: string[];
    diagrams?: string[];
  }[];
  importantTerms: {
    term: string;
    termGu: string;
    definition: string;
    definitionGu: string;
  }[];
  quickRevision: string[];
  quickRevisionGu: string[];
  practiceQuestions: {
    question: string;
    questionGu: string;
    answer: string;
    answerGu: string;
  }[];
  createdAt: Date;
}

// ==================== PROMPTS ====================

const BLOG_STYLE_PROMPTS = {
  educational: {
    gu: "શૈક્ષણિક શૈલીમાં લખો. સ્પષ્ટ સમજૂતી, ઉદાહરણો અને વ્યવહારિક ઉપયોગો સમાવો.",
    en: "Write in educational style. Include clear explanations, examples, and practical applications.",
  },
  storytelling: {
    gu: "વાર્તા શૈલીમાં લખો. રસપ્રદ ઉદાહરણો અને વાસ્તવિક જીવનની પરિસ્થિતિઓ વાપરો.",
    en: "Write in storytelling style. Use engaging examples and real-life scenarios.",
  },
  technical: {
    gu: "તકનીકી શૈલીમાં લખો. સચોટ પરિભાષા અને વિગતવાર સમજૂતી આપો.",
    en: "Write in technical style. Use precise terminology and detailed explanations.",
  },
  simple: {
    gu: "સરળ ભાષામાં લખો. મૂળભૂત ખ્યાલોથી શરૂ કરો અને ધીમે ધીમે આગળ વધો.",
    en: "Write in simple language. Start with basic concepts and build gradually.",
  },
};

const AUDIENCE_PROMPTS = {
  students: {
    gu: "વિદ્યાર્થીઓ માટે લખો. રસપ્રદ અને સમજવામાં સરળ રાખો.",
    en: "Write for students. Keep it interesting and easy to understand.",
  },
  teachers: {
    gu: "શિક્ષકો માટે લખો. શીખવવાની પદ્ધતિઓ અને ટિપ્સ સમાવો.",
    en: "Write for teachers. Include teaching methodologies and tips.",
  },
  parents: {
    gu: "માતાપિતા માટે લખો. બાળકોને કેવી રીતે મદદ કરવી તે સમજાવો.",
    en: "Write for parents. Explain how to help children learn.",
  },
  general: {
    gu: "સામાન્ય વાચકો માટે લખો. સુલભ અને માહિતીપ્રદ રાખો.",
    en: "Write for general audience. Keep it accessible and informative.",
  },
};

// ==================== BLOG GENERATION SERVICE ====================

export class BlogGenerationService {
  // Generate educational blog post
  async generateBlog(options: BlogGenerationOptions): Promise<GeneratedBlog> {
    const {
      topic,
      style,
      targetAudience,
      class: classLevel,
      subject,
      wordCount = 800,
      language,
      includeSummary = true,
      includeQuiz = false,
    } = options;
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const stylePrompt = BLOG_STYLE_PROMPTS[style][language === "gu" ? "gu" : "en"];
    const audiencePrompt = AUDIENCE_PROMPTS[targetAudience][language === "gu" ? "gu" : "en"];
    
    const contextInfo = classLevel && subject
      ? `For Class ${classLevel} ${subject} students. GSEB curriculum.`
      : "";
    
    const prompt = `Create an educational blog post about: "${topic}"

${contextInfo}
${stylePrompt}
${audiencePrompt}

Requirements:
- Word count: approximately ${wordCount} words
- Language: ${language === "both" ? "Both English and Gujarati" : language === "gu" ? "Gujarati" : "English"}
${includeSummary ? "- Include a brief summary" : ""}
${includeQuiz ? "- Include 3 quiz questions at the end" : ""}

Output as JSON:
{
  "title": "English title",
  "titleGu": "ગુજરાતી શીર્ષક",
  "content": "Full blog content in English",
  "contentGu": "સંપૂર્ણ બ્લોગ સામગ્રી ગુજરાતીમાં",
  "summary": "Brief summary",
  "summaryGu": "ટૂંકો સારાંશ",
  "keyPoints": ["key point 1", "key point 2"],
  "keyPointsGu": ["મુખ્ય મુદ્દો 1", "મુખ્ય મુદ્દો 2"],
  "tags": ["tag1", "tag2"],
  "relatedTopics": ["related topic 1", "related topic 2"]
  ${includeQuiz ? `, "quiz": [{"question": "", "questionGu": "", "options": [], "optionsGu": [], "correctAnswer": 0}]` : ""}
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
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Blog generation failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...parsed,
          readingTime: Math.ceil(wordCount / 200), // Average reading speed
          createdAt: new Date(),
        };
      }
    } catch {
      // Return basic structure
    }
    
    return {
      title: topic,
      titleGu: options.topicGu || topic,
      content: content,
      contentGu: content,
      keyPoints: [],
      keyPointsGu: [],
      tags: [],
      readingTime: Math.ceil(wordCount / 200),
      relatedTopics: [],
      createdAt: new Date(),
    };
  }
  
  // Generate study notes
  async generateStudyNotes(options: StudyNotesOptions): Promise<GeneratedStudyNotes> {
    const {
      subject,
      class: classLevel,
      chapter,
      topics,
      board,
      noteType,
      language,
    } = options;
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const noteTypeDescriptions = {
      summary: "concise summary with key points",
      detailed: "comprehensive detailed notes with examples",
      "exam-focused": "exam-oriented notes with important questions and answers",
      revision: "quick revision notes with formulas and key facts",
    };
    
    const prompt = `Create ${noteTypeDescriptions[noteType]} for:

Subject: ${subject}
Class: ${classLevel}
Board: ${board}
Chapter: ${chapter}
Topics: ${topics.join(", ")}

Language: ${language === "both" ? "Both English and Gujarati" : language === "gu" ? "Gujarati" : "English"}

Output as JSON:
{
  "title": "Notes title",
  "titleGu": "નોટ્સ શીર્ષક",
  "subject": "${subject}",
  "class": ${classLevel},
  "chapter": "${chapter}",
  "sections": [
    {
      "heading": "Section heading",
      "headingGu": "વિભાગ શીર્ષક",
      "content": "Section content",
      "contentGu": "વિભાગ સામગ્રી",
      "keyPoints": ["point 1"],
      "keyPointsGu": ["મુદ્દો 1"],
      "formulas": ["formula if applicable"]
    }
  ],
  "importantTerms": [
    {
      "term": "Term",
      "termGu": "શબ્દ",
      "definition": "Definition",
      "definitionGu": "વ્યાખ્યા"
    }
  ],
  "quickRevision": ["revision point 1"],
  "quickRevisionGu": ["પુનરાવર્તન મુદ્દો 1"],
  "practiceQuestions": [
    {
      "question": "Question",
      "questionGu": "પ્રશ્ન",
      "answer": "Answer",
      "answerGu": "જવાબ"
    }
  ]
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
        temperature: 0.6,
        max_tokens: 4000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Study notes generation failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          ...parsed,
          createdAt: new Date(),
        };
      }
    } catch {
      // Return basic structure
    }
    
    return {
      title: `${chapter} - ${noteType} Notes`,
      titleGu: `${chapter} - ${noteType} નોટ્સ`,
      subject,
      class: classLevel,
      chapter,
      sections: [],
      importantTerms: [],
      quickRevision: [],
      quickRevisionGu: [],
      practiceQuestions: [],
      createdAt: new Date(),
    };
  }
  
  // Generate lesson explanation
  async explainConcept(
    concept: string,
    options: {
      class: number;
      subject: string;
      complexity: "simple" | "medium" | "advanced";
      includeExamples: boolean;
      language: "gu" | "en" | "both";
    }
  ): Promise<{
    explanation: string;
    explanationGu: string;
    examples: string[];
    examplesGu: string[];
    analogies: string[];
    analogiesGu: string[];
    commonMistakes: string[];
    commonMistakesGu: string[];
  }> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const prompt = `Explain the concept "${concept}" for Class ${options.class} ${options.subject} students.

Complexity level: ${options.complexity}
${options.includeExamples ? "Include practical examples and real-life analogies." : ""}

Output as JSON:
{
  "explanation": "Clear explanation in English",
  "explanationGu": "ગુજરાતીમાં સ્પષ્ટ સમજૂતી",
  "examples": ["example 1", "example 2"],
  "examplesGu": ["ઉદાહરણ 1", "ઉદાહરણ 2"],
  "analogies": ["real-life analogy 1"],
  "analogiesGu": ["વાસ્તવિક જીવન સાદૃશ્ય 1"],
  "commonMistakes": ["common mistake students make"],
  "commonMistakesGu": ["વિદ્યાર્થીઓની સામાન્ય ભૂલો"]
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
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Concept explanation failed: ${response.statusText}`);
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
      explanation: content,
      explanationGu: content,
      examples: [],
      examplesGu: [],
      analogies: [],
      analogiesGu: [],
      commonMistakes: [],
      commonMistakesGu: [],
    };
  }
}

// Singleton instance
export const blogService = new BlogGenerationService();
