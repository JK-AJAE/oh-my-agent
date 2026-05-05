'use client';

import { useWorldStore } from '@/stores/worldStore';
import { ENVIRONMENTS } from '@/lib/constants';
import type { EnvironmentTheme } from '@/types';

export function EnvironmentSelector() {
  const { environment, setEnvironment } = useWorldStore();

  return (
    <div className="p-4">
      <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Choose Your World</h3>
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Environment themes">
        {ENVIRONMENTS.map((env) => (
          <button
            key={env.theme}
            onClick={() => setEnvironment(env.theme as EnvironmentTheme)}
            aria-pressed={environment === env.theme}
            aria-label={`${env.label} environment`}
            className={`flex flex-col items-center p-4 rounded-xl border-2 transition active:scale-95 ${
              environment === env.theme
                ? 'border-spark-400 bg-spark-50 shadow-md'
                : 'border-transparent bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <span className="text-3xl" aria-hidden="true">{env.emoji}</span>
            <span className="text-sm font-bold mt-2">{env.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
