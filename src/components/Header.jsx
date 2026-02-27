import { useState, useEffect } from 'react';

function InstagramIcon() {
  return (
    <svg
      width='17'
      height='17'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <rect x='2' y='2' width='20' height='20' rx='5' />
      <circle cx='12' cy='12' r='4.5' />
      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Програма', href: '#program' },
  { label: 'Спікери', href: '#speakers' },
  { label: 'Квитки', href: '#tickets' },
  { label: 'Про нас', href: '#about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#f5f5f4]/95 backdrop-blur-sm border-b border-[#d9d9d9]'
            : 'bg-transparent'
        }`}
      >
        <div className='max-w-6xl mx-auto px-6 flex items-center justify-between h-16'>
          {/* Logo */}
          <a
            href='#'
            className='font-heading uppercase tracking-[0.15em] text-2xl text-forest'
            onClick={close}
          >
            Fashion West Ukraine
          </a>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-8'>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='font-body text-sage text-xs uppercase tracking-widest hover:text-forest transition-colors duration-200'
              >
                {link.label}
              </a>
            ))}
            <a
              href='https://www.instagram.com/fw.ukraine'
              target='_blank'
              rel='noopener noreferrer'
              className='text-sage hover:text-forest transition-colors duration-200'
              aria-label='Instagram'
            >
              <InstagramIcon />
            </a>
            <a
              href='#tickets'
              className='bg-burgundy text-off-white font-body uppercase tracking-widest text-xs px-5 py-2 hover:bg-forest transition-colors duration-300'
            >
              Придбати квиток
            </a>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className='md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none'
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            <span
              className={`block w-5 h-0.5 bg-forest transition-transform duration-300 origin-center ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-forest transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-forest transition-transform duration-300 origin-center ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-[#f5f5f4] z-40 flex flex-col items-center justify-center gap-10 md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={close}
            className='font-heading uppercase tracking-[0.2em] text-2xl text-forest hover:text-burgundy transition-colors duration-200'
          >
            {link.label}
          </a>
        ))}
        <a
          href='#tickets'
          onClick={close}
          className='mt-4 bg-burgundy text-off-white font-body uppercase tracking-widest text-xs px-8 py-3 hover:bg-forest transition-colors duration-300'
        >
          Придбати квиток
        </a>
        <a
          href='https://www.instagram.com/fw.ukraine'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sage hover:text-forest transition-colors duration-200 mt-2'
          aria-label='Instagram'
        >
          <InstagramIcon />
        </a>
      </div>
    </>
  );
}
