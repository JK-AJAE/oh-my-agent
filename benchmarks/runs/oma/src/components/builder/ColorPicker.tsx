'use client';

import { useWorldStore } from '@/stores/worldStore';
import { COLOR_PALETTE } from '@/lib/constants';

export function ColorPicker() {
  const { selectedObjectId, objects, updateObject } = useWorldStore();
  const selectedObject = objects.find((o) => o.id === selectedObjectId);

  if (!selectedObject) return null;

  return (
    <div
      role="dialog"
      aria-label="Color picker"
      className="absolute bottom-24 left-1/2 -translate-x-1/2 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border"
    >
      <p className="text-sm font-bold text-gray-600 mb-2 text-center">Pick a color!</p>
      <div className="grid grid-cols-5 gap-2" role="group" aria-label="Color options">
        {COLOR_PALETTE.map((color) => (
          <button
            key={color}
            onClick={() => updateObject(selectedObject.id, { color })}
            aria-label={`Color ${color}`}
            aria-pressed={selectedObject.color === color}
            className={`w-8 h-8 rounded-full transition hover:scale-125 active:scale-95 ${
              selectedObject.color === color ? 'ring-2 ring-gray-800 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
