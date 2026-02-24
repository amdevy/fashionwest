import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import TicketCard from '../components/TicketCard';

const TICKETS = [
  {
    type: 'Standard',
    title: 'Standard Entry',
    price: 500,
    description: 'General admission to the event. Access to all main areas and performances.',
    features: [
      'General admission',
      'Access to main stage',
      'Welcome drink',
    ],
  },
  {
    type: 'Comfort',
    title: 'Comfort Entry',
    price: 900,
    description: 'Enhanced experience with priority entrance and reserved standing area.',
    features: [
      'Priority entrance',
      'Reserved standing zone',
      'Welcome drink',
      'Event program booklet',
    ],
  },
  {
    type: 'VIP',
    title: 'VIP Entry',
    price: 1500,
    description: 'Full VIP access with exclusive lounge, meet & greet, and premium service.',
    features: [
      'VIP entrance',
      'Exclusive lounge access',
      'Open bar',
      'Meet & greet',
      'Commemorative gift',
    ],
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="bg-off-white min-h-screen">
      <HeroSection />

      <section id="tickets" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading uppercase tracking-[0.2em] text-forest text-3xl md:text-4xl">
            Tickets
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
      </section>

      <footer className="border-t border-[#d9d9d9] py-10 text-center">
        <p className="font-body text-sage text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Fashion West
        </p>
      </footer>
    </main>
  );
}
