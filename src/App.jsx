import React, { useState } from 'react';
import { useUserLevel } from './hooks/useUserLevel';
import { LevelSelection } from './components/LevelSelection';
import { HomeScreen } from './components/HomeScreen';
import { CategoryView } from './components/CategoryView';
import { ProtocolView } from './components/ProtocolView';
import { Settings } from './components/Settings';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { MedicationsSection } from './components/MedicationsSection';
import { AlertsSection } from './components/AlertsSection';
import { InfoSection } from './components/InfoSection';
import { AcronymsView } from './components/AcronymsView';
import { HalakhaSection } from './components/HalakhaSection';
import { assessmentsContent, conditionsContent } from './data/contentData';

const INITIAL_STACKS = {
  home: { view: 'grid', category: null, perform: [], reference: [], protocol: null },
  medications: { view: 'list', protocol: null },
  info: { topic: null }, // 'acronyms' | future reference topics
  // alerts / halakha are flat — no drill-down state needed
};

function App() {
  const { userLevel, loaded, selectLevel } = useUserLevel();
  const [section, setSection] = useState('home');
  const [stacks, setStacks] = useState(INITIAL_STACKS);
  const [showLevelSheet, setShowLevelSheet] = useState(false);

  // Sourced tier, Home: clinical guidelines only (medications live in their own tab)
  const homeProtocols = [
    ...Object.entries(assessmentsContent),
    ...Object.entries(conditionsContent),
  ];

  const patchStack = (id, patch) =>
    setStacks((s) => ({ ...s, [id]: { ...s[id], ...patch } }));

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!userLevel) {
    return <LevelSelection onSelect={selectLevel} />;
  }

  // ── Section bodies ─────────────────────────────────────────────────────────
  const home = stacks.home;
  const meds = stacks.medications;

  // Drill-down views render WITHOUT TopBar (they have their own headers),
  // but the BottomNav stays visible so tabs are always reachable.
  let body = null;
  let showTopBar = true;

  const active = ['home', 'medications', 'alerts', 'info', 'halakha'].includes(section)
    ? section
    : 'home'; // unknown section falls back to Home

  if (active === 'home') {
    if (home.view === 'protocol' && home.protocol) {
      showTopBar = false;
      body = (
        <ProtocolView
          proto={home.protocol}
          userLevel={userLevel}
          onBack={() => patchStack('home', { view: 'category', protocol: null })}
        />
      );
    } else if (home.view === 'category' && home.category) {
      showTopBar = false;
      body = (
        <CategoryView
          category={home.category}
          performProtocols={home.perform}
          referenceProtocols={home.reference}
          onBack={() => patchStack('home', { view: 'grid', category: null })}
          onProtocolSelect={(proto) => patchStack('home', { view: 'protocol', protocol: proto })}
        />
      );
    } else {
      body = (
        <HomeScreen
          userLevel={userLevel}
          allProtocols={homeProtocols}
          onCategorySelect={(cat, perform, reference) =>
            patchStack('home', { view: 'category', category: cat, perform, reference })
          }
        />
      );
    }
  } else if (active === 'medications') {
    if (meds.view === 'protocol' && meds.protocol) {
      showTopBar = false;
      body = (
        <ProtocolView
          proto={meds.protocol}
          userLevel={userLevel}
          onBack={() => patchStack('medications', { view: 'list', protocol: null })}
        />
      );
    } else {
      body = (
        <MedicationsSection
          userLevel={userLevel}
          onProtocolSelect={(proto) => patchStack('medications', { view: 'protocol', protocol: proto })}
        />
      );
    }
  } else if (active === 'alerts') {
    body = <AlertsSection />;
  } else if (active === 'info') {
    if (stacks.info?.topic === 'acronyms') {
      showTopBar = false;
      body = <AcronymsView onBack={() => patchStack('info', { topic: null })} />;
    } else {
      body = <InfoSection onTopicSelect={(topic) => patchStack('info', { topic })} />;
    }
  } else if (active === 'halakha') {
    body = <HalakhaSection />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {showTopBar && (
        <TopBar userLevel={userLevel} onLevelChipTap={() => setShowLevelSheet(true)} />
      )}

      <main className="flex-1 overflow-y-auto">{body}</main>

      <BottomNav active={active} onSelect={setSection} />

      {/* Level switcher — existing Settings rendered as a full-screen sheet */}
      {showLevelSheet && (
        <div className="fixed inset-0 z-50 bg-white">
          <Settings
            userLevel={userLevel}
            onChangeLevel={(newLevel) => {
              selectLevel(newLevel);
              setShowLevelSheet(false);
              // Reset drill-downs: visible scope changed, stale stacks could
              // point at protocols outside the new level's visibility.
              setStacks(INITIAL_STACKS);
            }}
            onClose={() => setShowLevelSheet(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
