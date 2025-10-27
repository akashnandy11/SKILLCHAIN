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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { skillId, skillName, skillCategory, level, aiScore } = await req.json();

    console.log('Minting NFT for user:', user.id, 'Skill:', skillName);

    // Generate unique token ID
    const tokenId = `SKILL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Simulate blockchain transaction hash (in production, this would be real)
    const txHash = `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)).join('')}`;
    
    // Create polygon scan URL (simulated)
    const polygonScanUrl = `https://polygonscan.com/tx/${txHash}`;

    // NFT Metadata
    const metadata = {
      name: `${skillName} Credential`,
      description: `Verified ${skillCategory} skill credential earned on SkillChain`,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${tokenId}`,
      attributes: [
        { trait_type: 'Skill', value: skillName },
        { trait_type: 'Category', value: skillCategory },
        { trait_type: 'Level', value: level },
        { trait_type: 'AI Score', value: (aiScore * 100).toFixed(1) },
        { trait_type: 'Verified By', value: 'SkillChain AI' },
        { trait_type: 'Network', value: 'Polygon' }
      ],
      external_url: `https://skillchain.app/nft/${tokenId}`,
      verified_at: new Date().toISOString()
    };

    // Store NFT credential in database
    const { data: nftData, error: nftError } = await supabaseClient
      .from('nft_credentials')
      .insert({
        user_id: user.id,
        token_id: tokenId,
        credential_type: skillCategory,
        skill_id: skillId,
        metadata: metadata,
        level: level,
        blockchain_tx_hash: txHash,
        polygon_scan_url: polygonScanUrl,
        minted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (nftError) {
      console.error('Database error:', nftError);
      throw nftError;
    }

    // Award XP for minting
    const mintXP = 500 + (level * 50);
    const { error: xpError } = await supabaseClient
      .from('xp_transactions')
      .insert({
        user_id: user.id,
        amount: mintXP,
        source: 'nft_mint',
        description: `Minted ${skillName} NFT credential`,
        metadata: { nft_id: nftData.id, token_id: tokenId }
      });

    if (xpError) console.error('XP transaction error:', xpError);

    // Update user's total XP
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .update({ 
        total_xp: supabaseClient.rpc('increment', { row_id: user.id, amount: mintXP })
      })
      .eq('id', user.id);

    if (profileError) console.error('Profile update error:', profileError);

    console.log('NFT minted successfully:', tokenId);

    return new Response(JSON.stringify({
      success: true,
      nft: nftData,
      xpAwarded: mintXP,
      message: 'NFT credential minted successfully!',
      polygonScanUrl
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mint-nft:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'NFT minting failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
