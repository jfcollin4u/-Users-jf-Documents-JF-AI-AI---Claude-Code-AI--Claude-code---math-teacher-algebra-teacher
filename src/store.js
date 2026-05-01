import { useState, useEffect, useCallback } from 'react';

const KEY = 'algebra-quest-scholar:v2';

export const RANKS = [
  { name: 'Apprentice', min: 0,   color: 'bg-ink-400', ring: 'ring-ink-400' },
  { name: 'Scholar',    min: 120, color: 'bg-emerald', ring: 'ring-emerald' },
  { name: 'Mage',       min: 300, color: 'bg-wizard',  ring: 'ring-wizard' },
  { name: 'Sage',       min: 550, color: 'bg-gold',    ring: 'ring-gold' },
  { name: 'Archmage',   min: 900, color: 'bg-rose',    ring: 'ring-rose' },
];

export function rankFor(xp) {
  let c = RANKS[0];
  for (const r of RANKS) if (xp >= r.min) c = r;
  const n = RANKS[RANKS.indexOf(c) + 1] ?? null;
  return { current: c, next: n };
}

const DEFAULT_STATE = {
  name: 'Scholar',
  xp: 0,
  coins: 0,
  diagnosticDone: false,
  diagnosticScore: null,
  completedLessons: [],
  unlockedLessons: ['variable-1'],
  attempts: {},
  lastSeen: null,
};

export function useStore() {
  const [state, setState] = useState(() => {
    try {
      const r = localStorage.getItem(KEY);
      if (r) return { ...DEFAULT_STATE, ...JSON.parse(r) };
    } catch {}
    return { ...DEFAULT_STATE };
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, lastSeen: Date.now() }));
    } catch {}
  }, [state]);

  const update = useCallback(
    (p) => setState((s) => (typeof p === 'function' ? p(s) : { ...s, ...p })),
    []
  );

  const completeLesson = useCallback(
    (id, { xp = 50, coins = 10 } = {}) =>
      update((s) => {
        const d = new Set(s.completedLessons);
        const a = d.has(id);
        d.add(id);
        return {
          ...s,
          completedLessons: [...d],
          xp: s.xp + (a ? 0 : xp),
          coins: s.coins + (a ? 0 : coins),
        };
      }),
    [update]
  );

  const unlockLesson = useCallback(
    (id) =>
      update((s) =>
        s.unlockedLessons.includes(id) ? s : { ...s, unlockedLessons: [...s.unlockedLessons, id] }
      ),
    [update]
  );

  const recordAttempt = useCallback(
    (id, kind) =>
      update((s) => {
        const a = s.attempts[id] ?? { correct: 0, wrong: 0, hints: 0 };
        const n = { ...a };
        if (kind === 'correct') n.correct++;
        if (kind === 'wrong')   n.wrong++;
        if (kind === 'hint')    n.hints++;
        return { ...s, attempts: { ...s.attempts, [id]: n } };
      }),
    [update]
  );

  const reset = useCallback(() => setState({ ...DEFAULT_STATE }), []);

  return { state, update, completeLesson, unlockLesson, recordAttempt, reset };
}
