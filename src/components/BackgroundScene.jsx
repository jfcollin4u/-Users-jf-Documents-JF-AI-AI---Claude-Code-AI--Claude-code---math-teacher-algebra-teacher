import React, { useMemo } from 'react';

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const RUNES = [
  { char: 'x', x: 8,  y: 22, size: 28, color: '#e8a544', delay: 0,   dur: 7 },
  { char: '=', x: 86, y: 16, size: 26, color: '#8b6fe0', delay: 1.2, dur: 8 },
  { char: '+', x: 78, y: 42, size: 30, color: '#3fa6b8', delay: 0.6, dur: 6 },
  { char: 'π', x: 6,  y: 50, size: 32, color: '#3fa68c', delay: 2.1, dur: 9 },
  { char: '∞', x: 91, y: 58, size: 28, color: '#d96b8c', delay: 1.5, dur: 7 },
  { char: '÷', x: 14, y: 70, size: 24, color: '#e8a544', delay: 0.9, dur: 8 },
  { char: 'y', x: 84, y: 75, size: 26, color: '#8b6fe0', delay: 2.7, dur: 6 },
  { char: '√', x: 4,  y: 35, size: 26, color: '#3fa6b8', delay: 1.8, dur: 9 },
  { char: 'n', x: 92, y: 30, size: 22, color: '#f4c878', delay: 3.4, dur: 7 },
  { char: '−', x: 12, y: 60, size: 28, color: '#d96b8c', delay: 2.4, dur: 8 },
];

const ORBS = [
  { x: 18, y: 38, size: 14, color: 'rgba(244,200,120,0.85)', dur: 8,  delay: 0   },
  { x: 28, y: 48, size: 9,  color: 'rgba(139,111,224,0.8)',  dur: 10, delay: 2   },
  { x: 72, y: 50, size: 16, color: 'rgba(63,166,140,0.8)',   dur: 9,  delay: 1   },
  { x: 65, y: 58, size: 11, color: 'rgba(217,107,140,0.8)',  dur: 11, delay: 3   },
  { x: 35, y: 65, size: 9,  color: 'rgba(63,166,184,0.85)',  dur: 12, delay: 4   },
  { x: 60, y: 36, size: 12, color: 'rgba(244,200,120,0.7)',  dur: 9,  delay: 1.5 },
  { x: 80, y: 33, size: 13, color: 'rgba(139,111,224,0.7)',  dur: 10, delay: 2.5 },
  { x: 22, y: 55, size: 10, color: 'rgba(63,166,140,0.7)',   dur: 11, delay: 0.8 },
];

const SHOOTING_STARS = [
  { top: '12%', left: '8%',  delay: 2,  dur: 7,  dx: 180, dy: 100 },
  { top: '6%',  left: '55%', delay: 9,  dur: 8,  dx: 220, dy: 130 },
  { top: '20%', left: '30%', delay: 16, dur: 6,  dx: 160, dy: 90  },
  { top: '18%', left: '70%', delay: 23, dur: 9,  dx: 200, dy: 140 },
];

const BIRDS = [
  { y: 20, dur: 32, delay: 0,  size: 28 },
  { y: 28, dur: 45, delay: 6,  size: 22 },
  { y: 16, dur: 28, delay: 14, size: 32 },
  { y: 35, dur: 50, delay: 20, size: 20 },
];

const TREES = [
  { x: 1,  h: 110, side: 'l' }, { x: 7,  h: 140, side: 'l' },
  { x: 13, h: 95,  side: 'l' }, { x: 19, h: 125, side: 'l' },
  { x: 78, h: 100, side: 'r' }, { x: 84, h: 145, side: 'r' },
  { x: 90, h: 110, side: 'r' }, { x: 96, h: 130, side: 'r' },
];

const AURORA_BANDS = [
  { top: '4%',  height: 220, color: 'rgba(63,166,140,0.32)',  delay: 0,   dur: 14 },
  { top: '12%', height: 260, color: 'rgba(91,63,184,0.28)',   delay: 4,   dur: 18 },
  { top: '22%', height: 180, color: 'rgba(63,166,184,0.24)',  delay: 8,   dur: 16 },
];

