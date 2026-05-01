import React from 'react';

export function Pill({ tone = 'neutral', children, className = '' }) {
  const t = {
    neutral: 'bg-parchment-100 text-ink-700 border-parchment-200',
    wizard:  'bg-wizard/10 text-wizard border-wizard/30',
    gold:    'bg-gold/15 text-gold-dark border-gold/40',
    emerald: 'bg-emerald/15 text-emerald-dark border-emerald/40',
    rose:    'bg-rose/15 text-rose-dark border-rose/40',
    teal:    'bg-teal/15 text-teal border-teal/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${t[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Btn({ variant = 'primary', className = '', children, ...p }) {
  const base =
    'inline-flex items-center justify-center gap-1.5 font-extrabold rounded-2xl px-4 py-3 transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed select-none';
  const styles = {
    primary: 'bg-wizard text-white hover:bg-wizard-dark shadow-pop',
    gold:    'bg-gold text-ink-900 hover:bg-gold-dark shadow-pop',
    ghost:   'bg-parchment-100 text-ink-900 hover:bg-parchment-200 border border-parchment-200',
    danger:  'bg-rose text-white hover:opacity-90',
    quiet:   'text-ink-500 hover:text-ink-900',
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...p}>
      {children}
    </button>
  );
}

export function CoinIcon({ size = 18 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-gold text-ink-900 font-extrabold border-2 border-gold-dark"
      style={{ width: size, height: size, fontSize: size * 0.55, lineHeight: 1 }}
    >
      ¢
    </span>
  );
}

export function GemIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <path d="M5 3 H15 L18 8 L10 18 L2 8 Z" fill="#5b3fb8" stroke="#46309a" strokeWidth="1.5" />
      <path
        d="M5 3 L10 8 L15 3 M2 8 L18 8 M10 8 L10 18"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function MathBox({ children, big = false, className = '' }) {
  return (
    <div
      className={`font-display font-extrabold ${big ? 'text-4xl' : 'text-2xl'} bg-parchment-50 border-2 border-dashed border-wizard/40 rounded-2xl px-4 py-3 inline-block text-ink-900 ${className}`}
    >
      {children}
    </div>
  );
}

export function Stat({ label, value, icon }) {
  return (
    <div className="rounded-2xl bg-white border border-parchment-200 p-2.5 text-center shadow-scroll">
      <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-widest text-ink-500 font-extrabold">
        {icon}
        {label}
      </div>
      <div className="font-display text-sm text-ink-900 mt-0.5 leading-none truncate">{value}</div>
    </div>
  );
}

