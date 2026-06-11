import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { useUserLevel } from './hooks/useUserLevel';
import { LevelSelection } from './components/LevelSelection';
import { HomeScreen } from './components/HomeScreen';
import { CategoryView } from './components/CategoryView';
import { ProtocolView } from './components/ProtocolView';
import { Settings } from './components/Settings';
import {
  assessmentsContent,
  conditionsContent,
  medicationsContent,
} from './data/contentData';

function App() {
  const { userLevel, loaded, selectLevel } = useUserLevel();
  const [view, setView] = useState('home'); // 'home' | 'category' | 'protocol' | 'settings'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [performProtos, setPerformProtos] = useState([]);
  const [refProtos, setRefProtos] = useState([]);
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  // Combine all protocols into single array
  const allProtocols = [
    ...Object.entries(assessmentsContent),
    ...Object.entries(conditionsContent),
    ...Object.entries(medicationsContent)
  ];

  // Loading state
  if (!loaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Show level selection if no level chosen
  if (!userLevel) {
    return <LevelSelection onSelect={selectLevel} />;
  }

  // Settings view
  if (view === 'settings') {
    return (
      <Settings
        userLevel={userLevel}
        onChangeLevel={(newLevel) => {
          selectLevel(newLevel);
          setView('home');
        }}
        onClose={() => setView('home')}
      />
    );
  }

  // Protocol detail view
  if (view === 'protocol' && selectedProtocol) {
    return (
      <ProtocolView
        proto={selectedProtocol}
        userLevel={userLevel}
        onBack={() => setView('category')}
      />
    );
  }

  // Category list view
  if (view === 'category' && selectedCategory) {
    return (
      <CategoryView
        category={selectedCategory}
        performProtocols={performProtos}
        referenceProtocols={refProtos}
        onBack={() => setView('home')}
        onProtocolSelect={(proto) => {
          setSelectedProtocol(proto);
          setView('protocol');
        }}
      />
    );
  }

  // Home view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Hatzolah CPG</h1>
          <p className="text-xs text-gray-500">v6.2</p>
        </div>
        <button
          onClick={() => setView('settings')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <SettingsIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <HomeScreen
          userLevel={userLevel}
          allProtocols={allProtocols}
          onCategorySelect={(cat, perform, reference) => {
            setSelectedCategory(cat);
            setPerformProtos(perform);
            setRefProtos(reference);
            setView('category');
          }}
        />
      </div>
    </div>
  );
}

export default App;
