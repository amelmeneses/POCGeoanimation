import type { Rotation3D } from './geoTypes';
import { ROTATION_LIMITS } from '../utils/constants';

/**
 * Convert geographic coordinates to 3D rotation values.
 *
 * This is an *artistic* mapping — not a physically accurate simulation.
 * The goal is a visually pleasing, consistent rotation that:
 * - differs noticeably between distant locations
 * - keeps the logo readable (within ROTATION_LIMITS)
 * - feels smooth when animated between locations
 *
 * Mapping strategy:
 *   latitude  (-90..90)   → X rotation (pitch / tilt)
 *   longitude (-180..180) → Y rotation (yaw / horizontal turn)
 *   combined hash         → Z rotation (slight roll for character)
 */
export function latLngToRotation(lat: number, lng: number): Rotation3D {
  // Normalize to -1..1
  const normLat = clamp(lat / 90, -1, 1);
  const normLng = clamp(lng / 180, -1, 1);

  const x = normLat * ROTATION_LIMITS.maxX;
  const y = normLng * ROTATION_LIMITS.maxY;
  // Subtle roll derived from the combination
  const z = (normLat * normLng) * ROTATION_LIMITS.maxZ;

  return { x, y, z };
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
