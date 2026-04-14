const PARTNERS = [
  { src: '/partners/IMG_4063.PNG', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4064.PNG', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4065.PNG', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4066.jpg', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4067.PNG', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4068.PNG', name: 'Партнер Fashion West Ukraine 2026' },
  { src: '/partners/IMG_4069.PNG', name: 'Партнер Fashion West Ukraine 2026' },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="bg-[#f8f3ee] px-6 py-20 border-t border-[#e8e3de]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl">
            Партнери
          </h2>
          <div className="w-12 h-px bg-sage mx-auto mt-6" />
          <p className="font-body text-sage text-sm mt-4 max-w-xl mx-auto">
            Компанії, що підтримують розвиток української моди разом з Fashion West Ukraine.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PARTNERS.map((partner, i) => (
            <div
              key={i}
              className="w-40 h-24 flex items-center justify-center p-2 opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              <img
                src={partner.src}
                alt={partner.name}
                width="160"
                height="96"
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
