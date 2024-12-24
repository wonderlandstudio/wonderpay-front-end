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

  static async getPayables(params?: Record<string, any>) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.makeRequest({
      path: `/payables${queryString}`,
    });
  }

  static async getReceivables(params?: Record<string, any>) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.makeRequest({
      path: `/receivables${queryString}`,
    });
  }

  static async createPayable(data: any) {
    return this.makeRequest({
      path: '/payables',
      method: 'POST',
      body: data,
    });
  }

  static async createReceivable(data: any) {
    return this.makeRequest({
      path: '/receivables',
      method: 'POST',
      body: data,
    });
  }
}