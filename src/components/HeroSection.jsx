const fade = (delay) => ({
  animation: `fadeInUp 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`,
});

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-off-white flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <p style={fade(0)} className="font-body text-sage text-xs uppercase tracking-widest">
          Fashion West Ukraine
        </p>

        <h1
          style={fade(150)}
          className="font-heading uppercase tracking-[0.15em] text-forest text-4xl md:text-6xl lg:text-7xl leading-tight"
        >
          Fashion West Ukraine 2026
        </h1>

        <div style={fade(280)} className="w-12 h-px bg-sage my-2" />

        <p style={fade(360)} className="font-body text-forest/70 text-sm leading-relaxed max-w-md mt-2">
          Подія, що об'єднує дизайнерів, бізнес, медіа та інфлюенсерів у просторі, де мода стає масштабною подією.
        </p>

        <div style={fade(450)} className="font-body text-sage text-sm tracking-wider space-y-1">
          <p className="uppercase tracking-widest">2 травня 2026 року</p>
          <p className="uppercase tracking-widest">Darlin', Мукачево</p>
        </div>

        <a
          style={fade(560)}
          href="#tickets"
          className="mt-4 bg-burgundy text-white uppercase tracking-widest text-xs px-10 py-4 hover:bg-forest transition-colors duration-300"
        >
          Обрати квиток
        </a>
      </div>
    </section>
  );
}
