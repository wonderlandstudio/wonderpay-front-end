import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import OrganizationSettings from './pages/OrganizationSettings';
import ProfileSettings from './pages/settings/ProfileSettings';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings">
              <Route path="profile" element={<ProfileSettings />} />
            </Route>
            <Route path="dashboard/organization-settings" element={<OrganizationSettings />} />
          </Route>
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;