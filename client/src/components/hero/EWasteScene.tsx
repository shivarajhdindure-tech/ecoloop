import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import { Cpu, Laptop, Recycle, Smartphone } from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Fallback UI handles WebGL initialization failures gracefully.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function SceneFallback({ message }: { message?: string }) {
  return (
    <div
      role="img"
      aria-label="EcoLoop circular electronics ecosystem preview"
      className="glass-dark relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,200,120,0.18),transparent_68%)]" />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#20C878]/45 bg-[#071C15]/80 shadow-[0_0_40px_rgba(32,200,120,0.28)]">
          <Recycle className="h-12 w-12 text-[#20C878]" />
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#E8C46A]/60 bg-[#103D2B] text-[#E8C46A]">
            <Cpu className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#20C878]/25 bg-[#071C15]/70 px-3 py-2 text-xs font-medium text-[#B9F27C]">
            <Smartphone className="h-3.5 w-3.5" /> Smartphones
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#20C878]/25 bg-[#071C15]/70 px-3 py-2 text-xs font-medium text-[#B9F27C]">
            <Laptop className="h-3.5 w-3.5" /> Laptops
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8C46A]/35 bg-[#071C15]/70 px-3 py-2 text-xs font-medium text-[#E8C46A]">
            <Cpu className="h-3.5 w-3.5" /> Circuit Boards
          </span>
        </div>
        <p className="max-w-xs text-xs text-[#F2F5EF]/70">
          {message ?? 'Circular hardware showcase in 2D compatibility mode.'}
        </p>
      </div>
    </div>
  );
}

function RecyclingEmblem({ reducedMotion }: { reducedMotion: boolean }) {
  const emblemRef = useRef<THREE.Group>(null);
  const outerGoldRingRef = useRef<THREE.Mesh>(null);

  const arcAngles = useMemo(() => [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3], []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    if (emblemRef.current) {
      emblemRef.current.rotation.y += delta * 0.32;
      emblemRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08;
    }
    if (outerGoldRingRef.current) {
      outerGoldRingRef.current.rotation.z -= delta * 0.24;
    }
  });

  return (
    <group ref={emblemRef} position={[0, 0.1, 0]}>
      {/* Central Glowing Core */}
      <mesh castShadow>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#B9F27C"
          emissive="#20C878"
          emissiveIntensity={1.6}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Inner Eco Energy Ring */}
      <mesh>
        <torusGeometry args={[0.64, 0.032, 16, 48]} />
        <meshStandardMaterial
          color="#20C878"
          emissive="#20C878"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>

      {/* Three Stylized Circular Loop Arcs + Directional Arrowheads */}
      {arcAngles.map((angle, index) => (
        <group key={index} rotation={[0, 0, angle]}>
          <mesh rotation={[0, 0, 0.15]}>
            <torusGeometry args={[1.05, 0.068, 16, 28, Math.PI * 0.47]} />
            <meshStandardMaterial
              color="#20C878"
              emissive="#103D2B"
              emissiveIntensity={0.9}
              roughness={0.25}
              metalness={0.65}
            />
          </mesh>
          {/* Arrowhead Cone aligned tangentially along the loop */}
          <mesh position={[0.04, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.14, 0.28, 12]} />
            <meshStandardMaterial
              color="#B9F27C"
              emissive="#20C878"
              emissiveIntensity={0.85}
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Subtle Gold Orbital Highlight Ring */}
      <mesh ref={outerGoldRingRef} rotation={[Math.PI * 0.36, 0.25, 0]}>
        <torusGeometry args={[1.38, 0.022, 12, 64]} />
        <meshStandardMaterial
          color="#E8C46A"
          emissive="#E8C46A"
          emissiveIntensity={0.45}
          roughness={0.22}
          metalness={0.88}
        />
      </mesh>
    </group>
  );
}

interface DeviceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  reducedMotion: boolean;
  floatSpeed?: number;
  variant?: 'front' | 'angled';
}

