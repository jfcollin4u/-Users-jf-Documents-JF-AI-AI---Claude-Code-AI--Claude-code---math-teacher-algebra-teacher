import React, { useEffect, useState } from 'react';
import { Art, GemIcon, CoinIcon } from './ui.jsx';
import XPBar from './XPBar.jsx';
import BackgroundScene from './BackgroundScene.jsx';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
}

function Header({ state, onParent }) {
  return (
    <div className="px-4 pt-3 pb-2">
      <div className="flex items-center gap-2.5 mb-3">
        <button
          onClick={onParent}
          className="w-10 h-10 rounded-2xl bg-wizard grid place-items-center shadow-pop"
          aria-label="Open family view"
        >
          <Art kind="owl" size={28} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-widest text-ink-500 font-extrabold">Welcome back</div>
          <div className="font-display text-lg text-ink-900 leading-none truncate">{state.name}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-parchment-100 border border-parchment-200 rounded-full px-2.5 py-1">
            <GemIcon size={14} />
            <span className="text-xs font-extrabold text-ink-900">{state.xp}</span>
          </div>
          <div className="flex items-center gap-1 bg-parchment-100 border border-parchment-200 rounded-full px-2.5 py-1">
            <CoinIcon size={14} />
            <span className="text-xs font-extrabold text-ink-900">{state.coins}</span>
          </div>
        </div>
      </div>
      <XPBar xp={state.xp} />
    </div>
  );
}

function TabBar({ tab, setTab, isMobile }) {
  const tabs = [
    {
      id: 'dashboard', label: 'Home',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#5b3fb8' : 'none'} stroke={active ? '#5b3fb8' : '#8a7eaa'} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      id: 'map', label: 'Quest',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#5b3fb8' : '#8a7eaa'} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2z" />
          <line x1="9" y1="4" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="20" />
        </svg>
      ),
    },
    {
      id: 'parent', label: 'Family',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#5b3fb8' : '#8a7eaa'} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      ),
    },
  ];
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pt-2 px-3 bg-gradient-to-t from-white via-white to-white/70 border-t border-parchment-200"
      style={{
        paddingBottom: isMobile
          ? 'max(12px, env(safe-area-inset-bottom))'
          : '28px',
      }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-1"
          >
            {t.icon(tab === t.id)}
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wide ${tab === t.id ? 'text-wizard' : 'text-ink-400'}`}
            >
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ children }) {
  const W = 390, H = 844;
  return (
    <div
      className="phone-shadow"
      style={{
        width: W, height: H, borderRadius: 54, position: 'relative', overflow: 'hidden', background: '#000',
      }}
    >
      {/* dynamic island */}
      <div
        style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 24, background: '#000', zIndex: 50,
        }}
      />
      {/* status bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-7 pt-3.5 pb-2 text-ink-900">
        <span className="font-bold text-sm" style={{ fontFamily: '-apple-system, system-ui' }}>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="11" viewBox="0 0 19 12">
            <rect x="0"    y="7.5" width="3.2" height="4.5" rx="0.7" fill="currentColor" />
            <rect x="4.8"  y="5"   width="3.2" height="7"   rx="0.7" fill="currentColor" />
            <rect x="9.6"  y="2.5" width="3.2" height="9.5" rx="0.7" fill="currentColor" />
            <rect x="14.4" y="0"   width="3.2" height="12"  rx="0.7" fill="currentColor" />
          </svg>
          <svg width="22" height="11" viewBox="0 0 27 13">
            <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.4" fill="none" />
            <rect x="2"   y="2"   width="20" height="9"  rx="2"   fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* content area */}
      <div
        className="absolute"
        style={{ top: 0, left: 0, right: 0, bottom: 0, borderRadius: 54, overflow: 'hidden' }}
      >
        {children}
      </div>
      {/* home indicator */}
      <div
        style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 139, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.7)', zIndex: 60,
        }}
      />
    </div>
  );
}

export default function Shell({ tab, setTab, state, children }) {
  const isMobile = useIsMobile();
  const showHeader = !['lesson', 'diagnostic', 'parent'].includes(tab);
  const tabBarTab = tab === 'lesson' || tab === 'diagnostic' ? '' : tab;

  // Mobile: full-screen native feel, no phone frame, no decorative background
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 parchment overflow-y-auto scrollbar-hide"
        style={{
          paddingTop: 'max(8px, env(safe-area-inset-top))',
          paddingBottom: 80,
        }}
      >
        {showHeader && <Header state={state} onParent={() => setTab('parent')} />}
        {children}
        <TabBar tab={tabBarTab} setTab={setTab} isMobile />
      </div>
    );
  }

  // Desktop: phone frame on top of the magical background scene
  return (
    <div className="relative min-h-screen">
      <BackgroundScene />
      <div className="relative z-10 stage">
        <div className="text-center mb-6">
          <div
            className="font-display text-4xl text-white"
            style={{ textShadow: '0 2px 0 rgba(0,0,0,0.3), 0 0 30px rgba(244,200,120,0.25)' }}
          >
            Algebra Quest
          </div>
          <div className="text-sm text-white/70 mt-1 uppercase tracking-[0.3em] font-extrabold">
            Scholar's Academy
          </div>
        </div>
        <PhoneFrame>
          <div
            className="absolute inset-0 parchment overflow-y-auto pb-20 scrollbar-hide"
            style={{ paddingTop: 52 }}
          >
            {showHeader && <Header state={state} onParent={() => setTab('parent')} />}
            {children}
            <TabBar tab={tabBarTab} setTab={setTab} isMobile={false} />
          </div>
        </PhoneFrame>
        <div className="text-center mt-6 text-xs text-white/40 font-mono">
          Tap around — progress saves locally · all 6 quests unlock as you complete them
        </div>
      </div>
    </div>
  );
}
