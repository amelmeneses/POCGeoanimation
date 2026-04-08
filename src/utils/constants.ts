/** Model configuration — adjust these to fine-tune the GLB appearance */
export const MODEL_CONFIG = {
  path: '/models/logo.glb',
  /** Uniform scale applied after load */
  scale: 1.0,
  /** Base rotation offset (radians) applied before geo rotation */
  baseRotation: { x: 0, y: 0, z: 0 },
  /** Position offset to correct pivot if needed */
  positionOffset: { x: 0, y: 0, z: 0 },
} as const;

/** Rotation limits (radians) — keeps the logo readable */
export const ROTATION_LIMITS = {
  /** Max tilt on X axis (pitch) */
  maxX: Math.PI / 5,   // ±36°
  /** Max rotation on Y axis (yaw) */
  maxY: Math.PI / 3,   // ±60°
  /** Max roll on Z axis */
  maxZ: Math.PI / 8,   // ±22.5°
} as const;

/** GSAP animation defaults */
export const ANIMATION = {
  duration: 1.4,
  ease: 'power3.inOut',
} as const;

/** Camera settings */
export const CAMERA = {
  fov: 40,
  near: 0.1,
  far: 100,
  position: { x: 0, y: 0, z: 5 },
} as const;
