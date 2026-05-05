'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/cn';
import { useWorldStore } from '@/stores/world-store';
import type { ObjectType } from '@/types/world';

interface ObjectEntry {
  type: ObjectType;
  emoji: string;
  label: string;
}

const OBJECT_ENTRIES: ObjectEntry[] = [
  { type: 'cube',      emoji: '🟦', label: 'Cube' },
  { type: 'sphere',    emoji: '⚽', label: 'Sphere' },
  { type: 'cylinder',  emoji: '🔲', label: 'Cylinder' },
  { type: 'cone',      emoji: '🔺', label: 'Cone' },
  { type: 'tree',      emoji: '🌳', label: 'Tree' },
  { type: 'house',     emoji: '🏠', label: 'House' },
  { type: 'character', emoji: '🧑', label: 'Character' },
  { type: 'animal',    emoji: '🐕', label: 'Animal' },
  { type: 'rock',      emoji: '🪨', label: 'Rock' },
  { type: 'flower',    emoji: '🌸', label: 'Flower' },
  { type: 'cloud',     emoji: '☁️', label: 'Cloud' },
  { type: 'star',      emoji: '⭐', label: 'Star' },
];

function randomSpread(range: number): number {
  return (Math.random() - 0.5) * range * 2;
}

export function ObjectLibrary() {
  const [activeType, setActiveType] = useState<ObjectType | null>(null);
  const addObject = useWorldStore((s) => s.addObject);

  const handleAdd = useCallback(
    (type: ObjectType) => {
      setActiveType(type);
      // Spread objects within a 4-unit radius so they don't all stack
      const position: [number, number, number] = [
        randomSpread(4),
        0.5,
        randomSpread(4),
      ];
      addObject(type, position);
    },
    [addObject],
  );

  return (
    <section aria-label="Object library" className="p-3">
      <h2 className="mb-3 text-sm font-bold text-foreground/70 uppercase tracking-wide">
        Add Objects
      </h2>

      <div
        role="list"
        className="grid grid-cols-3 gap-2"
      >
        {OBJECT_ENTRIES.map(({ type, emoji, label }) => (
          <button
            key={type}
            role="listitem"
            type="button"
            aria-label={`Add ${label}`}
            onClick={() => handleAdd(type)}
            className={cn(
              'flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl',
              'border-2 bg-white/80 transition-all duration-150',
              'cursor-pointer select-none',
              'hover:bg-primary-50 hover:border-primary-300',
              'active:scale-95 active:bg-primary-100',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
              activeType === type
                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-400 ring-offset-1'
                : 'border-transparent',
            )}
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {emoji}
            </span>
            <span className="text-xs font-semibold text-foreground/80">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
