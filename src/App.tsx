import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BillPay from './pages/BillPay';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bill-pay" element={<BillPay />} />
      </Routes>
    </Router>
  );
}

export default App;