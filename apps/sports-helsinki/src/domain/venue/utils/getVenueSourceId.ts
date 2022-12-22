import { Sources } from '../../app/appConstants';

export default function getVenueSourceId(
  venueId: string,
  source: string = Sources.TPREK
) {
  return `${source}:${venueId}`;
}
