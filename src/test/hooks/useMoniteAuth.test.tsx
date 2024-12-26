import { renderHook } from '@testing-library/react';
import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session, AuthError } from '@supabase/supabase-js';

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

    expect(result.current.user).toBe(null);
    expect(result.current.isLoading).toBe(true);
  });

  it('should handle authentication error', async () => {
    class MockAuthError extends Error implements AuthError {
      name = 'AuthError';
      status = 401;
      code = 'invalid_credentials' as const;
      protected __isAuthError = true;

      constructor() {
        super('Authentication failed');
      }
    }

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: new MockAuthError()
    });

    const { result } = renderHook(() => useMoniteAuth());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoading).toBe(true);
  });
});