import merge from 'lodash/merge';
import event from './event/resolvers';
import keyword from './keyword/resolvers';
import neighborhood from './neighborhood/resolvers';
import organization from './organization/resolvers';
import place from './place/resolvers';

const resolvers = merge(event, keyword, neighborhood, organization, place);

export default resolvers;
