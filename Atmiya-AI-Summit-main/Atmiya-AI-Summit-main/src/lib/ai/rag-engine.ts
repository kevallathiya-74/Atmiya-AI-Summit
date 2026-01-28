// RAG (Retrieval-Augmented Generation) Engine for GYAANSETU.AI
// Integrates Multi-PDF support with Gujarati language processing

import { AI_CONFIG } from "./config";

export interface Document {
  id: string;
  content: string;
  metadata: {
    source: string;
    page?: number;
    subject?: string;
    class?: number;
    chapter?: string;
    language: "gu" | "en" | "hi";
  };
}

export interface TextChunk {
  id: string;
  text: string;
  embedding?: number[];
  metadata: Document["metadata"];
}

export interface RAGResponse {
  answer: string;
  sources: Document["metadata"][];
  confidence: number;
}

// Text splitting for RAG
export function splitTextIntoChunks(
  text: string,
  chunkSize: number = AI_CONFIG.rag.chunkSize,
  overlap: number = AI_CONFIG.rag.chunkOverlap
): string[] {
  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const endIndex = Math.min(startIndex + chunkSize, text.length);
    const chunk = text.slice(startIndex, endIndex);
    chunks.push(chunk);
    startIndex = endIndex - overlap;
  }

  return chunks;
}

// Process PDF text for Gujarati content
export function processGujaratiText(text: string): string {
  // Normalize Gujarati Unicode characters
  let processed = text.normalize("NFC");
  
  // Remove extra whitespace while preserving Gujarati text structure
  processed = processed.replace(/\s+/g, " ").trim();
  
  // Handle common OCR errors in Gujarati
  processed = processed
    .replace(/।।/g, "।")
    .replace(/\s।/g, "।")
    .replace(/।\s/g, "। ");

  return processed;
}

// Create prompt template for RAG
export function createRAGPrompt(
  question: string,
  context: string,
  language: "gu" | "en" = "gu"
): string {
  if (language === "gu") {
    return `પ્રસંગ (Context):
${context}

પ્રશ્ન: ${question}

ઉપરના પ્રસંગના આધારે ગુજરાતીમાં વિગતવાર જવાબ આપો. જો જવાબ પ્રસંગમાં ન હોય, તો કહો "આ માહિતી આપેલ સામગ્રીમાં ઉપલબ્ધ નથી."

જવાબ:`;
  }

  return `Context:
${context}

Question: ${question}

Answer the question in detail based on the context above. If the answer is not in the context, say "The answer is not available in the provided content."

Answer:`;
}

// Similarity search simulation (for client-side)
// In production, this would use FAISS or similar vector store
export function cosineSimilarity(a: number[], b: number[]): number {
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

// RAG Query Handler
export async function queryRAG(
  question: string,
  documents: TextChunk[],
  queryEmbedding: number[]
): Promise<{ relevantChunks: TextChunk[]; totalRelevance: number }> {
  const results = documents
    .map((doc) => ({
      chunk: doc,
      similarity: doc.embedding ? cosineSimilarity(queryEmbedding, doc.embedding) : 0,
    }))
    .filter((r) => r.similarity >= AI_CONFIG.rag.similarityThreshold)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, AI_CONFIG.rag.maxRetrievedDocs);

  return {
    relevantChunks: results.map((r) => r.chunk),
    totalRelevance: results.reduce((sum, r) => sum + r.similarity, 0) / results.length,
  };
}

// Format sources for display
export function formatSources(sources: Document["metadata"][]): string {
  return sources
    .map((s, i) => {
      let sourceInfo = `[${i + 1}] ${s.source}`;
      if (s.page) sourceInfo += `, પૃષ્ઠ ${s.page}`;
      if (s.chapter) sourceInfo += `, પ્રકરણ: ${s.chapter}`;
      return sourceInfo;
    })
    .join("\n");
}
