import { useState, useEffect, useRef, useCallback } from 'react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function useNoIndex() {
  useEffect(() => {
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex, nofollow';
    document.head.appendChild(tag);
    return () => { document.head.removeChild(tag); };
  }, []);
}

export default function AdminScan() {
  useNoIndex();
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const scanningRef = useRef(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
    } else {
      setPasswordError(true);
      setPassword('');
    }
  };

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) setStats(await res.json());
    } catch {}
  }, []);

  // Load stats on unlock, refresh every 15s
  useEffect(() => {
    if (!unlocked) return;
    fetchStats();
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [unlocked, fetchStats]);

  // Start QR scanner
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
            if (scanningRef.current) return;
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
    scanningRef.current = true;
    try {
      const res = await fetch('/api/verify-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResult(data);
      if (data.status === 'success') fetchStats();
    } catch {
      setResult({ status: 'error' });
    }

    setTimeout(() => {
      setResult(null);
      scanningRef.current = false;
    }, 3000);
  };

  const getResultDisplay = () => {
    if (!result) return null;

    switch (result.status) {
      case 'success':
        return { color: 'text-white', label: 'ВХІД ДОЗВОЛЕНО', detail: `${result.name} / ${result.category}` };
      case 'already_used':
        return { color: 'text-beige', label: 'ВЖЕ ВИКОРИСТАНО', detail: `о ${result.time}` };
      case 'not_paid':
        return { color: 'text-burgundy', label: 'НЕ ОПЛАЧЕНО', detail: 'Квиток не оплачено' };
      case 'not_found':
        return { color: 'text-burgundy', label: 'НЕ ЗНАЙДЕНО', detail: 'Квиток не існує' };
      default:
        return { color: 'text-burgundy', label: 'ПОМИЛКА', detail: 'Спробуйте ще раз' };
    }
  };

  const display = getResultDisplay();

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-forest flex items-center justify-center px-6">
        <div className="w-full max-w-xs text-center">
          <h1 className="font-heading uppercase tracking-[0.2em] text-white text-2xl mb-10">
            Доступ
          </h1>
          <form onSubmit={handleUnlock} className="flex flex-col gap-6">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              className="w-full border-b border-white/40 bg-transparent py-3 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors text-center tracking-widest"
              autoFocus
            />
            {passwordError && (
              <p className="font-body text-burgundy text-xs uppercase tracking-widest">
                Невірний пароль
              </p>
            )}
            <button
              type="submit"
              className="bg-white text-forest uppercase tracking-widest text-xs px-8 py-3 hover:bg-beige transition-colors duration-300"
            >
              Увійти
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 py-12">
      <h1 className="font-heading uppercase tracking-[0.2em] text-white text-xl mb-6">
        Сканер квитків
      </h1>

      {/* Stats */}
      {stats !== null && (
        <div className="flex gap-8 mb-8 border border-white/10 px-8 py-4">
          <div className="text-center">
            <p className="font-heading text-white text-3xl">{stats.checkedIn}</p>
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mt-1">Увійшли</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="font-heading text-white text-3xl">{stats.remaining}</p>
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mt-1">Очікується</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="font-heading text-white text-3xl">{stats.total}</p>
            <p className="font-body text-white/40 text-xs uppercase tracking-widest mt-1">Продано</p>
          </div>
        </div>
      )}

      <div
        id="qr-reader"
        className="w-72 h-72 border border-white/20 overflow-hidden"
        ref={scannerRef}
      />

      {!result && (
        <p className="font-body text-white/40 text-xs uppercase tracking-widest mt-6">
          Наведіть камеру на QR-код
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
