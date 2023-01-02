/* eslint-disable @typescript-eslint/no-explicit-any */
import capitalize from 'lodash/capitalize';
import type { QueryResolvers } from '../../types';
import type { NeighborhoodListResponse } from '../../types/types';

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
  neighborhoodList: async (_: any, __: any, { dataSources }: any) => {
    const data =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (await dataSources.neighborhoodAPI.getNeighborhoodList()) as any;

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
