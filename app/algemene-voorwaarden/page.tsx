import type { Metadata } from 'next';
import { LegalPage } from '../../components/LegalPage';
import { VOORWAARDEN } from '../../data/legal';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden | iptvnederlandd.com',
  description: 'Algemene voorwaarden van iptvnederlandd.com.',
  alternates: { canonical: '/algemene-voorwaarden/' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage path="/algemene-voorwaarden/" title="Algemene voorwaarden" body={VOORWAARDEN} page={950} />;
}
