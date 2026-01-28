import { NextRequest, NextResponse } from 'next/server';

// AI Configuration
const AI_CONFIG = {
  ollama: {
    apiKey: process.env.OLLAMA_API_KEY || '',
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: 'llama2',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o-mini', // Updated to working model
    maxTokens: 2000,
  },
  gemini: {
    apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
    model: 'gemini-pro',
  },
};

// Gujarati system prompts for different explanation modes
const EXPLANATION_MODES = {
  simple: `તમે એક મદદગાર AI શિક્ષક છો જે ગુજરાતીમાં સરળ શબ્દોમાં સમજાવે છે. 
વિદ્યાર્થીની ઉંમર અને ધોરણ પ્રમાણે ભાષા વાપરો. 
ટૂંકા અને સ્પષ્ટ જવાબો આપો.`,
  
  story: `તમે એક કહાનીકાર શિક્ષક છો. 
દરેક વિષયને એક રસપ્રદ વાર્તા દ્વારા સમજાવો. 
ઉદાહરણો અને કલ્પના સાથે શીખવો.`,
  
  stepByStep: `તમે એક વ્યવસ્થિત શિક્ષક છો. 
દરેક વિષયને ક્રમબદ્ધ પગલાંમાં સમજાવો:
1. પ્રથમ મૂળભૂત ખ્યાલ
2. પછી વિગતો
3. છેવટે ઉદાહરણો
નંબરિંગ અને બુલેટ પોઈન્ટ્સ વાપરો.`,
  
  visual: `તમે એક દ્રશ્ય શિક્ષક છો. 
ASCII આર્ટ, ડાયાગ્રામ અને ચિત્રાત્મક વર્ણન વાપરો.
ઇમોજી અને પ્રતીકોથી સમજાવો.`,
};

// Build the system prompt based on context
function buildSystemPrompt(
  mode: string,
  classLevel?: string,
  subject?: string
): string {
  const basePrompt = EXPLANATION_MODES[mode as keyof typeof EXPLANATION_MODES] || EXPLANATION_MODES.simple;
  
  let contextPrompt = basePrompt;
  
  if (classLevel) {
    contextPrompt += `\n\nવિદ્યાર્થી ધોરણ ${classLevel}માં છે. તે મુજબ ભાષા અને ઉદાહરણો પસંદ કરો.`;
  }
  
  if (subject) {
    contextPrompt += `\n\nવર્તમાન વિષય: ${subject}. આ વિષય પર ધ્યાન કેન્દ્રિત કરો.`;
  }
  
  contextPrompt += `\n\nમહત્વના નિયમો:
- હંમેશા ગુજરાતીમાં જવાબ આપો
- વિદ્યાર્થી-મૈત્રીપૂર્ણ ભાષા વાપરો
- શૈક્ષણિક અને સકારાત્મક રહો
- જો ખબર ન હોય તો કહો "મને આ વિશે ખાતરી નથી"`;
  
  return contextPrompt;
}

// Call Ollama API (using /api/chat endpoint)
async function callOllama(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  const chatMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];
  
  const response = await fetch(`${AI_CONFIG.ollama.baseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.ollama.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.ollama.model,
      messages: chatMessages,
      stream: false,
      options: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.message?.content || data.response || 'જવાબ મળ્યો નથી';
}

// Call OpenAI API
async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: AI_CONFIG.openai.maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'જવાબ મળ્યો નથી';
}

// Call Gemini API
async function callGemini(
  message: string,
  systemPrompt: string
): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.gemini.model}:generateContent?key=${AI_CONFIG.gemini.apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemPrompt}\n\nUser: ${message}` },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'જવાબ મળ્યો નથી';
}

// Demo response for when no API key is configured
function getDemoResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('ગણિત') || lowerMessage.includes('math')) {
    return `ગણિત એક સુંદર વિષય છે! 🔢

**મૂળભૂત ગણિત:**
- સરવાળો: 2 + 3 = 5
- બાદબાકી: 10 - 4 = 6
- ગુણાકાર: 3 × 4 = 12
- ભાગાકાર: 20 ÷ 5 = 4

શું તમને કોઈ ચોક્કસ ગણિતની સમસ્યામાં મદદ જોઈએ છે?`;
  }
  
  if (lowerMessage.includes('વિજ્ઞાન') || lowerMessage.includes('science')) {
    return `વિજ્ઞાન આપણી આસપાસની દુનિયાને સમજવામાં મદદ કરે છે! 🔬

**મહત્વના વિષયો:**
- પ્રકાશસંશ્લેષણ: છોડ સૂર્યપ્રકાશમાંથી ખોરાક બનાવે છે
- ગુરુત્વાકર્ષણ: પૃથ્વી બધી વસ્તુઓને પોતાની તરફ ખેંચે છે
- પાણીનું ચક્ર: બાષ્પીભવન → ઘનીભવન → વરસાદ

કયા વિષય વિશે વધુ જાણવું છે?`;
  }
  
  if (lowerMessage.includes('ગુજરાતી') || lowerMessage.includes('gujarati')) {
    return `ગુજરાતી આપણી માતૃભાષા છે! 📚

**ગુજરાતી વર્ણમાળા:**
- સ્વરો: અ, આ, ઇ, ઈ, ઉ, ઊ, એ, ઐ, ઓ, ઔ
- વ્યંજનો: ક થી ળ સુધી

**પ્રખ્યાત ગુજરાતી કવિઓ:**
- નરસિંહ મહેતા
- મીરાંબાઈ
- કલાપી

ગુજરાતી ભાષા વિશે શું જાણવું છે?`;
  }
  
  return `નમસ્તે! 🙏 હું તમારો AI શિક્ષક છું.

હું તમને આ વિષયોમાં મદદ કરી શકું છું:
- 📐 ગણિત
- 🔬 વિજ્ઞાન
- 📚 ગુજરાતી
- 🔤 અંગ્રેજી
- 🌍 સામાજિક વિજ્ઞાન

તમારો પ્રશ્ન પૂછો અને હું ગુજરાતીમાં સરળ રીતે સમજાવીશ!`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      message, 
      mode = 'simple', 
      classLevel, 
      subject, 
      conversationHistory = [],
      provider = 'auto' // 'ollama', 'openai', 'gemini', 'demo', or 'auto'
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(mode, classLevel, subject);
    let response: string;
    let usedProvider: string = 'demo';

    // Auto-detect provider if set to 'auto' - prioritize Ollama
    const effectiveProvider = provider === 'auto' 
      ? (AI_CONFIG.ollama.apiKey ? 'ollama' : (AI_CONFIG.openai.apiKey ? 'openai' : (AI_CONFIG.gemini.apiKey ? 'gemini' : 'demo')))
      : provider;

    if (effectiveProvider === 'ollama' && AI_CONFIG.ollama.apiKey) {
      const messages = [
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: message },
      ];
      response = await callOllama(messages, systemPrompt);
      usedProvider = 'ollama';
    } else if (effectiveProvider === 'openai' && AI_CONFIG.openai.apiKey) {
      const messages = [
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: 'user', content: message },
      ];
      response = await callOpenAI(messages, systemPrompt);
      usedProvider = 'openai';
    } else if (effectiveProvider === 'gemini' && AI_CONFIG.gemini.apiKey) {
      response = await callGemini(message, systemPrompt);
      usedProvider = 'gemini';
    } else {
      // Demo mode - no API key required
      response = getDemoResponse(message);
      usedProvider = 'demo';
    }
    
    console.log(`Chat API using provider: ${usedProvider}, API Key present: ${!!AI_CONFIG.openai.apiKey}`);

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
