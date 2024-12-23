import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import OrganizationSettings from './pages/OrganizationSettings';
import ProfileSettings from './pages/settings/ProfileSettings';
import AddressSettings from './pages/settings/AddressSettings';
import MembersSettings from './pages/settings/MembersSettings';
import CardsSettings from './pages/settings/CardsSettings';
import BankAccountsSettings from './pages/settings/BankAccountsSettings';
import AccountingSettings from './pages/settings/AccountingSettings';
import BillPay from './pages/BillPay';
import NewBill from './pages/NewBill';
import InvoiceDetail from './pages/InvoiceDetail';
import InvoiceGenerator from './pages/InvoiceGenerator';
import Login from './pages/Login';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout><Outlet /></DashboardLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="bill-pay">
              <Route index element={<BillPay />} />
              <Route path="new" element={<NewBill />} />
              <Route path=":invoiceId" element={<InvoiceDetail />} />
              <Route path="generate" element={<InvoiceGenerator />} />
            </Route>
            <Route path="settings">
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="address" element={<AddressSettings />} />
              <Route path="members" element={<MembersSettings />} />
              <Route path="cards" element={<CardsSettings />} />
              <Route path="bank-accounts" element={<BankAccountsSettings />} />
              <Route path="accounting" element={<AccountingSettings />} />
            </Route>
            <Route path="organization-settings" element={<OrganizationSettings />} />
          </Route>
          <Route path="receivables" element={<Navigate to="/dashboard/bill-pay" replace />} />
          <Route path="capital" element={<Navigate to="/dashboard/bill-pay" replace />} />
          <Route path="clients" element={<Navigate to="/dashboard/bill-pay" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;