import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { MoniteSDK } from 'npm:@monite/sdk-api'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')!
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Initialize Monite SDK
    const sdk = new MoniteSDK({
      apiUrl: Deno.env.get('MONITE_API_URL')!,
      entityId: Deno.env.get('MONITE_ENTITY_ID')!,
      fetchToken: async () => Deno.env.get('MONITE_TOKEN')!,
    })

    // Get user's entity from our database
    const { data: entities, error: entityError } = await supabaseClient
      .from('entities')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (entityError || !entities) {
      throw new Error('Entity not found')
    }

    // Create Monite entity if it doesn't exist
    if (!entities.monite_entity_id) {
      const response = await sdk.entities.create({
        organization: {
          name: entities.name,
          is_individual: false,
        },
      })

      // Update our entity with Monite ID
      const { error: updateError } = await supabaseClient
        .from('entities')
        .update({ monite_entity_id: response.id })
        .eq('id', entities.id)

      if (updateError) {
        throw new Error('Failed to update entity')
      }

      // Create Monite settings
      const { error: settingsError } = await supabaseClient
        .from('monite_settings')
        .insert({
          user_id: user.id,
          entity_id: response.id,
          api_key: Deno.env.get('MONITE_TOKEN')!,
          environment: 'sandbox'
        })

      if (settingsError) {
        throw new Error('Failed to create Monite settings')
      }
    }

    return new Response(
      JSON.stringify({ message: 'Monite entity created successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})