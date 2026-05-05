'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GalleryProject {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  likes: number;
  environment: string;
}

const SAMPLE_PROJECTS: GalleryProject[] = [
  { id: '1', title: 'Enchanted Forest',   creator: 'Luna', avatar: '🦊', likes: 12, environment: 'forest'  },
  { id: '2', title: 'Space Station Alpha', creator: 'Max',  avatar: '🐼', likes: 8,  environment: 'space'   },
  { id: '3', title: 'Underwater Kingdom', creator: 'Kai',  avatar: '🐙', likes: 15, environment: 'ocean'   },
  { id: '4', title: 'Crystal Mountain',   creator: 'Zara', avatar: '🦄', likes: 20, environment: 'fantasy' },
  { id: '5', title: 'Desert Oasis',       creator: 'Leo',  avatar: '🌟', likes: 6,  environment: 'desert'  },
  { id: '6', title: 'Snow Village',       creator: 'Mia',  avatar: '🐱', likes: 11, environment: 'snow'    },
];

const ENV_GRADIENT: Record<string, string> = {
  forest:  'from-green-200 to-green-400',
  space:   'from-indigo-300 to-purple-500',
  ocean:   'from-blue-200 to-cyan-400',
  fantasy: 'from-purple-200 to-pink-400',
  desert:  'from-yellow-200 to-orange-400',
  snow:    'from-blue-100 to-sky-100',
  city:    'from-gray-200 to-gray-400',
};

const ENV_EMOJI: Record<string, string> = {
  forest:  '🌲',
  space:   '🚀',
  ocean:   '🌊',
  fantasy: '🦄',
  desert:  '🏜️',
  snow:    '❄️',
  city:    '🏙️',
};

export default function GalleryPage() {
  const [projects] = useState<GalleryProject[]>(SAMPLE_PROJECTS);

  return (
    <div className="min-h-screen bg-gradient-to-b from-spark-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link
            href="/"
            className="text-xl font-extrabold text-spark-500 hover:opacity-80 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300 rounded"
            aria-label="Worldcraft home"
          >
            Worldcraft <span aria-hidden="true">✨</span>
          </Link>
          <nav aria-label="Main navigation" className="ml-6 flex gap-4">
            <Link
              href="/gallery"
              className="text-sm font-bold text-spark-500 border-b-2 border-spark-400 pb-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300 rounded"
              aria-current="page"
            >
              Gallery
            </Link>
          </nav>
          <div className="flex-1" />
          <Link
            href="/builder/new"
            className="px-4 py-2 bg-spark-400 text-white rounded-xl font-bold text-sm hover:bg-spark-500 hover:scale-105 transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
          >
            + Create World
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-center mb-2">
          World Gallery <span aria-hidden="true">🌍</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Explore worlds created by other young builders!
        </p>

        {/* Project grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          aria-label="Gallery of worlds"
        >
          {projects.map((project) => {
            const gradient = ENV_GRADIENT[project.environment] ?? 'from-gray-200 to-gray-300';
            const emoji = ENV_EMOJI[project.environment] ?? '🌐';
            return (
              <li key={project.id}>
                <Link
                  href={`/play/${project.id}`}
                  className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
                  aria-label={`${project.title} by ${project.creator} — ${project.likes} likes`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                      {emoji}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <h2 className="font-bold text-lg text-gray-900 truncate">
                      {project.title}
                    </h2>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" aria-hidden="true">{project.avatar}</span>
                        <span className="text-sm text-gray-500">{project.creator}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        <span aria-hidden="true">❤️</span>{' '}
                        <span aria-label={`${project.likes} likes`}>{project.likes}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
