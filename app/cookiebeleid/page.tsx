import type { Metadata } from 'next';
import { LegalPage } from '../../components/LegalPage';
import { COOKIES } from '../../data/legal';

export const metadata: Metadata = {
  title: 'Cookiebeleid | iptvnederlandd.com',
  description: 'Cookiebeleid van iptvnederlandd.com.',
  alternates: { canonical: '/cookiebeleid/' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage path="/cookiebeleid/" title="Cookiebeleid" body={COOKIES} page={952} />;
}