function ShootingStar({ top, left, delay, dur, dx, dy }) {
  const id = `ss-${delay}-${dx}`;
  return (
    <svg
      className="absolute"
      style={{
        top, left, width: dx + 30, height: dy + 30,
        animation: `shoot ${dur}s ease-out infinite ${delay}s`,
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id={id} x1="0" x2={dx} y1="0" y2={dy} gradientUnits="userSpaceOnUse">
          <stop offset="0"   stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1"   stopColor="#fff" stopOpacity="1" />
        </linearGradient>
      </defs>
      <line x1="0" y1="0" x2={dx} y2={dy} stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx={dx} cy={dy} r="3" fill="#fff">
        <animate attributeName="r" values="2;3.5;2" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx={dx} cy={dy} r="6" fill="#fff" opacity="0.35" />
    </svg>
  );
}

function Tree({ x, h, side }) {
  const w = h * 0.55;
  return (
    <svg
      className="absolute bottom-0"
      style={{ left: `${x}%`, width: w, height: h }}
      viewBox="0 0 40 80"
      preserveAspectRatio="xMidYMax meet"
    >
      <g fill="#020108">
        <polygon points="20,2 9,28 31,28" />
        <polygon points="20,18 5,48 35,48" />
        <polygon points="20,36 1,72 39,72" />
        <rect x="17.5" y="70" width="5" height="10" />
      </g>
      {/* faint glint on snowy tree */}
      <polygon points="20,2 18,8 22,8" fill="#1a0f3a" opacity="0.5" />
    </svg>
  );
}

function Owl({ y, dur, delay, size }) {
  return (
    <svg
      className="absolute"
      style={{
        top: `${y}%`,
        width: size,
        height: size * 0.55,
        animation: `fly ${dur}s linear infinite ${delay}s`,
        overflow: 'visible',
      }}
      viewBox="0 0 30 16"
    >
      <g fill="rgba(13,8,32,0.85)">
        {/* M-curve wings + body silhouette */}
        <path d="M0 12 Q5 4 10 11 Q12 8 15 8 Q18 8 20 11 Q25 4 30 12 L28 13 Q23 8 20 12 Q17 10 15 10 Q13 10 10 12 Q7 8 2 13 Z" />
      </g>
    </svg>
  );
}

export default function BackgroundScene() {
  const stars = useMemo(() => {
    const r = seededRand(42);
    return Array.from({ length: 160 }, () => ({
      x: r() * 100,
      y: r() * 78,
      size: r() * 2 + 0.4,
      opacity: r() * 0.7 + 0.3,
      delay: r() * 5,
      duration: r() * 3 + 2.5,
    }));
  }, []);

  const brightStars = useMemo(() => {
    const r = seededRand(7);
    return Array.from({ length: 8 }, () => ({
      x: r() * 100,
      y: r() * 50,
      size: r() * 2 + 2,
      delay: r() * 3,
    }));
  }, []);

  const battlements = useMemo(() => Array.from({ length: 16 }, (_, i) => i), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* === 1. Sky gradient === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #060418 0%, #1a0f3a 38%, #2a1d63 70%, #3a2c5c 100%)',
        }}
      />

      {/* === 2. Soft color wash === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 35% at 28% 22%, rgba(139,111,224,0.32), transparent 60%),' +
            'radial-gradient(ellipse 45% 30% at 78% 30%, rgba(63,166,184,0.22), transparent 60%),' +
            'radial-gradient(ellipse 60% 35% at 50% 78%, rgba(232,165,68,0.10), transparent 70%)',
        }}
      />

      {/* === 3. Aurora ribbons === */}
      {AURORA_BANDS.map((a, i) => (
        <div
          key={`aur-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: a.top,
            height: a.height,
            background: `linear-gradient(180deg, transparent 0%, ${a.color} 40%, ${a.color} 60%, transparent 100%)`,
            filter: 'blur(48px)',
            mixBlendMode: 'screen',
            animation: `aurora-wave ${a.dur}s ease-in-out infinite ${a.delay}s`,
          }}
        />
      ))}

      {/* === 4. Stars === */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: '#fff',
              opacity: s.opacity,
              boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,${s.opacity * 0.55})`,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {/* a few brighter beacon stars */}
        {brightStars.map((s, i) => (
          <div
            key={`bright-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: 'radial-gradient(circle, #fff, rgba(244,200,120,0.6) 60%, transparent)',
              boxShadow: `0 0 ${s.size * 4}px rgba(244,200,120,0.8), 0 0 ${s.size * 8}px rgba(244,200,120,0.3)`,
              animation: `twinkle 3.5s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* === 5. Shooting stars === */}
      {SHOOTING_STARS.map((s, i) => (
        <ShootingStar key={`ss-${i}`} {...s} />
      ))}

      {/* === 6. Moon with multi-halo === */}
      <div className="absolute" style={{ top: '7%', right: '11%' }}>
        <div className="relative">
          <div
            className="absolute rounded-full"
            style={{
              width: 380, height: 380, top: -130, left: -130,
              background: 'radial-gradient(circle, rgba(244,200,120,0.10), transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 240, height: 240, top: -60, left: -60,
              background: 'radial-gradient(circle, rgba(244,200,120,0.20), transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 160, height: 160, top: -20, left: -20,
              background: 'radial-gradient(circle, rgba(244,200,120,0.30), transparent 70%)',
            }}
          />
          <div
            className="rounded-full relative"
            style={{
              width: 130, height: 130,
              background: 'radial-gradient(circle at 32% 30%, #fff5d6, #f4c878 60%, #c98a2e)',
              boxShadow: '0 0 100px rgba(244,200,120,0.55), inset -10px -10px 30px rgba(196,138,46,0.4)',
            }}
          >
            <div className="absolute rounded-full" style={{ width: 16, height: 16, top: 32, left: 38, background: 'rgba(196,138,46,0.4)' }} />
            <div className="absolute rounded-full" style={{ width: 9,  height: 9,  top: 64, left: 74, background: 'rgba(196,138,46,0.35)' }} />
            <div className="absolute rounded-full" style={{ width: 6,  height: 6,  top: 90, left: 50, background: 'rgba(196,138,46,0.45)' }} />
            <div className="absolute rounded-full" style={{ width: 5,  height: 5,  top: 50, left: 88, background: 'rgba(196,138,46,0.35)' }} />
          </div>
        </div>
      </div>

      {/* === 7. Magical floating orbs === */}
      <div className="absolute inset-0">
        {ORBS.map((o, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: o.size,
              height: o.size,
              background: o.color,
              boxShadow: `0 0 ${o.size * 4}px ${o.color}, 0 0 ${o.size * 8}px ${o.color}`,
              animation: `drift ${o.dur}s ease-in-out infinite ${o.delay}s, orb-glow ${o.dur * 0.6}s ease-in-out infinite`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* === 8. Flying owls === */}
      {BIRDS.map((b, i) => (
        <Owl key={`bird-${i}`} {...b} />
      ))}

      {/* === 9. Distant mountains === */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{ height: '32vh', minHeight: 200 }}
      >
        <path
          d="M0 220 L0 120 L120 70 L260 110 L420 50 L560 95 L700 60 L860 100 L1000 70 L1120 110 L1200 90 L1200 220 Z"
          fill="#15102e"
          opacity="0.85"
        />
      </svg>

      {/* === 10. Castle silhouette === */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMax meet"
        style={{ height: '52vh', maxWidth: 1600 }}
      >
        <defs>
          <linearGradient id="castleGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0d0820" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <radialGradient id="castleHalo" cx="50%" cy="80%" r="50%">
            <stop offset="0" stopColor="#f4c878" stopOpacity="0.22" />
            <stop offset="1" stopColor="#f4c878" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* glow halo */}
        <ellipse cx="600" cy="320" rx="450" ry="140" fill="url(#castleHalo)" />

        {/* dark ground sweep */}
        <path d="M0 400 L0 350 Q300 320 600 340 Q900 360 1200 330 L1200 400 Z" fill="#04020e" />

        <g fill="url(#castleGrad)">
          {/* Left small tower */}
          <rect x="280" y="240" width="50" height="160" />
          <polygon points="275,240 305,200 335,240" />
          <rect x="303" y="190" width="3" height="12" />

          {/* Left main tower */}
          <rect x="380" y="160" width="60" height="240" />
          <polygon points="375,160 410,108 445,160" />
          <rect x="408" y="98" width="3" height="14" />

          {/* Connecting wall */}
          <rect x="200" y="290" width="800" height="110" />

          {/* Center grand spire */}
          <rect x="540" y="170" width="120" height="230" />
          <polygon points="535,170 600,80 665,170" />
          <rect x="598" y="68" width="4" height="18" />

          {/* Wider central base */}
          <rect x="490" y="290" width="220" height="110" />

          {/* Right main tower */}
          <rect x="760" y="180" width="60" height="220" />
          <polygon points="755,180 790,128 825,180" />
          <rect x="788" y="118" width="3" height="14" />

          {/* Right small tower */}
          <rect x="870" y="240" width="50" height="160" />
          <polygon points="865,240 895,200 925,240" />
          <rect x="893" y="190" width="3" height="12" />

          {/* Battlements */}
          {battlements.map((i) => (
            <rect key={`b-${i}`} x={210 + i * 48} y="280" width="20" height="14" />
          ))}
        </g>

        {/* Pennants */}
        <polygon points="411,98 432,102 411,108" fill="#e8a544" opacity="0.85" />
        <polygon points="601,68 626,72 601,80" fill="#d96b8c" opacity="0.85" />
        <polygon points="791,118 812,122 791,128" fill="#3fa68c" opacity="0.85" />
        <polygon points="306,190 322,194 306,200" fill="#5b3fb8" opacity="0.8" />
        <polygon points="896,190 912,194 896,200" fill="#3fa6b8" opacity="0.8" />

        {/* Gate */}
        <path d="M580 360 L580 320 Q580 296 600 296 Q620 296 620 320 L620 360 Z" fill="#3a2c5c" />
        <path d="M584 358 L584 322 Q584 300 600 300 Q616 300 616 322 L616 358 Z" fill="#1a0f3a" />
        <ellipse cx="600" cy="360" rx="60" ry="14" fill="rgba(244,200,120,0.5)" />

        {/* Glowing windows */}
        <g fill="#f4c878">
          {/* Center spire */}
          <rect x="585" y="195" width="14" height="18" rx="2" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.6;0.95" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="603" y="195" width="14" height="18" rx="2" opacity="0.85" />
          <rect x="585" y="240" width="14" height="18" rx="2" opacity="0.85" />
          <rect x="603" y="240" width="14" height="18" rx="2" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.55;0.95" dur="5.2s" repeatCount="indefinite" />
          </rect>

          {/* Left main tower */}
          <rect x="398" y="190" width="10" height="14" rx="2" opacity="0.9" />
          <rect x="412" y="220" width="10" height="14" rx="2" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="6s" repeatCount="indefinite" />
          </rect>
          <rect x="398" y="260" width="10" height="14" rx="2" opacity="0.85" />
          <rect x="412" y="300" width="10" height="14" rx="2" opacity="0.6" />

          {/* Right main tower */}
          <rect x="778" y="200" width="10" height="14" rx="2" opacity="0.9" />
          <rect x="792" y="240" width="10" height="14" rx="2" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.95;0.6" dur="4.5s" repeatCount="indefinite" />
          </rect>
          <rect x="778" y="280" width="10" height="14" rx="2" opacity="0.95" />

          {/* Small towers */}
          <rect x="296" y="270" width="10" height="14" rx="2" opacity="0.85" />
          <rect x="310" y="310" width="10" height="14" rx="2" opacity="0.7" />
          <rect x="886" y="270" width="10" height="14" rx="2" opacity="0.85" />
          <rect x="900" y="310" width="10" height="14" rx="2" opacity="0.95" />

          {/* Wall windows */}
          {Array.from({ length: 14 }, (_, i) => (
            <rect
              key={`w-${i}`}
              x={220 + i * 56}
              y="320"
              width="8"
              height="12"
              rx="2"
              opacity={0.55 + ((i * 7) % 5) * 0.08}
            />
          ))}
        </g>

        {/* Castle smoke wisps from spires */}
        <g opacity="0.4">
          <ellipse cx="410" cy="100" rx="14" ry="6" fill="#fff" filter="blur(6px)">
            <animate attributeName="cy" values="100;70;40" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.2;0" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="600" cy="78" rx="18" ry="8" fill="#fff" filter="blur(8px)">
            <animate attributeName="cy" values="78;50;20" dur="7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.2;0" dur="7s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="790" cy="120" rx="14" ry="6" fill="#fff" filter="blur(6px)">
            <animate attributeName="cy" values="120;90;60" dur="6.5s" begin="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.2;0" dur="6.5s" begin="2s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>

      {/* === 11. Forest silhouette === */}
      <div className="absolute inset-0 pointer-events-none">
        {TREES.map((t, i) => (
          <Tree key={`tree-${i}`} {...t} />
        ))}
      </div>

      {/* === 12. Foreground hills === */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ height: '18vh', minHeight: 100 }}
      >
        <path
          d="M0 200 L0 110 Q200 65 400 95 Q600 130 800 80 Q1000 35 1200 95 L1200 200 Z"
          fill="#020108"
          opacity="0.95"
        />
      </svg>

      {/* === 13. Floating math runes === */}
      <div className="absolute inset-0">
        {RUNES.map((r, i) => (
          <div
            key={i}
            className="absolute float select-none"
            style={{
              left: `${r.x}%`,
              top: `${r.y}%`,
              fontSize: r.size,
              fontFamily: 'Fraunces, Georgia, serif',
              fontWeight: 800,
              color: r.color,
              opacity: 0.45,
              animationDelay: `${r.delay}s`,
              animationDuration: `${r.dur}s`,
              textShadow: `0 0 14px ${r.color}aa, 0 0 28px ${r.color}55`,
            }}
          >
            {r.char}
          </div>
        ))}
      </div>

      {/* === 14. Bottom mist === */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '24vh',
          background:
            'linear-gradient(to top, rgba(31,22,51,0.85) 0%, rgba(31,22,51,0.35) 50%, transparent 100%)',
        }}
      />

      {/* === 15. Vignette === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
