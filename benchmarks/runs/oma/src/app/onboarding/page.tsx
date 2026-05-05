'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { nanoid } from 'nanoid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUserStore } from '@/stores/user-store';
import { useWorldStore } from '@/stores/world-store';
import { saveWorld } from '@/lib/storage';
import type { EnvironmentTheme } from '@/types/world';

const EMOJI_OPTIONS = ['🦊', '🐱', '🦁', '🐸', '🦋', '🌈', '🚀', '🌟', '🎨', '🎵', '🌺', '🐙'];

interface ThemeOption {
  theme: EnvironmentTheme;
  emoji: string;
  title: string;
  desc: string;
  borderColor: string;
  bgColor: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    theme: 'meadow',
    emoji: '🌿',
    title: 'Magical Meadow',
    desc: 'Peaceful fields full of flowers and friendly critters',
    borderColor: 'border-green-400',
    bgColor: 'hover:bg-green-50',
  },
  {
    theme: 'ocean',
    emoji: '🌊',
    title: 'Ocean Kingdom',
    desc: 'Dive into a sparkling underwater adventure',
    borderColor: 'border-blue-400',
    bgColor: 'hover:bg-blue-50',
  },
  {
    theme: 'space',
    emoji: '🚀',
    title: 'Space Adventure',
    desc: 'Launch rockets and explore the galaxy',
    borderColor: 'border-violet-400',
    bgColor: 'hover:bg-violet-50',
  },
  {
    theme: 'candy',
    emoji: '🍭',
    title: 'Candy World',
    desc: 'A sweet land made of lollipops and rainbows',
    borderColor: 'border-pink-400',
    bgColor: 'hover:bg-pink-50',
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<EnvironmentTheme | null>(null);

  const { login } = useUserStore();
  const { setEnvironment, getWorldData, setTitle } = useWorldStore();

  function goToStep2() {
    setDirection(1);
    setStep(1);
  }

  function handleThemeSelect(theme: EnvironmentTheme) {
    setSelectedTheme(theme);

    const userId = nanoid();
    const worldId = nanoid();

    login(name.trim(), emoji);
    setEnvironment(theme);
    setTitle('My World');

    const worldData = getWorldData();
    const now = new Date().toISOString();
    saveWorld(worldId, {
      id: worldId,
      userId,
      ...worldData,
      createdAt: now,
      updatedAt: now,
    });

    router.push(`/builder/${worldId}`);
  }

  const canAdvance = name.trim().length > 0 && emoji !== '';

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(160deg, #fefce8 0%, #f5f3ff 50%, #e0f2fe 100%)' }}
    >
      {/* Progress dots */}
      <div className="flex gap-2 mb-10" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={2} aria-label={`Step ${step + 1} of 2`}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-primary-600' : i < step ? 'w-2.5 bg-primary-300' : 'w-2.5 bg-primary-200'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-lg overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={prefersReducedMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-8"
            >
              <div className="text-center">
                <div className="text-5xl mb-3" aria-hidden="true">👋</div>
                <h1 className="text-3xl sm:text-4xl font-black text-primary-800 mb-2">
                  What should we call you?
                </h1>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                maxLength={20}
                aria-label="Your display name"
                className="w-full rounded-2xl border-2 border-primary-200 bg-white/80 px-6 py-4 text-2xl font-bold text-primary-800 placeholder:text-primary-300 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all"
              />

              <div className="w-full">
                <p className="text-center text-lg font-bold text-primary-700 mb-4">
                  Pick your look!
                </p>
                <div
                  role="radiogroup"
                  aria-label="Choose an avatar emoji"
                  className="grid grid-cols-6 gap-3"
                >
                  {EMOJI_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      role="radio"
                      aria-checked={emoji === e}
                      onClick={() => setEmoji(e)}
                      className={`h-14 w-14 rounded-full text-2xl flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2 cursor-pointer ${
                        emoji === e
                          ? 'ring-4 ring-primary-600 ring-offset-2 bg-primary-50 scale-110'
                          : 'bg-white/80 hover:bg-primary-50 hover:scale-105'
                      }`}
                      aria-label={`Choose ${e} as your avatar`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                variant="primary"
                className="w-full"
                disabled={!canAdvance}
                onClick={goToStep2}
                aria-label="Continue to choose your world theme"
              >
                Next
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={prefersReducedMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <div className="text-5xl mb-3" aria-hidden="true">🌍</div>
                <h1 className="text-3xl sm:text-4xl font-black text-primary-800 mb-2">
                  What do you want to build today?
                </h1>
              </div>

              <div
                role="radiogroup"
                aria-label="Choose a world theme"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
              >
                {THEME_OPTIONS.map(({ theme, emoji: themeEmoji, title, desc, borderColor, bgColor }) => (
                  <Card
                    key={theme}
                    variant="interactive"
                    role="radio"
                    aria-checked={selectedTheme === theme}
                    onClick={() => handleThemeSelect(theme)}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleThemeSelect(theme); }}
                    className={`border-2 p-5 cursor-pointer transition-all duration-150 ${borderColor} ${bgColor} ${
                      selectedTheme === theme ? 'ring-4 ring-primary-400 ring-offset-2' : ''
                    }`}
                    aria-label={`Choose ${title} theme`}
                  >
                    <div className="text-4xl mb-2" aria-hidden="true">{themeEmoji}</div>
                    <p className="font-black text-lg text-primary-800">{title}</p>
                    <p className="text-sm text-primary-600/80 mt-1">{desc}</p>
                  </Card>
                ))}
              </div>

              <button
                type="button"
                onClick={() => { setDirection(-1); setStep(0); }}
                className="text-primary-500 text-sm underline underline-offset-4 hover:text-primary-700 transition-colors"
              >
                Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
