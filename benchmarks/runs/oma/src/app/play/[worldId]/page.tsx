'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Plane } from '@react-three/drei';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadWorld } from '@/lib/storage';
import type { World, WorldObject, EnvironmentTheme } from '@/types/world';

function PlayObject({ object }: { object: WorldObject }) {
  const getGeometry = () => {
    switch (object.type) {
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  if (object.type === 'tree') {
    return (
      <group position={object.position} rotation={object.rotation} scale={object.scale}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow>
          <coneGeometry args={[0.6, 1.2, 8]} />
          <meshStandardMaterial color={object.color} />
        </mesh>
      </group>
    );
  }

  if (object.type === 'house') {
    return (
      <group position={object.position} rotation={object.rotation} scale={object.scale}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={object.color} />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <coneGeometry args={[0.75, 0.6, 4]} />
          <meshStandardMaterial color="#cc4444" />
        </mesh>
      </group>
    );
  }

  if (object.type === 'cloud') {
    return (
      <group position={object.position} rotation={object.rotation} scale={object.scale}>
        <mesh castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.35, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.85} />
        </mesh>
        <mesh position={[-0.3, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.85} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      castShadow
    >
      {getGeometry()}
      <meshStandardMaterial color={object.color} />
    </mesh>
  );
}

const THEME_BG: Record<EnvironmentTheme, string> = {
  meadow: '#87CEEB',
  ocean: '#1a4a7a',
  space: '#0a0a2a',
  forest: '#2d4a2d',
  desert: '#e8c872',
  arctic: '#e8f4f8',
  city: '#6b7b8a',
  candy: '#ffb6c1',
};

const GROUND_COLORS: Record<EnvironmentTheme, string> = {
  meadow: '#4ade80',
  ocean: '#1e6091',
  space: '#1a1a3a',
  forest: '#1b5e20',
  desert: '#d4a54a',
  arctic: '#e0f0f0',
  city: '#555555',
  candy: '#f9a8d4',
};

export default function PlayPage() {
  const params = useParams();
  const router = useRouter();
  const worldId = params.worldId as string;
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    const loaded = loadWorld(worldId);
    if (loaded) {
      setWorld(loaded);
    }
  }, [worldId]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push(`/builder/${worldId}`);
    }
  }, [router, worldId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!world) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <p className="text-4xl">🔍</p>
          <p className="mt-4 text-lg">World not found</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => router.push('/dashboard')}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const theme = world.environmentTheme;

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/80 backdrop-blur"
          onClick={() => router.push(`/builder/${worldId}`)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="rounded-xl bg-white/80 px-4 py-2 backdrop-blur">
          <h1 className="font-bold text-gray-800">
            {world.title || 'Untitled World'}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-600 backdrop-blur">
          <Info className="h-4 w-4" />
          <span>Drag to look around • Scroll to zoom • Press Esc to exit</span>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 65 }}
        style={{ background: THEME_BG[theme] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {theme === 'space' && <Stars radius={100} depth={50} count={2000} factor={4} />}

        <Plane
          args={[50, 50]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color={GROUND_COLORS[theme]} />
        </Plane>

        {world.objects.map((obj) => (
          <PlayObject key={obj.id} object={obj} />
        ))}

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          maxPolarAngle={Math.PI / 2.1}
          minDistance={2}
          maxDistance={30}
        />

        <Environment preset={theme === 'space' ? 'night' : 'sunset'} />
      </Canvas>
    </div>
  );
}
