import { buildSubgraphSchema } from '@apollo/subgraph';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

// use mergeSchemas to make codegen generate typing correctly
// for some reason makeExecutableSchema didn't work in index.ts for codegen

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default buildSubgraphSchema({ typeDefs, resolvers });
