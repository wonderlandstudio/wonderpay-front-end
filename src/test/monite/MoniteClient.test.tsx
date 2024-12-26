import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoniteClient } from '@/services/monite/MoniteClient';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestQueryBuilder } from '@supabase/postgrest-js';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      eq: vi.fn(),
      single: vi.fn(),
    } as unknown as PostgrestQueryBuilder<any>)),
    auth: {
      getUser: vi.fn()
    }
  }
}));

describe('MoniteClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    MoniteClient.resetInstance();
  });

  it('should initialize with sandbox environment', async () => {
    const mockSettings = {
      environment: 'sandbox',
      entity_id: 'test-entity',
      client_id: 'test-client',
      client_secret: 'test-secret'
    };

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockSettings, error: null })
      })
    }) as unknown as PostgrestQueryBuilder<any>);

    const client = await MoniteClient.getInstance();
    expect(client).toBeDefined();
  });

  it('should handle initialization errors', async () => {
    vi.mocked(supabase.from).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: new Error('Failed to fetch settings') 
        })
      })
    }));

    await expect(MoniteClient.getInstance()).rejects.toThrow();
  });

  it('should reuse existing instance', async () => {
    const mockSettings = {
      environment: 'sandbox',
      entity_id: 'test-entity',
      client_id: 'test-client',
      client_secret: 'test-secret'
    };

    vi.mocked(supabase.from).mockImplementation(() => ({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockSettings, error: null })
      })
    }));

    const instance1 = await MoniteClient.getInstance();
    const instance2 = await MoniteClient.getInstance();
    expect(instance1).toBe(instance2);
  });
});