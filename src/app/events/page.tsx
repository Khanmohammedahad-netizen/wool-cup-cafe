import type { Metadata } from 'next';
import { EventsHero } from '@/components/events/EventsHero';
import { EventsUpcoming } from '@/components/events/EventsUpcoming';
import { EventsPast } from '@/components/events/EventsPast';
import { EventsInquiry } from '@/components/events/EventsInquiry';
import { Footer } from '@/components/footer/Footer';

export const metadata: Metadata = {
  title: 'Events — Wool Cup Urban Café & Bistro',
  description: 'Live music, private dining, community nights and more at Wool Cup, Hyderabad. Host your next event with us.',
};

export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <EventsUpcoming />
      <EventsPast />
      <EventsInquiry />
      <Footer />
    </main>
  );
}
