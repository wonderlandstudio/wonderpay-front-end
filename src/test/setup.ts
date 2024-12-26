import { expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { supabase } from '@/integrations/supabase/client';

beforeAll(() => {
  // Mock fetch
  global.fetch = vi.fn();
  
  // Mock Supabase client
  vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
      auth: {
        getUser: vi.fn(),
        signOut: vi.fn(),
      },
      from: vi.fn(),
    },
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

vi.afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Add custom matchers if needed
expect.extend({
  // Add custom matchers here
});