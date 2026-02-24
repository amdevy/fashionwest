import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Success from './pages/Success';
import AdminScan from './pages/AdminScan';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout/:ticketType" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminScan />} />
      </Routes>
    </BrowserRouter>
  );
}
