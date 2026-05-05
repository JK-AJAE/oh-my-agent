'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Plus, Trash2, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmojiAvatar } from '@/components/ui/emoji-avatar';
import { useUserStore } from '@/stores/user-store';
import { listWorlds, deleteWorld } from '@/lib/storage';
import type { World } from '@/types/world';

const THEME_COLORS: Record<string, string> = {
  meadow: 'bg-green-200',
  ocean: 'bg-blue-300',
  space: 'bg-violet-800',
  forest: 'bg-emerald-700',
  desert: 'bg-amber-300',
  arctic: 'bg-sky-100',
  city: 'bg-slate-400',
  candy: 'bg-pink-300',
};

const THEME_EMOJI: Record<string, string> = {
  meadow: '🌿',
  ocean: '🌊',
  space: '🚀',
  forest: '🌲',
  desert: '🏜️',
  arctic: '❄️',
  city: '🏙️',
  candy: '🍭',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, loadUser, logout } = useUserStore();
  const [worlds, setWorlds] = useState<World[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadUser();
    setMounted(true);
  }, [loadUser]);

  useEffect(() => {
    if (mounted) {
      setWorlds(listWorlds());
    }
  }, [mounted]);

  function handleDelete(worldId: string, e: React.MouseEvent) {
    e.stopPropagation();
    deleteWorld(worldId);
    setWorlds((prev) => prev.filter((w) => w.id !== worldId));
  }

  function handleLogout() {
    logout();
    router.push('/');
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-surface-cream to-primary-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {user && (
              <EmojiAvatar emoji={user.avatarEmoji} size="md" bgColor="bg-primary-100" />
            )}
            <div>
              <h1 className="text-3xl font-black text-primary-800">
                {user ? `Hi, ${user.displayName}!` : 'My Worlds'}
              </h1>
              <p className="text-primary-500 text-sm">Your creative universe</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              icon={<Images className="h-4 w-4" />}
              onClick={() => router.push('/gallery')}
              aria-label="View community gallery"
            >
              Gallery
            </Button>
            {isLoggedIn && (
              <Button variant="secondary" size="sm" onClick={handleLogout} aria-label="Log out">
                Log out
              </Button>
            )}
          </div>
        </header>

        {/* Worlds grid */}
        <section aria-label="My worlds">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Create new world card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Card
                variant="interactive"
                className="border-2 border-dashed border-primary-300 bg-white/60 h-48 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
                onClick={() => router.push('/onboarding')}
                aria-label="Create a new world"
              >
                <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center">
                  <Plus className="h-7 w-7 text-primary-600" aria-hidden="true" />
                </div>
                <p className="font-black text-primary-700 text-lg">Create New World</p>
              </Card>
            </motion.div>

            {/* World cards */}
            {worlds.map((world) => (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card
                  variant="interactive"
                  className="h-48 flex flex-col gap-0 p-0 overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/builder/${world.id}`)}
                  aria-label={`Open world: ${world.title}`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`h-24 flex items-center justify-center text-4xl ${THEME_COLORS[world.environmentTheme] ?? 'bg-gray-200'}`}
                    aria-hidden="true"
                  >
                    {THEME_EMOJI[world.environmentTheme] ?? '🌍'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <div>
                      <p className="font-black text-primary-800 truncate">{world.title}</p>
                      <p className="text-xs text-primary-400 mt-0.5">
                        {formatDate(world.updatedAt)} &bull; {world.objects.length} objects
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={(e) => handleDelete(world.id, e)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        aria-label={`Delete world: ${world.title}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {worlds.length === 0 && (
            <div className="col-span-full mt-8 flex flex-col items-center justify-center gap-5 py-16 text-center">
              <div className="text-6xl" aria-hidden="true">🏗️</div>
              <p className="text-xl font-bold text-primary-700">
                You haven&apos;t built any worlds yet!
              </p>
              <p className="text-primary-500">Let&apos;s start your first creation.</p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/onboarding')}
              >
                Start Building
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
