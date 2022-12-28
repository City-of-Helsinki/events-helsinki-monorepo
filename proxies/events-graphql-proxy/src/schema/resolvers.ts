import merge from 'lodash/merge';

import keyword from './keyword/resolvers';
import neighborhood from './neighborhood/resolvers';
import organization from './organization/resolvers';
import place from './place/resolvers';

const resolvers = merge(keyword, neighborhood, organization, place);

export default resolvers;
