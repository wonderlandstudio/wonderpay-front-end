import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
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
import Receivables from './pages/Receivables';
import Login from './pages/Login';
import WonderPayCapital from './pages/WonderPayCapital';
import TransactionHistory from './pages/TransactionHistory';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Protected Route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <SettingsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Outlet />
                </DashboardLayout>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="payments">
              <Route index element={<Dashboard />} />
              <Route path="wonderpay" element={<WonderPayCapital />} />
              <Route path="transactions" element={<TransactionHistory />} />
            </Route>
            <Route path="bill-pay">
              <Route index element={<BillPay />} />
              <Route path="new" element={<NewBill />} />
              <Route path=":invoiceId" element={<InvoiceDetail />} />
              <Route path="generate" element={<InvoiceGenerator />} />
            </Route>
            <Route path="receivables">
              <Route index element={<Receivables />} />
              <Route path=":invoiceId" element={<InvoiceDetail />} />
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
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
