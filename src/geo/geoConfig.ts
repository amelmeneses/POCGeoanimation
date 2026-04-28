import type { GeoLocation } from './geoTypes';

/** Fallback location if IP geolocation fails */
const fallbackLocation: GeoLocation = {
  name: 'New York',
  breadcrumb: 'NEW YORK / USA / NORTH AMERICA',
  country: 'United States',
  countryCode: 'US',
  lat: 40.7128,
  lng: -74.006,
  precision: 'approximate',
  source: 'ip',
};

/**
 * Detect user location via IP using ip-api.com (free, no API key required).
 * Returns a GeoLocation based on the visitor's public IP.
 */
export async function fetchUserLocation(): Promise<GeoLocation> {
  try {
    const res = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,regionName,city,lat,lon');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (data.status !== 'success') throw new Error('IP lookup failed');

    const city = data.city || data.regionName || data.country;
    const region = data.regionName || '';
    const country = data.country || '';

    return {
      name: city,
      breadcrumb: [city, region, country]
        .filter(Boolean)
        .map((s: string) => s.toUpperCase())
        .join(' / '),
      country,
      countryCode: data.countryCode || '??',
      lat: data.lat,
      lng: data.lon,
      precision: 'approximate',
      source: 'ip',
    };
  } catch (err) {
    console.warn('IP geolocation failed, using fallback:', err);
    return fallbackLocation;
  }
}

/** Predefined "More Locations" entries */
export const presetLocations: GeoLocation[] = [
  {
    name: 'Tokyo',
    breadcrumb: 'TOKYO / JAPAN / ASIA',
    country: 'Japan',
    countryCode: 'JP',
    lat: 35.6892,
    lng: 139.6925,
    precision: 'exact',
    source: 'preset',
  },
  {
    name: 'Barcelona',
    breadcrumb: 'BARCELONA / SPAIN / EUROPE',
    country: 'Spain',
    countryCode: 'ES',
    lat: 41.3874,
    lng: 2.1686,
    precision: 'exact',
    source: 'preset',
  },
  {
    name: 'The moon',
    breadcrumb: 'SEA OF TRANQUILITY / THE MOON',
    country: 'The Moon',
    countryCode: '🌙',
    lat: 0.6875,
    lng: 23.4333,
    precision: 'exact',
    source: 'preset',
  },
  {
    name: 'Mars',
    breadcrumb: 'OLYMPUS MONS / MARS',
    country: 'Mars',
    countryCode: '♂',
    lat: 18.65,
    lng: -133.8,
    precision: 'exact',
    source: 'preset',
  },
];
