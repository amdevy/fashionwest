import { useState, useEffect } from 'react';

// Total visible duration: text in (200ms delay + 550ms) → hold → slide-up (950ms delay + 580ms) = ~1530ms
const UNMOUNT_AFTER = 1580;

export default function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only once per browser session
    if (sessionStorage.getItem('fwu_intro')) return;

    // Skip entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('fwu_intro', '1');
      return;
    }

    setShow(true);
    sessionStorage.setItem('fwu_intro', '1');

    const t = setTimeout(() => setShow(false), UNMOUNT_AFTER);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#2f4033] flex flex-col items-center justify-center gap-4 pointer-events-none"
      style={{ animation: 'introSlide 0.58s cubic-bezier(0.76, 0, 0.24, 1) 0.95s forwards' }}
    >
      <span
        className="font-heading uppercase text-[#cfc6bd]"
        style={{
          fontSize: 'clamp(0.65rem, 2.5vw, 0.95rem)',
          letterSpacing: '0.35em',
          animation: 'introText 0.55s ease 0.2s both',
        }}
      >
        Fashion West Ukraine
      </span>

      <div
        className="bg-[#cfc6bd]/35 h-px"
        style={{
          width: '36px',
          animation: 'introText 0.5s ease 0.38s both',
        }}
      />
    </div>
  );
}
