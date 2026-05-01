import React from 'react';
import { Pill, Art, GemIcon, CoinIcon, Stat } from './ui.jsx';
import { rankFor } from '../store.js';
import { ADVENTURE } from '../data/adventureMap.js';
import { LESSONS } from '../data/lessons.js';

export default function Dashboard({ state, onStartDiagnostic, onOpenMap, onOpenLesson }) {
  const { current } = rankFor(state.xp);
  const completed = state.completedLessons.length;
  const nextStop = ADVENTURE.find(
    (s) => !state.completedLessons.includes(s.id) && state.unlockedLessons.includes(s.id)
  );
  const lesson = nextStop ? LESSONS[nextStop.id] : null;

  return (
    <div className="px-4 pb-2 space-y-4">
      {/* Hero card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wizard via-wizard-dark to-[#2a1d63] text-white shadow-deep stars-bg">
        <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-gold/20 blur-2xl" />
        <div className="relative px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <Pill tone="gold" className="!text-gold-dark">Today's Quest</Pill>
          </div>
          <div className="flex items-end gap-3 mt-3">
            <div className="flex-1 min-w-0">
              <div className="font-display text-xl leading-tight">
                {state.diagnosticDone
                  ? lesson ? lesson.title : 'All quests cleared!'
                  : 'Begin your journey, scholar'}
              </div>
              <div className="text-xs text-white/70 mt-1">
                {state.diagnosticDone
                  ? lesson ? lesson.subtitle : 'More chapters coming soon.'
                  : 'A quick 6-question check-in to chart your path.'}
              </div>
            </div>
            <div className="shrink-0 -mb-2 -mr-2">
              <Art kind={state.diagnosticDone ? (nextStop?.icon || 'sparkle') : 'owl'} size={88} />
            </div>
          </div>
          <div className="mt-4">
            {!state.diagnosticDone ? (
              <button
                onClick={onStartDiagnostic}
                className="w-full bg-gold text-ink-900 font-extrabold py-3 rounded-2xl shadow-pop active:translate-y-0.5"
              >
                Begin foundation quest →
              </button>
            ) : nextStop ? (
              <button
                onClick={() => onOpenLesson(nextStop.id)}
                className="w-full bg-gold text-ink-900 font-extrabold py-3 rounded-2xl shadow-pop active:translate-y-0.5"
              >
                Continue quest →
              </button>
            ) : (
              <button
                onClick={onOpenMap}
                className="w-full bg-white/15 backdrop-blur text-white font-extrabold py-3 rounded-2xl"
              >
                Open Atlas
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Rank" value={current.name} icon={<GemIcon size={14} />} />
        <Stat
          label="Lessons"
          value={`${completed}/${ADVENTURE.length}`}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="#3fa68c"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>}
        />
        <Stat label="Coins" value={state.coins} icon={<CoinIcon size={14} />} />
      </div>

      {/* Diagnostic result */}
      {state.diagnosticDone && (
        <div className="rounded-2xl bg-white border border-parchment-200 p-4 shadow-scroll">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <Pill tone="emerald">Foundation charted</Pill>
              <div className="font-display text-base mt-1.5 text-ink-900">
                {state.diagnosticScore} / 6 correct
              </div>
              <div className="text-xs text-ink-500">
                {state.diagnosticScore >= 5
                  ? 'Strong start — moving you ahead briskly.'
                  : state.diagnosticScore >= 3
                    ? 'Steady pace with extra examples where helpful.'
                    : "Gentle path — we'll rebuild the basics together."}
              </div>
            </div>
            <button onClick={onStartDiagnostic} className="text-xs font-extrabold text-wizard underline">
              Retake
            </button>
          </div>
        </div>
      )}

      {/* Daily streak / encouragement */}
      <div className="rounded-2xl bg-parchment-100 border border-parchment-200 p-4 flex items-center gap-3">
        <Art kind="owl" size={56} />
        <div className="flex-1 min-w-0">
          <div className="font-display text-sm text-ink-900 leading-tight">A note from Coach Nova</div>
          <div className="text-xs text-ink-500 mt-0.5">
            "Keep going! Every mystery you solve grows your magic."
          </div>
        </div>
      </div>
    </div>
  );
}
