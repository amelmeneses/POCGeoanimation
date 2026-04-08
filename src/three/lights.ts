import * as THREE from 'three';

export function createLights(): THREE.Group {
  const group = new THREE.Group();

  // Soft ambient for base visibility
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  group.add(ambient);

  // Key light — top-right-front
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(3, 4, 5);
  group.add(key);

  // Fill light — left
  const fill = new THREE.DirectionalLight(0xccccdd, 0.5);
  fill.position.set(-4, 2, 2);
  group.add(fill);

  // Rim / back light for edge definition
  const rim = new THREE.DirectionalLight(0xaaaacc, 0.6);
  rim.position.set(0, -1, -5);
  group.add(rim);

  return group;
}
