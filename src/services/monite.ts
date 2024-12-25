import { MoniteSDK } from "@monite/sdk-api";
import { supabase } from "@/integrations/supabase/client";

export class MoniteService {
  private static sdk: MoniteSDK | null = null;

  private static async initializeSDK() {
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

  static async makeRequest({ path, method = 'GET', body }: {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
  }) {
    console.log(`Making Monite request to ${path}`);
    
    try {
      const sdk = await this.initializeSDK();
      
      if (path === '/dashboard/overview') {
        const [payablesResponse, receivablesResponse] = await Promise.all([
          sdk.api.payables.getAllPayables(),
          sdk.api.receivable.getAllReceivables()
        ]);
        
        const payables = payablesResponse.data || [];
        const receivables = receivablesResponse.data || [];

        const expenses = payables.reduce((sum, item) => {
          const amount = typeof item.total_amount === 'object' ? 
            Number(item.total_amount?.value) : 
            Number(item.total_amount);
          return sum + (amount || 0);
        }, 0);

        const income = receivables.reduce((sum, item) => {
          const amount = typeof item.total_amount === 'object' ? 
            Number(item.total_amount?.value) : 
            Number(item.total_amount);
          return sum + (amount || 0);
        }, 0);

        const balance = income - expenses;

        const transactions = [...payables, ...receivables]
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          .map(item => ({
            date: item.created_at.split('T')[0],
            value: typeof item.total_amount === 'object' ? 
              Number(item.total_amount?.value) : 
              Number(item.total_amount)
          }));

        return {
          balance,
          income,
          expenses,
          transactions
        };
      }

      throw new Error(`Unsupported path: ${path}`);
    } catch (error) {
      console.error('Error in MoniteService:', error);
      throw error;
    }
  }

  static async getDashboardData() {
    return this.makeRequest({
      path: '/dashboard/overview',
    });
  }
}