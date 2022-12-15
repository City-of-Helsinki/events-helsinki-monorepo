import type {
  DirectionAddress,
  DirectionPoint,
  Venue,
} from 'events-helsinki-components';

export function renderAddressToString(address: DirectionAddress): string {
  return [address.streetName, address.zip, address.city]
    .filter((item) => item)
    .join(', ');
}
export function getHSLDirection(point?: DirectionPoint | null): string {
  if (!point) {
    return encodeURIComponent(' ');
  }

  return encodeURIComponent(
    `${renderAddressToString(point.address)}::${point.point.coordinates[0]}${
      point.point.coordinates[1]
    }`
  );
}

export function getHSLDirectionsUrl(
  fromPoint?: DirectionPoint | null,
  toPoint?: DirectionPoint | null
) {
  const from = getHSLDirection(fromPoint);
  const to = getHSLDirection(toPoint);

  return `https://reittiopas.hsl.fi/reitti/${from}/${to}`;
}

export function getGoogleDirection(point?: DirectionPoint | null): string {
  if (!point) {
    return "''";
  }

  return `${point.name},+${renderAddressToString(point.address)
    .split(' ')
    .join('+')}`;
}

export function getGoogleDirectionsUrl(
  fromPoint?: DirectionPoint | null,
  toPoint?: DirectionPoint | null
) {
  const from = getGoogleDirection(fromPoint);
  const to = getGoogleDirection(toPoint);

  return `https://www.google.com/maps/dir/${from}/${to}/`;
}

export function getVenueDirectionPoint(venue: Venue) {
  const { name, streetAddress, postalCode, addressLocality, position } = venue;

  return name && streetAddress && postalCode && addressLocality && position
    ? {
        name: name,
        address: {
          streetName: streetAddress,
          zip: postalCode,
          city: addressLocality,
        },
        point: position,
      }
    : null;
}
