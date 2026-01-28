// RAG Projects API - Access RAG-based projects
import { NextRequest, NextResponse } from 'next/server';
import { getRAGProjects, getProjectById } from '@/lib/projects-registry';

// RAG Project configurations
const RAG_CONFIGS = {
  'chat-website-rag': {
    vectorStore: 'Pinecone',
    embeddings: 'OpenAI',
    llm: 'ChatOpenAI',
    features: ['website_scraping', 'history_aware_retrieval', 'conversational_chain'],
    requiredEnv: ['OPENAI_API_KEY', 'PINECONE_API_KEY', 'PINECONE_ENV', 'PINECONE_INDEX']
  },
  'ai-tutor-eduementor': {
    vectorStore: 'OpenAI Assistants',
    embeddings: 'OpenAI',
    llm: 'OpenAI Assistants API',
    features: ['pdf_upload', 'file_management', 'chat_history', 'rag_qa'],
    requiredEnv: ['OPENAI_API_KEY']
  },
  'multi-pdf-chat': {
    vectorStore: 'FAISS',
    embeddings: 'Google Generative AI',
    llm: 'Google Gemini Pro',
    features: ['multi_pdf_upload', 'similarity_search', 'qa_chain'],
    requiredEnv: ['GOOGLE_API_KEY']
  },
  'rag-tools-tutorials': {
    vectorStore: 'Various',
    embeddings: 'Various',
    llm: 'Various',
    features: ['tutorials', 'examples', 'educational'],
    requiredEnv: []
  }
};

// Sample knowledge base for demo
const DEMO_KNOWLEDGE_BASE = [
  {
    id: 1,
    topic: 'Machine Learning',
    content: 'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
    category: 'AI/ML'
  },
  {
    id: 2,
    topic: 'RAG',
    content: 'Retrieval-Augmented Generation (RAG) is an AI framework that combines information retrieval with text generation to provide more accurate and contextual responses.',
    category: 'NLP'
  },
  {
    id: 3,
    topic: 'Vector Databases',
    content: 'Vector databases store data as high-dimensional vectors, enabling efficient similarity search and retrieval for AI applications like RAG systems.',
    category: 'Database'
  },
  {
    id: 4,
    topic: 'LangChain',
    content: 'LangChain is a framework for developing applications powered by language models, providing tools for chains, agents, and retrieval systems.',
    category: 'Framework'
  },
  {
    id: 5,
    topic: 'Embeddings',
    content: 'Embeddings are numerical representations of text that capture semantic meaning, allowing AI systems to understand and compare text similarity.',
    category: 'NLP'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const listConfigs = searchParams.get('listConfigs');

    // List all RAG configurations
    if (listConfigs === 'true') {
      return NextResponse.json({
        success: true,
        data: {
          availableProjects: Object.keys(RAG_CONFIGS),
          configurations: RAG_CONFIGS
        }
      });
    }

    // Get specific project info
    if (projectId) {
      const project = getProjectById(projectId);
      if (!project || project.category !== 'rag') {
        return NextResponse.json(
          { success: false, error: 'RAG project not found' },
          { status: 404 }
        );
      }
      
      const config = RAG_CONFIGS[projectId as keyof typeof RAG_CONFIGS];
      return NextResponse.json({
        success: true,
        data: {
          project,
          config: config || null
        }
      });
    }

    // Return all RAG projects
    const ragProjects = getRAGProjects();
    return NextResponse.json({
      success: true,
      data: ragProjects,
      count: ragProjects.length
    });

  } catch (error) {
    console.error('RAG API GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, action, params } = body;

    if (!projectId || !action) {
      return NextResponse.json(
        { success: false, error: 'projectId and action are required' },
        { status: 400 }
      );
    }

    const project = getProjectById(projectId);
    if (!project || project.category !== 'rag') {
      return NextResponse.json(
        { success: false, error: 'RAG project not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'query':
        // Simple RAG query demonstration
        const { query, topK = 3 } = params || {};
        
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Query is required' },
            { status: 400 }
          );
        }

        // Simple keyword matching for demo
        const queryTerms = query.toLowerCase().split(/\s+/);
        const scoredDocs = DEMO_KNOWLEDGE_BASE.map(doc => {
          const text = `${doc.topic} ${doc.content} ${doc.category}`.toLowerCase();
          const score = queryTerms.reduce((acc: number, term: string) => {
            return acc + (text.includes(term) ? 1 : 0);
          }, 0) / queryTerms.length;
          return { ...doc, score };
        });

        const relevantDocs = scoredDocs
          .sort((a, b) => b.score - a.score)
          .slice(0, topK)
          .filter(d => d.score > 0);

        // Generate response using OpenAI if available
        const openaiKey = process.env.OPENAI_API_KEY;
        let generatedResponse = null;

        if (openaiKey && relevantDocs.length > 0) {
          const context = relevantDocs.map(d => d.content).join('\n\n');
          
          try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
              },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                  { 
                    role: 'system', 
                    content: `You are a helpful assistant. Answer questions based on the following context:\n\n${context}\n\nIf the context doesn't contain relevant information, say so.`
                  },
                  { role: 'user', content: query }
                ],
                max_tokens: 500,
                temperature: 0.7
              })
            });

            if (response.ok) {
              const data = await response.json();
              generatedResponse = data.choices[0]?.message?.content;
            }
          } catch (e) {
            console.error('OpenAI call failed:', e);
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            projectId,
            action: 'query',
            query,
            retrievedDocuments: relevantDocs,
            generatedResponse: generatedResponse || 'Configure OPENAI_API_KEY to generate responses',
            note: `Demo RAG using ${projectId}. For full functionality, run the actual project.`
          }
        });

      case 'get_config':
        const config = RAG_CONFIGS[projectId as keyof typeof RAG_CONFIGS];
        return NextResponse.json({
          success: true,
          data: {
            projectId,
            config: config || null
          }
        });

      case 'check_environment':
        const ragConfig = RAG_CONFIGS[projectId as keyof typeof RAG_CONFIGS];
        if (!ragConfig) {
          return NextResponse.json({
            success: true,
            data: {
              projectId,
              configured: false,
              message: 'No configuration found for this project'
            }
          });
        }

        const envStatus = ragConfig.requiredEnv.map(envKey => ({
          key: envKey,
          configured: !!process.env[envKey]
        }));

        return NextResponse.json({
          success: true,
          data: {
            projectId,
            requiredEnv: ragConfig.requiredEnv,
            envStatus,
            allConfigured: envStatus.every(e => e.configured)
          }
        });

      case 'list_features':
        const projectConfig = RAG_CONFIGS[projectId as keyof typeof RAG_CONFIGS];
        return NextResponse.json({
          success: true,
          data: {
            projectId,
            features: projectConfig?.features || [],
            vectorStore: projectConfig?.vectorStore || 'Unknown',
            embeddings: projectConfig?.embeddings || 'Unknown',
            llm: projectConfig?.llm || 'Unknown'
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('RAG API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
