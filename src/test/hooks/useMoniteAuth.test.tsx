import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn()
    }
  }
}));

describe('useMoniteAuth', () => {
  it('should initialize with loading state', () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: {
            id: '123',
            email: 'test@example.com',
            created_at: '2023-01-01',
            updated_at: '2023-01-01',
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated'
          } as User,
          access_token: 'token',
          refresh_token: 'refresh',
          expires_at: 1234567890,
          expires_in: 3600,
          token_type: 'bearer'
        } as Session,
      },
      error: null
    });

    const { result } = renderHook(() => useMoniteAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle authentication error', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValue(
      new Error('Authentication failed')
    );

    const { result } = renderHook(() => useMoniteAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });
});