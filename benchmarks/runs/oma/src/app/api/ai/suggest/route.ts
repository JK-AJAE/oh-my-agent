import { NextRequest, NextResponse } from 'next/server';
import type { ObjectType, EnvironmentTheme } from '@/types/world';

interface SuggestRequestBody {
  theme: EnvironmentTheme;
  existingObjects: string[];
}

interface SuggestResponseBody {
  suggestions: ObjectType[];
  prompt: string;
}

// Themed object pools for each environment
const THEME_OBJECT_POOL: Record<EnvironmentTheme, ObjectType[]> = {
  meadow: ['flower', 'tree', 'animal', 'character', 'cloud', 'house', 'rock'],
  ocean: ['rock', 'cloud', 'character', 'sphere', 'cylinder'],
  space: ['star', 'rock', 'sphere', 'cone', 'cube', 'cylinder'],
  forest: ['tree', 'rock', 'animal', 'flower', 'character', 'house'],
  desert: ['rock', 'cone', 'cube', 'character', 'star', 'sphere'],
  arctic: ['cube', 'rock', 'sphere', 'character', 'animal', 'cloud'],
  city: ['cube', 'cylinder', 'house', 'character', 'cone', 'sphere'],
  candy: ['sphere', 'cylinder', 'cone', 'cube', 'star', 'flower'],
};

// Short prompt string for the UI to display alongside suggestions
const THEME_PROMPTS: Record<EnvironmentTheme, string> = {
  meadow: "Your meadow looks lovely! Try adding some of these to bring it to life:",
  ocean: "The ocean is calling! Here are some things that would feel right at home:",
  space: "Houston, we have ideas! These would look amazing in your space world:",
  forest: "Into the woods! These would make your forest feel more magical:",
  desert: "The desert is full of secrets! Try adding one of these:",
  arctic: "Brrr, cool ideas! These would look great in your icy world:",
  city: "City building time! These would make your city even busier:",
  candy: "So sweet! These sugary additions would make your world even yummier:",
};

const MAX_SAME_TYPE = 3;

export async function POST(request: NextRequest): Promise<NextResponse<SuggestResponseBody>> {
  let body: SuggestRequestBody;
  try {
    body = (await request.json()) as SuggestRequestBody;
  } catch {
    return NextResponse.json(
      {
        suggestions: ['cube', 'sphere', 'tree', 'character'],
        prompt: "Try adding some of these to your world:",
      },
      { status: 200 },
    );
  }

  const { theme, existingObjects } = body;

  // Count how many of each type already exist
  const existingCounts: Record<string, number> = {};
  for (const type of existingObjects) {
    existingCounts[type] = (existingCounts[type] ?? 0) + 1;
  }

  const pool = THEME_OBJECT_POOL[theme] ?? THEME_OBJECT_POOL.meadow;

  // Filter out over-represented types and build suggestion list
  const filtered = pool.filter(
    (type) => (existingCounts[type] ?? 0) < MAX_SAME_TYPE,
  );

  // Shuffle deterministically enough to feel varied but still be fast
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());

  // Return up to 4 suggestions
  const suggestions = shuffled.slice(0, 4) as ObjectType[];

  // If we have nothing left, fall back to the full pool top 4
  if (suggestions.length === 0) {
    return NextResponse.json({
      suggestions: pool.slice(0, 4) as ObjectType[],
      prompt: THEME_PROMPTS[theme] ?? "Here are some ideas for your world:",
    });
  }

  return NextResponse.json({
    suggestions,
    prompt: THEME_PROMPTS[theme] ?? "Here are some ideas for your world:",
  });
}
