import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import DashboardLayout from './components/layout/DashboardLayout';
import { publicRoutes, protectedRoutes } from './config/routes';
import { PlasmicRootProvider } from "@plasmicapp/loader-react";
import { PLASMIC } from "./plasmic-init";

const TempoRoutes = () => {
  if (import.meta.env.VITE_TEMPO) {
    const element = useRoutes([
      { path: '/tempobook/*', element: <div>Tempo Storybook</div> }
    ]);
    return element;
  }
  return null;
};

function App() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <QueryProvider>
        <AuthProvider>
          <SettingsProvider>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <TempoRoutes />
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
                                  element={child.element}
                                />
                              ))}
                            </Route>
                          );
                        }
                        return (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                          />
                        );
                      })}
                    </Route>
                  </Route>

                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
            </Router>
          </SettingsProvider>
        </AuthProvider>
      </QueryProvider>
    </PlasmicRootProvider>
  );
}

export default App;