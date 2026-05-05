'use client';

import type { Tool } from '@/stores/uiStore';
import { useUIStore } from '@/stores/uiStore';
import { useWorldStore } from '@/stores/worldStore';

const TOOLS: { id: Tool; label: string; icon: string }[] = [
  { id: 'select', label: 'Select', icon: '👆' },
  { id: 'move', label: 'Move', icon: '✥' },
  { id: 'rotate', label: 'Rotate', icon: '🔄' },
  { id: 'scale', label: 'Scale', icon: '📐' },
  { id: 'color', label: 'Color', icon: '🎨' },
  { id: 'delete', label: 'Delete', icon: '🗑️' },
];

export function ToolBar() {
  const { activeTool, setTool } = useUIStore();
  const { selectedObjectId, removeObject } = useWorldStore();

  const handleToolClick = (tool: Tool) => {
    if (tool === 'delete' && selectedObjectId) {
      removeObject(selectedObjectId);
    } else {
      setTool(tool);
    }
  };

  return (
    <div
      role="toolbar"
      aria-label="Builder tools"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl border"
    >
      {TOOLS.map((tool) => (
        <button
          key={tool.id}
          onClick={() => handleToolClick(tool.id)}
          aria-pressed={activeTool === tool.id}
          aria-label={tool.label}
          className={`w-12 h-12 flex items-center justify-center rounded-full text-xl transition hover:scale-110 active:scale-95 ${
            activeTool === tool.id
              ? 'bg-spark-400 shadow-md'
              : 'hover:bg-gray-100'
          }`}
          title={tool.label}
        >
          <span aria-hidden="true">{tool.icon}</span>
        </button>
      ))}
    </div>
  );
}
