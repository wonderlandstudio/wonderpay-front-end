export function isValidUUID(uuid: string) {
  // Allow both string UUID and null/undefined since some endpoints might not require it
  if (!uuid) return false;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function validateEnvironmentVariables() {
  const clientId = Deno.env.get('MONITE_CLIENT_ID');
  const clientSecret = Deno.env.get('MONITE_CLIENT_SECRET');
  const entityUserId = Deno.env.get('MONITE_ENTITY_USER_ID');
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing required Monite credentials');
  }

  if (!entityUserId) {
    throw new Error('MONITE_ENTITY_USER_ID is not set');
  }

  if (!isValidUUID(entityUserId)) {
    console.error('Invalid entity user ID:', entityUserId);
    throw new Error('MONITE_ENTITY_USER_ID must be a valid UUID');
  }

  return {
    clientId,
    clientSecret,
    entityUserId,
  };
}