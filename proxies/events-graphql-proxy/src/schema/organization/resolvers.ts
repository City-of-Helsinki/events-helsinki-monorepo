import { normalizeKeys } from '@events-helsinki/graphql-proxy-server';
import type EventContext from '../../context/EventContext.js';
import type { OrganizationDetails } from '../../types/types.js';
import type { QueryResolvers } from '../../types.js';

const Query: QueryResolvers = {
  organizationDetails: async (
    _: unknown,
    { id }: unknown & { id: string },
    context: EventContext
  ) => {
    const data =
      await context.dataSources.organization.getOrganizationDetails(id);

    return normalizeKeys(data) as OrganizationDetails;
  },
};

export default { Query };
