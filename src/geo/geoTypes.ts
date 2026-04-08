export interface GeoLocation {
  name: string;
  /** Breadcrumb like "TOKYO / JAPAN / ASIA" */
  breadcrumb?: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  precision: 'exact' | 'approximate';
  source: 'ip' | 'gps' | 'manual' | 'preset';
}

export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}
