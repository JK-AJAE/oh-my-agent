'use client';

import { useRef, useCallback } from 'react';
import { TransformControls } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { WorldObject } from '@/types/world';
import { useWorldStore } from '@/stores/world-store';

interface SceneObjectProps {
  worldObject: WorldObject;
  isSelected: boolean;
}

function BasicShape({ type, color }: { type: WorldObject['type']; color: string }) {
  const material = <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />;

  switch (type) {
    case 'cube':
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          {material}
        </mesh>
      );
    case 'sphere':
      return (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          {material}
        </mesh>
      );
    case 'cylinder':
      return (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
          {material}
        </mesh>
      );
    case 'cone':
      return (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[0.6, 1.2, 32]} />
          {material}
        </mesh>
      );
    default:
      return null;
  }
}

function TreeShape({ color }: { color: string }) {
  return (
    <group>
      {/* trunk */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 12]} />
        <meshStandardMaterial color="#795548" roughness={0.9} />
      </mesh>
      {/* canopy */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.8, 1.6, 12]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function HouseShape({ color }: { color: string }) {
  return (
    <group>
      {/* walls */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* roof */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.95, 0.7, 4]} />
        <meshStandardMaterial color="#b71c1c" roughness={0.8} />
      </mesh>
    </group>
  );
}

function CharacterShape({ color }: { color: string }) {
  return (
    <group>
      {/* body */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#ffcc80" roughness={0.5} />
      </mesh>
    </group>
  );
}

function AnimalShape({ color }: { color: string }) {
  return (
    <group>
      {/* body — horizontal ellipsoid approximated with scaled sphere */}
      <mesh position={[0, 0.4, 0]} scale={[1.2, 0.6, 0.7]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* head */}
      <mesh position={[0.65, 0.6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.28, 20, 20]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    </group>
  );
}

function RockShape({ color }: { color: string }) {
  return (
    <mesh castShadow receiveShadow>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

function FlowerShape({ color }: { color: string }) {
  return (
    <group>
      {/* stem */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#388e3c" roughness={0.8} />
      </mesh>
      {/* petals — torus as petal ring */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.22, 0.1, 8, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* center */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ffd54f" roughness={0.4} />
      </mesh>
    </group>
  );
}

function CloudShape() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.5, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#f5f5f5" roughness={1} transparent opacity={0.85} />
      </mesh>
      <mesh position={[-0.5, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#f5f5f5" roughness={1} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function StarShape({ color }: { color: string }) {
  // Custom star shape using a lathe geometry from star-profile points
  // Build star outline as a flat extruded shape
  const starShape = new THREE.Shape();
  const outerR = 0.55;
  const innerR = 0.25;
  const points = 5;
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  return (
    <mesh castShadow receiveShadow>
      <extrudeGeometry
        args={[
          starShape,
          { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2 },
        ]}
      />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

function ObjectShape({ worldObject }: { worldObject: WorldObject }) {
  const { type, color } = worldObject;

  switch (type) {
    case 'cube':
    case 'sphere':
    case 'cylinder':
    case 'cone':
      return <BasicShape type={type} color={color} />;
    case 'tree':
      return <TreeShape color={color} />;
    case 'house':
      return <HouseShape color={color} />;
    case 'character':
      return <CharacterShape color={color} />;
    case 'animal':
      return <AnimalShape color={color} />;
    case 'rock':
      return <RockShape color={color} />;
    case 'flower':
      return <FlowerShape color={color} />;
    case 'cloud':
      return <CloudShape />;
    case 'star':
      return <StarShape color={color} />;
    default:
      return (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
  }
}

export function SceneObject({ worldObject, isSelected }: SceneObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const selectObject = useWorldStore((s) => s.selectObject);
  const updateObject = useWorldStore((s) => s.updateObject);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      selectObject(worldObject.id);
    },
    [worldObject.id, selectObject],
  );

  function handleTransformChange() {
    if (!groupRef.current) return;
    const pos = groupRef.current.position;
    const rot = groupRef.current.rotation;
    const scl = groupRef.current.scale;
    updateObject(worldObject.id, {
      position: [pos.x, pos.y, pos.z],
      rotation: [rot.x, rot.y, rot.z],
      scale: [scl.x, scl.y, scl.z],
    });
  }

  return (
    <>
      <group
        ref={groupRef}
        position={worldObject.position}
        rotation={worldObject.rotation}
        scale={worldObject.scale}
        onClick={handleClick}
      >
        <ObjectShape worldObject={worldObject} />

        {isSelected && (
          <mesh>
            <boxGeometry args={[1.4, 1.4, 1.4]} />
            <meshBasicMaterial
              color="#7c3aed"
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>

      {isSelected && groupRef.current && (
        <TransformControls
          object={groupRef.current}
          onObjectChange={handleTransformChange}
        />
      )}
    </>
  );
}
