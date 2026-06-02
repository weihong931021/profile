"use client"

import dynamic from "next/dynamic"

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })),
  { ssr: false }
)
const NeuroNoise = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.NeuroNoise })),
  { ssr: false }
)
const DotOrbit = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.DotOrbit })),
  { ssr: false }
)

// GLSL shader source exports (for direct three.js use if needed)
export const vertexShader = `
  uniform float time; uniform float intensity;
  varying vec2 vUv; varying vec3 vPosition;
  void main() {
    vUv = uv; vPosition = position;
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`
export const fragmentShader = `
  uniform float time; uniform float intensity;
  uniform vec3 color1; uniform vec3 color2;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
    noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
    vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);
    float glow = 1.0 - length(uv - 0.5) * 2.0;
    glow = pow(glow, 2.0);
    gl_FragColor = vec4(color * glow, glow * 0.8);
  }
`

/**
 * Layered dark background:
 *  1. MeshGradient — wide dark range for visible undulating depth
 *  2. NeuroNoise   — organic neural-flow texture on top at low opacity
 */
export function PortfolioBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {/* B&W MeshGradient — matches the demo exactly */}
      <MeshGradient
        className="w-full h-full"
        // @ts-expect-error – library accepts string[]
        colors={["#000000", "#1a1a1a", "#3a3a3a", "#555555"]}
        speed={0.4}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default PortfolioBackground
