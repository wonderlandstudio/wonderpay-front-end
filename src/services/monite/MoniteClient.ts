import { MoniteSDK } from '@monite/sdk-api';
import { supabase } from '@/integrations/supabase/client';

export class MoniteClient {
  private static instance: MoniteSDK | null = null;
  private static initializationPromise: Promise<MoniteSDK> | null = null;

  static async getInstance(): Promise<MoniteSDK> {
    if (this.instance) {
      return this.instance;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('Initializing MoniteSDK...');
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error('No active session found');
        }

        const { data: settings, error: settingsError } = await supabase
          .from('monite_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (settingsError || !settings) {
          throw new Error('Failed to fetch Monite settings');
        }

        const sdk = new MoniteSDK({
          apiUrl: 'https://api.sandbox.monite.com/v1',
          entityId: settings.entity_id,
          fetchToken: async () => {
            const response = await fetch('https://api.sandbox.monite.com/v1/auth/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-monite-version': '2024-05-25'
              },
              body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: settings.api_key,
                client_secret: process.env.MONITE_CLIENT_SECRET
              })
            });

            if (!response.ok) {
              throw new Error('Failed to fetch token');
            }

            const data = await response.json();
            return {
              access_token: data.access_token,
              token_type: 'Bearer',
              expires_in: data.expires_in
            };
          }
        });

        console.log('MoniteSDK initialized successfully');
        
        this.instance = sdk;
        resolve(sdk);
      } catch (error) {
        console.error('Failed to initialize MoniteSDK:', error);
        reject(error);
        this.initializationPromise = null;
      }
    });

    return this.initializationPromise;
  }

  static resetInstance() {
    this.instance = null;
    this.initializationPromise = null;
  }
}