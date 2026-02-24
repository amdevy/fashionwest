export default function HeroSection() {
  return (
    <section className="min-h-screen bg-off-white flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
        <p className="font-body text-sage text-xs uppercase tracking-widest">
          Fashion West presents
        </p>

        <h1 className="font-heading uppercase tracking-[0.15em] text-forest text-5xl md:text-7xl leading-tight">
          Event Name
        </h1>

        <div className="w-12 h-px bg-sage my-2" />

        <div className="font-body text-sage text-sm tracking-wider space-y-1">
          <p className="uppercase tracking-widest">00 Month 2025</p>
          <p className="uppercase tracking-widest">Venue Name, City</p>
        </div>

        <p className="font-body text-forest/70 text-sm leading-relaxed max-w-md mt-2">
          A short description of the event goes here. Style, culture, and community united for one unforgettable evening.
        </p>

        <a
          href="#tickets"
          className="mt-4 bg-burgundy text-white uppercase tracking-widest text-xs px-10 py-4 hover:bg-forest transition-colors duration-300"
        >
          Choose Your Ticket
        </a>
      </div>
    </section>
  );
}
