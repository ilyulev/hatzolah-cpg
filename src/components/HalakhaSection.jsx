/**
 * Halakha — religious guidance for Jewish first responders (app extension).
 * Ships as a deliberate empty state; renders halakhaContent when provided.
 */
import React from 'react';
import { Star } from 'lucide-react';
import { halakhaContent } from '../data/extensions/halakhaContent';

export function HalakhaSection() {
  if (halakhaContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <Star className="w-10 h-10 text-gray-300 mb-4" />
        <h2 className="font-bold text-gray-700 mb-2">Halakha</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Religious guidance for Jewish first responders. Content coming soon.
        </p>
      </div>
    );
  }
  return (
    <div className="p-3 space-y-2">
      {halakhaContent.map((item, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
          <p className="text-sm text-gray-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
