import Link from 'next/link';
import { DdMark } from '../components/Logo';

export default function NotFound() {
  return (
    <section className="relative min-h-[80svh] flex items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 grid-bg" />
      <div className="relative max-w-xl mx-auto px-5 pt-28 pb-20 text-center">
        <DdMark className="w-[88px] h-[64px] mx-auto opacity-90" />
        <p className="mt-6 font-display text-[96px] font-semibold tracking-[-0.06em] leading-none text-volt">404</p>
        <h1 className="display mt-4 text-[40px] text-ink">Geen signaal op deze pagina</h1>
        <p className="mt-3 text-[18px] text-mist">De link klopt niet (meer). Op de homepage vind je alles terug.</p>
        <Link href="/" className="btn-ink mt-8 inline-flex h-14 px-7 rounded-full text-[18px] font-bold items-center">Naar de homepage</Link>
      </div>
    </section>
  );
}
