'use client';

import { useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useWorldStore } from '@/stores/world-store';
import { useUIStore } from '@/stores/ui-store';
import { WorldScene } from '@/components/three/world-scene';
import type { EnvironmentTheme } from '@/types/world';

const CANVAS_BACKGROUNDS: Record<EnvironmentTheme, string> = {
  meadow: '#87ceeb',
  ocean: '#0d3b6e',
  space: '#050a1a',
  forest: '#1b3a2a',
  desert: '#d4a96a',
  arctic: '#e8f4f8',
  city: '#6b7f95',
  candy: '#ffb6c1',
};

export function WorldCanvas() {
  const selectObject = useWorldStore((s) => s.selectObject);
  const environmentTheme = useWorldStore((s) => s.environmentTheme);
  const showGrid = useUIStore((s) => s.showGrid);

  const handleMissed = useCallback(() => {
    selectObject(null);
  }, [selectObject]);

  const backgroundColor = CANVAS_BACKGROUNDS[environmentTheme];

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: [0, 8, 12], fov: 60, near: 0.1, far: 500 }}
      style={{ background: backgroundColor }}
      onPointerMissed={handleMissed}
    >
      <WorldScene />

      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 - 0.05}
        enableDamping
        dampingFactor={0.08}
      />

      {showGrid && (
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#aaaaaa"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#888888"
          fadeDistance={40}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
          position={[0, 0.01, 0]}
        />
      )}
    </Canvas>
  );
}
