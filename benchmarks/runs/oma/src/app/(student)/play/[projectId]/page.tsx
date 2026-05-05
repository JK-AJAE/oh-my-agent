'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { useWorldStore } from '@/stores/worldStore';
import SceneObject from '@/components/builder/SceneObject';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ENVIRONMENT_SKY_PRESETS: Record<
  string,
  { turbidity: number; rayleigh: number; sunPosition: [number, number, number] }
> = {
  forest:  { turbidity: 8,  rayleigh: 2,   sunPosition: [5,   2,   1] },
  ocean:   { turbidity: 6,  rayleigh: 3,   sunPosition: [3,   3,   0] },
  space:   { turbidity: 0,  rayleigh: 0,   sunPosition: [0,  -1,   0] },
  city:    { turbidity: 10, rayleigh: 1,   sunPosition: [4,   1,   2] },
  fantasy: { turbidity: 5,  rayleigh: 4,   sunPosition: [2,   3,   1] },
  desert:  { turbidity: 15, rayleigh: 1.5, sunPosition: [6,   1.5, 0] },
  snow:    { turbidity: 4,  rayleigh: 0.5, sunPosition: [3,   4,   1] },
};

export default function PlayPage() {
  const params = useParams();
  const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;

  const objects = useWorldStore((s) => s.objects);
  const environment = useWorldStore((s) => s.environment);
  const skyColor = useWorldStore((s) => s.skyColor);
  const groundColor = useWorldStore((s) => s.groundColor);

  const [clickedObjectId, setClickedObjectId] = useState<string | null>(null);
  const clickedObj = objects.find((o) => o.id === clickedObjectId);

  const isSpaceTheme = environment === 'space';
  const skyPreset = ENVIRONMENT_SKY_PRESETS[environment] ?? ENVIRONMENT_SKY_PRESETS.forest;

  const handleObjectClick = (id: string) => {
    setClickedObjectId(id);
  };

  const handleDismiss = () => {
    setClickedObjectId(null);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true }}
        aria-label="3D world exploration view"
      >
        {/* Lighting — more dramatic than builder for immersion */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-8, 6, -4]} intensity={0.5} color="#ffe0a0" />

        {/* Sky / Background */}
        {isSpaceTheme ? (
          <>
            <color attach="background" args={['#0d0d1e']} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
          </>
        ) : (
          <Sky
            distance={450000}
            sunPosition={skyPreset.sunPosition}
            turbidity={skyPreset.turbidity}
            rayleigh={skyPreset.rayleigh}
          />
        )}

        {/* Atmospheric fog for depth */}
        <fog attach="fog" args={[skyColor, 35, 90]} />

        {/* Ground plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={groundColor} roughness={0.9} />
        </mesh>

        {/* Scene objects — non-interactive (no transform controls) */}
        {objects.map((obj) => (
          <group key={obj.id} name={obj.id}>
            <SceneObject
              object={obj}
              isSelected={false}
              onClick={handleObjectClick}
            />
          </group>
        ))}

        {/* Camera controls — generous limits for child-friendly exploration */}
        <OrbitControls
          maxPolarAngle={Math.PI / 2.1}
          minDistance={2}
          maxDistance={50}
          enableDamping
          dampingFactor={0.05}
          enablePan
          panSpeed={0.8}
        />
      </Canvas>

      {/* HUD — Back to Edit */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href={`/builder/${projectId}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-xl font-bold text-sm shadow-lg hover:scale-105 hover:bg-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-spark-300"
          aria-label="Back to edit mode"
        >
          <span aria-hidden="true">✏️</span> Back to Edit
        </Link>
      </div>

      {/* HUD — Object count */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className="px-4 py-2 bg-white/90 backdrop-blur rounded-xl text-sm font-semibold shadow-lg"
          aria-live="polite"
          aria-label={`${objects.length} objects in this world`}
        >
          <span aria-hidden="true">🏗️</span>{' '}
          <span>{objects.length} {objects.length === 1 ? 'object' : 'objects'}</span>
        </div>
      </div>

      {/* Object click popup */}
      {clickedObj && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-6 py-4 bg-white/95 backdrop-blur rounded-2xl shadow-xl text-center max-w-xs w-[90vw]"
        >
          <p className="font-extrabold text-lg text-gray-900">
            <span aria-hidden="true">✨</span> You built a {clickedObj.type}!
          </p>
          <p className="text-gray-500 text-sm mt-1">It looks amazing! <span aria-hidden="true">🌟</span></p>
          <button
            onClick={handleDismiss}
            className="mt-3 text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-300 rounded"
            aria-label="Dismiss object info popup"
          >
            dismiss
          </button>
        </div>
      )}

      {/* Explore instructions */}
      <div
        className="absolute bottom-4 left-4 z-10 px-3 py-2 bg-black/40 backdrop-blur rounded-lg text-white text-xs font-medium"
        aria-label="Navigation hint"
      >
        <span aria-hidden="true">🖱️</span> Drag to look around &bull; Scroll to zoom &bull; Click objects to interact
      </div>
    </div>
  );
}
