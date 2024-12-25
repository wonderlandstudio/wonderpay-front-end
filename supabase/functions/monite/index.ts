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
    const entityUserId = Deno.env.get('MONITE_ENTITY_USER_ID');
    const apiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1';

    // Validate environment variables
    if (!clientId || !clientSecret || !entityUserId) {
      console.error('Missing required environment variables:', {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasEntityUserId: !!entityUserId,
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

    // Parse request body
    const { path, method = 'GET', body } = await req.json();
    console.log('Received request:', { path, method });

    // Get access token first
    console.log('Making token request to Monite API');
    
    const tokenBody = {
      grant_type: 'entity_user',
      client_id: clientId,
      client_secret: clientSecret,
      entity_user_id: entityUserId,
    };

    console.log('Token request body:', {
      ...tokenBody,
      client_secret: '[REDACTED]'
    });

    const tokenResponse = await fetch(`${apiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-monite-version': '2023-06-04',
      },
      body: JSON.stringify(tokenBody)
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Token request failed:', {
        status: tokenResponse.status,
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

    // Handle dashboard overview request
    if (path === '/dashboard/overview') {
      console.log('Fetching payables data...');
      // Fetch payables data
      const payablesResponse = await fetch(`${apiUrl}/payables`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
          'x-monite-version': '2023-06-04',
        },
      });

      console.log('Fetching receivables data...');
      // Fetch receivables data
      const receivablesResponse = await fetch(`${apiUrl}/receivables`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
          'x-monite-version': '2023-06-04',
        },
      });

      if (!payablesResponse.ok || !receivablesResponse.ok) {
        console.error('Failed to fetch data:', {
          payablesStatus: payablesResponse.status,
          receivablesStatus: receivablesResponse.status
        });
        return new Response(
          JSON.stringify({ 
            error: 'Failed to fetch dashboard data',
            details: {
              payables: await payablesResponse.text(),
              receivables: await receivablesResponse.text()
            }
          }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      const [payables, receivables] = await Promise.all([
        payablesResponse.json(),
        receivablesResponse.json(),
      ]);

      console.log('Successfully fetched payables and receivables data');

      // Calculate dashboard metrics
      const expenses = payables.data?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;
      const income = receivables.data?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;
      const balance = income - expenses;

      // Create transactions data for the chart
      const transactions = [...(payables.data || []), ...(receivables.data || [])]
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .map((item: any) => ({
          date: item.created_at.split('T')[0],
          value: item.amount || 0
        }));

      console.log('Returning dashboard overview data');
      return new Response(
        JSON.stringify({
          balance,
          income,
          expenses,
          transactions
        }),
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