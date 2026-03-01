import { useState, useEffect, useRef } from 'react';

const SPEAKERS = [
  {
    id: 1,
    name: 'Андрій Моськін та Андреас Білоус',
    role: 'Українські дизайнери та засновники бренду Andreas Moskin',
    description: 'Понад 10 років досвіду роботи в індустрії. Увійшли до рейтингу Forbes «30 до 30» та «Next 250».',
    photo: '/speakers/moskin-bilous.jpg',
  },
  {
    id: 2,
    name: 'Анна Овчаренко',
    role: 'Комунікаційниця з 12-річним досвідом',
    description: 'Працювала з компаніями Oh My Look!, G.Bar, Ювелірним Домом SOVA та брендом Bevza, Blast Out Studio. Співпрацювала з Martini Ukraine, Планета кіно, Forbes, Have A Rest та іншими.',
    photo: '/speakers/ovcharenko.jpg',
  },
  {
    id: 3,
    name: 'Людмила Богуш',
    role: 'Компанія BogushTime',
    description: 'Героїня Forbes Ukraine, менторка міжнародних спільнот та фондів. Експертка з планування та створення стратегій розвитку бізнесу.',
    photo: '/speakers/bogush.jpg',
  },
];


function SpeakerCard({ name, role, description, photo }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="bg-white border border-[#e8e3de] hover:border-burgundy transition-colors duration-300 flex flex-col">
      <div className="w-full h-[420px] overflow-hidden">
        {imgFailed ? (
          <div className="w-full h-full bg-beige flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" className="w-16 h-20 text-sage/40" fill="currentColor">
              <ellipse cx="32" cy="22" rx="14" ry="16" />
              <path d="M4 72c0-18 12-28 28-28s28 10 28 28H4z" />
            </svg>
          </div>
        ) : (
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      <div className="p-6 flex flex-col gap-3">
        <h3 className="font-heading uppercase tracking-[0.1em] text-forest text-base leading-snug">
          {name}
        </h3>
        <p className="font-body text-burgundy text-xs italic tracking-wide leading-relaxed">
          {role}
        </p>
        <div className="w-8 h-px bg-beige" />
        <p className="font-body text-sage text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <section id='speakers' className='bg-[#f8f3ee] px-6 py-24'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl'>
            Спікери
          </h2>
          <div className='w-12 h-px bg-sage mx-auto mt-6' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} {...speaker} />
          ))}
        </div>
      </div>
    </section>
  );
}
