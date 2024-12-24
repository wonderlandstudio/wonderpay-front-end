import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
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

    // Create token request body
    const tokenRequestBody = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    };

    console.log('Making token request to Monite API');

    // Get access token
    const tokenResponse = await fetch(`${apiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(tokenRequestBody).toString()
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token request failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorData
      });
      return new Response(
        JSON.stringify({ 
          error: 'Failed to authenticate with Monite API',
          details: errorData
        }),
        { 
          status: tokenResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('Successfully obtained Monite access token');

    // Parse request body
    const { path, method = 'GET', body } = await req.json();
    console.log('Making API request:', { path, method });

    // Ensure path starts with a forward slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Make the actual API request
    const apiResponse = await fetch(`${apiUrl}${normalizedPath}`, {
      method,
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) })
    });

    const responseData = await apiResponse.json();
    console.log('API response status:', apiResponse.status);

    if (!apiResponse.ok) {
      console.error('API request failed:', {
        path: normalizedPath,
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        response: responseData
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