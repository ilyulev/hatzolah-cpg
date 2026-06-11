/**
 * LevelSelection — first-launch screen for choosing practice level
 */
import React from 'react';
import { PRACTICE_LEVELS } from '../data/contentData';

const levelDetails = {
  CB: {
    emoji: '🔵',
    featureList: [
      'Basic primary survey',
      'AED / CPR protocols',
      'Epi-Pen administration',
      'Airway obstruction (back blows / chest thrusts)',
      'Salbutamol via puffer',
      'Glucose paste',
      'Basic anaphylaxis management',
    ],
  },
  FR: {
    emoji: '🟢',
    featureList: [
      'Full clinical approach framework',
      'GCS assessment',
      'Nebulised medications (salbutamol)',
      'Aspirin, GTN, Methoxyflurane',
      'Ondansetron, Paracetamol, Cetirizine',
      'Oxygen therapy protocols',
      'Cardiac chest pain, stroke, seizure',
      'All trauma protocols',
    ],
  },
  SR: {
    emoji: '🟠',
    featureList: [
      'All First Responder protocols',
      'IV access + Normal Saline',
      'Glucagon IM',
      'Midazolam IM (GCSE)',
      'Ipratropium Bromide nebulised',
      'Laryngoscopy / Magill forceps',
      'LMA insertion',
      '12-lead ECG',
    ],
  },
};

export function LevelSelection({ onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🏥</div>
        <h1 className="text-3xl font-bold text-white">Hatzolah CPG</h1>
        <p className="text-blue-200 text-sm mt-1">Clinical Practice Guidelines v6.2</p>
        <p className="text-blue-100 mt-4 max-w-sm text-sm">
          Select your practice level to see the protocols relevant to your scope.
        </p>
      </div>

      {/* Level Cards */}
      <div className="w-full max-w-sm space-y-4">
        {Object.entries(PRACTICE_LEVELS).map(([key, config]) => {
          const detail = levelDetails[key];
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="w-full text-left bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-200 active:scale-95"
            >
              {/* Card header bar */}
              <div
                className="px-5 py-4"
                style={{ background: config.headerGradient }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{detail.emoji}</span>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">{config.label}</h2>
                    <p className="text-white text-opacity-80 text-xs">{config.description}</p>
                  </div>
                </div>
              </div>
              {/* Feature list */}
              <div className="px-5 py-3">
                <ul className="space-y-1">
                  {detail.featureList.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info note */}
      <div className="mt-6 max-w-sm text-center">
        <p className="text-blue-200 text-xs">
          You can change your level at any time in Settings. Code Blue (L1) responders will always be escalated to a higher level for further assessment.
        </p>
      </div>
    </div>
  );
}
