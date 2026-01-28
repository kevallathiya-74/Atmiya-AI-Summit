// Advanced RAG Engine for GYAANSETU.AI
// Based on adse/Chat with website - RAG Project and RAG_Tools_and_Tutorials_for_Educational_AI
// Implements ChromaDB-style vector storage with educational content retrieval

import { AI_CONFIG } from "./config";

// ==================== TYPES ====================

export interface RAGDocument {
  id: string;
  content: string;
  contentGu: string;
  metadata: {
    subject: string;
    class: number;
    chapter: string;
    topic: string;
    board: string;
    type: "lesson" | "question" | "explanation" | "notes" | "formula";
    difficulty: "easy" | "medium" | "hard";
    source?: string;
    createdAt: Date;
  };
  embedding?: number[];
}

export interface RAGQuery {
  query: string;
  queryGu?: string;
  filters?: {
    subject?: string;
    class?: number;
    chapter?: string;
    board?: string;
    type?: string;
  };
  topK?: number;
  minScore?: number;
}

export interface RAGResult {
  documents: RAGDocument[];
  scores: number[];
  context: string;
  contextGu: string;
}

export interface RAGChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ConversationContext {
  messages: RAGChatMessage[];
  documents: RAGDocument[];
  subject?: string;
  class?: number;
}

// ==================== VECTOR OPERATIONS ====================

// Simple cosine similarity for vector matching
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Generate embedding using OpenAI
async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key not configured");
  
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Embedding generation failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

// ==================== IN-MEMORY VECTOR STORE ====================
// For production, replace with Pinecone/ChromaDB

class VectorStore {
  private documents: Map<string, RAGDocument> = new Map();
  
  async addDocument(doc: RAGDocument): Promise<void> {
    // Generate embedding if not provided
    if (!doc.embedding) {
      doc.embedding = await generateEmbedding(doc.content);
    }
    this.documents.set(doc.id, doc);
  }
  
  async addDocuments(docs: RAGDocument[]): Promise<void> {
    for (const doc of docs) {
      await this.addDocument(doc);
    }
  }
  
  async search(query: string, options: {
    topK?: number;
    minScore?: number;
    filters?: RAGQuery["filters"];
  } = {}): Promise<{ RAGDocument: RAGDocument; score: number }[]> {
    const { topK = 5, minScore = 0.5, filters } = options;
    
    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);
    
    // Filter and score documents
    const results: { RAGDocument: RAGDocument; score: number }[] = [];
    
    this.documents.forEach((doc) => {
      // Apply filters
      if (filters) {
        if (filters.subject && doc.metadata.subject !== filters.subject) return;
        if (filters.class && doc.metadata.class !== filters.class) return;
        if (filters.chapter && doc.metadata.chapter !== filters.chapter) return;
        if (filters.board && doc.metadata.board !== filters.board) return;
        if (filters.type && doc.metadata.type !== filters.type) return;
      }
      
      // Calculate similarity
      if (doc.embedding) {
        const score = cosineSimilarity(queryEmbedding, doc.embedding);
        if (score >= minScore) {
          results.push({ RAGDocument: doc, score });
        }
      }
    });
    
    // Sort by score and return top K
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }
  
  getDocument(id: string): RAGDocument | undefined {
    return this.documents.get(id);
  }
  
  deleteDocument(id: string): boolean {
    return this.documents.delete(id);
  }
  
  clear(): void {
    this.documents.clear();
  }
  
  size(): number {
    return this.documents.size;
  }
}

// Global vector store instance
const vectorStore = new VectorStore();

// ==================== RAG PIPELINE ====================

export class RAGEngine {
  private conversationHistory: Map<string, ConversationContext> = new Map();
  
