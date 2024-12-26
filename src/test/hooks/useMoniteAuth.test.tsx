import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { supabase } from '@/integrations/supabase/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMoniteAuth', () => {
  it('returns authenticated state when user has Monite settings', async () => {
    const mockUser = { id: 'test-user-id' };
    const mockSettings = {
      entity_id: 'test-entity-id',
      environment: 'sandbox'
    };

    vi.mocked(supabase.auth.getUser).mockResolvedValue({ 
      data: { user: mockUser }, 
      error: null 
    });

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: mockSettings,
            error: null
          })
        })
      })
    } as any);

    const { result } = renderHook(() => useMoniteAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.entityId).toBe(mockSettings.entity_id);
      expect(result.current.environment).toBe(mockSettings.environment);
    });
  });

  it('returns unauthenticated state when there is an error', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({ 
      data: { user: null }, 
      error: new Error('Not authenticated') 
    });

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: new Error('Settings not found')
          })
        })
      })
    } as any);

    const { result } = renderHook(() => useMoniteAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.entityId).toBeNull();
      expect(result.current.environment).toBe('sandbox');
    });
  });
});