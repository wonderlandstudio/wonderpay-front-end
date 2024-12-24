import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getMoniteToken() {
  const clientId = Deno.env.get('MONITE_CLIENT_ID');
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET');
  const apiUrl = 'https://api.sandbox.monite.com/v1';

  if (!clientId || !clientSecret) {
    console.error('Missing required environment variables:', {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    });
    throw new Error('Missing required Monite configuration');
  }

  // Validate UUID format for client_id
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(clientId)) {
    console.error('Invalid client_id format. Must be a valid UUID.');
    throw new Error('Invalid Monite client_id format');
  }

  try {
    console.log('Requesting Monite token with credentials...');
    const response = await fetch(`${apiUrl}/auth/token`, {
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
    });

    const responseText = await response.text();
    console.log('Raw token response:', responseText);

    if (!response.ok) {
      console.error('Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
      throw new Error(`Token request failed: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Failed to parse token response:', error);
      throw new Error('Invalid token response format');
    }

    if (!data.access_token) {
      console.error('No access token in response:', data);
      throw new Error('No access token received');
    }

    console.log('Successfully obtained Monite token');
    return data.access_token;
  } catch (error) {
    console.error('Error getting Monite token:', error);
    throw error;
  }
}

async function handleMoniteRequest(req: Request) {
  try {
    const { path, method, body } = await req.json();
    console.log(`Processing Monite request for path: ${path}, method: ${method}`);

    const token = await getMoniteToken();
    const entityId = Deno.env.get('MONITE_ENTITY_ID');

    if (!entityId) {
      throw new Error('Missing MONITE_ENTITY_ID configuration');
    }

    // Special handling for dashboard overview endpoint
    if (path === '/dashboard/overview') {
      try {
        console.log('Fetching balance data');
        const balanceResponse = await fetch(`https://api.sandbox.monite.com/v1/balance`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Monite-Entity-Id': entityId,
            'X-Monite-Version': '2024-05-25',
          },
        });

        if (!balanceResponse.ok) {
          const errorText = await balanceResponse.text();
          console.error('Balance request failed:', {
            status: balanceResponse.status,
            statusText: balanceResponse.statusText,
            body: errorText
          });
          throw new Error(`Balance request failed: ${errorText}`);
        }

        const balanceData = await balanceResponse.json();
        console.log('Successfully fetched balance data:', balanceData);

        console.log('Fetching transactions data');
        const transactionsResponse = await fetch(`https://api.sandbox.monite.com/v1/transactions?limit=30`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Monite-Entity-Id': entityId,
            'X-Monite-Version': '2024-05-25',
          },
        });

        if (!transactionsResponse.ok) {
          const errorText = await transactionsResponse.text();
          console.error('Transactions request failed:', {
            status: transactionsResponse.status,
            statusText: transactionsResponse.statusText,
            body: errorText
          });
          throw new Error(`Transactions request failed: ${errorText}`);
        }

        const transactionsData = await transactionsResponse.json();
        console.log('Successfully fetched transactions data');

        const income = transactionsData.data
          .filter((t: any) => t.type === 'income')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const expenses = transactionsData.data
          .filter((t: any) => t.type === 'expense')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const chartData = transactionsData.data.map((t: any) => ({
          date: new Date(t.created_at).toLocaleDateString(),
          value: t.amount
        }));

        return new Response(
          JSON.stringify({
            balance: balanceData.available || 0,
            income,
            expenses,
            transactions: chartData
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error processing dashboard overview:', error);
        throw error;
      }
    }

    // Handle other endpoints
    const response = await fetch(`https://api.sandbox.monite.com/v1${path}`, {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Monite-Entity-Id': entityId,
        'X-Monite-Version': '2024-05-25',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in Monite request:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  return handleMoniteRequest(req);
});