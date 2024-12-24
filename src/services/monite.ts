import { supabase } from "@/integrations/supabase/client";

export interface MoniteRequestOptions {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

export class MoniteService {
  static async makeRequest({ path, method = 'GET', body }: MoniteRequestOptions) {
    console.log(`Making Monite request to ${path}`);
    
    try {
      const { data, error } = await supabase.functions.invoke('monite', {
        body: { path, method, body },
      });

      if (error) {
        console.error('Error making Monite request:', error);
        throw error;
      }

      return data;
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