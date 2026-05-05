'use client';

import { cn } from '@/lib/cn';

// 12 preset colors — Tailwind 400 shades
export const PRESET_COLORS = [
  { name: 'Red', hex: '#f87171' },
  { name: 'Orange', hex: '#fb923c' },
  { name: 'Amber', hex: '#fbbf24' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Lime', hex: '#a3e635' },
  { name: 'Green', hex: '#4ade80' },
  { name: 'Emerald', hex: '#34d399' },
  { name: 'Cyan', hex: '#22d3ee' },
  { name: 'Sky', hex: '#38bdf8' },
  { name: 'Blue', hex: '#60a5fa' },
  { name: 'Violet', hex: '#a78bfa' },
  { name: 'Pink', hex: '#f472b6' },
] as const;

export type PresetColor = (typeof PRESET_COLORS)[number]['hex'];

export interface ColorPickerProps {
  /** Currently selected hex value */
  value: string;
  /** Called with the hex string of the chosen color */
  onChange: (hex: string) => void;
  /** Additional class for the outer wrapper */
  className?: string;
  /** Accessible label for the color-picker group */
  label?: string;
}

export function ColorPicker({
  value,
  onChange,
  className,
  label = 'Pick a color',
}: ColorPickerProps) {
  return (
    <fieldset className={cn('border-0 p-0 m-0', className)}>
      <legend className="sr-only">{label}</legend>
      <div
        role="group"
        aria-label={label}
        className="grid grid-cols-4 gap-3"
      >
        {PRESET_COLORS.map(({ name, hex }) => {
          const isSelected = value.toLowerCase() === hex.toLowerCase();
          return (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              aria-label={`${name}${isSelected ? ' (selected)' : ''}`}
              aria-pressed={isSelected}
              className={cn(
                'relative h-10 w-10 rounded-full',
                'transition-transform duration-150',
                'hover:scale-110 active:scale-95',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-700',
                isSelected && [
                  'ring-4 ring-offset-2',
                  'ring-gray-800',
                  'scale-110',
                ],
              )}
              style={{ backgroundColor: hex }}
            >
              {isSelected && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    'text-white text-lg font-bold drop-shadow',
                  )}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
