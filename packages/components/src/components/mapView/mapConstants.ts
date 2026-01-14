import type { LatLngBoundsLiteral, LatLngExpression } from 'leaflet';

export const TILE_URL_FI =
  'https://maptiles.api.hel.fi/styles/hel-osm-bright-fi/{z}/{x}/{y}.png';
export const TILE_URL_SV =
  'https://maptiles.api.hel.fi/styles/hel-osm-bright-sv/{z}/{x}/{y}.png';

export const DEFAULT_POSITION: LatLngExpression = [60.2087778, 24.9980714];

export const DEFAULT_ZOOM = 12;

export const FOCUSED_ITEM_DEFAULT_ZOOM = 18;

export const MIN_ZOOM = 11;

export const MAX_ZOOM = 18;

export const BOUNDARIES: LatLngBoundsLiteral = [
  [59.4, 23.8],
  [61.5, 25.8],
];
