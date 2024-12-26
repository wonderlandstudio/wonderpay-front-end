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
  it('should handle successful authentication', async () => {
    const mockUser: User = {
      id: 'test-id',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      role: 'authenticated'
    };

    const mockSession: Session = {
      user: mockUser,
      access_token: 'test-token',
      refresh_token: 'test-refresh',
      expires_in: 3600,
      expires_at: Date.now() + 3600000,
      token_type: 'bearer'
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: mockSession },
      error: null
    });

    const { result } = renderHook(() => useMoniteAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle authentication error', async () => {
    const mockError = {
      name: 'AuthError',
      message: 'Authentication failed',
      status: 401,
      code: 'invalid_credentials'
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: mockError
    });

    const { result } = renderHook(() => useMoniteAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });
});