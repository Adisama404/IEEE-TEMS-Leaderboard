import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export const GoldenTorus: React.FC = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      // Complex rotation for visual interest
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <>
      <Environment preset="city" />
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6} floatingRange={[-0.1, 0.1]}>
        <Torus ref={torusRef} args={[1.5, 0.25, 64, 128]}>
          <meshStandardMaterial
            color="#FFD700"
            metalness={1}
            roughness={0.1}
            envMapIntensity={2}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </Torus>
      </Float>
    </>
  );
};
