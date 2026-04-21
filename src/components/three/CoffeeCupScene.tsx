'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  ContactShadows, 
  Environment, 
  Float, 
  MeshDistortMaterial, 
  Points, 
  PointMaterial,
  useScroll,
  PerspectiveCamera,
  TrackballControls,
} from '@react-three/drei';
import * as THREE from 'three';

function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!cupRef.current) return;
    
    // Mouse follow
    const mouseX = (state.mouse.x * Math.PI) / 8;
    const mouseY = (state.mouse.y * Math.PI) / 12;
    
    cupRef.current.rotation.y = THREE.MathUtils.lerp(cupRef.current.rotation.y, mouseX + scroll.offset * Math.PI * 2, 0.05);
    cupRef.current.rotation.x = THREE.MathUtils.lerp(cupRef.current.rotation.x, -mouseY, 0.05);
    
    // Scroll rotation
    // cupRef.current.rotation.y += scroll.offset * 0.01;
  });

  return (
    <group ref={cupRef}>
      {/* Cup Body */}
      <mesh position={[0, -0.5, 0]}>
        <latheGeometry args={[
          [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(0.8, 0),
            new THREE.Vector2(0.9, 0.1),
            new THREE.Vector2(1.1, 1.8),
            new THREE.Vector2(1.15, 2),
            new THREE.Vector2(1.1, 2.05),
            new THREE.Vector2(1.0, 2),
            new THREE.Vector2(0.9, 0.2),
            new THREE.Vector2(0, 0.1),
          ],
          32
        ]} />
        <meshStandardMaterial 
          color="#F5E6D3" 
          roughness={0.1} 
          metalness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[1.1, 0.7, 0]} rotation={[0, 0, Math.PI / 8]}>
        <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.1} />
      </mesh>

      {/* Coffee Surface */}
      <mesh position={[0, 1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshStandardMaterial 
          color="#1A120B" 
          roughness={0.05} 
          metalness={0.4}
        />
      </mesh>

      {/* Saucer */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.6, 1.2, 0.1, 32]} />
        <meshStandardMaterial color="#F5E6D3" roughness={0.1} />
      </mesh>
    </group>
  );
}

function FloatingBeans({ count = 15 }) {
  const pointsRef = useRef<THREE.Group>(null);
  
  const beans = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
       position: new THREE.Vector3(
         (Math.random() - 0.5) * 6,
         (Math.random() - 0.5) * 6,
         (Math.random() - 0.5) * 6
       ),
       rotation: new THREE.Euler(
         Math.random() * Math.PI,
         Math.random() * Math.PI,
         Math.random() * Math.PI
       ),
       scale: 0.15 + Math.random() * 0.1,
       speed: 0.005 + Math.random() * 0.01,
    }));
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.children.forEach((child, i) => {
      child.rotation.x += beans[i].speed;
      child.rotation.y += beans[i].speed;
      child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002;
    });
  });

  return (
    <group ref={pointsRef}>
      {beans.map((bean, i) => (
        <mesh key={i} position={bean.position} rotation={bean.rotation} scale={bean.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#3E2723" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Steam() {
  const points = useMemo(() => {
    const p = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      p[i * 3] = (Math.random() - 0.5) * 1.5;
      p[i * 3 + 1] = Math.random() * 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < 40; i++) {
        positions[i * 3 + 1] += 0.01;
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.005;
        if (positions[i * 3 + 1] > 2) {
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
          size={0.1} 
          sizeAttenuation 
          color="#F5E6D3" 
          opacity={0.15} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function CoffeeCupScene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 1.5, 6], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={35} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#C8956C" />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
             <CoffeeCup />
             <Steam />
          </Float>
          
          <FloatingBeans />
          
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
