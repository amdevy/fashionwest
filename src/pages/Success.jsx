import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <main className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        <div className="w-14 h-14 border border-[#2f4033] flex items-center justify-center mb-2">
          <span className="font-heading text-forest text-xl">✓</span>
        </div>

        <h1 className="font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl">
          Оплата пройшла успішно!
        </h1>

        <div className="w-12 h-px bg-sage" />

        <p className="font-body text-sage text-sm leading-relaxed">
          Перевірте пошту — ваш QR-квиток вже там.
        </p>

        <p className="font-body text-forest/60 text-xs uppercase tracking-widest mt-2">
          Перевірте папку «Спам», якщо листа немає у вхідних
        </p>

        <Link
          to="/"
          className="mt-6 border border-burgundy text-burgundy uppercase tracking-widest text-xs px-8 py-3 hover:bg-burgundy hover:text-white transition-colors duration-300"
        >
          ← Повернутись на головну
        </Link>
      </div>
    </main>
  );
}
