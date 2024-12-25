import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders, handleCors } from './utils/cors.ts';
import { getMoniteToken } from './utils/auth.ts';
import { getDashboardData } from './utils/dashboard.ts';

serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const apiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1';
    const { path, method = 'GET', body } = await req.json();
    console.log('Received request:', { path, method });

    // Get access token
    const tokenData = await getMoniteToken(apiUrl);
    console.log('Successfully obtained Monite access token');

    // Handle dashboard overview request
    if (path === '/dashboard/overview') {
      const dashboardData = await getDashboardData(apiUrl, tokenData.access_token);
      console.log('Returning dashboard overview data');
      return new Response(
        JSON.stringify(dashboardData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For all other requests, pass them through to Monite API
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    console.log('Making API request to:', `${apiUrl}${normalizedPath}`);

    const apiResponse = await fetch(`${apiUrl}${normalizedPath}`, {
      method,
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
        'x-monite-version': '2023-06-04',
      },
      ...(body && { body: JSON.stringify(body) })
    });

    const responseData = await apiResponse.json();
    console.log('API response status:', apiResponse.status);

    if (!apiResponse.ok) {
      console.error('API request failed:', {
        path: normalizedPath,
        status: apiResponse.status,
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