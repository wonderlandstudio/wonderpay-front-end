import { MoniteSDK } from "@monite/sdk-api";
import { supabase } from "@/integrations/supabase/client";

export class MoniteService {
  private static sdk: MoniteSDK | null = null;

  private static async initializeSDK() {
    if (!this.sdk) {
      console.log('Initializing Monite SDK');
      
      this.sdk = new MoniteSDK({
        apiUrl: process.env.MONITE_API_URL || 'https://api.sandbox.monite.com/v1',
        entityId: process.env.MONITE_ENTITY_ID,
        fetchToken: async () => {
          console.log('Fetching new Monite token');
          
          const response = await fetch(`${process.env.MONITE_API_URL || 'https://api.sandbox.monite.com/v1'}/auth/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-monite-version': '2023-06-04',
            },
            body: JSON.stringify({
              grant_type: 'entity_user',
              entity_user_id: process.env.MONITE_ENTITY_USER_ID,
              client_id: process.env.MONITE_CLIENT_ID,
              client_secret: process.env.MONITE_CLIENT_SECRET,
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
      
      // Make the request using the appropriate SDK method based on the path
      if (path === '/dashboard/overview') {
        return sdk.api.dashboard.getOverview();
      }

      if (path.startsWith('/entities')) {
        if (method === 'GET') {
          if (path === '/entities') {
            return sdk.api.entities.getList();
          }
          const entityId = path.split('/')[2];
          return sdk.api.entities.getById({ id: entityId });
        }
        if (method === 'POST') {
          return sdk.api.entities.create({ data: body });
        }
        if (method === 'PUT') {
          const entityId = path.split('/')[2];
          return sdk.api.entities.update({ id: entityId, data: body });
        }
      }

      throw new Error(`Unsupported path: ${path}`);
    } catch (error) {
      console.error('Error in MoniteService:', error);
      throw error;
    }
  }

  static async getEntities() {
    return this.makeRequest({
      path: '/entities',
    });
  }

  static async createEntity(data: any) {
    return this.makeRequest({
      path: '/entities',
      method: 'POST',
      body: data,
    });
  }

  static async getEntity(id: string) {
    return this.makeRequest({
      path: `/entities/${id}`,
    });
  }

  static async updateEntity(id: string, data: any) {
    return this.makeRequest({
      path: `/entities/${id}`,
      method: 'PUT',
      body: data,
    });
  }

  static async getDashboardData() {
    return this.makeRequest({
      path: '/dashboard/overview',
    });
  }
}