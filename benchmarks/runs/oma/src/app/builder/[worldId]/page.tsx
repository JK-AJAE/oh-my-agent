'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Box,
  SlidersHorizontal,
  Sparkles,
  Play,
  Grid3X3,
  Save,
  Home,
  X,
  Pencil,
  Check,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from 'motion/react';
import { Toolbar, ToolbarButton } from '@/components/ui/toolbar';
import { Panel } from '@/components/ui/panel';
import { ObjectLibrary } from '@/components/builder/object-library';
import { PropertiesPanel } from './properties-panel';
import { useWorldStore } from '@/stores/world-store';
import { useUIStore } from '@/stores/ui-store';
import { useUserStore } from '@/stores/user-store';
import { saveWorld, loadWorld } from '@/lib/storage';

// Heavy 3D component — load client-side only
const WorldCanvas = dynamic(
  () => import('@/components/three/world-canvas').then((m) => ({ default: m.WorldCanvas })),
  { ssr: false },
);

const AICompanion = dynamic(
  () => import('@/components/ai/ai-companion').then((m) => ({ default: m.AICompanion })),
  { ssr: false },
);

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams<{ worldId: string }>();
  const worldId = params.worldId;

  const { loadWorld: loadWorldState, getWorldData, title, setTitle, selectedObjectId } = useWorldStore();
  const { activePanel, setActivePanel, isPlayMode, togglePlayMode, showGrid, toggleGrid } = useUIStore();
  const { user, loadUser } = useUserStore();

  const [showAI, setShowAI] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');
  const [mounted, setMounted] = useState(false);

  // Load user and world on mount
  useEffect(() => {
    loadUser();
    setMounted(true);

    if (worldId !== 'new') {
      const saved = loadWorld(worldId);
      if (saved) {
        loadWorldState(saved);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldId]);

  function handleSave() {
    setIsSaving(true);
    const worldData = getWorldData();
    const existing = loadWorld(worldId);
    const now = new Date().toISOString();

    saveWorld(worldId, {
      id: worldId,
      userId: user?.id ?? 'anonymous',
      ...worldData,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });

    setTimeout(() => setIsSaving(false), 800);
  }

  function handleTitleEdit() {
    setTitleDraft(title);
    setEditingTitle(true);
  }

  function handleTitleCommit() {
    const trimmed = titleDraft.trim();
    if (trimmed) setTitle(trimmed);
    setEditingTitle(false);
  }

  const handlePanelToggle = useCallback(
    (panel: 'objects' | 'properties') => {
      setActivePanel(activePanel === panel ? null : panel);
    },
    [activePanel, setActivePanel],
  );

  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black" role="main" aria-label="WorldCraft builder">
      {/* Full-screen 3D canvas */}
      <div className="absolute inset-0">
        <WorldCanvas />
      </div>

      {/* Play mode overlay */}
      <AnimatePresence>
        {isPlayMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            <button
              type="button"
              onClick={togglePlayMode}
              className="pointer-events-auto absolute top-4 left-4 flex items-center gap-2 bg-black/60 text-white px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label="Exit play mode"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Exit Play
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar — title */}
      {!isPlayMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {editingTitle ? (
            <div className="flex items-center gap-1.5">
              <input
                autoFocus
                type="text"
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTitleCommit(); if (e.key === 'Escape') setEditingTitle(false); }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-1.5 text-sm font-bold text-primary-800 border-2 border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 max-w-48"
                aria-label="Edit world title"
                maxLength={40}
              />
              <button
                type="button"
                onClick={handleTitleCommit}
                className="bg-white/90 rounded-xl p-1.5 text-primary-700 hover:text-primary-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 cursor-pointer"
                aria-label="Save title"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleTitleEdit}
              className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm font-bold text-primary-800 hover:bg-white transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 cursor-pointer"
              aria-label={`Edit title: ${title}`}
            >
              {title}
              <Pencil className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* Left panels */}
      {!isPlayMode && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          <AnimatePresence>
            {activePanel === 'objects' && (
              <Panel
                key="objects-panel"
                title="Add Objects"
                isOpen={activePanel === 'objects'}
                onClose={() => setActivePanel(null)}
                position="left"
              >
                <ObjectLibrary />
              </Panel>
            )}

            {activePanel === 'properties' && selectedObjectId && (
              <Panel
                key="properties-panel"
                title="Properties"
                isOpen={activePanel === 'properties' && !!selectedObjectId}
                onClose={() => setActivePanel(null)}
                position="left"
              >
                <PropertiesPanel />
              </Panel>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* AI Companion — right side */}
      {!isPlayMode && showAI && <AICompanion defaultOpen={true} />}

      {/* Save feedback */}
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 z-30 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg"
            aria-live="polite"
            role="status"
          >
            Saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom toolbar */}
      {!isPlayMode && (
        <Toolbar position="bottom" aria-label="Builder tools">
          <ToolbarButton
            icon={<Box className="h-5 w-5" />}
            label="Objects"
            tooltip="Add objects"
            isActive={activePanel === 'objects'}
            onClick={() => handlePanelToggle('objects')}
          />
          <ToolbarButton
            icon={<SlidersHorizontal className="h-5 w-5" />}
            label="Edit"
            tooltip="Object properties"
            isActive={activePanel === 'properties'}
            disabled={!selectedObjectId}
            onClick={() => handlePanelToggle('properties')}
          />
          <ToolbarButton
            icon={<Sparkles className="h-5 w-5" />}
            label="Spark"
            tooltip="AI companion"
            isActive={showAI}
            onClick={() => setShowAI((v) => !v)}
          />

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 mx-1" aria-hidden="true" />

          <ToolbarButton
            icon={<Play className="h-5 w-5" />}
            label="Play"
            tooltip="Enter play mode"
            onClick={togglePlayMode}
          />
          <ToolbarButton
            icon={<Grid3X3 className="h-5 w-5" />}
            label="Grid"
            tooltip="Toggle grid"
            isActive={showGrid}
            onClick={toggleGrid}
          />
          <ToolbarButton
            icon={<Save className="h-5 w-5" />}
            label="Save"
            tooltip="Save world"
            onClick={handleSave}
          />
          <ToolbarButton
            icon={<Home className="h-5 w-5" />}
            label="Home"
            tooltip="Go to dashboard"
            onClick={() => router.push('/dashboard')}
          />
        </Toolbar>
      )}
    </div>
  );
}
