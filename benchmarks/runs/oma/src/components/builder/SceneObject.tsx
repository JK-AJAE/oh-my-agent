'use client';

import { useRef } from 'react';
import { Outlines } from '@react-three/drei';
import type { Mesh } from 'three';
import type { WorldObject } from '@/types';

interface SceneObjectProps {
  object: WorldObject;
  isSelected: boolean;
  onClick: (id: string) => void;
}

function TreeGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Crown */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.6, 10, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function FlowerGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Stem */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      {/* Center */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.3,
            0.1,
            Math.sin((i / 5) * Math.PI * 2) * 0.3,
          ]}
        >
          <torusGeometry args={[0.1, 0.05, 6, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function HouseGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Walls */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.65, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.85, 0.5, 4]} />
        <meshStandardMaterial color="#C0392B" />
      </mesh>
      {/* Door */}
      <mesh position={[0, -0.2, 0.51]}>
        <boxGeometry args={[0.25, 0.4, 0.02]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function CharacterGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.25, 0.5, 6, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.25, 10, 10]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
    </group>
  );
}

function AnimalGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.25, 0.5, 6, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0.5, 0.15, 0]}>
        <sphereGeometry args={[0.2, 10, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Legs */}
      {[-0.2, 0.2].map((x) =>
        [-0.2, 0.2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.35, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 6]} />
            <meshStandardMaterial color={color} />
          </mesh>
        ))
      )}
    </group>
  );
}

function VehicleGeometry({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1, 0.3, 0.55]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Cab */}
      <mesh position={[0.1, 0.38, 0]}>
        <boxGeometry args={[0.55, 0.3, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Wheels */}
      {[-0.35, 0.35].map((x) =>
        [-0.25, 0.25].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 10]} />
            <meshStandardMaterial color="#2C3E50" />
          </mesh>
        ))
      )}
    </group>
  );
}

function CloudGeometry({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.1, 0]}>
        <sphereGeometry args={[0.28, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.35, 0.05, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 0.28, 0]}>
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function StarGeometry({ color }: { color: string }) {
  return (
    <mesh>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
}

function ObjectGeometry({ type, color }: { type: WorldObject['type']; color: string }) {
  switch (type) {
    case 'cube':
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case 'sphere':
      return (
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case 'cylinder':
      return (
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 1, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case 'cone':
      return (
        <mesh>
          <coneGeometry args={[0.5, 1.2, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case 'torus':
      return (
        <mesh>
          <torusGeometry args={[0.45, 0.18, 12, 30]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
    case 'rock':
      return (
        <mesh>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      );
    case 'crystal':
      return (
        <mesh>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} roughness={0.1} metalness={0.5} />
        </mesh>
      );
    case 'tree':
      return <TreeGeometry color={color} />;
    case 'flower':
      return <FlowerGeometry color={color} />;
    case 'house':
      return <HouseGeometry color={color} />;
    case 'character':
      return <CharacterGeometry color={color} />;
    case 'animal':
      return <AnimalGeometry color={color} />;
    case 'vehicle':
      return <VehicleGeometry color={color} />;
    case 'cloud':
      return <CloudGeometry color={color} />;
    case 'star':
      return <StarGeometry color={color} />;
    default:
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
  }
}

export default function SceneObject({ object, isSelected, onClick }: SceneObjectProps) {
  const groupRef = useRef<Mesh>(null);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onClick(object.id);
  };

  return (
    <group
      ref={groupRef}
      position={object.position}
      rotation={object.rotation}
      scale={object.scale}
      onClick={handleClick}
    >
      <ObjectGeometry type={object.type} color={object.color} />
      {isSelected && (
        <Outlines
          thickness={0.03}
          color="#FFD700"
          screenspace={false}
          opacity={1}
          transparent={false}
        />
      )}
    </group>
  );
}
