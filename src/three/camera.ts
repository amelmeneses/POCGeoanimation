import * as THREE from 'three';
import { CAMERA } from '../utils/constants';

export function createCamera(aspect: number): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(CAMERA.fov, aspect, CAMERA.near, CAMERA.far);
  cam.position.set(CAMERA.position.x, CAMERA.position.y, CAMERA.position.z);
  return cam;
}
