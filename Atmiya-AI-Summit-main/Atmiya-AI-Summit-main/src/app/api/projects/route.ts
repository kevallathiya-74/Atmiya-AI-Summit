// Projects API - List and access all integrated projects
import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllProjects, 
  getProjectsByCategory, 
  getProjectById,
  getProjectStats,
  searchProjects,
  ProjectInfo 
} from '@/lib/projects-registry';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const stats = searchParams.get('stats');

    // Get stats
    if (stats === 'true') {
      return NextResponse.json({
        success: true,
        data: getProjectStats()
      });
    }

    // Get project by ID
    if (id) {
      const project = getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: project
      });
    }

    // Search projects
    if (search) {
      const results = searchProjects(search);
      return NextResponse.json({
        success: true,
        data: results,
        count: results.length
      });
    }

    // Filter by category
    if (category) {
      const validCategories = ['llm', 'rag', 'chatbot', 'vision', 'agent', 'educational', 'tool'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { success: false, error: 'Invalid category' },
          { status: 400 }
        );
      }
      const projects = getProjectsByCategory(category as ProjectInfo['category']);
      return NextResponse.json({
        success: true,
        data: projects,
        count: projects.length
      });
    }

    // Return all projects
    const allProjects = getAllProjects();
    return NextResponse.json({
      success: true,
      data: allProjects,
      count: allProjects.length
    });

  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, projectId, params } = body;

    if (!action || !projectId) {
      return NextResponse.json(
        { success: false, error: 'Action and projectId are required' },
        { status: 400 }
      );
    }

    const project = getProjectById(projectId);
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    // Handle different actions
    switch (action) {
      case 'check_status':
        return NextResponse.json({
          success: true,
          data: {
            project: project,
            status: project.status,
            hasApiEndpoint: !!project.apiEndpoint,
            requiredApiKeys: project.requiresApiKey || []
          }
        });

      case 'get_config':
        return NextResponse.json({
          success: true,
          data: {
            id: project.id,
            name: project.name,
            path: project.path,
            mainFile: project.mainFile,
            technologies: project.technologies,
            requiresApiKey: project.requiresApiKey
          }
        });

      case 'test_connection':
        // Simulate connection test (in production, this would actually test the project)
        const hasRequiredKeys = !project.requiresApiKey || 
          project.requiresApiKey.every(key => process.env[key]);
        
        return NextResponse.json({
          success: true,
          data: {
            projectId: project.id,
            connectionStatus: hasRequiredKeys ? 'ready' : 'missing_keys',
            missingKeys: project.requiresApiKey?.filter(key => !process.env[key]) || []
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Projects API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
