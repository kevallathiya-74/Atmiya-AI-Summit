// Projects Registry - All integrated AI/LLM/RAG projects
// This file contains metadata for all projects in the workspace

export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  category: 'llm' | 'rag' | 'chatbot' | 'vision' | 'agent' | 'educational' | 'tool';
  path: string;
  technologies: string[];
  apiEndpoint?: string;
  features: string[];
  status: 'active' | 'development' | 'archived';
  mainFile?: string;
  requiresApiKey?: string[];
}

export const PROJECTS_REGISTRY: ProjectInfo[] = [
  // ADSE Projects
  {
    id: 'chat-website-rag',
    name: 'Chat with Website - RAG Project',
    description: 'RAG-based chatbot that can answer questions from any website using Pinecone vector store',
    category: 'rag',
    path: 'adse/Chat with website - RAG Project',
    technologies: ['LangChain', 'OpenAI', 'Pinecone', 'Streamlit'],
    features: ['Website scraping', 'Vector embeddings', 'Conversational AI', 'History-aware retrieval'],
    status: 'active',
    mainFile: 'app.py',
    requiresApiKey: ['OPENAI_API_KEY', 'PINECONE_API_KEY', 'PINECONE_ENV']
  },
  {
    id: 'blog-generation-llama2',
    name: 'Blog Generation using LLama2',
    description: 'Generate blog posts using LLama2 model for different audiences',
    category: 'llm',
    path: 'adse/blog_generation_using_llama2-main',
    technologies: ['LLama2', 'LangChain', 'CTransformers', 'Streamlit'],
    features: ['Blog generation', 'Multiple writing styles', 'Word count control'],
    status: 'active',
    mainFile: 'app.py',
    requiresApiKey: []
  },
  {
    id: 'multilanguage-invoice-extractor',
    name: 'Multilanguage Invoice Extractor',
    description: 'Extract information from invoices using Google Gemini Vision',
    category: 'vision',
    path: 'adse/multilanguage_invoice_extractor-main',
    technologies: ['Google Gemini', 'PIL', 'Streamlit'],
    features: ['Invoice parsing', 'Multi-language support', 'Image analysis'],
    status: 'active',
    mainFile: 'app.py',
    requiresApiKey: ['GOOGLE_API_KEY']
  },
  {
    id: 'educational-ai-survey',
    name: 'Survey of Tools for Educational AI',
    description: 'Comprehensive survey and data on educational AI tools',
    category: 'educational',
    path: 'adse/A_Survey_of_Tools_for_Educational_AI',
    technologies: ['Markdown', 'Data Analysis'],
    features: ['Educational software data', 'AI4ED volunteer projects'],
    status: 'active'
  },
  {
    id: 'better-writing-chatbots',
    name: 'Better Writing Chatbots',
    description: 'AI-powered writing assistance chatbots',
    category: 'chatbot',
    path: 'adse/Better_Writing_Chatbots',
    technologies: ['NLP', 'Chatbot Framework'],
    features: ['Writing improvement', 'Grammar checking', 'Style suggestions'],
    status: 'development'
  },
  {
    id: 'case-interview-ai',
    name: 'Case Interview AI',
    description: 'AI assistant for case study interviews and practice',
    category: 'educational',
    path: 'adse/Case_Interview_AI',
    technologies: ['AI', 'NLP'],
    features: ['Case studies', 'Interview preparation', 'Practice scenarios'],
    status: 'active'
  },
  {
    id: 'cognitive-type-typography',
    name: 'Cognitive Type Typography AI',
    description: 'AI for typography classification and generation',
    category: 'tool',
    path: 'adse/Cognitive_Type_Typography_AI',
    technologies: ['Computer Vision', 'ML', 'Typography'],
    features: ['Typeface classification', 'Generative type', 'Cognitive search'],
    status: 'active'
  },
  {
    id: 'computational-finance-ai',
    name: 'Computational Finance AI',
    description: 'AI tools for financial analysis and modeling',
    category: 'tool',
    path: 'adse/Computational_Finance_AI',
    technologies: ['Python', 'Finance', 'ML', 'Monte Carlo'],
    features: ['Financial modeling', 'Monte Carlo simulations', 'Ticker analysis'],
    status: 'active'
  },
  {
    id: 'data-chatbots-education',
    name: 'Data Chatbots in AI-Enhanced Education',
    description: 'Educational chatbots dataset and analysis',
    category: 'educational',
    path: 'adse/Data_Chatbots_in_AI-Enhanced_Education',
    technologies: ['Data Analysis', 'CSV'],
    features: ['Educational chatbot data', 'Analysis tools'],
    status: 'active'
  },
  {
    id: 'dissertation-feedback-ai',
    name: 'Generative AI for Dissertation Feedback',
    description: 'AI-powered dissertation review and feedback system',
    category: 'educational',
    path: 'adse/Dis_Generative_AI_Software_for_Dissertation_Feedback',
    technologies: ['NLP', 'Generative AI'],
    features: ['Dissertation review', 'Feedback generation', 'Academic writing'],
    status: 'development'
  },
  {
    id: 'rag-tools-tutorials',
    name: 'RAG Tools and Tutorials for Educational AI',
    description: 'Collection of RAG tools and educational materials',
    category: 'rag',
    path: 'adse/RAG_Tools_and_Tutorials_for_Educational_AI',
    technologies: ['RAG', 'LangChain', 'Vector Stores'],
    features: ['RAG tutorials', 'Educational resources'],
    status: 'active'
  },
  {
    id: 'smartybots',
    name: 'SmartyBots',
    description: 'Smart educational bots framework',
    category: 'chatbot',
    path: 'adse/SmartyBots',
    technologies: ['Chatbot', 'AI', 'Education'],
    features: ['Smart tutoring', 'Conversational AI'],
    status: 'development'
  },
  {
    id: 'otto-von-smartypants',
    name: 'Otto von SmartyPants',
    description: 'Intelligent AI assistant for education',
    category: 'agent',
    path: 'adse/Otto_von_SmartyPants',
    technologies: ['AI Agent', 'Education'],
    features: ['Intelligent tutoring', 'Personalized learning'],
    status: 'development'
  },
  
  // AI Tutor Project
  {
    id: 'ai-tutor-eduementor',
    name: 'EduMentor AI Tutor',
    description: 'AI-enhanced tutoring system using RAG with file upload capabilities',
    category: 'rag',
    path: 'AI_Tutor-main',
    technologies: ['OpenAI', 'Assistants API', 'Streamlit', 'RAG'],
    apiEndpoint: '/api/ai-tutor',
    features: ['PDF upload', 'RAG-based Q&A', 'Chat history', 'File management'],
    status: 'active',
    mainFile: 'app.py',
    requiresApiKey: ['OPENAI_API_KEY']
  },
  
  // Multi-PDFs Project
  {
    id: 'multi-pdf-chat',
    name: 'Multi-PDF Chat Agent',
    description: 'Chat with multiple PDF files using FAISS and Google Gemini',
    category: 'rag',
    path: 'Multi-PDFs_(2)',
    technologies: ['Google Gemini', 'FAISS', 'LangChain', 'Streamlit'],
    apiEndpoint: '/api/multi-pdf',
    features: ['Multiple PDF upload', 'Vector search', 'Q&A chain'],
    status: 'active',
    mainFile: 'chatapp.py',
    requiresApiKey: ['GOOGLE_API_KEY']
  },
  
  // AutoGPT Platform
  {
    id: 'autogpt-platform',
    name: 'AutoGPT Platform',
    description: 'Autonomous AI agent platform for complex tasks',
    category: 'agent',
    path: 'AutoGPt(3)',
    technologies: ['Python', 'FastAPI', 'React', 'Docker', 'PostgreSQL'],
    apiEndpoint: '/api/autogpt',
    features: ['Autonomous agents', 'Task automation', 'Multi-agent orchestration'],
    status: 'active',
    requiresApiKey: ['OPENAI_API_KEY']
  },
  
  // ChatGPT Resources
  {
    id: 'chatgpt-resources',
    name: 'Awesome ChatGPT Repositories',
    description: 'Curated list of ChatGPT-related repositories and tools',
    category: 'tool',
    path: 'ChatGpt(5)',
    technologies: ['Documentation', 'Resources'],
    features: ['Repository list', 'Multi-language docs'],
    status: 'active'
  }
];

