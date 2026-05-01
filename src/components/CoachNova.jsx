import React, { useState } from 'react';
import { Art } from './ui.jsx';

const CANNED = [
  {
    match: /variable|x|letter/i,
    reply: "A variable is a letter that stands for a number we don't know yet. Like a mystery box: same label, same number.",
  },
  {
    match: /hint/i,
    reply: 'Try the 💡 Hint button on the lesson — I keep an extra nudge there for each step.',
  },
  {
    match: /stuck|hard|don.?t (get|understand)/i,
    reply: "Totally fine. Tell me which question is bugging you and I'll break it into smaller steps.",
  },
  {
    match: /equation|solve/i,
    reply: "Equations have an = sign. To solve, undo what's done to x — and do it to BOTH sides.",
  },
];

function novaRespond(t) {
  for (const c of CANNED) if (c.match.test(t)) return c.reply;
  return "I'm a friendly placeholder for now — try asking about variables, equations, or hints!";
}

export default function CoachNova() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'nova', text: "Hoot! I'm Coach Nova. Ask me anything about today's lesson." },
  ]);
  const [input, setInput] = useState('');

  function send() {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: 'me', text: t }]);
    setInput('');
    setTimeout(
      () => setMessages((m) => [...m, { from: 'nova', text: novaRespond(t) }]),
      350
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="absolute bottom-24 right-4 z-30 w-14 h-14 rounded-full bg-wizard grid place-items-center shadow-deep border-2 border-wizard-dark"
        aria-label="Open Coach Nova"
      >
        <Art kind="owl" size={36} />
      </button>
      {open && (
        <div
          className="absolute bottom-44 right-3 left-3 z-30 bg-white rounded-3xl border-2 border-parchment-200 shadow-deep overflow-hidden flex flex-col"
          style={{ maxHeight: '55%' }}
        >
          <div className="px-3 py-2.5 bg-gradient-to-r from-wizard to-wizard-dark text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/15 grid place-items-center">
              <Art kind="owl" size={22} />
            </div>
            <div className="leading-tight flex-1 min-w-0">
              <div className="font-display text-sm">Coach Nova</div>
              <div className="text-[10px] text-white/70 uppercase tracking-widest">AI tutor · placeholder</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 text-lg" aria-label="Close">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-parchment-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-[13px] leading-snug ${
                    m.from === 'me'
                      ? 'bg-wizard text-white rounded-br-md'
                      : 'bg-white border border-parchment-200 text-ink-900 rounded-bl-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-parchment-200 flex gap-2 bg-white">
            <input
              className="flex-1 px-3 py-2 rounded-xl border border-parchment-200 bg-parchment-50 text-sm focus:outline-none focus:border-wizard"
              placeholder="Ask Nova…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
            />
            <button onClick={send} className="px-3 rounded-xl bg-wizard text-white font-extrabold text-sm">↑</button>
          </div>
        </div>
      )}
    </>
  );
}