/* ===== ART (chunky themed SVGs) ===== */
export function Art({ kind, size = 140 }) {
  const w = size, h = size;
  const common = { width: w, height: h, viewBox: '0 0 120 120' };

  if (kind === 'box') return (
    <svg {...common}>
      <defs>
        <linearGradient id="boxg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8b6fe0" />
          <stop offset="1" stopColor="#5b3fb8" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="#fff5d6" />
      <g className="float">
        <rect x="28" y="42" width="64" height="50" rx="6" fill="url(#boxg)" stroke="#46309a" strokeWidth="2" />
        <rect x="28" y="42" width="64" height="14" rx="6" fill="#46309a" />
        <rect x="55" y="38" width="10" height="8" rx="2" fill="#e8a544" stroke="#c98a2e" strokeWidth="1.5" />
        <text x="60" y="80" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="22" fontWeight="800" fill="#fff">?</text>
      </g>
      <g className="twinkle" style={{ transformOrigin: '18px 28px' }}>
        <path d="M18 22l1.5 4 4 1.5-4 1.5L18 33l-1.5-4-4-1.5 4-1.5z" fill="#e8a544" />
      </g>
      <g className="twinkle" style={{ animationDelay: '0.6s', transformOrigin: '100px 90px' }}>
        <path d="M100 84l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#3fa6b8" />
      </g>
    </svg>
  );

  if (kind === 'wand') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#fde4d6" />
      <g className="float">
        <line x1="35" y1="85" x2="78" y2="42" stroke="#3a2c5c" strokeWidth="6" strokeLinecap="round" />
        <path d="M82 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#e8a544" stroke="#c98a2e" strokeWidth="2" />
        <circle cx="35" cy="85" r="5" fill="#5b3fb8" />
      </g>
      <g className="twinkle"><circle cx="50" cy="36" r="2" fill="#5b3fb8" /></g>
      <g className="twinkle" style={{ animationDelay: '0.8s' }}><circle cx="95" cy="65" r="2.5" fill="#3fa68c" /></g>
    </svg>
  );

  if (kind === 'scroll') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#e0f5ee" />
      <g className="float">
        <rect x="22" y="32" width="76" height="56" rx="4" fill="#fbf6e9" stroke="#3a2c5c" strokeWidth="2" />
        <line x1="32" y1="46" x2="78" y2="46" stroke="#6b5e87" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="56" x2="88" y2="56" stroke="#6b5e87" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="66" x2="70" y2="66" stroke="#6b5e87" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="76" x2="82" y2="76" stroke="#6b5e87" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="18" y="30" width="6" height="60" rx="3" fill="#5b3fb8" />
        <rect x="96" y="30" width="6" height="60" rx="3" fill="#5b3fb8" />
      </g>
    </svg>
  );

  if (kind === 'scale') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#fde9ee" />
      <g className="float">
        <rect x="56" y="30" width="8" height="60" rx="2" fill="#3a2c5c" />
        <line x1="20" y1="40" x2="100" y2="40" stroke="#3a2c5c" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 40 L12 60 L28 60 Z" fill="#e8a544" stroke="#c98a2e" strokeWidth="2" />
        <path d="M100 40 L92 60 L108 60 Z" fill="#5b3fb8" stroke="#46309a" strokeWidth="2" />
        <line x1="20" y1="40" x2="20" y2="50" stroke="#3a2c5c" strokeWidth="2" />
        <line x1="100" y1="40" x2="100" y2="50" stroke="#3a2c5c" strokeWidth="2" />
        <rect x="44" y="86" width="32" height="8" rx="2" fill="#3a2c5c" />
        <text x="20" y="56" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="800" fill="#3a2c5c">x</text>
        <text x="100" y="56" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="800" fill="#fff">7</text>
      </g>
    </svg>
  );

  if (kind === 'key') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#fff0d6" />
      <g className="float">
        <circle cx="40" cy="60" r="18" fill="none" stroke="#e8a544" strokeWidth="6" />
        <circle cx="40" cy="60" r="6" fill="#5b3fb8" />
        <rect x="58" y="56" width="38" height="8" rx="2" fill="#e8a544" />
        <rect x="78" y="64" width="6" height="10" rx="1" fill="#e8a544" />
        <rect x="88" y="64" width="6" height="14" rx="1" fill="#e8a544" />
      </g>
    </svg>
  );

  if (kind === 'gears') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#e0f0f5" />
      <g className="float">
        <g transform="translate(45 50)">
          <circle r="20" fill="#5b3fb8" />
          <circle r="8" fill="#fbf6e9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <rect key={i} x="-3" y="-26" width="6" height="8" rx="1" fill="#5b3fb8" transform={`rotate(${a})`} />
          ))}
        </g>
        <g transform="translate(82 75)">
          <circle r="14" fill="#e8a544" />
          <circle r="5" fill="#fbf6e9" />
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <rect key={i} x="-2.5" y="-19" width="5" height="6" rx="1" fill="#e8a544" transform={`rotate(${a})`} />
          ))}
        </g>
      </g>
    </svg>
  );

  if (kind === 'compass') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#e8e3ff" />
      <g className="float">
        <circle cx="60" cy="60" r="36" fill="#fbf6e9" stroke="#3a2c5c" strokeWidth="3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="#5b3fb8" strokeWidth="1" strokeDasharray="2 4" />
        <path d="M60 32 L66 60 L60 88 L54 60 Z" fill="#e8a544" stroke="#c98a2e" strokeWidth="1.5" />
        <path d="M60 32 L66 60 L54 60 Z" fill="#d96b8c" />
        <circle cx="60" cy="60" r="4" fill="#3a2c5c" />
        <text x="60" y="28" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3a2c5c" fontFamily="Fraunces">N</text>
      </g>
    </svg>
  );

  if (kind === 'trophy') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#fff5d6" />
      <g className="float">
        <path d="M40 30 H80 V58 a20 20 0 0 1 -40 0 Z" fill="#e8a544" stroke="#c98a2e" strokeWidth="2.5" />
        <path d="M40 36 Q24 36 24 50 Q24 60 40 58" fill="none" stroke="#c98a2e" strokeWidth="3" />
        <path d="M80 36 Q96 36 96 50 Q96 60 80 58" fill="none" stroke="#c98a2e" strokeWidth="3" />
        <rect x="50" y="78" width="20" height="6" fill="#5b3fb8" />
        <rect x="42" y="84" width="36" height="8" rx="2" fill="#5b3fb8" />
        <text x="60" y="55" textAnchor="middle" fontFamily="Fraunces" fontSize="20" fontWeight="800" fill="#fff">x</text>
      </g>
      <g className="twinkle"><circle cx="22" cy="40" r="2.5" fill="#e8a544" /></g>
      <g className="twinkle" style={{ animationDelay: '0.5s' }}><circle cx="98" cy="32" r="2" fill="#5b3fb8" /></g>
    </svg>
  );

  if (kind === 'sparkle') return (
    <svg {...common}>
      <circle cx="60" cy="60" r="52" fill="#fde4d6" />
      <g className="float">
        <path d="M60 28 l8 24 24 8 -24 8 -8 24 -8 -24 -24 -8 24 -8z" fill="#e8a544" stroke="#c98a2e" strokeWidth="2" />
      </g>
      <g className="twinkle"><circle cx="28" cy="40" r="3" fill="#5b3fb8" /></g>
      <g className="twinkle" style={{ animationDelay: '0.4s' }}><circle cx="92" cy="80" r="3" fill="#3fa68c" /></g>
      <g className="twinkle" style={{ animationDelay: '0.8s' }}><circle cx="90" cy="40" r="2" fill="#d96b8c" /></g>
    </svg>
  );

  if (kind === 'owl') return (
    <svg {...common} viewBox="0 0 120 120">
      <g className="float">
        <ellipse cx="60" cy="70" rx="32" ry="34" fill="#5b3fb8" stroke="#46309a" strokeWidth="2" />
        <path d="M30 50 Q35 32 50 38" fill="#5b3fb8" />
        <path d="M90 50 Q85 32 70 38" fill="#5b3fb8" />
        <ellipse cx="48" cy="60" rx="11" ry="11" fill="#fff5d6" />
        <ellipse cx="72" cy="60" rx="11" ry="11" fill="#fff5d6" />
        <circle cx="48" cy="62" r="5" fill="#1f1633" />
        <circle cx="72" cy="62" r="5" fill="#1f1633" />
        <circle cx="49" cy="60" r="1.5" fill="#fff" />
        <circle cx="73" cy="60" r="1.5" fill="#fff" />
        <path d="M55 72 L60 78 L65 72 Z" fill="#e8a544" />
        <path d="M40 92 Q45 86 55 88" fill="none" stroke="#fff5d6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );

  return null;
}