// Get all projects
export function getAllProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY;
}

// Get projects by category
export function getProjectsByCategory(category: ProjectInfo['category']): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === category);
}

// Get project by ID
export function getProjectById(id: string): ProjectInfo | undefined {
  return PROJECTS_REGISTRY.find(p => p.id === id);
}

// Get LLM projects
export function getLLMProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === 'llm');
}

// Get RAG projects
export function getRAGProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === 'rag');
}

// Get chatbot projects
export function getChatbotProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === 'chatbot');
}

// Get agent projects
export function getAgentProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === 'agent');
}

// Get educational projects
export function getEducationalProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.category === 'educational');
}

// Get active projects only
export function getActiveProjects(): ProjectInfo[] {
  return PROJECTS_REGISTRY.filter(p => p.status === 'active');
}

// Get project statistics
export function getProjectStats() {
  const total = PROJECTS_REGISTRY.length;
  const byCategory = {
    llm: getProjectsByCategory('llm').length,
    rag: getProjectsByCategory('rag').length,
    chatbot: getProjectsByCategory('chatbot').length,
    vision: getProjectsByCategory('vision').length,
    agent: getProjectsByCategory('agent').length,
    educational: getProjectsByCategory('educational').length,
    tool: getProjectsByCategory('tool').length,
  };
  const byStatus = {
    active: PROJECTS_REGISTRY.filter(p => p.status === 'active').length,
    development: PROJECTS_REGISTRY.filter(p => p.status === 'development').length,
    archived: PROJECTS_REGISTRY.filter(p => p.status === 'archived').length,
  };
  const technologies = [...new Set(PROJECTS_REGISTRY.flatMap(p => p.technologies))];
  
  return {
    total,
    byCategory,
    byStatus,
    technologies,
    technologiesCount: technologies.length
  };
}

// Search projects
export function searchProjects(query: string): ProjectInfo[] {
  const lowerQuery = query.toLowerCase();
  return PROJECTS_REGISTRY.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.technologies.some(t => t.toLowerCase().includes(lowerQuery)) ||
    p.features.some(f => f.toLowerCase().includes(lowerQuery))
  );
}
