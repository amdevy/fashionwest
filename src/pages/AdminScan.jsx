import { useState, useEffect, useRef } from 'react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminScan() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
    } else {
      setPasswordError(true);
      setPassword('');
    }
  };

  useEffect(() => {
    if (!unlocked) return;

    let scanner;

    import('html5-qrcode').then(({ Html5Qrcode }) => {
      scanner = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = scanner;

      scanner
        .start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (scanning) return;
            handleScan(decodedText);
          },
          () => {}
        )
        .catch((err) => {
          console.error('QR scanner error:', err);
        });
    });

    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, [unlocked]);

  const handleScan = async (code) => {
    setScanning(true);
    try {
      const res = await fetch('/api/verify-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ status: 'error' });
    }

    setTimeout(() => {
      setResult(null);
      setScanning(false);
    }, 3000);
  };

  const getResultDisplay = () => {
    if (!result) return null;

    switch (result.status) {
      case 'success':
        return {
          color: 'text-white',
          label: 'ENTRY ALLOWED',
          detail: `${result.name} / ${result.category}`,
        };
      case 'already_used':
        return {
          color: 'text-beige',
          label: 'ALREADY USED',
          detail: `at ${result.time}`,
        };
      case 'not_paid':
        return {
          color: 'text-burgundy',
          label: 'NOT PAID',
          detail: 'Ticket not paid',
        };
      case 'not_found':
        return {
          color: 'text-burgundy',
          label: 'NOT FOUND',
          detail: 'Ticket does not exist',
        };
      default:
        return {
          color: 'text-burgundy',
          label: 'ERROR',
          detail: 'Try again',
        };
    }
  };

  const display = getResultDisplay();

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-forest flex items-center justify-center px-6">
        <div className="w-full max-w-xs text-center">
          <h1 className="font-heading uppercase tracking-[0.2em] text-white text-2xl mb-10">
            Admin Access
          </h1>
          <form onSubmit={handleUnlock} className="flex flex-col gap-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className="w-full border-b border-white/40 bg-transparent py-3 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors text-center tracking-widest"
              autoFocus
            />
            {passwordError && (
              <p className="font-body text-burgundy text-xs uppercase tracking-widest">
                Incorrect password
              </p>
            )}
            <button
              type="submit"
              className="bg-white text-forest uppercase tracking-widest text-xs px-8 py-3 hover:bg-beige transition-colors duration-300"
            >
              Enter
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 py-12">
      <h1 className="font-heading uppercase tracking-[0.2em] text-white text-xl mb-8">
        Ticket Scanner
      </h1>

      <div
        id="qr-reader"
        className="w-72 h-72 border border-white/20 overflow-hidden"
        ref={scannerRef}
      />

      {!result && (
        <p className="font-body text-white/40 text-xs uppercase tracking-widest mt-6">
          Point camera at QR code
        </p>
      )}

      {display && (
        <div className="mt-8 text-center">
          <p className={`font-heading uppercase tracking-[0.2em] text-4xl ${display.color}`}>
            {display.label}
          </p>
          <p className={`font-body text-sm mt-3 tracking-wider ${display.color} opacity-80`}>
            {display.detail}
          </p>
        </div>
      )}
    </main>
  );
}
