import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../monite/utils/cors.ts'

const MONITE_API_URL = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1'

async function getMoniteToken() {
  const clientId = Deno.env.get('MONITE_CLIENT_ID')
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET')
  
  const response = await fetch(`${MONITE_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Monite-Version': '2024-05-25'
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    })
  })

  if (!response.ok) {
    throw new Error('Failed to get Monite token')
  }

  const data = await response.json()
  return data.access_token
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const token = await getMoniteToken()
    const entityId = Deno.env.get('MONITE_ENTITY_ID')

    const response = await fetch(`${MONITE_API_URL}/entity_users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Monite-Version': '2024-05-25'
      },
      body: JSON.stringify({
        entity_id: entityId,
        role: 'owner',
        status: 'active',
        email: 'your-email@example.com' // You should pass this from the request
      })
    })

    if (!response.ok) {
      throw new Error('Failed to create Monite entity user')
    }

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  }
})