function SmartphoneModel({
  position,
  rotation,
  reducedMotion,
  floatSpeed = 1.4,
  variant = 'front',
}: DeviceProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.16;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : floatSpeed}
      rotationIntensity={reducedMotion ? 0 : 0.22}
      floatIntensity={reducedMotion ? 0 : 0.42}
    >
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Phone Chassis */}
        <RoundedBox args={[0.72, 1.44, 0.08]} radius={0.08} smoothness={4} castShadow>
          <meshStandardMaterial color="#103D2B" roughness={0.32} metalness={0.78} />
        </RoundedBox>

        {/* Gold Side Trim Frame */}
        <RoundedBox args={[0.74, 1.46, 0.045]} radius={0.08} smoothness={3}>
          <meshStandardMaterial color="#E8C46A" roughness={0.28} metalness={0.85} />
        </RoundedBox>

        {/* OLED Glass Screen */}
        <mesh position={[0, 0, 0.043]}>
          <planeGeometry args={[0.63, 1.32]} />
          <meshStandardMaterial
            color="#071C15"
            emissive="#103D2B"
            emissiveIntensity={0.55}
            roughness={0.12}
            metalness={0.35}
          />
        </mesh>

        {/* Glowing Screen Telemetry Accents */}
        <mesh position={[0, 0.22, 0.046]}>
          <ringGeometry args={[0.12, 0.155, 28]} />
          <meshBasicMaterial color="#20C878" />
        </mesh>
        <mesh position={[0, -0.14, 0.046]}>
          <planeGeometry args={[0.42, 0.06]} />
          <meshBasicMaterial color="#B9F27C" />
        </mesh>
        <mesh position={[-0.08, -0.26, 0.046]}>
          <planeGeometry args={[0.26, 0.04]} />
          <meshBasicMaterial color="#20C878" />
        </mesh>

        {/* Rear Camera Bump (Visible on angled back view) */}
        <group position={[-0.17, 0.45, -0.052]}>
          <RoundedBox args={[0.26, 0.34, 0.035]} radius={0.04} smoothness={2}>
            <meshStandardMaterial color="#071C15" roughness={0.3} metalness={0.75} />
          </RoundedBox>
          <mesh position={[-0.04, 0.07, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.02, 16]} />
            <meshStandardMaterial color="#E8C46A" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0.04, -0.06, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.02, 16]} />
            <meshStandardMaterial color="#E8C46A" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>

        {variant === 'angled' && (
          <mesh position={[0, 0, -0.043]} rotation={[0, Math.PI, 0]}>
            <ringGeometry args={[0.11, 0.13, 24]} />
            <meshBasicMaterial color="#20C878" />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function LaptopModel({ position, rotation, reducedMotion }: DeviceProps) {
  const laptopRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !laptopRef.current) return;
    laptopRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.55) * 0.14;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.15}
      rotationIntensity={reducedMotion ? 0 : 0.18}
      floatIntensity={reducedMotion ? 0 : 0.36}
    >
      <group ref={laptopRef} position={position} rotation={rotation}>
        {/* Laptop Base Deck */}
        <RoundedBox args={[1.76, 0.07, 1.16]} radius={0.025} smoothness={3} castShadow>
          <meshStandardMaterial color="#103D2B" roughness={0.32} metalness={0.76} />
        </RoundedBox>

        {/* Keyboard Recess */}
        <mesh position={[0, 0.038, -0.14]}>
          <boxGeometry args={[1.44, 0.012, 0.54]} />
          <meshStandardMaterial color="#071C15" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.038, 0.31]}>
          <boxGeometry args={[0.56, 0.01, 0.32]} />
          <meshStandardMaterial color="#154d37" roughness={0.35} metalness={0.5} />
        </mesh>

        {/* Gold Hinge Accent */}
        <mesh position={[0, 0.04, -0.56]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.028, 0.028, 1.4, 12]} />
          <meshStandardMaterial color="#E8C46A" roughness={0.25} metalness={0.88} />
        </mesh>

        {/* Open Screen Lid */}
        <group position={[0, 0.04, -0.56]} rotation={[-0.38, 0, 0]}>
          <group position={[0, 0.56, 0]}>
            <RoundedBox args={[1.74, 1.12, 0.05]} radius={0.025} smoothness={3} castShadow>
              <meshStandardMaterial color="#0b291e" roughness={0.3} metalness={0.8} />
            </RoundedBox>
            {/* Display Panel */}
            <mesh position={[0, 0, 0.028]}>
              <planeGeometry args={[1.6, 0.98]} />
              <meshStandardMaterial
                color="#071C15"
                emissive="#103D2B"
                emissiveIntensity={0.65}
                roughness={0.15}
                metalness={0.3}
              />
            </mesh>
            {/* Circular Diagnostic Graphic on Screen */}
            <mesh position={[-0.34, 0.05, 0.031]}>
              <ringGeometry args={[0.18, 0.23, 32]} />
              <meshBasicMaterial color="#20C878" />
            </mesh>
            <mesh position={[0.28, 0.16, 0.031]}>
              <planeGeometry args={[0.58, 0.08]} />
              <meshBasicMaterial color="#B9F27C" />
            </mesh>
            <mesh position={[0.24, 0.0, 0.031]}>
              <planeGeometry args={[0.5, 0.06]} />
              <meshBasicMaterial color="#20C878" />
            </mesh>
            <mesh position={[0.2, -0.15, 0.031]}>
              <planeGeometry args={[0.42, 0.05]} />
              <meshBasicMaterial color="#E8C46A" />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  );
}

