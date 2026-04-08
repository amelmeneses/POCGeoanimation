import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { MODEL_CONFIG, ANIMATION } from '../utils/constants';
import type { Rotation3D } from '../geo/geoTypes';

export class LogoRenderer {
  private model: THREE.Group | null = null;
  private pivot: THREE.Group;
  private loader: GLTFLoader;
  private currentRotation: Rotation3D = { x: 0, y: 0, z: 0 };

  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);
    this.loader = new GLTFLoader();
  }

  /** Load the GLB model. Returns a promise that resolves when ready. */
  async load(): Promise<void> {
    try {
      const gltf = await this.loader.loadAsync(MODEL_CONFIG.path);
      this.model = gltf.scene;

      // Center the model geometry around its bounding box center
      const box = new THREE.Box3().setFromObject(this.model);
      const center = box.getCenter(new THREE.Vector3());
      this.model.position.sub(center);

      // Apply position offset
      this.model.position.x += MODEL_CONFIG.positionOffset.x;
      this.model.position.y += MODEL_CONFIG.positionOffset.y;
      this.model.position.z += MODEL_CONFIG.positionOffset.z;

      // Apply scale
      const s = MODEL_CONFIG.scale;
      this.model.scale.set(s, s, s);

      // Fit model to a reasonable visual size
      box.setFromObject(this.model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const desiredSize = 2.2;
        const fitScale = desiredSize / maxDim;
        this.model.scale.multiplyScalar(fitScale);
      }

      // Apply base rotation offset
      this.pivot.rotation.set(
        MODEL_CONFIG.baseRotation.x,
        MODEL_CONFIG.baseRotation.y,
        MODEL_CONFIG.baseRotation.z,
      );

      // Set a neutral material color (light grey/white) if original is too dark
      this.model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            // Make logo light grey / white for the dark background
            mat.color = new THREE.Color(0xd0d0d0);
            mat.metalness = 0.1;
            mat.roughness = 0.55;
          }
        }
      });

      this.pivot.add(this.model);
    } catch (err) {
      console.error('Failed to load GLB model:', err);
      this.createFallback();
    }
  }

  /** Fallback if the GLB doesn't load */
  private createFallback(): void {
    const geo = new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16);
    const mat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, roughness: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    this.pivot.add(mesh);
  }

  /** Animate to a target rotation using GSAP */
  rotateTo(target: Rotation3D): void {
    this.currentRotation = { ...target };
    gsap.to(this.pivot.rotation, {
      x: MODEL_CONFIG.baseRotation.x + target.x,
      y: MODEL_CONFIG.baseRotation.y + target.y,
      z: MODEL_CONFIG.baseRotation.z + target.z,
      duration: ANIMATION.duration,
      ease: ANIMATION.ease,
      overwrite: true,
    });
  }

  /** Set rotation instantly (no animation) */
  setRotation(target: Rotation3D): void {
    this.currentRotation = { ...target };
    this.pivot.rotation.set(
      MODEL_CONFIG.baseRotation.x + target.x,
      MODEL_CONFIG.baseRotation.y + target.y,
      MODEL_CONFIG.baseRotation.z + target.z,
    );
  }

  getCurrentRotation(): Rotation3D {
    return { ...this.currentRotation };
  }
}
