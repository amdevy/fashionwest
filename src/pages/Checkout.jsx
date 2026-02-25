import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const TICKET_PRICES = {
  standard: 500,
  comfort: 900,
  vip: 1500,
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
    // TODO: remove mock and restore payment flow
    setLoading(true);
    try {
      await fetch('/api/mock-fulfill', {
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
    } catch (err) {
      console.error('mock-fulfill failed:', err);
    } finally {
      setLoading(false);
    }
    navigate('/success');

    // setLoading(true);
    // setError(null);
    // try {
    //   const res = await fetch('/api/create-payment', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       name: data.name,
    //       phone: data.phone,
    //       email: data.email,
    //       ticketType: label,
    //       amount: price,
    //     }),
    //   });

    //   if (!res.ok) throw new Error('Payment initialization failed');

    //   const { data: liqpayData, signature } = await res.json();
    //   navigate('/payment', { state: { data: liqpayData, signature } });
    // } catch (err) {
    //   setError('Something went wrong. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <main className="min-h-screen bg-off-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="font-body text-sage text-xs uppercase tracking-widest hover:text-forest transition-colors block mb-10"
        >
          &larr; Back
        </Link>

        <div className="mb-10">
          <p className="font-body text-sage text-xs uppercase tracking-widest mb-2">
            {ticketType} ticket
          </p>
          <h1 className="font-heading uppercase tracking-[0.15em] text-forest text-3xl">
            {label}
          </h1>
          <p className="font-heading text-2xl text-burgundy mt-3">
            {price} <span className="text-sm font-body text-sage">UAH</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="font-body text-burgundy text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && (
              <p className="font-body text-burgundy text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-b border-[#848d7f] bg-transparent py-3 text-sm font-body text-forest placeholder-sage focus:outline-none focus:border-burgundy transition-colors"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
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
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </main>
  );
}
