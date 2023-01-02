/* eslint-disable @typescript-eslint/no-explicit-any */
import type { QueryResolvers } from '../../types';
import type { OrganizationDetails } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';

const Query: QueryResolvers = {
  organizationDetails: async (_: any, { id }: any, { dataSources }: any) => {
    const data = await dataSources.organizationAPI.getOrganizationDetails(id);

    return normalizeKeys(data) as OrganizationDetails;
  },
};

export default { Query };
