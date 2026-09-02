import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const nodes = [
  { id: 'AI', position: [-2.5, 2.7, 0.8], color: '#77d9ff' },
  { id: 'DATA', position: [-1.2, 0.9, 0.7], color: '#9ce0ff' },
  { id: 'ML', position: [0.3, 2.1, 0.6], color: '#7fe3d2' },
  { id: 'NETWORK', position: [0.1, 0.1, 0.5], color: '#7aa9ff' },
  { id: 'TELECOM', position: [2.2, 1.1, 0.4], color: '#8ec5ff' },
  { id: 'SECURITY', position: [2.7, -1.4, -0.6], color: '#6de3c9' },
  { id: 'INDUSTRIAL', position: [0.4, -2.6, -0.9], color: '#89a9ff' }
]

function NetworkNode({ position, color, index, hovered, setHovered }) {
  const ref = useRef()

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime() + index
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(t * 0.8) * 0.08 + pointer.x * 0.15
      ref.current.position.y = position[1] + Math.cos(t * 1.1) * 0.11 + pointer.y * 0.15
      ref.current.position.z = position[2] + Math.sin(t * 1.3) * 0.1
      ref.current.scale.setScalar(hovered ? 1.25 : 1)
    }
  })

  return (
    <mesh ref={ref} position={position} onPointerOver={() => setHovered(index)} onPointerOut={() => setHovered(null)}>
      <sphereGeometry args={[0.11, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  )
}

function Packet({ start, end, offset }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = ((clock.getElapsedTime() * 0.15 + offset) % 1 + 1) % 1
    const x = THREE.MathUtils.lerp(start[0], end[0], t)
    const y = THREE.MathUtils.lerp(start[1], end[1], t)
    const z = THREE.MathUtils.lerp(start[2], end[2], t)
    ref.current.position.set(x, y, z)
  })

  return (
    <mesh ref={ref} position={start}>
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshStandardMaterial color="#d8f6ff" emissive="#d8f6ff" emissiveIntensity={0.9} />
    </mesh>
  )
}

function NetworkLink({ start, end }) {
  const positions = useMemo(() => new Float32Array([...start, ...end]), [start, end])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#6ba8ff" transparent opacity={0.36} />
    </line>
  )
}

function HeroNetworkScene() {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(null)

  const packetPairs = useMemo(
    () => [
      { start: nodes[0].position, end: nodes[1].position, offset: 0.1 },
      { start: nodes[1].position, end: nodes[3].position, offset: 0.3 },
      { start: nodes[3].position, end: nodes[4].position, offset: 0.5 },
      { start: nodes[3].position, end: nodes[5].position, offset: 0.7 },
      { start: nodes[3].position, end: nodes[6].position, offset: 0.9 },
      { start: nodes[0].position, end: nodes[2].position, offset: 0.2 },
      { start: nodes[2].position, end: nodes[3].position, offset: 0.42 }
    ],
    []
  )

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.18
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.18
    }
  })

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 0, 3]} intensity={10} color="#7dd3fc" />
      <group ref={groupRef}>
        {nodes.map((node, index) => (
          <NetworkNode key={node.id} {...node} index={index} hovered={hovered === index} setHovered={setHovered} />
        ))}

        {nodes.map((node, index) =>
          nodes.slice(index + 1).map((other) => {
            const a = node.position
            const b = other.position
            const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
            if (distance > 3.5) return null
            return <NetworkLink key={`${node.id}-${other.id}`} start={a} end={b} />
          })
        )}

        {packetPairs.map((p, index) => (
          <Packet key={index} start={p.start} end={p.end} offset={p.offset} />
        ))}
      </group>
    </>
  )
}

export default function HeroNetwork() {
  return (
    <div className="hero-network-wrap">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050b12', 0)
        }}
      >
        <HeroNetworkScene />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}
