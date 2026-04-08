import type { GeoLocation } from '../geo/geoTypes';

export type AppMode = 'header' | 'locations';

export interface AppState {
  mode: AppMode;
  activeLocation: GeoLocation;
  expandedLocationIndex: number | null;
}

type Listener = (state: AppState) => void;

let state: AppState;
const listeners: Listener[] = [];

export function initState(defaultLocation: GeoLocation): void {
  state = {
    mode: 'header',
    activeLocation: defaultLocation,
    expandedLocationIndex: null,
  };
}

export function getState(): AppState {
  return state;
}

export function setState(partial: Partial<AppState>): void {
  state = { ...state, ...partial };
  listeners.forEach((fn) => fn(state));
}

export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}
