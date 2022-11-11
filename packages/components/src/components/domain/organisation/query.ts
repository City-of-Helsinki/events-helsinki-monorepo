import { gql } from '@apollo/client';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const QUERY_ORGANIZATION_DETAILS = gql`
  fragment organizationFields on OrganizationDetails {
    id
    name
  }
  query OrganizationDetails($id: ID!) {
    organizationDetails(id: $id) {
      ...organizationFields
    }
  }
`;
