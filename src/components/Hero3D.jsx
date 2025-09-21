import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center, useMatcapTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Phone Component
function Phone3D({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Phone body */}
        <mesh>
          <boxGeometry args={[1.2, 2.4, 0.1]} />
          <meshMatcapMaterial matcap={matcap} color="#1f2937" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0, 0.051]}>
          <boxGeometry args={[1.1, 2.2, 0.01]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
        
        {/* Screen glow */}
        <mesh position={[0, 0, 0.052]}>
          <boxGeometry args={[1.05, 2.15, 0.005]} />
          <meshBasicMaterial color="#FDE68A" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

// Animated 3D Delivery Box
function DeliveryBox({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const [matcap] = useMatcapTexture('C7C7D7_4C4E5A_818393_6C6C74', 256);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        {/* Main box */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshMatcapMaterial matcap={matcap} color="#f8fafc" />
        </mesh>
        
        {/* Tape strips */}
        <mesh position={[0, 0, 0.501]}>
          <boxGeometry args={[1.02, 0.1, 0.01]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
        <mesh position={[0, 0.501, 0]}>
          <boxGeometry args={[1.02, 0.01, 1.02]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
      </group>
    </Float>
  );
}

// Animated 3D Takkeh Logo
function TakkehLogo3D({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const [matcap] = useMatcapTexture('FFCB05_FFF1AC_E1B000_CAAB00', 256);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={meshRef} position={position}>
        {/* Main circle */}
        <mesh>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshMatcapMaterial matcap={matcap} color="#FBBF24" />
        </mesh>
        
        {/* Inner glow */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.21, 32]} />
          <meshBasicMaterial color="#FDE68A" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating particles
function Particles() {
  const particlesRef = useRef();
  const particleCount = 50;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].speed;
        if (particle.position.y > 10) {
          particle.position.y = -10;
        }
        particle.rotation.x = state.clock.elapsedTime * particles[i].speed * 10;
        particle.rotation.y = state.clock.elapsedTime * particles[i].speed * 5;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Main Hero3D Component
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FBBF24" />
        
        {/* 3D Elements */}
        <Phone3D position={[-3, 1, 0]} />
        <DeliveryBox position={[3, -1, 0]} />
        <TakkehLogo3D position={[0, 2, -2]} />
        <Particles />
        
        {/* Subtle orbit controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
