import { MoniteSDK } from "@monite/sdk-api";

export class MoniteAuthService {
  private static sdk: MoniteSDK | null = null;

  static async initializeSDK() {
    if (!this.sdk) {
      console.log('Initializing Monite SDK');
      
      const apiUrl = import.meta.env.VITE_MONITE_API_URL || 'https://api.sandbox.monite.com/v1';
      const entityId = import.meta.env.VITE_MONITE_ENTITY_ID;
      const entityUserId = import.meta.env.VITE_MONITE_ENTITY_USER_ID;
      const clientId = import.meta.env.VITE_MONITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_MONITE_CLIENT_SECRET;

      if (!entityId || !entityUserId || !clientId || !clientSecret) {
        throw new Error('Missing required Monite configuration');
      }

      this.sdk = new MoniteSDK({
        apiUrl,
        entityId,
        fetchToken: async () => {
          console.log('Fetching new Monite token');
          
          const response = await fetch(`${apiUrl}/auth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-monite-version': '2023-06-04',
            },
            body: JSON.stringify({
              grant_type: 'entity_user',
              entity_user_id: entityUserId,
              client_id: clientId,
              client_secret: clientSecret,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            console.error('Failed to fetch Monite token:', error);
            throw new Error('Failed to fetch Monite token');
          }

          return response.json();
        },
      });
    }
    return this.sdk;
  }
}