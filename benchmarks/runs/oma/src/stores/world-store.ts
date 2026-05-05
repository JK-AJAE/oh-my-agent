import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { World, WorldObject, ObjectType, EnvironmentTheme } from '@/types/world';

const MAX_UNDO_STACK = 20;

const DEFAULT_COLORS: Record<ObjectType, string> = {
  cube: '#4A90D9',
  sphere: '#E74C3C',
  cylinder: '#2ECC71',
  cone: '#F39C12',
  tree: '#27AE60',
  house: '#E67E22',
  character: '#9B59B6',
  animal: '#F1C40F',
  rock: '#95A5A6',
  flower: '#E91E63',
  cloud: '#ECF0F1',
  star: '#FFD700',
};

interface WorldState {
  objects: WorldObject[];
  selectedObjectId: string | null;
  environmentTheme: EnvironmentTheme;
  title: string;
  undoStack: WorldObject[][];
  redoStack: WorldObject[][];
}

interface WorldActions {
  addObject: (type: ObjectType, position?: [number, number, number]) => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, updates: Partial<Omit<WorldObject, 'id'>>) => void;
  removeObject: (id: string) => void;
  moveObject: (id: string, position: [number, number, number]) => void;
  rotateObject: (id: string, rotation: [number, number, number]) => void;
  scaleObject: (id: string, scale: [number, number, number]) => void;
  setEnvironment: (theme: EnvironmentTheme) => void;
  setTitle: (title: string) => void;
  undo: () => void;
  redo: () => void;
  loadWorld: (world: World) => void;
  getWorldData: () => Omit<World, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
}

type WorldStore = WorldState & WorldActions;

export const useWorldStore = create<WorldStore>((set, get) => ({
  objects: [],
  selectedObjectId: null,
  environmentTheme: 'meadow',
  title: 'My World',
  undoStack: [],
  redoStack: [],

  addObject: (type, position = [0, 0, 0]) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      const newObject: WorldObject = {
        id: nanoid(),
        type,
        position,
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        color: DEFAULT_COLORS[type],
      };
      return {
        objects: [...state.objects, newObject],
        undoStack,
        redoStack: [],
      };
    });
  },

  selectObject: (id) => {
    set({ selectedObjectId: id });
  },

  updateObject: (id, updates) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      return {
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, ...updates } : obj
        ),
        undoStack,
        redoStack: [],
      };
    });
  },

  removeObject: (id) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      return {
        objects: state.objects.filter((obj) => obj.id !== id),
        selectedObjectId: state.selectedObjectId === id ? null : state.selectedObjectId,
        undoStack,
        redoStack: [],
      };
    });
  },

  moveObject: (id, position) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      return {
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, position } : obj
        ),
        undoStack,
        redoStack: [],
      };
    });
  },

  rotateObject: (id, rotation) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      return {
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, rotation } : obj
        ),
        undoStack,
        redoStack: [],
      };
    });
  },

  scaleObject: (id, scale) => {
    set((state) => {
      const snapshot = [...state.objects];
      const undoStack = [...state.undoStack, snapshot].slice(-MAX_UNDO_STACK);
      return {
        objects: state.objects.map((obj) =>
          obj.id === id ? { ...obj, scale } : obj
        ),
        undoStack,
        redoStack: [],
      };
    });
  },

  setEnvironment: (theme) => {
    set({ environmentTheme: theme });
  },

  setTitle: (title) => {
    set({ title });
  },

  undo: () => {
    const { undoStack, objects } = get();
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    set((state) => ({
      objects: previous,
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [objects, ...state.redoStack].slice(0, MAX_UNDO_STACK),
    }));
  },

  redo: () => {
    const { redoStack, objects } = get();
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    set((state) => ({
      objects: next,
      redoStack: state.redoStack.slice(1),
      undoStack: [...state.undoStack, objects].slice(-MAX_UNDO_STACK),
    }));
  },

  loadWorld: (world) => {
    set({
      objects: world.objects,
      environmentTheme: world.environmentTheme,
      title: world.title,
      selectedObjectId: null,
      undoStack: [],
      redoStack: [],
    });
  },

  getWorldData: () => {
    const { objects, environmentTheme, title } = get();
    return {
      title,
      description: '',
      environmentTheme,
      objects,
      cameraPosition: [0, 5, 10] as [number, number, number],
      isPublic: false,
    };
  },
}));
