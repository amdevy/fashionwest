import { useState } from 'react';

const FAQS = [
  {
    q: 'Коли відбудеться Fashion West Ukraine 2026?',
    a: "Fashion West Ukraine 2026 відбудеться 2 травня 2026 року в Мукачеві, локація Darlin'. Початок події о 10:00, завершення близько 22:00.",
  },
  {
    q: 'Де проходить Fashion West Ukraine?',
    a: "Подія проходить у Мукачеві, Закарпатська область, Україна, у просторі Darlin'. Це одна з головних fashion-подій Західної України.",
  },
  {
    q: 'Скільки коштує квиток на Fashion West Ukraine 2026?',
    a: 'Доступно три категорії квитків: Standard Entry — 2000 грн, Comfort Entry — 4000 грн, VIP Entry — 6000 грн. Придбати можна онлайн через офіційний сайт або партнера Karabas.',
  },
  {
    q: 'Що входить у VIP квиток?',
    a: 'VIP Entry включає VIP-місця біля подіуму, welcome drink, coffee break, фотозону, фото та відео контент, покази учасників, мерч FWU, fashion-пакет, подарунки від партнерів, фуршет та after party.',
  },
  {
    q: 'Хто виступить як спікер на Fashion West Ukraine 2026?',
    a: 'Серед спікерів: Андрій Моськін та Андреас Білоус (бренд Andreas Moskin, Forbes 30 under 30), Анна Овчаренко (комунікаційниця Oh My Look!, G.Bar, SOVA, Bevza), Василь Ябрик (YMG Group), Людмила Богуш (BogushTime, Forbes Ukraine).',
  },
  {
    q: 'Як купити квиток?',
    a: 'Квиток можна придбати онлайн на офіційному сайті fashionwestukraine.com або через платформу Karabas. Оплата через LiqPay, електронний квиток з QR-кодом надходить на email одразу після оплати.',
  },
  {
    q: 'Якою мовою проходить подія?',
    a: 'Основна мова події — українська. Fashion West Ukraine орієнтований на українську аудиторію та локальну fashion-індустрію.',
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden='true'
    >
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id='faq' className='bg-[#f8f3ee] px-6 py-24 border-t border-[#e8e3de]'>
      <div className='max-w-3xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl'>
            Часті запитання
          </h2>
          <div className='w-12 h-px bg-sage mx-auto mt-6' />
          <p className='font-body text-sage text-sm mt-6 max-w-xl mx-auto'>
            Все, що потрібно знати про Fashion West Ukraine 2026 — дата, локація, квитки, програма.
          </p>
        </div>

        <div className='flex flex-col'>
          {FAQS.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className='border-t border-beige last:border-b'>
                <button
                  type='button'
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  aria-expanded={open}
                  className='w-full flex items-center justify-between gap-4 py-6 text-left'
                >
                  <h3 className='font-heading uppercase tracking-[0.1em] text-forest text-sm md:text-base'>
                    {item.q}
                  </h3>
                  <span className='text-sage'>
                    <ChevronIcon open={open} />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className='font-body text-sage text-sm leading-relaxed'>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
