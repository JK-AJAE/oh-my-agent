import type { EnvironmentTheme } from '@/types/world';

// ---------------------------------------------------------------------------
// System prompt for Spark — injected into OpenAI chat completions
// ---------------------------------------------------------------------------

export const SYSTEM_PROMPT = `You are Spark, a warm and playful creative companion for children ages 6-12 who are building 3D worlds.

RULES YOU MUST ALWAYS FOLLOW:
- Keep every response to a maximum of 2 sentences.
- Ask ONE question OR give ONE suggestion — never both in the same message.
- Use simple words that a 7-year-old can easily understand.
- Be encouraging, excited, and positive about what the child has made.
- Never give complete answers or build things for the child — guide them through curiosity.
- Never mention violence, scary themes, or anything inappropriate.
- If a child asks about something unrelated to their world, gently redirect back to their creation.
- Use playful language and occasional exclamations ("Wow!", "Oh cool!", "I love that!").

WORLD CONTEXT will be provided with each message so you know what the child has built.
Use that context to make your suggestions feel personal and relevant to their specific world.

RESPONSE FORMAT:
- Plain text only — no markdown, no bullet points, no lists.
- End with either a question mark (if asking a question) or an exclamation mark (if giving a suggestion).`;

// ---------------------------------------------------------------------------
// Fallback prompts grouped by category (used when no OpenAI key is set)
// ---------------------------------------------------------------------------

interface FallbackCategory {
  imagination: string[];
  challenge: string[];
  reflection: string[];
  extension: string[];
}

export const FALLBACK_PROMPTS: FallbackCategory = {
  imagination: [
    "What if your world could float high up in the sky?",
    "What sounds would this magical place make?",
    "If your world had a smell, what would it smell like?",
    "What if everything in your world could talk to each other?",
    "What if it started raining something silly, like candy or feathers?",
    "What if your world was inside a giant snow globe?",
    "What if the ground was made of something bouncy?",
    "What if there was a secret door hidden somewhere in your world?",
  ],
  challenge: [
    "Can you add something that totally doesn't belong here?",
    "What if everything was upside down?",
    "Can you make the tallest tower possible?",
    "What if you could only use one color for everything?",
    "Can you hide something tiny that's hard to find?",
    "What if you added something from outer space to your world?",
    "Can you build a cozy corner where someone could take a nap?",
    "What if you added the most unexpected object you can think of?",
  ],
  reflection: [
    "What feeling does your world give you when you look at it?",
    "Who would you invite to come visit this place?",
    "If you lived here, what would you do all day?",
    "What's your favorite part of the world you've built so far?",
    "What makes this place special compared to anywhere else?",
    "If this world had a name, what would you call it?",
    "What kind of adventures could happen in this world?",
  ],
  extension: [
    "What happens when night falls in your world?",
    "What's hiding just behind that object?",
    "What would your world look like in winter?",
    "What creatures might live in the places you haven't built yet?",
    "What if there was a special treasure hidden somewhere in your world?",
    "What would you add next to make it even more amazing?",
    "What story is happening right now in your world?",
  ],
};

// Flat list of all fallback prompts for easy random selection
const ALL_FALLBACKS: string[] = [
  ...FALLBACK_PROMPTS.imagination,
  ...FALLBACK_PROMPTS.challenge,
  ...FALLBACK_PROMPTS.reflection,
  ...FALLBACK_PROMPTS.extension,
];

// ---------------------------------------------------------------------------
// Welcome messages — shown when the companion first opens
// ---------------------------------------------------------------------------

export const WELCOME_MESSAGES: string[] = [
  "Hi there! I'm Spark, your creative helper! What amazing world are you building today?",
  "Wow, I love what I see! I'm Spark, and I'm here to help make your world even more incredible!",
  "Hello, world builder! I'm Spark! I can't wait to see what you create — shall we explore some ideas together?",
  "Hey there! I'm Spark! Your world is already looking awesome. Want some fun ideas to make it even better?",
  "Welcome, creative superstar! I'm Spark, your imagination buddy! What would you like to add to your world today?",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns a random fallback prompt from the full list.
 */
export function getRandomFallback(): string {
  const index = Math.floor(Math.random() * ALL_FALLBACKS.length);
  return ALL_FALLBACKS[index];
}

/**
 * Returns a random welcome message.
 */
export function getWelcomeMessage(): string {
  const index = Math.floor(Math.random() * WELCOME_MESSAGES.length);
  return WELCOME_MESSAGES[index];
}

/**
 * Returns fallback suggestions themed to the environment.
 */
export function getFallbackSuggestions(theme: EnvironmentTheme): string[] {
  const base: Record<EnvironmentTheme, string[]> = {
    meadow: [
      "What if you added a rainbow to your meadow?",
      "Can you place a tiny animal hiding in the grass?",
      "What if a friendly giant visited your meadow?",
      "What if the flowers could glow at night?",
    ],
    ocean: [
      "What if you added a sunken treasure chest?",
      "What if there was a friendly sea creature in your ocean?",
      "Can you add some colorful coral?",
      "What if there was a whirlpool somewhere?",
    ],
    space: [
      "What if you added a planet with rings?",
      "Can you place a rocket ship on a launchpad?",
      "What if there was a black hole nearby?",
      "What if aliens were visiting your space?",
    ],
    forest: [
      "What if there was a hidden treehouse?",
      "Can you add a magical glowing mushroom?",
      "What if a dragon lived in your forest?",
      "What if the trees could walk around?",
    ],
    desert: [
      "What if there was an oasis with a palm tree?",
      "Can you add a pyramid in the distance?",
      "What if a sandstorm was coming?",
      "What if there was buried treasure under the sand?",
    ],
    arctic: [
      "What if you added a cozy igloo?",
      "Can you place a friendly polar bear?",
      "What if the northern lights appeared?",
      "What if there was a hidden cave under the ice?",
    ],
    city: [
      "What if you added a flying car zooming by?",
      "Can you build the tallest skyscraper ever?",
      "What if there was a secret underground tunnel?",
      "What if robots helped people in your city?",
    ],
    candy: [
      "What if you added a chocolate waterfall?",
      "Can you place a gingerbread house?",
      "What if the clouds were made of cotton candy?",
      "What if there was a giant lollipop forest?",
    ],
  };

  return base[theme] ?? [
    "What if you added something completely unexpected?",
    "Can you make something that surprises everyone?",
    "What if there was a secret spot only you know about?",
    "What if magic happened right here?",
  ];
}
