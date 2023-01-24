/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { GraphQLResolveInfo } from 'graphql';
import type VenueContext from '../context/VenueContext';
import type { Source } from '../types';
import venueQueryResolver from './venueQueryResolver';

// Implementation is a bit ugly here.
//
// Reason is that the most recent version of the tprek API does not allow for
// units to be found based on an ID list. This is possible with an earlier
// version of the API, but it provides ontologies as list of strings. Because
// it does not provide the ID, they aren't very useful for us in this project.
//
// I chose this compromise because it's technically simple.
//
// Note the lack of pagination support.
const venusByIdsResolver = async (
  source: Source,
  params: unknown,
  context: VenueContext,
  resolveInfo: GraphQLResolveInfo
) => {
  const venueIds = (params as { ids: string[] }).ids;
  return await Promise.all(
    venueIds.map((idWithSource: string) =>
      venueQueryResolver(source, { id: idWithSource }, context, resolveInfo)
    )
  );
};

export default venusByIdsResolver;
