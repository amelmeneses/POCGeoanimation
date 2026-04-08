import type { GeoLocation } from './geoTypes';

/**
 * Simulated user location obtained via IP geolocation.
 *
 * TODO: Replace this mock with a real Geo-IP service call.
 * Integration point: fetch from an API like ipapi.co, ipinfo.io,
 * or a server-side endpoint, then map the response to GeoLocation.
 */
export const userLocation: GeoLocation = {
  name: 'Cuenca',
  breadcrumb: 'CUENCA / ECUADOR / SOUTH AMERICA',
  country: 'Ecuador',
  countryCode: 'EC',
  lat: -2.9006,
  lng: -79.0045,
  precision: 'approximate',
  source: 'ip',
};

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
