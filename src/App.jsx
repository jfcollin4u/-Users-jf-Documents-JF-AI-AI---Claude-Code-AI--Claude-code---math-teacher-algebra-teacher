import React, { useState, useCallback } from 'react';
import Shell from './components/Shell.jsx';
import Dashboard from './components/Dashboard.jsx';
import Diagnostic from './components/Diagnostic.jsx';
import AdventureMap from './components/AdventureMap.jsx';
import Lesson from './components/Lesson.jsx';
import ParentView from './components/ParentView.jsx';
import CoachNova from './components/CoachNova.jsx';
import { useStore } from './store.js';
import { ADVENTURE } from './data/adventureMap.js';

export default function App() {
  const { state, update, completeLesson, unlockLesson, recordAttempt, reset } = useStore();
  const [tab, setTab] = useState('dashboard');
  const [activeLesson, setActiveLesson] = useState(null);

  const openLesson = useCallback((id) => {
    setActiveLesson(id);
    setTab('lesson');
  }, []);

  const handleCompleteLesson = useCallback(
    (lesson) => {
      completeLesson(lesson.id, { xp: lesson.xpReward, coins: lesson.coinReward });
      const idx = ADVENTURE.findIndex((s) => s.id === lesson.id);
      const next = ADVENTURE[idx + 1];
      if (next) unlockLesson(next.id);
      setActiveLesson(null);
      setTab('map');
    },
    [completeLesson, unlockLesson]
  );

  const handleFinishDiagnostic = useCallback(
    ({ score }) => {
      update((s) => ({
        ...s,
        diagnosticDone: true,
        diagnosticScore: score,
        xp: s.xp + 20,
        coins: s.coins + 5,
      }));
      setTab('dashboard');
    },
    [update]
  );

  return (
    <Shell tab={tab} setTab={setTab} state={state}>
      {tab === 'dashboard' && (
        <Dashboard
          state={state}
          onStartDiagnostic={() => setTab('diagnostic')}
          onOpenMap={() => setTab('map')}
          onOpenLesson={openLesson}
        />
      )}
      {tab === 'map' && <AdventureMap state={state} onOpenLesson={openLesson} />}
      {tab === 'diagnostic' && (
        <Diagnostic
          onCancel={() => setTab('dashboard')}
          onFinish={handleFinishDiagnostic}
        />
      )}
      {tab === 'lesson' && (
        <Lesson
          lessonId={activeLesson}
          onExit={() => { setActiveLesson(null); setTab('map'); }}
          onComplete={handleCompleteLesson}
          recordAttempt={recordAttempt}
        />
      )}
      {tab === 'parent' && (
        <ParentView state={state} onReset={reset} onBack={() => setTab('dashboard')} />
      )}
      <CoachNova />
    </Shell>
  );
}
