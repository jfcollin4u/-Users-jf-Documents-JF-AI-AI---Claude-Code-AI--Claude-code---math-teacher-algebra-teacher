import React, { useState } from 'react';
import { Pill, Stat } from './ui.jsx';
import { rankFor } from '../store.js';
import { ADVENTURE } from '../data/adventureMap.js';

export default function ParentView({ state, onReset, onBack }) {
  const [confirm, setConfirm] = useState(false);
  const totalAttempts = Object.values(state.attempts).reduce((a, x) => a + (x.correct + x.wrong), 0);
  const totalCorrect = Object.values(state.attempts).reduce((a, x) => a + x.correct, 0);
  const accuracy = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : null;
  const { current } = rankFor(state.xp);

  return (
    <div className="px-4 py-3 space-y-3">
      <button onClick={onBack} className="text-ink-500 text-sm font-extrabold">← Back</button>
      <div className="text-center">
        <Pill tone="wizard">Family</Pill>
        <h1 className="font-display text-2xl text-ink-900 mt-1">Progress overview</h1>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="Rank"     value={current.name} />
        <Stat label="Total XP" value={state.xp} />
        <Stat label="Coins"    value={state.coins} />
        <Stat label="Lessons"  value={`${state.completedLessons.length}/${ADVENTURE.length}`} />
      </div>
      <div className="rounded-2xl bg-white border border-parchment-200 p-3 shadow-scroll">
        <div className="font-display text-base text-ink-900">Foundation diagnostic</div>
        {state.diagnosticDone ? (
          <p className="text-xs text-ink-500 mt-1">
            Scored {state.diagnosticScore} / 6.{' '}
            {state.diagnosticScore >= 5
              ? 'Strong foundation.'
              : state.diagnosticScore >= 3
                ? 'Solid; some review built in.'
                : 'Beginning gentle path.'}
          </p>
        ) : (
          <p className="text-xs text-ink-500 mt-1">Not yet taken.</p>
        )}
      </div>
      <div className="rounded-2xl bg-white border border-parchment-200 p-3 shadow-scroll">
        <div className="font-display text-base text-ink-900">Practice accuracy</div>
        <p className="text-xs text-ink-500 mt-1">
          {accuracy === null ? 'No attempts yet.' : `${totalCorrect}/${totalAttempts} correct (${accuracy}%).`}
        </p>
        {Object.keys(state.attempts).length > 0 && (
          <div className="mt-2 divide-y divide-parchment-200 text-xs">
            {Object.entries(state.attempts).map(([id, a]) => {
              const stop = ADVENTURE.find((s) => s.id === id);
              return (
                <div key={id} className="py-1.5 flex justify-between">
                  <span className="text-ink-700">{stop?.title ?? id}</span>
                  <span className="font-mono text-ink-500">✓{a.correct} ✗{a.wrong}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="rounded-2xl bg-white border border-parchment-200 p-3 shadow-scroll">
        <div className="font-display text-base text-ink-900">Reset</div>
        <p className="text-xs text-ink-500 mt-1">Clear all saved progress on this device.</p>
        <div className="mt-2 flex gap-2">
          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="px-3 py-2 rounded-xl bg-parchment-100 text-ink-900 font-extrabold text-xs"
            >
              Reset progress…
            </button>
          ) : (
            <>
              <button
                onClick={() => { onReset(); setConfirm(false); }}
                className="px-3 py-2 rounded-xl bg-rose text-white font-extrabold text-xs"
              >
                Yes, erase
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="px-3 py-2 rounded-xl text-ink-500 text-xs font-extrabold"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
