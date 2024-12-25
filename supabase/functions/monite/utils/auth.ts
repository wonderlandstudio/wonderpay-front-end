import { corsHeaders } from './cors.ts';

export async function getMoniteToken(clientId: string, clientSecret: string, entityUserId: string) {
  const apiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1';
  
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

  return await tokenResponse.json();
}