'use client';

import { useState, FormEvent } from 'react';

const EVENT_TYPES = [
  'Live Music Night',
  'Private Dining',
  'Corporate Gathering',
  'Community Event',
  'Other',
];

const fieldClass =
  'bg-cream/30 border border-[#ead8b5] rounded-lg px-4 py-3 font-body text-sm text-[#231f20] w-full focus:outline-none focus:border-[#231f20]/40 transition-colors';

export function EventsInquiry() {
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<{ name?: string; eventType?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; eventType?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name.';
    if (!eventType) newErrors.eventType = 'Please select an event type.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const lines = [
      "Hi Wool Cup! I'd like to enquire about hosting an event.",
      `Name: ${name}`,
      `Event Type: ${eventType}`,
      date ? `Preferred Date: ${date}` : null,
      guestCount ? `Guests: ${guestCount}` : null,
      details ? `Details: ${details}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join('\n');

    window.open(
      `https://wa.me/917292944244?text=${encodeURIComponent(lines)}`,
      '_blank'
    );
  }

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-ui uppercase tracking-[0.3em] text-xs text-[#231f20]/50 mb-4">
          Host With Us
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-[#231f20]">
          Plan your <em>event.</em>
        </h2>
        <p className="font-body text-base text-[#231f20]/60 mt-4">
          Tell us what you have in mind — we&apos;ll get back to you on WhatsApp.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="max-w-xl mx-auto mt-10 px-6 flex flex-col gap-4"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
          {errors.name && (
            <p className="font-ui text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Event type */}
        <div>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className={`${fieldClass} ${!eventType ? 'text-[#231f20]/40' : ''}`}
          >
            <option value="" disabled>
              Event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="font-ui text-xs text-red-500 mt-1">{errors.eventType}</p>
          )}
        </div>

        {/* Date + guest count row */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={fieldClass}
          />
          <input
            type="number"
            placeholder="Guest count"
            min={1}
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className={fieldClass}
          />
        </div>

        {/* Details */}
        <textarea
          rows={4}
          placeholder="Any details or requests (optional)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`${fieldClass} resize-none`}
        />

        <button
          type="submit"
          className="w-full bg-[#231f20] text-white font-ui uppercase tracking-[0.2em] text-sm py-4 rounded-xl hover:bg-[#231f20]/80 transition-colors mt-2"
        >
          Send via WhatsApp →
        </button>
      </form>
    </section>
  );
}
