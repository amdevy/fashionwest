function InstagramIcon() {
  return (
    <svg
      width='18'
      height='18'
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

export default function Footer() {
  return (
    <footer className='bg-forest px-6 py-12 text-center'>
      <p className='font-heading uppercase tracking-[0.2em] text-beige text-sm mb-3'>
        Fashion West Ukraine
      </p>

      <a
        href='https://www.instagram.com/fw.ukraine'
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center justify-center text-beige/50 hover:text-beige transition-colors duration-200 mb-6'
        aria-label='Instagram'
      >
        <InstagramIcon />
      </a>

      <p className='font-body text-beige/50 text-xs tracking-wider'>
        © {new Date().getFullYear()} Fashion West Ukraine. Всі права захищені.
      </p>
    </footer>
  );
}
