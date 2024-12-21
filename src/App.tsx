import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import BillPay from './pages/BillPay';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bill-pay" element={<BillPay />} />
                {/* Other routes will be added as we implement them */}
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;