  // Initialize with GSEB educational content
  async initializeWithGSEBContent(): Promise<void> {
    const gsebContent: Omit<RAGDocument, "id" | "embedding">[] = [
      // Mathematics - Class 10
      {
        content: "Quadratic Equation: An equation of the form ax² + bx + c = 0, where a ≠ 0. The roots can be found using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant D = b²-4ac determines the nature of roots.",
        contentGu: "દ્વિઘાત સમીકરણ: ax² + bx + c = 0 સ્વરૂપનું સમીકરણ, જ્યાં a ≠ 0. મૂળ શોધવા માટે સૂત્ર: x = (-b ± √(b²-4ac)) / 2a. વિવેચક D = b²-4ac મૂળની પ્રકૃતિ નક્કી કરે છે.",
        metadata: {
          subject: "ગણિત",
          class: 10,
          chapter: "દ્વિઘાત સમીકરણો",
          topic: "દ્વિઘાત સૂત્ર",
          board: "GSEB",
          type: "formula",
          difficulty: "medium",
          createdAt: new Date(),
        },
      },
      {
        content: "Trigonometric Ratios: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent. For a right triangle, sin²θ + cos²θ = 1 (Pythagorean identity).",
        contentGu: "ત્રિકોણમિતિ ગુણોત્તર: sin θ = સામેની બાજુ/કર્ણ, cos θ = નજીકની બાજુ/કર્ણ, tan θ = સામેની બાજુ/નજીકની બાજુ. કાટખૂણા ત્રિકોણ માટે, sin²θ + cos²θ = 1 (પાયથાગોરસ ઓળખ).",
        metadata: {
          subject: "ગણિત",
          class: 10,
          chapter: "ત્રિકોણમિતિ",
          topic: "ત્રિકોણમિતિ ગુણોત્તર",
          board: "GSEB",
          type: "formula",
          difficulty: "medium",
          createdAt: new Date(),
        },
      },
      // Science - Class 10
      {
        content: "Newton's Laws of Motion: 1) An object remains at rest or in uniform motion unless acted upon by a force. 2) F = ma (Force equals mass times acceleration). 3) For every action, there is an equal and opposite reaction.",
        contentGu: "ન્યૂટનના ગતિના નિયમો: 1) કોઈ વસ્તુ સ્થિર રહે છે અથવા સમાન ગતિમાં રહે છે જ્યાં સુધી તેના પર બળ લાગુ ન થાય. 2) F = ma (બળ = દળ × પ્રવેગ). 3) દરેક ક્રિયા માટે, સમાન અને વિરુદ્ધ પ્રતિક્રિયા હોય છે.",
        metadata: {
          subject: "વિજ્ઞાન",
          class: 10,
          chapter: "ગતિ અને બળ",
          topic: "ન્યૂટનના નિયમો",
          board: "GSEB",
          type: "lesson",
          difficulty: "medium",
          createdAt: new Date(),
        },
      },
      {
        content: "Photosynthesis: The process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen. Equation: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
        contentGu: "પ્રકાશસંશ્લેષણ: જે પ્રક્રિયાથી લીલા છોડ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડને ગ્લુકોઝ અને ઓક્સિજનમાં રૂપાંતરિત કરે છે. સમીકરણ: 6CO₂ + 6H₂O + પ્રકાશ ઊર્જા → C₆H₁₂O₆ + 6O₂",
        metadata: {
          subject: "વિજ્ઞાન",
          class: 10,
          chapter: "જીવન પ્રક્રિયાઓ",
          topic: "પ્રકાશસંશ્લેષણ",
          board: "GSEB",
          type: "lesson",
          difficulty: "easy",
          createdAt: new Date(),
        },
      },
      // Gujarati Literature
      {
        content: "Narsinh Mehta was a 15th-century poet saint of Gujarat, known as the Adi Kavi (first poet) of Gujarati literature. His bhajan 'Vaishnav Jan To' is among the most beloved devotional songs.",
        contentGu: "નરસિંહ મહેતા ગુજરાતના 15મી સદીના કવિ સંત હતા, જેઓ ગુજરાતી સાહિત્યના આદિ કવિ તરીકે ઓળખાય છે. તેમનું ભજન 'વૈષ્ણવ જન તો' સૌથી પ્રિય ભક્તિગીતોમાંનું એક છે.",
        metadata: {
          subject: "ગુજરાતી",
          class: 10,
          chapter: "ભક્તિ સાહિત્ય",
          topic: "નરસિંહ મહેતા",
          board: "GSEB",
          type: "lesson",
          difficulty: "easy",
          createdAt: new Date(),
        },
      },
    ];
    
    // Add documents with generated IDs
    for (let i = 0; i < gsebContent.length; i++) {
      const doc: RAGDocument = {
        ...gsebContent[i],
        id: `gseb-doc-${i + 1}`,
      };
      await vectorStore.addDocument(doc);
    }
  }
  
