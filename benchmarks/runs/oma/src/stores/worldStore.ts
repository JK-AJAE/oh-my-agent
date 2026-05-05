import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';
import type { WorldObject, EnvironmentTheme, WorldState } from '@/types';

interface WorldStoreState {
  objects: WorldObject[];
  environment: EnvironmentTheme;
  skyColor: string;
  groundColor: string;
  ambientLight: number;
  selectedObjectId: string | null;
  history: WorldState[];
  historyIndex: number;
}

interface WorldStoreActions {
  addObject: (type: WorldObject['type'], position?: [number, number, number]) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<WorldObject>) => void;
  selectObject: (id: string | null) => void;
  setEnvironment: (theme: EnvironmentTheme) => void;
  setSkyColor: (color: string) => void;
  setGroundColor: (color: string) => void;
  undo: () => void;
  redo: () => void;
  saveSnapshot: () => void;
  loadWorld: (state: WorldState) => void;
  getWorldState: () => WorldState;
  clearWorld: () => void;
}

const DEFAULT_COLORS: Record<EnvironmentTheme, { sky: string; ground: string }> = {
  forest: { sky: '#87CEEB', ground: '#4a7c59' },
  ocean: { sky: '#4FC3F7', ground: '#1565C0' },
  space: { sky: '#1a1a2e', ground: '#2d2d44' },
  city: { sky: '#B0BEC5', ground: '#78909C' },
  fantasy: { sky: '#CE93D8', ground: '#7B1FA2' },
  desert: { sky: '#FFE082', ground: '#F9A825' },
  snow: { sky: '#E3F2FD', ground: '#FFFFFF' },
};

export const useWorldStore = create<WorldStoreState & WorldStoreActions>()(
  immer((set, get) => ({
    objects: [],
    environment: 'forest',
    skyColor: DEFAULT_COLORS.forest.sky,
    groundColor: DEFAULT_COLORS.forest.ground,
    ambientLight: 0.6,
    selectedObjectId: null,
    history: [],
    historyIndex: -1,

    addObject: (type, position = [0, 0.5, 0]) => {
      set((state) => {
        if (state.objects.length >= 50) return;
        const newObject: WorldObject = {
          id: uuidv4(),
          type,
          position,
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
          color: '#FF6B6B',
        };
        state.objects.push(newObject);
        state.selectedObjectId = newObject.id;
      });
      get().saveSnapshot();
    },

    removeObject: (id) => {
      set((state) => {
        state.objects = state.objects.filter((o) => o.id !== id);
        if (state.selectedObjectId === id) state.selectedObjectId = null;
      });
      get().saveSnapshot();
    },

    updateObject: (id, updates) => {
      set((state) => {
        const obj = state.objects.find((o) => o.id === id);
        if (obj) Object.assign(obj, updates);
      });
    },

    selectObject: (id) => set((state) => { state.selectedObjectId = id; }),

    setEnvironment: (theme) => {
      set((state) => {
        state.environment = theme;
        state.skyColor = DEFAULT_COLORS[theme].sky;
        state.groundColor = DEFAULT_COLORS[theme].ground;
      });
      get().saveSnapshot();
    },

    setSkyColor: (color) => set((state) => { state.skyColor = color; }),
    setGroundColor: (color) => set((state) => { state.groundColor = color; }),

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex <= 0) return;
      const prev = history[historyIndex - 1];
      set((state) => {
        state.objects = prev.objects;
        state.environment = prev.environment;
        state.skyColor = prev.skyColor;
        state.groundColor = prev.groundColor;
        state.historyIndex = historyIndex - 1;
      });
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex >= history.length - 1) return;
      const next = history[historyIndex + 1];
      set((state) => {
        state.objects = next.objects;
        state.environment = next.environment;
        state.skyColor = next.skyColor;
        state.groundColor = next.groundColor;
        state.historyIndex = historyIndex + 1;
      });
    },

    saveSnapshot: () => {
      const { objects, environment, skyColor, groundColor, ambientLight, history, historyIndex } = get();
      const snapshot: WorldState = { objects: [...objects], environment, skyColor, groundColor, ambientLight };
      set((state) => {
        state.history = [...history.slice(0, historyIndex + 1), snapshot];
        state.historyIndex = state.history.length - 1;
      });
    },

    loadWorld: (worldState) => {
      set((state) => {
        state.objects = worldState.objects;
        state.environment = worldState.environment;
        state.skyColor = worldState.skyColor;
        state.groundColor = worldState.groundColor;
        state.ambientLight = worldState.ambientLight;
        state.history = [worldState];
        state.historyIndex = 0;
        state.selectedObjectId = null;
      });
    },

    getWorldState: () => {
      const { objects, environment, skyColor, groundColor, ambientLight } = get();
      return { objects, environment, skyColor, groundColor, ambientLight };
    },

    clearWorld: () => {
      set((state) => {
        state.objects = [];
        state.selectedObjectId = null;
      });
      get().saveSnapshot();
    },
  }))
);
