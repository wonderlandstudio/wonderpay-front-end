import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import DashboardLayout from './components/layout/DashboardLayout';
import { publicRoutes, protectedRoutes } from './config/routes';
import routes from "tempo-routes";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              {/* Tempo routes */}
              {import.meta.env.VITE_TEMPO && useRoutes(routes)}
              
              <Routes>
                {/* Public routes */}
                {publicRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}

                {/* Protected dashboard routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route element={<DashboardLayout />}>
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
                                    <ProtectedRoutes requiresMonite>
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
                              <ProtectedRoutes requiresMonite>
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
                </Route>

                {/* Tempo routes before catch-all */}
                {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;