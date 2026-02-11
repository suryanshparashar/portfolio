import {
    useRef,
    useMemo,
    useCallback,
    useState,
    useEffect,
    Component,
    type ReactNode,
} from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    Sphere,
    Box,
    Torus,
    Icosahedron,
    Stars,
} from "@react-three/drei"
import * as THREE from "three"

// Detect WebGL support
function isWebGLAvailable(): boolean {
    try {
        const canvas = document.createElement("canvas")
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("webgl2"))
        )
    } catch {
        return false
    }
}

// Error boundary to catch WebGL failures at runtime
class WebGLErrorBoundary extends Component<
    { children: ReactNode; fallback: ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    render() {
        return this.state.hasError ? this.props.fallback : this.props.children
    }
}

// CSS-only fallback hero background when WebGL is unavailable
const FallbackHero = () => (
    <div className="absolute inset-0 z-0 bg-[#0a0a0f] overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-glow-orb" />
        <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-glow-orb"
            style={{ animationDelay: "2s" }}
        />
        <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl animate-glow-orb"
            style={{ animationDelay: "4s" }}
        />

        {/* Star-like dots */}
        {Array.from({ length: 80 }, (_, i) => (
            <div
                key={i}
                className="absolute rounded-full bg-white/60 animate-pulse"
                style={{
                    width: Math.random() * 2 + 1,
                    height: Math.random() * 2 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                }}
            />
        ))}

        {/* Animated rings via CSS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[400px] h-[400px] rounded-full border border-blue-500/20 animate-spin-slow" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="w-[500px] h-[500px] rounded-full border border-purple-500/15 animate-spin-slow"
                style={{
                    animationDirection: "reverse",
                    animationDuration: "30s",
                }}
            />
        </div>
    </div>
)

// Floating geometric shapes - simplified, no trails
const FloatingShape = ({
    position,
    shape,
    color,
    speed = 1,
    distort = 0.3,
}: {
    position: [number, number, number]
    shape: "sphere" | "box" | "torus" | "icosahedron"
    color: string
    speed?: number
    distort?: number
}) => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x =
                Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2
            meshRef.current.rotation.y += 0.005 * speed
            meshRef.current.position.y =
                position[1] +
                Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
        }
    })

    const ShapeComponent = useCallback(() => {
        switch (shape) {
            case "sphere":
                return (
                    <Sphere args={[1, 32, 32]} ref={meshRef}>
                        <MeshDistortMaterial
                            color={color}
                            distort={distort}
                            speed={2}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </Sphere>
                )
            case "box":
                return (
                    <Box args={[1.5, 1.5, 1.5]} ref={meshRef}>
                        <MeshWobbleMaterial
                            color={color}
                            factor={0.4}
                            speed={2}
                            roughness={0.3}
                            metalness={0.7}
                        />
                    </Box>
                )
            case "torus":
                return (
                    <Torus args={[1, 0.4, 16, 32]} ref={meshRef}>
                        <meshStandardMaterial
                            color={color}
                            roughness={0.2}
                            metalness={0.9}
                            emissive={color}
                            emissiveIntensity={0.3}
                        />
                    </Torus>
                )
            case "icosahedron":
                return (
                    <Icosahedron args={[1, 1]} ref={meshRef}>
                        <meshStandardMaterial
                            color={color}
                            wireframe
                            roughness={0.5}
                            metalness={0.5}
                            emissive={color}
                            emissiveIntensity={0.2}
                        />
                    </Icosahedron>
                )
        }
    }, [shape, color, distort])

    return (
        <Float
            speed={speed}
            rotationIntensity={0.5}
            floatIntensity={1}
            position={position}
        >
            <ShapeComponent />
        </Float>
    )
}

// Optimized particles - no per-frame mouse interaction, simpler movement
const Particles = ({ count = 400 }: { count?: number }) => {
    const mesh = useRef<THREE.Points>(null)

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 25
            positions[i * 3 + 1] = (Math.random() - 0.5) * 25
            positions[i * 3 + 2] = (Math.random() - 0.5) * 25

            const t = Math.random()
            if (t < 0.33) {
                colors[i * 3] = 0.2 + Math.random() * 0.3
                colors[i * 3 + 1] = 0.4 + Math.random() * 0.3
                colors[i * 3 + 2] = 1
            } else if (t < 0.66) {
                colors[i * 3] = 0.6 + Math.random() * 0.3
                colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
                colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
            } else {
                colors[i * 3] = 0.1 + Math.random() * 0.2
                colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
                colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
            }
        }

        return { positions, colors }
    }, [count])

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.0005
            mesh.current.rotation.x += 0.0002
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Animated rings - fewer segments
const AnimatedRings = () => {
    const ring1Ref = useRef<THREE.Mesh>(null)
    const ring2Ref = useRef<THREE.Mesh>(null)
    const ring3Ref = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.5
            ring1Ref.current.rotation.y += 0.003
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = Math.cos(t * 0.2) * 0.3
            ring2Ref.current.rotation.z += 0.002
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.y = Math.sin(t * 0.4) * 0.4
            ring3Ref.current.rotation.x += 0.004
        }
    })

    return (
        <group position={[0, 0, -2]}>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[3, 0.02, 8, 64]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3.5, 0.015, 8, 64]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
            </mesh>
            <mesh ref={ring3Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
                <torusGeometry args={[4, 0.01, 8, 64]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
            </mesh>
        </group>
    )
}

// Main 3D Scene Component - pauses rendering when off-screen
export const HeroScene = ({ visible = true }: { visible?: boolean }) => {
    const [webglSupported, setWebglSupported] = useState(true)

    useEffect(() => {
        if (!isWebGLAvailable()) {
            setWebglSupported(false)
        }
    }, [])

    if (!webglSupported) {
        return <FallbackHero />
    }

    return (
        <WebGLErrorBoundary fallback={<FallbackHero />}>
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: "high-performance",
                    }}
                    dpr={[1, 1.5]}
                    performance={{ min: 0.5 }}
                    frameloop={visible ? "always" : "never"}
                >
                    <color attach="background" args={["#0a0a0f"]} />
                    <fog attach="fog" args={["#0a0a0f", 8, 30]} />

                    {/* Simplified Lighting */}
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                    <pointLight
                        position={[-10, -10, -10]}
                        intensity={0.8}
                        color="#8b5cf6"
                    />
                    <pointLight
                        position={[10, -10, 10]}
                        intensity={0.8}
                        color="#3b82f6"
                    />

                    {/* Reduced stars */}
                    <Stars
                        radius={100}
                        depth={60}
                        count={3000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.3}
                    />

                    {/* Reduced particles */}
                    <Particles count={400} />

                    {/* Animated rings */}
                    <AnimatedRings />

                    {/* Reduced floating shapes - 4 instead of 7 */}
                    <FloatingShape
                        position={[-5, 2, -4]}
                        shape="sphere"
                        color="#3b82f6"
                        speed={0.6}
                        distort={0.5}
                    />
                    <FloatingShape
                        position={[5, -1, -3]}
                        shape="box"
                        color="#8b5cf6"
                        speed={0.8}
                    />
                    <FloatingShape
                        position={[-4, -2, -5]}
                        shape="torus"
                        color="#06b6d4"
                        speed={0.5}
                    />
                    <FloatingShape
                        position={[4, 3, -6]}
                        shape="icosahedron"
                        color="#ec4899"
                        speed={0.7}
                    />
                </Canvas>
            </div>
        </WebGLErrorBoundary>
    )
}

export default HeroScene
