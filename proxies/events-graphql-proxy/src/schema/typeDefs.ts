import event from './event/typeDefs';
import globalDefs from './global/typeDefs';
import keyword from './keyword/typeDefs';
import neighborhood from './neighborhood/typeDefs';
import organization from './organization/typeDefs';
import place from './place/typeDefs';

const typeDefs = [
  ...globalDefs,
  event,
  keyword,
  neighborhood,
  organization,
  place,
];

export default typeDefs;
