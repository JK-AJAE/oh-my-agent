'use client';

import { useState } from 'react';
import { useWorldStore } from '@/stores/worldStore';
import { OBJECT_LIBRARY, ENVIRONMENTS } from '@/lib/constants';
import type { ObjectType, EnvironmentTheme } from '@/types';

export function ObjectLibrary() {
  const [tab, setTab] = useState<'objects' | 'world'>('objects');
  const { addObject, setEnvironment, environment } = useWorldStore();

  return (
    <div className="p-4">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-4" role="tablist" aria-label="Library tabs">
        <button
          role="tab"
          aria-selected={tab === 'objects'}
          onClick={() => setTab('objects')}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${
            tab === 'objects' ? 'bg-spark-400 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          📦 Objects
        </button>
        <button
          role="tab"
          aria-selected={tab === 'world'}
          onClick={() => setTab('world')}
          className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${
            tab === 'world' ? 'bg-spark-400 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          🌍 World
        </button>
      </div>

      {tab === 'objects' ? (
        <div className="space-y-4" role="tabpanel" aria-label="Objects">
          {Object.entries(OBJECT_LIBRARY).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">{category}</h3>
              <div className="grid grid-cols-3 gap-2">
                {items.map((item) => (
                  <button
                    key={item.type}
                    onClick={() => addObject(item.type as ObjectType)}
                    aria-label={`Add ${item.label}`}
                    className="flex flex-col items-center p-3 rounded-xl bg-gray-50 hover:bg-spark-50 hover:shadow-md transition active:scale-95"
                  >
                    <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                    <span className="text-xs font-semibold mt-1 text-gray-700">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4" role="tabpanel" aria-label="World environments">
          <h3 className="text-sm font-bold text-gray-500 uppercase">Environment</h3>
          <div className="grid grid-cols-2 gap-2">
            {ENVIRONMENTS.map((env) => (
              <button
                key={env.theme}
                onClick={() => setEnvironment(env.theme as EnvironmentTheme)}
                aria-pressed={environment === env.theme}
                aria-label={`Set ${env.label} environment`}
                className={`flex flex-col items-center p-4 rounded-xl transition active:scale-95 ${
                  environment === env.theme
                    ? 'bg-spark-100 ring-2 ring-spark-400 shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-3xl" aria-hidden="true">{env.emoji}</span>
                <span className="text-sm font-bold mt-1">{env.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
