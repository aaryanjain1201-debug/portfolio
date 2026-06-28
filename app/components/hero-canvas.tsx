"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * 3D hero background scene.
 * - Central morphing distortion sphere (glassy violet)
 * - Orbiting crystalline icosahedron + torus
 * - Sparkle field for depth
 * - Mouse-driven subtle rotation
 * Heavy and client-only — must be lazy-loaded with ssr:false.
 */

function CoreSphere({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.15 + mouse.current.x * 0.3;
    mesh.current.rotation.x = mouse.current.y * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#7C3AED"
          emissive="#4C1D95"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.85}
          distort={0.35}
          speed={1.8}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

function Crystal({
  position,
  color,
  scale = 1,
  mouse,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * speed;
    mesh.current.rotation.y = t * speed * 0.8;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    mesh.current.position.x = position[0] + mouse.current.x * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function Torus({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.4;
    mesh.current.rotation.z = t * 0.2;
    mesh.current.position.x = position[0] - mouse.current.x * 0.5;
    mesh.current.position.y = position[1] - mouse.current.y * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh ref={mesh} position={position} scale={0.7}>
        <torusGeometry args={[0.6, 0.2, 16, 60]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#0891b2"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#A78BFA" />
      <pointLight position={[-5, -3, 2]} intensity={2} color="#00F5FF" />
      <pointLight position={[5, 3, -2]} intensity={1.5} color="#7C3AED" />
      <spotLight position={[0, 8, 0]} intensity={1} angle={0.5} penumbra={1} color="#C084FC" />

      {/* Core morphing sphere */}
      <CoreSphere mouse={mouse} />

      {/* Orbiting crystals */}
      <Crystal position={[2.8, 0.8, -1]} color="#00F5FF" scale={0.8} mouse={mouse} />
      <Crystal position={[-2.6, -0.6, -0.5]} color="#A78BFA" scale={0.6} mouse={mouse} />
      <Crystal position={[1.8, -1.4, 1]} color="#C084FC" scale={0.45} mouse={mouse} />
      <Crystal position={[-2.2, 1.6, 0.8]} color="#22D3EE" scale={0.5} mouse={mouse} />

      {/* Torus accent */}
      <Torus position={[0, 0, 0]} mouse={mouse} />

      {/* Sparkle field for depth */}
      <Sparkles count={80} scale={10} size={2} speed={0.3} color="#A78BFA" opacity={0.6} />
      <Sparkles count={40} scale={8} size={3} speed={0.2} color="#00F5FF" opacity={0.4} />

      {/* Environment for realistic reflections */}
      <Environment preset="night" />

      {/* Mouse tracker */}
      <MouseTracker mouse={mouse} />
    </>
  );
}

function MouseTracker({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame((state) => {
    // Normalize pointer to -1..1
    mouse.current.x = (state.pointer.x * 2);
    mouse.current.y = (state.pointer.y * 2);
  });
  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}
