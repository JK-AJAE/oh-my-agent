import { create } from 'zustand';
import type { Project } from '@/types';

interface ProjectStoreState {
  currentProject: Project | null;
  projects: Project[];
  isLoading: boolean;
  lastSaved: Date | null;
}

interface ProjectStoreActions {
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  setLastSaved: (date: Date) => void;
  updateCurrentProject: (updates: Partial<Project>) => void;
}

export const useProjectStore = create<ProjectStoreState & ProjectStoreActions>()((set) => ({
  currentProject: null,
  projects: [],
  isLoading: false,
  lastSaved: null,

  setCurrentProject: (project) => set({ currentProject: project }),
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLastSaved: (date) => set({ lastSaved: date }),
  updateCurrentProject: (updates) => set((state) => ({
    currentProject: state.currentProject ? { ...state.currentProject, ...updates } : null,
  })),
}));
