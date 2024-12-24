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

  const clientId = Deno.env.get('MONITE_CLIENT_ID');
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET');
  const apiUrl = Deno.env.get('MONITE_API_URL');

  // Validate environment variables
  if (!clientId || !clientSecret || !apiUrl) {
    console.error('Missing required environment variables:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      hasApiUrl: !!apiUrl
    });
    return new Response(
      JSON.stringify({ 
        error: 'Server configuration error',
        details: 'Missing required environment variables'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    console.log('Starting Monite authentication request');

    // Get access token with detailed logging
    const tokenResponse = await fetch(`${apiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      })
    });

    console.log('Token response status:', tokenResponse.status);
    
    const tokenResponseText = await tokenResponse.text();
    console.log('Token response body:', tokenResponseText);

    if (!tokenResponse.ok) {
      console.error('Token request failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        response: tokenResponseText
      });
      return new Response(
        JSON.stringify({ 
          error: 'Failed to authenticate with Monite API',
          details: `Status: ${tokenResponse.status}, Response: ${tokenResponseText}`
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse token response
    let tokenData;
    try {
      tokenData = JSON.parse(tokenResponseText);
    } catch (error) {
      console.error('Failed to parse token response:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid authentication response',
          details: error.message
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!tokenData.access_token) {
      console.error('No access token in response:', tokenData);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid token response',
          details: 'No access token received'
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

    const apiResponseText = await apiResponse.text();
    console.log('API response status:', apiResponse.status);
    console.log('API response body:', apiResponseText);

    if (!apiResponse.ok) {
      console.error('API request failed:', {
        path,
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        response: apiResponseText
      });
      return new Response(
        JSON.stringify({ 
          error: `API request failed: ${apiResponse.statusText}`,
          details: apiResponseText
        }),
        { 
          status: apiResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse API response
    let responseData;
    try {
      responseData = JSON.parse(apiResponseText);
    } catch (error) {
      console.error('Failed to parse API response:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid API response',
          details: error.message
        }),
        { 
          status: 500, 
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