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

            const { data: tokens, error: tokensError } = await supabase
              .from('monite_tokens')
              .select('*')
              .eq('entity_id', settings.entity_id)
              .single();

            if (tokensError) {
              await statusTracker.log('MoniteClient', 'Error fetching tokens', 'error', { error: tokensError });
              console.error('Error fetching tokens:', tokensError);
              throw tokensError;
            }

            if (!tokens || new Date(tokens.expires_at) <= new Date()) {
              await statusTracker.log('MoniteClient', 'Token expired or not found, refreshing', 'warning');
              console.log('Token expired or not found, refreshing...');
              return await this.refreshToken(settings);
            }

            await statusTracker.log('MoniteClient', 'Using existing token', 'success');
            console.log('Using existing Monite token');
            return {
              access_token: tokens.access_token,
              token_type: 'Bearer',
              expires_in: Math.floor((new Date(tokens.expires_at).getTime() - Date.now()) / 1000),
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

  private static async refreshToken(settings: any) {
    try {
      await statusTracker.log('MoniteClient', 'Starting token refresh', 'info');
      console.log('Starting Monite token refresh...');

      if (this.refreshPromise) {
        await statusTracker.log('MoniteClient', 'Using existing refresh promise', 'info');
        return this.refreshPromise;
      }

      const apiUrl = settings.environment === 'sandbox' 
        ? 'https://api.sandbox.monite.com/v1' 
        : 'https://api.monite.com/v1';

      const response = await fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-monite-version': '2024-05-25',
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: settings.client_id,
          client_secret: settings.client_secret,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        await statusTracker.log('MoniteClient', 'Token refresh failed', 'error', { 
          status: response.status,
          error: errorData 
        });
        console.error('Token refresh failed:', errorData);
        throw new Error('Failed to refresh token');
      }

      const tokenData = await response.json();
      const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

      const { error: upsertError } = await supabase
        .from('monite_tokens')
        .upsert({
          entity_id: settings.entity_id,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: expiresAt.toISOString(),
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });

      if (upsertError) {
        await statusTracker.log('MoniteClient', 'Failed to save new token', 'error', { error: upsertError });
        console.error('Failed to save new token:', upsertError);
        throw upsertError;
      }

      await statusTracker.log('MoniteClient', 'Token refreshed successfully', 'success');
      console.log('Monite token refreshed successfully');
      await MoniteMonitoringService.logTokenRefresh(true);

      return tokenData;
    } catch (error) {
      await statusTracker.log('MoniteClient', 'Token refresh failed', 'error', { error });
      console.error('Token refresh failed:', error);
      await MoniteMonitoringService.logTokenRefresh(false, { error });
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