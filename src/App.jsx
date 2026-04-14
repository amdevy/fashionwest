import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Intro from './components/Intro';

const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));
const Success = lazy(() => import('./pages/Success'));
const AdminScan = lazy(() => import('./pages/AdminScan'));

function RouteFallback() {
  return (
    <div className='min-h-screen bg-[#f5f5f4] flex items-center justify-center'>
      <div className='font-heading uppercase tracking-[0.3em] text-sage text-xs'>
        Fashion West Ukraine
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Intro />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/checkout/:ticketType' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/success' element={<Success />} />
          <Route path='/admin' element={<AdminScan />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
