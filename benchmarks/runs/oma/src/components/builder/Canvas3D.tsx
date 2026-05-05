'use client';

import { useRef, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Sky, TransformControls } from '@react-three/drei';
import type { Mesh, Object3D } from 'three';
import { useWorldStore } from '@/stores/worldStore';
import { useUIStore } from '@/stores/uiStore';
import SceneObject from '@/components/builder/SceneObject';

const ENVIRONMENT_SKY_PRESETS: Record<string, { turbidity: number; rayleigh: number; sunPosition: [number, number, number] }> = {
  forest:  { turbidity: 8,  rayleigh: 2,   sunPosition: [5, 2, 1] },
  ocean:   { turbidity: 6,  rayleigh: 3,   sunPosition: [3, 3, 0] },
  space:   { turbidity: 0,  rayleigh: 0,   sunPosition: [0, -1, 0] },
  city:    { turbidity: 10, rayleigh: 1,   sunPosition: [4, 1, 2] },
  fantasy: { turbidity: 5,  rayleigh: 4,   sunPosition: [2, 3, 1] },
  desert:  { turbidity: 15, rayleigh: 1.5, sunPosition: [6, 1.5, 0] },
  snow:    { turbidity: 4,  rayleigh: 0.5, sunPosition: [3, 4, 1] },
};

function GroundPlane({ color, onPointerDown }: { color: string; onPointerDown: (e: { point: { x: number; z: number } }) => void }) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      onPointerDown={onPointerDown}
    >
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

interface SelectedObjectControllerProps {
  selectedId: string | null;
  mode: 'translate' | 'rotate' | 'scale';
  onObjectChange: (id: string, updates: { position?: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number] }) => void;
}

function SelectedObjectController({ selectedId, mode, onObjectChange }: SelectedObjectControllerProps) {
  const { scene } = useThree();

  if (!selectedId) return null;

  const obj = scene.getObjectByName(selectedId) as Object3D | undefined;
  if (!obj) return null;

  const handleChange = () => {
    if (!obj) return;
    onObjectChange(selectedId, {
      position: [obj.position.x, obj.position.y, obj.position.z],
      rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
      scale: [obj.scale.x, obj.scale.y, obj.scale.z],
    });
  };

  return (
    <TransformControls
      object={obj}
      mode={mode}
      size={0.8}
      onObjectChange={handleChange}
    />
  );
}

function Scene() {
  const objects = useWorldStore((s) => s.objects);
  const selectedObjectId = useWorldStore((s) => s.selectedObjectId);
  const environment = useWorldStore((s) => s.environment);
  const groundColor = useWorldStore((s) => s.groundColor);
  const selectObject = useWorldStore((s) => s.selectObject);
  const addObject = useWorldStore((s) => s.addObject);
  const updateObject = useWorldStore((s) => s.updateObject);
  const removeObject = useWorldStore((s) => s.removeObject);

  const activeTool = useUIStore((s) => s.activeTool);
  const showGrid = useUIStore((s) => s.showGrid);

  const skyPreset = ENVIRONMENT_SKY_PRESETS[environment] ?? ENVIRONMENT_SKY_PRESETS.forest;
  const isSpaceTheme = environment === 'space';

  const toolToMode: Record<string, 'translate' | 'rotate' | 'scale'> = {
    move: 'translate',
    rotate: 'rotate',
    scale: 'scale',
  };

  const handleGroundClick = useCallback(
    (e: { point: { x: number; z: number } }) => {
      if (activeTool === 'select' || activeTool === 'color') {
        selectObject(null);
      }
    },
    [activeTool, selectObject, addObject]
  );

  const handleObjectClick = useCallback(
    (id: string) => {
      if (activeTool === 'delete') {
        removeObject(id);
      } else {
        selectObject(id);
      }
    },
    [activeTool, selectObject, removeObject]
  );

  const handleObjectChange = useCallback(
    (id: string, updates: { position?: [number, number, number]; rotation?: [number, number, number]; scale?: [number, number, number] }) => {
      updateObject(id, updates);
    },
    [updateObject]
  );

  const activeMode = selectedObjectId ? toolToMode[activeTool] : undefined;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, 8, -5]} intensity={0.4} />

      {isSpaceTheme ? (
        <color attach="background" args={['#0d0d1e']} />
      ) : (
        <Sky
          distance={450000}
          sunPosition={skyPreset.sunPosition}
          turbidity={skyPreset.turbidity}
          rayleigh={skyPreset.rayleigh}
        />
      )}

      <GroundPlane color={groundColor} onPointerDown={handleGroundClick} />

      {showGrid && (
        <Grid
          position={[0, 0.005, 0]}
          args={[40, 40]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6e6e6e"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9d9d9d"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
        />
      )}

      {objects.map((obj) => (
        <group key={obj.id} name={obj.id}>
          <SceneObject
            object={obj}
            isSelected={selectedObjectId === obj.id}
            onClick={handleObjectClick}
          />
        </group>
      ))}

      {activeMode && selectedObjectId && (
        <SelectedObjectController
          selectedId={selectedObjectId}
          mode={activeMode}
          onObjectChange={handleObjectChange}
        />
      )}

      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2.2}
        minDistance={3}
        maxDistance={30}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Canvas3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [8, 8, 8], fov: 50 }}
        gl={{ antialias: true }}
        style={{ background: '#87CEEB' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
