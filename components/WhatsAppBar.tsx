'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { orderLink } from '../lib/pricing';

/** Sur téléphone : une barre de commande en bas, qui apparaît une fois l'accueil passé. */
export function WhatsAppBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <aside aria-label="Bestellen via WhatsApp" className={`lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-500 ease-[cubic-bezier(.3,1.2,.45,1)] ${show ? 'translate-y-0' : 'translate-y-[120%]'}`}>
      <div className="chrome relative isolate border-t border-line"
        style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))', paddingTop: 10, paddingLeft: 'max(12px, env(safe-area-inset-left, 0px))', paddingRight: 'max(12px, env(safe-area-inset-right, 0px))' }}>
        <div className="max-w-md mx-auto grid grid-cols-[auto_1fr] gap-2">
          <Link href="/iptv-abonnement/" tabIndex={show ? 0 : -1} className="btn-ghost h-[52px] px-5 rounded-full flex items-center font-semibold">Prijzen</Link>
          <a href={orderLink('Premium', 12, 1)} target="_blank" rel="noopener noreferrer" data-ref="bar-mobiel" tabIndex={show ? 0 : -1} className="btn-wa h-[52px] rounded-full font-semibold flex items-center justify-center gap-2">
            <img src="/images/logos/whatsapp/whatsapp-blanc.svg" alt="" className="w-5 h-5" />
            Bestel via WhatsApp
          </a>
        </div>
      </div>
    </aside>
  );
}
