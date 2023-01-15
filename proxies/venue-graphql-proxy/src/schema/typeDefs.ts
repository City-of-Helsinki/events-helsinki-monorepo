import AppConfig from '../config/AppConfig';
import createVenueSchema from './venue/venueSchema';

const typeDefs = [
  // paginationSchema,
  createVenueSchema(AppConfig.isHaukiEnabled),
  // eventSchema,
];

export default typeDefs;
