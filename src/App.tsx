import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import DashboardLayout from './components/layout/DashboardLayout';
import { publicRoutes, protectedRoutes } from './config/routes';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public routes */}
                {publicRoutes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}

                {/* Protected dashboard routes */}
                <Route element={<ProtectedRoutes />}>
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
                                <DashboardLayout>
                                  {child.requiresMonite ? (
                                    <ProtectedRoutes requiresMonite>
                                      {child.element}
                                    </ProtectedRoutes>
                                  ) : (
                                    child.element
                                  )}
                                </DashboardLayout>
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
                          <DashboardLayout>
                            {route.requiresMonite ? (
                              <ProtectedRoutes requiresMonite>
                                {route.element}
                              </ProtectedRoutes>
                            ) : (
                              route.element
                            )}
                          </DashboardLayout>
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
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;