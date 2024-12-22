import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import OrganizationSettings from './pages/OrganizationSettings';
import ProfileSettings from './pages/settings/ProfileSettings';
import AddressSettings from './pages/settings/AddressSettings';
import MembersSettings from './pages/settings/MembersSettings';
import CardsSettings from './pages/settings/CardsSettings';
import BankAccountsSettings from './pages/settings/BankAccountsSettings';
import BillPay from './pages/BillPay';
import NewBill from './pages/NewBill';
import InvoiceDetail from './pages/InvoiceDetail';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout><Outlet /></DashboardLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bill-pay">
              <Route index element={<BillPay />} />
              <Route path="new" element={<NewBill />} />
              <Route path=":invoiceId" element={<InvoiceDetail />} />
            </Route>
            <Route path="dashboard/settings">
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="address" element={<AddressSettings />} />
              <Route path="members" element={<MembersSettings />} />
              <Route path="cards" element={<CardsSettings />} />
              <Route path="bank-accounts" element={<BankAccountsSettings />} />
            </Route>
            <Route path="dashboard/organization-settings" element={<OrganizationSettings />} />
          </Route>
          {/* Catch any other routes and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;