  // Add custom RAGDocument (e.g., uploaded PDF content)
  async addDocument(doc: Omit<RAGDocument, "id" | "embedding">): Promise<string> {
    const id = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await vectorStore.addDocument({ ...doc, id });
    return id;
  }
  
  // Search for relevant documents
  async search(query: RAGQuery): Promise<RAGResult> {
    const results = await vectorStore.search(query.query, {
      topK: query.topK || 5,
      minScore: query.minScore || 0.5,
      filters: query.filters,
    });
    
    const documents = results.map(r => r.RAGDocument);
    const scores = results.map(r => r.score);
    
    // Build context from retrieved documents
    const context = documents.map(d => d.content).join("\n\n");
    const contextGu = documents.map(d => d.contentGu).join("\n\n");
    
    return { documents, scores, context, contextGu };
  }
  
  // RAG-enhanced chat with conversation history
  async chat(
    sessionId: string,
    userMessage: string,
    options: {
      subject?: string;
      class?: number;
      useGujarati?: boolean;
    } = {}
  ): Promise<{ response: string; sources: RAGDocument[] }> {
    // Get or create conversation context
    let context = this.conversationHistory.get(sessionId);
    if (!context) {
      context = { messages: [], documents: [], ...options };
      this.conversationHistory.set(sessionId, context);
    }
    
    // Add user message to history
    context.messages.push({ role: "user", content: userMessage });
    
    // Search for relevant documents
    const ragResult = await this.search({
      query: userMessage,
      filters: {
        subject: options.subject,
        class: options.class,
      },
      topK: 3,
    });
    
    // Build system prompt with RAG context
    const systemPrompt = options.useGujarati
      ? `તમે GYAANSETU AI છો, ગુજરાતી વિદ્યાર્થીઓ માટે શૈક્ષણિક સહાયક. 
નીચેના સંદર્ભનો ઉપયોગ કરીને જવાબ આપો:

${ragResult.contextGu}

નિયમો:
- ગુજરાતીમાં જવાબ આપો
- સરળ ભાષામાં સમજાવો
- ઉદાહરણો આપો
- વિદ્યાર્થીને પ્રોત્સાહિત કરો`
      : `You are GYAANSETU AI, an educational assistant for Gujarati students.
Use the following context to answer:

${ragResult.context}

Rules:
- Respond in the user's language preference
- Explain in simple terms
- Provide examples
- Encourage the student`;
    
    // Call LLM with RAG context
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OpenAI API key not configured");
    
    const messages = [
      { role: "system", content: systemPrompt },
      ...context.messages.slice(-10), // Keep last 10 messages for context
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
        max_tokens: 1500,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Chat completion failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    // Add assistant response to history
    context.messages.push({ role: "assistant", content: assistantMessage });
    context.documents = [...context.documents, ...ragResult.documents];
    
    return {
      response: assistantMessage,
      sources: ragResult.documents,
    };
  }
  
  // Clear conversation history
  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }
  
  // Get conversation history
  getHistory(sessionId: string): RAGChatMessage[] {
    return this.conversationHistory.get(sessionId)?.messages || [];
  }
}

// Singleton instance
export const ragEngine = new RAGEngine();
