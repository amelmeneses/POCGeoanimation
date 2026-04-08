import { initScene, type SceneContext } from './three/scene';
import { latLngToRotation } from './geo/geoToRotation';
import { userLocation, presetLocations } from './geo/geoConfig';
import { updateHeaderInfo } from './ui/headerInfo';
import { renderLocationsList } from './ui/locationsList';
import { initState, getState, setState, subscribe } from './ui/state';
import type { GeoLocation } from './geo/geoTypes';

/** Set to true to enable OrbitControls for debugging the 3D view */
const DEBUG_ORBIT = false;

let headerScene: SceneContext;

// Map of index → SceneContext for location accordion canvases
const locationScenes = new Map<number, SceneContext>();

export async function startApp(): Promise<void> {
  // ── State ──
  initState(userLocation);

  // ── Header Scene ──
  const headerCanvas = document.getElementById('header-canvas')!;
  headerScene = initScene(headerCanvas, DEBUG_ORBIT);
  await headerScene.logo.load();

  // Set initial rotation from user's location
  const initRot = latLngToRotation(userLocation.lat, userLocation.lng);
  headerScene.logo.setRotation(initRot);

  // ── Header Info ──
  updateHeaderInfo(userLocation);

  // ── Locations List ──
  const locContainer = document.getElementById('locations-list')!;
  renderLocationsList(locContainer, presetLocations, onLocationSelect);

  // ── State subscriber ──
  subscribe((state) => {
    updateHeaderInfo(state.activeLocation);
  });
}

async function onLocationSelect(loc: GeoLocation, index: number): Promise<void> {
  setState({ mode: 'locations', activeLocation: loc, expandedLocationIndex: index });

  // Create a scene for this accordion slot if it doesn't exist yet
  if (!locationScenes.has(index)) {
    const canvasContainer = document.getElementById(`loc-canvas-${index}`);
    if (canvasContainer) {
      const ctx = initScene(canvasContainer, false);
      await ctx.logo.load();
      locationScenes.set(index, ctx);
    }
  }

  // Animate that scene's logo to the location's rotation
  const ctx = locationScenes.get(index);
  if (ctx) {
    const rot = latLngToRotation(loc.lat, loc.lng);
    ctx.logo.rotateTo(rot);
  }

  // Also animate the header logo
  const headerRot = latLngToRotation(loc.lat, loc.lng);
  headerScene.logo.rotateTo(headerRot);
  updateHeaderInfo(loc);
}
