export default function TicketCard({ type, title, price, description, features, onBuy }) {
  return (
    <div className="bg-white border border-[#d9d9d9] p-8 flex flex-col gap-4 hover:border-[#6b3b40] transition-colors duration-300">
      <div>
        <p className="font-body text-sage text-xs uppercase tracking-widest mb-2">
          {type}
        </p>
        <h3 className="font-heading uppercase tracking-widest text-forest text-xl">
          {title}
        </h3>
      </div>

      <div className="w-8 h-px bg-[#d9d9d9]" />

      <p className="font-heading text-2xl text-burgundy">
        {price} <span className="text-sm font-body text-sage">UAH</span>
      </p>

      <p className="font-body text-sage text-sm leading-relaxed">
        {description}
      </p>

      {features && features.length > 0 && (
        <ul className="font-body text-sage text-xs space-y-1 mt-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-burgundy mt-0.5">—</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onBuy}
        className="mt-auto bg-burgundy text-white uppercase tracking-widest text-xs px-8 py-3 hover:bg-forest transition-colors duration-300 w-full"
      >
        Buy Ticket
      </button>
    </div>
  );
}
