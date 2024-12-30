import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from './types';

// This is a mock client for development
const mockSupabaseClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      single: async () => ({ data: null, error: null }),
      maybeSingle: async () => ({ data: null, error: null }),
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
        order: (column: string, { ascending }: { ascending: boolean }) => ({
          data: [],
          error: null,
        }),
      }),
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        data: [],
        error: null,
      }),
    }),
    insert: (data: any) => ({
      select: (columns?: string) => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
    upsert: (data: any) => ({
      select: (columns?: string) => ({
        single: async () => ({ data: null, error: null }),
      }),
    }),
  }),
  functions: {
    invoke: async (name: string, options?: { headers?: Record<string, string> }) => ({ 
      data: null, 
      error: null 
    }),
  },
  channel: (name: string) => ({
    on: (event: string, filter: any, callback: (payload: any) => void) => ({
      subscribe: () => {},
    }),
  }),
  removeChannel: (channel: any) => {},
} as unknown as SupabaseClient<Database>;

export const supabase = mockSupabaseClient;