function CircuitBoardModel({
  position,
  rotation,
  reducedMotion,
  floatSpeed = 1.3,
}: DeviceProps) {
  const boardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reducedMotion || !boardRef.current) return;
    boardRef.current.rotation.z =
      rotation[2] + Math.sin(state.clock.elapsedTime * 0.65 + position[1]) * 0.12;
  });

  const pinOffsets = useMemo(() => [-0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45], []);

  return (
    <Float
      speed={reducedMotion ? 0 : floatSpeed}
      rotationIntensity={reducedMotion ? 0 : 0.25}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <group ref={boardRef} position={position} rotation={rotation}>
        {/* PCB Substrate */}
        <RoundedBox args={[1.38, 0.94, 0.045]} radius={0.03} smoothness={2} castShadow>
          <meshStandardMaterial color="#0E3B2A" roughness={0.42} metalness={0.35} />
        </RoundedBox>

        {/* Central IC Processor */}
        <mesh position={[-0.08, 0.04, 0.045]}>
          <boxGeometry args={[0.42, 0.42, 0.05]} />
          <meshStandardMaterial color="#071C15" roughness={0.38} metalness={0.55} />
        </mesh>
        <mesh position={[-0.08, 0.04, 0.072]}>
          <ringGeometry args={[0.08, 0.11, 20]} />
          <meshBasicMaterial color="#20C878" />
        </mesh>

        {/* Gold Copper Traces */}
        <mesh position={[0.32, 0.16, 0.025]}>
          <boxGeometry args={[0.36, 0.03, 0.01]} />
          <meshStandardMaterial color="#E8C46A" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[0.32, -0.12, 0.025]}>
          <boxGeometry args={[0.36, 0.03, 0.01]} />
          <meshStandardMaterial color="#E8C46A" roughness={0.25} metalness={0.9} />
        </mesh>

        {/* Capacitors */}
        <mesh position={[0.38, 0.26, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.09, 14]} />
          <meshStandardMaterial color="#E8C46A" roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh position={[0.38, -0.24, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 14]} />
          <meshStandardMaterial color="#20C878" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Gold Edge Connector Pins */}
        {pinOffsets.map((offset) => (
          <mesh key={offset} position={[offset, -0.45, 0.026]}>
            <boxGeometry args={[0.06, 0.08, 0.015]} />
            <meshStandardMaterial color="#E8C46A" roughness={0.2} metalness={0.92} />
          </mesh>
        ))}

        {/* Micro Status LEDs */}
        <mesh position={[-0.48, 0.3, 0.035]}>
          <sphereGeometry args={[0.032, 10, 10]} />
          <meshBasicMaterial color="#B9F27C" />
        </mesh>
        <mesh position={[-0.36, 0.3, 0.035]}>
          <sphereGeometry args={[0.026, 10, 10]} />
          <meshBasicMaterial color="#20C878" />
        </mesh>
      </group>
    </Float>
  );
}

