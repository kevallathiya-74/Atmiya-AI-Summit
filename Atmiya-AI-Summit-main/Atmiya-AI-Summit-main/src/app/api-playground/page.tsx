"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Copy, 
  Check, 
  RefreshCw, 
  Code, 
  Terminal,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface APIEndpoint {
  name: string;
  method: 'GET' | 'POST';
  path: string;
  description: string;
  sampleBody?: any;
  sampleParams?: string;
}

const API_ENDPOINTS: APIEndpoint[] = [
  {
    name: 'List All Projects',
    method: 'GET',
    path: '/api/projects',
    description: 'Get all integrated AI projects'
  },
  {
    name: 'Get Project Stats',
    method: 'GET',
    path: '/api/projects?stats=true',
    description: 'Get statistics about all projects',
    sampleParams: 'stats=true'
  },
  {
    name: 'Search Projects',
    method: 'GET',
    path: '/api/projects?search=rag',
    description: 'Search projects by name or description',
    sampleParams: 'search=rag'
  },
  {
    name: 'Get Projects by Category',
    method: 'GET',
    path: '/api/projects?category=rag',
    description: 'Filter projects by category (llm, rag, chatbot, etc.)',
    sampleParams: 'category=rag'
  },
  {
    name: 'List LLM Projects',
    method: 'GET',
    path: '/api/llm',
    description: 'Get all LLM-based projects'
  },
  {
    name: 'Generate Blog (LLM)',
    method: 'POST',
    path: '/api/llm',
    description: 'Generate a blog post using LLM',
    sampleBody: {
      projectId: 'blog-generation-llama2',
      action: 'generate_blog',
      params: {
        topic: 'Artificial Intelligence in Education',
        wordCount: 300,
        style: 'Common People'
      }
    }
  },
  {
    name: 'List RAG Projects',
    method: 'GET',
    path: '/api/rag-projects',
    description: 'Get all RAG-based projects'
  },
  {
    name: 'Query RAG System',
    method: 'POST',
    path: '/api/rag-projects',
    description: 'Query the RAG system for information',
    sampleBody: {
      projectId: 'chat-website-rag',
      action: 'query',
      params: {
        query: 'What is machine learning?',
        topK: 3
      }
    }
  },
  {
    name: 'Check RAG Environment',
    method: 'POST',
    path: '/api/rag-projects',
    description: 'Check if RAG project environment is configured',
    sampleBody: {
      projectId: 'multi-pdf-chat',
      action: 'check_environment'
    }
  },
  {
    name: 'Health Check',
    method: 'GET',
    path: '/api/health',
    description: 'Check system health status'
  },
  {
    name: 'Detailed Health Check',
    method: 'GET',
    path: '/api/health?detailed=true',
    description: 'Get detailed health status for all projects',
    sampleParams: 'detailed=true'
  },
  {
    name: 'Dashboard Data',
    method: 'GET',
    path: '/api/dashboard-data',
    description: 'Get aggregated dashboard data'
  },
  {
    name: 'Filter Dashboard Projects',
    method: 'POST',
    path: '/api/dashboard-data',
    description: 'Filter projects with custom criteria',
    sampleBody: {
      action: 'filter_projects',
      filters: {
        category: 'rag',
        status: 'active'
      }
    }
  },
  {
    name: 'Chat API',
    method: 'POST',
    path: '/api/chat',
    description: 'Send a message to the AI chat',
    sampleBody: {
      message: 'Explain machine learning in simple terms',
      mode: 'simple',
      language: 'en'
    }
  },
  {
    name: 'RAG Query',
    method: 'POST',
    path: '/api/rag',
    description: 'Query with RAG-enhanced response',
    sampleBody: {
      query: 'What is the solar system?',
      subject: 'Science',
      useChat: true,
      language: 'en'
    }
  }
];

