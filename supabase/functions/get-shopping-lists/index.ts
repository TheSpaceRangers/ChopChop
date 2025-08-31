import { createClient } from 'npm:@supabase/supabase-js@2';

const baseCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async req => {
  // Répond dynamiquement aux headers demandés par le préflight
  if (req.method === 'OPTIONS') {
    const reqHeaders =
      req.headers.get('Access-Control-Request-Headers') ??
      'authorization, x-client-info, apikey, content-type';
    return new Response('ok', {
      headers: {
        ...baseCors,
        'Access-Control-Allow-Headers': reqHeaders,
      },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    );

    const { data: lists, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ lists }), {
      headers: {
        ...baseCors,
        'Content-Type': 'application/json',
        // Facultatif: refléter les headers demandés aussi sur la réponse normale
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
      status: 200,
    });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...baseCors,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
      status: 400,
    });
  }
});
