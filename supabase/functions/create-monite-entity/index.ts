import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { MoniteSDK } from 'https://esm.sh/@monite/sdk-api'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      console.error('Auth error:', userError)
      throw new Error('Unauthorized')
    }

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    console.log('Getting Monite access token')
    
    const moniteApiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1'
    const moniteClientId = Deno.env.get('MONITE_CLIENT_ID')
    const moniteClientSecret = Deno.env.get('MONITE_CLIENT_SECRET')

    if (!moniteClientId || !moniteClientSecret) {
      throw new Error('Missing Monite credentials')
    }

    const tokenResponse = await fetch(`${moniteApiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-monite-version': '2024-05-25'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: moniteClientId,
        client_secret: moniteClientSecret
      })
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Monite token')
    }

    const { access_token } = await tokenResponse.json()

    // Initialize SDK with temporary entity ID for creation
    const sdk = new MoniteSDK({
      apiUrl: moniteApiUrl,
      entityId: 'temp', // Temporary ID that will be replaced
      fetchToken: async () => ({
        access_token,
        token_type: 'Bearer',
        expires_in: 3600
      })
    })

    console.log('Creating Monite entity')
    
    const response = await sdk.api.entities.create({
      type: 'individual',
      email: user.email,
      address: {
        city: 'los angeles',
        country: 'US',
        line1: 'California',
        postal_code: '90046',
        state: 'CA'
      },
      individual: {
        first_name: profile?.username?.split(' ')[0] || 'User',
        last_name: profile?.username?.split(' ')[1] || 'Name'
      }
    })

    console.log('Monite entity created:', response)

    // Update the entities table
    const { error: updateError } = await supabaseClient
      .from('entities')
      .update({ monite_entity_id: response.id })
      .eq('user_id', user.id)

    if (updateError) {
      throw new Error('Failed to update entity')
    }

    return new Response(
      JSON.stringify({ success: true, entity: response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})