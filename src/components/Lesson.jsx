import React, { useState } from 'react';
import { Pill, Btn, Art, GemIcon, CoinIcon } from './ui.jsx';
import { LESSONS } from '../data/lessons.js';

function FeedbackArea({ feedback, hintShown, hint }) {
  if (!feedback && !hintShown) return null;
  return (
    <div className="mt-3 grid gap-2">
      {hintShown && (
        <div className="rounded-2xl border-2 border-gold/40 bg-gold/10 px-3 py-2.5 text-sm text-ink-900 flex gap-2">
          <span className="shrink-0">💡</span>
          <div>
            <span className="font-extrabold text-gold-dark mr-1">Hint:</span>
            {hint}
          </div>
        </div>
      )}
      {feedback && (
        <div
          className={`rounded-2xl border-2 px-3 py-2.5 text-sm flex gap-2 ${
            feedback.kind === 'correct'
              ? 'border-emerald/50 bg-emerald/10 text-ink-900'
              : 'border-rose/50 bg-rose/10 text-ink-900'
          }`}
        >
          <span className="shrink-0">{feedback.kind === 'correct' ? '✨' : '🦉'}</span>
          <div>
            <span
              className={`font-extrabold mr-1 ${
                feedback.kind === 'correct' ? 'text-emerald-dark' : 'text-rose-dark'
              }`}
            >
              {feedback.kind === 'correct' ? 'Correct.' : 'Not quite.'}
            </span>
            {feedback.msg}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Lesson({ lessonId, onExit, onComplete, recordAttempt }) {
  const lesson = LESSONS[lessonId];
  const [stepIdx, setStepIdx] = useState(0);
  const [pickedChoice, setPickedChoice] = useState(null);
  const [typed, setTyped] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintShown, setHintShown] = useState(false);
  const [doneScreen, setDoneScreen] = useState(false);

  if (!lesson) {
    return (
      <div className="px-4 py-6 text-center">
        <Art kind="scroll" size={120} />
        <h2 className="font-display text-xl mt-2">Coming soon</h2>
        <Btn onClick={onExit} className="mt-3">Back to map</Btn>
      </div>
    );
  }

  const step = lesson.steps[stepIdx];
  const total = lesson.steps.length;
  const progress = Math.round((stepIdx / total) * 100);

  // Mastery tracking: count practice (non-teach) steps
  const practiceTotal = lesson.steps.filter((s) => s.kind !== 'teach').length;
  const practiceIdx = lesson.steps.slice(0, stepIdx).filter((s) => s.kind !== 'teach').length;
  const isPracticeStep = step && step.kind !== 'teach';
  const practicePassed = isPracticeStep && feedback?.kind === 'correct';
  const practiceCurrent = isPracticeStep ? practiceIdx + (practicePassed ? 1 : 0) : practiceIdx;

  function resetUI() {
    setPickedChoice(null);
    setTyped('');
    setFeedback(null);
    setHintShown(false);
  }
  function goNext() {
    if (stepIdx < total - 1) {
      setStepIdx(stepIdx + 1);
      resetUI();
    } else {
      setDoneScreen(true);
    }
  }
  function check() {
    if (step.kind === 'check') {
      const ok = pickedChoice === step.answer;
      if (ok) {
        recordAttempt(lesson.id, 'correct');
        setFeedback({ kind: 'correct', msg: 'Right on. Nice thinking.' });
      } else {
        recordAttempt(lesson.id, 'wrong');
        setFeedback({
          kind: 'wrong',
          msg: step.wrongFeedback?.[pickedChoice] ?? step.wrongFeedback?.default ?? 'Not quite.',
        });
      }
    } else if (step.kind === 'input') {
      const norm = typed.trim().toLowerCase();
      const ok = norm === String(step.answer).toLowerCase();
      if (ok) {
        recordAttempt(lesson.id, 'correct');
        setFeedback({ kind: 'correct', msg: 'Exactly right.' });
      } else {
        recordAttempt(lesson.id, 'wrong');
        setFeedback({
          kind: 'wrong',
          msg: step.wrongFeedback?.[norm] ?? step.wrongFeedback?.default ?? 'Not quite.',
        });
      }
    }
  }
  function showHint() {
    if (hintShown) return;
    setHintShown(true);
    recordAttempt(lesson.id, 'hint');
  }

  if (doneScreen) {
    return (
      <div className="px-4 py-6 text-center">
        <Art kind="trophy" size={140} />
        <Pill tone="emerald" className="mt-2">Lesson complete</Pill>
        <h2 className="font-display text-2xl text-ink-900 mt-1">{lesson.title}</h2>
        <p className="text-sm text-ink-500">{lesson.subtitle}</p>
        <div className="mt-5 flex justify-center gap-3">
          <div className="rounded-2xl bg-wizard/10 border-2 border-wizard/30 px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest text-wizard font-extrabold">Earned</div>
            <div className="mt-1 flex items-center justify-center gap-1.5 font-display text-base text-ink-900">
              <GemIcon size={16} /> +{lesson.xpReward}
            </div>
          </div>
          <div className="rounded-2xl bg-gold/15 border-2 border-gold/40 px-4 py-3">
            <div className="text-[10px] uppercase tracking-widest text-gold-dark font-extrabold">Bonus</div>
            <div className="mt-1 flex items-center justify-center gap-1.5 font-display text-base text-ink-900">
              <CoinIcon size={16} /> +{lesson.coinReward}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Btn onClick={() => onComplete(lesson)} className="w-full">Continue adventure →</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onExit} className="text-ink-500 text-sm font-extrabold">← Exit</button>
        <div className="flex-1 h-2 bg-parchment-100 rounded-full overflow-hidden border border-parchment-200">
          <div
            className="h-full bg-gradient-to-r from-wizard to-gold transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-ink-500">{stepIdx + 1}/{total}</span>
      </div>

      {isPracticeStep && (
        <div className="flex items-center justify-end gap-1.5 mb-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-ink-500">Practice</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: practiceTotal }, (_, i) => {
              const passed = i < practiceCurrent;
              const current = i === practiceIdx && !practicePassed;
              return (
                <span
                  key={i}
                  className={`inline-block rounded-full transition-all ${
                    passed ? 'bg-emerald w-2.5 h-2.5' : current ? 'bg-wizard w-2.5 h-2.5 ring-2 ring-wizard/30' : 'bg-parchment-200 w-2 h-2'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-[10px] font-mono font-bold text-ink-700 ml-1">
            {practiceCurrent}/{practiceTotal} ✓
          </span>
        </div>
      )}

      <div className="rounded-3xl bg-white border-2 border-parchment-200 p-4 shadow-scroll">
        <div className="flex items-center gap-2 mb-1">
          <Pill tone="wizard">{lesson.title}</Pill>
        </div>

        {step.kind === 'teach' && (
          <>
            {step.art && (
              <div className="flex justify-center my-2">
                <Art kind={step.art} size={120} />
              </div>
            )}
            <h2 className="font-display text-xl text-ink-900 leading-tight">{step.title}</h2>
            <div className="mt-3 space-y-2 text-[15px] text-ink-700 leading-relaxed">
              {step.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-5">
              <Btn onClick={goNext} className="w-full">Got it →</Btn>
            </div>
          </>
        )}

        {step.kind === 'check' && (
          <>
            <h2 className="font-display text-lg text-ink-900 mt-1">{step.prompt}</h2>
            <div className="mt-3 grid gap-2">
              {step.choices.map((c, idx) => {
                const isPicked = pickedChoice === idx;
                const showRes = feedback && isPicked;
                let cls = 'border-parchment-200 bg-white text-ink-700';
                if (isPicked && !feedback) cls = 'border-wizard bg-wizard/5 text-ink-900';
                if (showRes && feedback.kind === 'correct') cls = 'border-emerald bg-emerald/10 text-ink-900';
                if (showRes && feedback.kind === 'wrong') cls = 'border-rose bg-rose/10 text-ink-900';
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (feedback?.kind !== 'correct') {
                        setPickedChoice(idx);
                        setFeedback(null);
                      }
                    }}
                    disabled={feedback?.kind === 'correct'}
                    className={`text-left px-3 py-3 rounded-2xl border-2 transition font-bold ${cls}`}
                  >
                    <span className="inline-block w-6 text-ink-400 font-mono">{String.fromCharCode(65 + idx)}.</span>
                    {c}
                  </button>
                );
              })}
            </div>
            <FeedbackArea feedback={feedback} hintShown={hintShown} hint={step.hint} />
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={showHint}
                disabled={hintShown}
                className="px-3 py-2.5 rounded-2xl bg-parchment-100 text-ink-700 font-extrabold text-sm border border-parchment-200 disabled:opacity-50"
              >
                {hintShown ? 'Hint shown' : '💡 Hint'}
              </button>
              <div className="flex-1" />
              {feedback?.kind === 'correct' ? (
                <Btn onClick={goNext}>Continue →</Btn>
              ) : (
                <Btn onClick={check} disabled={pickedChoice === null}>Check</Btn>
              )}
            </div>
          </>
        )}

        {step.kind === 'input' && (
          <>
            <h2 className="font-display text-lg text-ink-900 mt-1">{step.prompt}</h2>
            <div className="mt-4 flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                autoFocus
                value={typed}
                onChange={(e) => {
                  setTyped(e.target.value);
                  if (feedback?.kind === 'wrong') setFeedback(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typed && feedback?.kind !== 'correct') check();
                }}
                disabled={feedback?.kind === 'correct'}
                className="font-display text-3xl text-center px-4 py-3 rounded-2xl border-2 border-dashed border-wizard/40 focus:border-wizard focus:outline-none w-32 bg-parchment-50 text-ink-900"
                placeholder="?"
              />
            </div>
            <FeedbackArea feedback={feedback} hintShown={hintShown} hint={step.hint} />
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={showHint}
                disabled={hintShown}
                className="px-3 py-2.5 rounded-2xl bg-parchment-100 text-ink-700 font-extrabold text-sm border border-parchment-200 disabled:opacity-50"
              >
                {hintShown ? 'Hint shown' : '💡 Hint'}
              </button>
              <div className="flex-1" />
              {feedback?.kind === 'correct' ? (
                <Btn onClick={goNext}>Continue →</Btn>
              ) : (
                <Btn onClick={check} disabled={!typed.trim()}>Check</Btn>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
