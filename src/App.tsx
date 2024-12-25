import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { SettingsProvider } from './contexts/SettingsContext';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { publicRoutes, protectedRoutes } from './config/routes';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
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
  );
}

export default App;