import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERTEX_SHADER = `
  varying float vElevation;
  uniform float uTime;

  float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
  }

  void main() {
    vec3 pos = position;
    
    // Primary fluid motion: Heavier, deeper swell
    float elevation = 0.0;
    elevation += sin(pos.x * 0.12 + uTime * 0.15) * 4.0;
    elevation += sin(pos.y * 0.1 + uTime * 0.1) * 4.0;
    
    // Secondary wave pattern (Original ripple)
    elevation += sin(pos.x * 0.4 + uTime * 0.4) * 0.8;
    elevation += cos(pos.y * 0.3 + uTime * 0.3) * 0.8;

    // Fast Micro-Ripples (New Layer)
    // Faster time component (uTime * 1.5) and lower amplitude (0.3)
    elevation += sin(pos.x * 1.5 + uTime * 1.5) * 0.3;
    elevation += cos(pos.y * 1.2 + uTime * 1.2) * 0.3;
    
    // Detail noise
    elevation += noise(pos.xy * 0.2 + uTime * 0.08) * 2.0;

    pos.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  varying float vElevation;
  
  void main() {
    // Theme Colors
    vec3 deepColor = vec3(0.0, 0.08, 0.25);   // Rich Navy
    vec3 midColor = vec3(0.0, 0.45, 1.0);     // Vibrant Electric Blue
    vec3 peakColor = vec3(0.95, 0.98, 1.0);   // Bright White with slight cool tint
    
    // Normalize elevation. Range is roughly -8 to +12 given the wave stack
    float t = (vElevation + 8.0) / 20.0;
    t = clamp(t, 0.0, 1.0);
    
    // Smooth transitions using mix (lerp)
    // We use a slight curve on t for the deep-to-mid transition to keep deep waters dark
    float deepMixFactor = smoothstep(0.2, 0.7, t); 
    vec3 baseColor = mix(deepColor, midColor, deepMixFactor);
    
    // Highlight peaks
    float peakMixFactor = smoothstep(0.75, 1.0, t);
    vec3 color = mix(baseColor, peakColor, peakMixFactor);
    
    // Opacity logic
    // Smoother alpha transition
    float alpha = mix(0.1, 0.9, t);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const Terrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Slower rotation
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, -25]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[180, 180, 96, 96]} />
        <shaderMaterial
          wireframe
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
