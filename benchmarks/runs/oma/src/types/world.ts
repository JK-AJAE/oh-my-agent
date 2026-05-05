export type ObjectType =
  | 'cube'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'tree'
  | 'house'
  | 'character'
  | 'animal'
  | 'rock'
  | 'flower'
  | 'cloud'
  | 'star';

export type EnvironmentTheme =
  | 'meadow'
  | 'ocean'
  | 'space'
  | 'forest'
  | 'desert'
  | 'arctic'
  | 'city'
  | 'candy';

export interface WorldObject {
  id: string;
  type: ObjectType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  name?: string;
}

export interface World {
  id: string;
  userId: string;
  title: string;
  description: string;
  environmentTheme: EnvironmentTheme;
  objects: WorldObject[];
  cameraPosition: [number, number, number];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AIMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  type?: 'prompt' | 'suggestion' | 'reflection' | 'celebration';
}

export interface User {
  id: string;
  displayName: string;
  avatarEmoji: string;
}
