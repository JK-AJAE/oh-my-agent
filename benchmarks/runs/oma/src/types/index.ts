export type ObjectType =
  | 'cube'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'torus'
  | 'tree'
  | 'flower'
  | 'rock'
  | 'house'
  | 'character'
  | 'animal'
  | 'vehicle'
  | 'cloud'
  | 'star'
  | 'crystal';

export type EnvironmentTheme =
  | 'forest'
  | 'ocean'
  | 'space'
  | 'city'
  | 'fantasy'
  | 'desert'
  | 'snow';

export interface WorldObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  name?: string;
  metadata?: Record<string, unknown>;
}

export interface WorldState {
  objects: WorldObject[];
  environment: EnvironmentTheme;
  skyColor: string;
  groundColor: string;
  ambientLight: number;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  worldData: WorldState;
  thumbnail?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIMessage {
  id: string;
  role: 'spark' | 'child';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'student' | 'teacher';
  avatar?: string;
}
