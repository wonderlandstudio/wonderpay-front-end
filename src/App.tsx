import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import InvoiceGenerator from '@/pages/InvoiceGenerator';
import Receivables from '@/pages/Receivables';
import BillPay from '@/pages/BillPay';
import Capital from '@/pages/Capital';
import Clients from '@/pages/Clients';
import OrganizationSettings from '@/pages/OrganizationSettings';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard">
              <Route path="bill-pay" element={<BillPay />} />
              <Route path="bill-pay/generate" element={<InvoiceGenerator />} />
              <Route path="receivables" element={<Receivables />} />
              <Route path="organization-settings" element={<OrganizationSettings />} />
            </Route>
            <Route path="capital" element={<Capital />} />
            <Route path="clients" element={<Clients />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </SettingsProvider>
  );
}

export default App;