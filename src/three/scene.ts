import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCamera } from './camera';
import { createLights } from './lights';
import { LogoRenderer } from './logoRenderer';

export interface SceneContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  logo: LogoRenderer;
  controls: OrbitControls | null;
}

/**
 * Initialize the Three.js scene inside the given container element.
 * @param container  DOM element that will hold the canvas
 * @param enableOrbitControls  Set true for debug — lets you orbit the camera
 */
export function initScene(
  container: HTMLElement,
  enableOrbitControls = false,
): SceneContext {
  const { clientWidth: w, clientHeight: h } = container;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = createCamera(w / h);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  // Lights
  scene.add(createLights());

  // Logo
  const logo = new LogoRenderer(scene);

  // Optional orbit controls for debugging
  let controls: OrbitControls | null = null;
  if (enableOrbitControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
  }

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    controls?.update();
    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  const onResize = () => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    renderer.setSize(cw, ch);
  };
  window.addEventListener('resize', onResize);

  return { renderer, scene, camera, logo, controls };
}
