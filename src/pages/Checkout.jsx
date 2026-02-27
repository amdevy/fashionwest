import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const TICKET_PRICES = {
  standard: 1,
  comfort: 4000,
  vip: 6000,
};

const TICKET_LABELS = {
  standard: 'Standard Entry',
  comfort: 'Comfort Entry',
  vip: 'VIP Entry',
};

export default function Checkout() {
  const { ticketType } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const price = TICKET_PRICES[ticketType];
  const label = TICKET_LABELS[ticketType];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!price) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <p className="font-body text-sage">Invalid ticket type.</p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          ticketType: label,
          amount: price,
        }),
      });

      if (!res.ok) throw new Error('Payment initialization failed');

      const params = await res.json();
      navigate('/payment', { state: { params } });
    } catch (err) {
      setError('Щось пішло не так. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="font-body text-sage text-xs uppercase tracking-widest hover:text-forest transition-colors block mb-10"
        >
          &larr; Назад
        </Link>

        <div className="mb-10">
          <p className="font-body text-sage text-xs uppercase tracking-widest mb-2">
            {ticketType} квиток
          </p>
          <h1 className="font-heading uppercase tracking-[0.15em] text-forest text-3xl">
            Придбати квиток
          </h1>
          <p className="font-heading text-2xl text-burgundy mt-3">
            {price} <span className="text-sm font-body text-sage">грн</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div>
            <input
              type="text"
              placeholder="Повне ім'я"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('name', { required: "Введіть ім'я" })}
            />
            {errors.name && (
              <p className="font-body text-burgundy text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Номер телефону"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('phone', { required: 'Введіть номер телефону' })}
            />
            {errors.phone && (
              <p className="font-body text-burgundy text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('email', {
                required: 'Введіть email',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Невірний формат email' },
              })}
            />
            {errors.email && (
              <p className="font-body text-burgundy text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <p className="font-body text-burgundy text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-burgundy text-white uppercase tracking-widest text-xs px-8 py-4 hover:bg-forest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Обробка...' : 'Перейти до оплати'}
          </button>
        </form>
      </div>
    </main>
  );
}
