import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn()
    }
  }
}));

describe('useMoniteAuth', () => {
  it('should handle successful authentication', async () => {
    const mockUser = {
      id: 'test-id',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: mockUser,
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
          expires_at: Date.now() + 3600
        }
      },
      error: null
    });

    const { result } = renderHook(() => useMoniteAuth());
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle authentication error', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: new Error('Authentication failed')
    });

    const { result } = renderHook(() => useMoniteAuth());
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBeTruthy();
  });
});