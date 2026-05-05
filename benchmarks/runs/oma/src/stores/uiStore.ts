import { create } from 'zustand';

export type Tool = 'select' | 'move' | 'rotate' | 'scale' | 'color' | 'delete';
export type Panel = 'objects' | 'environment' | 'spark' | null;

interface UIStoreState {
  activeTool: Tool;
  activePanel: Panel;
  isPlaying: boolean;
  showGrid: boolean;
  isSaving: boolean;
}

interface UIStoreActions {
  setTool: (tool: Tool) => void;
  setPanel: (panel: Panel) => void;
  togglePanel: (panel: Panel) => void;
  setPlaying: (playing: boolean) => void;
  toggleGrid: () => void;
  setSaving: (saving: boolean) => void;
}

export const useUIStore = create<UIStoreState & UIStoreActions>()((set, get) => ({
  activeTool: 'select',
  activePanel: 'objects',
  isPlaying: false,
  showGrid: true,
  isSaving: false,

  setTool: (tool) => set({ activeTool: tool }),
  setPanel: (panel) => set({ activePanel: panel }),
  togglePanel: (panel) => set({ activePanel: get().activePanel === panel ? null : panel }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  toggleGrid: () => set({ showGrid: !get().showGrid }),
  setSaving: (saving) => set({ isSaving: saving }),
}));
