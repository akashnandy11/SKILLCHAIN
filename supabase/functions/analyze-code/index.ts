import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { codeSnippet, repoUrl, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Analyzing code for:', language, repoUrl);

    // AI analysis prompt
    const systemPrompt = `You are an expert code reviewer specializing in software quality assessment. 
Analyze the provided code and rate it on these criteria (0.0 to 1.0 scale):
1. Clean Code: Readability, naming conventions, organization
2. Problem Solving: Logic effectiveness, algorithmic efficiency
3. Optimization: Performance considerations, resource usage
4. Documentation: Comments, clarity of intent
5. Creativity: Innovative approaches, elegant solutions

Return a JSON object with:
{
  "scores": {
    "cleanCode": number,
    "problemSolving": number,
    "optimization": number,
    "documentation": number,
    "creativity": number
  },
  "overallScore": number (average of all scores),
  "feedback": "detailed analysis string",
  "strengths": ["array", "of", "strengths"],
  "improvements": ["array", "of", "suggestions"],
  "xpAwarded": number (100-1000 based on quality)
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this ${language} code:\n\n${codeSnippet}\n\nRepository: ${repoUrl}` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add funds.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response:', aiResponse);
    
    // Parse AI response
    let analysis;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
      analysis = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback default response
      analysis = {
        scores: {
          cleanCode: 0.7,
          problemSolving: 0.7,
          optimization: 0.6,
          documentation: 0.5,
          creativity: 0.6
        },
        overallScore: 0.65,
        feedback: 'Code analysis completed. Unable to parse detailed metrics.',
        strengths: ['Functional implementation'],
        improvements: ['Add more documentation', 'Consider optimization'],
        xpAwarded: 300
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-code:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Code analysis failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
