import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoniteClient } from '@/services/monite/MoniteClient';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn()
  }
}));

describe('MoniteClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    MoniteClient.resetInstance();
  });

  it('should initialize successfully with valid settings', async () => {
    const mockSettings = {
      id: 'test-id',
      entity_id: 'test-entity',
      api_key: 'test-key',
      environment: 'sandbox',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'test-user'
    };

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: mockSettings,
          error: null
        })
      })
    } as any);

    const client = await MoniteClient.getInstance();
    expect(client).toBeDefined();
  });

  it('should handle initialization error', async () => {
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Failed to fetch settings')
        })
      })
    } as any);

    await expect(MoniteClient.getInstance()).rejects.toThrow();
  });
});