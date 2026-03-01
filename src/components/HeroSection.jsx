import { useMemo } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

const GRADIENT_COLORS = ['#ffffff', '#e8d5c0', '#faf6f0', '#c4a882'];

// const GRADIENT_COLORS = ['#f8f3ee', '#f0e8e0', '#faf6f2', '#ede5dc'];

const fade = (delay) => ({
  animation: `fadeInUp 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`,
});

export default function HeroSection() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  return (
    <section className='text-[#1a1a1a] relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-center px-6'>
      {/* Animated gradient — swapped for static dark bg if reduced motion */}
      {reducedMotion ? (
        <div className='absolute inset-0 bg-[#f5f5f4]' />
      ) : (
        <MeshGradient
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          colors={GRADIENT_COLORS}
          speed={0.8}
        />
      )}

      {/* Content — sits above gradient */}
      <div className='relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6'>
        <p
          style={fade(0)}
          className='font-body text-sage text-xs uppercase tracking-widest'
        >
          Fashion West Ukraine
        </p>

        <h1
          style={fade(150)}
          className='font-heading uppercase tracking-[0.15em] text-forest text-4xl md:text-6xl lg:text-7xl leading-tight'
        >
          Fashion West Ukraine 2026
        </h1>

        <div style={fade(280)} className='w-12 h-px bg-sage my-2' />

        <p
          style={fade(360)}
          className='font-body text-forest/70 text-sm leading-relaxed max-w-md mt-2'
        >
          Подія, що об'єднує дизайнерів, бізнес, медіа та інфлюенсерів у
          просторі, де мода стає масштабною подією.
        </p>

        <div
          style={fade(450)}
          className='font-body text-sage text-sm tracking-wider space-y-1'
        >
          <p className='uppercase tracking-widest'>2 травня 2026 року</p>
          <p className='uppercase tracking-widest'>Darlin', Мукачево</p>
        </div>

        <a
          style={fade(560)}
          href='#tickets'
          className='mt-4 bg-burgundy text-white uppercase tracking-widest text-xs px-10 py-4 hover:bg-forest transition-colors duration-300'
        >
          Обрати квиток
        </a>
      </div>
    </section>
  );
}
