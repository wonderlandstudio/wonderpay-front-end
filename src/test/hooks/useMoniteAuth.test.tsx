import { renderHook, act } from '@testing-library/react';
import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { vi, describe, it, expect } from 'vitest';
import { User, AuthError } from '@supabase/supabase-js';

describe('useMoniteAuth', () => {
  it('should handle successful authentication', async () => {
    const mockUser: User = {
      id: '123',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email: 'test@example.com',
      phone: '',
      role: '',
      confirmation_sent_at: null,
      confirmed_at: null,
      last_sign_in_at: null,
      email_confirmed_at: null,
      phone_confirmed_at: null,
      banned_until: null,
      reauthentication_sent_at: null,
      recovery_sent_at: null
    };

    const mockAuthError: AuthError = {
      name: 'AuthError',
      message: 'Auth error message',
      status: 400,
      code: 'invalid_request',
      __isAuthError: true
    };

    const { result } = renderHook(() => useMoniteAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toBe(mockUser);
    expect(result.current.error).toBeNull();
  });
});