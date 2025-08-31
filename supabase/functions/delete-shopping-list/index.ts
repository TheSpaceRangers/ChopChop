import { createClient } from 'npm:@supabase/supabase-js@2';

const baseCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async req => {
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

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non supportée' }), {
      headers: { ...baseCors, 'Content-Type': 'application/json' },
      status: 405,
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

    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Non authentifié' }), {
        headers: { ...baseCors, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    const body = await req.json().catch(() => ({}));
    const id: unknown = body?.id;
    if (typeof id !== 'string' || id.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'Paramètre "id" requis' }), {
        headers: { ...baseCors, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const { error } = await supabase
      .from('shopping_lists')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        ...baseCors,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
      status: 200,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return new Response(JSON.stringify({ error: message }), {
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
