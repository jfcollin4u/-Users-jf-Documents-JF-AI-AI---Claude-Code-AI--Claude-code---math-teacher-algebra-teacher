import React, { useState, useMemo } from 'react';
import { Pill, Btn, Art } from './ui.jsx';
import { DIAGNOSTIC } from '../data/diagnostic.js';

export default function Diagnostic({ onFinish, onCancel }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const q = DIAGNOSTIC[i];
  const total = DIAGNOSTIC.length;
  const score = useMemo(
    () => DIAGNOSTIC.reduce((a, q) => a + (answers[q.id] === q.answer ? 1 : 0), 0),
    [answers]
  );
  const pct = (i / total) * 100;

  if (done) {
    const tier =
      score >= 5
        ? { tone: 'emerald', label: 'Strong foundation', msg: "You'll fly through early lessons." }
        : score >= 3
          ? { tone: 'gold', label: 'Solid start', msg: "We'll add extra examples where it helps." }
          : { tone: 'rose', label: 'Gentle path', msg: "We'll start slow and rebuild the basics." };
    return (
      <div className="px-4 py-6 text-center">
        <Art kind="trophy" size={120} />
        <Pill tone={tier.tone} className="mt-2">{tier.label}</Pill>
        <h2 className="font-display text-2xl text-ink-900 mt-2">{score} of {total}</h2>
        <p className="text-sm text-ink-500 mt-1 px-4">{tier.msg}</p>
        <div className="mt-5">
          <Btn onClick={() => onFinish({ score, total })} className="w-full">See my plan ✦</Btn>
        </div>
      </div>
    );
  }

  const picked = answers[q.id];
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <button onClick={onCancel} className="text-ink-500 text-sm font-extrabold">← Cancel</button>
        <div className="flex-1 h-2 bg-parchment-100 rounded-full overflow-hidden border border-parchment-200">
          <div className="h-full bg-wizard transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-[10px] font-mono font-bold text-ink-500">{i + 1}/{total}</span>
      </div>
      <div className="rounded-2xl bg-white border border-parchment-200 p-4 shadow-scroll">
        <Pill tone="wizard" className="mb-2">Foundation</Pill>
        <h2 className="font-display text-lg text-ink-900">{q.prompt}</h2>
        <div className="mt-3 grid gap-2">
          {q.choices.map((c, idx) => {
            const sel = picked === idx;
            return (
              <button
                key={idx}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                className={`text-left px-4 py-3 rounded-xl border-2 font-bold transition ${
                  sel ? 'border-wizard bg-wizard/5 text-ink-900' : 'border-parchment-200 bg-white text-ink-700'
                }`}
              >
                <span className="inline-block w-6 text-ink-400 font-mono">{String.fromCharCode(65 + idx)}.</span>
                {c}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <Btn
            onClick={() => { if (i < total - 1) setI(i + 1); else setDone(true); }}
            disabled={picked === undefined}
            className="w-full"
          >
            {i === total - 1 ? 'Finish' : 'Next →'}
          </Btn>
        </div>
      </div>
    </div>
  );
}
