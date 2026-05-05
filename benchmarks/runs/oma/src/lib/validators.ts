import { z } from 'zod';

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color');

export const worldObjectSchema = z.object({
  id: z.string(),
  type: z.enum(['cube', 'sphere', 'cylinder', 'cone', 'torus', 'tree', 'flower', 'rock', 'house', 'character', 'animal', 'vehicle', 'cloud', 'star', 'crystal']),
  position: z.tuple([z.number(), z.number(), z.number()]),
  rotation: z.tuple([z.number(), z.number(), z.number()]),
  scale: z.tuple([z.number().min(0.1).max(5), z.number().min(0.1).max(5), z.number().min(0.1).max(5)]),
  color: hexColor,
  name: z.string().max(50).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const worldStateSchema = z.object({
  objects: z.array(worldObjectSchema).max(50),
  environment: z.enum(['forest', 'ocean', 'space', 'city', 'fantasy', 'desert', 'snow']),
  skyColor: hexColor,
  groundColor: hexColor,
  ambientLight: z.number().min(0).max(1),
});

export const projectCreateSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  worldData: worldStateSchema,
  isPublic: z.boolean().default(false),
});

export const aiPromptSchema = z.object({
  message: z.string().min(1).max(500),
  worldContext: z.record(z.string(), z.unknown()),
  history: z.array(z.object({
    role: z.enum(['spark', 'child']),
    content: z.string(),
  })).max(10),
});
