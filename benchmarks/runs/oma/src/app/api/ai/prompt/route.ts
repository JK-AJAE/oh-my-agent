import { NextRequest, NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { aiPromptSchema } from '@/lib/validators';

const SYSTEM_PROMPT = `You are Spark, a friendly and curious creative companion for children building 3D worlds. You are warm, playful, and encouraging.

RULES:
- Keep responses to 1-2 short sentences maximum
- Use simple words a 6-10 year old would understand
- Always end with ONE question or ONE suggestion
- Never be scary, violent, or inappropriate
- Encourage experimentation and creativity
- Never give "correct" answers - offer possibilities
- Use occasional emojis (1-2 max per response)
- If asked about personal info, redirect to building
- Never mention you are an AI - you are Spark, a creative friend

PERSONALITY:
- Curious about everything the child builds
- Excited by creative choices
- Supportive when things don't work
- Playful with "what if" questions
- Celebrates effort, not perfection`;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = aiPromptSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { message, worldContext, history } = parsed.data;

  const contextSummary = `Current world: ${worldContext.environment || 'forest'} theme, ${worldContext.objectCount || 0} objects placed. Recent objects: ${worldContext.recentObjects || 'none'}.`;

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nWORLD CONTEXT: ${contextSummary}` },
    ...history.map((msg) => ({
      role: (msg.role === 'child' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user', content: message },
  ];

  try {
    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 100,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "That's so cool! What will you add next? ✨";

    const suggestions = generateSuggestions(worldContext);

    return NextResponse.json({ content, suggestions });
  } catch {
    return NextResponse.json({
      content: "Ooh, I got excited and lost my train of thought! Tell me more about your world! 🌟",
      suggestions: ['Add something new', 'Change the colors', 'Try a different theme'],
    });
  }
}

function generateSuggestions(worldContext: Record<string, unknown>): string[] {
  const objectCount = (worldContext.objectCount as number) || 0;
  if (objectCount === 0) {
    return ['Add your first object!', 'Pick an environment', 'Ask Spark for ideas'];
  }
  if (objectCount < 5) {
    return ['Add more objects', 'Change colors', 'Try moving things around'];
  }
  return ['Enter play mode', 'Share your world', 'Try a what-if challenge'];
}
