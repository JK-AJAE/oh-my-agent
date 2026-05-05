import { create } from 'zustand';

type ActivePanel = 'objects' | 'properties' | 'ai' | null;

interface UIState {
  activePanel: ActivePanel;
  isPlayMode: boolean;
  showGrid: boolean;
  showAI: boolean;
  isSaving: boolean;
}

interface UIActions {
  setActivePanel: (panel: ActivePanel) => void;
  togglePlayMode: () => void;
  toggleGrid: () => void;
  toggleAI: () => void;
  setIsSaving: (isSaving: boolean) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  activePanel: null,
  isPlayMode: false,
  showGrid: true,
  showAI: false,
  isSaving: false,

  setActivePanel: (panel) => {
    set({ activePanel: panel });
  },

  togglePlayMode: () => {
    set((state) => ({ isPlayMode: !state.isPlayMode }));
  },

  toggleGrid: () => {
    set((state) => ({ showGrid: !state.showGrid }));
  },

  toggleAI: () => {
    set((state) => ({ showAI: !state.showAI }));
  },

  setIsSaving: (isSaving) => {
    set({ isSaving });
  },
}));
