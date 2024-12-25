import { MoniteSDK } from "@monite/sdk-api";
import { supabase } from "@/integrations/supabase/client";
import { MoniteMonitoringService } from "../monitoring/moniteMonitoring";

export class MoniteClient {
  private static instance: MoniteSDK | null = null;
  private static refreshPromise: Promise<void> | null = null;

  static async getInstance(): Promise<MoniteSDK> {
    if (this.instance) {
      return this.instance;
    }

    return this.initializeClient();
  }

  private static async initializeClient(): Promise<MoniteSDK> {
    console.log('Initializing Monite client');

    const { data: settings } = await supabase
      .from('monite_settings')
      .select('*')
      .single();

    if (!settings) {
      throw new Error('Monite settings not found');
    }

    this.instance = new MoniteSDK({
      apiUrl: settings.api_url || 'https://api.sandbox.monite.com/v1',
      entityId: settings.entity_id,
      fetchToken: async () => {
        try {
          const { data: tokens } = await supabase
            .from('monite_tokens')
            .select('*')
            .eq('entity_id', settings.entity_id)
            .single();

          if (!tokens || new Date(tokens.expires_at) <= new Date()) {
            return this.refreshToken(settings);
          }

          return {
            access_token: tokens.access_token,
            token_type: 'Bearer',
            expires_in: Math.floor((new Date(tokens.expires_at).getTime() - Date.now()) / 1000),
          };
        } catch (error) {
          console.error('Error fetching token:', error);
          await MoniteMonitoringService.logTokenRefresh(false, { error });
          throw error;
        }
      },
    });

    return this.instance;
  }

  private static async refreshToken(settings: any) {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${settings.api_url}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-monite-version': '2024-01-31',
          },
          body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: settings.client_id,
            client_secret: settings.client_secret,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const tokenData = await response.json();

        const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

        await supabase
          .from('monite_tokens')
          .upsert({
            entity_id: settings.entity_id,
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_at: expiresAt.toISOString(),
            user_id: (await supabase.auth.getUser()).data.user?.id,
          });

        await MoniteMonitoringService.logTokenRefresh(true);

        return tokenData;
      } catch (error) {
        console.error('Error refreshing token:', error);
        await MoniteMonitoringService.logTokenRefresh(false, { error });
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  static async resetInstance() {
    this.instance = null;
    this.refreshPromise = null;
  }
}