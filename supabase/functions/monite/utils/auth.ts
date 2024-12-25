import { corsHeaders } from './cors.ts';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getMoniteToken(apiUrl: string): Promise<TokenResponse> {
  const clientId = Deno.env.get('MONITE_CLIENT_ID');
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET');
  const entityUserId = Deno.env.get('MONITE_ENTITY_USER_ID');

  if (!clientId || !clientSecret || !entityUserId) {
    throw new Error('Missing required Monite credentials');
  }

  console.log('Making token request to Monite API');
  
  const tokenResponse = await fetch(`${apiUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-monite-version': '2023-06-04',
    },
    body: JSON.stringify({
      grant_type: 'entity_user',
      client_id: clientId,
      client_secret: clientSecret,
      entity_user_id: entityUserId.trim(), // Ensure no whitespace
    })
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    console.error('Token request failed:', {
      status: tokenResponse.status,
      error: errorData
    });
    throw new Error('Failed to authenticate with Monite API');
  }

  return tokenResponse.json();
}