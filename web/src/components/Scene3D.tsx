import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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

// Floating geometric shapes
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
        }
    })

    const ShapeComponent = () => {
        switch (shape) {
            case "sphere":
                return (
                    <Sphere args={[1, 64, 64]} ref={meshRef}>
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
                    <Torus args={[1, 0.4, 32, 64]} ref={meshRef}>
                        <meshStandardMaterial
                            color={color}
                            roughness={0.2}
                            metalness={0.9}
                            emissive={color}
                            emissiveIntensity={0.2}
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
                        />
                    </Icosahedron>
                )
        }
    }

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

// Interactive particles that follow mouse
const Particles = ({ count = 500 }: { count?: number }) => {
    const mesh = useRef<THREE.Points>(null)
    const { mouse, viewport } = useThree()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20

            // Gradient from blue to purple to cyan
            const t = Math.random()
            if (t < 0.33) {
                colors[i * 3] = 0.2 + Math.random() * 0.3 // R
                colors[i * 3 + 1] = 0.4 + Math.random() * 0.3 // G
                colors[i * 3 + 2] = 1 // B
            } else if (t < 0.66) {
                colors[i * 3] = 0.6 + Math.random() * 0.3 // R
                colors[i * 3 + 1] = 0.2 + Math.random() * 0.2 // G
                colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // B
            } else {
                colors[i * 3] = 0.1 + Math.random() * 0.2 // R
                colors[i * 3 + 1] = 0.8 + Math.random() * 0.2 // G
                colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // B
            }

            sizes[i] = Math.random() * 2 + 0.5
        }

        return { positions, colors, sizes }
    }, [count])

    useFrame((state) => {
        if (mesh.current) {
            const positions = mesh.current.geometry.attributes.position
                .array as Float32Array
            const time = state.clock.elapsedTime

            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                // Gentle floating motion
                positions[i3 + 1] +=
                    Math.sin(time * 0.5 + positions[i3]) * 0.001

                // Mouse influence
                const dx = (mouse.x * viewport.width) / 2 - positions[i3]
                const dy = (mouse.y * viewport.height) / 2 - positions[i3 + 1]
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 3) {
                    positions[i3] -= dx * 0.001
                    positions[i3 + 1] -= dy * 0.001
                }
            }

            mesh.current.geometry.attributes.position.needsUpdate = true
            mesh.current.rotation.y += 0.0005
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
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Glowing ring effect
const GlowRing = () => {
    const ringRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.x =
                Math.sin(state.clock.elapsedTime * 0.3) * 0.5
            ringRef.current.rotation.y += 0.005
        }
    })

    return (
        <mesh ref={ringRef} position={[0, 0, -2]}>
            <torusGeometry args={[3, 0.02, 16, 100]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
    )
}

// Main 3D Scene Component
export const HeroScene = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <color attach="background" args={["#0a0a0f"]} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    color="#ffffff"
                />
                <pointLight
                    position={[-10, -10, -10]}
                    intensity={0.5}
                    color="#8b5cf6"
                />
                <pointLight
                    position={[10, -10, 10]}
                    intensity={0.5}
                    color="#3b82f6"
                />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    color="#06b6d4"
                />

                {/* Star background */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                {/* Particles */}
                <Particles count={800} />

                {/* Floating shapes */}
                <FloatingShape
                    position={[-4, 2, -3]}
                    shape="sphere"
                    color="#3b82f6"
                    speed={0.8}
                    distort={0.4}
                />
                <FloatingShape
                    position={[4, -1, -2]}
                    shape="box"
                    color="#8b5cf6"
                    speed={1.2}
                />
                <FloatingShape
                    position={[-3, -2, -4]}
                    shape="torus"
                    color="#06b6d4"
                    speed={0.6}
                />
                <FloatingShape
                    position={[3, 2.5, -5]}
                    shape="icosahedron"
                    color="#ec4899"
                    speed={1}
                />
                <FloatingShape
                    position={[0, -3, -3]}
                    shape="sphere"
                    color="#10b981"
                    speed={0.7}
                    distort={0.5}
                />

                {/* Glow rings */}
                <GlowRing />

                {/* Second ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -3]}>
                    <torusGeometry args={[4, 0.015, 16, 100]} />
                    <meshBasicMaterial
                        color="#8b5cf6"
                        transparent
                        opacity={0.4}
                    />
                </mesh>
            </Canvas>
        </div>
    )
}

export default HeroScene
