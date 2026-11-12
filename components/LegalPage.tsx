import React from 'react';
import { PageHero } from './PageHero';
import { gutter } from './Section';

function inline(t: string) {
  return t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
}

function render(md: string) {
  return md.trim().split(/\n\s*\n/).map((b, i) => {
    const lines = b.split('\n');
    if (b.startsWith('## ')) return <h2 key={i}>{b.slice(3)}</h2>;
    if (b.startsWith('### ')) return <h3 key={i}>{b.slice(4)}</h3>;
    if (lines.every((l) => l.startsWith('- '))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
    return <p key={i}>{inline(b)}</p>;
  });
}

export function LegalPage({ path, title, body }: { path: string; title: string; body: string; page?: number }) {
  return (
    <>
      <PageHero path={path} crumb={title} title={title} />
      <article className="max-w-3xl mx-auto pb-20 prose-snow text-[17px] leading-relaxed" style={gutter}>{render(body)}</article>
    </>
  );
}
