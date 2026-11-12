'use client';

import React, { useEffect, useState } from 'react';
import { BOX_IMAGES, BOX } from '../data/box';

/** Galerie de la box : la photo choisie arrive en douceur. */
export function BoxGallery() {
  const [i, setI] = useState(0);
  return (
    <div className="space-y-3">
      <div className="rounded-[32px] overflow-hidden bg-white border border-line">
        <img key={i} src={BOX_IMAGES[i].src} alt={BOX_IMAGES[i].alt} width={1200} height={1200} className="w-full aspect-square object-cover swap-in" draggable={false} fetchPriority={i === 0 ? 'high' : 'auto'} />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {BOX_IMAGES.map((im, k) => (
          <button key={im.src} type="button" onClick={() => setI(k)} aria-label={`Foto ${k + 1}: ${im.alt}`} aria-pressed={k === i}
            className={`rounded-2xl overflow-hidden border-2 transition-all ${k === i ? 'border-volt' : 'border-line opacity-60'}`}>
            <img src={im.thumb} alt="" width={300} height={300} className="w-full aspect-square object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Date de livraison calculée chez le visiteur (jamais un dimanche). */
export function DeliveryDate() {
  const [txt, setTxt] = useState('');
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + BOX.deliveryDays);
    if (d.getDay() === 0) d.setDate(d.getDate() + 1);
    setTxt(d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' }));
  }, []);
  return <>{txt ? `Bestel je vandaag, dan is hij er uiterlijk ${txt}.` : `Binnen ${BOX.deliveryDays} dagen in huis.`}</>;
}
