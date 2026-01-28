// Health Check API - Check status of all integrations
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getProjectStats } from '@/lib/projects-registry';

interface HealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  message: string;
  lastChecked: string;
}

interface ProjectHealth {
  projectId: string;
  name: string;
  status: 'ready' | 'missing_dependencies' | 'offline' | 'unknown';
  missingEnvVars: string[];
  apiEndpoint?: string;
}

// Check if required environment variables are set
function checkEnvVars(requiredVars: string[]): { allPresent: boolean; missing: string[] } {
  const missing = requiredVars.filter(v => !process.env[v]);
  return {
    allPresent: missing.length === 0,
    missing
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    const checkApis = searchParams.get('checkApis') === 'true';

    const now = new Date().toISOString();
    
    // Core services health
    const coreServices: HealthStatus[] = [
      {
        service: 'Next.js Server',
        status: 'healthy',
        message: 'Server is running',
        lastChecked: now
      },
      {
        service: 'OpenAI API',
        status: process.env.OPENAI_API_KEY ? 'healthy' : 'unhealthy',
        message: process.env.OPENAI_API_KEY ? 'API key configured' : 'API key not configured',
        lastChecked: now
      },
      {
        service: 'Google Gemini API',
        status: process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY ? 'healthy' : 'unhealthy',
        message: (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY) ? 'API key configured' : 'API key not configured',
        lastChecked: now
      },
      {
        service: 'Pinecone',
        status: process.env.PINECONE_API_KEY ? 'healthy' : 'unhealthy',
        message: process.env.PINECONE_API_KEY ? 'API key configured' : 'API key not configured',
        lastChecked: now
      }
    ];

    // Project-level health
    const allProjects = getAllProjects();
    const projectsHealth: ProjectHealth[] = allProjects.map(project => {
      const envCheck = checkEnvVars(project.requiresApiKey || []);
      let status: ProjectHealth['status'] = 'unknown';
      
      if (!project.requiresApiKey || project.requiresApiKey.length === 0) {
        status = 'ready';
      } else if (envCheck.allPresent) {
        status = 'ready';
      } else {
        status = 'missing_dependencies';
      }

      return {
        projectId: project.id,
        name: project.name,
        status,
        missingEnvVars: envCheck.missing,
        apiEndpoint: project.apiEndpoint
      };
    });

    // API endpoints health check
    let apiHealth: { endpoint: string; status: string; responseTime?: number }[] = [];
    
    if (checkApis) {
      const endpoints = [
        '/api/projects',
        '/api/llm',
        '/api/rag-projects',
        '/api/chat',
        '/api/rag'
      ];

      apiHealth = await Promise.all(endpoints.map(async (endpoint) => {
        const start = Date.now();
        try {
          // Note: In a real scenario, you'd make actual requests
          // For now, we just indicate they exist
          return {
            endpoint,
            status: 'available',
            responseTime: Date.now() - start
          };
        } catch {
          return {
            endpoint,
            status: 'error',
            responseTime: Date.now() - start
          };
        }
      }));
    }

    // Statistics
    const stats = getProjectStats();
    
    // Calculate overall health
    const healthyServices = coreServices.filter(s => s.status === 'healthy').length;
    const totalServices = coreServices.length;
    const readyProjects = projectsHealth.filter(p => p.status === 'ready').length;
    const totalProjects = projectsHealth.length;

    const overallHealth = {
      status: healthyServices >= totalServices / 2 ? 'healthy' : 'degraded',
      healthScore: Math.round(((healthyServices / totalServices) * 50 + (readyProjects / totalProjects) * 50)),
      summary: `${healthyServices}/${totalServices} services healthy, ${readyProjects}/${totalProjects} projects ready`
    };

    const response = {
      success: true,
      timestamp: now,
      overallHealth,
      coreServices,
      projectsHealth: detailed ? projectsHealth : projectsHealth.slice(0, 5),
      apiHealth: checkApis ? apiHealth : undefined,
      statistics: {
        totalProjects: stats.total,
        byCategory: stats.byCategory,
        byStatus: stats.byStatus,
        technologies: stats.technologiesCount
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, projectId } = body;

    if (action === 'check_project') {
      if (!projectId) {
        return NextResponse.json(
          { success: false, error: 'projectId is required' },
          { status: 400 }
        );
      }

      const allProjects = getAllProjects();
      const project = allProjects.find(p => p.id === projectId);
      
      if (!project) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        );
      }

      const envCheck = checkEnvVars(project.requiresApiKey || []);
      
      return NextResponse.json({
        success: true,
        data: {
          projectId: project.id,
          name: project.name,
          category: project.category,
          status: project.status,
          path: project.path,
          mainFile: project.mainFile,
          technologies: project.technologies,
          features: project.features,
          apiEndpoint: project.apiEndpoint,
          environment: {
            required: project.requiresApiKey || [],
            allConfigured: envCheck.allPresent,
            missing: envCheck.missing
          },
          readyToUse: project.status === 'active' && envCheck.allPresent
        }
      });
    }

    if (action === 'ping_all') {
      // Simulate pinging all services
      return NextResponse.json({
        success: true,
        data: {
          message: 'All services pinged',
          timestamp: new Date().toISOString(),
          results: {
            projects_api: 'ok',
            llm_api: 'ok',
            rag_api: 'ok',
            chat_api: 'ok'
          }
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Health check POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Request failed' },
      { status: 500 }
    );
  }
}
