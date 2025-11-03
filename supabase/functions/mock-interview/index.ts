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

    const { question, answer, category } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    const evaluationPrompt = `Evaluate this interview answer:
Question: ${question}
Answer: ${answer}
Category: ${category}

Provide:
1. Score (0-100)
2. Detailed feedback on strengths and areas for improvement
3. Specific suggestions to improve the answer

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
            content: 'You are an expert technical interviewer. Evaluate answers critically but constructively.'
          },
          {
            role: 'user',
            content: evaluationPrompt
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "evaluate_answer",
            description: "Evaluate interview answer and return structured feedback",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score from 0-100" },
                feedback: { type: "string" },
                suggestions: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["score", "feedback", "suggestions"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "evaluate_answer" } }
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
      
      throw new Error('AI evaluation failed');
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices[0].message.tool_calls?.[0];
    const evaluation = JSON.parse(toolCall.function.arguments);

    const { data: interview, error: dbError } = await supabaseClient
      .from('mock_interviews')
      .insert({
        user_id: user.id,
        question,
        answer,
        ai_feedback: `${evaluation.feedback}\n\nSuggestions:\n${evaluation.suggestions.join('\n')}`,
        score: evaluation.score,
        category,
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
        data: interview
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in mock-interview:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});