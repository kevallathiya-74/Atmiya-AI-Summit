// LLM Projects API - Access LLM-based projects (Llama, GPT, etc.)
import { NextRequest, NextResponse } from 'next/server';
import { getLLMProjects, getProjectById } from '@/lib/projects-registry';

// LLM Project configurations
const LLM_CONFIGS = {
  'blog-generation-llama2': {
    modelName: 'llama-2-7b-chat',
    modelPath: 'models/llama-2-7b-chat.ggmlv3.q8_0.bin',
    maxTokens: 256,
    temperature: 0.01,
    supportedStyles: ['Researchers', 'Data Scientist', 'Common People']
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const listModels = searchParams.get('listModels');

    // List all available LLM models/configurations
    if (listModels === 'true') {
      return NextResponse.json({
        success: true,
        data: {
          availableModels: Object.keys(LLM_CONFIGS),
          configurations: LLM_CONFIGS
        }
      });
    }

    // Get specific project info
    if (projectId) {
      const project = getProjectById(projectId);
      if (!project || project.category !== 'llm') {
        return NextResponse.json(
          { success: false, error: 'LLM project not found' },
          { status: 404 }
        );
      }
      
      const config = LLM_CONFIGS[projectId as keyof typeof LLM_CONFIGS];
      return NextResponse.json({
        success: true,
        data: {
          project,
          config: config || null
        }
      });
    }

    // Return all LLM projects
    const llmProjects = getLLMProjects();
    return NextResponse.json({
      success: true,
      data: llmProjects,
      count: llmProjects.length
    });

  } catch (error) {
    console.error('LLM API GET error:', error);
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
    if (!project || project.category !== 'llm') {
      return NextResponse.json(
        { success: false, error: 'LLM project not found' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'generate_blog':
        // Blog generation for llama2 project
        if (projectId !== 'blog-generation-llama2') {
          return NextResponse.json(
            { success: false, error: 'This action is only for blog-generation-llama2 project' },
            { status: 400 }
          );
        }

        const { topic, wordCount, style } = params || {};
        if (!topic) {
          return NextResponse.json(
            { success: false, error: 'Topic is required for blog generation' },
            { status: 400 }
          );
        }

        const config = LLM_CONFIGS['blog-generation-llama2'];
        if (style && !config.supportedStyles.includes(style)) {
          return NextResponse.json(
            { success: false, error: `Style must be one of: ${config.supportedStyles.join(', ')}` },
            { status: 400 }
          );
        }

        // Use Ollama API for LLM generation
        const ollamaApiKey = process.env.OLLAMA_API_KEY;
        const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'https://api.ollama.com';
        const openaiKey = process.env.OPENAI_API_KEY;
        
        // Try Ollama first (using /api/chat endpoint)
        if (ollamaApiKey) {
          try {
            const userMessage = `Write a blog for ${style || 'Common People'} job profile for a topic ${topic} within ${wordCount || 500} words.`;
            
            const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ollamaApiKey}`
              },
              body: JSON.stringify({
                model: 'llama2',
                messages: [
                  { role: 'system', content: 'You are a professional blog writer. Write engaging and informative content.' },
                  { role: 'user', content: userMessage }
                ],
                stream: false,
                options: {
                  num_predict: parseInt(wordCount) || 500,
                  temperature: 0.7
                }
              })
            });

            if (response.ok) {
              const data = await response.json();
              return NextResponse.json({
                success: true,
                data: {
                  projectId,
                  action: 'generate_blog',
                  result: {
                    topic,
                    style: style || 'Common People',
                    wordCount: wordCount || 500,
                    content: data.message?.content || data.response || 'Failed to generate content',
                    model: 'llama2 (Ollama Cloud)',
                    note: 'Using Ollama Cloud LLama2 model.'
                  }
                }
              });
            }
          } catch (apiError) {
            console.error('Ollama API error:', apiError);
            // Fall through to OpenAI fallback
          }
        }

        // Fallback to OpenAI if Ollama fails
        if (openaiKey) {
          try {
            const prompt = `Write a blog for ${style || 'Common People'} job profile for a topic ${topic} within ${wordCount || 500} words.`;
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
              },
              body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                  { role: 'system', content: 'You are a professional blog writer.' },
                  { role: 'user', content: prompt }
                ],
                max_tokens: parseInt(wordCount) || 500,
                temperature: 0.7
              })
            });

            if (response.ok) {
              const data = await response.json();
              return NextResponse.json({
                success: true,
                data: {
                  projectId,
                  action: 'generate_blog',
                  result: {
                    topic,
                    style: style || 'Common People',
                    wordCount: wordCount || 500,
                    content: data.choices[0]?.message?.content || 'Failed to generate content',
                    model: 'gpt-4o-mini (fallback)',
                    note: 'Using OpenAI as fallback. LLama2 model requires local setup.'
                  }
                }
              });
            }
          } catch (apiError) {
            console.error('OpenAI API error:', apiError);
            // Fall through to demo response
          }
        }

        // Return mock response if no API key
        return NextResponse.json({
          success: true,
          data: {
            projectId,
            action: 'generate_blog',
            result: {
              topic,
              style: style || 'Common People',
              wordCount: wordCount || 500,
              content: `[Demo Response] Blog about "${topic}" for ${style || 'Common People'}:\n\nThis is a placeholder response. To get actual content, please configure your OpenAI API key or set up the local LLama2 model.`,
              model: 'demo',
              note: 'LLama2 model requires local setup. Set OPENAI_API_KEY for fallback.'
            }
          }
        });

      case 'get_config':
        return NextResponse.json({
          success: true,
          data: {
            projectId,
            config: LLM_CONFIGS[projectId as keyof typeof LLM_CONFIGS] || null
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('LLM API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
