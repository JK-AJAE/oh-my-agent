import { NextRequest, NextResponse } from 'next/server';
import type { WorldObject, EnvironmentTheme } from '@/types/world';
import {
  SYSTEM_PROMPT,
  getRandomFallback,
  getFallbackSuggestions,
} from '@/lib/ai-prompts';

interface WorldContext {
  objects: WorldObject[];
  theme: EnvironmentTheme;
  title: string;
}

interface PromptRequestBody {
  worldContext: WorldContext;
  userMessage?: string;
}

interface PromptResponseBody {
  message: string;
  suggestions: string[];
}

function buildWorldDescription(worldContext: WorldContext): string {
  const { objects, theme, title } = worldContext;
  const objectCounts: Record<string, number> = {};
  for (const obj of objects) {
    objectCounts[obj.type] = (objectCounts[obj.type] ?? 0) + 1;
  }
  const objectList = Object.entries(objectCounts)
    .map(([type, count]) => `${count} ${type}${count > 1 ? 's' : ''}`)
    .join(', ');

  return [
    `The child's world is titled "${title}".`,
    `Environment theme: ${theme}.`,
    objects.length > 0
      ? `Objects in the world: ${objectList}.`
      : 'The world is currently empty — the child is just getting started.',
  ].join(' ');
}

export async function POST(request: NextRequest): Promise<NextResponse<PromptResponseBody>> {
  let body: PromptRequestBody;
  try {
    body = (await request.json()) as PromptRequestBody;
  } catch {
    return NextResponse.json(
      { message: getRandomFallback(), suggestions: [] },
      { status: 200 },
    );
  }

  const { worldContext, userMessage } = body;

  // Build suggestions regardless of OpenAI availability
  const suggestions = getFallbackSuggestions(worldContext.theme);

  // No API key — return deterministic fallback immediately
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      message: getRandomFallback(),
      suggestions,
    });
  }

  // Build messages for OpenAI
  const worldDescription = buildWorldDescription(worldContext);
  const userContent = userMessage
    ? `${worldDescription}\n\nThe child says: "${userMessage}"`
    : `${worldDescription}\n\nGive the child one creative idea or question to spark their imagination!`;

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.8,
        max_tokens: 120,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const data = (await openAIResponse.json()) as {
      choices: Array<{ message: { content: string } }>;
    };

    const message = data.choices[0]?.message?.content?.trim() ?? getRandomFallback();

    return NextResponse.json({ message, suggestions });
  } catch {
    // Fall back gracefully on any error
    return NextResponse.json({
      message: getRandomFallback(),
      suggestions,
    });
  }
}
