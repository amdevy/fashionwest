export default function Footer() {
  return (
    <footer className="bg-forest px-6 py-12 text-center">
      <p className="font-heading uppercase tracking-[0.2em] text-beige text-sm mb-3">
        Fashion West Ukraine
      </p>
      <p className="font-body text-beige/50 text-xs tracking-wider">
        © {new Date().getFullYear()} Fashion West Ukraine. Всі права захищені.
      </p>
    </footer>
  );
}
