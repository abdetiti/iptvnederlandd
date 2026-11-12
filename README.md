# www.iptvnederlandd.com

Site Ads du réseau (Next.js, construit le 12/11/2026). Marque « iptvnederlandd » : le double « dd » est voulu.

- Design « Het Signaal » : thème blanc futuriste, accent ultraviolet #4a2df0, polices Sora + Manrope.
- Intro du logo (les deux D se verrouillent) : `components/Intro.tsx` + `app/globals.css` (une fois par session).
- Carrousel « zapper » au doigt (élan, bords élastiques, ressorts) : `components/SwipeDeck.tsx` (bibliothèque Motion).
- Réglages : `lib/site.ts` (domaine, numéro WhatsApp, repère « (NLDD) 📶 »), `lib/pricing.ts` (prix), `data/box.ts`, `data/faq.ts`, `data/media.ts`.
- Vercel : `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADS_ID`, `NEXT_PUBLIC_ADS_WA_SEND_TO`, `NEXT_PUBLIC_GSC_VERIFICATION`.

```
npm install
npm run dev
```
