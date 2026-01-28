// Dashboard Data API - Aggregate data for dashboard display
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllProjects, 
  getProjectStats, 
  getRAGProjects, 
  getLLMProjects,
  getChatbotProjects,
  getAgentProjects,
  getEducationalProjects,
  getProjectsByCategory
} from '@/lib/projects-registry';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    // Get overall stats
    const stats = getProjectStats();
    const allProjects = getAllProjects();

    // Build dashboard data
    const dashboardData = {
      overview: {
        totalProjects: stats.total,
        activeProjects: stats.byStatus.active,
        developmentProjects: stats.byStatus.development,
        totalTechnologies: stats.technologiesCount
      },
      categories: {
        llm: {
          count: stats.byCategory.llm,
          projects: getLLMProjects().map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        rag: {
          count: stats.byCategory.rag,
          projects: getRAGProjects().map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        chatbot: {
          count: stats.byCategory.chatbot,
          projects: getChatbotProjects().map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        agent: {
          count: stats.byCategory.agent,
          projects: getAgentProjects().map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        educational: {
          count: stats.byCategory.educational,
          projects: getEducationalProjects().map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        vision: {
          count: stats.byCategory.vision,
          projects: getProjectsByCategory('vision').map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        },
        tool: {
          count: stats.byCategory.tool,
          projects: getProjectsByCategory('tool').map(p => ({
            id: p.id,
            name: p.name,
            status: p.status,
            technologies: p.technologies.slice(0, 3)
          }))
        }
      },
      technologies: {
        all: stats.technologies,
        count: stats.technologiesCount,
        top: getTopTechnologies(allProjects, 10)
      },
      recentActivity: {
        readyToUse: allProjects
          .filter(p => p.status === 'active')
          .slice(0, 5)
          .map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            features: p.features.slice(0, 3)
          }))
      },
      quickAccess: {
        apiEndpoints: [
          { name: 'All Projects', endpoint: '/api/projects', method: 'GET' },
          { name: 'Project Stats', endpoint: '/api/projects?stats=true', method: 'GET' },
          { name: 'LLM Projects', endpoint: '/api/llm', method: 'GET' },
          { name: 'RAG Projects', endpoint: '/api/rag-projects', method: 'GET' },
          { name: 'Health Check', endpoint: '/api/health', method: 'GET' },
          { name: 'Dashboard Data', endpoint: '/api/dashboard-data', method: 'GET' },
          { name: 'Chat API', endpoint: '/api/chat', method: 'POST' },
          { name: 'RAG API', endpoint: '/api/rag', method: 'POST' }
        ]
      }
    };

    // Return specific section if requested
    if (section && section in dashboardData) {
      return NextResponse.json({
        success: true,
        section,
        data: dashboardData[section as keyof typeof dashboardData]
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

// Helper function to get top technologies
function getTopTechnologies(projects: any[], limit: number) {
  const techCount: Record<string, number> = {};
  
  projects.forEach(project => {
    project.technologies.forEach((tech: string) => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });

  return Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, filters } = body;

    switch (action) {
      case 'filter_projects':
        let projects = getAllProjects();
        
        if (filters?.category) {
          projects = projects.filter(p => p.category === filters.category);
        }
        if (filters?.status) {
          projects = projects.filter(p => p.status === filters.status);
        }
        if (filters?.technology) {
          projects = projects.filter(p => 
            p.technologies.some(t => t.toLowerCase().includes(filters.technology.toLowerCase()))
          );
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          projects = projects.filter(p => 
            p.name.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
          );
        }

        return NextResponse.json({
          success: true,
          data: projects,
          count: projects.length,
          filters
        });

      case 'get_charts_data':
        const stats = getProjectStats();
        return NextResponse.json({
          success: true,
          data: {
            categoriesChart: Object.entries(stats.byCategory).map(([name, value]) => ({
              name,
              value
            })),
            statusChart: Object.entries(stats.byStatus).map(([name, value]) => ({
              name,
              value
            })),
            technologiesChart: getTopTechnologies(getAllProjects(), 8)
          }
        });

      case 'get_summary':
        const allStats = getProjectStats();
        return NextResponse.json({
          success: true,
          data: {
            totalProjects: allStats.total,
            categories: Object.keys(allStats.byCategory).length,
            technologies: allStats.technologiesCount,
            activeProjects: allStats.byStatus.active,
            highlights: [
              `${allStats.byCategory.rag} RAG-based projects`,
              `${allStats.byCategory.llm} LLM projects`,
              `${allStats.byCategory.chatbot} Chatbot projects`,
              `${allStats.byCategory.educational} Educational AI projects`
            ]
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Dashboard data POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Request failed' },
      { status: 500 }
    );
  }
}
