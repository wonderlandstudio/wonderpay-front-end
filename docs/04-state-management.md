# State Management

## Authentication State

### Supabase Auth
- User session management
- Token handling
- Permission checks
- Protected routes

### Application State
- React Query for server state
- Context for global settings
- Local state for UI components

## Data Fetching

### React Query Implementation
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['bills'],
  queryFn: fetchBills,
});
```

### Mutations
```typescript
const mutation = useMutation({
  mutationFn: createBill,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['bills'] });
  },
});
```

## Caching Strategy
- React Query caching with 5-minute stale time
- Local storage persistence for user preferences
- Cache invalidation on mutations
- Optimistic updates for better UX

## Global State
- Theme settings via Context
- User preferences
- Application configuration
- Toast notifications for feedback
```

7. Let's update the App component to use our new providers:

<lov-write file_path="src/App.tsx">
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { SettingsProvider } from './contexts/SettingsContext';
import { QueryProvider } from './providers/QueryProvider';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { publicRoutes, protectedRoutes } from './config/routes';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initialize Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryProvider>
      <SettingsProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public routes */}
              {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}

              {/* Protected dashboard routes */}
              <Route element={<ProtectedRoutes session={session} />}>
                {protectedRoutes.map((route) => {
                  if (route.children) {
                    return (
                      <Route key={route.path} path={route.path}>
                        {route.children.map((child) => (
                          <Route
                            key={child.path || 'index'}
                            index={child.index}
                            path={child.path}
                            element={
                              child.requiresMonite ? (
                                <ProtectedRoutes session={session} requiresMonite>
                                  {child.element}
                                </ProtectedRoutes>
                              ) : (
                                child.element
                              )
                            }
                          />
                        ))}
                      </Route>
                    );
                  }
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.requiresMonite ? (
                          <ProtectedRoutes session={session} requiresMonite>
                            {route.element}
                          </ProtectedRoutes>
                        ) : (
                          route.element
                        )
                      }
                    />
                  );
                })}
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </SettingsProvider>
    </QueryProvider>
  );
}

export default App;