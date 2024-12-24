import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MoniteToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const clientId = Deno.env.get('MONITE_CLIENT_ID');
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET');
  const apiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1';

  // Validate environment variables
  if (!clientId || !clientSecret) {
    console.error('Missing required environment variables:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    });
    return new Response(
      JSON.stringify({ 
        error: 'Server configuration error',
        details: 'Missing required Monite credentials'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    console.log('Starting Monite authentication request');

    // Create form data for token request
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    // Get access token
    const tokenResponse = await fetch(`${apiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    console.log('Token response status:', tokenResponse.status);
    
    const tokenData = await tokenResponse.json();
    console.log('Token response:', JSON.stringify(tokenData, null, 2));

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Token request failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        response: JSON.stringify(tokenData)
      });
      return new Response(
        JSON.stringify({ 
          error: 'Failed to authenticate with Monite API',
          details: tokenData.detail || 'Invalid token response'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const { path, method = 'GET', body } = await req.json();
    console.log('Making API request:', { path, method });

    // Make the actual API request
    const apiResponse = await fetch(`${apiUrl}${path}`, {
      method,
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) })
    });

    const responseData = await apiResponse.json();
    console.log('API response status:', apiResponse.status);
    console.log('API response:', JSON.stringify(responseData, null, 2));

    if (!apiResponse.ok) {
      console.error('API request failed:', {
        path,
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        response: JSON.stringify(responseData)
      });
      return new Response(
        JSON.stringify({ 
          error: `API request failed: ${apiResponse.statusText}`,
          details: responseData
        }),
        { 
          status: apiResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});