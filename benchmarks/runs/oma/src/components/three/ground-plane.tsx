'use client';

import type { ThreeEvent } from '@react-three/fiber';
import type { EnvironmentTheme } from '@/types/world';

const GROUND_COLORS: Record<EnvironmentTheme, string> = {
  meadow: '#4caf50',
  ocean: '#0288d1',
  space: '#0d0d1a',
  forest: '#2e7d32',
  desert: '#d4a44c',
  arctic: '#eceff1',
  city: '#607d8b',
  candy: '#f48fb1',
};

interface GroundPlaneProps {
  theme: EnvironmentTheme;
  onPlaceObject?: (position: [number, number, number]) => void;
}

export function GroundPlane({ theme, onPlaceObject }: GroundPlaneProps) {
  const color = GROUND_COLORS[theme];

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    if (!onPlaceObject) return;
    const point = event.point;
    onPlaceObject([point.x, 0.5, point.z]);
  }

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      onClick={handleClick}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}
