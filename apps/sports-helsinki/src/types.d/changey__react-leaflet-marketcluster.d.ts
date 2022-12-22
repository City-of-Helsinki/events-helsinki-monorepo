/**
 * Type definitions for "@changey/react-leaflet-markercluster": "4.0.0-rc1",
 * Requires '@types/leaflet.markercluster'
 */
declare module '@changey/react-leaflet-markercluster' {
  import type { MarkerClusterGroupOptions } from 'leaflet';
  import { Component } from 'react';
  import type { MapLayerProps } from 'react-leaflet';

  export type MarkerClusterGroupProps = MapLayerProps &
    MarkerClusterGroupOptions;
  export default abstract class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}
}
