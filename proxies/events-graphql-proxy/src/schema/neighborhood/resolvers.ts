import capitalize from 'lodash/capitalize.js';
import type EventContext from '../../context/EventContext.js';
import type { NeighborhoodListResponse } from '../../types/__generated__.js';
import type { QueryResolvers } from '../../types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeNeighborhood = (features: any[]) => {
  return features.map((feature) => ({
    id: `${feature.properties.aluejako.toLowerCase()}:${feature.properties.nimi_fi.toLowerCase()}`,
    name: {
      en: capitalize(feature.properties.nimi_fi),
      fi: capitalize(feature.properties.nimi_fi),
      sv: capitalize(feature.properties.nimi_se),
    },
  }));
};

const Query: QueryResolvers = {
  neighborhoodList: async (_: unknown, __: unknown, context: EventContext) => {
    const data = await context.dataSources.neighborhood.getNeighborhoodList();

    return {
      data: normalizeNeighborhood(data.features),
      meta: {
        count: data.numberReturned,
        next: null,
        previous: null,
      },
    } as NeighborhoodListResponse;
  },
};

export default { Query };
