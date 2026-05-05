'use client';

import { useRef } from 'react';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { EnvironmentTheme } from '@/types/world';

interface EnvironmentConfig {
  ambientIntensity: number;
  ambientColor: string;
  directionalColor: string;
  directionalIntensity: number;
  directionalPosition: [number, number, number];
  groundColor: string;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  environmentPreset?: 'park' | 'sunset' | 'forest' | 'city' | 'dawn' | 'night' | 'warehouse' | 'studio' | 'lobby';
  showStars?: boolean;
}

const ENVIRONMENT_CONFIGS: Record<EnvironmentTheme, EnvironmentConfig> = {
  meadow: {
    ambientIntensity: 0.6,
    ambientColor: '#d4e8ff',
    directionalColor: '#fffde7',
    directionalIntensity: 1.4,
    directionalPosition: [10, 20, 10],
    groundColor: '#4caf50',
    environmentPreset: 'park',
  },
  ocean: {
    ambientIntensity: 0.5,
    ambientColor: '#b3e0ff',
    directionalColor: '#ffe0a0',
    directionalIntensity: 1.2,
    directionalPosition: [15, 18, 8],
    groundColor: '#0288d1',
    environmentPreset: 'sunset',
  },
  space: {
    ambientIntensity: 0.15,
    ambientColor: '#1a237e',
    directionalColor: '#ffffff',
    directionalIntensity: 2.0,
    directionalPosition: [20, 30, -10],
    groundColor: '#000000',
    showStars: true,
  },
  forest: {
    ambientIntensity: 0.4,
    ambientColor: '#a5d6a7',
    directionalColor: '#c8e6c9',
    directionalIntensity: 0.9,
    directionalPosition: [5, 20, 5],
    groundColor: '#2e7d32',
    fogColor: '#1b5e20',
    fogNear: 20,
    fogFar: 60,
    environmentPreset: 'forest',
  },
  desert: {
    ambientIntensity: 0.7,
    ambientColor: '#fff8e1',
    directionalColor: '#ffeb3b',
    directionalIntensity: 2.0,
    directionalPosition: [10, 25, 5],
    groundColor: '#d4a44c',
    environmentPreset: 'sunset',
  },
  arctic: {
    ambientIntensity: 0.8,
    ambientColor: '#e3f2fd',
    directionalColor: '#b3e5fc',
    directionalIntensity: 1.1,
    directionalPosition: [-10, 20, 10],
    groundColor: '#eceff1',
    fogColor: '#e1f5fe',
    fogNear: 25,
    fogFar: 70,
  },
  city: {
    ambientIntensity: 0.5,
    ambientColor: '#cfd8dc',
    directionalColor: '#ffffff',
    directionalIntensity: 1.0,
    directionalPosition: [10, 20, 10],
    groundColor: '#607d8b',
    environmentPreset: 'city',
  },
  candy: {
    ambientIntensity: 0.7,
    ambientColor: '#fce4ec',
    directionalColor: '#f8bbd0',
    directionalIntensity: 1.3,
    directionalPosition: [8, 20, 8],
    groundColor: '#f48fb1',
  },
};

interface EnvironmentSetupProps {
  theme: EnvironmentTheme;
}

export function EnvironmentSetup({ theme }: EnvironmentSetupProps) {
  const config = ENVIRONMENT_CONFIGS[theme];

  return (
    <>
      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />
      <directionalLight
        color={config.directionalColor}
        intensity={config.directionalIntensity}
        position={config.directionalPosition}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {config.environmentPreset && (
        <Environment preset={config.environmentPreset} />
      )}

      {config.showStars && (
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      )}

      {config.fogColor && (
        <fog attach="fog" args={[config.fogColor, config.fogNear ?? 20, config.fogFar ?? 60]} />
      )}
    </>
  );
}
