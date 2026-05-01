import React from 'react';
import { rankFor } from '../store.js';
import { GemIcon } from './ui.jsx';

export default function XPBar({ xp }) {
  const { current, next } = rankFor(xp);
  const start = current.min;
  const end = next ? next.min : current.min + 1;
  const pct = next ? Math.min(100, ((xp - start) / (end - start)) * 100) : 100;
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <GemIcon size={12} />
          <span className="text-xs font-extrabold text-ink-900 uppercase tracking-wide">{current.name}</span>
        </div>
        <span className="text-[10px] text-ink-500 font-mono font-bold">
          {next ? `${xp - start}/${end - start} XP` : 'MAX'}
        </span>
      </div>
      <div className="h-2.5 w-full bg-parchment-100 rounded-full overflow-hidden border border-parchment-200">
        <div
          className="h-full bg-gradient-to-r from-wizard via-wizard-light to-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
