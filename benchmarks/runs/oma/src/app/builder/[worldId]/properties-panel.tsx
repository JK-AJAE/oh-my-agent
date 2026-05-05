'use client';

import { RotateCw, Copy, Trash2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import { useWorldStore } from '@/stores/world-store';

const ROTATION_STEP = Math.PI / 4; // 45 degrees

export function PropertiesPanel() {
  const { objects, selectedObjectId, updateObject, removeObject, addObject } = useWorldStore();

  const obj = objects.find((o) => o.id === selectedObjectId);

  if (!obj) {
    return (
      <p className="text-sm text-primary-400 text-center py-4">
        Select an object in the scene to edit it.
      </p>
    );
  }

  const uniformScale = obj.scale[0];

  function handleColorChange(hex: string) {
    updateObject(obj!.id, { color: hex });
  }

  function handleScaleChange(value: number) {
    updateObject(obj!.id, { scale: [value, value, value] });
  }

  function handleRotate(axis: 0 | 1 | 2) {
    const rotation = [...obj!.rotation] as [number, number, number];
    rotation[axis] = rotation[axis] + ROTATION_STEP;
    updateObject(obj!.id, { rotation });
  }

  function handleNameChange(value: string) {
    updateObject(obj!.id, { name: value });
  }

  function handleDuplicate() {
    const offset: [number, number, number] = [
      obj!.position[0] + 1.2,
      obj!.position[1],
      obj!.position[2] + 1.2,
    ];
    addObject(obj!.type, offset);
  }

  function handleDelete() {
    removeObject(obj!.id);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label htmlFor="obj-name" className="block text-xs font-bold text-primary-600 uppercase tracking-wide mb-1.5">
          Name
        </label>
        <input
          id="obj-name"
          type="text"
          value={obj.name ?? ''}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder={obj.type}
          className="w-full rounded-xl border-2 border-primary-200 bg-white/80 px-3 py-2 text-sm font-semibold text-primary-800 placeholder:text-primary-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
        />
      </div>

      {/* Color */}
      <div>
        <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-2">Color</p>
        <ColorPicker value={obj.color} onChange={handleColorChange} />
      </div>

      {/* Scale */}
      <div>
        <label htmlFor="obj-scale" className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">Scale</span>
          <span className="text-sm font-bold text-primary-700">{uniformScale.toFixed(1)}x</span>
        </label>
        <input
          id="obj-scale"
          type="range"
          min={0.5}
          max={3}
          step={0.1}
          value={uniformScale}
          onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
          className="w-full accent-primary-600"
          aria-label={`Scale: ${uniformScale.toFixed(1)}x`}
        />
        <div className="flex justify-between text-xs text-primary-400 mt-0.5">
          <span>0.5x</span>
          <span>3x</span>
        </div>
      </div>

      {/* Rotation */}
      <div>
        <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-2">Rotate 45&deg;</p>
        <div className="flex gap-2">
          {(['X', 'Y', 'Z'] as const).map((axis, i) => (
            <button
              key={axis}
              type="button"
              onClick={() => handleRotate(i as 0 | 1 | 2)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-2 border-primary-200 bg-white/80 py-2 text-sm font-bold text-primary-700 hover:bg-primary-50 hover:border-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 cursor-pointer"
              aria-label={`Rotate ${axis} axis by 45 degrees`}
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              {axis}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-2 border-t border-primary-100">
        <Button
          variant="secondary"
          size="sm"
          icon={<Copy className="h-4 w-4" />}
          onClick={handleDuplicate}
          className="w-full"
          aria-label="Duplicate selected object"
        >
          Duplicate
        </Button>
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="h-4 w-4" />}
          onClick={handleDelete}
          className="w-full"
          aria-label="Delete selected object"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
