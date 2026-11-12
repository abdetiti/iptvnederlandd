import type { Metadata } from 'next';
import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { PageHero } from '../../components/PageHero';
import { Section, WaButton } from '../../components/Section';
import { WA_HELLO } from '../../lib/site';
import { orderLink } from '../../lib/pricing';

export const metadata: Metadata = {
  title: 'Contact via WhatsApp | iptvnederlandd',
  description: 'Contact met iptvnederlandd gaat via WhatsApp: vragen, bestellen en hulp bij het instellen, dag en nacht, in het Nederlands.',
  alternates: { canonical: '/contact/' },
};

export default function Page() {
  return (
    <>
      <PageHero path="/contact/" crumb="Contact" title="Contact" intro="Je bereikt ons via WhatsApp. Je vraag, je bestelling en je gegevens staan dan netjes in één gesprek." />
      <Section title="Waarmee kunnen we helpen?">
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          <div className="panel rounded-[26px] p-6 space-y-3">
            <MessageCircle className="w-7 h-7 text-volt" />
            <h3 className="title text-[22px]">Een vraag</h3>
            <p className="text-[17px] text-mist">Over pakketten, apparaten of het instellen op je tv.</p>
            <WaButton href={WA_HELLO} label="Stel je vraag" track="contact-vraag" className="w-full" />
          </div>
          <div className="panel rounded-[26px] p-6 space-y-3">
            <ShoppingBag className="w-7 h-7 text-volt" />
            <h3 className="title text-[22px]">Meteen bestellen</h3>
            <p className="text-[17px] text-mist">Premium, 12 maanden + 3 extra, 1 scherm.</p>
            <WaButton href={orderLink('Premium', 12, 1)} label="Bestel via WhatsApp" track="contact-bestel" className="w-full" />
          </div>
        </div>
        <p className="mt-6 text-[16px] text-mist">We antwoorden dag en nacht, in het Nederlands.</p>
      </Section>
    </>
  );
}
