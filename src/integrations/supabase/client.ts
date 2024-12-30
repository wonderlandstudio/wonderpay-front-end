export const supabase = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      single: async () => ({ data: null, error: null }),
      eq: () => ({ data: [], error: null }),
    }),
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
  }),
  functions: {
    invoke: async () => ({ data: null, error: null }),
  },
};