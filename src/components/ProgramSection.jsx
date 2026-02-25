const ITEMS = [
  'Fashion-покази',
  'Спікери між блоками',
  'Fashion-зона з брендами та продажами',
  'Гала-вечеря для VIP',
  'Зіркові гості та luxury-аудиторія',
];

export default function ProgramSection() {
  return (
    <section id="program" className="bg-forest px-6 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading uppercase tracking-[0.2em] text-off-white text-3xl md:text-4xl">
            У програмі
          </h2>
          <div className="w-12 h-px bg-sage mx-auto mt-6" />
        </div>

        <ul className="flex flex-col">
          {ITEMS.map((item, i) => (
            <li key={i}>
              <div className="flex items-center gap-6 py-6">
                <span className="font-heading text-sage text-lg shrink-0">—</span>
                <span className="font-body text-off-white text-sm tracking-wider leading-relaxed">
                  {item}
                </span>
              </div>
              {i < ITEMS.length - 1 && (
                <div className="h-px bg-sage/20" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
