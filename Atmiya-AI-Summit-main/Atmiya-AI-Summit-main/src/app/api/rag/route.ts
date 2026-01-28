// RAG API Route for GYAANSETU.AI
// Knowledge base search and document retrieval

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      query, 
      subject, 
      classLevel, 
      chapter, 
      topK = 5,
      useChat = false,
      sessionId,
      language = "gu"
    } = body;
    
    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }
    
    const ollamaApiKey = process.env.OLLAMA_API_KEY;
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!ollamaApiKey && !openaiApiKey) {
      return NextResponse.json(
        { error: "No AI API key configured. Set OLLAMA_API_KEY or OPENAI_API_KEY" },
        { status: 500 }
      );
    }
    
    // For demo, we'll use a simple retrieval approach
    // In production, this would connect to a vector database
    
    // Sample GSEB educational content
    const knowledgeBase = getGSEBKnowledgeBase();
    
    // Filter by subject and class if provided
    let filteredDocs = knowledgeBase;
    if (subject) {
      filteredDocs = filteredDocs.filter(d => d.subject === subject);
    }
    if (classLevel) {
      filteredDocs = filteredDocs.filter(d => d.class === classLevel);
    }
    if (chapter) {
      filteredDocs = filteredDocs.filter(d => d.chapter.includes(chapter));
    }
    
    // Simple keyword matching (replace with embeddings in production)
    const queryTerms = query.toLowerCase().split(/\s+/);
    const scoredDocs = filteredDocs.map(doc => {
      const content = `${doc.content} ${doc.contentGu}`.toLowerCase();
      const score = queryTerms.reduce((acc: number, term: string) => {
        return acc + (content.includes(term) ? 1 : 0);
      }, 0) / queryTerms.length;
      return { ...doc, score };
    });
    
    // Sort by score and take top K
    const topDocs = scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(d => d.score > 0);
    
    // If useChat, generate a response using the retrieved documents
    if (useChat) {
      const context = topDocs.map(d => 
        language === "gu" ? d.contentGu : d.content
      ).join("\n\n");
      
      const systemPrompt = language === "gu"
        ? `તમે GYAANSETU AI છો, ગુજરાતી વિદ્યાર્થીઓ માટે શૈક્ષણિક સહાયક.
નીચેના સંદર્ભનો ઉપયોગ કરીને જવાબ આપો:

${context}

ગુજરાતીમાં સરળ ભાષામાં જવાબ આપો. ઉદાહરણો આપો.`
        : `You are GYAANSETU AI, an educational assistant for students.
Use the following context to answer:

${context}

Answer clearly with examples.`;
      
      let chatResponse;
      
      // Try Ollama first (using /api/chat endpoint)
      if (ollamaApiKey) {
        try {
          const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${ollamaApiKey}`,
            },
            body: JSON.stringify({
              model: "llama2",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: query },
              ],
              stream: false,
              options: {
                temperature: 0.7,
              },
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            chatResponse = data.message?.content || data.response;
          }
        } catch (ollamaError) {
          console.error("Ollama API error:", ollamaError);
        }
      }
      
      // Fallback to OpenAI if Ollama fails
      if (!chatResponse && openaiApiKey) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4-turbo-preview",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: query },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });
        
        if (!response.ok) {
          throw new Error("Chat completion failed");
        }
        
        const data = await response.json();
        chatResponse = data.choices[0].message.content;
      }
      
      return NextResponse.json({
        response: chatResponse || "Failed to generate response",
        sources: topDocs.map(d => ({
          subject: d.subject,
          chapter: d.chapter,
          topic: d.topic,
          content: language === "gu" ? d.contentGu : d.content,
          score: d.score,
        })),
        sessionId,
      });
    }
    
    // Return just the retrieved documents
    return NextResponse.json({
      documents: topDocs.map(d => ({
        subject: d.subject,
        class: d.class,
        chapter: d.chapter,
        topic: d.topic,
        content: d.content,
        contentGu: d.contentGu,
        type: d.type,
        score: d.score,
      })),
      totalFound: topDocs.length,
    });
    
  } catch (error) {
    console.error("RAG API Error:", error);
    return NextResponse.json(
      { error: "Failed to process RAG query" },
      { status: 500 }
    );
  }
}

// Sample GSEB Knowledge Base
function getGSEBKnowledgeBase() {
  return [
    // Mathematics Class 10
    {
      subject: "ગણિત",
      class: 10,
      chapter: "દ્વિઘાત સમીકરણો",
      topic: "દ્વિઘાત સૂત્ર",
      type: "formula",
      content: "Quadratic Equation: An equation of the form ax² + bx + c = 0, where a ≠ 0. The roots can be found using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a. The discriminant D = b²-4ac determines the nature of roots: D > 0 means two distinct real roots, D = 0 means one repeated real root, D < 0 means no real roots (complex roots).",
      contentGu: "દ્વિઘાત સમીકરણ: ax² + bx + c = 0 સ્વરૂપનું સમીકરણ, જ્યાં a ≠ 0. મૂળ શોધવા માટે સૂત્ર: x = (-b ± √(b²-4ac)) / 2a. વિવેચક D = b²-4ac મૂળની પ્રકૃતિ નક્કી કરે છે: D > 0 એટલે બે અલગ વાસ્તવિક મૂળ, D = 0 એટલે એક પુનરાવર્તિત વાસ્તવિક મૂળ, D < 0 એટલે કોઈ વાસ્તવિક મૂળ નહીં.",
    },
    {
      subject: "ગણિત",
      class: 10,
      chapter: "ત્રિકોણમિતિ",
      topic: "ત્રિકોણમિતિ ગુણોત્તર",
      type: "formula",
      content: "Trigonometric Ratios: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent = sin θ/cos θ. For a right triangle, sin²θ + cos²θ = 1 (Pythagorean identity). Also: sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ.",
      contentGu: "ત્રિકોણમિતિ ગુણોત્તર: sin θ = સામેની બાજુ/કર્ણ, cos θ = નજીકની બાજુ/કર્ણ, tan θ = સામેની બાજુ/નજીકની બાજુ = sin θ/cos θ. કાટખૂણા ત્રિકોણ માટે: sin²θ + cos²θ = 1 (પાયથાગોરસ ઓળખ). ઉપરાંત: sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ.",
    },
    {
      subject: "ગણિત",
      class: 10,
      chapter: "અંકગણિત શ્રેણી",
      topic: "AP સૂત્રો",
      type: "formula",
      content: "Arithmetic Progression (AP): A sequence where each term after the first is obtained by adding a constant difference 'd'. nth term: an = a + (n-1)d. Sum of n terms: Sn = n/2[2a + (n-1)d] or Sn = n/2[a + l] where l is the last term.",
      contentGu: "અંકગણિત શ્રેણી (AP): એક શ્રેણી જ્યાં પ્રથમ પદ પછી દરેક પદ સમાન તફાવત 'd' ઉમેરીને મળે છે. nમું પદ: an = a + (n-1)d. n પદોનો સરવાળો: Sn = n/2[2a + (n-1)d] અથવા Sn = n/2[a + l] જ્યાં l છેલ્લું પદ છે.",
    },
    // Science Class 10
    {
      subject: "વિજ્ઞાન",
      class: 10,
      chapter: "ગતિ અને બળ",
      topic: "ન્યૂટનના નિયમો",
      type: "lesson",
      content: "Newton's Laws of Motion: 1) Law of Inertia - An object remains at rest or in uniform motion unless acted upon by an external force. 2) F = ma - Force equals mass times acceleration. The unit of force is Newton (N). 3) Action-Reaction - For every action, there is an equal and opposite reaction.",
      contentGu: "ન્યૂટનના ગતિના નિયમો: 1) જડત્વનો નિયમ - કોઈ વસ્તુ સ્થિર રહે છે અથવા સમાન ગતિમાં રહે છે જ્યાં સુધી બાહ્ય બળ ન લાગે. 2) F = ma - બળ = દળ × પ્રવેગ. બળનો એકમ ન્યૂટન (N) છે. 3) ક્રિયા-પ્રતિક્રિયા - દરેક ક્રિયા માટે સમાન અને વિરુદ્ધ પ્રતિક્રિયા હોય છે.",
    },
    {
      subject: "વિજ્ઞાન",
      class: 10,
      chapter: "જીવન પ્રક્રિયાઓ",
      topic: "પ્રકાશસંશ્લેષણ",
      type: "lesson",
      content: "Photosynthesis: The process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen. Equation: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂. It occurs in chloroplasts, specifically in the chlorophyll. The process has two stages: light reaction and dark reaction (Calvin cycle).",
      contentGu: "પ્રકાશસંશ્લેષણ: જે પ્રક્રિયાથી લીલા છોડ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડને ગ્લુકોઝ અને ઓક્સિજનમાં રૂપાંતરિત કરે છે. સમીકરણ: 6CO₂ + 6H₂O + પ્રકાશ ઊર્જા → C₆H₁₂O₆ + 6O₂. આ ક્લોરોપ્લાસ્ટમાં, ખાસ કરીને ક્લોરોફિલમાં થાય છે. આ પ્રક્રિયામાં બે તબક્કા છે: પ્રકાશ પ્રતિક્રિયા અને અંધકાર પ્રતિક્રિયા (કેલ્વિન ચક્ર).",
    },
    {
      subject: "વિજ્ઞાન",
      class: 10,
      chapter: "રાસાયણિક પ્રતિક્રિયાઓ",
      topic: "રાસાયણિક સમીકરણો",
      type: "lesson",
      content: "Chemical Reactions: A process where reactants convert into products. Types: Combination (A + B → AB), Decomposition (AB → A + B), Displacement (A + BC → AC + B), Double Displacement (AB + CD → AD + CB), Oxidation-Reduction (electron transfer). Balancing ensures equal atoms on both sides.",
      contentGu: "રાસાયણિક પ્રતિક્રિયાઓ: એક પ્રક્રિયા જ્યાં પ્રક્રિયાકારકો ઉત્પાદનોમાં રૂપાંતરિત થાય છે. પ્રકારો: સંયોજન (A + B → AB), વિઘટન (AB → A + B), વિસ્થાપન (A + BC → AC + B), દ્વિ-વિસ્થાપન (AB + CD → AD + CB), ઓક્સિડેશન-રિડક્શન (ઇલેક્ટ્રોન ટ્રાન્સફર). સંતુલન બંને બાજુ સમાન પરમાણુઓ સુનિશ્ચિત કરે છે.",
    },
    // Gujarati Literature
    {
      subject: "ગુજરાતી",
      class: 10,
      chapter: "ભક્તિ સાહિત્ય",
      topic: "નરસિંહ મહેતા",
      type: "lesson",
      content: "Narsinh Mehta (1414-1481) was a 15th-century poet saint of Gujarat, known as the Adi Kavi (first poet) of Gujarati literature. His bhajan 'Vaishnav Jan To' describes the qualities of a true devotee. He wrote about devotion to Krishna and social equality. His autobiography 'Shamaldas no Vivah' and 'Mameru' are famous works.",
      contentGu: "નરસિંહ મહેતા (1414-1481) ગુજરાતના 15મી સદીના કવિ સંત હતા, જેઓ ગુજરાતી સાહિત્યના આદિ કવિ તરીકે ઓળખાય છે. તેમનું ભજન 'વૈષ્ણવ જન તો' સાચા ભક્તના ગુણો વર્ણવે છે. તેમણે કૃષ્ણ ભક્તિ અને સામાજિક સમાનતા વિશે લખ્યું. તેમની આત્મકથા 'શામળદાસનો વિવાહ' અને 'મામેરું' પ્રસિદ્ધ કૃતિઓ છે.",
    },
    {
      subject: "ગુજરાતી",
      class: 10,
      chapter: "નવલકથા",
      topic: "ગોવર્ધનરામ ત્રિપાઠી",
      type: "lesson",
      content: "Govardhanram Tripathi (1855-1907) wrote 'Saraswatichandra', considered the first modern Gujarati novel. It's a 4-part epic exploring love, duty, spirituality, and social reform. The protagonist Saraswatichandra struggles between worldly duties and spiritual aspirations. It reflects the social conditions of 19th century Gujarat.",
      contentGu: "ગોવર્ધનરામ ત્રિપાઠી (1855-1907) એ 'સરસ્વતીચંદ્ર' લખી, જે પ્રથમ આધુનિક ગુજરાતી નવલકથા માનવામાં આવે છે. આ 4 ભાગની મહાકાવ્ય પ્રેમ, કર્તવ્ય, આધ્યાત્મિકતા અને સામાજિક સુધારણાની શોધ કરે છે. નાયક સરસ્વતીચંદ્ર સાંસારિક ફરજો અને આધ્યાત્મિક આકાંક્ષાઓ વચ્ચે સંઘર્ષ કરે છે.",
    },
    // Social Science
    {
      subject: "સામાજિક વિજ્ઞાન",
      class: 10,
      chapter: "ભારતીય સ્વતંત્રતા સંગ્રામ",
      topic: "ગાંધી યુગ",
      type: "lesson",
      content: "Gandhi Era (1919-1947): Mahatma Gandhi led India's freedom struggle using non-violent civil disobedience. Key movements: Non-Cooperation (1920), Civil Disobedience/Salt March (1930), Quit India (1942). Gandhi's principles: Satyagraha (truth-force), Ahimsa (non-violence), Swadeshi (self-reliance). India gained independence on August 15, 1947.",
      contentGu: "ગાંધી યુગ (1919-1947): મહાત્મા ગાંધીએ અહિંસક સવિનય અવજ્ઞા દ્વારા ભારતની સ્વતંત્રતા સંગ્રામનું નેતૃત્વ કર્યું. મુખ્ય આંદોલનો: અસહકાર (1920), સવિનય અવજ્ઞા/મીઠાની કૂચ (1930), ભારત છોડો (1942). ગાંધીના સિદ્ધાંતો: સત્યાગ્રહ, અહિંસા, સ્વદેશી. ભારતે 15 ઓગસ્ટ 1947ના રોજ સ્વતંત્રતા મેળવી.",
    },
  ];
}
