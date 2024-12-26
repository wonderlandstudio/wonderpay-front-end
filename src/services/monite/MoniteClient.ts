import { MoniteSDK } from "@monite/sdk-api";
import { supabase } from "@/integrations/supabase/client";
import { MoniteMonitoringService } from "../monitoring/moniteMonitoring";
import { statusTracker } from "../monitoring/StatusTracker";
import { toast } from "@/hooks/use-toast";

export class MoniteClient {
  private static instance: MoniteSDK | null = null;
  private static refreshPromise: Promise<void> | null = null;

  static async getInstance(): Promise<MoniteSDK> {
    try {
      await statusTracker.log('MoniteClient', 'Getting Monite client instance', 'info');

      if (this.instance) {
        await statusTracker.log('MoniteClient', 'Returning existing instance', 'info');
        return this.instance;
      }

      return this.initializeClient();
    } catch (error) {
      await statusTracker.log('MoniteClient', 'Error getting instance', 'error', { error });
      throw error;
    }
  }

  private static async initializeClient(): Promise<MoniteSDK> {
    try {
      await statusTracker.log('MoniteClient', 'Initializing new client', 'info');

      const { data: settings, error: settingsError } = await supabase
        .from('monite_settings')
        .select('*')
        .single();

      if (settingsError) {
        await statusTracker.log('MoniteClient', 'Failed to fetch Monite settings', 'error', { error: settingsError });
        toast({
          title: "Monite Setup Required",
          description: "Please configure your Monite settings in the dashboard.",
          variant: "destructive",
        });
        throw settingsError;
      }

      if (!settings) {
        await statusTracker.log('MoniteClient', 'No Monite settings found', 'error');
        toast({
          title: "Monite Setup Required",
          description: "Please configure your Monite settings in the dashboard.",
          variant: "destructive",
        });
        throw new Error('Monite settings not found');
      }

      const apiUrl = settings.environment === 'sandbox' 
        ? 'https://api.sandbox.monite.com/v1'
        : 'https://api.monite.com/v1';

      await statusTracker.log('MoniteClient', 'Creating new SDK instance', 'info', { 
        environment: settings.environment,
        entityId: settings.entity_id 
      });

      this.instance = new MoniteSDK({
        apiUrl,
        entityId: settings.entity_id,
        headers: {
          'x-monite-version': '2024-05-25'
        },
        fetchToken: async () => {
          try {
            await statusTracker.log('MoniteClient', 'Fetching token', 'info');
            console.log('Fetching Monite token...');

            const response = await fetch(`${apiUrl}/auth/token`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-monite-version': '2024-05-25'
              },
              body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: settings.api_key,
                client_secret: process.env.MONITE_CLIENT_SECRET || '',
              })
            });

            if (!response.ok) {
              const errorData = await response.json();
              await statusTracker.log('MoniteClient', 'Token request failed', 'error', { 
                status: response.status,
                error: errorData 
              });
              throw new Error('Failed to fetch token');
            }

            const tokenData = await response.json();
            await statusTracker.log('MoniteClient', 'Token fetched successfully', 'success');
            console.log('Monite token fetched successfully');

            return {
              access_token: tokenData.access_token,
              token_type: 'Bearer',
              expires_in: tokenData.expires_in || 3600
            };
          } catch (error) {
            await statusTracker.log('MoniteClient', 'Error in fetchToken', 'error', { error });
            console.error('Error in fetchToken:', error);
            throw error;
          }
        },
      });

      await statusTracker.log('MoniteClient', 'Successfully initialized client', 'success');
      console.log('Successfully initialized Monite client');
      return this.instance;
    } catch (error) {
      await statusTracker.log('MoniteClient', 'Failed to initialize client', 'error', { error });
      console.error('Failed to initialize Monite client:', error);
      throw error;
    }
  }

  static async resetInstance() {
    await statusTracker.log('MoniteClient', 'Resetting client instance', 'info');
    console.log('Resetting Monite client instance');
    this.instance = null;
    this.refreshPromise = null;
  }
}