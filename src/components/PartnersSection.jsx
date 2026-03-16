const PARTNERS = [
  '/partners/IMG_4063.PNG',
  '/partners/IMG_4064.PNG',
  '/partners/IMG_4065.PNG',
  '/partners/IMG_4066.jpg',
  '/partners/IMG_4067.PNG',
  '/partners/IMG_4068.PNG',
  '/partners/IMG_4069.PNG',
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
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PARTNERS.map((src, i) => (
            <div
              key={i}
              className="w-40 h-24 flex items-center justify-center p-2 opacity-85 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <img
                src={src}
                alt={`Партнер ${i + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
