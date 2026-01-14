// NOTE: a custom self created typing is written for the @changey/react-leaflet-markercluster.
// NOTE: @changey/react-leaflet-markercluster gives the support for react-leaflet v4.
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import Link from 'next/link';
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';
import { useLocale, useSearchTranslation } from '../../hooks';
import type { MapItem } from '../../types';
import Text from '../text/Text';
import { A11yHiddenDivIcon } from './A11yHiddenIcon';
import {
  BOUNDARIES,
  DEFAULT_POSITION,
  DEFAULT_ZOOM,
  FOCUSED_ITEM_DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  TILE_URL_FI,
  TILE_URL_SV,
} from './mapConstants';
import styles from './mapView.module.scss';
import venueIcon from './VenueIcon';

// Overwrite default keyboard value (true) in order to force all plugins to use
// marker variants without keyboard support.
L.Marker.prototype.options.keyboard = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createCustomClusterIcon(cluster: any) {
  return new A11yHiddenDivIcon({
    html: `<div tabindex="-1"><span tabindex="-1">${cluster.getChildCount()}</span></div>`,
    className: [
      'leaflet-marker-icon',
      'marker-cluster marker-cluster-small',
      'leaflet-zoom-animated',
      'leaflet-interactive',
      styles.clusterIcon,
    ].join(' '),
    iconSize: L.point(40, 40, true),
  });
}

type Props = {
  items: MapItem[];
  center?: LatLngExpression;
  zoom?: number;
  focusedItemId?: string;
};

function MapView({ items = [], center, zoom, focusedItemId }: Props) {
  const { t } = useSearchTranslation();
  const locale = useLocale();
  const focusedItem = useMemo(
    () => items.find((item) => item.id === focusedItemId),
    [items, focusedItemId]
  );
  // Store marker reference in state so that the component re-renders when it
  // the marker reference changes.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [focusedMarker, setFocusedMarker] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerClusterGroupRef = useRef<any>(null);

  const getFocusedItemPosition = (): LatLngExpression | null => {
    if (focusedItem?.location) {
      const [lng, lat] = focusedItem.location;
      return [lat, lng];
    }
    return null;
  };

  const getZoom = () => {
    if (zoom) return zoom;
    if (getFocusedItemPosition()) {
      return FOCUSED_ITEM_DEFAULT_ZOOM;
    }
    return DEFAULT_ZOOM;
  };

  useEffect(() => {
    const markerClusterGroup = markerClusterGroupRef.current;

    if (focusedItemId && markerClusterGroup && focusedMarker) {
      // Use zoomToShowLayer in order to unravel markers that may be clustered.
      markerClusterGroup.zoomToShowLayer(focusedMarker, () => {
        focusedMarker.openPopup();
      });
    }
  }, [focusedItemId, focusedMarker]);

  const markerClusterGroupItems = React.useMemo(
    () =>
      items.reduce((result: JSX.Element[] = [], item) => {
        if (!item.location) {
          return result;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleSetFocusedRef = (marker: any) => {
          const isFocusedItem = focusedItemId && item.id === focusedItemId;

          if (isFocusedItem) {
            setFocusedMarker(marker);
          }
        };

        return [
          ...result,
          <Marker
            key={item.id}
            position={[item.location[1], item.location[0]]}
            icon={venueIcon}
            ref={handleSetFocusedRef}
          >
            <Popup className={styles.popup}>
              <Text variant="body">{item.title}</Text>
              <Link href={item.href}>{t('search:goToVenue')}</Link>
            </Popup>
          </Marker>,
        ];
      }, []),
    [items, focusedItemId, t]
  );

  const tileUrl = locale == 'sv' ? TILE_URL_SV : TILE_URL_FI;

  return (
    <div
      aria-hidden={false}
      tabIndex={-1}
      aria-label={t('search:mapAccessibilityStatement')}
      className={styles.mapView}
    >
      <MapContainer
        center={getFocusedItemPosition() ?? center ?? DEFAULT_POSITION}
        zoom={getZoom()}
        maxBounds={BOUNDARIES}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        attributionControl={false}
      >
        <TileLayer
          attribution={`&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> ${t(
            'search:openStreetMapContributors'
          )}`}
          url={tileUrl}
        />
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          iconCreateFunction={createCustomClusterIcon}
          maxClusterRadius={60}
          animate={false}
          key={items.join() ?? 'default'}
          ref={markerClusterGroupRef}
        >
          {markerClusterGroupItems}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default MapView;