export default function APIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(API_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string>('all');

  const executeRequest = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (selectedEndpoint.method === 'POST' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(selectedEndpoint.path, options);
      const data = await res.json();
      setResponse({
        status: res.status,
        statusText: res.statusText,
        data
      });
    } catch (error: any) {
      setResponse({
        status: 500,
        statusText: 'Error',
        data: { error: error.message }
      });
    }
    
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectEndpoint = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setResponse(null);
    if (endpoint.sampleBody) {
      setRequestBody(JSON.stringify(endpoint.sampleBody, null, 2));
    } else {
      setRequestBody('');
    }
  };

  const categories = [
    { name: 'Projects', endpoints: API_ENDPOINTS.filter(e => e.path.includes('/projects') && !e.path.includes('rag-projects')) },
    { name: 'LLM', endpoints: API_ENDPOINTS.filter(e => e.path.includes('/llm')) },
    { name: 'RAG', endpoints: API_ENDPOINTS.filter(e => e.path.includes('/rag')) },
    { name: 'System', endpoints: API_ENDPOINTS.filter(e => e.path.includes('/health') || e.path.includes('/dashboard')) },
    { name: 'Chat', endpoints: API_ENDPOINTS.filter(e => e.path === '/api/chat') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Terminal className="w-8 h-8 text-green-400" />
            API Playground
          </h1>
          <p className="text-gray-400 mt-2">Test all integrated AI project APIs</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Endpoint Selector */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Endpoints
              </h2>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="border-b border-slate-700 pb-2">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.name ? '' : category.name)}
                      className="w-full flex items-center justify-between py-2 text-left hover:text-blue-400 transition-colors"
                    >
                      <span className="font-medium">{category.name}</span>
                      {expandedCategory === category.name ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </button>
                    
                    {expandedCategory === category.name && (
                      <div className="pl-4 space-y-1">
                        {category.endpoints.map((endpoint) => (
                          <button
                            key={endpoint.name}
                            onClick={() => selectEndpoint(endpoint)}
                            className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                              selectedEndpoint.name === endpoint.name
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-slate-700 text-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`px-1.5 py-0.5 text-xs rounded ${
                                endpoint.method === 'GET' ? 'bg-green-600' : 'bg-blue-600'
                              }`}>
                                {endpoint.method}
                              </span>
                              <span className="truncate">{endpoint.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Request/Response Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Selected Endpoint Info */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedEndpoint.name}</h3>
                  <p className="text-sm text-gray-400">{selectedEndpoint.description}</p>
                </div>
                <button
                  onClick={executeRequest}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Execute
                </button>
              </div>

              {/* URL Display */}
              <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-lg font-mono text-sm">
                <span className={`px-2 py-0.5 rounded ${
                  selectedEndpoint.method === 'GET' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {selectedEndpoint.method}
                </span>
                <span className="text-gray-300">{selectedEndpoint.path}</span>
                <button
                  onClick={() => copyToClipboard(selectedEndpoint.path)}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Request Body (for POST) */}
            {selectedEndpoint.method === 'POST' && (
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Request Body</h3>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-48 p-3 bg-slate-900 rounded-lg font-mono text-sm text-green-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter JSON body..."
                />
              </div>
            )}

            {/* Response */}
            {response && (
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">Response</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      response.status >= 200 && response.status < 300 
                        ? 'bg-green-600' 
                        : 'bg-red-600'
                    }`}>
                      {response.status} {response.statusText}
                    </span>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg font-mono text-sm text-gray-300 overflow-auto max-h-96">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}

            {/* Quick Examples */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Examples</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    selectEndpoint(API_ENDPOINTS.find(e => e.name === 'List All Projects')!);
                    setTimeout(executeRequest, 100);
                  }}
                  className="p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors"
                >
                  <div className="font-medium text-sm">📋 List All Projects</div>
                  <div className="text-xs text-gray-400">GET /api/projects</div>
                </button>
                <button
                  onClick={() => {
                    selectEndpoint(API_ENDPOINTS.find(e => e.name === 'Health Check')!);
                    setTimeout(executeRequest, 100);
                  }}
                  className="p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors"
                >
                  <div className="font-medium text-sm">💚 Health Check</div>
                  <div className="text-xs text-gray-400">GET /api/health</div>
                </button>
                <button
                  onClick={() => {
                    selectEndpoint(API_ENDPOINTS.find(e => e.name === 'List RAG Projects')!);
                    setTimeout(executeRequest, 100);
                  }}
                  className="p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors"
                >
                  <div className="font-medium text-sm">🔍 RAG Projects</div>
                  <div className="text-xs text-gray-400">GET /api/rag-projects</div>
                </button>
                <button
                  onClick={() => {
                    selectEndpoint(API_ENDPOINTS.find(e => e.name === 'Dashboard Data')!);
                    setTimeout(executeRequest, 100);
                  }}
                  className="p-3 bg-slate-700/50 rounded-lg text-left hover:bg-slate-700 transition-colors"
                >
                  <div className="font-medium text-sm">📊 Dashboard Data</div>
                  <div className="text-xs text-gray-400">GET /api/dashboard-data</div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
