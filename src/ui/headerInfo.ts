import type { GeoLocation } from '../geo/geoTypes';
import { decimalToDMS, latToDeclination, lngToRA } from '../utils/formatters';

/**
 * Render the "YOU ARE HERE" info panel.
 * Updates the existing DOM elements with current location data.
 */
export function updateHeaderInfo(loc: GeoLocation): void {
  const el = (id: string) => document.getElementById(id);

  const breadcrumbEl = el('header-breadcrumb');
  const decEl = el('header-dec');
  const arEl = el('header-ar');
  const latEl = el('header-lat');
  const lngEl = el('header-lng');

  if (breadcrumbEl) breadcrumbEl.textContent = loc.breadcrumb ?? '';
  if (decEl) decEl.textContent = latToDeclination(loc.lat);
  if (arEl) arEl.textContent = lngToRA(loc.lng);
  if (latEl) latEl.textContent = decimalToDMS(loc.lat, true);
  if (lngEl) lngEl.textContent = decimalToDMS(loc.lng, false);
}
