// AI Module Index for GYAANSETU.AI
// Complete AI Services Layer

// Core configuration
export * from "./config";

// Chat and conversation services
export * from "./chat-service";

// Basic RAG engine
export * from "./rag-engine";

// Advanced RAG with vector search (ChromaDB-style)
export * from "./rag-engine-advanced";

// API handlers
export * from "./api-handler";

// Speech services (Text-to-Speech, Speech-to-Text)
export * from "./speech-services";

// Vision services (Image-to-Text, OCR, Image analysis)
export * from "./vision-services";

// Agent system (AutoGPT-style task automation)
export * from "./agent-system";

// Content generation (Blog, Study notes)
export * from "./content-generation";

// ==================== CONVENIENCE EXPORTS ====================

import { chatService } from "./chat-service";
import { ragEngine } from "./rag-engine-advanced";
import { ttsService, sttService, voiceInterface } from "./speech-services";
import { visionService, videoService } from "./vision-services";
import { 
  educationalAgent, 
  lessonPlanningAgent, 
  safetyAgent, 
  quizGenerationAgent,
  homeworkHelperAgent 
} from "./agent-system";
import { blogService } from "./content-generation";

// Unified AI service facade
export const gyaansetuAI = {
  // Chat & Conversation
  chat: chatService,
  
  // Knowledge & RAG
  rag: ragEngine,
  
  // Voice Interface
  voice: {
    tts: ttsService,
    stt: sttService,
    interface: voiceInterface,
  },
  
  // Vision & Image Processing
  vision: visionService,
  video: videoService,
  
  // AI Agents
  agents: {
    general: educationalAgent,
    lessonPlanning: lessonPlanningAgent,
    safety: safetyAgent,
    quiz: quizGenerationAgent,
    homework: homeworkHelperAgent,
  },
  
  // Content Generation
  content: blogService,
};

export default gyaansetuAI;
