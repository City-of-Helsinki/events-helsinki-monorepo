import event from './event/typeDefs.js';
import globalDefs from './global/typeDefs/index.js';
import keyword from './keyword/typeDefs.js';
import neighborhood from './neighborhood/typeDefs.js';
import organization from './organization/typeDefs.js';
import place from './place/typeDefs.js';

const typeDefs = [
  ...globalDefs,
  event,
  keyword,
  neighborhood,
  organization,
  place,
];

export default typeDefs;
