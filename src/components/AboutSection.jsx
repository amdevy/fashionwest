const BLOCKS = [
  {
    title: 'Що таке Fashion West Ukraine',
    body: "Fashion West Ukraine (FWU) — українська платформа моди та головна fashion-подія Західної України. Ми об'єднуємо дизайнерів, бренди та професіоналів індустрії у просторі, де локальні таланти мають змогу заявити про себе на національному рівні. Фешн Вест Україна — це про якісний fashion-контент, підтримку української моди та створення культурної події у серці Закарпаття.",
  },
  {
    title: 'Наша місія',
    body: 'Наша мета — розвивати українську моду системно: підтримувати дизайнерів, створювати професійний діалог і розширювати український fashion-контент на міжнародному рівні. Ми віримо, що сучасна мода — це не лише стиль, а й культурний та професійний розвиток країни.',
  },
  {
    title: 'Що ми робимо',
    body: 'Fashion West Ukraine — це серія подій та показів, де українські дизайнери та бренди презентують свої колекції, а гості отримують унікальний досвід: від знайомства з талановитими креаторами до участі у воркшопах та нетворкінгу з лідерами fashion-індустрії.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 bg-[#f8f3ee]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl">
            Про Fashion West Ukraine
          </h2>
          <div className="w-12 h-px bg-sage mx-auto mt-6" />
          <p className="font-body text-sage text-sm mt-6 max-w-2xl mx-auto leading-relaxed">
            Fashion West Ukraine 2026 — тиждень моди в Мукачеві, що об'єднує українських дизайнерів, бренди, медіа та інфлюенсерів. 2 травня 2026 року простір Darlin' у Закарпатті стане центром української fashion-індустрії.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOCKS.map((block) => (
            <div key={block.title} className="border-t border-beige pt-8">
              <h3 className="font-heading uppercase tracking-[0.15em] text-forest text-lg mb-5">
                {block.title}
              </h3>
              <p className="font-body text-sage text-sm leading-relaxed">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
