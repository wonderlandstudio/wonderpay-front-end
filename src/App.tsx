import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { MoniteAuthGuard } from '@/components/auth/MoniteAuthGuard';
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
import Capital from './pages/Capital';
import Clients from './pages/Clients';
import QuickPay from './pages/QuickPay';
import { SettingsProvider } from './contexts/SettingsContext';

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

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!session) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  const MoniteProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return (
      <ProtectedRoute>
        <MoniteAuthGuard>{children}</MoniteAuthGuard>
      </ProtectedRoute>
    );
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
            <Route path="bill-pay">
              <Route index element={<MoniteProtectedRoute><BillPay /></MoniteProtectedRoute>} />
              <Route path="new" element={<MoniteProtectedRoute><NewBill /></MoniteProtectedRoute>} />
              <Route path=":invoiceId" element={<MoniteProtectedRoute><InvoiceDetail /></MoniteProtectedRoute>} />
              <Route path="generate" element={<MoniteProtectedRoute><InvoiceGenerator /></MoniteProtectedRoute>} />
            </Route>
            <Route path="receivables">
              <Route index element={<MoniteProtectedRoute><Receivables /></MoniteProtectedRoute>} />
              <Route path=":invoiceId" element={<MoniteProtectedRoute><InvoiceDetail /></MoniteProtectedRoute>} />
            </Route>
            <Route path="capital" element={<MoniteProtectedRoute><Capital /></MoniteProtectedRoute>} />
            <Route path="quick-pay" element={<MoniteProtectedRoute><QuickPay /></MoniteProtectedRoute>} />
            <Route path="clients" element={<MoniteProtectedRoute><Clients /></MoniteProtectedRoute>} />
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