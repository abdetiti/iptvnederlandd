import React from 'react';
import { D_LEFT, D_RIGHT } from './Logo';

/**
 * Intro du logo (demande de l'utilisateur, 12/11/2026) : les deux D glissent l'un vers l'autre et se verrouillent,
 * deux ondes de signal partent, le nom apparaît, puis l'écran se lève sur la page (≈ 1,5 s au total).
 * - Rendue côté serveur en CSS pur : elle démarre avant le JavaScript, sans flash.
 * - Une seule fois par session (sessionStorage), touchée = passée, jamais avec « mouvements réduits ».
 * - La page est déjà complète dessous : rien n'attend l'animation.
 */
export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('nldd_intro'))document.documentElement.classList.add('intro-seen');else sessionStorage.setItem('nldd_intro','1')}catch(e){}` }} />
      <div id="intro" aria-hidden="true">
        <div className="flex flex-col items-center gap-6">
          <svg viewBox="-12 -14 68 60" className="w-[150px] h-[132px] sm:w-[180px] sm:h-[158px] overflow-visible">
            <circle className="ring" cx="22" cy="16" r="17" fill="none" stroke="#4a2df0" strokeWidth="1.2" />
            <circle className="ring ring-2" cx="22" cy="16" r="17" fill="none" stroke="#4a2df0" strokeWidth="1" />
            <path className="d-left" d={D_LEFT} fill="#0a0c14" fillRule="evenodd" />
            <path className="d-right" d={D_RIGHT} fill="#4a2df0" fillRule="evenodd" />
          </svg>
          <p className="word font-display font-semibold text-[28px] sm:text-[34px] tracking-[-0.04em] leading-none text-ink">
            iptvnederlan<span className="text-volt">dd</span>
          </p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var i=document.getElementById('intro');if(!i)return;function s(){i.classList.add('skip')}i.addEventListener('pointerdown',s);setTimeout(function(){i.remove()},2400)})();` }} />
    </>
  );
}
