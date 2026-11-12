import type { Metadata } from 'next';
import { LegalPage } from '../../components/LegalPage';
import { DISCLAIMER } from '../../data/legal';

export const metadata: Metadata = {
  title: 'Disclaimer | iptvnederlandd.com',
  description: 'Disclaimer van iptvnederlandd.com.',
  alternates: { canonical: '/disclaimer/' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage path="/disclaimer/" title="Disclaimer" body={DISCLAIMER} page={930} />;
}
