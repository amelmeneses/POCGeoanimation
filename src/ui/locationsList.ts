import type { GeoLocation } from '../geo/geoTypes';
import { decimalToDMS, latToDeclination, lngToRA } from '../utils/formatters';

export type OnLocationSelect = (location: GeoLocation, index: number) => void;

/**
 * Build the "More Locations" accordion section.
 * Each item is a row that expands to show a 3D canvas + coordinates on click.
 */
export function renderLocationsList(
  container: HTMLElement,
  locations: GeoLocation[],
  onSelect: OnLocationSelect,
): void {
  container.innerHTML = '';

  locations.forEach((loc, index) => {
    // Item wrapper
    const item = document.createElement('div');
    item.className = 'loc-item';
    item.dataset.index = String(index);

    // Header row (name + chevron)
    const header = document.createElement('button');
    header.className = 'loc-header';
    header.innerHTML = `
      <span class="loc-name">${loc.name}</span>
      <span class="loc-chevron">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <polyline points="5,8 10,13 15,8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    `;

    // Expanded content
    const detail = document.createElement('div');
    detail.className = 'loc-detail';
    detail.innerHTML = `
      <div class="loc-detail-inner">
        <div class="loc-canvas-wrap" id="loc-canvas-${index}"></div>
        <div class="loc-info">
          <span class="loc-breadcrumb">${loc.breadcrumb ?? ''}</span>
          <div class="loc-coords">
            <div class="loc-col">
              <div class="loc-row"><span class="loc-label">Dec</span> <span class="loc-value">${latToDeclination(loc.lat)}</span></div>
              <div class="loc-row"><span class="loc-label">AR</span> <span class="loc-value">${lngToRA(loc.lng)}</span></div>
            </div>
            <div class="loc-col">
              <div class="loc-row"><span class="loc-label">Lat</span> <span class="loc-value">${decimalToDMS(loc.lat, true)}</span></div>
              <div class="loc-row"><span class="loc-label">Long</span> <span class="loc-value">${decimalToDMS(loc.lng, false)}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      container.querySelectorAll('.loc-item.is-open').forEach((el) => {
        el.classList.remove('is-open');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        onSelect(loc, index);
      }
    });

    item.appendChild(header);
    item.appendChild(detail);
    container.appendChild(item);
  });
}
