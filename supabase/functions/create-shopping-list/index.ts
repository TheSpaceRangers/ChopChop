import { createClient } from 'npm:@supabase/supabase-js@2';

const baseCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

Deno.serve(async req => {
  // Préflight CORS
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
      headers: {
        ...baseCors,
        'Content-Type': 'application/json',
      },
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
        headers: {
          ...baseCors,
          'Content-Type': 'application/json',
        },
        status: 401,
      });
    }

    const body = await req.json().catch(() => ({}));
    const name: unknown = body?.name;
    if (typeof name !== 'string' || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Paramètre "name" requis' }),
        {
          headers: {
            ...baseCors,
            'Content-Type': 'application/json',
          },
          status: 400,
        }
      );
    }

    const nowIso = new Date().toISOString();
    const { data: inserted, error } = await supabase
      .from('shopping_lists')
      .insert({
        name: name.trim(),
        user_id: userId,
        created_at: nowIso,
        updated_at: nowIso,
      })
      .select('*')
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ list: inserted }), {
      headers: {
        ...baseCors,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
      status: 201,
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
