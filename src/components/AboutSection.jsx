const BLOCKS = [
  {
    title: 'Що таке Fashion West Ukraine',
    body: 'Fashion West Ukraine — це українська платформа моди, що об\'єднує дизайнерів, бренди та професіоналів індустрії. Ми створюємо простір для натхнення, розвитку та взаємодії, де локальні таланти мають змогу заявити про себе на національному рівні.',
  },
  {
    title: 'Наша місія',
    body: 'Наша мета — розвивати українську моду системно: підтримувати дизайнерів, створювати професійний діалог і розширювати український fashion-контент на міжнародному рівні. Ми віримо, що сучасна мода — це не лише стиль, а й культурний та професійний розвиток.',
  },
  {
    title: 'Що ми робимо',
    body: 'Fashion West Ukraine — це серія подій та показів, де дизайнери та бренди презентують свої колекції, а гості отримують унікальний досвід: від знайомства з талановитими креаторами до участі у воркшопах та нетворкінгу.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 bg-[#f8f3ee]">
      <div className="max-w-6xl mx-auto">
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
