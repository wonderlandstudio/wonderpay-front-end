import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'
import { MoniteSDK } from 'npm:@monite/sdk-api'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting create-monite-entity function');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const authHeader = req.headers.get('Authorization')!
    const { user, error: getUserError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (getUserError || !user) {
      console.error('Unauthorized:', getUserError);
      throw new Error('Unauthorized')
    }

    const { data: entity, error: getEntityError } = await supabaseClient
      .from('entities')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (getEntityError) {
      console.error('Failed to get entity:', getEntityError);
      throw new Error('Failed to get entity')
    }

    if (!entity) {
      console.error('Entity not found');
      throw new Error('Entity not found')
    }

    console.log('Initializing Monite SDK');

    const moniteApiUrl = Deno.env.get('MONITE_API_URL');
    const moniteClientId = Deno.env.get('MONITE_CLIENT_ID');
    const moniteClientSecret = Deno.env.get('MONITE_CLIENT_SECRET');

    if (!moniteApiUrl || !moniteClientId || !moniteClientSecret) {
      console.error('Missing Monite configuration');
      throw new Error('Missing required Monite configuration');
    }

    const sdk = new MoniteSDK({
      apiUrl: moniteApiUrl,
      entityId: '',
      fetchToken: async () => {
        console.log('Fetching Monite token');
        const response = await fetch(`${moniteApiUrl}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-monite-version': '2024-01-31',
          },
          body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: moniteClientId,
            client_secret: moniteClientSecret,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to fetch Monite token:', errorText);
          throw new Error('Failed to fetch Monite token')
        }

        return response.json()
      },
    })

    console.log('Creating Monite entity');

    try {
      const response = await sdk.entities.create({
        type: 'organization',
        organization: {
          legal_name: entity.name,
          is_supplier: true,
          tax_id: '123456789',
        },
      })

      console.log('Monite entity created:', response);

      const { error: updateError } = await supabaseClient
        .from('entities')
        .update({ monite_entity_id: response.id })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Failed to update entity:', updateError);
        throw new Error('Failed to update entity')
      }

      return new Response(
        JSON.stringify({ success: true, entity_id: response.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error creating Monite entity:', error);
      throw error;
    }

  } catch (error) {
    console.error('Error in create-monite-entity function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})