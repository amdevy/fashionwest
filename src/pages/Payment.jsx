import { useRef, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export default function Payment() {
  const { state } = useLocation();
  const formRef = useRef(null);

  if (!state?.params) return <Navigate to="/" replace />;

  const { params } = state;

  useEffect(() => {
    formRef.current.submit();
  }, []);

  return (
    <main className="min-h-screen bg-off-white flex items-center justify-center">
      <div className="text-center">
        <p className="font-body text-sage text-sm uppercase tracking-widest mb-4">
          Переходимо до оплати...
        </p>
        <div className="w-8 h-px bg-sage mx-auto animate-pulse" />
      </div>

      <form
        ref={formRef}
        method="POST"
        action="https://secure.wayforpay.com/pay"
        className="hidden"
      >
        <input type="hidden" name="merchantAccount" value={params.merchantAccount} />
        <input type="hidden" name="merchantDomainName" value={params.merchantDomainName} />
        <input type="hidden" name="orderReference" value={params.orderReference} />
        <input type="hidden" name="orderDate" value={params.orderDate} />
        <input type="hidden" name="amount" value={params.amount} />
        <input type="hidden" name="currency" value={params.currency} />
        <input type="hidden" name="productName[]" value={params.productName} />
        <input type="hidden" name="productCount[]" value={params.productCount} />
        <input type="hidden" name="productPrice[]" value={params.productPrice} />
        <input type="hidden" name="clientFirstName" value={params.clientFirstName} />
        <input type="hidden" name="clientLastName" value={params.clientLastName} />
        <input type="hidden" name="clientEmail" value={params.clientEmail} />
        <input type="hidden" name="clientPhone" value={params.clientPhone} />
        <input type="hidden" name="serviceUrl" value={params.serviceUrl} />
        <input type="hidden" name="returnUrl" value={params.returnUrl} />
        <input type="hidden" name="merchantSignature" value={params.merchantSignature} />
        <input type="hidden" name="language" value={params.language} />
      </form>
    </main>
  );
}
