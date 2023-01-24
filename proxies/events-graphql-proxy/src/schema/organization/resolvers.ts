/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizeKeys } from 'events-helsinki-graphql-proxy-server/src';
import type EventContext from '../../context/EventContext';
import type { QueryResolvers } from '../../types';
import type { OrganizationDetails } from '../../types/types';

const Query: QueryResolvers = {
  organizationDetails: async (_: any, { id }: any, context: EventContext) => {
    const data = await context.dataSources.organization.getOrganizationDetails(
      id
    );

    return normalizeKeys(data) as OrganizationDetails;
  },
};

export default { Query };
