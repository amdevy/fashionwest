import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TicketCard from '../components/TicketCard';
import ProgramSection from '../components/ProgramSection';
import Speakers from '../components/Speakers';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const TICKETS = [
  {
    type: 'Standard',
    title: 'Standard Entry',
    price: 1,
    description:
      'Ідеальний формат, щоб стати частиною атмосфери події та побачити все на власні очі.',
    features: [
      'Місця в глядацькій зоні',
      'Welcome drink',
      'Coffee break',
      'Фотозона',
      'Покази учасників',
      'Fashion-пакет з рекламними матеріалами',
    ],
  },
  {
    type: 'Comfort',
    title: 'Comfort Entry',
    price: 4000,
    description: 'Більше зручності, більше контенту, більше можливостей.',
    features: [
      'Комфортні місця',
      'Welcome drink',
      'Coffee break',
      'Фотозона',
      'Фото та відео контент',
      'Покази учасників',
      'Мерч FWU',
      'Fashion-пакет з рекламними матеріалами',
    ],
  },
  {
    type: 'VIP',
    title: 'VIP Entry',
    price: 6000,
    description:
      'Максимальний рівень доступу та привілеїв. Близькість до подіуму, особлива атмосфера та закриті можливості.',
    features: [
      'VIP місця біля подіуму',
      'Welcome drink',
      'Coffee break',
      'Фотозона',
      'Фото та відео контент',
      'Покази учасників',
      'Мерч FWU',
      'Fashion-пакет з рекламними матеріалами',
      'Подарунки від партнерів',
      'Фуршет',
      'After party',
    ],
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main>
      <Header />
      <HeroSection />

      <ProgramSection />

      <Speakers />

      <section id="tickets" className="px-6 py-24 bg-[#f8f3ee]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl">
              Квитки
            </h2>
            <div className="w-12 h-px bg-sage mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TICKETS.map((ticket) => (
              <TicketCard
                key={ticket.type}
                type={ticket.type}
                title={ticket.title}
                price={ticket.price}
                description={ticket.description}
                features={ticket.features}
                onBuy={() => navigate(`/checkout/${ticket.type.toLowerCase()}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      <Footer />
    </main>
  );
}
