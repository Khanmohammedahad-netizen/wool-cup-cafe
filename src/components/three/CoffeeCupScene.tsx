'use client';

import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  ContactShadows, 
  Environment, 
  Float, 
  Points, 
  PointMaterial,
  PerspectiveCamera,
  PerformanceMonitor,
  Instance,
  Instances
} from '@react-three/drei';
import * as THREE from 'three';

// 1. Latte Art
function LatteArt() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z -= 0.002;
  });
  return (
    <group ref={ref} position={[0, 1.251, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
        <meshBasicMaterial color="#E8D5C4" />
      </mesh>
      <mesh>
        <torusGeometry args={[0.2, 0.03, 16, 32]} />
        <meshBasicMaterial color="#E8D5C4" />
      </mesh>
    </group>
  );
}

// 2. Coffee Cup (Lathe + Tube Handle + Circle Surface + Cylinder Saucer)
function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null);
  
  // Bezier curve for handle
  const handleCurve = useMemo(() => {
    return new THREE.CubicBezierCurve3(
      new THREE.Vector3(1.0, 1.0, 0),
      new THREE.Vector3(1.6, 1.2, 0),
      new THREE.Vector3(1.5, 0.2, 0),
      new THREE.Vector3(0.8, 0.3, 0)
    );
  }, []);

  return (
    <group ref={cupRef}>
      {/* Cup Body */}
      <mesh position={[0, -0.5, 0]}>
        <latheGeometry args={[
          [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(0.6, 0.1), // Curved base
            new THREE.Vector2(0.8, 0.5), // Taper start
            new THREE.Vector2(0.9, 1.2), // Taper up
            new THREE.Vector2(1.1, 1.8), // Wider rim
          ],
          64
        ]} />
        <meshPhysicalMaterial 
          color="#FFFFFF" 
          roughness={0.15} 
          clearcoat={0.8}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0, -0.5, 0]}>
        <tubeGeometry args={[handleCurve, 32, 0.12, 16, false]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.15} clearcoat={0.8} />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 64]} />
        <meshPhysicalMaterial 
          color="#2A1810" 
          roughness={0.1} 
          metalness={0.3}
          clearcoat={1.0}
        />
      </mesh>
      
      <LatteArt />

      {/* Saucer */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[1.6, 1.3, 0.1, 64]} />
        <meshPhysicalMaterial color="#FFFFFF" roughness={0.15} clearcoat={0.8} />
      </mesh>
    </group>
  );
}

// 3. Floating Beans (InstancedMesh)
interface BeanData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  angleOffset: number;
  orbitSpeed: number;
}

function FloatingBeans({ count = 12 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const beans = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1;
      return {
        position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.1 + Math.random() * 0.05,
        speed: 0.005 + Math.random() * 0.01,
        angleOffset: angle,
        orbitSpeed: 0.002 + Math.random() * 0.002,
      } as BeanData;
    });
  }, [count]);

  return (
    <group ref={groupRef}>
      <Instances limit={count}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial color="#3E2723" roughness={0.6} clearcoat={0.1} />
        {beans.map((bean, i) => (
          <BeanInstance key={i} data={bean} />
        ))}
      </Instances>
    </group>
  );
}

function BeanInstance({ data }: { data: BeanData }) {
  const ref = useRef<any>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    
    // Orbiting
    const currentAngle = data.angleOffset + t * data.orbitSpeed;
    const radius = Math.sqrt(data.position[0]**2 + data.position[2]**2);
    
    ref.current.position.x = Math.cos(currentAngle) * radius;
    ref.current.position.z = Math.sin(currentAngle) * radius;
    
    // Vertical bob sine wave
    ref.current.position.y = data.position[1] + Math.sin(t * 2 + data.angleOffset) * 0.5;
    
    // Rotation
    ref.current.rotation.x += data.speed;
    ref.current.rotation.y += data.speed;
  });

  return <Instance ref={ref} position={data.position} rotation={data.rotation} scale={data.scale} />;
}

// 4. Steam Particles
function Steam({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 1.5;
      p[i * 3 + 1] = Math.random() * 3;
      p[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
        // rising
        positions[i * 3 + 1] += 0.015 + Math.random() * 0.01;
        // slight drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.005;
        // resetting
        if (positions[i * 3 + 1] > 3) {
            positions[i * 3 + 1] = 0;
            positions[i * 3] = (Math.random() - 0.5) * 1.5;
        }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[0, 1.3, 0]}>
      <Points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <PointMaterial 
          transparent 
          vertexColors={false} 
          size={0.15} 
          sizeAttenuation 
          color="#FFFFFF" 
          opacity={0.2} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Main Scene Controller
function SceneController({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    if (isMobile) {
      // Auto-rotate slowly on mobile
      groupRef.current.rotation.y += 0.005;
    } else {
      // Rotate following mouse on desktop (lerp 0.05)
      const targetX = (state.mouse.x * Math.PI) / 6;
      const targetY = (state.mouse.y * Math.PI) / 12;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <CoffeeCup />
        <Steam count={isMobile ? 15 : 40} />
      </Float>
      <FloatingBeans count={isMobile ? 6 : 12} />
    </group>
  );
}

// Fade-in Fallback for Suspense
function LoaderFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary/50 rounded-xl animate-pulse">
      <div className="w-12 h-12 border-4 border-caramel border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function CoffeeCupScene() {
  const [dpr, setDpr] = useState(1.5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className="w-full relative transition-opacity duration-1000"
      style={{ height: 'clamp(300px, 50vw, 450px)' }}
    >
      <Suspense fallback={<LoaderFallback />}>
        <Canvas 
          dpr={dpr} 
          camera={{ position: [0, 1.5, 7], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          className="touch-none"
        >
          <PerformanceMonitor onDecline={() => setDpr(1)} />
          
          <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={35} />
          
          <ambientLight color="#C8956C" intensity={0.6} />
          <spotLight color="#D4A574" position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2.5} />
          <pointLight position={[-5, 2, -5]} intensity={1.5} color="#FFFFFF" /> {/* Rim light */}
          
          <SceneController isMobile={isMobile} />
          
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -1.2, 0]} 
            opacity={0.5} 
            scale={12} 
            blur={2.5} 
            far={4.5} 
            color="#3E2723"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
