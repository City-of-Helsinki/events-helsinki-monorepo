import merge from 'lodash/merge.js';
import event from './event/resolvers.js';
import keyword from './keyword/resolvers.js';
import neighborhood from './neighborhood/resolvers.js';
import organization from './organization/resolvers.js';
import place from './place/resolvers.js';

const resolvers = merge(event, keyword, neighborhood, organization, place);

export default resolvers;
