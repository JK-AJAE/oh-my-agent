'use client';

import { memo } from 'react';
import { useWorldStore } from '@/stores/world-store';
import { SceneObject } from '@/components/three/scene-object';
import { GroundPlane } from '@/components/three/ground-plane';
import { EnvironmentSetup } from '@/components/three/environment-setup';

export const WorldScene = memo(function WorldScene() {
  const objects = useWorldStore((s) => s.objects);
  const selectedObjectId = useWorldStore((s) => s.selectedObjectId);
  const environmentTheme = useWorldStore((s) => s.environmentTheme);
  const addObject = useWorldStore((s) => s.addObject);

  return (
    <>
      <EnvironmentSetup theme={environmentTheme} />

      <GroundPlane
        theme={environmentTheme}
        onPlaceObject={(position) => addObject('cube', position)}
      />

      {objects.map((obj) => (
        <SceneObject
          key={obj.id}
          worldObject={obj}
          isSelected={obj.id === selectedObjectId}
        />
      ))}
    </>
  );
});
