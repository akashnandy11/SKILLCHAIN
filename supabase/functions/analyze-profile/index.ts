import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { linkedin_url, github_id } = await req.json();

    // Fetch GitHub data
    let githubStats = {};
    if (github_id) {
      console.log('Fetching GitHub data for:', github_id);
      const githubResponse = await fetch(`https://api.github.com/users/${github_id}/repos`, {
        headers: {
          'User-Agent': 'SkillChain-App',
        },
      });
      
      if (githubResponse.ok) {
        const repos = await githubResponse.json();
        const totalCommits = repos.reduce((acc: number, repo: any) => acc + (repo.size || 0), 0);
        githubStats = {
          repos: repos.length,
          commits: totalCommits,
          languages: [...new Set(repos.map((r: any) => r.language).filter(Boolean))],
        };
      }
    }

    // AI Analysis using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const analysisPrompt = `Analyze this developer profile and provide detailed insights:
LinkedIn: ${linkedin_url || 'Not provided'}
GitHub: ${github_id || 'Not provided'}
GitHub Stats: ${JSON.stringify(githubStats)}

Provide:
1. Resume quality score (0-100)
2. Strengths and weaknesses
3. 3-5 specific recommendations for improvement
4. Skill assessment for: AI/ML, DSA, Communication, SQL
5. Overall feedback

Format as JSON.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical recruiter and career advisor. Analyze profiles and provide actionable insights.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "analyze_profile",
            description: "Analyze developer profile and return structured insights",
            parameters: {
              type: "object",
              properties: {
                resume_score: { type: "number", description: "Score from 0-100" },
                feedback: { type: "string" },
                recommendations: {
                  type: "array",
                  items: { type: "string" }
                },
                progress: {
                  type: "object",
                  properties: {
                    AI: { type: "number" },
                    DSA: { type: "number" },
                    Communication: { type: "number" },
                    SQL: { type: "number" }
                  }
                }
              },
              required: ["resume_score", "feedback", "recommendations", "progress"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "analyze_profile" } }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    const analysis = JSON.parse(toolCall.function.arguments);

    // Save to database
    const { data: savedAnalysis, error: dbError } = await supabaseClient
      .from('user_analysis')
      .upsert({
        user_id: user.id,
        linkedin_url,
        github_id,
        resume_score: analysis.resume_score,
        coding_stats: githubStats,
        feedback: analysis.feedback,
        recommendations: analysis.recommendations,
        progress: analysis.progress,
        verified: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: savedAnalysis
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-profile:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});