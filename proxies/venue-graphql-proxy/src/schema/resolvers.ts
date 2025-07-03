import Venue from '../resolvers/Venue.js';
import venueQueryResolver from '../resolvers/venueQueryResolver.js';
import venuesByIdsResolver from '../resolvers/venuesByIdsResolver.js';

const resolvers = {
  Query: {
    venue: venueQueryResolver,
    venuesByIds: venuesByIdsResolver,
  },
  Venue,
};
export default resolvers;
