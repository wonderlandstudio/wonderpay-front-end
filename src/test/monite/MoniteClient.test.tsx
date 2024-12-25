import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoniteClient } from '@/services/monite/MoniteClient';
import { supabase } from '@/integrations/supabase/client';
import { statusTracker } from '@/services/monitoring/StatusTracker';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({
          data: {
            environment: 'sandbox',
            entity_id: 'test-entity-id',
          },
          error: null
        }))
      }))
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({
        data: { 
          user: { 
            id: 'test-user-id',
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString()
          } 
        },
        error: null
      }))
    }
  }
}));

// Mock status tracker
vi.mock('@/services/monitoring/StatusTracker', () => ({
  statusTracker: {
    log: vi.fn(),
    getLogs: vi.fn(() => []),
  }
}));

describe('MoniteClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    MoniteClient.resetInstance();
  });

  it('should initialize successfully with valid settings', async () => {
    const instance = await MoniteClient.getInstance();
    expect(instance).toBeDefined();
    expect(statusTracker.log).toHaveBeenCalledWith(
      'MoniteClient',
      'Successfully initialized client',
      'success'
    );
  });

  it('should handle initialization errors', async () => {
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({
          data: null,
          error: new Error('Settings not found')
        }))
      }))
    }));

    await expect(MoniteClient.getInstance()).rejects.toThrow();
    expect(statusTracker.log).toHaveBeenCalledWith(
      'MoniteClient',
      'Failed to initialize client',
      'error',
      expect.any(Object)
    );
  });

  it('should reuse existing instance', async () => {
    const instance1 = await MoniteClient.getInstance();
    const instance2 = await MoniteClient.getInstance();
    expect(instance1).toBe(instance2);
  });
});