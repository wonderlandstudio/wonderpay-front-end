import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import BillPay from './pages/BillPay';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import OrganizationSettings from './pages/OrganizationSettings';
import AddressSettings from './pages/settings/AddressSettings';
import MembersSettings from './pages/settings/MembersSettings';
import CardsSettings from './pages/settings/CardsSettings';
import BankAccountsSettings from './pages/settings/BankAccountsSettings';
import { SettingsProvider } from './contexts/SettingsContext';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<DashboardLayout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bill-pay" element={<BillPay />} />
              <Route path="/dashboard/organization-settings" element={<OrganizationSettings />} />
              <Route path="/dashboard/settings/address" element={<AddressSettings />} />
              <Route path="/dashboard/settings/members" element={<MembersSettings />} />
              <Route path="/dashboard/settings/cards" element={<CardsSettings />} />
              <Route path="/dashboard/settings/bank-accounts" element={<BankAccountsSettings />} />
            </Routes>
          </DashboardLayout>} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;