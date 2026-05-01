import React from 'react';
import { Pill } from './ui.jsx';
import { ADVENTURE } from '../data/adventureMap.js';

export default function AdventureMap({ state, onOpenLesson }) {
  return (
    <div className="px-4 py-3 space-y-4">
      <div className="text-center">
        <Pill tone="wizard">The Atlas</Pill>
        <h1 className="font-display text-2xl text-ink-900 mt-1">Adventure Map</h1>
        <p className="text-xs text-ink-500 mt-0.5">Travel from village to woods, one mystery at a time.</p>
      </div>

      {/* Winding path */}
      <div className="relative rounded-3xl bg-gradient-to-b from-emerald/15 via-parchment-50 to-teal/10 border-2 border-parchment-200 p-4 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 700" preserveAspectRatio="none">
          <path
            d="M60,40 Q240,90 60,180 Q-60,260 60,340 Q240,420 60,500 Q-60,580 60,660"
            fill="none"
            stroke="#3a2c5c"
            strokeWidth="3"
            strokeDasharray="6 8"
            opacity="0.35"
          />
        </svg>
        <ol className="relative space-y-3">
          {ADVENTURE.map((s, idx) => {
            const completed = state.completedLessons.includes(s.id);
            const unlocked = state.unlockedLessons.includes(s.id);
            return (
              <li key={s.id} className={`relative flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <button
                  onClick={() => unlocked && onOpenLesson(s.id)}
                  disabled={!unlocked}
                  className={`group relative flex items-center gap-3 max-w-[78%] rounded-2xl pl-2 pr-3 py-2 border-2 transition active:scale-95 ${
                    completed
                      ? 'bg-emerald/15 border-emerald/40'
                      : unlocked
                        ? 'bg-white border-wizard/40 shadow-pop'
                        : 'bg-parchment-100/60 border-parchment-200 opacity-70'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl grid place-items-center shrink-0 ${
                      completed ? 'bg-emerald' : unlocked ? 'bg-gold' : 'bg-parchment-200'
                    } ${unlocked && !completed ? 'pulse-ring' : ''}`}
                  >
                    {completed ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 12 10 18 20 6" />
                      </svg>
                    ) : unlocked ? (
                      <span className="font-display text-white text-lg">{idx + 1}</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8a7eaa" strokeWidth="2.4">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    )}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] uppercase tracking-widest font-extrabold text-ink-400">{s.region}</div>
                    <div className="font-display text-sm text-ink-900 truncate">{s.title}</div>
                    <div className="text-[11px] text-ink-500 truncate">{s.subtitle}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
