import type { Metadata } from 'next';
import { LegalPage } from '../../components/LegalPage';
import { PRIVACY } from '../../data/legal';

export const metadata: Metadata = {
  title: 'Privacybeleid | iptvnederlandd.com',
  description: 'Privacybeleid van iptvnederlandd.com.',
  alternates: { canonical: '/privacybeleid/' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage path="/privacybeleid/" title="Privacybeleid" body={PRIVACY} page={951} />;
}
