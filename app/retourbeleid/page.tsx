import type { Metadata } from 'next';
import { LegalPage } from '../../components/LegalPage';
import { RETOUR } from '../../data/legal';

export const metadata: Metadata = {
  title: 'Retourbeleid | iptvnederlandd.com',
  description: 'Retourbeleid van iptvnederlandd.com.',
  alternates: { canonical: '/retourbeleid/' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage path="/retourbeleid/" title="Retourbeleid" body={RETOUR} page={953} />;
}
