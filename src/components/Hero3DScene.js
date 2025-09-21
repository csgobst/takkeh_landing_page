import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Sphere, Box, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// Floating Phone Component
function FloatingPhone({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Phone Body */}
      <Box args={[1.8, 3.2, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Phone Screen */}
      <Box args={[1.6, 2.8, 0.21]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.3} />
      </Box>
      
      {/* Takkeh Logo on Screen */}
      <Cylinder args={[0.3, 0.3, 0.05]} position={[0, 0.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" />
      </Cylinder>
    </group>
  );
}

// Floating Delivery Items
function DeliveryItems() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Grocery Bag */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2} position={[3, 1, -2]}>
        <Box args={[0.8, 1.2, 0.6]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <Box args={[0.85, 0.3, 0.65]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#654321" />
        </Box>
      </Float>

      {/* Pizza Box */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5} position={[-3, 0.5, -1]}>
        <Box args={[1.5, 0.2, 1.5]}>
          <meshStandardMaterial color="#ff6b6b" />
        </Box>
      </Float>

      {/* Coffee Cup */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={2.5} position={[2.5, -1, 1]}>
        <Cylinder args={[0.4, 0.3, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        <Cylinder args={[0.42, 0.42, 0.05]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
      </Float>

      {/* Shopping Basket */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.8} position={[-2.5, -0.8, 0.5]}>
        <Torus args={[0.6, 0.1, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#FBBF24" />
        </Torus>
        <Box args={[1, 0.8, 1]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#F59E0B" wireframe />
        </Box>
      </Float>
    </group>
  );
}

// Animated Background Spheres
function BackgroundSpheres() {
  const spheres = Array.from({ length: 8 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ],
    scale: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.5 + 0.5
  }));

  return (
    <>
      {spheres.map((sphere, index) => (
        <Float
          key={index}
          speed={sphere.speed}
          rotationIntensity={0.2}
          floatIntensity={1}
          position={sphere.position}
        >
          <Sphere args={[sphere.scale]}>
            <meshStandardMaterial
              color="#FBBF24"
              transparent
              opacity={0.3}
              emissive="#FBBF24"
              emissiveIntensity={0.1}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

// Main 3D Scene Component
export default function Hero3DScene() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full h-96 md:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#FBBF24" intensity={0.5} />
        
        {/* Background Elements */}
        <BackgroundSpheres />
        
        {/* Main Phone */}
        <FloatingPhone position={[0, 0, 0]} />
        
        {/* Delivery Items */}
        <DeliveryItems />
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={hovered}
          autoRotate={!hovered}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}