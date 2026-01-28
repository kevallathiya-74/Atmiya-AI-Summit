"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Database, 
  MessageSquare, 
  Bot, 
  GraduationCap, 
  Eye, 
  Wrench,
  Activity,
  ChevronRight,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  technologies: string[];
  status: string;
  features: string[];
}

interface Stats {
  total: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  technologiesCount: number;
}

const categoryIcons: Record<string, any> = {
  llm: Brain,
  rag: Database,
  chatbot: MessageSquare,
  agent: Bot,
  educational: GraduationCap,
  vision: Eye,
  tool: Wrench
};

const categoryColors: Record<string, string> = {
  llm: "from-purple-500 to-indigo-600",
  rag: "from-blue-500 to-cyan-600",
  chatbot: "from-green-500 to-emerald-600",
  agent: "from-orange-500 to-amber-600",
  educational: "from-pink-500 to-rose-600",
  vision: "from-teal-500 to-green-600",
  tool: "from-gray-500 to-slate-600"
};

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [healthStatus, setHealthStatus] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch projects
      const projectsRes = await fetch('/api/projects');
      const projectsData = await projectsRes.json();
      if (projectsData.success) {
        setProjects(projectsData.data);
      }

      // Fetch stats
      const statsRes = await fetch('/api/projects?stats=true');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch health status
      const healthRes = await fetch('/api/health');
      const healthData = await healthRes.json();
      if (healthData.success) {
        setHealthStatus(healthData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Integrated AI Projects
          </h1>
          <p className="text-gray-600">
            All LLM, RAG, and AI projects integrated into GYAANSETU.AI
          </p>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-500">Total Projects</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-3xl font-bold text-green-600">{stats.byStatus.active}</div>
              <div className="text-sm text-gray-500">Active Projects</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-3xl font-bold text-purple-600">{stats.technologiesCount}</div>
              <div className="text-sm text-gray-500">Technologies</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">{Object.keys(stats.byCategory).length}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </motion.div>
        )}

        {/* Health Status */}
        {healthStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className={`w-6 h-6 ${healthStatus.overallHealth.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'}`} />
                <div>
                  <div className="font-semibold">System Health: {healthStatus.overallHealth.status.toUpperCase()}</div>
                  <div className="text-sm text-gray-500">{healthStatus.overallHealth.summary}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{healthStatus.overallHealth.healthScore}%</div>
            </div>
          </motion.div>
        )}

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            All
          </button>
          {stats && Object.entries(stats.byCategory).map(([category, count]) => {
            const Icon = categoryIcons[category] || Wrench;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.toUpperCase()} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => {
            const Icon = categoryIcons[project.category] || Wrench;
            const colorClass = categoryColors[project.category] || categoryColors.tool;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`h-2 bg-gradient-to-r ${colorClass}`} />
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{project.features.length} features</span>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No projects found matching your criteria</p>
          </div>
        )}

        {/* API Endpoints Reference */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Available API Endpoints</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { method: 'GET', path: '/api/projects', desc: 'List all projects' },
              { method: 'GET', path: '/api/projects?stats=true', desc: 'Get project statistics' },
              { method: 'GET', path: '/api/llm', desc: 'List LLM projects' },
              { method: 'POST', path: '/api/llm', desc: 'Execute LLM actions' },
              { method: 'GET', path: '/api/rag-projects', desc: 'List RAG projects' },
              { method: 'POST', path: '/api/rag-projects', desc: 'Query RAG systems' },
              { method: 'GET', path: '/api/health', desc: 'System health check' },
              { method: 'GET', path: '/api/dashboard-data', desc: 'Dashboard aggregated data' }
            ].map((endpoint, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-sm text-gray-700 font-mono">{endpoint.path}</code>
                <span className="text-xs text-gray-400 ml-auto">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