function MicrochipNode({
  position,
  rotation,
  reducedMotion,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  reducedMotion: boolean;
}) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.6}
      rotationIntensity={reducedMotion ? 0 : 0.35}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <group position={position} rotation={rotation}>
        <RoundedBox args={[0.42, 0.42, 0.08]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#071C15" roughness={0.35} metalness={0.65} />
        </RoundedBox>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.18, 0.18, 0.015]} />
          <meshStandardMaterial
            color="#E8C46A"
            emissive="#E8C46A"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame((state) => {
    if (reducedMotion) return;

    const targetX = state.pointer.x * 0.45;
    const targetY = 0.2 + state.pointer.y * 0.28;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.045);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.045);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function EWasteScene() {
  const isWebGLSupported = useWebGLSupport();
  const reducedMotion = useReducedMotionPreference();
  const [contextLost, setContextLost] = useState(false);

  if (!isWebGLSupported || contextLost) {
    return (
      <SceneFallback
        message={
          contextLost
            ? '3D rendering context was paused; showing compatibility preview.'
            : 'WebGL is unavailable in this browser; showing compatibility preview.'
        }
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="Interactive 3D EcoLoop scene featuring floating smartphones, a laptop, circuit boards, and a glowing recycling emblem"
      className="relative h-full w-full overflow-hidden rounded-3xl border border-[#20C878]/20 bg-[#071C15]/55"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(32,200,120,0.2),transparent_65%)]" />

      <CanvasErrorBoundary fallback={<SceneFallback />}>
        <Canvas
          shadows
          dpr={[1, 1.75]}
          frameloop={reducedMotion ? 'demand' : 'always'}
          camera={{ position: [0, 0.2, 7.6], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              (event) => {
                event.preventDefault();
                setContextLost(true);
              },
              { once: true },
            );
          }}
        >
          <CameraRig reducedMotion={reducedMotion} />

          <ambientLight intensity={0.55} color="#c5f5dc" />
          <directionalLight
            position={[4.5, 6, 5]}
            intensity={1.75}
            color="#F2F5EF"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 2, -3]} intensity={1.1} color="#20C878" />
          <pointLight position={[0, 0.2, 1.4]} intensity={3.2} distance={8} color="#20C878" />
          <pointLight position={[2.8, -1.5, 2.2]} intensity={1.8} distance={7} color="#E8C46A" />

          {/* Procedural lighting environment (zero external HDR network fetches) */}
          <Environment resolution={128}>
            <Lightformer
              form="ring"
              intensity={2}
              color="#20C878"
              position={[0, 4, -4]}
              scale={6}
            />
            <Lightformer
              form="rect"
              intensity={1.6}
              color="#E8C46A"
              position={[5, 1, 2]}
              scale={[3, 6, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.2}
              color="#F2F5EF"
              position={[-5, 3, 4]}
              scale={[4, 4, 1]}
            />
          </Environment>

          <RecyclingEmblem reducedMotion={reducedMotion} />

          {/* Floating Smartphones */}
          <SmartphoneModel
            position={[-2.45, 0.9, 0.55]}
            rotation={[0.18, 0.45, -0.14]}
            reducedMotion={reducedMotion}
            floatSpeed={1.35}
            variant="front"
          />
          <SmartphoneModel
            position={[2.35, -0.95, 0.5]}
            rotation={[-0.15, -2.5, 0.2]}
            reducedMotion={reducedMotion}
            floatSpeed={1.2}
            variant="angled"
          />

          {/* Floating Laptop */}
          <LaptopModel
            position={[2.15, 0.95, -0.45]}
            rotation={[0.2, -0.52, 0.06]}
            reducedMotion={reducedMotion}
          />

          {/* Floating Circuit Boards & Microchips */}
          <CircuitBoardModel
            position={[-2.1, -1.05, -0.35]}
            rotation={[-0.32, 0.38, 0.16]}
            reducedMotion={reducedMotion}
            floatSpeed={1.15}
          />
          <CircuitBoardModel
            position={[0.25, -1.7, -0.9]}
            rotation={[0.65, -0.2, -0.28]}
            reducedMotion={reducedMotion}
            floatSpeed={1.0}
          />

          <MicrochipNode
            position={[-1.15, 1.75, -0.9]}
            rotation={[0.35, 0.4, 0.2]}
            reducedMotion={reducedMotion}
          />
          <MicrochipNode
            position={[1.05, 1.8, -1.1]}
            rotation={[-0.25, -0.45, -0.15]}
            reducedMotion={reducedMotion}
          />

          <Sparkles
            count={32}
            scale={[7.2, 4.4, 3.2]}
            size={2.2}
            speed={reducedMotion ? 0 : 0.25}
            opacity={0.55}
            color="#B9F27C"
          />

          <ContactShadows
            position={[0, -2.35, 0]}
            opacity={0.35}
            scale={10}
            blur={2.4}
            far={4.5}
            frames={1}
            resolution={256}
            color="#04110d"
          />
        </Canvas>
      </CanvasErrorBoundary>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
        <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium text-[#B9F27C]">
          <span className="h-2 w-2 rounded-full bg-[#20C878]" />
          Circular Electronics Ecosystem
        </span>
        <span className="hidden rounded-full border border-[#E8C46A]/30 bg-[#071C15]/75 px-3 py-1 text-[11px] font-medium text-[#E8C46A] sm:inline-flex">
          {reducedMotion ? 'Reduced motion active' : 'Move pointer to explore'}
        </span>
      </div>
    </div>
  );
}

export default EWasteScene;
