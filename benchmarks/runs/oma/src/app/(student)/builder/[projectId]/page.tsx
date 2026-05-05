'use client';

import Canvas3D from '@/components/builder/Canvas3D';
import { ObjectLibrary } from '@/components/builder/ObjectLibrary';
import { ToolBar } from '@/components/builder/ToolBar';
import { SparkPanel } from '@/components/ai/SparkPanel';
import { useUIStore } from '@/stores/uiStore';
import { useWorldStore } from '@/stores/worldStore';

export default function BuilderPage() {
  const { activePanel, isPlaying, setPlaying, togglePanel } = useUIStore();
  const { undo, redo } = useWorldStore();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Top Bar */}
      <header className="h-14 bg-white border-b flex items-center px-4 gap-3 shrink-0">
        <h1 className="text-xl font-bold text-spark-500">Worldcraft ✨</h1>
        <input
          type="text"
          defaultValue="My Amazing World"
          aria-label="Project name"
          className="ml-4 px-3 py-1 rounded-lg border text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-spark-300"
        />
        <div className="flex-1" />
        <button
          onClick={undo}
          className="p-2 rounded-lg hover:bg-gray-100 text-xl"
          title="Undo"
          aria-label="Undo"
        >
          ↩️
        </button>
        <button
          onClick={redo}
          className="p-2 rounded-lg hover:bg-gray-100 text-xl"
          title="Redo"
          aria-label="Redo"
        >
          ↪️
        </button>
        <button
          onClick={() => setPlaying(!isPlaying)}
          aria-pressed={isPlaying}
          className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
            isPlaying ? 'bg-sunset-500 text-white' : 'bg-forest-400 text-white'
          }`}
        >
          {isPlaying ? '✏️ Edit' : '▶️ Play'}
        </button>
        <button className="px-4 py-2 bg-ocean-400 text-white rounded-xl font-bold text-sm">
          💾 Save
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel */}
        {activePanel === 'objects' && !isPlaying && (
          <aside
            className="w-72 bg-white border-r overflow-y-auto shrink-0"
            aria-label="Object library"
          >
            <ObjectLibrary />
          </aside>
        )}

        {/* 3D Canvas */}
        <main className="flex-1 relative">
          <Canvas3D />
          {!isPlaying && <ToolBar />}
        </main>

        {/* Right Panel - Spark AI */}
        {activePanel === 'spark' && (
          <aside
            className="w-80 bg-white border-l overflow-y-auto shrink-0"
            aria-label="Spark AI assistant"
          >
            <SparkPanel />
          </aside>
        )}
      </div>

      {/* Panel Toggle Buttons - floating on the sides */}
      {!isPlaying && (
        <>
          <button
            onClick={() => togglePanel('objects')}
            aria-expanded={activePanel === 'objects'}
            aria-label="Toggle objects panel"
            className="fixed left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-lg hover:scale-110 transition z-10"
            title="Objects"
          >
            📦
          </button>
          <button
            onClick={() => togglePanel('spark')}
            aria-expanded={activePanel === 'spark'}
            aria-label="Toggle Spark AI panel"
            className="fixed right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-lg hover:scale-110 transition z-10"
            title="Spark AI"
          >
            ✨
          </button>
        </>
      )}
    </div>
  );
}
