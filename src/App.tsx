import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BillPay from './pages/BillPay';
import NewBill from './pages/NewBill';
import InvoiceDetail from './pages/InvoiceDetail';
import InvoiceGenerator from './pages/InvoiceGenerator';
import Receivables from './pages/Receivables';
import WonderPayCapital from './pages/WonderPayCapital';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="payments">
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
              </Routes>
            </DashboardLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;