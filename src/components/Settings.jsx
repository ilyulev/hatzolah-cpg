/**
 * Settings screen — change practice level with confirmation modal
 */
import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PRACTICE_LEVELS, SELECTABLE_LEVELS } from '../data/contentData';

export function Settings({ userLevel, onChangeLevel, onClose }) {
  const [pendingLevel, setPendingLevel] = useState(null);

  const handleSelect = (level) => {
    if (level === userLevel) return;
    setPendingLevel(level);
  };

  const handleConfirm = () => {
    if (pendingLevel) {
      onChangeLevel(pendingLevel);
      setPendingLevel(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-800 px-4 py-3 flex items-center space-x-3">
        <button onClick={onClose} className="text-white">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-white font-bold text-base">Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {/* Current level */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Practice Level</p>
          <div className="space-y-3">
            {SELECTABLE_LEVELS.map((key) => {
              const config = PRACTICE_LEVELS[key];
              const isActive = key === userLevel;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                    isActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={{
                        borderColor: isActive ? '#3b82f6' : '#d1d5db',
                        background: isActive ? '#3b82f6' : 'white',
                      }}
                    >
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`font-semibold ${isActive ? 'text-blue-800' : 'text-gray-800'}`}>
                        {config.label}
                      </p>
                      <p className="text-xs text-gray-500">{config.description}</p>
                    </div>
                    {isActive && <CheckCircle2 className="w-4 h-4 text-blue-500 ml-auto flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">About</p>
          <p className="text-sm text-gray-600">Hatzolah CPG v6.2 (14 Aug 2024)</p>
          <p className="text-xs text-gray-400 mt-1">For clinical use by Hatzolah Melbourne members only.</p>
        </div>
      </div>

      {/* Confirmation modal */}
      {pendingLevel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <h3 className="font-bold text-gray-900">Change Practice Level?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              You are changing from <strong>{PRACTICE_LEVELS[userLevel]?.label}</strong> to{' '}
              <strong>{PRACTICE_LEVELS[pendingLevel]?.label}</strong>. This will change which protocols are visible to you.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setPendingLevel(null)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 bg-blue-600 rounded-xl text-white font-medium text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
