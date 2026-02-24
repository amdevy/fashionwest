import { useRef, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export default function Payment() {
  const { state } = useLocation();
  const formRef = useRef(null);

  if (!state?.data || !state?.signature) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <main className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <p className="font-body text-sage text-sm uppercase tracking-widest mb-4">
          Redirecting to payment...
        </p>
        <div className="w-8 h-px bg-sage mx-auto animate-pulse" />
      </div>

      <form
        ref={formRef}
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        className="hidden"
      >
        <input type="hidden" name="data" value={state.data} />
        <input type="hidden" name="signature" value={state.signature} />
      </form>
    </main>
  );
}
