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
        
        // Get the current user's session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          throw new Error('No active session found');
        }

        // Fetch Monite settings for the current user
        const { data: settings, error: settingsError } = await supabase
          .from('monite_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (settingsError || !settings) {
          throw new Error('Failed to fetch Monite settings');
        }

        // Initialize the SDK
        const sdk = new MoniteSDK({
          entityId: settings.entity_id,
          apiKey: settings.api_key,
          environment: settings.environment
        });

        await sdk.authenticate();
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