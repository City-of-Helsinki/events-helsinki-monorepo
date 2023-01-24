import Venue from '../resolvers/Venue';
import venueQueryResolver from '../resolvers/venueQueryResolver';
import venuesByIdsResolver from '../resolvers/venuesByIdsResolver';

const resolvers = {
  Query: {
    venue: venueQueryResolver,
    venuesByIds: venuesByIdsResolver,
  },
  Venue,
};
export default resolvers;
