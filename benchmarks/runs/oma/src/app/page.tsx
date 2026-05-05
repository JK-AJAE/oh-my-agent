'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user-store';

const FLOATING_SHAPES = [
  { id: 1, shape: 'circle', size: 80, x: '8%', y: '15%', color: '#c4b5fd', delay: 0 },
  { id: 2, shape: 'star', size: 40, x: '85%', y: '20%', color: '#fbbf24', delay: 0.4 },
  { id: 3, shape: 'circle', size: 50, x: '75%', y: '65%', color: '#86efac', delay: 0.8 },
  { id: 4, shape: 'star', size: 60, x: '12%', y: '70%', color: '#fb923c', delay: 0.2 },
  { id: 5, shape: 'circle', size: 35, x: '50%', y: '10%', color: '#7dd3fc', delay: 0.6 },
  { id: 6, shape: 'star', size: 28, x: '92%', y: '50%', color: '#f9a8d4', delay: 1.0 },
];

function FloatingShape({
  shape,
  size,
  x,
  y,
  color,
  delay,
  reducedMotion,
}: (typeof FLOATING_SHAPES)[0] & { reducedMotion: boolean }) {
  if (shape === 'star') {
    return (
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', left: x, top: y, width: size, height: size }}
        animate={reducedMotion ? {} : { y: [0, -14, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </motion.div>
    );
  }
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0.6,
      }}
      animate={reducedMotion ? {} : { y: [0, -18, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function LandingPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { isLoggedIn, loadUser } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadUser();
    setMounted(true);
  }, [loadUser]);

  return (
    <main
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #fefce8 0%, #f5f3ff 50%, #e0f2fe 100%)' }}
    >
      {/* Decorative floating shapes */}
      {FLOATING_SHAPES.map((s) => (
        <FloatingShape key={s.id} {...s} reducedMotion={prefersReducedMotion} />
      ))}

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2 mb-4" aria-hidden="true">
          <span className="text-5xl">🌍</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-primary-800 leading-tight tracking-tight mb-3">
          Build Your Own{' '}
          <span className="relative inline-block">
            World
            <span
              aria-hidden="true"
              className="absolute -top-2 -right-5 text-2xl animate-spin"
              style={{ animationDuration: '6s' }}
            >
              ✨
            </span>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-primary-700/80 leading-relaxed mb-10 max-w-md">
          Create magical 3D places, bring your ideas to life, and let your imagination soar!
        </p>

        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          <Button
            size="lg"
            variant="primary"
            className="w-full text-xl py-4 rounded-2xl shadow-lg shadow-primary-200"
            onClick={() => router.push('/onboarding')}
            aria-label="Start creating your world"
          >
            Start Creating
          </Button>

          {mounted && isLoggedIn && (
            <motion.button
              className="text-primary-600 font-semibold underline underline-offset-4 hover:text-primary-800 transition-colors text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => router.push('/dashboard')}
              aria-label="Continue building your worlds"
            >
              Continue Building
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-sm text-primary-400 z-10">
        A creative learning playground
      </footer>
    </main>
  );
}
