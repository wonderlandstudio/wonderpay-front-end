import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from '@supabase/supabase-js'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get auth user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const authHeader = req.headers.get('Authorization')!
    const { user, error: getUserError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (getUserError || !user) {
      throw new Error('Unauthorized')
    }

    // Get existing entity
    const { data: entity, error: getEntityError } = await supabaseClient
      .from('entities')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (getEntityError) {
      throw new Error('Failed to get entity')
    }

    if (!entity) {
      throw new Error('Entity not found')
    }

    // Initialize Monite SDK
    const MoniteSDK = await import('@monite/sdk-api')
    const sdk = new MoniteSDK.MoniteSDK({
      apiUrl: Deno.env.get('MONITE_API_URL')!,
      entityId: '',
      fetchToken: async () => {
        const response = await fetch(`${Deno.env.get('MONITE_API_URL')!}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-monite-version': '2024-01-31',
          },
          body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: Deno.env.get('MONITE_CLIENT_ID')!,
            client_secret: Deno.env.get('MONITE_CLIENT_SECRET')!,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch Monite token')
        }

        return response.json()
      },
    })

    // Create Monite entity
    const response = await sdk.entity.create({
      type: 'organization',
      organization: {
        legal_name: entity.name,
        is_supplier: true,
        tax_id: '123456789',
      },
    })

    // Update entity with Monite ID
    const { error: updateError } = await supabaseClient
      .from('entities')
      .update({ monite_entity_id: response.id })
      .eq('user_id', user.id)

    if (updateError) {
      throw new Error('Failed to update entity')
    }

    return new Response(
      JSON.stringify({ success: true, entity_id: response.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})