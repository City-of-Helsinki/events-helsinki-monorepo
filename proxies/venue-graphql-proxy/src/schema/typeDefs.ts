import AppConfig from '../config/AppConfig.js';
import createVenueSchema from './venue/venueSchema.js';

const typeDefs = [
  // paginationSchema,
  createVenueSchema(AppConfig.isHaukiEnabled),
  // eventSchema,
];

export default typeDefs;
