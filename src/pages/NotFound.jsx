import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        <p className="font-heading text-[8rem] leading-none text-white/10 select-none">
          404
        </p>

        <div className="-mt-8">
          <h1 className="font-heading uppercase tracking-[0.2em] text-white text-2xl md:text-3xl">
            Сторінку не знайдено
          </h1>
          <div className="w-12 h-px bg-sage mx-auto mt-6" />
        </div>

        <p className="font-body text-white/50 text-sm leading-relaxed">
          Схоже, ця сторінка не існує або була переміщена.
        </p>

        <Link
          to="/"
          className="mt-4 bg-white text-forest font-body uppercase tracking-widest text-xs px-8 py-3 hover:bg-beige transition-colors duration-300"
        >
          ← На головну
        </Link>
      </div>
    </main>
  );
}
