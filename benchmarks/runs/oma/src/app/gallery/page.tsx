'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmojiAvatar } from '@/components/ui/emoji-avatar';
import { listWorlds } from '@/lib/storage';
import type { World } from '@/types/world';

const THEME_COLORS: Record<string, string> = {
  meadow: 'bg-green-200',
  ocean: 'bg-blue-200',
  space: 'bg-indigo-200',
  forest: 'bg-emerald-200',
  desert: 'bg-amber-200',
  arctic: 'bg-cyan-100',
  city: 'bg-slate-200',
  candy: 'bg-pink-200',
};

export default function GalleryPage() {
  const router = useRouter();
  const [worlds, setWorlds] = useState<World[]>([]);

  useEffect(() => {
    const all = listWorlds();
    setWorlds(all.filter((w) => w.isPublic));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-sky-50 p-6">
      <header className="mx-auto mb-8 flex max-w-5xl items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-purple-900">Gallery</h1>
        <p className="ml-auto text-sm text-gray-500">
          Explore worlds created by others
        </p>
      </header>

      <main className="mx-auto max-w-5xl">
        {worlds.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-6xl">🌍</p>
            <h2 className="mt-4 text-xl font-bold text-gray-700">
              No shared worlds yet
            </h2>
            <p className="mt-2 text-gray-500">
              Be the first to share your creation with the world!
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-6"
              onClick={() => router.push('/dashboard')}
            >
              Build Something
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {worlds.map((world, i) => (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  variant="interactive"
                  className="cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/play/${world.id}`)}
                >
                  <div
                    className={`h-32 ${THEME_COLORS[world.environmentTheme] ?? 'bg-gray-200'} flex items-center justify-center`}
                  >
                    <span className="text-4xl opacity-60">
                      {world.objects.length > 0 ? '🌎' : '🏗️'}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="truncate text-lg font-bold text-gray-800">
                      {world.title || 'Untitled World'}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <EmojiAvatar emoji="🌟" size="sm" />
                        <span className="text-sm text-gray-500">
                          {world.objects.length} objects
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <Eye className="h-4 w-4" />
                        <Heart className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
