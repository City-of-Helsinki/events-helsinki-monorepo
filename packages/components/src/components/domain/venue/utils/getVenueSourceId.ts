import { Sources } from '../../../../constants';

export default function getVenueSourceId(
  venueId: string,
  source: string = Sources.TPREK
) {
  return `${source}:${venueId}`;
}
