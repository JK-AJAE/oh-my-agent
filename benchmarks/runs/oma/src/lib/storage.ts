import type { World } from '@/types/world';

const STORAGE_KEY = 'worldcraft-worlds';

function readAll(): Record<string, World> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, World>) : {};
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, World>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveWorld(worldId: string, data: World): void {
  const all = readAll();
  all[worldId] = data;
  writeAll(all);
}

export function loadWorld(worldId: string): World | null {
  const all = readAll();
  return all[worldId] ?? null;
}

export function listWorlds(): World[] {
  const all = readAll();
  return Object.values(all).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function deleteWorld(worldId: string): void {
  const all = readAll();
  delete all[worldId];
  writeAll(all);
}
