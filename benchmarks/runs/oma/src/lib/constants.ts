import type { ObjectType, EnvironmentTheme } from '@/types';

export const OBJECT_LIBRARY: Record<string, { type: ObjectType; label: string; emoji: string; category: string }[]> = {
  shapes: [
    { type: 'cube', label: 'Box', emoji: '📦', category: 'shapes' },
    { type: 'sphere', label: 'Ball', emoji: '⚽', category: 'shapes' },
    { type: 'cylinder', label: 'Tube', emoji: '🧱', category: 'shapes' },
    { type: 'cone', label: 'Cone', emoji: '🔺', category: 'shapes' },
    { type: 'torus', label: 'Ring', emoji: '💍', category: 'shapes' },
  ],
  nature: [
    { type: 'tree', label: 'Tree', emoji: '🌳', category: 'nature' },
    { type: 'flower', label: 'Flower', emoji: '🌸', category: 'nature' },
    { type: 'rock', label: 'Rock', emoji: '🪨', category: 'nature' },
    { type: 'cloud', label: 'Cloud', emoji: '☁️', category: 'nature' },
    { type: 'crystal', label: 'Crystal', emoji: '💎', category: 'nature' },
  ],
  buildings: [
    { type: 'house', label: 'House', emoji: '🏠', category: 'buildings' },
    { type: 'vehicle', label: 'Car', emoji: '🚗', category: 'buildings' },
  ],
  characters: [
    { type: 'character', label: 'Person', emoji: '🧑', category: 'characters' },
    { type: 'animal', label: 'Animal', emoji: '🐾', category: 'characters' },
    { type: 'star', label: 'Star', emoji: '⭐', category: 'characters' },
  ],
};

export const ENVIRONMENTS: { theme: EnvironmentTheme; label: string; emoji: string }[] = [
  { theme: 'forest', label: 'Forest', emoji: '🌲' },
  { theme: 'ocean', label: 'Ocean', emoji: '🌊' },
  { theme: 'space', label: 'Space', emoji: '🚀' },
  { theme: 'city', label: 'City', emoji: '🏙️' },
  { theme: 'fantasy', label: 'Fantasy', emoji: '🦄' },
  { theme: 'desert', label: 'Desert', emoji: '🏜️' },
  { theme: 'snow', label: 'Snow', emoji: '❄️' },
];

export const COLOR_PALETTE = [
  '#FF6B6B', '#FF8E53', '#FFCD56', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE',
  '#85C1E9', '#F1948A', '#82E0AA', '#F8C471', '#AED6F1',
  '#FFFFFF', '#2C3E50', '#8B4513', '#708090', '#FFB6C1',
];

export const MAX_OBJECTS = 50;
export const AUTOSAVE_INTERVAL = 30000;
